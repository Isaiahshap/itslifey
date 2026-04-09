import { WP_HEADLESS_ORIGIN } from "@/lib/wp-config";

/**
 * Normalize URLs returned by WordPress (often still pointing at the public
 * domain) to the headless / staging host so images and links resolve.
 */
export function normalizeWpUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  let out = url.trim();
  if (!out) return "";
  out = out.replace(/https?:\/\/itslifey\.com/gi, WP_HEADLESS_ORIGIN);
  const host = new URL(WP_HEADLESS_ORIGIN).host;
  out = out.replace(/^\/\/itslifey\.com/gi, `//${host}`);
  return out;
}

/**
 * Apply URL normalization across a full HTML fragment (content, excerpts).
 */
export function normalizeWpHtml(html: string | null | undefined): string {
  if (!html || typeof html !== "string") return "";
  return normalizeWpUrl(html);
}
