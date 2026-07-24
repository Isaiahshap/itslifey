"use client";

import { Spring2027RetreatInterestForm } from "@/components/Spring2027RetreatInterestForm";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/Retreats/Summer2025/IMG_1832.webp",
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

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-64px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

function scrollToInterestForm() {
  document.getElementById("spring-2027-interest")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function UpcomingRetreatClient() {
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
    <div className="min-w-0 overflow-x-clip bg-[#f6f3ee]">
      {/* Hero */}
      <section
        className="relative w-full min-w-0 overflow-hidden min-h-[min(88vh,720px)] lg:h-[min(88vh,900px)] lg:min-h-[620px]"
        aria-labelledby="spring-2027-hero-heading"
      >
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: heroIndex === i ? 1 : 0 }}
              transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] as const }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          ))}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/72"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.5)_100%)]"
            aria-hidden
          />
        </div>

        <div
          className={`relative mx-auto flex h-full flex-col justify-end gap-8 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-16 lg:pt-24 ${shell}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-3xl"
          >
            <p className="m-0 flex flex-wrap items-center gap-2.5">
              <span className="inline-block rounded-full bg-[#e76fab] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-white ring-2 ring-white/30 sm:text-sm">
                It&apos;s Lifey
              </span>
              <span className="inline-block rounded-full bg-white/95 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#9a3d6c] ring-2 ring-white/40 sm:text-[13px]">
                Coming soon
              </span>
            </p>
            <h1
              id="spring-2027-hero-heading"
              className="mt-5 max-w-[18ch] text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:max-w-none lg:text-6xl xl:text-7xl [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.75),0_4px_28px_rgba(0,0,0,0.6)]"
            >
              Spring 2027 Widow Wellness Retreat
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/92 sm:max-w-2xl sm:text-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.88),0_2px_10px_rgba(0,0,0,0.68)]">
              Imagine a weekend where you don&apos;t have to explain your grief
              — where healing happens through connection, rest, laughter, and
              hope.
            </p>
            <div className="mt-9">
              <button
                type="button"
                onClick={scrollToInterestForm}
                className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-9 py-4 text-base font-semibold text-white shadow-lg shadow-black/20 ring-2 ring-white/30 transition-[background-color,transform] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99]"
              >
                Join the interest list
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Invitation */}
      <section
        className="border-b border-black/10 bg-white"
        aria-labelledby="spring-2027-invite-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab] sm:text-[11px]">
              Coming soon
            </p>
            <h2
              id="spring-2027-invite-heading"
              className="mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-black sm:text-4xl lg:text-[2.75rem]"
            >
              A weekend surrounded by women who truly understand
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
          </motion.div>
        </div>
      </section>

      {/* What you'll receive + early bird */}
      <section
        className="border-b border-[#d85e9a] bg-[#e76fab]"
        aria-labelledby="spring-2027-perks-heading"
      >
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
            <motion.div {...fadeUp} className="text-white">
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
                    className="flex gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm"
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
            </motion.div>

            <motion.aside
              {...fadeUp}
              className="rounded-[1.75rem] border border-white/25 bg-white p-7 shadow-xl shadow-black/10 sm:p-8"
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
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#e76fab] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#d85e9a] sm:w-auto"
              >
                Sign up for early access
              </button>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="spring-2027-interest"
        className="border-b border-black/10 bg-[#faf8f5]"
        aria-labelledby="spring-2027-form-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(28rem,100%)] lg:items-start lg:gap-16">
            <motion.div {...fadeUp}>
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
            </motion.div>
            <motion.div
              {...fadeUp}
              className="rounded-[1.75rem] border border-black/[0.08] bg-white p-6 shadow-lg shadow-black/[0.06] sm:p-8 lg:sticky lg:top-28"
            >
              <Spring2027RetreatInterestForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#c94d8a] px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-2xl">
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
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#c94d8a] transition-colors hover:bg-neutral-100"
          >
            Join the interest list
          </button>
        </div>
      </section>
    </div>
  );
}
