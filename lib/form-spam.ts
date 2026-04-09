/**
 * Hidden field name — must stay empty.
 * Avoid `website` / `url` (browsers often autofill those and block real users).
 */
export const HONEYPOT_FIELD = "itslifeyHp" as const;

export function honeypotIsTripped(body: Record<string, unknown>): boolean {
  const v = body[HONEYPOT_FIELD];
  if (typeof v !== "string") return false;
  return v.trim().length > 0;
}
