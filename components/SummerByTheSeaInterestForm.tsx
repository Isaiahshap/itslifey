"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-none border border-[#1c1714]/12 bg-white px-4 py-3 text-base text-[#1c1714] outline-none transition-shadow focus:border-[#e76fab]/45 focus:ring-4 focus:ring-[#e76fab]/15 disabled:opacity-60";

export function SummerByTheSeaInterestForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setFeedback("");

    const fd = new FormData(form);
    let recaptchaToken: string | undefined;
    try {
      recaptchaToken = await getRecaptchaToken("summer_by_the_sea_interest");
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t verify the form. Please refresh the page and try again.",
      );
      return;
    }

    const payload = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      note: String(fd.get("note") ?? "").trim(),
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };

    try {
      const res = await fetch("/api/summer-by-the-sea-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setFeedback(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Summer by the Sea Interest",
          content_category: "Retreat",
        });
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t reach the server. Check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-[#e76fab]/25 bg-[#fdf8fb] px-6 py-8 text-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
          You&apos;re on the list
        </p>
        <p className="mt-3 text-xl font-semibold leading-snug text-[#1c1714]">
          Thank you — we&apos;ll be in touch about Summer by the Sea.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#5e5852]">
          July 9–12, 2027, on Cape Cod. Check your inbox for a confirmation.
          Questions?{" "}
          <a
            href="/contact"
            className="font-semibold text-[#b8457e] underline decoration-[#e76fab]/40 underline-offset-2"
          >
            Contact us
          </a>
          .
        </p>
      </div>
    );
  }

  const isSending = status === "sending";

  return (
    <form className="relative space-y-5" onSubmit={onSubmit} noValidate>
      <FormHoneypot idPrefix="summer-sea" />

      {status === "error" && feedback ? (
        <p
          role="alert"
          aria-live="assertive"
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
        >
          {feedback}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="summer-sea-name"
          className="block text-sm font-semibold text-[#1c1714]"
        >
          Name
        </label>
        <input
          id="summer-sea-name"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          disabled={isSending}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="summer-sea-email"
          className="block text-sm font-semibold text-[#1c1714]"
        >
          Email
        </label>
        <input
          id="summer-sea-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          disabled={isSending}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="summer-sea-phone"
          className="block text-sm font-semibold text-[#1c1714]"
        >
          Phone <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id="summer-sea-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          disabled={isSending}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="summer-sea-note"
          className="block text-sm font-semibold text-[#1c1714]"
        >
          Anything you&apos;d like us to know{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <textarea
          id="summer-sea-note"
          name="note"
          rows={3}
          disabled={isSending}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="Questions, or what you're hoping these four days will hold."
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="il-btn il-btn--solid"
        >
          {isSending ? "Sending…" : "Share your interest"}
          {isSending ? null : (
            <span aria-hidden className="il-btn__arrow">
              →
            </span>
          )}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[#888]">
          No payment today. We&apos;ll follow up when details and registration
          open.
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
