/**
 * Hidden field name — must stay empty.
 * Avoid naming/labeling this as website/url/company (browsers often autofill
 * those and silently drop real submissions).
 */
export const HONEYPOT_FIELD = "itslifeyHp" as const;

export function honeypotIsTripped(body: Record<string, unknown>): boolean {
  const v = body[HONEYPOT_FIELD];
  if (typeof v !== "string") return false;
  const tripped = v.trim().length > 0;
  if (tripped) {
    console.warn(
      "[form-spam] honeypot tripped — submission dropped without email",
    );
  }
  return tripped;
}
