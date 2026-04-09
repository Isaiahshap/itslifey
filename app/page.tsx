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

/** Summer 2025 retreat — home showcase crossfade (paths must match `public/images`). */
const RETREAT_SHOWCASE_IMAGES = [
  "/images/Retreats/Summer2025/Jen Kitchen Table Horizontal.webp",
  "/images/Retreats/Summer2025/IMG_0683.webp",
  "/images/Retreats/Summer2025/IMG_1698.webp",
  "/images/Retreats/Summer2025/IMG_1845.webp",
  "/images/Retreats/Summer2025/IMG_1908.webp",
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
  const [retreatShowcaseIndex, setRetreatShowcaseIndex] = useState(0);
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

  useEffect(() => {
    const id = window.setInterval(() => {
      setRetreatShowcaseIndex(
        (i) => (i + 1) % RETREAT_SHOWCASE_IMAGES.length,
      );
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-[#f6f3ee]">
      {/* ——— HERO ——— */}
      <section
        className="relative h-[min(72vh,720px)] min-h-[400px] overflow-hidden lg:h-[min(80vh,820px)]"
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
            className="w-full max-w-2xl lg:max-w-4xl [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_4px_24px_rgba(0,0,0,0.35)]"
          >
            <p className="m-0 max-w-2xl lg:max-w-none">
              <span className="relative inline-block max-w-[min(100%,22rem)] rounded-full bg-[#e76fab] px-3 py-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/25 [text-shadow:none] sm:px-4 sm:py-2">
                <span className="block text-[12.5px] font-medium leading-snug text-white/95 sm:text-[15px]">
                  By a widow, for widows.
                </span>
              </span>
            </p>
            <h1
              id="hero-heading"
              className={
                heroHeadlinePx !== undefined
                  ? "mt-4 text-pretty font-semibold tracking-tight text-white sm:mt-5 sm:text-balance"
                  : "mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:mt-5 sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-[3rem] lg:leading-[1.08] xl:text-[3.15rem]"
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
                className="inline-flex w-full items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#2a2928]/20 transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                Join Upcoming Retreat
              </Link>
              <Link
                href="/#support-paths"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md [text-shadow:none] transition-[background-color,box-shadow] duration-200 hover:bg-neutral-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                Explore Support Options
              </Link>
            </div>
            <p className="mt-8 text-[13px] font-medium leading-snug text-white sm:text-base sm:leading-normal">
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
            <div className="flex w-full justify-center lg:w-auto lg:justify-end lg:shrink-0 lg:border-l lg:border-white/25 lg:pl-14">
              <Link
                href="/hopehub"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-10 py-4 text-[15px] font-semibold tracking-wide text-black shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-[background-color,box-shadow] duration-200 hover:bg-neutral-50 hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto lg:min-w-[13.5rem]"
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
              src="/images/jen3.jpg"
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
        className="border-t border-white/20"
        aria-labelledby="retreats-heading"
      >
        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-[#df68a3] via-[#e76fab] to-[#d85e9a] px-3 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:px-4 sm:py-20 lg:px-5 lg:py-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div
            className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-white/[0.07] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[#2a2928]/[0.06] blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-sm">
                  Retreats
                </p>
                <h2
                  id="retreats-heading"
                  className="mt-3 max-w-xl text-pretty text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:max-w-[26rem] lg:text-[2.35rem] lg:leading-[1.12]"
                >
                  Space to breathe, connect, and feel held
                </h2>
                <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/95 sm:text-lg">
                  Retreats are designed to feel safe and restorative—an
                  intentional pause from isolation with women who understand
                  what you&apos;ve walked through.
                </p>

                <motion.ul
                  className="mt-10 space-y-3 sm:space-y-3.5"
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
                      className="rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-3.5 backdrop-blur-[6px] sm:px-5 sm:py-4"
                    >
                      <p className="text-[15px] leading-relaxed text-white sm:text-base">
                        {text}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-10">
                  <Link
                    href="/retreats"
                    className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-neutral-100 hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                  >
                    Join Upcoming Retreat
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                <figure
                  className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-[1.35rem] shadow-[0_28px_70px_rgba(0,0,0,0.28)] ring-1 ring-white/30 sm:max-w-lg lg:max-w-none lg:rounded-[1.5rem]"
                  aria-label="Moments from past retreats"
                >
                  {RETREAT_SHOWCASE_IMAGES.map((src, i) => (
                    <motion.div
                      key={src}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: retreatShowcaseIndex === i ? 1 : 0,
                      }}
                      transition={{
                        duration: 2.2,
                        ease: [0.45, 0, 0.55, 1] as const,
                      }}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 42vw"
                      />
                    </motion.div>
                  ))}
                </figure>
                <p
                  className="sr-only"
                  aria-live="polite"
                  aria-atomic="true"
                >{`Retreat photo ${retreatShowcaseIndex + 1} of ${RETREAT_SHOWCASE_IMAGES.length}`}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ——— HOPEHUB ——— */}
      <section
        className="border-t border-[#ebe6df] bg-[#f6f3ee]"
        aria-labelledby="hopehub-heading"
      >
        <motion.div
          className="relative overflow-hidden px-3 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-4 sm:py-20 lg:px-5 lg:py-24"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div
            className="pointer-events-none absolute -right-20 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#e76fab]/[0.06] blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              <div className="min-w-0 lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c2528c] sm:text-sm">
                  HopeHub
                </p>
                <h2
                  id="hopehub-heading"
                  className="mt-3 text-pretty text-3xl font-semibold leading-[1.15] tracking-tight text-black sm:text-4xl"
                >
                  Ongoing support between the big moments
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-[#2a2928] sm:text-lg">
                  HopeHub is a continuation of care—steady connection,
                  resources, and community that helps you feel less alone after a
                  retreat or during seasons when life still feels heavy.
                </p>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#2a2928] sm:text-lg">
                  Think of it as a gentle anchor: not noisy, not demanding—just
                  a place to return to when you need encouragement and
                  understanding.
                </p>
                <div className="mt-10">
                  <Link
                    href="/hopehub"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:w-auto"
                  >
                    Explore HopeHub
                  </Link>
                </div>

                <figure className="mt-10 m-0 sm:mt-12">
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666766] sm:text-xs">
                    HopeHub preview
                  </p>
                  <div className="mt-3 overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] ring-1 ring-[#e3ddd4]">
                    <video
                      className="aspect-video w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      aria-label="Short video introducing HopeHub, the free online community for widows"
                    >
                      <source src="/images/hopehub.mp4" type="video/mp4" />
                    </video>
                  </div>
                </figure>

                <figure className="mt-8 m-0 sm:mt-10">
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666766] sm:text-xs">
                    Full walkthrough
                  </p>
                  <div className="mt-3 overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] ring-1 ring-[#e3ddd4]">
                    <div className="relative aspect-video w-full">
                      <iframe
                        className="absolute inset-0 h-full w-full border-0"
                        src="https://www.youtube-nocookie.com/embed/k4mm-kM_4Gk?rel=0"
                        title="HopeHub full walkthrough"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>
                </figure>
              </div>

              <div className="min-w-0 lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666766] sm:text-sm">
                  What you&apos;ll find inside
                </p>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#666766] sm:text-base">
                  Real relationships, structured support, and room to show up
                  exactly as you are—free, online, and built by a widow who
                  understands.
                </p>

                <dl className="mt-8 divide-y divide-[#e3ddd4] border-t border-[#e3ddd4]">
                  {[
                    {
                      term: "Continuity after retreats",
                      desc: "Support that doesn't disappear Monday morning—community that fits real life and respects your capacity.",
                    },
                    {
                      term: "1:1 conversations",
                      desc: "A private space to connect with widows who understand—ask questions and share without judgment.",
                    },
                    {
                      term: "Support groups",
                      desc: "Hosted multiple times a week—topic-driven groups and open discussion when you want steady rhythm.",
                    },
                    {
                      term: "Expert Q&A",
                      desc: "Live sessions with therapists, financial advisors, attorneys, and healers; replays stay in the community.",
                    },
                    {
                      term: "Resource library",
                      desc: "Vetted professionals, podcast ideas, and practical help so you spend less time searching.",
                    },
                    {
                      term: "Virtual events",
                      desc: "Workshops and healing sessions when in-person isn't possible—still together, still seen.",
                    },
                    {
                      term: "In-person pathways",
                      desc: "Widow Wellness Retreats and other gatherings when you're ready to meet face to face.",
                    },
                    {
                      term: "Always free",
                      desc: "Full access to the community, groups, expert sessions, resources, and events—no paid tier or surprise fees.",
                    },
                  ].map(({ term, desc }) => (
                    <div key={term} className="py-5 sm:py-6">
                      <dt className="text-[15px] font-semibold tracking-tight text-black sm:text-base">
                        {term}
                      </dt>
                      <dd className="mt-2 m-0 text-[14px] leading-relaxed text-[#666766] sm:text-[15px]">
                        {desc}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#e3ddd4] pt-10 sm:grid-cols-4 sm:gap-4">
                  {[
                    { stat: "Hundreds", label: "of members" },
                    { stat: "Daily", label: "new connections" },
                    { stat: "Weekly", label: "widow meetups" },
                    { stat: "24/7", label: "community access" },
                  ].map(({ stat, label }, i) => (
                    <div
                      key={label}
                      className={
                        i > 0
                          ? "sm:border-l sm:border-[#e76fab]/25 sm:pl-6 lg:pl-8"
                          : ""
                      }
                    >
                      <p className="text-2xl font-semibold tracking-tight text-[#c2528c] sm:text-3xl">
                        {stat}
                      </p>
                      <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#666766] sm:text-xs">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

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
            className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-neutral-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
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
              className="min-h-12 w-full rounded-full bg-[#e76fab] px-8 text-base font-semibold text-white transition-[background-color] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:w-auto"
            >
              Join the list
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
