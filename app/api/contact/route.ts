import {
  escapeHtml,
  getSiteOrigin,
  wrapBrandedEmail,
  wrapInternalLogEmail,
} from "@/lib/email-brand";
import { honeypotIsTripped } from "@/lib/form-spam";
import { verifyRecaptchaToken } from "@/lib/verify-recaptcha";
import { Resend } from "resend";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ ok: true as const });
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
      "contact",
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
  const message = trimField(o.message, 8000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please add your name, email, and message." },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const internalTo =
    process.env.INTERNAL_FORM_LOG_TO?.trim() || INTERNAL_TO;

  const submittedAtIso = new Date().toISOString();
  const greet = firstNameFromFull(name);

  const applicantInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Thank you for reaching out to <strong style="color:#1a1918;">It&rsquo;s Lifey</strong>. We&rsquo;ve received your message and will get back to you as soon as we can.</p>
<p style="margin:0;font-size:15px;color:#666766;">If your note is urgent, you can reply to this email and it will go straight to our inbox.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: "We received your message",
    innerHtml: applicantInner,
  });

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Message", value: message },
  ];
  if (phone) rows.splice(2, 0, { label: "Phone", value: phone });

  const internalHtml = wrapInternalLogEmail({
    title: "Contact form message",
    sourceLabel: "CONTACT FORM",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Response log] Contact form",
    `Received: ${submittedAtIso}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    "",
    "Message:",
    message,
  ].join("\n");

  const resend = new Resend(key);

  const [toJennifer, toSender] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Log] Contact — ${name}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: "We received your message — It's Lifey",
      html: applicantHtml,
      text: [
        `Hi ${greet},`,
        "",
        "Thank you for reaching out to It's Lifey. We've received your message and will get back to you as soon as we can.",
        "",
        `— Jennifer & the It's Lifey team`,
        "",
        getSiteOrigin(),
      ].join("\n"),
    }),
  ]);

  if (toJennifer.error) {
    console.error("Resend error (internal log):", toJennifer.error);
    return NextResponse.json(
      {
        error:
          "We couldn’t send that just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  if (toSender.error) {
    console.error("Resend error (confirmation):", toSender.error);
    return NextResponse.json(
      {
        error:
          "Your message reached our team, but we couldn’t send your confirmation email. Please check spam or try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true as const,
    id: toSender.data?.id ?? toJennifer.data?.id ?? null,
  });
}
