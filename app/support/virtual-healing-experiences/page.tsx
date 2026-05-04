import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EarlyBirdCountdown } from "@/components/EarlyBirdCountdown";
import { VirtualHealingPixelEvents } from "@/components/VirtualHealingPixelEvents";
import { VirtualHealingSignupForm } from "@/components/VirtualHealingSignupForm";

export const metadata: Metadata = {
  title: "Virtual Healing Experiences — The Body Keeps the Story | It's Lifey",
  description:
    "A 6-week virtual experience with Tina Walsh: grief, trauma, and the nervous system—gentle education and body-based practices. Only 3 spots left. Created for widows.",
};

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

const body =
  "text-[0.98rem] leading-[1.78] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.76]";

const weekThemes = [
  {
    week: "Week 1",
    title: "Nervous system",
    text: "Understand why your body feels out of control—and what to do about it.",
  },
  {
    week: "Week 2",
    title: "Chakra",
    text: "Explore energy centers and how grief blocks emotional flow.",
  },
  {
    week: "Week 3",
    title: "Breathwork",
    text: "Use your breath to release tension stored deep in the body.",
  },
  {
    week: "Week 4",
    title: "Meditation",
    text: "Find moments of stillness—without pressure to feel anything you don't.",
  },
  {
    week: "Week 5",
    title: "Movement",
    text: "Gently move the grief your body has been holding.",
  },
  {
    week: "Week 6",
    title: "Grounding",
    text: "Build practices you'll carry with you long after the six weeks end.",
  },
] as const;

const recognizeItems = [
  "Your body feels exhausted in ways sleep doesn\u2019t fix",
  "You carry a tension you can\u2019t quite name—chest tight, shoulders up, breath shallow",
  "You want to feel better, but you don\u2019t want to be rushed or pushed to \u201chealing\u201d",
  "You\u2019re ready to gently start understanding what\u2019s happening inside you",
] as const;

const outcomes = [
  {
    title: "A real framework",
    text: "You\u2019ll understand why your body responds to grief the way it does\u2014not just feel it.",
  },
  {
    title: "Practices you can keep",
    text: "Simple, daily tools for the moments when things feel heavy again.",
  },
  {
    title: "The felt sense of not being alone",
    text: "Eight women, one shared experience, one honest space.",
  },
] as const;

export default function VirtualHealingExperiencesPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <VirtualHealingPixelEvents />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-[#e8d4df]/80"
        aria-labelledby="vhe-hero-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 min-h-full w-full bg-[radial-gradient(ellipse_160%_90%_at_50%_-18%,rgba(231,111,171,0.2),transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 min-h-full w-full bg-gradient-to-b from-[#fdf8fb] via-[#f8eef3] to-[#f0dfe8]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-0 top-1/4 h-80 w-[min(100vw,56rem)] max-w-none rounded-full bg-[#e76fab]/10 blur-3xl sm:w-[80vw]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-72 w-[min(100vw,52rem)] max-w-none rounded-full bg-white/45 blur-3xl sm:w-[75vw]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full bg-gradient-to-t from-[#f6f3ee] to-transparent"
          aria-hidden
        />

        <div className={`relative py-14 sm:py-16 lg:py-20 ${shell}`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(26rem,100%)] lg:items-start lg:gap-14 xl:gap-20">

            {/* Left column */}
            <div className="max-w-2xl lg:pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7a6a72] sm:text-[11px]">
                A 6-week virtual experience for widows · with Tina Walsh
              </p>
              <h1
                id="vhe-hero-heading"
                className="mt-5 text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl sm:leading-[1.08] lg:text-[2.5rem] lg:leading-[1.05] xl:text-[2.65rem]"
              >
                The Body Keeps the Story
              </h1>
              <p className="mt-2 text-lg font-normal leading-snug text-[#666766] sm:text-xl">
                Grief, trauma &amp; the nervous system — healing from the inside out
              </p>

              {/* Urgency + date row */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-[#e76fab]/35 bg-white/90 px-4 py-2 text-sm font-semibold text-[#b8457e] shadow-[0_6px_24px_-6px_rgba(199,77,138,0.22)] backdrop-blur-sm">
                  <span
                    className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#e76fab]"
                    aria-hidden
                  />
                  Only 3 spots remaining
                </p>
                <p className="inline-flex items-center rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-[#3a3938] backdrop-blur-sm">
                  Begins May 20, 2026
                </p>
              </div>

              <p className={`mt-8 max-w-xl ${body}`}>
                Grief doesn&apos;t only live in your thoughts—it lives in your
                body. After loss, your nervous system can feel completely out of
                sync: anxiety, exhaustion, numbness, a tightness you
                can&apos;t quite explain. This six-week experience helps you
                understand what&apos;s happening inside you—and how to begin
                working <em className="font-medium not-italic text-[#141413]">
                  with
                </em>{" "}
                your body, not against it.
              </p>

              <p className={`mt-4 max-w-xl text-[0.94rem] font-medium leading-relaxed text-[#666766]`}>
                No prior experience needed. You can participate, observe, or simply be present. There is no wrong way to show up.
              </p>

              {/* Primary CTA — anchors to form */}
              <div className="mt-8">
                <a
                  href="#signup"
                  className="inline-flex items-center gap-2 rounded-full bg-[#e76fab] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-md shadow-[#e76fab]/25 transition-[background-color,transform] duration-200 hover:bg-[#d85e9a] active:scale-[0.98]"
                >
                  Reserve my spot — $200 deposit
                  <svg aria-hidden viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 opacity-80">
                    <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </a>
              </div>

              {/* Pricing card */}
              <div className="mt-8 rounded-2xl border border-[#e76fab]/18 bg-white/60 p-5 backdrop-blur-[2px] sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  Investment
                </p>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[1.8rem] font-semibold leading-none tracking-tight text-[#141413]">
                    $899
                  </span>
                  <span className="text-[0.95rem] text-[#666766]">
                    — all six sessions included
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-[0.9rem] leading-relaxed text-[#444]">
                  <p>
                    Use code{" "}
                    <strong className="rounded-md border border-[#e76fab]/30 bg-[#fdf6fb] px-1.5 py-0.5 font-mono text-[0.85em] font-bold text-[#b8457e]">
                      ITSLIFEY50
                    </strong>{" "}
                    at checkout for{" "}
                    <strong className="text-[#141413]">$50 off</strong> — offer
                    ends <strong className="text-[#141413]">May 10</strong>.
                  </p>
                  <p className="text-[#666766]">
                    A <strong className="text-[#141413]">$200 deposit</strong>{" "}
                    reserves your spot and applies toward your total.
                  </p>
                </div>
                <EarlyBirdCountdown />
              </div>

              <p className="mt-6">
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-[#141413] underline decoration-[#e76fab]/50 underline-offset-[3px] transition-colors hover:text-[#e76fab] hover:decoration-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
                >
                  Questions first? Contact us
                </Link>
              </p>
            </div>

            {/* Right column — sticky form */}
            <div
              id="signup"
              className="scroll-mt-28 lg:sticky lg:top-28"
            >
              <div className="relative rounded-[1.35rem] border border-white/90 bg-white/90 p-6 shadow-[0_28px_70px_-24px_rgba(180,60,120,0.35)] ring-1 ring-[#e76fab]/10 backdrop-blur-md sm:p-8">
                <div
                  className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#e76fab]/40 to-transparent opacity-80 sm:inset-x-8"
                  aria-hidden
                />
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                      Reserve your spot
                    </p>
                    <p className="mt-1 text-[1.55rem] font-semibold leading-none tracking-tight text-[#141413]">
                      $200{" "}
                      <span className="text-base font-normal text-[#666766]">
                        deposit
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[#888]">
                      Applied toward $899/$849 total
                    </p>
                  </div>
                  <span className="mt-0.5 flex shrink-0 items-center gap-1.5 rounded-full border border-[#e76fab]/30 bg-[#fdf6fb] px-3 py-1.5 text-xs font-semibold text-[#b8457e]">
                    <span
                      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#e76fab]"
                      aria-hidden
                    />
                    3 spots left
                  </span>
                </div>
                <div className="mb-5 rounded-xl border border-[#e76fab]/18 bg-[#fdf8fb] px-4 py-3">
                  <p className="text-[0.82rem] leading-relaxed text-[#555]">
                    Use code{" "}
                    <strong className="font-mono text-[#b8457e]">
                      ITSLIFEY50
                    </strong>{" "}
                    at Stripe checkout — $50 off your total.{" "}
                    <span className="text-[#888]">Ends May 10.</span>
                  </p>
                </div>
                <VirtualHealingSignupForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────────────────────────── */}
      <article className={`${shell} py-16 sm:py-20 lg:py-28`}>
        <div className="mx-auto max-w-[42rem]">

          {/* ── If you recognize yourself here ── */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8457e] sm:text-[11px]">
              Is this for you?
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
              You might recognize yourself in this
            </h2>
            <div className="mt-3 h-px max-w-[4rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
            <ul className="mt-8 space-y-4">
              {recognizeItems.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#e76fab]/30 bg-[#fdf6fb]"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e76fab]" />
                  </span>
                  <p className={`${body} m-0`}>{item}</p>
                </li>
              ))}
            </ul>
            <p className={`${body} mt-8`}>
              This experience was built for exactly this. Not to fix you — to
              help you understand yourself, and to offer simple, body-based
              practices for the days when things feel impossibly heavy.
            </p>
          </div>

          {/* ── Six weeks ── */}
          <div className="mt-16 sm:mt-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8457e] sm:text-[11px]">
              The experience
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
              Six weeks. Six ways your body holds grief.
            </h2>
            <div className="mt-3 h-px max-w-[4rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
            <p className={`${body} mt-6 text-[#555]`}>
              Each session blends gentle education with guided practice — no
              homework, no performance, no pressure to feel anything other than
              what you feel.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {weekThemes.map((w) => (
                <div
                  key={w.title}
                  className="rounded-2xl border border-black/[0.055] bg-white/70 p-5 backdrop-blur-[2px]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                    {w.week}
                  </p>
                  <p className="mt-1.5 text-[1.05rem] font-semibold text-[#141413]">
                    {w.title}
                  </p>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[#555]">
                    {w.text}
                  </p>
                </div>
              ))}
            </div>
            <p className={`${body} mt-8 text-[#666766]`}>
              Part learning, part experience — always at your own pace. You can
              participate, observe, or simply be present. There is no wrong way
              to show up.
            </p>
          </div>

          {/* ── What you'll carry forward ── */}
          <div className="mt-16 sm:mt-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8457e] sm:text-[11px]">
              What you&apos;ll take with you
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
              Not just six sessions — a new way to understand yourself
            </h2>
            <div className="mt-3 h-px max-w-[4rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
            <div className="mt-8 space-y-5">
              {outcomes.map((o) => (
                <div
                  key={o.title}
                  className="flex gap-4 rounded-2xl border border-black/[0.055] bg-white/70 p-5 backdrop-blur-[2px]"
                >
                  <div
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e76fab]/12"
                    aria-hidden
                  >
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                      <polyline
                        points="2 6.5 4.5 9 10 3"
                        stroke="#e76fab"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#141413]">{o.title}</p>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-[#555]">
                      {o.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Timing + Investment ── */}
          <div className="mt-16 rounded-3xl border border-black/[0.06] bg-white/55 p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.12)] backdrop-blur-[2px] sm:mt-20 sm:p-10">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#141413]">
                  Timing
                </h2>
                <div className="mt-3 h-px max-w-[3rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
                <div className={`${body} mt-5 space-y-1.5`}>
                  <p>
                    <strong className="font-semibold text-[#141413]">Every Wednesday</strong>
                  </p>
                  <p className="text-[#555]">6:00–7:30 pm</p>
                  <p className="text-[#555]">6 weeks · begins <strong className="font-semibold text-[#141413]">May 20, 2026</strong></p>
                  <p className="text-[#555]">Virtual — join from anywhere</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#141413]">
                  Investment
                </h2>
                <div className="mt-3 h-px max-w-[3rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
                <ul className={`${body} mt-5 list-none space-y-3 p-0`}>
                  <li className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#141413]">$899</span>
                    <span className="text-[0.88rem] text-[#666766]">full price</span>
                  </li>
                  <li className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-semibold text-[#141413]">$849</span>
                    <span className="rounded-md border border-[#e76fab]/30 bg-[#fdf6fb] px-1.5 py-0.5 font-mono text-[0.78em] font-bold text-[#b8457e]">ITSLIFEY50</span>
                    <span className="text-[0.88rem] text-[#b8457e]">ends May 10</span>
                  </li>
                  <li className="border-t border-black/[0.06] pt-3 text-[0.9rem] text-[#555]">
                    <strong className="font-semibold text-[#141413]">$200 deposit</strong>{" "}
                    reserves your spot · applied toward total
                  </li>
                  <li className="text-[0.88rem] text-[#666766]">
                    + <strong className="font-semibold text-[#141413]">$100 off</strong> any It&apos;s Lifey retreat
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── A note from Jennifer ── */}
          <div className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-[#e76fab]/15 bg-gradient-to-br from-white via-[#fdf8fb] to-[#f8eef3] p-8 shadow-[0_24px_60px_-30px_rgba(180,60,120,0.18)] sm:p-10">
              <div
                className="pointer-events-none absolute -right-20 -top-10 h-52 w-52 rounded-full bg-[#e76fab]/8 blur-3xl"
                aria-hidden
              />
              <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-8">
                <div className="relative shrink-0">
                  <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#e76fab]/25 shadow-[0_8px_28px_-8px_rgba(199,77,138,0.3)] sm:h-24 sm:w-24">
                    <Image
                      src="/images/jen1.webp"
                      alt="Jennifer, founder of It's Lifey"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b8457e] sm:text-[11px]">
                    A note from Jennifer
                  </p>
                  <p className="mt-4 text-[1.0rem] leading-[1.82] text-[#2a2928] sm:text-[1.05rem]">
                    &ldquo;I brought Tina into It&apos;s Lifey because I have
                    watched her do something I rarely see — she meets people
                    exactly where they are, without any pressure to be further
                    along than they are. She is patient, deeply skilled, and
                    genuinely warm.&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#141413]">
                    Jennifer{" "}
                    <span className="font-normal text-[#888]">
                      — Founder, It&apos;s Lifey · widow
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Meet Tina ── */}
          <div id="meet-tina" className="mt-16 sm:mt-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8457e] sm:text-[11px]">
              Your guide
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
              Meet Tina Walsh
            </h2>
            <div className="mt-3 h-px max-w-[4rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#e76fab]">
              Holistic therapist · Quantum energy healer · 20+ years experience
            </p>
            <p className={`${body} mt-6`}>
              Tina Walsh is a body-centered therapist and quantum energy healer
              who has spent over twenty years helping people release the
              patterns, beliefs, and wounds held silently in the body. She
              works with the nervous system, not against it — gently, with
              depth, and with humor.
            </p>
            <p className={`${body} mt-5`}>
              Her approach draws from somatic counseling, yoga therapy,
              breathwork, movement, Reiki, and meditation. She knows that
              healing doesn&apos;t follow a script — and she won&apos;t ask you
              to follow one either.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Body-centered & somatic counseling",
                "Yoga therapy & conscious movement",
                "Breathwork, Reiki & meditation",
              ].map((credential) => (
                <div
                  key={credential}
                  className="rounded-xl border border-black/[0.055] bg-white/65 px-4 py-3 text-[0.86rem] font-medium leading-snug text-[#3a3938]"
                >
                  {credential}
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-3xl bg-[#e76fab] px-8 py-10 text-center shadow-[0_24px_60px_-20px_rgba(231,111,171,0.5)] sm:px-12 sm:py-12">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f0849d] via-[#e76fab] to-[#c94e8d] opacity-70"
                aria-hidden
              />
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-[11px]">
                  Only 3 spots · Cohort begins May 20
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                  Ready to gently come home to your body?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/85">
                  Reserve your spot with a $200 deposit. Applied toward your
                  total. Use code{" "}
                  <strong className="font-bold text-white">ITSLIFEY50</strong>{" "}
                  at checkout for $50 off — ends May 10.
                </p>
                <a
                  href="#signup"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[0.95rem] font-semibold text-[#b8457e] shadow-lg shadow-black/15 transition-[transform,opacity] duration-200 hover:opacity-95 active:scale-[0.98]"
                >
                  Reserve my spot
                  <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                    <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        <p className="mx-auto mt-14 max-w-[42rem] text-center text-sm text-[#666766] sm:mt-16">
          Prefer community first?{" "}
          <Link
            href="/hopehub"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
          >
            HopeHub
          </Link>{" "}
          is free—and you can still join this experience when it feels right.
        </p>
      </article>
    </div>
  );
}
