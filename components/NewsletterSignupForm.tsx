"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { useState, type FormEvent } from "react";

type Props = {
  /** Editorial homepage layout */
  variant?: "default" | "editorial";
};

export function NewsletterSignupForm({ variant = "default" }: Props) {
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
      setFeedback("You’re on the list—watch for a short confirmation email.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t reach the server. Check your connection and try again.",
      );
    }
  }

  if (variant === "editorial") {
    return (
      <div className="home-email__form">
        <form className="home-email__row" onSubmit={onSubmit} noValidate>
          <FormHoneypot idPrefix="newsletter" />
          <div className="home-email__field">
            <label htmlFor="email-signup" className="home-email__label">
              Email
            </label>
            <input
              id="email-signup"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={status === "sending"}
              placeholder="you@email.com"
              className="home-email__input"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="il-btn il-btn--solid home-email__submit"
          >
            {status === "sending" ? (
              "Joining…"
            ) : (
              <>
                Join
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </>
            )}
          </button>
        </form>
        {feedback ? (
          <p
            role="status"
            aria-live="polite"
            className={`home-email__feedback${
              status === "error" ? " is-error" : ""
            }`}
          >
            {feedback}
          </p>
        ) : null}
        <div className="home-email__legal">
          <RecaptchaNotice />
        </div>
      </div>
    );
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
          className="min-h-12 flex-1 border border-[#1a1918]/18 bg-white px-5 text-base text-black placeholder:text-black/45 outline-none transition-[border-color,box-shadow] focus:border-[#e76fab] focus:ring-2 focus:ring-[#e76fab]/25 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="il-btn il-btn--solid il-btn--compact"
        >
          {status === "sending" ? (
            "Joining…"
          ) : (
            <>
              Join the list
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </>
          )}
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
