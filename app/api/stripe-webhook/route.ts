import { createHmac, timingSafeEqual } from "crypto";
import {
  escapeHtml,
  getSiteOrigin,
  wrapBrandedEmail,
  wrapInternalLogEmail,
} from "@/lib/email-brand";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const FROM = "Jennifer <jennifer@itslifey.com>";
const INTERNAL_TO = "jennifer@itslifey.com";
const PROGRAM_LABEL =
  "The Body Keeps the Story — Virtual Healing Experience (Tina Walsh)";

// Replay-attack window: reject events older than 5 minutes.
const TOLERANCE_SECONDS = 300;

function verifyStripeSignature(
  rawBody: string,
  sigHeader: string,
  secret: string,
): boolean {
  const parts = sigHeader.split(",").reduce<Record<string, string>>(
    (acc, item) => {
      const eq = item.indexOf("=");
      if (eq !== -1) acc[item.slice(0, eq)] = item.slice(eq + 1);
      return acc;
    },
    {},
  );

  const timestamp = parts["t"];
  const sig = parts["v1"];
  if (!timestamp || !sig) return false;

  const ts = parseInt(timestamp, 10);
  if (
    Number.isNaN(ts) ||
    Math.abs(Date.now() / 1000 - ts) > TOLERANCE_SECONDS
  ) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

function decodeClientRef(ref: string | null): {
  name: string;
  email: string;
} | null {
  if (!ref) return null;
  try {
    const decoded = Buffer.from(ref, "base64url").toString("utf8");
    const sep = decoded.indexOf("\x00");
    if (sep === -1) return null;
    return { name: decoded.slice(0, sep), email: decoded.slice(sep + 1) };
  } catch {
    return null;
  }
}

function firstNameFromFull(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

// Stripe sends raw JSON — we must not let Next.js parse it before we read the
// raw body for signature verification.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const sigHeader = request.headers.get("stripe-signature");
  if (!sigHeader) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await request.text();

  if (!verifyStripeSignature(rawBody, sigHeader, webhookSecret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Only handle successful checkout completions
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ok: true });
  }

  const session = event.data.object as {
    client_reference_id?: string | null;
    customer_details?: { email?: string | null; name?: string | null } | null;
    customer_email?: string | null;
    amount_total?: number | null;
  };

  // Resolve name and email from client_reference_id (set by our checkout route)
  // or fall back to what Stripe collected during payment.
  const refData = decodeClientRef(session.client_reference_id ?? null);
  const email =
    refData?.email ||
    session.customer_details?.email ||
    session.customer_email ||
    "";
  const name =
    refData?.name ||
    session.customer_details?.name ||
    "";

  if (!email) {
    console.error("Stripe webhook: no email found in session", session);
    return NextResponse.json({ ok: true });
  }

  if (!resendKey) {
    console.error("RESEND_API_KEY is not configured — skipping confirmation email");
    return NextResponse.json({ ok: true });
  }

  const greet = firstNameFromFull(name || email.split("@")[0]);
  const depositAmount =
    session.amount_total != null
      ? `$${(session.amount_total / 100).toFixed(0)}`
      : "$200";

  const applicantInner = `
<p style="margin:0 0 16px;">Hi ${escapeHtml(greet)},</p>
<p style="margin:0 0 16px;">Your <strong style="color:#1a1918;">${depositAmount} deposit</strong> for <strong style="color:#1a1918;">The Body Keeps the Story</strong> has been received. Your spot in the cohort is officially reserved.</p>
<p style="margin:0 0 16px;"><strong style="color:#1a1918;">Jennifer will be in touch</strong> with everything you need — Zoom link, schedule, and preparation notes — before the cohort begins on <strong style="color:#1a1918;">Wednesday, May 20</strong>.</p>
<p style="margin:0 0 16px;font-size:15px;color:#666766;">Your deposit is applied toward your total program investment ($899, or $849 with code ITSLIFEY50). If you have any questions or need to make changes, just reply to this email.</p>
<p style="margin:0;font-size:15px;color:#666766;">We can&rsquo;t wait to hold space for you.</p>`;

  const applicantHtml = wrapBrandedEmail({
    heading: "Your spot is reserved",
    innerHtml: applicantInner,
  });

  const applicantText = [
    `Hi ${greet},`,
    "",
    `Your ${depositAmount} deposit for The Body Keeps the Story has been received. Your spot is officially reserved.`,
    "",
    "Jennifer will be in touch with everything you need — Zoom link, schedule, and preparation notes — before the cohort begins on Wednesday, May 20.",
    "",
    "Your deposit is applied toward your total program investment ($899, or $849 with code ITSLIFEY50).",
    "Questions? Reply to this email.",
    "",
    `— Jennifer & the It's Lifey team`,
    "",
    getSiteOrigin(),
  ].join("\n");

  const internalHtml = wrapInternalLogEmail({
    title: "Virtual healing — deposit payment confirmed",
    sourceLabel: "VIRTUAL HEALING · PAID",
    submittedAtIso: new Date().toISOString(),
    rows: [
      { label: "Program", value: PROGRAM_LABEL },
      { label: "Name", value: name || "(not captured)" },
      { label: "Email", value: email },
      { label: "Deposit", value: depositAmount },
      { label: "Status", value: "PAYMENT CONFIRMED — confirmation email sent" },
    ],
  });

  const resend = new Resend(resendKey);
  const internalTo =
    process.env.INTERNAL_FORM_LOG_TO?.trim() || INTERNAL_TO;

  const [toJennifer, toSender] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [internalTo],
      replyTo: email,
      subject: `[PAID] Virtual Healing deposit — ${name || email}`,
      html: internalHtml,
      text: `Payment confirmed: ${name || email} — ${depositAmount} deposit`,
    }),
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: "Your spot is reserved — The Body Keeps the Story (It's Lifey)",
      html: applicantHtml,
      text: applicantText,
    }),
  ]);

  if (toJennifer.error)
    console.error("Resend error (internal paid log):", toJennifer.error);
  if (toSender.error)
    console.error("Resend error (deposit confirmation):", toSender.error);

  return NextResponse.json({ ok: true });
}
