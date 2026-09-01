"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-none border border-[#5a3d8a]/15 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#7a5aaf]/45 focus:ring-4 focus:ring-[#7a5aaf]/15 disabled:opacity-60";

const ROOM_OPTIONS = [
  { value: "", label: "Not sure yet" },
  { value: "private", label: "Private Room — $4,200" },
  { value: "double", label: "Double Room — $3,700" },
  { value: "triple", label: "Triple Room — $3,200" },
] as const;

export function WinterWidowWellnessEarlyBirdForm() {
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
      recaptchaToken = await getRecaptchaToken(
        "winter_widow_wellness_interest",
      );
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
      roomPreference: String(fd.get("roomPreference") ?? "").trim(),
      note: String(fd.get("note") ?? "").trim(),
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };

    try {
      const res = await fetch("/api/winter-widow-wellness-interest", {
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
          content_name: "Winter Widow Wellness Retreat Interest",
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
        className="rounded-none border border-[#7a5aaf]/25 bg-[#f4f0fa] px-6 py-8 text-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a3d8a]">
          Interest received
        </p>
        <p className="mt-3 text-xl font-semibold leading-snug text-[#141413]">
          Thank you — we&apos;ll be in touch soon about the Winter Widow
          Wellness Retreat.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#666766]">
          Check your inbox for a quick confirmation. Questions?{" "}
          <a
            href="/contact"
            className="font-semibold text-[#7a5aaf] underline decoration-[#7a5aaf]/40 underline-offset-2"
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
      <FormHoneypot idPrefix="winter-ww" />

      {status === "error" && feedback ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
        >
          {feedback}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="winter-ww-name"
          className="block text-sm font-semibold text-black"
        >
          Name
        </label>
        <input
          id="winter-ww-name"
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
          htmlFor="winter-ww-email"
          className="block text-sm font-semibold text-black"
        >
          Email
        </label>
        <input
          id="winter-ww-email"
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
          htmlFor="winter-ww-phone"
          className="block text-sm font-semibold text-black"
        >
          Phone <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id="winter-ww-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={isSending}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="winter-ww-room"
          className="block text-sm font-semibold text-black"
        >
          Room preference{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <select
          id="winter-ww-room"
          name="roomPreference"
          disabled={isSending}
          className={inputClass}
          defaultValue=""
        >
          {ROOM_OPTIONS.map((opt) => (
            <option key={opt.value || "unsure"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="winter-ww-note"
          className="block text-sm font-semibold text-black"
        >
          Anything you&apos;d like us to know{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <textarea
          id="winter-ww-note"
          name="note"
          rows={3}
          disabled={isSending}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="Questions, timing, or what you're hoping for."
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="wwr-btn disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSending ? "Sending…" : "Share your interest"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[#888]">
          No payment today — this is interest only. We&apos;ll follow up by
          email to confirm your spot.
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
