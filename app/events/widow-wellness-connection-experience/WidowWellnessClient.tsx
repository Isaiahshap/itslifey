"use client";

import { WidowWellnessPixelEvents } from "@/components/WidowWellnessPixelEvents";
import { WidowWellnessRegistrationForm } from "@/components/WidowWellnessRegistrationForm";
import {
  BREAKOUT_LEADERS,
  EVENT_DATES,
  EVENT_LOCATION,
  EVENT_NAME,
  EVENT_SHORT_TAGLINE,
  EVENT_SPONSORS,
  HOTEL_BLOCK_URL,
  HOTEL_NAME,
  SPONSORSHIP_PATH,
} from "@/lib/widow-wellness-event";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_IMAGE = "/images/hero3.webp";

const presentingSponsors = EVENT_SPONSORS.filter((s) => s.featured);
const supportingSponsors = EVENT_SPONSORS.filter((s) => !s.featured);

const DAY_INCLUDES = [
  "Powerful keynote speakers",
  "Interactive wellness breakouts",
  "Breakfast & shared lunch",
  "Networking with women who get it",
  "Practical tools & trusted resources",
  "The Hope Mic Story Slam close",
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

const MARQUEE =
  "November 13–14, 2026  ·  Presence & Co., Reading, MA  ·  Real talk. Real connection. Real hope.";

const morningBreakouts = BREAKOUT_LEADERS.filter(
  (leader) => leader.slot === "morning",
).map((leader) => ({
  title: leader.session,
  leader: leader.name,
}));

const afternoonBreakouts = BREAKOUT_LEADERS.filter(
  (leader) => leader.slot === "afternoon",
).map((leader) => ({
  title: leader.session,
  leader: leader.name,
}));

const EVENT_FLOW = [
  {
    step: "01",
    when: "November 13 · Evening",
    title: "VIP Evening Event · Mocktail Hour with Kelley Lynn",
    items: [
      "Welcome and connection",
      "Mocktails and light bites",
      "Conversation with Kelley Lynn",
      "Laughter, honesty, and hope",
      "Time for widows, sponsors, and VIP guests to connect",
    ],
    variant: "vip" as const,
  },
  {
    step: "02",
    when: "November 14 · Morning",
    title: "Main Widow Wellness Experience · Morning Welcome",
    items: [
      "Arrival, coffee, and connection",
      "Welcome from It's Lifey",
      "Grounding moment / candle lighting",
      "Opening keynote",
    ],
    variant: "main" as const,
  },
  {
    step: "03",
    when: "November 14 · Mid-morning · approximately 10 a.m.",
    title: "Mid-Morning Breakout Sessions",
    intro:
      "Widows will choose from healing and wellness-centered sessions:",
    items: morningBreakouts,
    variant: "breakouts" as const,
  },
  {
    step: "04",
    when: "November 14 · Midday",
    title: "Lunch & Connection",
    items: [
      "Shared lunch",
      "Sponsor and resource table visits",
      "Time for widows to connect in a relaxed, supportive setting",
    ],
    variant: "main" as const,
  },
  {
    step: "05",
    when: "November 14 · Afternoon",
    title: "Afternoon Program",
    items: [
      "Afternoon keynote",
      "Wellness breakout sessions · approximately 2 p.m.",
      ...afternoonBreakouts,
      "Guided reflection or community conversation",
    ],
    variant: "main" as const,
  },
  {
    step: "06",
    when: "November 14 · Closing",
    title: "The Hope Mic Story Slam · Stories of Experience, Strength & Hope",
    prose: [
      "The day will close with The Hope Mic Story Slam — an open invitation for widows to share their stories in a supportive, judgment-free space.",
      "Each speaker will have 3 minutes to share a piece of their experience, strength, and hope — whether it's a moment of grief, love, humor, survival, rebuilding, or what life after loss has taught them.",
      "This closing event honors the truth that every widow has a story, and that sharing those stories can be healing for the person speaking and for every woman listening.",
    ],
    variant: "closing" as const,
  },
];

function scrollToRegister() {
  document.getElementById("ww-register")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function BreakoutLeaderRow({
  leader,
  photo,
}: {
  leader: (typeof BREAKOUT_LEADERS)[number];
  photo?: string;
}) {
  return (
    <motion.li
      {...fadeUp}
      className={`grid items-start gap-6 py-10 sm:py-12 ${
        photo ? "lg:grid-cols-12 lg:gap-12" : ""
      }`}
    >
      {photo ? (
        <figure className="relative mx-auto aspect-[4/5] w-full max-w-[13.5rem] overflow-hidden rounded-2xl bg-[#ebe6df] shadow-sm ring-1 ring-black/[0.06] lg:col-span-4 lg:mx-0 lg:max-w-none xl:col-span-3">
          <Image
            src={photo}
            alt={leader.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 13.5rem, 16rem"
          />
        </figure>
      ) : null}
      <div
        className={`min-w-0 ${
          photo ? "lg:col-span-8 xl:col-span-9" : ""
        }`}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8457e] sm:text-[11px]">
          {leader.slot === "morning"
            ? "Morning · approximately 10 a.m."
            : "Afternoon · approximately 2 p.m."}
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-snug text-[#141413] sm:text-[1.65rem]">
          {leader.name}
        </h3>
        <p className="mt-3 text-[1.05rem] font-medium leading-snug text-[#141413] sm:text-lg">
          {leader.session}
        </p>
        <div className={`mt-5 space-y-4 ${body} text-[#444443]`}>
          {leader.description.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <a
          href={leader.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 transition-colors hover:text-[#d85e9a] hover:decoration-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
        >
          Website
        </a>
      </div>
    </motion.li>
  );
}

export function WidowWellnessClient({
  availableLeaderPhotos = {},
}: {
  availableLeaderPhotos?: Partial<Record<string, string>>;
}) {
  return (
    <div className="min-w-0 overflow-x-clip bg-[#f6f3ee]">
      <WidowWellnessPixelEvents contentName={EVENT_NAME} value={129} />

      {/* Hero */}
      <section
        className="relative w-full min-w-0 overflow-hidden min-h-[min(88vh,760px)] lg:h-[min(88vh,920px)]"
        aria-labelledby="ww-hero-heading"
      >
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/58 to-black/85"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.5)_100%)]"
            aria-hidden
          />
        </div>

        <div
          className={`relative mx-auto flex h-full min-h-[min(88vh,760px)] flex-col justify-end gap-8 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:min-h-0 lg:pb-16 lg:pt-24 ${shell}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-4xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/85 sm:text-[11px]">
              Presented by It&apos;s Lifey
            </p>
            <h1
              id="ww-hero-heading"
              className="mt-4 max-w-[18ch] text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              Widow Wellness &amp; Connection Experience
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/92 sm:text-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
              A one-day gathering for widows across New England — inspiration,
              education, healing, and women who truly understand.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex rounded-full bg-[#e76fab] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white ring-2 ring-white/25 sm:text-[13px]">
                {EVENT_DATES}
              </span>
              <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#2a2928] ring-2 ring-white/30">
                {EVENT_LOCATION}
              </span>
            </div>
            <p className="mt-5 text-base font-medium italic text-[#f5b8dc] sm:text-lg">
              {EVENT_SHORT_TAGLINE}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={scrollToRegister}
                className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-9 py-4 text-base font-semibold text-white shadow-lg shadow-black/20 ring-2 ring-white/30 transition-[background-color,transform] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99]"
              >
                Reserve your spot
              </button>
              <Link
                href={SPONSORSHIP_PATH}
                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Sponsorship opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div
        className="w-full overflow-hidden border-y border-black/[0.08] bg-[#faf8f5] py-2.5"
        aria-hidden
      >
        <div className="retreat-marquee-track">
          <span className="shrink-0 whitespace-nowrap px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666766] sm:text-xs sm:tracking-[0.18em]">
            {MARQUEE}
          </span>
          <span className="shrink-0 whitespace-nowrap px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666766] sm:text-xs sm:tracking-[0.18em]">
            {MARQUEE}
          </span>
        </div>
      </div>

      {/* Story */}
      <section
        className="relative overflow-hidden border-b border-black/[0.08] bg-[#faf8f5]"
        aria-labelledby="ww-story-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none px-6"
          aria-hidden
        >
          <p className="max-w-[18ch] text-center text-[clamp(2.5rem,9vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-[#e76fab]/[0.07]">
            November 13–14, 2026
          </p>
        </div>
        <div className={`relative ${shell} py-16 sm:py-20 lg:py-24`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-20">
            <motion.div {...fadeUp} className="lg:col-span-5 xl:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b8457e] sm:text-[11px]">
                Why this day matters
              </p>
              <h2
                id="ww-story-heading"
                className="mt-5 text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#141413] sm:text-4xl lg:text-[2.75rem] xl:text-[3rem]"
              >
                Connection, support, and hope — in one room
              </h2>
              <div
                className="mt-8 h-px w-20 bg-gradient-to-r from-[#e76fab] to-transparent"
                aria-hidden
              />
              <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-[#666766]">
                By a widow, for widows
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="lg:col-span-7 xl:col-span-8"
            >
              <div className="space-y-6 border-t border-black/[0.08] pt-8 lg:border-t-0 lg:pt-0">
                <p className={`${body} text-[#2a2928]`}>
                  The Widow Wellness &amp; Connection Experience is a one-day
                  gathering created specifically for widows seeking connection,
                  support, wellness, and hope after loss.
                </p>
                <p className={`${body} text-[#444443]`}>
                  Hosted by It&apos;s Lifey, this unique event brings together
                  women from across New England for a meaningful day of
                  inspiration, education, healing, and community. Through powerful
                  keynote speakers, interactive breakout sessions, wellness
                  experiences, and opportunities for authentic connection,
                  you&apos;ll gain practical tools, valuable resources, and the
                  support of women who truly understand your journey.
                </p>
              </div>
              <blockquote className="mt-10 border-l-[3px] border-[#e76fab] bg-white/80 py-5 pl-6 pr-4 sm:py-6 sm:pl-8">
                <p className="text-pretty text-lg font-medium leading-[1.65] text-[#141413] sm:text-xl sm:leading-[1.6]">
                  Whether you&apos;re newly widowed or years into your journey,
                  this is a welcoming space to connect, learn, heal, and be
                  reminded that you do not have to navigate widowhood alone.
                </p>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience highlights */}
      <section
        className="relative overflow-hidden border-b border-[#e76fab]/20 bg-white"
        aria-labelledby="ww-experience-heading"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#e76fab] to-transparent"
          aria-hidden
        />
        <div className={`${shell} py-16 sm:py-20 lg:py-24`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <motion.div {...fadeUp} className="lg:col-span-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e76fab] sm:text-[11px]">
                What the day includes
              </p>
              <h2
                id="ww-experience-heading"
                className="mt-5 text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#141413] sm:text-4xl lg:text-[2.65rem]"
              >
                More than a conference — a day to exhale
              </h2>
              <p className={`mt-6 ${body} text-[#444443]`}>
                The experience begins the evening before with an optional VIP
                Mocktail Hour featuring Kelley Lynn. The following day includes
                breakfast, keynote presentations, wellness and educational
                breakout sessions, networking, lunch, and meaningful
                conversations designed to help widows navigate life after loss
                with greater confidence and support.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="lg:col-span-7"
            >
              <ul className="divide-y divide-[#ebe6df] border-y border-[#ebe6df]">
                {DAY_INCLUDES.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-start gap-5 py-5 sm:gap-6 sm:py-6"
                  >
                    <span
                      className="mt-0.5 w-10 shrink-0 text-[11px] font-semibold tabular-nums tracking-[0.12em] text-[#e76fab] sm:w-12 sm:text-xs"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.05rem] font-medium leading-snug tracking-[-0.01em] text-[#141413] transition-colors duration-200 group-hover:text-[#b8457e] sm:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kelley Lynn */}
      <section className="border-b border-black/10 bg-[#faf8f5]" aria-labelledby="ww-vip-heading">
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <motion.div {...fadeUp} className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#666766]">
                VIP evening · November 13
              </p>
              <h2
                id="ww-vip-heading"
                className="mt-4 text-3xl font-semibold leading-[1.1] text-[#141413] sm:text-4xl"
              >
                Mocktail Hour with Kelley Lynn
              </h2>
              <p className={`mt-6 ${body}`}>
                VIP guests gather the evening before for an intimate mocktail
                hour featuring widow, comedian, TEDx speaker, author, and grief
                advocate Kelley Lynn. Expect laughter, honesty, connection, and
                hope — a powerful night before the main event.
              </p>
              <p className={`mt-5 ${body}`}>
                Kelley became a leading voice in grief support. Her TEDx talk,
                &ldquo;When Someone You Love Dies, There is No Such Thing as
                Moving On,&rdquo; has reached millions. Her book,{" "}
                <em>My Husband Is Not a Rainbow</em>, shares an honest and often
                humorous perspective on grief, love, and rebuilding life after
                loss.
              </p>
              <p className="mt-6 text-sm font-semibold text-[#b8457e]">
                Included with the $169 VIP ticket
              </p>
          </motion.div>
        </div>
      </section>

      {/* Sample event flow */}
      <section
        className="relative border-b border-[#d85e9a]/40 bg-[#2a2928] text-white"
        aria-labelledby="ww-flow-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(231,111,171,0.18),transparent_65%)]"
          aria-hidden
        />
        <div className={`relative ${shell} py-16 sm:py-20 lg:py-24`}>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f5b8dc] sm:text-[11px]">
              Your day, step by step
            </p>
            <h2
              id="ww-flow-heading"
              className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem]"
            >
              Event Flow
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/78">
              November 13–14 at Presence &amp; Co. — an optional VIP evening,
              a full day of connection and wellness, and a closing that belongs
              to the women in the room.
            </p>
          </motion.div>

          <div className="relative mx-auto mt-14 max-w-4xl lg:mt-16">
            <div
              className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-gradient-to-b from-[#e76fab] via-[#e76fab]/50 to-[#e76fab]/20 sm:left-6"
              aria-hidden
            />
            <ol className="space-y-6 sm:space-y-8">
              {EVENT_FLOW.map((block) => (
                <motion.li
                  key={block.step}
                  {...fadeUp}
                  className="relative pl-12 sm:pl-14"
                >
                  <span
                    className={`absolute left-0 top-6 flex h-11 w-11 items-center justify-center rounded-full text-[11px] font-bold tracking-wide ring-4 ring-[#2a2928] sm:h-12 sm:w-12 sm:text-xs ${
                      block.variant === "vip"
                        ? "bg-[#e76fab] text-white"
                        : block.variant === "closing"
                          ? "bg-white text-[#b8457e]"
                          : block.variant === "breakouts"
                            ? "bg-[#c94d8a] text-white"
                            : "bg-[#f5b8dc] text-[#7a2f55]"
                    }`}
                  >
                    {block.step}
                  </span>
                  <article
                    className={`overflow-hidden rounded-[1.5rem] border shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:rounded-[1.75rem] ${
                      block.variant === "closing"
                        ? "border-[#e76fab]/40 bg-gradient-to-br from-[#3d2a35] to-[#2a2928]"
                        : block.variant === "vip"
                          ? "border-[#e76fab]/35 bg-gradient-to-br from-[#fdf8fb] to-white text-[#141413]"
                          : "border-white/10 bg-white text-[#141413]"
                    }`}
                  >
                    <div className="border-b border-black/[0.06] px-5 py-4 sm:px-7 sm:py-5">
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-[11px] ${
                          block.variant === "closing"
                            ? "text-[#f5b8dc]"
                            : "text-[#b8457e]"
                        }`}
                      >
                        {block.when}
                      </p>
                      <h3
                        className={`mt-2 text-pretty text-xl font-semibold leading-snug sm:text-[1.35rem] ${
                          block.variant === "closing" ? "text-white" : ""
                        }`}
                      >
                        {block.title}
                      </h3>
                    </div>
                    <div className="px-5 py-5 sm:px-7 sm:py-6">
                      {"intro" in block && block.intro ? (
                        <p className="mb-4 text-[15px] leading-relaxed text-[#666766]">
                          {block.intro}
                        </p>
                      ) : null}
                      {"items" in block && block.items ? (
                        <ul className="space-y-2.5">
                          {block.items.map((item) =>
                            typeof item === "string" ? (
                              <li
                                key={item}
                                className="flex gap-3 text-[15px] leading-relaxed text-[#2a2928]"
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e76fab]"
                                  aria-hidden
                                />
                                {item}
                              </li>
                            ) : (
                              <li
                                key={item.title}
                                className="flex gap-3 text-[15px] leading-relaxed text-[#2a2928]"
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e76fab]"
                                  aria-hidden
                                />
                                <span>
                                  <span className="font-medium leading-snug">
                                    {item.title}
                                  </span>
                                  <span className="mt-0.5 block text-[14px] text-[#666766]">
                                    {item.leader}
                                  </span>
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      ) : null}
                      {"prose" in block && block.prose ? (
                        <div className="space-y-4">
                          {block.prose.map((paragraph) => (
                            <p
                              key={paragraph.slice(0, 40)}
                              className="text-[15px] leading-[1.75] text-white/88 sm:text-base"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center sm:mt-14">
            <button
              type="button"
              onClick={scrollToRegister}
              className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-9 py-4 text-base font-semibold text-white shadow-lg shadow-black/25 transition-[background-color,transform] duration-200 hover:bg-[#d85e9a] active:scale-[0.99]"
            >
              Reserve your spot
            </button>
          </motion.div>
        </div>
      </section>

      {/* Breakout session leaders */}
      <section
        className="relative overflow-hidden border-b border-black/[0.08] bg-white"
        aria-labelledby="ww-leaders-heading"
      >
        <div className={`${shell} py-16 sm:py-20 lg:py-24`}>
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2
              id="ww-leaders-heading"
              className="text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#141413] sm:text-4xl lg:text-[2.65rem]"
            >
              Introducing the Breakout Session Leaders
            </h2>
            <div
              className="mt-8 h-px w-20 bg-gradient-to-r from-[#e76fab] to-transparent"
              aria-hidden
            />
          </motion.div>

          <ul className="mt-12 divide-y divide-[#ebe6df] border-y border-[#ebe6df] sm:mt-14">
            {BREAKOUT_LEADERS.map((leader) => (
              <BreakoutLeaderRow
                key={leader.name}
                leader={leader}
                photo={availableLeaderPhotos[leader.name]}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Registration */}
      <section
        id="ww-register"
        className="border-b border-black/10 bg-[#faf8f5]"
        aria-labelledby="ww-register-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_min(26rem,100%)] lg:items-start lg:gap-14 xl:gap-16">
            <motion.div {...fadeUp} className="space-y-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
                  Join us
                </p>
                <h2
                  id="ww-register-heading"
                  className="mt-3 text-3xl font-semibold text-[#141413] sm:text-4xl"
                >
                  Reserve your spot
                </h2>
                <p className={`mt-5 ${body}`}>
                  We&apos;d love to have you in the room. Choose your ticket,
                  share a few details, and you&apos;ll be taken to secure Stripe
                  checkout to complete payment. We&apos;ll also email you the
                  link — your spot isn&apos;t confirmed until payment is
                  received.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e76fab]/20 bg-white p-6 shadow-sm sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  {EVENT_DATES}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#141413]">
                  {EVENT_LOCATION}
                </p>
                <p className={`mt-4 ${body}`}>
                  Whether you&apos;re joining for the full day or adding the VIP
                  evening with Kelley Lynn, you&apos;ll step into a space built
                  for widows — real talk, real connection, and real hope.
                </p>
              </div>

              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  Where to stay
                </p>
                <p className="mt-2 text-lg font-semibold text-[#141413]">
                  Hotel block at {HOTEL_NAME}
                </p>
                <p className={`mt-4 ${body}`}>
                  We&apos;ve reserved a nearby hotel block at {HOTEL_NAME} for
                  guests traveling in for the weekend. Book through our group
                  link to reserve your room.
                </p>
                <a
                  href={HOTEL_BLOCK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#e76fab] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
                >
                  Book {HOTEL_NAME}
                </a>
              </div>

              <div className="space-y-5 border-t border-black/[0.08] pt-8">
                <div>
                  <p className="font-semibold text-[#141413]">VIP — $169</p>
                  <p className={`mt-2 ${body} text-[#666766]`}>
                    Mocktail hour with Kelley Lynn on November 13, plus the full
                    main event on November 14.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#141413]">
                    General Admission — $129
                  </p>
                  <p className={`mt-2 ${body} text-[#666766]`}>
                    The full main event — welcome, keynotes, breakouts, lunch,
                    and The Hope Mic Story Slam.
                  </p>
                </div>
              </div>

              <div className={`space-y-4 ${body}`}>
                <p>
                  Newly widowed or years into your journey — you belong here.
                  Come as you are. Leave with practical tools, trusted resources,
                  and the quiet relief of women who understand without you
                  having to explain.
                </p>
                <p>
                  Questions before you register? Reach out at{" "}
                  <a
                    href="mailto:jennifer@itslifey.com"
                    className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2"
                  >
                    jennifer@itslifey.com
                  </a>
                  . We read every message with care.
                </p>
              </div>

              <p className="text-sm font-medium italic text-[#9a3d6c]">
                {EVENT_SHORT_TAGLINE}
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="rounded-[1.75rem] border border-black/[0.08] bg-white p-6 shadow-lg shadow-black/[0.06] sm:p-8"
            >
              <WidowWellnessRegistrationForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsorship CTA */}
      <section
        className="bg-[#e76fab]"
        aria-labelledby="ww-sponsor-cta-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-[2rem] border border-white/25 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)] p-8 sm:p-10 lg:p-12"
          >
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b8457e]">
                For businesses &amp; professionals
              </p>
              <h2
                id="ww-sponsor-cta-heading"
                className="mt-3 text-3xl font-semibold text-[#141413] sm:text-4xl"
              >
                Interested in sponsoring this event?
              </h2>
              <p className={`mt-5 ${body}`}>
                Help widows feel less alone while connecting your brand with
                women actively seeking trusted support, resources, and community.
                Sponsorship levels start at $250 — with meaningful visibility
                across the event, marketing channels, and attendee experience.
              </p>
              <Link
                href={SPONSORSHIP_PATH}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
              >
                View sponsorship opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsors */}
      <section
        className="border-b border-black/[0.08] bg-[#faf8f5]"
        aria-labelledby="ww-sponsors-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p
              id="ww-sponsors-heading"
              className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b8457e] sm:text-[11px]"
            >
              Sponsored by
            </p>
            <div
              className="mx-auto mt-5 h-px w-12 bg-[#e76fab]/55"
              aria-hidden
            />
          </motion.div>

          <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
            {presentingSponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                {...fadeUp}
                className="flex flex-col items-center text-center"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7a6a72]">
                  {sponsor.tier}
                </p>
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 block w-full max-w-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e76fab]"
                  aria-label={`${sponsor.name} — ${sponsor.tier} (opens in a new tab)`}
                >
                  <span className="relative mx-auto block h-24 w-full transition-opacity duration-300 group-hover:opacity-80 sm:h-28 md:h-32">
                    <Image
                      src={sponsor.logo}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 576px"
                    />
                  </span>
                </a>
              </motion.div>
            ))}

            {supportingSponsors.length > 0 ? (
              <>
                <div
                  className="mx-auto my-10 h-px w-full max-w-md bg-black/[0.08] sm:my-12"
                  aria-hidden
                />
                <div className="grid items-start gap-10 sm:grid-cols-2 sm:gap-0">
                  {supportingSponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.name}
                      {...fadeUp}
                      className={`flex flex-col items-center text-center sm:px-8 lg:px-12 ${
                        index > 0
                          ? "border-t border-black/[0.08] pt-10 sm:border-l sm:border-t-0 sm:pt-0"
                          : ""
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7a6a72]">
                        {sponsor.tier}
                      </p>
                      <a
                        href={sponsor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 block w-full max-w-[15rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e76fab] sm:max-w-[17rem]"
                        aria-label={`${sponsor.name} — ${sponsor.tier} (opens in a new tab)`}
                      >
                        <span className="relative mx-auto block h-20 w-full transition-opacity duration-300 group-hover:opacity-80 sm:h-24">
                          <Image
                            src={sponsor.logo}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 60vw, 272px"
                          />
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-12 flex flex-col items-center gap-5 text-center sm:mt-14"
          >
            <p className="text-sm text-[#666766]">
              Limited sponsorships available
            </p>
            <Link
              href={SPONSORSHIP_PATH}
              className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Interested in sponsoring?
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
