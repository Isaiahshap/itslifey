"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  computeHeroHeadlineFontSizePx,
  HERO_HEADLINE_LINE_HEIGHT_RATIO,
} from "@/lib/heroHeadlineFont";
const HERO_IMAGES = [
  "/images/hero.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-72px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const listParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const listChild = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const [heroHeadlinePx, setHeroHeadlinePx] = useState<number | undefined>(
    undefined,
  );

  useLayoutEffect(() => {
    const el = heroCopyRef.current;
    if (!el) return;

    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w < 1) return;
      setHeroHeadlinePx(computeHeroHeadlineFontSizePx(w));
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-[#f6f3ee]">
      {/* ——— HERO ——— */}
      <section
        className="relative h-[min(72vh,720px)] min-h-[400px] overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: heroIndex === i ? 1 : 0 }}
              transition={{ duration: 2.4, ease: [0.45, 0, 0.55, 1] as const }}
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
            className="absolute inset-0 bg-gradient-to-b from-black/76 via-black/64 to-black/78"
            aria-hidden
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-3 pb-10 pt-20 sm:px-4 sm:pb-12 sm:pt-24 lg:justify-center lg:px-5 lg:pb-14 lg:pt-12">
          <motion.div
            ref={heroCopyRef}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-full max-w-2xl [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_4px_24px_rgba(0,0,0,0.35)]"
          >
            <p className="m-0 max-w-2xl">
              <span className="relative inline-block max-w-[min(100%,22rem)] rounded-full bg-[#e76fab] px-3.5 py-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/25 [text-shadow:none] sm:px-4 sm:py-2">
                <span className="block text-[14px] font-medium leading-snug text-white/95 sm:text-[15px]">
                  By a widow, for widows.
                </span>
              </span>
            </p>
            <h1
              id="hero-heading"
              className={
                heroHeadlinePx !== undefined
                  ? "mt-5 text-pretty font-semibold tracking-tight text-white sm:text-balance"
                  : "mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-[3.85rem] lg:leading-[1.06]"
              }
              style={
                heroHeadlinePx !== undefined
                  ? {
                      fontSize: heroHeadlinePx,
                      lineHeight: HERO_HEADLINE_LINE_HEIGHT_RATIO,
                    }
                  : undefined
              }
            >
              A place for widows to feel supported, understood, and{" "}
              <span className="relative inline-block">
                <svg
                  className="pointer-events-none absolute -left-[0.12em] -right-[0.1em] bottom-[0.06em] z-0 h-[0.44em] min-h-[12px] w-[calc(100%+0.24em)] overflow-visible"
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M4,10 C64,8 136,12 196,10"
                    fill="none"
                    stroke="#e76fab"
                    strokeWidth="4.5"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    vectorEffect="nonScalingStroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.55,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    style={{ opacity: 0.92 }}
                  />
                </svg>
                <span className="relative z-10">less alone.</span>
              </span>
            </h1>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/retreats"
                className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#2a2928]/20 transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join Upcoming Retreat
              </Link>
              <Link
                href="/#support-paths"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md [text-shadow:none] transition-[background-color,box-shadow] duration-200 hover:bg-neutral-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Support Options
              </Link>
            </div>
            <p className="mt-8 text-sm font-medium text-white sm:text-base">
              You do not have to carry this alone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ——— COMMUNITY STRIP (below hero) ——— */}
      <section
        className="border-y border-[#c2528c]/50 bg-gradient-to-br from-[#df68a3] via-[#e76fab] to-[#d85e9a] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
        aria-labelledby="community-strip-heading"
      >
        <h2 id="community-strip-heading" className="sr-only">
          Join our free widow community on HopeHub
        </h2>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-14 lg:px-5 lg:py-16">
          <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
            <div className="min-w-0 flex-1 text-center lg:max-w-[46rem] lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 sm:text-xs">
                HopeHub · Free to join
              </p>
              <p className="mt-4 text-pretty text-[1.625rem] font-medium leading-[1.25] tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-[1.2]">
                Join our free community of{" "}
                <span className="font-semibold">120+ widows</span>.
              </p>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/95 lg:mx-0">
                Connection, encouragement, and a place to be understood—without
                a fee or a big commitment.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end lg:shrink-0 lg:border-l lg:border-white/25 lg:pl-14">
              <Link
                href="/hopehub"
                className="inline-flex w-full max-w-sm items-center justify-center rounded-full bg-white px-10 py-4 text-[15px] font-semibold tracking-wide text-black shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-[background-color,box-shadow] duration-200 hover:bg-neutral-50 hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:w-auto lg:max-w-none lg:min-w-[13.5rem]"
              >
                Explore HopeHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— WELCOME / ABOUT ——— */}
      <motion.section
        className="mx-auto max-w-7xl px-3 py-20 sm:px-4 lg:px-5 lg:py-28"
        aria-labelledby="welcome-heading"
        {...fadeUp}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#ebe6df] shadow-sm ring-1 ring-[#ebe6df] lg:aspect-[3/4]">
            <Image
              src="/images/jen2.jpg"
              alt="Jennifer, founder of It's Lifey, smiling warmly in soft natural light"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2
              id="welcome-heading"
              className="text-balance text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl"
            >
              Welcome to the It&apos;s Lifey Family
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-black">
              <p>
                If you&apos;ve ever wondered where the playbook for life is –
                it&apos;s in the wisdom of those who have lived it. And for
                widows, that wisdom is hard-earned. Here, experience becomes our
                greatest teacher, and connection becomes our greatest strength.
              </p>
              <p>
                Join our community and discover the power of shared widowhood
                journeys. You&apos;re not alone – truly. We&apos;ve been where you
                are, and we&apos;ll walk with you as you navigate what comes next.
              </p>
              <p>
                Whether you need a listening ear from someone who gets it,
                practical guidance for the everyday realities of widowhood, or
                simply the comfort of knowing you&apos;re not the only one trying
                to rebuild – our community is here for you.
              </p>
              <p>
                You don&apos;t have to take this step alone. We&apos;re here to walk
                alongside you, one honest conversation and one moment of connection
                at a time.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center text-base font-semibold text-[#e76fab] underline-offset-4 transition-colors hover:text-[#d85e9a] hover:underline"
            >
              Learn more
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ——— RETREATS ——— */}
      <section
        id="support-paths"
        className="border-t border-[#ebe6df] bg-[#fffcfa]"
        aria-labelledby="retreats-heading"
      >
        <motion.div
          className="bg-[#e76fab] px-3 py-16 sm:px-4 sm:py-20 lg:px-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Retreats
            </p>
            <h2
              id="retreats-heading"
              className="mt-3 max-w-2xl text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Space to breathe, connect, and feel held
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white">
              Retreats are designed to feel safe and restorative—an intentional
              pause from isolation with women who understand what you&apos;ve
              walked through.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto max-w-7xl px-3 py-16 sm:px-4 lg:px-5 lg:py-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <motion.ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={listParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {[
              "Real connection with women who understand",
              "Room to step away from isolation—without pressure to perform",
              "Guided support in a compassionate, emotionally safe environment",
              "A meaningful path forward after loss—honoring grief and hope together",
            ].map((text) => (
              <motion.li
                key={text}
                variants={listChild}
                className="rounded-2xl border border-[#ebe6df] bg-[#f6f3ee]/50 p-7 shadow-sm"
              >
                <p className="text-base leading-relaxed text-black">{text}</p>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-12">
            <Link
              href="/retreats"
              className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Join Upcoming Retreat
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ——— HOPEHUB ——— */}
      <motion.section
        className="mx-auto max-w-7xl px-3 py-20 sm:px-4 lg:px-5 lg:py-28"
        aria-labelledby="hopehub-heading"
        {...fadeUp}
      >
        <div className="grid gap-10 rounded-[1.75rem] border border-[#ebe6df] bg-[#fffcfa] p-8 shadow-sm sm:p-10 lg:grid-cols-5 lg:gap-12 lg:p-14">
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e76fab]">
              HopeHub
            </p>
            <h2
              id="hopehub-heading"
              className="mt-3 text-balance text-3xl font-semibold leading-tight text-black sm:text-4xl"
            >
              Ongoing support between the big moments
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black">
              HopeHub is a continuation of care—steady connection, resources,
              and community that helps you feel less alone after a retreat or
              during seasons when life still feels heavy.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-black">
              Think of it as a gentle anchor: not noisy, not demanding—just a
              place to return to when you need encouragement and understanding.
            </p>
            <Link
              href="/hopehub"
              className="mt-10 inline-flex items-center justify-center rounded-full border-2 border-[#e76fab] bg-transparent px-8 py-3.5 text-base font-semibold text-[#e76fab] transition-colors duration-200 hover:bg-[#e76fab]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Explore HopeHub
            </Link>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-[#e76fab] p-8 shadow-inner lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Why it matters
            </p>
            <ul className="mt-5 space-y-4 text-base leading-relaxed text-white">
              <li>• Continuity after retreat weekends</li>
              <li>• Community that fits real life</li>
              <li>• Support that respects your capacity</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ——— SUPPORT GROUPS ——— */}
      <motion.section
        className="border-t border-[#d85e9a]/30 bg-[#e76fab] px-3 py-20 sm:px-4 lg:px-5 lg:py-28"
        aria-labelledby="groups-heading"
        {...fadeUp}
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Support groups
          </p>
          <h2
            id="groups-heading"
            className="mt-3 max-w-2xl text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Gentle rhythm, honest conversation, zero judgment
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white">
            Support groups are recurring, accessible, and conversation-centered—a
            simple way to stay connected when you want steady encouragement
            without a big trip or commitment you&apos;re not ready for.
          </p>
          <Link
            href="/support-groups"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-neutral-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore Support Groups
          </Link>
        </div>
      </motion.section>

      {/* ——— TESTIMONIALS ——— */}
      <section
        className="border-t border-[#ebe6df] bg-[#fffcfa] px-3 py-20 sm:px-4 lg:px-5 lg:py-28"
        aria-labelledby="testimonials-heading"
      >
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black">
            Voices from the community
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 text-balance text-3xl font-semibold leading-tight text-black sm:text-4xl"
          >
            Real women. Real relief.
          </h2>
        </motion.div>
        <motion.ul
          className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-3"
          variants={listParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {[
            {
              quote:
                "I didn't have to explain myself. For the first time in a long time, I felt like I could breathe.",
              name: "Rachel M.",
              note: "Retreat participant",
            },
            {
              quote:
                "The groups gave me a rhythm I could handle—gentle, consistent, and kind. I wasn’t alone in my week anymore.",
              name: "Denise T.",
              note: "Support group member",
            },
            {
              quote:
                "It felt premium without feeling cold. I left with connection I didn’t know I still believed was possible.",
              name: "Angela K.",
              note: "HopeHub member",
            },
          ].map(({ quote, name, note }) => (
            <motion.li
              key={name}
              variants={listChild}
              className="flex flex-col rounded-2xl border border-[#ebe6df] bg-[#f6f3ee] p-8 shadow-sm"
            >
              <p className="text-lg leading-relaxed text-black">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="mt-8 border-t border-[#ebe6df] pt-6">
                <p className="font-semibold text-black">{name}</p>
                <p className="mt-1 text-sm text-black">{note}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ——— EMAIL ——— */}
      <motion.section
        className="border-t border-[#ebe6df] bg-[#f6f3ee] px-3 py-20 sm:px-4 lg:px-5 lg:py-24"
        aria-labelledby="email-heading"
        {...fadeUp}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="email-heading"
            className="text-balance text-3xl font-semibold leading-tight text-black sm:text-4xl"
          >
            Stay connected for retreat updates, support, and community news
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-black">
            Short notes—no spam. Unsubscribe anytime. If you want a softer way
            to stay close to what&apos;s happening, this is it.
          </p>
          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email-signup" className="sr-only">
              Email address
            </label>
            <input
              id="email-signup"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Your email"
              className="min-h-12 flex-1 rounded-full border border-[#ebe6df] bg-white px-5 text-base text-black placeholder:text-black/45 outline-none ring-[#e76fab]/30 transition-shadow focus:border-[#e76fab] focus:ring-2 focus:ring-[#e76fab]/35"
            />
            <button
              type="submit"
              className="min-h-12 rounded-full bg-[#e76fab] px-8 text-base font-semibold text-white transition-[background-color] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Join the list
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
