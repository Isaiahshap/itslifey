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

const STRIPE_LINKS = {
  individual: "https://buy.stripe.com/28E5kF6Zkbme0sk2bnbEA00",
  five: "https://buy.stripe.com/cNi3cx0AW8a25MEaHTbEA01",
  ten: "https://buy.stripe.com/9B66oJ4Rcdumdf68zLbEA02",
} as const;

type PackageKey = keyof typeof STRIPE_LINKS;

const PACKAGE_LABELS: Record<PackageKey, string> = {
  individual: "Individual — $49",
  five: "Package of 5 attendees — $98",
  ten: "Package of 10 attendees — $196",
};

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
    // Silently succeed — return the individual link so it still looks real to bots
    return NextResponse.json({ ok: true, url: STRIPE_LINKS.individual });
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
      "first40_inquiry",
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

  const firstName = trimField(o.firstName, 100);
  const lastName = trimField(o.lastName, 100);
  const email = trimField(o.email, 320);
  const phone = trimField(o.phone, 80);
  const packageKey = trimField(o.package, 20) as PackageKey;

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Please fill in your name and email." },
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

  if (!Object.keys(STRIPE_LINKS).includes(packageKey)) {
    return NextResponse.json(
      { error: "Please select a package." },
      { status: 400 },
    );
  }

  const stripeUrl = STRIPE_LINKS[packageKey];
  const packageLabel = PACKAGE_LABELS[packageKey];
  const fullName = `${firstName} ${lastName}`;
  const submittedAtIso = new Date().toISOString();

  const internalTo =
    process.env.INTERNAL_FORM_LOG_TO?.trim() || INTERNAL_TO;

  const applicantInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 16px;">Thank you for registering for the <strong style="color:#1a1918;">First40 × It&rsquo;s Lifey Virtual Workshop</strong> on June 18.</p>
<p style="margin:0 0 16px;">You selected: <strong style="color:#1a1918;">${escapeHtml(packageLabel)}</strong></p>
<p style="margin:0 0 16px;">You&rsquo;ll be taken to our secure checkout page to complete your registration. If you have any questions before June 18, just reply to this email.</p>
<p style="margin:0;font-size:15px;color:#666766;">We look forward to seeing you there.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: "You're registered — First40 Workshop",
    innerHtml: applicantInner,
  });

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: fullName },
    { label: "Email", value: email },
    { label: "Package", value: packageLabel },
  ];
  if (phone) rows.push({ label: "Phone", value: phone });

  const internalHtml = wrapInternalLogEmail({
    title: "First40 workshop registration",
    sourceLabel: "FIRST40 FORM",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Response log] First40 workshop registration",
    `Received: ${submittedAtIso}`,
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Package: ${packageLabel}`,
    ...(phone ? [`Phone: ${phone}`] : []),
  ].join("\n");

  const resend = new Resend(key);

  const [toJennifer, toRegistrant] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Log] First40 registration — ${fullName} · ${packageLabel}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: "You're registered — First40 × It's Lifey Workshop (June 18)",
      html: applicantHtml,
      text: [
        `Hi ${firstName},`,
        "",
        "Thank you for registering for the First40 × It's Lifey Virtual Workshop on June 18.",
        `Package selected: ${packageLabel}`,
        "",
        "You'll be taken to our secure checkout to complete your registration. If you have questions before June 18, just reply to this email.",
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
          "We couldn't send that just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  if (toRegistrant.error) {
    console.error("Resend error (registrant confirmation):", toRegistrant.error);
    // Non-fatal — we still redirect to Stripe
  }

  return NextResponse.json({
    ok: true as const,
    url: stripeUrl,
  });
}
