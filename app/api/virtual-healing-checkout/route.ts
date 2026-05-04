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
const PROGRAM_LABEL =
  "The Body Keeps the Story — Virtual Healing Experience (Tina Walsh)";

// Static Stripe Payment Link for the $200 deposit
const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/5kQeVe04xeWI9EEc6Q5Rm04";

function firstNameFromFull(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

function trimField(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
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
    // Silently succeed but don't redirect to Stripe
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
      "virtual_healing",
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

  // Log the interest to Jennifer immediately — before payment.
  // The user confirmation email fires from the Stripe webhook after they pay.
  const internalTo =
    process.env.INTERNAL_FORM_LOG_TO?.trim() || INTERNAL_TO;

  const submittedAtIso = new Date().toISOString();

  const rows: { label: string; value: string }[] = [
    { label: "Program", value: PROGRAM_LABEL },
    { label: "Name", value: name },
    { label: "Email", value: email },
  ];
  if (phone) rows.push({ label: "Phone", value: phone });
  rows.push({ label: "Note", value: note || "—" });
  rows.push({ label: "Status", value: "Pending payment — redirected to Stripe" });

  const internalHtml = wrapInternalLogEmail({
    title: "Virtual healing — deposit checkout initiated",
    sourceLabel: "VIRTUAL HEALING",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Pre-payment log] Virtual healing experience",
    `Program: ${PROGRAM_LABEL}`,
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

  const greet = firstNameFromFull(name);
  const depositUrl = new URL(STRIPE_PAYMENT_LINK);
  depositUrl.searchParams.set("prefilled_email", email);
  const depositLink = depositUrl.toString();

  // Email to the person who submitted the form — fires before Stripe payment.
  // Gives them the deposit link in case they close Stripe without paying.
  const userInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Thanks for your interest in <strong style="color:#1a1918;">The Body Keeps the Story</strong> — Tina Walsh&rsquo;s six-week virtual healing experience with It&rsquo;s Lifey.</p>
<p style="margin:0 0 16px;">To officially reserve your spot, a <strong style="color:#1a1918;">$200 deposit</strong> is required. If you were redirected to the payment page and completed your deposit, you&rsquo;re all set — Jennifer will be in touch with everything you need before May 20.</p>
<p style="margin:0 0 20px;">If you haven&rsquo;t yet submitted your deposit, you can do so here:</p>
<p style="margin:0 0 24px;">
  <a href="${depositLink}" style="display:inline-block;background:#e76fab;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:50px;letter-spacing:0.01em;">
    Reserve my spot — $200 deposit &rarr;
  </a>
</p>
<p style="margin:0 0 16px;font-size:14px;color:#666766;">Use code <strong style="font-family:monospace;color:#b8457e;">ITSLIFEY50</strong> at checkout for $50 off your total (offer ends May 10). Your deposit applies toward your $899/$849 program investment.</p>
<p style="margin:0;font-size:14px;color:#888;">Only 3 spots are available. Questions? Reply to this email.</p>`;

  const userHtml = wrapBrandedEmail({
    heading: "Almost there — complete your deposit",
    innerHtml: userInner,
  });

  const userText = [
    `Hi ${greet},`,
    "",
    "Thanks for your interest in The Body Keeps the Story.",
    "",
    "To officially reserve your spot, a $200 deposit is required.",
    "If you completed your deposit, you're all set — Jennifer will be in touch before May 20.",
    "",
    "If you haven't yet paid your deposit, here's the link:",
    depositLink,
    "",
    "Use code ITSLIFEY50 at checkout for $50 off (offer ends May 10).",
    "Your deposit applies toward your $899/$849 program investment.",
    "",
    `— Jennifer & the It's Lifey team`,
    "",
    getSiteOrigin(),
  ].join("\n");

  const resend = new Resend(key);
  const [internalResult, userResult] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Pre-payment] Virtual Healing — ${escapeHtml(name)}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject:
        "Complete your deposit — The Body Keeps the Story (It's Lifey)",
      html: userHtml,
      text: userText,
    }),
  ]);

  if (internalResult.error) {
    console.error("Resend error (internal log):", internalResult.error);
  }
  if (userResult.error) {
    console.error("Resend error (pre-payment user email):", userResult.error);
    // Don't block the Stripe redirect for a non-critical email failure
  }

  // Encode name+email in client_reference_id so the webhook can personalise
  // the confirmation email without needing a database.
  // Format: base64url of "name\x00email" (nullbyte separator, safe for base64)
  const refPayload = Buffer.from(`${name}\x00${email}`).toString("base64url");

  const stripeUrl = new URL(STRIPE_PAYMENT_LINK);
  stripeUrl.searchParams.set("prefilled_email", email);
  stripeUrl.searchParams.set("client_reference_id", refPayload);

  return NextResponse.json({ ok: true, url: stripeUrl.toString() });
}
