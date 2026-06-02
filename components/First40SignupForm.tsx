"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15";

const PACKAGES = [
  {
    key: "individual",
    label: "Individual",
    price: "$49",
    detail: "One attendee",
  },
  {
    key: "five",
    label: "Package of 5 attendees",
    price: "$98",
    detail: "Buy 2, get 3 free",
  },
  {
    key: "ten",
    label: "Package of 10 attendees",
    price: "$196",
    detail: "Buy 4, get 6 free",
  },
] as const;

type PackageKey = (typeof PACKAGES)[number]["key"];

const PACKAGE_VALUES_USD: Record<PackageKey, number> = {
  individual: 49,
  five: 98,
  ten: 196,
};

function trackFirst40Lead(packageKey: PackageKey) {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "Lead", {
    content_name: `First40 Workshop — ${packageKey}`,
    content_category: "Workshop",
    value: PACKAGE_VALUES_USD[packageKey],
    currency: "USD",
  });
}

export function First40SignupForm() {
  const [selected, setSelected] = useState<PackageKey>("individual");
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
      recaptchaToken = await getRecaptchaToken("first40_inquiry");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't verify the form. Please refresh the page and try again.",
      );
      return;
    }

    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      package: selected,
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };

    try {
      const res = await fetch("/api/first40-inquiry", {
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

      trackFirst40Lead(selected);

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

  return (
    <form
      id="reserve"
      className="relative space-y-6 scroll-mt-28"
      onSubmit={onSubmit}
      noValidate
    >
      <FormHoneypot idPrefix="f40" />

      {status === "error" && errorMessage ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
        >
          {errorMessage}
        </p>
      ) : null}

      {/* Name row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="f40-firstName"
            className="block text-sm font-semibold text-black"
          >
            First name
          </label>
          <input
            id="f40-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="f40-lastName"
            className="block text-sm font-semibold text-black"
          >
            Last name
          </label>
          <input
            id="f40-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="f40-email"
          className="block text-sm font-semibold text-black"
        >
          Email
        </label>
        <input
          id="f40-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="f40-phone"
          className="block text-sm font-semibold text-black"
        >
          Phone{" "}
          <span className="font-normal text-[#666766]">(optional)</span>
        </label>
        <input
          id="f40-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </div>

      {/* Package selection */}
      <div>
        <p className="block text-sm font-semibold text-black">
          Select your package
        </p>
        <div className="mt-3 space-y-3">
          {PACKAGES.map((pkg) => {
            const isActive = selected === pkg.key;
            return (
              <button
                key={pkg.key}
                type="button"
                onClick={() => setSelected(pkg.key)}
                className={`group flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] ${
                  isActive
                    ? "border-[#e76fab]/55 bg-white shadow-sm hover:border-[#e76fab]/70 hover:bg-[#fffcfd]"
                    : "border-black/[0.08] bg-white/70 hover:-translate-y-0.5 hover:border-[#e76fab]/40 hover:bg-[#fdf8fb] hover:shadow-sm active:translate-y-0 active:shadow-none"
                }`}
                aria-pressed={isActive}
              >
                <span className="flex min-w-0 items-center gap-3.5">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                      isActive
                        ? "border-[#e76fab] bg-[#e76fab]"
                        : "border-[#d4d4d4] bg-white group-hover:border-[#e76fab]/50 group-hover:bg-[#fdf6fb]"
                    }`}
                    aria-hidden
                  >
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    ) : null}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span
                      className={`text-[0.95rem] font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-[#141413]"
                          : "text-[#3a3938] group-hover:text-[#141413]"
                      }`}
                    >
                      {pkg.label}
                    </span>
                    <span
                      className={`text-[0.82rem] transition-colors duration-200 ${
                        isActive
                          ? "text-[#666766]"
                          : "text-[#666766] group-hover:text-[#555]"
                      }`}
                    >
                      {pkg.detail}
                    </span>
                  </span>
                </span>
                <span
                  className={`shrink-0 text-[1.15rem] font-semibold tabular-nums transition-colors duration-200 ${
                    isActive
                      ? "text-[#e76fab]"
                      : "text-[#3a3938] group-hover:text-[#b8457e]"
                  }`}
                >
                  {pkg.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e76fab] px-8 py-4 text-base font-semibold text-white shadow-md shadow-[#e76fab]/25 transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? "Taking you to checkout…" : "Reserve my spot"}
          {!isSending && (
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5 opacity-90"
            >
              <path
                d="M8 1l7 7-7 7M1 8h14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <p className="mt-3 text-center text-xs leading-relaxed text-[#888]">
          You&apos;ll be taken to a secure Stripe checkout to complete your
          registration.
        </p>
        <RecaptchaNotice />
      </div>
    </form>
  );
}
