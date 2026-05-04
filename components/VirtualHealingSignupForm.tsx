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

    try {
      const res = await fetch("/api/virtual-healing-checkout", {
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

      if (typeof window.fbq === "function") {
        window.fbq("track", "InitiateCheckout", {
          content_name: "Virtual Healing Experiences",
          content_category: "Support",
          value: 200,
          currency: "USD",
        });
      }

      // Redirect to Stripe payment page
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

  const pid = idPrefix;
  const isSending = status === "sending";

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
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
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
          placeholder="Questions, accessibility needs, or what you're hoping for from this experience."
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded-full bg-[#e76fab] px-8 py-4 text-base font-semibold text-white shadow-md shadow-black/10 transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSending ? "Taking you to payment…" : "Reserve my spot — $200 deposit"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[#888]">
          You&apos;ll be taken to a secure Stripe checkout for your $200 deposit,
          which goes toward your total program investment.
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
