import {
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
      "newsletter",
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

  const email = trimField(o.email, 320);
  if (!email) {
    return NextResponse.json(
      { error: "Please enter your email address." },
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
    process.env.NEWSLETTER_INTERNAL_TO?.trim() ||
    process.env.INTERNAL_FORM_LOG_TO?.trim() ||
    INTERNAL_TO;

  const submittedAtIso = new Date().toISOString();

  const subscriberInner = `
<p style="margin:0 0 16px;">Hi,</p>
<p style="margin:0;">You&rsquo;re on the list. We&rsquo;ll send short notes about retreats, support, and community—no spam, and you can unsubscribe anytime.</p>`;

  const subscriberHtml = wrapBrandedEmail({
    // Plain text only — wrapBrandedEmail runs escapeHtml() on the heading.
    heading: "You're subscribed",
    innerHtml: subscriberInner,
  });

  const internalHtml = wrapInternalLogEmail({
    title: "Newsletter signup",
    sourceLabel: "NEWSLETTER",
    submittedAtIso,
    rows: [{ label: "Email", value: email }],
  });

  const internalText = [
    "[Response log] Newsletter signup",
    `Received: ${submittedAtIso}`,
    "",
    `Email: ${email}`,
  ].join("\n");

  const resend = new Resend(key);

  const [toJennifer, toSubscriber] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Log] Newsletter signup — ${email}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: "You're on the list — It's Lifey",
      html: subscriberHtml,
      text: [
        "Hi,",
        "",
        "You're on the list. We'll send short notes about retreats, support, and community—no spam, and you can unsubscribe anytime.",
        "",
        "— Jennifer & the It's Lifey team",
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
          "We couldn’t add you just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  if (toSubscriber.error) {
    console.error("Resend error (confirmation):", toSubscriber.error);
    return NextResponse.json(
      {
        error:
          "You’re on our list, but we couldn’t send a confirmation email. Please check spam or try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true as const,
    id: toSubscriber.data?.id ?? toJennifer.data?.id ?? null,
  });
}
