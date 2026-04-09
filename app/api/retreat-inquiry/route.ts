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
      "retreat_inquiry",
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

  const fullName = trimField(o.fullName, 200);
  const email = trimField(o.email, 320);
  const phone = trimField(o.phone, 80);
  const address = trimField(o.address, 500);
  const whyJoin = trimField(o.whyJoin, 8000);

  if (!fullName || !email || !phone || !address || !whyJoin) {
    return NextResponse.json(
      { error: "Please fill in every field." },
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
    process.env.INTERNAL_FORM_LOG_TO?.trim() ||
    process.env.RETREAT_INQUIRY_TO?.trim() ||
    INTERNAL_TO;

  const submittedAtIso = new Date().toISOString();
  const greet = firstNameFromFull(fullName);

  const applicantInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Thank you for applying for the <strong style="color:#1a1918;">Summer 2026 Widow Wellness Retreat</strong>. We&rsquo;ve received your application and will read it with care.</p>
<p style="margin:0 0 16px;">There&rsquo;s no pressure and no rush—if it feels like a fit, we&rsquo;ll follow up with next steps.</p>
<p style="margin:0;font-size:15px;color:#666766;">If anything about your application changes, you can reply to this email and we&rsquo;ll see it.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: "We received your retreat application",
    innerHtml: applicantInner,
  });

  const internalHtml = wrapInternalLogEmail({
    title: "Summer 2026 retreat application",
    sourceLabel: "RETREAT FORM",
    submittedAtIso,
    rows: [
      { label: "Name", value: fullName },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Address", value: address },
      { label: "Why join", value: whyJoin },
    ],
  });

  const internalText = [
    "[Response log] Summer 2026 retreat application",
    `Received: ${submittedAtIso}`,
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    "",
    "Why join:",
    whyJoin,
  ].join("\n");

  const resend = new Resend(key);

  const [toJennifer, toApplicant] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Log] Retreat application — ${fullName}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: "We received your Summer 2026 retreat application — It's Lifey",
      html: applicantHtml,
      text: [
        `Hi ${greet},`,
        "",
        "Thank you for applying for the Summer 2026 Widow Wellness Retreat. We've received your application and will read it with care.",
        "",
        "There's no pressure and no rush—if it feels like a fit, we'll follow up with next steps.",
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
          "We couldn’t send that just now. Please try again in a moment or use the Contact page.",
      },
      { status: 502 },
    );
  }

  if (toApplicant.error) {
    console.error("Resend error (applicant confirmation):", toApplicant.error);
    return NextResponse.json(
      {
        error:
          "Your application was saved for our team, but we couldn’t send your confirmation email. Please check your spam folder or email us from the Contact page.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true as const,
    id: toApplicant.data?.id ?? toJennifer.data?.id ?? null,
  });
}
