"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { redirectAfterMetaPixel } from "@/lib/meta-pixel-client";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import {
  useState,
  type FormEvent,
} from "react";

const inputClass =
  "mt-2 w-full rounded-none border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15";

type VirtualHealingSignupFormProps = {
  /** Prefix for input ids when multiple forms exist on one page (e.g. homepage modal). */
  idPrefix?: string;
  /**
   * `interest` — collect waitlist signups (no Stripe).
   * `checkout` — $200 deposit via Stripe (when registration is open).
   */
  mode?: "interest" | "checkout";
};

export function VirtualHealingSignupForm({
  idPrefix = "vhe",
  mode = "interest",
}: VirtualHealingSignupFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    const fd = new FormData(form);
    let recaptchaToken: string | undefined;
    try {
      recaptchaToken = await getRecaptchaToken("virtual_healing");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't verify the form. Please refresh the page and try again.",
      );
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      note: String(fd.get("note") ?? "").trim(),
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };

    const endpoint =
      mode === "checkout"
        ? "/api/virtual-healing-checkout"
        : "/api/virtual-healing-inquiry";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        url?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }

      if (mode === "checkout") {
        if (typeof window.fbq === "function") {
          window.fbq("track", "InitiateCheckout", {
            content_name: "Virtual Healing Experiences",
            content_category: "Support",
            value: 200,
            currency: "USD",
          });
        }
        if (data.url) {
          redirectAfterMetaPixel(data.url);
        }
        return;
      }

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Virtual Healing Experiences — August interest",
          content_category: "Support",
        });
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  }

  const pid = idPrefix;
  const isSending = status === "sending";
  const isInterest = mode === "interest";

  if (status === "success" && isInterest) {
    return (
      <div
        role="status"
        className="rounded-none border border-[#e76fab]/25 bg-[#fdf8fb] px-5 py-6 text-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
          You&apos;re on the list
        </p>
        <p className="mt-3 text-[1.05rem] font-semibold leading-snug text-[#141413]">
          Thank you—we&apos;ll reach out about the August cohort.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#666766]">
          We read every note with care. If you have questions in the meantime,{" "}
          <a
            href="/contact"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2"
          >
            contact us
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className="relative space-y-5"
      onSubmit={onSubmit}
      noValidate
      id={`${pid}-virtual-healing-signup`}
    >
      <FormHoneypot idPrefix={pid} />

      {status === "error" && errorMessage ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
        >
          {errorMessage}
        </p>
      ) : null}

      <div>
        <label
          htmlFor={`${pid}-name`}
          className="block text-sm font-semibold text-black"
        >
          Name
        </label>
        <input
          id={`${pid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor={`${pid}-email`}
          className="block text-sm font-semibold text-black"
        >
          Email
        </label>
        <input
          id={`${pid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor={`${pid}-phone`}
          className="block text-sm font-semibold text-black"
        >
          Phone <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id={`${pid}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor={`${pid}-note`}
          className="block text-sm font-semibold text-black"
        >
          Anything you&apos;d like us to know{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <textarea
          id={`${pid}-note`}
          name="note"
          rows={3}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder={
            isInterest
              ? "Questions, accessibility needs, or what you're hoping for from the August cohort."
              : "Questions, accessibility needs, or what you're hoping for from this experience."
          }
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="il-btn il-btn--solid"
        >
          {isSending
            ? "Sending…"
            : isInterest
              ? "Notify me about August"
              : "Reserve my spot — $200 deposit"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[#888]">
          {isInterest
            ? "We'll email you when registration opens for the August cohort. No payment today."
            : "You'll be taken to a secure Stripe checkout for your $200 deposit, which goes toward your total program investment."}
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
