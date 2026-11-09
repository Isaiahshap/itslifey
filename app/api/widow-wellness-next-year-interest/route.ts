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
  NEXT_YEAR_INTEREST_NAME,
  NEXT_YEAR_LABEL,
} from "@/lib/widow-wellness-event";
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
      "widow_wellness_next_year_interest",
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
  const note = trimField(o.note, 4000);

  if (!fullName || !email) {
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
    process.env.RETREAT_INTEREST_TO?.trim() ||
    process.env.INTERNAL_FORM_LOG_TO?.trim() ||
    INTERNAL_TO;

  const submittedAtIso = new Date().toISOString();
  const greet = firstNameFromFull(fullName);

  const applicantInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Thank you for your interest in the next <strong style="color:#1a1918;">${escapeHtml(EVENT_NAME)}</strong>.</p>
<p style="margin:0 0 16px;">Our ${escapeHtml(NEXT_YEAR_LABEL)} gathering is already in the works. You&rsquo;ll be among the first to hear dates, details, and registration when they open.</p>
<p style="margin:0 0 16px;">No payment was taken today — this form is interest only.</p>
<p style="margin:0;font-size:15px;color:#666766;">Questions? Just reply to this email anytime.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: `${NEXT_YEAR_LABEL} interest received`,
    innerHtml: applicantInner,
  });

  const rows: { label: string; value: string }[] = [
    { label: "Event", value: NEXT_YEAR_INTEREST_NAME },
    { label: "Name", value: fullName },
    { label: "Email", value: email },
  ];
  if (phone) rows.push({ label: "Phone", value: phone });
  rows.push({ label: "Note", value: note || "—" });

  const internalHtml = wrapInternalLogEmail({
    title: "Widow Wellness next-year interest",
    sourceLabel: "WW NEXT YEAR INTEREST",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Response log] Widow Wellness next-year interest",
    `Event: ${NEXT_YEAR_INTEREST_NAME}`,
    `Received: ${submittedAtIso}`,
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    "",
    "Note:",
    note || "—",
  ].join("\n");

  const resend = new Resend(key);

  const [toJennifer, toApplicant] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Log] WW ${NEXT_YEAR_LABEL} interest — ${fullName}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: `Interest received — ${NEXT_YEAR_INTEREST_NAME}`,
      html: applicantHtml,
      text: [
        `Hi ${greet},`,
        "",
        `Thank you for your interest in the next ${EVENT_NAME}.`,
        "",
        `Our ${NEXT_YEAR_LABEL} gathering is already in the works. You'll be among the first to hear dates, details, and registration when they open.`,
        "",
        "No payment was taken today — this form is interest only.",
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
          "We couldn’t save your interest just now. Please try again in a moment or use the Contact page.",
      },
      { status: 502 },
    );
  }

  // Interest is saved once Jennifer's log email succeeds. Confirmation to the
  // visitor can fail (spam filters, Resend recipient rules) without losing the lead.
  if (toApplicant.error) {
    console.error("Resend error (confirmation):", toApplicant.error);
  }

  return NextResponse.json({
    ok: true as const,
    id: toJennifer.data?.id ?? toApplicant.data?.id ?? null,
  });
}
