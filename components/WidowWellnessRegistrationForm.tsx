"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import {
  EVENT_NAME,
  TICKET_TIERS,
  type TicketTierKey,
} from "@/lib/widow-wellness-event";
import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15";

export function WidowWellnessRegistrationForm() {
  const [ticketTier, setTicketTier] = useState<TicketTierKey>("regular");
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
      recaptchaToken = await getRecaptchaToken("widow_wellness_registration");
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
      ticketTier,
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };

    try {
      const res = await fetch("/api/widow-wellness-registration", {
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

      const selected = TICKET_TIERS[ticketTier];
      if (typeof window.fbq === "function") {
        window.fbq("track", "InitiateCheckout", {
          content_name: `${EVENT_NAME} — ${selected.shortLabel}`,
          content_category: "Events",
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
  const selected = TICKET_TIERS[ticketTier];

  return (
    <form className="relative space-y-6" onSubmit={onSubmit} noValidate>
      <FormHoneypot idPrefix="ww-reg" />

      {status === "error" && errorMessage ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
        >
          {errorMessage}
        </p>
      ) : null}

      <fieldset>
        <legend className="text-sm font-semibold text-black">
          Choose your ticket
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(Object.keys(TICKET_TIERS) as TicketTierKey[]).map((key) => {
            const tier = TICKET_TIERS[key];
            const active = ticketTier === key;
            return (
              <label
                key={key}
                className={`cursor-pointer rounded-2xl border p-4 transition-[border-color,box-shadow,background-color] duration-200 ${
                  active
                    ? "border-[#e76fab] bg-[#fdf8fb] shadow-[0_8px_28px_-8px_rgba(231,111,171,0.35)]"
                    : "border-black/10 bg-white hover:border-[#e76fab]/35"
                }`}
              >
                <input
                  type="radio"
                  name="ticketTier"
                  value={key}
                  checked={active}
                  onChange={() => setTicketTier(key)}
                  className="sr-only"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8457e]">
                  {tier.shortLabel}
                </p>
                <p className="mt-1 text-2xl font-semibold text-[#141413]">
                  ${tier.price}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#666766]">
                  {tier.description}
                </p>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="ww-reg-name" className="block text-sm font-semibold text-black">
          Name
        </label>
        <input
          id="ww-reg-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ww-reg-email" className="block text-sm font-semibold text-black">
          Email
        </label>
        <input
          id="ww-reg-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ww-reg-phone" className="block text-sm font-semibold text-black">
          Phone <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id="ww-reg-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ww-reg-note" className="block text-sm font-semibold text-black">
          Anything you&apos;d like us to know{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <textarea
          id="ww-reg-note"
          name="note"
          rows={3}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="Accessibility needs, dietary notes, or questions about the day."
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
            : `Reserve my spot — $${selected.price}`}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[#888]">
          You&apos;ll be taken to secure Stripe checkout to complete payment. Your
          ticket isn&apos;t final until payment is received — we&apos;ll also email
          you the link in case you need it.
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
