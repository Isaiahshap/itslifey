"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import {
  EVENT_NAME,
  SPONSOR_TIERS,
  type SponsorTierKey,
} from "@/lib/widow-wellness-event";
import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15";

export function WidowWellnessSponsorshipForm() {
  const [sponsorTier, setSponsorTier] = useState<SponsorTierKey>("community");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    const fd = new FormData(form);
    let recaptchaToken: string | undefined;
    try {
      recaptchaToken = await getRecaptchaToken("widow_wellness_sponsorship");
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
      company: String(fd.get("company") ?? "").trim(),
      note: String(fd.get("note") ?? "").trim(),
      sponsorTier,
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };

    try {
      const res = await fetch("/api/widow-wellness-sponsorship", {
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

      const selected =
        SPONSOR_TIERS.find((tier) => tier.key === sponsorTier) ??
        SPONSOR_TIERS[0];

      if (typeof window.fbq === "function") {
        window.fbq("track", "InitiateCheckout", {
          content_name: `${EVENT_NAME} — ${selected.label}`,
          content_category: "Sponsorship",
          value: selected.price,
          currency: "USD",
        });
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  }

  const isSending = status === "sending";
  const selected =
    SPONSOR_TIERS.find((tier) => tier.key === sponsorTier) ?? SPONSOR_TIERS[0];

  return (
    <form className="relative space-y-6" onSubmit={onSubmit} noValidate>
      <FormHoneypot idPrefix="ww-sponsor" />

      {status === "error" && errorMessage ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
        >
          {errorMessage}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="ww-sponsor-tier"
          className="block text-sm font-semibold text-black"
        >
          Sponsorship level
        </label>
        <select
          id="ww-sponsor-tier"
          name="sponsorTier"
          value={sponsorTier}
          onChange={(e) => setSponsorTier(e.target.value as SponsorTierKey)}
          className={inputClass}
          required
        >
          {SPONSOR_TIERS.map((tier) => (
            <option key={tier.key} value={tier.key}>
              {tier.label} — ${tier.price.toLocaleString()} ({tier.availability})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ww-sponsor-name" className="block text-sm font-semibold text-black">
          Your name
        </label>
        <input
          id="ww-sponsor-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="ww-sponsor-company"
          className="block text-sm font-semibold text-black"
        >
          Company name
        </label>
        <input
          id="ww-sponsor-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ww-sponsor-email" className="block text-sm font-semibold text-black">
          Email
        </label>
        <input
          id="ww-sponsor-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ww-sponsor-phone" className="block text-sm font-semibold text-black">
          Phone <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id="ww-sponsor-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ww-sponsor-note" className="block text-sm font-semibold text-black">
          Notes or questions{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <textarea
          id="ww-sponsor-note"
          name="note"
          rows={4}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="Tell us about your brand, what you're hoping for from sponsorship, or any questions."
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded-full bg-[#e76fab] px-8 py-4 text-base font-semibold text-white shadow-md shadow-black/10 transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSending
            ? "Sending…"
            : `Continue to payment — $${selected.price.toLocaleString()}`}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[#888]">
          You&apos;ll be redirected to Stripe to complete sponsorship payment.
          We&apos;ll email you the link as well — your spot isn&apos;t confirmed
          until payment is received.
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
