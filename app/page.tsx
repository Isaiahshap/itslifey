"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NewsletterSignupForm } from "@/components/NewsletterSignupForm";
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

        <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[minmax(0,1fr)_auto] px-3 pb-6 pt-20 sm:px-4 sm:pb-8 sm:pt-24 lg:px-5 lg:pb-10 lg:pt-12">
          <div className="flex min-h-0 flex-col justify-end lg:justify-center">
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
                href="/support-groups"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black shadow-md [text-shadow:none] transition-[background-color,box-shadow] duration-200 hover:bg-neutral-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                Explore Support Options
              </Link>
            </div>
          </motion.div>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-center text-2xl font-medium italic leading-snug text-[#e76fab] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:mt-8 sm:text-3xl sm:leading-relaxed lg:mt-10 lg:text-4xl lg:leading-relaxed">
            You do not have to carry this alone.
          </p>
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
                <p className="mt-5 text-sm font-semibold tracking-wide text-white sm:text-[15px]">
                  Summer 2026 · July 9th–July 12th
                </p>
                <p className="mt-3 max-w-xl text-sm font-medium leading-snug text-white/90 sm:text-[15px]">
                  Our last retreat sold out in one week—when you&apos;re ready,
                  we&apos;d love to see you there.
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

      {/* ——— SUPPORT GROUPS ——— */}
      <motion.section
        className="border-t border-[#ebe6df] bg-[#f6f3ee] px-3 py-20 sm:px-4 lg:px-5 lg:py-28"
        aria-labelledby="groups-heading"
        {...fadeUp}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:gap-10">
          <div className="min-w-0 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c2528c]">
              Support groups
            </p>
            <h2
              id="groups-heading"
              className="mt-3 text-balance text-3xl font-semibold leading-tight text-black sm:text-4xl"
            >
              Gentle rhythm, honest conversation, zero judgment
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#2a2928]">
              Support groups are recurring, accessible, and conversation-centered—a
              simple way to stay connected when you want steady encouragement
              without a big trip or commitment you&apos;re not ready for.
            </p>
          </div>
          <Link
            href="/support-groups"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:w-auto lg:w-auto"
          >
            Explore Support Groups
          </Link>
        </div>
      </motion.section>

      {/* ——— HOPEHUB ——— */}
      <section
        className="border-t border-white/20 bg-gradient-to-br from-[#df68a3] via-[#e76fab] to-[#d85e9a] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
        aria-labelledby="hopehub-heading"
      >
        <motion.div
          className="relative mx-auto max-w-xl px-3 py-10 text-center sm:px-4 sm:py-12 lg:px-5 lg:py-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-xs">
            HopeHub
          </p>
          <h2
            id="hopehub-heading"
            className="mt-2 text-pretty text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl"
          >
            Ongoing support between the big moments
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/95 sm:text-[15px]">
            Free online{" "}
            <span className="font-medium text-white">community</span> and{" "}
            <span className="font-medium text-white">resources</span> for widows—so
            you have a place to connect and find help between retreats and hard
            days.
          </p>
          <div className="mt-6">
            <Link
              href="/hopehub"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-neutral-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-7 sm:py-3 sm:text-[15px]"
            >
              Explore HopeHub
            </Link>
          </div>
        </motion.div>
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
          <div className="mx-auto mt-10 max-w-xl">
            <NewsletterSignupForm />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
