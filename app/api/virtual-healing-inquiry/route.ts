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
  const noteDisplay = note || "—";

  const applicantInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Thank you for your interest in <strong style="color:#1a1918;">The Body Keeps the Story</strong> — Tina Walsh&rsquo;s six-week virtual healing experience with It&rsquo;s Lifey. We&rsquo;ve received your request and will follow up with next steps to reserve one of the eight spots.</p>
<p style="margin:0;font-size:15px;color:#666766;">If anything changes or you have a question, you can reply to this email.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: "We received your interest",
    innerHtml: applicantInner,
  });

  const rows: { label: string; value: string }[] = [
    { label: "Program", value: PROGRAM_LABEL },
    { label: "Name", value: name },
    { label: "Email", value: email },
  ];
  if (phone) rows.push({ label: "Phone", value: phone });
  rows.push({ label: "Note", value: noteDisplay });

  const internalHtml = wrapInternalLogEmail({
    title: "Virtual healing experience — signup interest",
    sourceLabel: "VIRTUAL HEALING",
    submittedAtIso,
    rows,
  });

  const internalText = [
    "[Response log] Virtual healing experience",
    `Program: ${PROGRAM_LABEL}`,
    `Received: ${submittedAtIso}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    "",
    "Note:",
    noteDisplay,
  ].join("\n");

  const resend = new Resend(key);

  const [toJennifer, toSender] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[Log] Virtual Healing — ${name}`,
      html: internalHtml,
      text: internalText,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject:
        "We received your interest — The Body Keeps the Story (It's Lifey)",
      html: applicantHtml,
      text: [
        `Hi ${greet},`,
        "",
        "Thank you for your interest in The Body Keeps the Story — Tina Walsh's six-week virtual healing experience with It's Lifey.",
        "We've received your request and will follow up with next steps to reserve one of the eight spots.",
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
          "Your request reached our team, but we couldn’t send your confirmation email. Please check spam or try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true as const,
    id: toSender.data?.id ?? toJennifer.data?.id ?? null,
  });
}
