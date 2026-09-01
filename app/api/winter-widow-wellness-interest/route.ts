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

const RETREAT_NAME = "Winter Widow Wellness Retreat";

const ROOM_LABELS: Record<string, string> = {
  private: "Private Room — $4,200",
  double: "Double Room — $3,700",
  triple: "Triple Room — $3,200",
};

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
      "winter_widow_wellness_interest",
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
  const roomPreference = trimField(o.roomPreference, 40);
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

  const roomLabel =
    ROOM_LABELS[roomPreference] ??
    (roomPreference ? roomPreference : "Not sure yet");

  const internalTo =
    process.env.RETREAT_INTEREST_TO?.trim() ||
    process.env.INTERNAL_FORM_LOG_TO?.trim() ||
    INTERNAL_TO;

  const submittedAtIso = new Date().toISOString();
  const greet = firstNameFromFull(fullName);

  const applicantInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Thank you for your interest in the <strong style="color:#1a1918;">${escapeHtml(RETREAT_NAME)}</strong>.</p>
<p style="margin:0 0 16px;">This is a small, intimate Hudson Valley winter escape — luxury accommodations, a private chef, spa, guided adventure, and women who just get it.</p>
<p style="margin:0 0 16px;">We&rsquo;ll follow up soon with next steps. No payment was taken today — this form is interest only.</p>
<p style="margin:0;font-size:15px;color:#666766;">Questions? Just reply to this email anytime.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: "Winter Widow Wellness — interest received",
    innerHtml: applicantInner,
  });

  const rows: { label: string; value: string }[] = [
    { label: "Retreat", value: RETREAT_NAME },
    { label: "Name", value: fullName },
    { label: "Email", value: email },
  ];
  if (phone) rows.push({ label: "Phone", value: phone });
  rows.push({ label: "Room preference", value: roomLabel });
  rows.push({ label: "Note", value: note || "—" });

  const internalHtml = wrapInternalLogEmail({
    title: "Winter Widow Wellness interest",
    sourceLabel: "WINTER WW INTEREST",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Response log] Winter Widow Wellness interest",
    `Retreat: ${RETREAT_NAME}`,
    `Received: ${submittedAtIso}`,
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    `Room preference: ${roomLabel}`,
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
      subject: `[Log] Winter WW interest — ${fullName}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: `Interest received — ${RETREAT_NAME}`,
      html: applicantHtml,
      text: [
        `Hi ${greet},`,
        "",
        `Thank you for your interest in the ${RETREAT_NAME}.`,
        "",
        "This is a small, intimate Hudson Valley winter escape — luxury accommodations, a private chef, spa, guided adventure, and women who just get it.",
        "",
        "We'll follow up soon with next steps. No payment was taken today — this form is interest only.",
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

  if (toApplicant.error) {
    console.error("Resend error (confirmation):", toApplicant.error);
    return NextResponse.json(
      {
        error:
          "We received your interest, but couldn’t send a confirmation email. Please check your spam folder or email us from the Contact page.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true as const,
    id: toApplicant.data?.id ?? toJennifer.data?.id ?? null,
  });
}
