import { Resend } from "resend";
import { NextResponse } from "next/server";

const FROM = "Jennifer <jennifer@itslifey.com>";
const DEFAULT_TO = "jennifer@itslifey.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  const to = process.env.RETREAT_INQUIRY_TO?.trim() || DEFAULT_TO;

  const text = [
    "New Summer 2026 retreat application",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    "",
    "Why they want to join:",
    whyJoin,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,-apple-system,sans-serif;line-height:1.55;color:#222;max-width:42rem">
  <h2 style="color:#111;font-size:1.125rem">Summer 2026 retreat application</h2>
  <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
  <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
  <p><strong>Address:</strong> ${escapeHtml(address)}</p>
  <p><strong>Why join</strong></p>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(whyJoin)}</p>
</body>
</html>`;

  const resend = new Resend(key);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    replyTo: email,
    subject: `Summer 2026 retreat: ${fullName}`,
    text,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      {
        error:
          "We couldn’t send that just now. Please try again in a moment or use the Contact page.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const, id: data?.id ?? null });
}
