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

const RETREAT_NAME = "Spring 2027 Widow Wellness Retreat";

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
      "spring_2027_retreat_interest",
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
<p style="margin:0 0 16px;">Thank you for joining the interest list for the <strong style="color:#1a1918;">${escapeHtml(RETREAT_NAME)}</strong>.</p>
<p style="margin:0 0 16px;">You&rsquo;ll be among the first to hear retreat details, early registration, pricing, and updates as plans unfold. There&rsquo;s no obligation&mdash;just early access when enrollment opens.</p>
<p style="margin:0 0 16px;">Remember: the first 5 women who register when enrollment opens will receive <strong style="color:#1a1918;">20% off</strong> their retreat registration.</p>
<p style="margin:0;font-size:15px;color:#666766;">If anything changes, reply to this email anytime.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: "You're on the Spring 2027 interest list",
    innerHtml: applicantInner,
  });

  const rows: { label: string; value: string }[] = [
    { label: "Retreat", value: RETREAT_NAME },
    { label: "Name", value: fullName },
    { label: "Email", value: email },
  ];
  if (phone) rows.push({ label: "Phone", value: phone });
  rows.push({ label: "Note", value: note || "—" });

  const internalHtml = wrapInternalLogEmail({
    title: "Spring 2027 retreat interest list",
    sourceLabel: "SPRING 2027 INTEREST",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Response log] Spring 2027 retreat interest list",
    `Retreat: ${RETREAT_NAME}`,
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
      subject: `[Log] Spring 2027 retreat interest — ${fullName}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: `You're on the list — ${RETREAT_NAME}`,
      html: applicantHtml,
      text: [
        `Hi ${greet},`,
        "",
        `Thank you for joining the interest list for the ${RETREAT_NAME}.`,
        "",
        "You'll be among the first to hear retreat details, early registration, pricing, and updates as plans unfold. There's no obligation—just early access when enrollment opens.",
        "",
        "Remember: the first 5 women who register when enrollment opens will receive 20% off their retreat registration.",
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
          "We couldn’t add you just now. Please try again in a moment or use the Contact page.",
      },
      { status: 502 },
    );
  }

  if (toApplicant.error) {
    console.error("Resend error (confirmation):", toApplicant.error);
    return NextResponse.json(
      {
        error:
          "You’re on our list, but we couldn’t send a confirmation email. Please check your spam folder or email us from the Contact page.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true as const,
    id: toApplicant.data?.id ?? toJennifer.data?.id ?? null,
  });
}
