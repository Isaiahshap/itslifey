"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { useState, type FormEvent } from "react";

export function NewsletterSignupForm() {
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
      recaptchaToken = await getRecaptchaToken("newsletter");
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t verify the form. Please refresh the page and try again.",
      );
      return;
    }
    const payload = {
      email: String(fd.get("email") ?? "").trim(),
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };
    try {
      const res = await fetch("/api/newsletter-signup", {
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
      setFeedback("You’re on the list—check your inbox for a quick confirmation.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t reach the server. Check your connection and try again.",
      );
    }
  }

  return (
    <div className="mx-auto w-full max-w-md text-center">
      <form
        className="relative mx-auto flex flex-col gap-3 sm:flex-row sm:items-stretch"
        onSubmit={onSubmit}
        noValidate
      >
        <FormHoneypot idPrefix="newsletter" />
        <label htmlFor="email-signup" className="sr-only">
          Email address
        </label>
        <input
          id="email-signup"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={status === "sending"}
          placeholder="Your email"
          className="min-h-12 flex-1 rounded-full border border-[#ebe6df] bg-white px-5 text-base text-black placeholder:text-black/45 outline-none ring-[#e76fab]/30 transition-shadow focus:border-[#e76fab] focus:ring-2 focus:ring-[#e76fab]/35 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-12 w-full rounded-full bg-[#e76fab] px-8 text-base font-semibold text-white transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Joining…" : "Join the list"}
        </button>
      </form>
      {feedback ? (
        <p
          role="status"
          aria-live="polite"
          className={`mx-auto mt-4 max-w-lg text-sm leading-relaxed ${
            status === "success" ? "text-[#2a2928]" : "text-red-800"
          }`}
        >
          {feedback}
        </p>
      ) : null}
      <div className="mx-auto mt-4 max-w-lg text-left">
        <RecaptchaNotice />
      </div>
    </div>
  );
}
