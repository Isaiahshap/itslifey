/**
 * Shared HTML email styling for Resend — soft eggshell outer, white card, pink accent.
 */

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
  return "https://itslifey.com";
}

const FOOTER_NOTE =
  "You're receiving this because you submitted a form on the It's Lifey website.";

/** Public-facing confirmation — pink accent bar, white card on soft ground. */
export function wrapBrandedEmail(opts: {
  /** Plain text; HTML entities would be double-escaped (e.g. & → &amp;). */
  heading: string;
  innerHtml: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f3ee;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f3ee;padding:36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #ebe2e6;box-shadow:0 12px 40px rgba(231,111,171,0.12);">
          <tr>
            <td style="height:5px;background:#e76fab;"></td>
          </tr>
          <tr>
            <td style="padding:28px 32px 36px;font-family:'Nunito Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:17px;line-height:1.65;color:#2a2928;background:linear-gradient(180deg,#fffdfc 0%,#ffffff 100%);">
              <p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#c2528c;">It&rsquo;s Lifey</p>
              <h1 style="margin:0 0 18px;font-size:22px;font-weight:600;color:#1a1918;letter-spacing:-0.02em;">${escapeHtml(opts.heading)}</h1>
              ${opts.innerHtml}
              <p style="margin:28px 0 0;font-size:14px;line-height:1.55;color:#666766;">With care,<br /><span style="color:#e76fab;font-weight:600;">Jennifer &amp; the It&rsquo;s Lifey team</span></p>
            </td>
          </tr>
        </table>
        <p style="font-family:'Nunito Sans',-apple-system,sans-serif;font-size:12px;line-height:1.5;color:#888;max-width:560px;margin:20px auto 0;text-align:center;">${FOOTER_NOTE}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Internal notification — readable log, pink header strip. */
export function wrapInternalLogEmail(opts: {
  title: string;
  sourceLabel: string;
  rows: { label: string; value: string }[];
  submittedAtIso: string;
}): string {
  const rowsHtml = opts.rows
    .map(
      (r) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#1a1918;width:140px;vertical-align:top;font-size:14px;">${escapeHtml(r.label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#444;font-size:14px;white-space:pre-wrap;">${escapeHtml(r.value)}</td>
    </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#ede8e4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        <tr><td style="background:#e76fab;color:#fff;padding:14px 20px;font-family:sans-serif;font-size:13px;font-weight:700;letter-spacing:0.06em;">RESPONSE LOG · ${escapeHtml(opts.sourceLabel)}</td></tr>
        <tr><td style="padding:16px 20px 20px;font-family:sans-serif;">
          <p style="margin:0 0 12px;font-size:17px;font-weight:600;color:#111;">${escapeHtml(opts.title)}</p>
          <p style="margin:0 0 16px;font-size:13px;color:#666;">Received: <strong>${escapeHtml(opts.submittedAtIso)}</strong> (UTC)</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
