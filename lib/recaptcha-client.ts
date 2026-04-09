"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let loadPromise: Promise<void> | null = null;

const READY_POLL_MS = 50;
const READY_TIMEOUT_MS = 15000;

function ensureRecaptchaScript(siteKey: string): void {
  if (document.querySelector('script[src*="google.com/recaptcha/api.js"]')) {
    return;
  }
  const s = document.createElement("script");
  s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
  s.async = true;
  document.head.appendChild(s);
}

async function waitForRecaptchaReady(): Promise<void> {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (window.grecaptcha?.ready) return;
    await new Promise((r) => setTimeout(r, READY_POLL_MS));
  }
  throw new Error("recaptcha timeout");
}

async function ensureRecaptchaLoaded(siteKey: string): Promise<void> {
  if (typeof window === "undefined") return;
  if (window.grecaptcha?.ready) return;

  if (!loadPromise) {
    ensureRecaptchaScript(siteKey);
    loadPromise = waitForRecaptchaReady().catch((e) => {
      loadPromise = null;
      throw e;
    });
  }

  await loadPromise;
}

/**
 * reCAPTCHA v3 token, or `undefined` when no site key (local dev without keys).
 */
export async function getRecaptchaToken(
  action: string,
): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  if (!siteKey) return undefined;

  await ensureRecaptchaLoaded(siteKey);

  const g = window.grecaptcha;
  if (!g?.ready) {
    throw new Error("recaptcha not ready");
  }

  return new Promise((resolve, reject) => {
    g.ready(async () => {
      try {
        const token = await g.execute!(siteKey, { action });
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  });
}
