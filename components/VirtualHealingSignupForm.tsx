"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import {
  useState,
  type FormEvent,
} from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15";

type VirtualHealingSignupFormProps = {
  /** Prefix for input ids when multiple forms exist on one page (e.g. homepage modal). */
  idPrefix?: string;
};

export function VirtualHealingSignupForm({
  idPrefix = "vhe",
}: VirtualHealingSignupFormProps) {
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
      recaptchaToken = await getRecaptchaToken("virtual_healing");
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
      note: String(fd.get("note") ?? "").trim(),
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };
    try {
      const res = await fetch("/api/virtual-healing-inquiry", {
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
        "Thank you—we received your request. Check your email for a confirmation, and we’ll be in touch about your spot.",
      );
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Virtual Healing Experiences",
          content_category: "Support",
          value: 899,
          currency: "USD",
        });
      }
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn’t reach the server. Check your connection and try again.",
      );
    }
  }

  const pid = idPrefix;

  return (
    <form
      className="relative space-y-5"
      onSubmit={onSubmit}
      noValidate
      id={`${pid}-virtual-healing-signup`}
    >
      <FormHoneypot idPrefix={pid} />
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
          rows={4}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="Questions, accessibility needs, or what you’re hoping for from this experience."
        />
      </div>
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-[#e76fab] px-8 py-4 text-base font-semibold text-white shadow-md shadow-black/10 transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Request my spot"}
        </button>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
