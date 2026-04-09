/** Required disclosure when reCAPTCHA is used (Google). */
export function RecaptchaNotice() {
  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()) return null;
  return (
    <p className="mt-3 text-xs leading-relaxed text-[#666766]/90">
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        className="underline decoration-[#666766]/40 underline-offset-2 hover:decoration-[#666766]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        className="underline decoration-[#666766]/40 underline-offset-2 hover:decoration-[#666766]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
