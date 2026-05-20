import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { First40SignupForm } from "@/components/First40SignupForm";

export const metadata: Metadata = {
  title: "First40 Workshop (Mockup)",
  description:
    "Draft page for a gentle virtual workshop with First40 and It's Lifey—supporting widows navigating the emotional and practical realities of life after loss. Not indexed in search.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

const body =
  "text-[0.98rem] leading-[1.78] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.76]";

const widowBullets = [
  "Feel more organized and prepared without fear or pressure",
  "Begin documenting important information, wishes, and practical details",
  "Preserve memories, traditions, values, and stories for loved ones",
  "Learn simple tools that make difficult conversations feel easier",
  "Reflect on what truly matters most after loss",
  "Connect with other widows who understand how deeply loss changes everything",
] as const;

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8457e] sm:text-[11px]">
      {children}
    </p>
  );
}

function SectionTitle({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]"
    >
      {children}
    </h2>
  );
}

function PinkRule() {
  return (
    <div
      className="mt-3 h-px max-w-[4rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent"
      aria-hidden
    />
  );
}

function VheStyleList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((item) => (
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
  );
}

const ctaArrow = (
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
);

export default function First40MockupPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <div
        className="border-b border-[#e8d4df]/90 bg-[#2a2928]/[0.06] py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5c5258] sm:text-xs"
        role="status"
      >
        Draft mockup · not indexed · pending First40 review
      </div>

      {/* ── HERO (aligned with Virtual Healing Experiences) ── */}
      <section
        className="relative overflow-hidden border-b border-[#e8d4df]/80"
        aria-labelledby="f40-hero-heading"
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
            <div className="max-w-2xl lg:pt-1">
              <SectionEyebrow>First40 × It&apos;s Lifey · Virtual workshop</SectionEyebrow>
              <h1
                id="f40-hero-heading"
                className="mt-5 text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl sm:leading-[1.08] lg:text-[2.5rem] lg:leading-[1.05] xl:text-[2.65rem]"
              >
                When Loss Changes How You Think About Everything
              </h1>
              <p className="mt-2 text-lg font-normal leading-snug text-[#666766] sm:text-xl">
                Supporting widows through the emotional &amp; practical realities
                of loss
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-[#e76fab]/35 bg-white/90 px-4 py-2 text-sm font-semibold text-[#b8457e] shadow-[0_6px_24px_-6px_rgba(199,77,138,0.22)] backdrop-blur-sm">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-[#e76fab]"
                    aria-hidden
                  />
                  June 18 · Virtual
                </p>
                <p className="inline-flex items-center rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-[#3a3938] backdrop-blur-sm">
                  45 min + live Q&amp;A
                </p>
              </div>

              <p className={`mt-8 max-w-xl ${body}`}>
                A gentle virtual workshop for widows navigating the emotional and
                practical realities of life after loss. Grief brings paperwork,
                decisions, and moments no one prepares us for—this is a space to
                begin organizing what matters most, with{" "}
                <em className="font-medium not-italic text-[#141413]">
                  compassion, clarity, and no pressure.
                </em>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#reserve"
                  className="inline-flex items-center gap-2 rounded-full bg-[#e76fab] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-md shadow-[#e76fab]/25 transition-[background-color,transform] duration-200 hover:bg-[#d85e9a] active:scale-[0.98]"
                >
                  Reserve my spot
                  {ctaArrow}
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e76fab]/35 bg-white/80 px-7 py-3.5 text-[0.95rem] font-semibold text-[#b8457e] transition-[background-color,transform] duration-200 hover:bg-[#fce8f2] active:scale-[0.98]"
                >
                  View pricing
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-[#e76fab]/18 bg-white/60 p-5 backdrop-blur-[2px] sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  At a glance
                </p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[#444]">
                  Led by the founders of{" "}
                  <strong className="font-semibold text-[#141413]">First40</strong>
                  , with{" "}
                  <strong className="font-semibold text-[#141413]">
                    Jennifer Newberg
                  </strong>
                  , founder of It&apos;s Lifey—worksheets, reflection prompts, and
                  facilitator stories in one supportive hour.
                </p>
                <p className="mt-4 rounded-xl border border-[#e76fab]/18 bg-[#fdf8fb] px-4 py-3 text-[0.82rem] leading-relaxed text-[#555]">
                  <strong className="text-[#b8457e]">First 10 individual tickets:</strong>{" "}
                  complimentary Closure Map Workbook ($29.40 value).
                </p>
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

            <div id="at-a-glance" className="scroll-mt-28 lg:sticky lg:top-28">
              <div className="relative rounded-[1.35rem] border border-white/90 bg-white/90 p-6 shadow-[0_28px_70px_-24px_rgba(180,60,120,0.35)] ring-1 ring-[#e76fab]/10 backdrop-blur-md sm:p-8">
                <div
                  className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#e76fab]/40 to-transparent opacity-80 sm:inset-x-8"
                  aria-hidden
                />
                <div className="mb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                    Event details
                  </p>
                  <p className="mt-2 text-[1.55rem] font-semibold leading-tight tracking-tight text-[#141413]">
                    Wednesday, June 18
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#666766]">
                    4:00 p.m. PDT / 7:00 p.m. EDT
                  </p>
                  <p className="mt-1 text-sm text-[#888]">
                    Virtual · 45-minute workshop + live Q&amp;A
                  </p>
                </div>
                <div className="space-y-3 border-t border-black/[0.06] pt-5 text-[0.9rem] leading-relaxed text-[#555]">
                  <p>
                    <strong className="font-semibold text-[#141413]">For widows</strong>{" "}
                    navigating the emotional and practical realities of life after loss—whether newly widowed or years into this journey.
                  </p>
                </div>
                <a
                  href="#reserve"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#e76fab]/35 bg-[#fdf6fb] py-3.5 text-[0.9rem] font-semibold text-[#b8457e] transition hover:bg-[#fce8f2] active:scale-[0.99]"
                >
                  Reserve my spot from $49
                  {ctaArrow}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className={`${shell} py-16 sm:py-20 lg:py-28`}>
        <div className="mx-auto max-w-[42rem]">
          <SectionEyebrow>The heart of it</SectionEyebrow>
          <SectionTitle id="f40-intro">No one hands us a map</SectionTitle>
          <PinkRule />
          <p className={`${body} mt-8`}>
            When someone you love dies, there are so many things no one prepares
            you for. The paperwork. The passwords. The &ldquo;where is
            everything?&rdquo; moments. The decisions you suddenly have to make
            while your heart is still trying to catch up to your reality.
          </p>
          <p className={`${body} mt-5`}>
            And somewhere in the middle of grief, many widows quietly begin
            thinking something else too:
          </p>
          <p className={`${body} mt-5 pl-4 border-l-2 border-[#e76fab]/40 italic text-[#444]`}>
            If something happened to me tomorrow, would the people I love know
            what matters most? Would they know where important things are? Would
            they know my wishes? Would they know the stories, traditions, and
            little things I never want forgotten?
          </p>
          <p className={`${body} mt-5`}>
            This workshop was created to gently help widows navigate those
            conversations and begin organizing the things that matter
            most—emotionally and practically—without fear, pressure, or overwhelm.
          </p>
          <p className={`${body} mt-5`}>
            Led by the founders of First40 and hosted by widow, speaker, and
            founder of It&apos;s Lifey, Jen Newberg, this experience combines
            compassionate conversation, practical guidance, and meaningful
            reflection in a supportive community setting.
          </p>

          {/* Why this matters */}
          <div className="mt-16 sm:mt-20">
            <SectionEyebrow>Why this matters</SectionEyebrow>
            <SectionTitle id="f40-why">
              Why this matters for widows
            </SectionTitle>
            <PinkRule />
            <p className={`${body} mt-6 text-[#555]`}>
              After loss, even the smallest decisions can feel exhausting. You
              are grieving while also trying to manage paperwork, finances,
              memories, logistics, relationships, and an entirely new version of
              life you never asked for.
            </p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8457e]">
              This workshop offers a supportive space to
            </p>
            <VheStyleList items={widowBullets} />
            <p className={`${body} mt-8 font-medium text-[#141413]`}>
              This is not about preparing for the worst.
            </p>
            <p className={`${body} mt-2`}>
              It&apos;s about creating more clarity, connection, peace of mind,
              and support for yourself and the people you love.
            </p>
          </div>

          {/* Closure Map — gradient feature card */}
          <div className="mt-16 sm:mt-20" id="closure-map">
            <div className="relative overflow-hidden rounded-3xl border border-[#e76fab]/15 bg-gradient-to-br from-white via-[#fdf8fb] to-[#f8eef3] p-8 shadow-[0_24px_60px_-30px_rgba(180,60,120,0.18)] sm:p-10">
              <div
                className="pointer-events-none absolute -right-20 -top-10 h-52 w-52 rounded-full bg-[#e76fab]/8 blur-3xl"
                aria-hidden
              />
              <SectionEyebrow>What you&apos;ll explore</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
                What is a Closure Map?
              </h2>
              <PinkRule />
              <p className={`${body} mt-6 max-w-none text-[#2a2928]`}>
                A Closure Map is a simple way to organize important information,
                reflect on memories, and document what matters most—from practical
                details to stories, traditions, and wishes for the people you love.
              </p>
              <p className="mt-5 text-lg font-medium leading-relaxed text-[#444]">
                It&apos;s not about fear.
              </p>
              <p className={`${body} mt-2`}>
                It&apos;s about clarity, connection, and peace of mind.
              </p>
            </div>
          </div>

          {/* Jennifer bridge — matches VHE “note from Jennifer” */}
          <div className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-[#e76fab]/15 bg-gradient-to-br from-white via-[#fdf8fb] to-[#f8eef3] p-8 shadow-[0_24px_60px_-30px_rgba(180,60,120,0.18)] sm:p-10">
              <div
                className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-[#e76fab]/6 blur-3xl"
                aria-hidden
              />
              <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-8">
                <div className="relative shrink-0">
                  <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#e76fab]/25 shadow-[0_8px_28px_-8px_rgba(199,77,138,0.3)] sm:h-24 sm:w-24">
                    <Image
                      src="/images/jen1.webp"
                      alt="Jennifer Newberg, founder of It's Lifey"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b8457e] sm:text-[11px]">
                    Facilitated by Jennifer
                  </p>
                  <p className="mt-4 text-[1.0rem] leading-[1.82] text-[#2a2928] sm:text-[1.05rem]">
                    This evening is about honest conversation—no jargon, no pressure.
                    Whether you are newly widowed or years into this journey, you
                    deserve a space that feels{" "}
                    <em className="font-medium not-italic text-[#141413]">
                      steady, kind, and practical
                    </em>
                    .
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#141413]">
                    Jennifer Newberg{" "}
                    <span className="font-normal text-[#888]">
                      — Founder, It&apos;s Lifey · widow
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Meet facilitators — VHE “Meet Tina” rhythm */}
          <div className="mt-16 sm:mt-20" id="facilitators">
            <SectionEyebrow>Your guides</SectionEyebrow>
            <SectionTitle>Meet the facilitators</SectionTitle>
            <PinkRule />
            <div className="mt-10 space-y-6">
              <div className="rounded-2xl border border-black/[0.055] bg-white/70 p-6 backdrop-blur-[2px] sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  First40
                </p>
                <p className="mt-2 text-lg font-semibold text-[#141413]">
                  Mikalee Byerman
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#e76fab]">
                  Award-winning author · strategist · keynote speaker
                </p>
              </div>
              <div className="rounded-2xl border border-black/[0.055] bg-white/70 p-6 backdrop-blur-[2px] sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  First40
                </p>
                <p className="mt-2 text-lg font-semibold text-[#141413]">
                  Heidi Struve Currey
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#e76fab]">
                  Bestselling author · leadership coach · former financial executive
                </p>
              </div>
              <div className="rounded-2xl border border-[#e76fab]/22 bg-gradient-to-br from-white to-[#fdf8fb] p-6 shadow-sm sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  Special guest
                </p>
                <p className="mt-2 text-lg font-semibold text-[#141413]">
                  Jennifer Newberg
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#e76fab]">
                  Founder, It&apos;s Lifey · widow · community builder
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timing + pricing — full bleed card then grid */}
        <div className="mx-auto mt-16 max-w-[min(72rem,100%)] sm:mt-20">
          <div
            id="pricing"
            className="scroll-mt-28 rounded-3xl border border-black/[0.06] bg-white/55 p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.12)] backdrop-blur-[2px] sm:p-10"
          >
            <div className="mx-auto max-w-[42rem] text-center lg:mx-0 lg:max-w-none lg:text-left">
              <SectionEyebrow>Reserve your spot</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
                Pricing &amp; packages
              </h2>
              <PinkRule />
              <p className={`${body} mx-auto mt-6 max-w-xl text-[#555] lg:mx-0`}>
                Whether you are newly widowed or years into this journey, this
                workshop offers thoughtful guidance around the conversations and
                planning no one prepares us for.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
              <div className="rounded-2xl border border-[#e76fab]/15 bg-[#fdf8fb]/80 p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-[#141413]">
                  When &amp; where
                </h3>
                <div className="mt-3 h-px max-w-[3rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
                <div className={`${body} mt-5 space-y-2 text-[#555]`}>
                  <p>
                    <strong className="font-semibold text-[#141413]">
                      Wednesday, June 18
                    </strong>
                  </p>
                  <p>4:00 p.m. PDT / 7:00 p.m. EDT</p>
                  <p>Virtual · 45 minutes + live Q&amp;A</p>
                  <p className="pt-2 text-[0.88rem] leading-relaxed text-[#666766]">
                    Worksheets, reflection prompts, and facilitator stories—with
                    First40 founders, facilitated by Jennifer.
                  </p>
                </div>
              </div>

              <ul className="grid list-none gap-4 p-0 sm:grid-cols-3">
                <li className="flex flex-col rounded-2xl border border-black/[0.055] bg-white/80 p-5 backdrop-blur-[2px] sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                    Individual
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[#141413]">
                    $49
                  </p>
                  <p className={`mt-3 flex-1 text-[0.9rem] leading-relaxed text-[#555]`}>
                    One attendee. First 10 registrants receive a complimentary Closure
                    Map Workbook ($29.40 value).
                  </p>
                </li>
                <li className="relative flex flex-col rounded-2xl border border-[#e76fab]/35 bg-white p-5 shadow-md shadow-[#e76fab]/[0.12] ring-1 ring-[#e76fab]/15 backdrop-blur-[2px] sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e76fab]">
                    Package of 5 attendees
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[#141413]">
                    $98
                  </p>
                  <p className={`mt-1 text-[0.82rem] font-semibold text-[#e76fab]`}>
                    Buy 2, get 3 free
                  </p>
                  <p className={`mt-3 flex-1 text-[0.9rem] leading-relaxed text-[#555]`}>
                    Perfect for widow groups, friends, family members, or support
                    circles who want to attend together.
                  </p>
                </li>
                <li className="flex flex-col rounded-2xl border border-black/[0.055] bg-white/80 p-5 backdrop-blur-[2px] sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                    Package of 10 attendees
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[#141413]">
                    $196
                  </p>
                  <p className={`mt-1 text-[0.82rem] font-semibold text-[#e76fab]`}>
                    Buy 4, get 6 free
                  </p>
                  <p className={`mt-3 flex-1 text-[0.9rem] leading-relaxed text-[#555]`}>
                    A meaningful option for larger communities, organizations, or
                    groups of widows who want shared support and conversation.
                  </p>
                </li>
              </ul>
            </div>

            <div className="mx-auto mt-10 max-w-md lg:mx-0">
              <a
                href="#reserve"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e76fab] px-8 py-3.5 text-[0.95rem] font-semibold text-white shadow-md shadow-[#e76fab]/25 transition-[background-color,transform] hover:bg-[#d85e9a] active:scale-[0.98]"
              >
                Reserve your spot
                {ctaArrow}
              </a>
            </div>
          </div>
        </div>

        {/* ── Registration form ── */}
        <div className="mx-auto mt-16 max-w-[min(52rem,100%)] sm:mt-20">
          <div className="rounded-3xl border border-black/[0.06] bg-white/55 p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.12)] backdrop-blur-[2px] sm:p-10">
            <div className="mx-auto max-w-[42rem]">
              <SectionEyebrow>Registration</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
                Register for the workshop
              </h2>
              <PinkRule />
              <p className={`${body} mt-5 text-[#555]`}>
                Select your package, fill in your details, and you&apos;ll be
                taken to secure checkout. Confirmation sent to your email.
              </p>
              <div className="mt-8">
                <First40SignupForm />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-[42rem] sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#e76fab] px-8 py-10 text-center shadow-[0_24px_60px_-20px_rgba(231,111,171,0.5)] sm:px-12 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f0849d] via-[#e76fab] to-[#c94e8d] opacity-70"
              aria-hidden
            />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-[11px]">
                June 18 · Virtual · First40 × It&apos;s Lifey
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                The conversations &amp; planning no one prepares us for
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/85">
                One gentle workshop for widows—practical tools, meaningful reflection,
                and space for real questions.
              </p>
              <a
                href="#reserve"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[0.95rem] font-semibold text-[#b8457e] shadow-lg shadow-black/15 transition-[transform,opacity] duration-200 hover:opacity-95 active:scale-[0.98]"
              >
                Reserve my spot
                {ctaArrow}
              </a>
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
          is free—and you can still join this workshop when it feels right.
        </p>
      </article>
    </div>
  );
}
