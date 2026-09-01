"use client";

import { ClipReveal } from "@/components/ClipReveal";
import { Spring2027RetreatInterestForm } from "@/components/Spring2027RetreatInterestForm";
import Image from "next/image";
import { HeroImage } from "@/components/HeroImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";

const HERO_IMAGES = [
  "/images/Retreats/fall 2025/IMG_0978.webp",
  "/images/Retreats/Summer2025/IMG_1698.webp",
  "/images/Retreats/fall 2025/IMG_0966.webp",
] as const;

const INTEREST_PERKS = [
  "Retreat details and location",
  "Early registration before it's released to the public",
  "Pricing and payment information",
  "Exclusive updates as plans unfold",
] as const;

const shell =
  "mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,100%)]";

const body =
  "text-[0.98rem] leading-[1.78] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.76]";

function delayStyle(ms: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${ms}ms` };
}

function scrollToInterestForm() {
  document.getElementById("spring-2027-interest")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function SpringRetreat2027Client() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: "Spring 2027 Widow Wellness Retreat",
      content_category: "Retreat",
    });
  }, []);

  return (
    <div className="ed min-w-0 overflow-x-clip">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="spring-2027-hero-heading"
      >
        <div className="ed-hero__media reveal-media" style={delayStyle(160)}>
          {HERO_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: heroIndex === i ? 1 : 0 }}
              transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] as const }}
            >
              <HeroImage
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          ))}
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label" style={delayStyle(180)}>
              Coming soon
            </p>
            <h1
              id="spring-2027-hero-heading"
              className="ed-title ed-title--wide"
            >
              <ClipReveal delay={0}>Spring 2027 Widow</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={80}>Wellness Retreat</ClipReveal>
              </span>
            </h1>
            <p className="ed-lede reveal-up" style={delayStyle(260)}>
              Imagine a weekend where you don&apos;t have to explain your grief
              — where healing happens through connection, rest, laughter, and
              hope.
            </p>
            <div className="ed-actions reveal-up" style={delayStyle(340)}>
              <button
                type="button"
                onClick={scrollToInterestForm}
                className="il-btn il-btn--solid"
              >
                Join the interest list
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-black/10 bg-white"
        aria-labelledby="spring-2027-invite-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <div data-reveal="" className="reveal-up max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab] sm:text-[11px]">
              Coming soon
            </p>
            <h2
              id="spring-2027-invite-heading"
              className="mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-black sm:text-4xl lg:text-[2.75rem]"
            >
              <ClipReveal delay={0}>A weekend surrounded by</ClipReveal>
              <ClipReveal delay={80}>women who truly understand</ClipReveal>
            </h2>
            <p className={`mt-6 ${body}`}>
              Imagine a weekend where you don&apos;t have to explain your grief,
              where you&apos;re surrounded by women who truly understand, and
              where healing happens through connection, rest, laughter, and
              hope.
            </p>
            <p className={`mt-5 ${body}`}>
              Our Spring 2027 Widow Wellness Retreat is currently in the works,
              and we can&apos;t wait to share it with you.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[#d85e9a] bg-[#e76fab]"
        aria-labelledby="spring-2027-perks-heading"
      >
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
            <div data-reveal="" className="reveal-up text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                Interest list
              </p>
              <h2
                id="spring-2027-perks-heading"
                className="mt-3 text-3xl font-semibold sm:text-4xl"
              >
                Be the first to know
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                Join the interest list to be the first to receive:
              </p>
              <ul className="mt-8 space-y-3">
                {INTEREST_PERKS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border border-white/20 bg-white/10 px-5 py-4"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                      aria-hidden
                    />
                    <span className="text-[15px] font-medium leading-snug text-white sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside
              data-reveal=""
              className="reveal-up border border-white/25 bg-white p-7 shadow-xl shadow-black/10 sm:p-8"
              style={delayStyle(80)}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                Early bird bonus
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-snug text-[#141413]">
                First 5 women get 20% off
              </h3>
              <p className={`mt-4 ${body}`}>
                The first 5 women who register when enrollment opens will
                receive 20% off their retreat registration.
              </p>
              <p className={`mt-4 ${body}`}>
                If you&apos;re even thinking about joining us, sign up today.
                There&apos;s no obligation — just early access and the chance to
                reserve your spot before the retreat fills.
              </p>
              <button
                type="button"
                onClick={scrollToInterestForm}
                className="il-btn il-btn--solid mt-7"
              >
                Sign up for early access
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="spring-2027-interest"
        className="border-b border-black/10 bg-[#faf8f5]"
        aria-labelledby="spring-2027-form-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(28rem,100%)] lg:items-start lg:gap-16">
            <div data-reveal="" className="reveal-up">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
                Spring 2027
              </p>
              <h2
                id="spring-2027-form-heading"
                className="mt-3 text-3xl font-semibold text-[#141413] sm:text-4xl"
              >
                Join the interest list
              </h2>
              <p className={`mt-5 ${body}`}>
                Share your name and email — we&apos;ll reach out first when
                details and registration open. No pressure, no obligation.
              </p>
              <p className={`mt-5 ${body}`}>
                We can&apos;t wait to welcome you.
              </p>
              <Link
                href="/retreats/past"
                className="mt-8 inline-flex text-sm font-semibold text-[#b8457e] underline decoration-[#e76fab]/40 underline-offset-4 transition-colors hover:text-[#e76fab]"
              >
                Browse past retreats →
              </Link>
            </div>
            <div
              data-reveal=""
              className="reveal-up border border-black/[0.08] bg-white p-6 shadow-lg shadow-black/[0.06] sm:p-8 lg:sticky lg:top-28"
              style={delayStyle(80)}
            >
              <Spring2027RetreatInterestForm />
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[#c94d8a] px-4 py-16 text-center text-white sm:py-20"
        data-reveal=""
      >
        <div className="reveal-up mx-auto max-w-2xl">
          <p className="text-2xl font-semibold leading-snug sm:text-3xl">
            We can&apos;t wait to welcome you.
          </p>
          <p className="mt-4 text-lg text-white/90">
            A weekend of connection, rest, laughter, and hope — for widows who
            understand.
          </p>
          <button
            type="button"
            onClick={scrollToInterestForm}
            className="il-btn il-btn--on-dark mt-8"
          >
            Join the interest list
            <span aria-hidden className="il-btn__arrow">
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
