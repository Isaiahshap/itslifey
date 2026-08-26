"use client";

import { WidowWellnessPixelEvents } from "@/components/WidowWellnessPixelEvents";
import { WidowWellnessSponsorshipForm } from "@/components/WidowWellnessSponsorshipForm";
import {
  EVENT_DATES,
  EVENT_LOCATION,
  EVENT_NAME,
  EVENT_PATH,
  EVENT_SHORT_TAGLINE,
  HOTEL_BLOCK_URL,
  HOTEL_NAME,
  SPONSORSHIP_PDF,
} from "@/lib/widow-wellness-event";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const HERO_IMAGE = "/images/Retreats/fall 2025/IMG_0978.webp";

const OVERVIEW_IMAGE = "/images/Retreats/Summer2025/IMG_1832.webp";
const IMPACT_IMAGE = "/images/Retreats/fall 2025/IMG_0966.webp";

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

const mainTiers = [
  {
    name: "Presenting Sponsor",
    price: "$7,500",
    availability: "Only 1 available",
    highlight: true,
    blurb:
      "For a leading brand that wants to stand at the heart of the Widow Wellness Experience.",
    includes: [
      '"Presented by" recognition on event materials',
      "You or a brand representative on stage (5–7 minutes)",
      "Present at a breakout session",
      "Premium sponsor table",
      "Top-tier logo placement across signage, webpage, emails, and printed materials",
      "Featured email spotlight (700 recipients)",
      "2–3 social media spotlights",
      "Branded gift or insert in attendee bags",
      "3 complimentary event tickets",
      "Included in paid social ads promoting the event if confirmed by July 31",
    ],
  },
  {
    name: "Connection Sponsor",
    price: "$2,500",
    availability: "4 slots left",
    blurb:
      "For brands that want meaningful visibility and direct connection with attendees.",
    includes: [
      "All Community Supporter benefits, plus:",
      "Sponsor table placement",
      "Featured social media spotlight",
      "Logo on event webpage & all event materials",
      "Branded gift or insert in attendee bags",
      "1 complimentary event ticket",
    ],
  },
  {
    name: "The Hope Mic Story Share Sponsor",
    price: "$1,500",
    availability: "Only 1 available",
    subtitle: "Closing event · Stories of experience, strength & hope",
    includes: [
      "Exclusive recognition as The Hope Mic Story Share Sponsor",
      "Special signage at the closing event",
      "Logo on event materials & event webpage",
      "5-minute welcome remarks before the Story Share",
      "2 complimentary event tickets",
      "Social media spotlight",
      "Branded gift or insert in attendee bags",
    ],
  },
  {
    name: "VIP Mocktail Hour Sponsor",
    price: "$1,500",
    availability: "Only 1 available",
    subtitle: "Featuring Kelley Lynn · Evening before the main event",
    includes: [
      "Exclusive recognition as VIP Mocktail Hour Sponsor",
      "Signage at the VIP evening event",
      "Logo on all event materials & event webpage",
      "5-minute welcome remarks",
      "Sponsor table at VIP event",
      "4 VIP tickets",
      "Social media spotlight",
      "Recognition during the main event the following day",
      "Branded gift or insert in attendee bags",
    ],
  },
] as const;

const additionalTiers = [
  {
    name: "Community Supporter",
    price: "$1,000",
    availability: "4 slots left",
    blurb:
      "For businesses that want to support widows and be part of the It's Lifey mission.",
    includes: [
      "Logo on event webpage",
      "Logo included in all event materials",
      "Branded gift or insert in attendee bags",
      "Social shout-out",
      "1 complimentary event ticket",
    ],
  },
  {
    name: "Healing Sponsor",
    price: "$3,500",
    availability: "4 slots left",
    blurb:
      "For sponsors who want a stronger presence and deeper alignment with the event experience.",
    includes: [
      "All Community and Connection Sponsor benefits, plus:",
      "Premium sponsor table placement",
      "Premium logo placement",
      "Recognition from stage",
      "Featured email spotlight (700 recipients)",
      "2 complimentary event tickets",
    ],
  },
  {
    name: "Lunch Sponsor",
    price: "$1,000",
    availability: "Only 1 available",
    note: "Catering by Liora's Catering",
    includes: [
      "Logo on event webpage",
      "Logo included in event materials",
      "Branded gift or insert in attendee bags",
      "Social media thank-you mention",
      "1 complimentary event ticket",
      "Inclusion in gift bag",
    ],
  },
  {
    name: "Coffee & Connection Sponsor",
    price: "$550",
    availability: "Only 1 available",
    includes: [
      "Recognition as Coffee & Connection Sponsor",
      "Signage at coffee station",
      "Social media thank-you mention",
      "Logo on event materials",
      "Inclusion in gift bag",
    ],
  },
  {
    name: "Widow Scholarship Sponsor",
    price: "$250+",
    availability: "Help remove barriers",
    note: "Sponsor one or multiple widows — contact Jennifer to arrange.",
    includes: [
      "Recognition as Scholarship Sponsor",
      "Option to sponsor one or multiple widows",
      "Social media thank-you mention",
    ],
  },
] as const;

const idealSponsors = [
  "Therapists & grief counselors",
  "Financial advisors & life insurance",
  "Estate attorneys",
  "Wellness professionals — Reiki, yoga, meditation",
  "Mediums, tarot readers & intuitive healers",
  "Coaches & authors",
  "Self-care, beauty & wellness brands",
  "Retreat centers & healing spaces",
  "Funeral, legacy & end-of-life planning",
  "Home organizers, real estate & practical life support",
] as const;

const whySponsor = [
  {
    title: "Targeted exposure",
    text: "Direct access to widows actively seeking trusted products, services, and support designed for this season of life.",
  },
  {
    title: "Brand alignment",
    text: "Align with a mission rooted in compassion, healing, connection, and community — during one of life's most vulnerable chapters.",
  },
  {
    title: "Marketing reach",
    text: "Visibility through event materials, email outreach, social media, website placement, and select paid ads for Healing & Presenting Sponsors confirmed by July 31.",
  },
  {
    title: "Thought leadership",
    text: "Position yourself as a trusted expert serving widows — share knowledge, build credibility, and deepen trust with an audience looking for guidance.",
  },
] as const;

function scrollToSponsorForm() {
  document.getElementById("ww-sponsor-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function SponsorshipClient() {
  return (
    <div className="min-w-0 overflow-x-clip bg-[#f6f3ee]">
      <WidowWellnessPixelEvents
        contentName={`${EVENT_NAME} — Sponsorship`}
        value={1000}
      />

      {/* Hero */}
      <section
        className="relative min-h-[min(72vh,640px)] overflow-hidden border-b border-[#e8d4df]/80 lg:min-h-[min(78vh,720px)]"
        aria-labelledby="sponsor-hero-heading"
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
            className="absolute inset-0 bg-gradient-to-r from-[#f6f3ee]/96 via-[#f6f3ee]/88 to-[#f6f3ee]/55 sm:via-[#f6f3ee]/82 sm:to-[#f6f3ee]/35"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#f6f3ee] via-transparent to-[#fdf8fb]/40"
            aria-hidden
          />
        </div>
        <div
          className={`relative flex min-h-[min(72vh,640px)] items-end py-14 sm:items-center sm:py-16 lg:min-h-[min(78vh,720px)] lg:py-20 ${shell}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-2xl rounded-[1.75rem] border border-white/70 bg-white/88 p-6 shadow-xl shadow-black/[0.08] backdrop-blur-md sm:max-w-3xl sm:p-8 lg:p-10"
          >
            <Link
              href={EVENT_PATH}
              className="text-sm font-semibold text-[#b8457e] underline decoration-[#e76fab]/40 underline-offset-4 transition-colors hover:text-[#e76fab]"
            >
              ← Back to the event
            </Link>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7a6a72] sm:text-[11px]">
              Sponsorship Opportunities 2026 · By It&apos;s Lifey
            </p>
            <h1
              id="sponsor-hero-heading"
              className="mt-4 text-pretty text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#141413] sm:text-4xl lg:text-[2.75rem]"
            >
              Sponsor a day of healing, hope, and connection for widows
            </h1>
            <p className="mt-2 text-lg text-[#666766] sm:text-xl">
              {EVENT_NAME}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="inline-flex rounded-full border border-[#e76fab]/35 bg-white px-4 py-2 text-sm font-semibold text-[#b8457e]">
                {EVENT_DATES}
              </span>
              <span className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#2a2928]">
                {EVENT_LOCATION}
              </span>
            </div>
            <p className="mt-6 text-base font-medium italic text-[#9a3d6c]">
              {EVENT_SHORT_TAGLINE}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={scrollToSponsorForm}
                className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#d85e9a]"
              >
                Become a sponsor
              </button>
              <a
                href={SPONSORSHIP_PDF}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#e76fab]/40 bg-white px-8 py-3.5 text-base font-semibold text-[#b8457e] transition-colors hover:border-[#e76fab] hover:bg-[#fdf8fb]"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download full sponsorship packet
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ideal sponsors */}
      <section className="border-b border-black/10 bg-white" aria-labelledby="sponsor-ideal-heading">
        <div className={`${shell} py-14 sm:py-16`}>
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
              Ideal sponsors
            </p>
            <h2
              id="sponsor-ideal-heading"
              className="mt-3 text-3xl font-semibold text-black sm:text-4xl"
            >
              Especially meaningful for professionals who support widows
            </h2>
          </motion.div>
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {idealSponsors.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 rounded-xl border border-black/[0.06] bg-[#faf8f5] px-4 py-3 text-[15px] text-[#2a2928]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e76fab]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative border-b border-black/10 overflow-hidden" aria-labelledby="sponsor-why-heading">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={IMPACT_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#2a2928]/90" />
        </div>
        <div className={`relative ${shell} py-14 sm:py-16 lg:py-20`}>
          <motion.div {...fadeUp} className="max-w-3xl text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5b8dc]">
              Why this event matters
            </p>
            <h2
              id="sponsor-why-heading"
              className="mt-3 text-3xl font-semibold sm:text-4xl"
            >
              When someone becomes a widow, everything changes
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/88">
              The emotional weight. The financial questions. The paperwork. The
              loneliness. The decisions. The identity shift. The ache of
              rebuilding a life you never asked for.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/72">
              Widows need safe spaces, trusted guidance, healing resources, and
              community — all in one room. Your sponsorship helps make that
              possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-black/10 bg-white" aria-labelledby="sponsor-overview-heading">
        <div className={`${shell} grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20`}>
          <motion.div {...fadeUp}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
              Event overview
            </p>
            <h2
              id="sponsor-overview-heading"
              className="mt-3 text-3xl font-semibold text-black sm:text-4xl"
            >
              Grief was never meant to be carried alone
            </h2>
            <div className={`mt-6 space-y-5 ${body}`}>
              <p>
                At It&apos;s Lifey, we believe grief was never meant to be
                carried alone. This experience is designed to help widows
                exhale — to step into a room where they do not have to explain
                their grief, meet other women who understand, and connect with
                trusted professionals who can help them navigate life after
                loss.
              </p>
              <p>
                The Widow Wellness Experience brings together keynote speakers,
                real conversations, and restorative wellness breakout sessions
                including yoga, Reiki, mediumship, financial wellness, dating
                and relationship advice, and guided healing. The day closes with
                The Hope Mic Story Share, where widows share 3-minute stories of
                experience, strength, and hope.
              </p>
              <p>
                The evening before, VIP guests gather for an intimate mocktail
                hour featuring widow, comedian, writer, and speaker Kelley Lynn
                — a powerful night of laughter, honesty, connection, and hope.
              </p>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl shadow-black/10 lg:aspect-[5/4]"
          >
            <Image
              src={OVERVIEW_IMAGE}
              alt="Women gathered for connection and conversation at an It's Lifey event"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div {...fadeUp} className="space-y-4 lg:col-span-2 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
            {[
              {
                label: "Main Event",
                title: "Widow Wellness Experience",
                when: "November 14",
              },
              {
                label: "VIP Event",
                title: "Mocktail Hour with Kelley Lynn",
                when: "November 13 — evening before",
              },
              {
                label: "Closing",
                title: "The Hope Mic Story Share",
                when: "End of main event",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/[0.08] bg-[#faf8f5] p-5 sm:p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#141413]">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-[#666766]">{item.when}</p>
              </div>
            ))}
            <p className="text-sm text-[#666766]">
              <strong className="font-semibold text-[#141413]">Audience:</strong>{" "}
              Widows seeking community, healing, trusted resources, and
              connection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why sponsor */}
      <section className="border-b border-black/10 bg-[#faf8f5]" aria-labelledby="sponsor-benefits-heading">
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
              Why sponsor
            </p>
            <h2
              id="sponsor-benefits-heading"
              className="mt-3 text-3xl font-semibold text-[#141413] sm:text-4xl"
            >
              More than visibility — real alignment
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {whySponsor.map((item) => (
              <motion.article
                key={item.title}
                {...fadeUp}
                className="rounded-2xl border border-black/[0.08] bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-[#141413]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#666766]">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Main tiers */}
      <section className="border-b border-[#d85e9a] bg-[#e76fab]" aria-labelledby="sponsor-levels-heading">
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <motion.div {...fadeUp} className="text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              Sponsorship levels
            </p>
            <h2
              id="sponsor-levels-heading"
              className="mt-3 text-3xl font-semibold sm:text-4xl"
            >
              Choose the level that fits your brand
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {mainTiers.map((tier) => (
              <motion.article
                key={tier.name}
                {...fadeUp}
                className={`overflow-hidden rounded-[1.75rem] border bg-white p-6 shadow-sm sm:p-8 ${
                  "highlight" in tier && tier.highlight
                    ? "border-[#e76fab] ring-2 ring-[#e76fab]/30"
                    : "border-black/[0.08]"
                }`}
              >
                {"highlight" in tier && tier.highlight ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                    Flagship opportunity
                  </p>
                ) : null}
                <h3 className="mt-1 text-2xl font-semibold text-[#141413]">
                  {tier.name}
                </h3>
                {"subtitle" in tier && tier.subtitle ? (
                  <p className="mt-1 text-sm font-medium text-[#9a3d6c]">
                    {tier.subtitle}
                  </p>
                ) : null}
                {"blurb" in tier && tier.blurb ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-[#666766]">
                    {tier.blurb}
                  </p>
                ) : null}
                <p className="mt-3 text-3xl font-semibold text-[#b8457e]">
                  {tier.price}
                </p>
                <p className="mt-1 text-sm font-medium text-[#666766]">
                  {tier.availability}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-[#2a2928]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e76fab]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty + hospitality */}
      <section className="border-b border-black/10 bg-[#faf8f5]" aria-labelledby="sponsor-specialty-heading">
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <motion.div {...fadeUp}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
              Additional levels
            </p>
            <h2
              id="sponsor-specialty-heading"
              className="mt-3 text-3xl font-semibold text-[#141413] sm:text-4xl"
            >
              Healing, community, hospitality, and scholarships
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {additionalTiers.map((tier) => (
              <motion.article
                key={tier.name}
                {...fadeUp}
                className="rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-7"
              >
                <h3 className="text-xl font-semibold text-[#141413]">
                  {tier.name}
                </h3>
                {"blurb" in tier && tier.blurb ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-[#666766]">
                    {tier.blurb}
                  </p>
                ) : null}
                <p className="mt-1 text-2xl font-semibold text-[#b8457e]">
                  {tier.price}
                </p>
                <p className="text-sm text-[#666766]">{tier.availability}</p>
                {"note" in tier && tier.note ? (
                  <p className="mt-2 text-sm italic text-[#666766]">{tier.note}</p>
                ) : null}
                <ul className="mt-5 space-y-2">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] leading-relaxed text-[#2a2928]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {tier.name === "Widow Scholarship Sponsor" ? (
                  <a
                    href="mailto:jennifer@itslifey.com?subject=Widow%20Scholarship%20Sponsor"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-[#e76fab] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d85e9a]"
                  >
                    Contact Jennifer to sponsor
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Event flow */}
      <section className="border-b border-black/10 bg-white" aria-labelledby="sponsor-flow-heading">
        <div className={`${shell} py-14 sm:py-16`}>
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
              Sample event flow
            </p>
            <h2
              id="sponsor-flow-heading"
              className="mt-3 text-3xl font-semibold text-black"
            >
              What sponsors are part of
            </h2>
          </motion.div>
          <div className="mt-10 space-y-4">
            {[
              {
                title: "VIP Evening · Mocktail Hour with Kelley Lynn",
                detail:
                  "Welcome and connection, mocktails and light bites, conversation with Kelley Lynn, and time for VIPs to connect.",
              },
              {
                title: "Morning welcome",
                detail:
                  "Arrival, coffee, and connection · Welcome from It's Lifey · Grounding moment / candle lighting · Opening keynote",
              },
              {
                title: "Mid-morning breakout sessions",
                detail:
                  "Yoga, meditation, Reiki, grief support conversations, financial wellness, dating & relationships, and other healing modalities.",
              },
              {
                title: "Lunch & connection",
                detail:
                  "Shared lunch, sponsor/resource table visits, and time for widows to connect in a relaxed, supportive setting.",
              },
              {
                title: "Afternoon program",
                detail:
                  "Afternoon keynote, additional wellness breakout sessions, and guided reflection or community conversation.",
              },
              {
                title: "Closing · The Hope Mic Story Share",
                detail:
                  "Stories of experience, strength & hope — widows share three minutes in a supportive, judgment-free space.",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-xl border border-black/[0.06] bg-[#faf8f5] px-5 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e76fab] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="text-[15px] font-semibold leading-snug text-[#141413]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#666766]">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn more + form */}
      <section
        id="ww-sponsor-form"
        className="border-b border-black/10 bg-[#faf8f5]"
        aria-labelledby="sponsor-form-heading"
      >
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(28rem,100%)] lg:items-start lg:gap-16">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e76fab]">
                Ready to stand beside widows?
              </p>
              <h2
                id="sponsor-form-heading"
                className="mt-3 text-3xl font-semibold text-[#141413] sm:text-4xl"
              >
                Become a sponsor
              </h2>
              <p className={`mt-5 ${body}`}>
                Your sponsorship is more than brand visibility. It is a way to
                help widows feel less alone, connect them with resources they
                may not know they need, and bring healing, guidance, and hope
                into a room full of women rebuilding their lives.
              </p>
              <p className={`mt-5 ${body}`}>
                Choose your level below — you&apos;ll be redirected to secure
                Stripe checkout. We&apos;ll email you the payment link as well.
                Your sponsorship isn&apos;t confirmed until payment is complete.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={EVENT_PATH}
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#e76fab]/40 bg-white px-6 py-3 text-sm font-semibold text-[#b8457e] transition-colors hover:border-[#e76fab]"
                >
                  Learn more about the event
                </Link>
                <a
                  href={SPONSORSHIP_PDF}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#2a2928] transition-colors hover:border-[#e76fab]/40"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download sponsorship packet (PDF)
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8457e]">
                  Where to stay
                </p>
                <p className="mt-2 text-lg font-semibold text-[#141413]">
                  Hotel block at {HOTEL_NAME}
                </p>
                <p className={`mt-4 ${body}`}>
                  Traveling in for the event? We&apos;ve reserved a nearby hotel
                  block at {HOTEL_NAME}. Book through our group link to reserve
                  your room.
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

              <p className="mt-8 text-sm text-[#666766]">
                Questions?{" "}
                <a
                  href="mailto:jennifer@itslifey.com"
                  className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2"
                >
                  jennifer@itslifey.com
                </a>{" "}
                · @itslifeyco
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="rounded-[1.75rem] border border-black/[0.08] bg-white p-6 shadow-lg shadow-black/[0.06] sm:p-8 lg:sticky lg:top-28"
            >
              <WidowWellnessSponsorshipForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#c94d8a] px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-2xl font-semibold leading-snug sm:text-3xl">
            At It&apos;s Lifey, we imagine a world where no widow grieves alone.
          </p>
          <p className="mt-4 text-lg text-white/90">{EVENT_SHORT_TAGLINE}</p>
          <Link
            href={EVENT_PATH}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#c94d8a] transition-colors hover:bg-neutral-100"
          >
            View the Widow Wellness Experience
          </Link>
        </div>
      </section>
    </div>
  );
}
