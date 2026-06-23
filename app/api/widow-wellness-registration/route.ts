import {
  escapeHtml,
  getSiteOrigin,
  wrapBrandedEmail,
  wrapInternalLogEmail,
} from "@/lib/email-brand";
import { honeypotIsTripped } from "@/lib/form-spam";
import { verifyRecaptchaToken } from "@/lib/verify-recaptcha";
import {
  EVENT_NAME,
  getTicketTier,
  stripeUrlWithEmail,
} from "@/lib/widow-wellness-event";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM = "Jennifer <jennifer@itslifey.com>";
const INTERNAL_TO = "jennifer@itslifey.com";

function trimField(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function firstNameFromFull(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const o = body as Record<string, unknown>;

  if (honeypotIsTripped(o)) {
    return NextResponse.json({ ok: true, url: "/" });
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  const recaptchaToken = trimField(o.recaptchaToken, 8000);
  if (recaptchaSecret) {
    if (!recaptchaToken) {
      return NextResponse.json(
        {
          error:
            "Could not verify your submission. Please refresh the page and try again.",
        },
        { status: 400 },
      );
    }
    const verified = await verifyRecaptchaToken(
      recaptchaToken,
      recaptchaSecret,
      "widow_wellness_registration",
    );
    if (!verified.ok) {
      return NextResponse.json(
        {
          error:
            "Could not verify your submission. Please try again in a moment.",
        },
        { status: 400 },
      );
    }
  }

  const name = trimField(o.name, 200);
  const email = trimField(o.email, 320);
  const phone = trimField(o.phone, 80);
  const note = trimField(o.note, 8000);
  const ticketKey = trimField(o.ticketTier, 40);

  const ticket = getTicketTier(ticketKey);
  if (!ticket) {
    return NextResponse.json(
      { error: "Please choose a ticket option." },
      { status: 400 },
    );
  }

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please add your name and email." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const internalTo =
    process.env.INTERNAL_FORM_LOG_TO?.trim() || INTERNAL_TO;
  const submittedAtIso = new Date().toISOString();
  const greet = firstNameFromFull(name);
  const paymentLink = stripeUrlWithEmail(ticket.stripeUrl, email);

  const rows: { label: string; value: string }[] = [
    { label: "Event", value: EVENT_NAME },
    { label: "Ticket", value: `${ticket.label} — $${ticket.price}` },
    { label: "Name", value: name },
    { label: "Email", value: email },
  ];
  if (phone) rows.push({ label: "Phone", value: phone });
  rows.push({ label: "Note", value: note || "—" });
  rows.push({
    label: "Status",
    value: "Pending payment — redirected to Stripe",
  });

  const internalHtml = wrapInternalLogEmail({
    title: "Widow Wellness registration — checkout initiated",
    sourceLabel: "WIDOW WELLNESS",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Pre-payment log] Widow Wellness registration",
    `Event: ${EVENT_NAME}`,
    `Ticket: ${ticket.label} — $${ticket.price}`,
    `Received: ${submittedAtIso}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    "",
    "Note:",
    note || "—",
    "",
    "Status: Pending payment — redirected to Stripe",
  ].join("\n");

  const userInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Thank you for signing up for the <strong style="color:#1a1918;">${escapeHtml(EVENT_NAME)}</strong>.</p>
<p style="margin:0 0 16px;">You selected the <strong style="color:#1a1918;">${escapeHtml(ticket.label)}</strong> ($${ticket.price}).</p>
<p style="margin:0 0 16px;">Please note: your ticket is <strong style="color:#1a1918;">not final until payment is completed</strong>. If you were redirected to Stripe and finished checkout, you&apos;re all set — we&apos;ll be in touch with event details.</p>
<p style="margin:0 0 20px;">If you haven&apos;t completed payment yet, you can do that here:</p>
<p style="margin:0 0 24px;">
  <a href="${paymentLink}" style="display:inline-block;background:#e76fab;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:50px;letter-spacing:0.01em;">
    Complete payment — $${ticket.price} &rarr;
  </a>
</p>
<p style="margin:0;font-size:14px;color:#888;">Questions? Reply to this email — we read every message with care.</p>`;

  const userHtml = wrapBrandedEmail({
    heading: `Thanks for signing up — ${EVENT_NAME}`,
    innerHtml: userInner,
  });

  const userText = [
    `Hi ${greet},`,
    "",
    `Thank you for signing up for ${EVENT_NAME}.`,
    "",
    `You selected: ${ticket.label} ($${ticket.price}).`,
    "",
    "Please note: your ticket is not final until payment is completed.",
    "",
    "Complete your payment here:",
    paymentLink,
    "",
    "— Jennifer & the It's Lifey team",
    "",
    getSiteOrigin(),
  ].join("\n");

  const resend = new Resend(key);
  const [internalResult, userResult] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Pre-payment] Widow Wellness — ${name} · ${ticket.shortLabel}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: `Thanks for signing up — ${EVENT_NAME}`,
      html: userHtml,
      text: userText,
    }),
  ]);

  if (internalResult.error) {
    console.error("Resend error (internal log):", internalResult.error);
    return NextResponse.json(
      {
        error:
          "We couldn’t send that just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  if (userResult.error) {
    console.error("Resend error (confirmation):", userResult.error);
  }

  return NextResponse.json({ ok: true, url: paymentLink });
}
