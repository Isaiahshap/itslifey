/**
 * Google reCAPTCHA v3 (or v2) server verification.
 * @see https://developers.google.com/recaptcha/docs/verify
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyRecaptchaToken(
  token: string,
  secret: string,
  expectedAction: string,
  minScore = 0.5,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);

  let res: Response;
  try {
    res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
  } catch {
    return { ok: false, reason: "verify_unreachable" };
  }

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    score?: number;
    action?: string;
    "error-codes"?: string[];
  };

  if (!data.success) {
    return {
      ok: false,
      reason: (data["error-codes"] ?? ["verify_failed"]).join(","),
    };
  }

  if (data.action && data.action !== expectedAction) {
    return { ok: false, reason: "action_mismatch" };
  }

  if (typeof data.score === "number" && data.score < minScore) {
    return { ok: false, reason: "score_too_low" };
  }

  return { ok: true };
}
