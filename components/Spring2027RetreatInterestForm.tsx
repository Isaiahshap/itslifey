"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15 disabled:opacity-60";

export function Spring2027RetreatInterestForm() {
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
      recaptchaToken = await getRecaptchaToken("spring_2027_retreat_interest");
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
      const res = await fetch("/api/spring-2027-retreat-interest", {
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
          content_name: "Spring 2027 Widow Wellness Retreat Interest",
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
        className="rounded-2xl border border-[#e76fab]/25 bg-[#fdf8fb] px-6 py-8 text-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
          You&apos;re on the list
        </p>
        <p className="mt-3 text-xl font-semibold leading-snug text-[#141413]">
          Thank you — we&apos;ll be in touch as Spring 2027 details unfold.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#666766]">
          Check your inbox for a quick confirmation. If you have questions,{" "}
          <a
            href="/contact"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2"
          >
            contact us
          </a>
          anytime.
        </p>
      </div>
    );
  }

  const isSending = status === "sending";

  return (
    <form className="relative space-y-5" onSubmit={onSubmit} noValidate>
      <FormHoneypot idPrefix="spring-2027" />

      {status === "error" && feedback ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
        >
          {feedback}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="spring-2027-name"
          className="block text-sm font-semibold text-black"
        >
          Name
        </label>
        <input
          id="spring-2027-name"
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
          htmlFor="spring-2027-email"
          className="block text-sm font-semibold text-black"
        >
          Email
        </label>
        <input
          id="spring-2027-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSending}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="spring-2027-phone"
          className="block text-sm font-semibold text-black"
        >
          Phone <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id="spring-2027-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={isSending}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="spring-2027-note"
          className="block text-sm font-semibold text-black"
        >
          Anything you&apos;d like us to know{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <textarea
          id="spring-2027-note"
          name="note"
          rows={3}
          disabled={isSending}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="Questions, timing preferences, or what you're hoping for."
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded-full bg-[#e76fab] px-8 py-4 text-base font-semibold text-white shadow-md shadow-black/10 transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSending ? "Joining…" : "Join the interest list"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[#888]">
          No obligation — just early access when details and registration open.
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
