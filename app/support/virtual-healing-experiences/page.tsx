import type { Metadata } from "next";
import Link from "next/link";
import { VirtualHealingPixelEvents } from "@/components/VirtualHealingPixelEvents";
import { VirtualHealingSignupForm } from "@/components/VirtualHealingSignupForm";

export const metadata: Metadata = {
  title: "Virtual Healing Experiences — The Body Keeps the Story | It's Lifey",
  description:
    "A 6-week virtual experience with Tina Walsh: grief, trauma, and the nervous system—gentle education and body-based practices. Limited spots. Created for widows.",
};

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

const body =
  "text-[0.98rem] leading-[1.78] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.76]";

const weekThemes = [
  {
    title: "Nervous system",
    text: "Understand overwhelm and learn to regulate.",
  },
  {
    title: "Chakra",
    text: "Explore energy and emotional balance.",
  },
  {
    title: "Breathwork",
    text: "Release tension and calm the body.",
  },
  {
    title: "Meditation",
    text: "Practice presence—without pressure.",
  },
  {
    title: "Movement",
    text: "Gently move stored stress and grief.",
  },
  {
    title: "Grounding",
    text: "Find steadiness in hard moments.",
  },
] as const;

const sectionTitle =
  "text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]";

export default function VirtualHealingExperiencesPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <VirtualHealingPixelEvents />
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
            <div className="order-2 max-w-2xl lg:order-1 lg:pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7a6a72] sm:text-[11px]">
                Support · Virtual Healing Experiences
              </p>
              <h1
                id="vhe-hero-heading"
                className="mt-5 text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl sm:leading-[1.08] lg:text-[2.5rem] lg:leading-[1.05] xl:text-[2.65rem]"
              >
                The Body Keeps the Story: Healing After Loss, Grief, Trauma
                &amp; the Body
              </h1>
              <p className="mt-5 inline-flex items-center rounded-full border border-[#e76fab]/25 bg-white/85 px-4 py-2 text-sm font-semibold text-[#b8457e] shadow-[0_8px_30px_-8px_rgba(199,77,138,0.25)] backdrop-blur-sm">
                Only 8 spots
              </p>
              <p className={`mt-9 max-w-xl ${body}`}>
                Grief doesn&apos;t only live in your thoughts—it lives in your
                body. After loss, your nervous system can feel completely out of
                sync: anxiety, exhaustion, numbness, overwhelm. This six-week
                experience helps you understand what&apos;s happening inside you
                and how to begin working <em className="not-italic">with</em>{" "}
                your body instead of against it.
              </p>
              <p className="mt-7">
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-[#141413] underline decoration-[#e76fab]/50 underline-offset-[3px] transition-colors hover:text-[#e76fab] hover:decoration-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
                >
                  Questions first? Contact us
                </Link>
              </p>
            </div>

            <div
              id="signup"
              className="order-1 scroll-mt-28 lg:order-2 lg:sticky lg:top-28"
            >
              <div className="relative rounded-[1.35rem] border border-white/90 bg-white/90 p-6 shadow-[0_28px_70px_-24px_rgba(180,60,120,0.35)] ring-1 ring-[#e76fab]/10 backdrop-blur-md sm:p-8">
                <div
                  className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#e76fab]/40 to-transparent opacity-80 sm:inset-x-8"
                  aria-hidden
                />
                <h2 className="text-xl font-semibold tracking-tight text-[#141413] sm:text-[1.35rem]">
                  Save your spot
                </h2>
                <p className={`${body} mt-2 text-[#555]`}>
                  We&apos;ll follow up to confirm one of the eight places. You get
                  a confirmation email right away.
                </p>
                <div className="mt-6">
                  <VirtualHealingSignupForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className={`${shell} py-16 sm:py-20 lg:py-28`}>
        <div className="mx-auto max-w-[42rem]">
          <p className={`${body} m-0`}>
            Each session blends simple education with gentle, guided practices
            to help you feel more steady, present, and supported.
          </p>
          <p className={`${body} mt-6`}>
            Led by accredited wellness expert{" "}
            <strong className="font-semibold text-[#141413]">
              Tina Walsh
            </strong>
            , this experience focuses on making sense of what you&apos;re
            feeling using simple, body-based tools that actually help—not
            overwhelm. No pressure, no fixing—just support, guidance, and
            practical tools you can use in real life.
          </p>
          <p className={`${body} mt-6`}>
            Together, we&apos;ll explore how grief impacts the nervous system,
            why your body reacts the way it does, and practices like breathwork,
            movement, meditation, and grounding to help you regulate and
            reconnect.
          </p>
          <p className={`${body} mt-6 font-medium text-[#141413]`}>
            No experience needed. You can participate, observe, or simply be.
          </p>
          <p className={`${body} mt-6`}>
            This isn&apos;t about fixing yourself—it&apos;s about understanding
            yourself and learning how to support your body through grief.
          </p>

          <div className="relative mt-16 sm:mt-20">
            <div
              className="absolute -left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[#e76fab]/50 via-[#e76fab]/20 to-transparent sm:block"
              aria-hidden
            />
            <h2 className={`${sectionTitle} scroll-mt-28`}>The experience</h2>
            <div className="mt-3 h-px max-w-[4.5rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
            <p className={`${body} mt-6`}>
              Each week focuses on a different way grief can show up in the
              body:
            </p>
            <ol className="relative mt-10 space-y-8 border-l-2 border-[#e76fab]/22 pl-8 sm:pl-9">
              {weekThemes.map((w) => (
                <li key={w.title} className="relative">
                  <span
                    className="absolute -left-[calc(0.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#f6f3ee] bg-[#e76fab] shadow-[0_0_0_1px_rgba(231,111,171,0.3)] sm:-left-[calc(0.5rem+6px)]"
                    aria-hidden
                  />
                  <p className={`${body} m-0`}>
                    <span className="font-semibold text-[#141413]">
                      {w.title}
                    </span>
                    <span className="text-[#666766]"> — </span>
                    {w.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className={`${body} mt-10 text-[#666766]`}>
              Part learning, part experience—always at your own pace.
            </p>
          </div>

          <div className="mt-16 rounded-3xl border border-black/[0.06] bg-white/55 p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.12)] backdrop-blur-[2px] sm:mt-20 sm:p-10">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
              <div>
                <h2 className={`${sectionTitle} scroll-mt-28`}>Timing</h2>
                <div className="mt-3 h-px max-w-[3rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
                <p className={`${body} mt-5`}>
                  Runs every <strong className="font-semibold">Wednesday</strong>
                  , <strong className="font-semibold">6:00–7:30</strong>, for six
                  weeks, starting{" "}
                  <strong className="font-semibold">May 20, 2026</strong>.
                </p>
              </div>
              <div>
                <h2 className={`${sectionTitle} scroll-mt-28`}>Investment</h2>
                <div className="mt-3 h-px max-w-[3rem] bg-gradient-to-r from-[#e76fab]/70 to-transparent" />
                <ul className={`${body} mt-5 list-none space-y-3.5 p-0`}>
                  <li className="border-l-2 border-[#e76fab]/30 pl-4">
                    <strong className="font-semibold text-[#141413]">$899</strong>{" "}
                    — includes all six sessions
                  </li>
                  <li className="border-l-2 border-[#e76fab]/30 pl-4">
                    <strong className="font-semibold text-[#141413]">
                      $50 off
                    </strong>{" "}
                    for anyone who registers by{" "}
                    <strong className="font-semibold">April 21, 2026</strong>
                  </li>
                  <li className="border-l-2 border-[#e76fab]/30 pl-4">
                    Attendees also receive{" "}
                    <strong className="font-semibold text-[#141413]">
                      $100 off
                    </strong>{" "}
                    an It&apos;s Lifey retreat.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            id="meet-tina"
            className="relative mt-16 overflow-hidden rounded-3xl border border-[#e76fab]/15 bg-gradient-to-br from-white via-[#fdf8fb] to-[#f8eef3] p-8 shadow-[0_24px_60px_-30px_rgba(180,60,120,0.2)] sm:mt-20 sm:p-11"
          >
            <div
              className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-[#e76fab]/10 blur-3xl"
              aria-hidden
            />
            <h2 className="text-2xl font-semibold tracking-tight text-[#141413] sm:text-[1.65rem]">
              Meet Tina Walsh
            </h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#e76fab]">
              Quantum energy healer · Your guide for this series
            </p>
            <p className={`${body} mt-7`}>
              Tina Walsh is a holistic, body-centered therapist and quantum
              energy healer who guides clients on the journey to their highest
              potential. With over twenty years of experience, Tina helps
              people release old patterns, limiting beliefs, and unconscious
              wounds held in the body that impact the nervous system and
              overall well-being.
            </p>
            <p className={`${body} mt-6`}>
              Her integrative approach weaves together Body-Centered/Somatic
              Counseling, Yoga Therapy (private or group), Conscious Dance,
              Reiki, Reconnective Healing, Massage, Intuitive Development,
              Ritual Food Celebrations, and transformational world travel
              adventures. Known for her depth, humor, and heart, Tina inspires
              clients to heal, grow, and evolve into the fullest expression of
              their authentic Self.
            </p>
          </div>
        </div>

        <p
          className={`mx-auto mt-16 max-w-[42rem] text-center text-sm text-[#666766] sm:mt-20`}
        >
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
