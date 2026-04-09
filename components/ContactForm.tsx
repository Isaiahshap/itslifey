"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import Link from "next/link";
import {
  useState,
  type FormEvent,
} from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setFeedback("");
    const fd = new FormData(form);
    let recaptchaToken: string | undefined;
    try {
      recaptchaToken = await getRecaptchaToken("contact");
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t verify the form. Please refresh the page and try again.",
      );
      return;
    }
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };
    try {
      const res = await fetch("/api/contact", {
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
      setStatus("success");
      setFeedback(
        "Thank you—we received your message and sent a confirmation to your email.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t reach the server. Check your connection and try again.",
      );
    }
  }

  return (
    <form className="relative mt-10 space-y-5" onSubmit={onSubmit} noValidate>
      <FormHoneypot idPrefix="contact" />
      {feedback ? (
        <p
          role="status"
          aria-live="polite"
          className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
            status === "success"
              ? "border-[#e76fab]/25 bg-[#fdf8fb] text-[#555]"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {feedback}
        </p>
      ) : null}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-black">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-black">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-semibold text-black">
          Phone <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-black">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="How can we help?"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-[#e76fab] px-8 py-4 text-base font-semibold text-white shadow-md shadow-black/10 transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <RecaptchaNotice />
        <p className="mt-6 text-sm leading-relaxed text-[#666766]">
          Prefer to explore first?{" "}
          <Link
            href="/hopehub"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
          >
            HopeHub
          </Link>{" "}
          and{" "}
          <Link
            href="/retreats/upcoming"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
          >
            upcoming retreats
          </Link>{" "}
          are a gentle next step.
        </p>
      </div>
    </form>
  );
}
