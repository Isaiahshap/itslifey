import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import {
  HOPEHUB_MEMBER_LOGIN_URL,
  HOPEHUB_SIGNUP_URL,
} from "@/lib/hopehub";

export const metadata: Metadata = {
  title: "HopeHub — Free online community for widows",
  description:
    "HopeHub is a free online community for widows—connection, support groups, expert sessions, and resources. Built by a widow who understands.",
};

/**
 * Slightly wider than `max-w-7xl` on 2xl viewports so the page breathes on
 * large monitors; padding scales up with it. Navbar stays 7xl — this is
 * intentional editorial spread for long-form HopeHub content only.
 */
const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

/** Matches homepage HopeHub section: local preview + YouTube walkthrough */
const HOPEHUB_PREVIEW_VIDEO_SRC = "/images/hopehub.mp4";

const HOPEHUB_WALKTHROUGH_EMBED_SRC =
  "https://www.youtube-nocookie.com/embed/k4mm-kM_4Gk?rel=0";

const forYouIf = [
  "You’ve lost your spouse or partner and feel like no one truly understands what you’re going through.",
  "You miss having someone who gets it without long explanations.",
  "You want real conversation—not platitudes or advice that doesn’t fit your reality.",
  "You’re navigating big decisions and wish you had people to talk them through with.",
  "You want connection, community, and friendships with women who understand this road.",
  "Some days you feel strong, and other days everything feels heavy—and you want a soft place to land.",
] as const;

const faqs = [
  {
    q: "Who can join HopeHub?",
    a: "HopeHub is for widows—women who have lost a spouse or life partner. Whether your loss was recent or years ago, whether you’re 25 or 75, you’re welcome. Every widow’s story is different, and that’s honored here.",
  },
  {
    q: "How is HopeHub different from other groups?",
    a: "Big social feeds can feel loud and unsafe. Local meetups can be hard to find. HopeHub is one private home for real conversation, expert guidance, structured groups, and paths to in-person connection—available whenever you need it.",
  },
  {
    q: "Do I need to share my story or participate a lot?",
    a: "No. Many members start by reading and listening. Join in when and how you want. There’s no pressure to share before you’re ready. Sometimes simply being near others who understand is healing.",
  },
  {
    q: "Are support groups facilitated by professionals?",
    a: "Groups are led by widows who understand because they’ve lived it—loneliness, grief’s ups and downs, skills, solo parenting, dating, and more. Open meetings let you ask questions and share where you are that day. Professional support is there when you need it.",
  },
  {
    q: "Is my information private and secure?",
    a: "Yes. Your privacy matters. Information isn’t sold to third parties, and confidentiality is taken seriously. What you share in HopeHub is meant to stay in this community.",
  },
  {
    q: "Is HopeHub really free?",
    a: "Yes. HopeHub is completely free—full access to the community, groups, expert sessions, resources, and events. No paid tier, no surprise fees.",
  },
  {
    q: "Are there in-person events?",
    a: "Yes. There are Widow Wellness Retreats and other meetups through the year. Details and registration are shared inside HopeHub.",
  },
  {
    q: "How do I get started?",
    a: "Create your free account—it takes a few minutes. Set up your profile, say hello if you’d like, and explore at your own pace.",
  },
] as const;

function joinButtonClass() {
  return "inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]";
}

function secondaryButtonClass() {
  return "inline-flex items-center justify-center rounded-full border-2 border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black transition-colors duration-200 hover:border-[#e76fab] hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]";
}

const bodyLede =
  "text-[1.0625rem] leading-[1.82] text-[#2a2928] sm:text-lg sm:leading-[1.78]";

export default function HopeHubPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section
        className="relative min-h-[min(56vh,600px)] overflow-hidden"
        aria-labelledby="hopehub-hero-heading"
      >
        <Image
          src="/images/Retreats/fall%202025/IMG_230434_0.webp"
          alt="Widows together during the fall retreat weekend at Lake Winnipesaukee"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35"
          aria-hidden
        />
        <div
          className={`relative flex min-h-[min(56vh,600px)] flex-col justify-end pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 ${shell}`}
        >
          <div className="max-w-3xl border-l-2 border-[#e76fab] pl-5 sm:pl-6 lg:max-w-[42rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/88 sm:text-[11px]">
              HopeHub by It&apos;s Lifey
            </p>
            <h1
              id="hopehub-hero-heading"
              className="mt-4 max-w-4xl text-pretty text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.35)] sm:text-4xl sm:leading-[1.08] lg:max-w-5xl lg:text-[2.85rem] lg:leading-[1.04] xl:text-[3.15rem]"
            >
              If you are a widow tired of doing this alone, welcome. You&apos;re
              exactly where you need to be.
            </h1>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a href={HOPEHUB_SIGNUP_URL} className={joinButtonClass()}>
              Join the community (free)
            </a>
            <a
              href={HOPEHUB_MEMBER_LOGIN_URL}
              className={secondaryButtonClass()}
              rel="noopener noreferrer"
            >
              Current members — log in
            </a>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-b border-[#d85e9a] bg-[#e76fab]"
        aria-labelledby="hopehub-connection-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_20%_30%,rgba(255,255,255,0.14),transparent_55%)]"
          aria-hidden
        />
        <div className={`${shell} relative py-14 sm:py-16 lg:py-20`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="max-w-[42rem] border-l-2 border-white/35 pl-6 sm:pl-7 lg:col-span-7 xl:col-span-6">
              <h2
                id="hopehub-connection-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-xs"
              >
                Why HopeHub exists
              </h2>
              <p className="mt-5 text-pretty text-2xl font-semibold leading-[1.25] tracking-[-0.02em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.08)] sm:text-[1.65rem] sm:leading-[1.22] lg:text-[1.85rem]">
                No one was meant to carry grief alone.
              </p>
              <p
                className={`mt-6 text-pretty text-lg leading-[1.78] text-white/92 sm:text-[1.125rem] sm:leading-[1.76] lg:text-xl lg:leading-[1.72]`}
              >
                HopeHub is a free, private online community for widows—created by
                someone who has lived this loss. Inside, you&apos;ll find women
                who understand without a long backstory: real conversation, steady
                encouragement, and space to feel what you feel. When the practical
                side of life gets heavy, therapists, advisors, and other
                professionals show up here too. Whether your loss was recent or
                years ago, you belong.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-sm lg:col-span-5 xl:col-span-6 lg:mx-0 lg:max-w-none lg:justify-self-end">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_28px_64px_-24px_rgba(0,0,0,0.35)] ring-2 ring-white/30 sm:rounded-[1.35rem] lg:aspect-auto lg:h-[min(72vh,640px)]">
                <Image
                  src="/images/33958e9aeb59efedea29fdaba7824398.jpeg"
                  alt="Group of women together outdoors in autumn, supporting one another"
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="(max-width: 1023px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[#e3ddd4] bg-[#fffcfa] py-14 sm:py-16 lg:py-20"
        aria-label="Community at a glance"
      >
        <div className={shell}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#666766]">
            At a glance
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 sm:gap-x-4 lg:mt-10 lg:gap-x-8 xl:gap-x-12">
            {[
              { stat: "Hundreds", label: "of members" },
              { stat: "Daily", label: "new connections" },
              { stat: "Monthly", label: "widow meetups" },
              { stat: "24/7", label: "community access" },
            ].map(({ stat, label }, i) => (
              <div
                key={label}
                className={`text-left ${i > 0 ? "sm:border-l sm:border-[#e76fab]/20 sm:pl-6 lg:pl-10" : ""}`}
              >
                <p className="text-3xl font-semibold tracking-[-0.03em] text-[#c94d8a] sm:text-4xl lg:text-[2.65rem] lg:leading-none">
                  {stat}
                </p>
                <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#666766] sm:text-[13px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-[#e3ddd4] bg-[#faf7f3] py-16 sm:py-20 lg:py-28"
        aria-labelledby="hopehub-for-you-heading"
      >
        <div className={shell}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
            <div className="lg:col-span-4 xl:col-span-3">
              <HeartHandshake
                className="h-9 w-9 text-[#e76fab]"
                strokeWidth={1.5}
                aria-hidden
              />
              <h2
                id="hopehub-for-you-heading"
                className="mt-6 text-pretty text-2xl font-semibold tracking-[-0.02em] text-black sm:text-3xl lg:text-[2rem] lg:leading-tight"
              >
                HopeHub is for you if…
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#666766]">
                No checklist to pass—only an invitation to come as you are.
              </p>
            </div>
            <ul
              className={`mt-12 space-y-5 text-pretty lg:col-span-8 lg:mt-0 xl:col-span-9 ${bodyLede}`}
            >
              {forYouIf.map((line) => (
                <li key={line} className="flex gap-4">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e76fab]"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="border-t border-[#2a2928]/10 bg-[#252423] py-16 text-white sm:py-20 lg:py-28"
        aria-labelledby="hopehub-videos-heading"
      >
        <div className={shell}>
          <div className="max-w-3xl lg:max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
              Watch &amp; wander
            </p>
            <h2
              id="hopehub-videos-heading"
              className="mt-3 text-pretty text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.125rem]"
            >
              See HopeHub for yourself
            </h2>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
              A short introduction and a full walkthrough—so you can sense the
              tone of the community before you step in.
            </p>
          </div>
          <div className="mt-12 grid gap-12 lg:mt-14 xl:grid-cols-2 xl:gap-12">
            <figure className="m-0">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                HopeHub preview
              </p>
              <div className="overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] ring-1 ring-[#e3ddd4]">
                <video
                  className="aspect-video w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Short video introducing HopeHub, the free online community for widows"
                >
                  <source src={HOPEHUB_PREVIEW_VIDEO_SRC} type="video/mp4" />
                </video>
              </div>
            </figure>
            <figure className="m-0">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                Full walkthrough
              </p>
              <div className="overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] ring-1 ring-[#e3ddd4]">
                <div className="relative aspect-video w-full">
                  <iframe
                    className="absolute inset-0 h-full w-full border-0"
                    src={HOPEHUB_WALKTHROUGH_EMBED_SRC}
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
        </div>
      </section>

      <section
        className="border-t border-[#e3ddd4] bg-[#fffcfa] py-16 sm:py-20 lg:py-28"
        aria-labelledby="hopehub-join-heading"
      >
        <div className={shell}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10 xl:gap-x-16">
            <div className="lg:col-span-5">
              <div className="h-px w-10 bg-[#e76fab]/75" aria-hidden />
              <h2
                id="hopehub-join-heading"
                className="mt-8 text-pretty text-2xl font-semibold leading-tight tracking-[-0.02em] text-black sm:text-3xl lg:text-[2.125rem]"
              >
                Join the HopeHub community
              </h2>
              <p className={`mt-6 ${bodyLede}`}>
                Widowhood can feel incredibly isolating. Inside HopeHub, women
                who truly understand are waiting to meet you—and connection
                becomes an antidote to loneliness.
              </p>
              <p className={`mt-5 ${bodyLede}`}>
                Hundreds of women across the country are already finding their
                people here. Explore quietly or dive in; there&apos;s room for
                you.
              </p>
              <p className="mt-8 text-sm leading-relaxed text-[#666766]">
                Your privacy and trust matter. HopeHub is a confidential space
                where widows can share openly, knowing care has been taken to
                protect the community.
              </p>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <div className="overflow-hidden rounded-2xl border border-[#e3ddd4] bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.12)]">
                <div className="h-1.5 bg-gradient-to-r from-[#e76fab] via-[#c94d8a] to-[#e76fab]" />
                <div className="p-8 sm:p-10 lg:p-12">
                  <h3 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
                    Everything included — free
                  </h3>
                  <p className={`mt-4 ${bodyLede}`}>
                    HopeHub is completely free: community access, meetups,
                    expert sessions, resources, and events. No paid tier—just show
                    up as you are.
                  </p>
                  <ul className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-[#2a2928]">
                    {[
                      "Introduce yourself and meet other widows (including by location)",
                      "Community discussion feed and ongoing conversation",
                      "Regular virtual new-member meetups",
                      "In-person coffee meetups where available (starting in MetroWest, MA)",
                      "Newsletter with conversations, resources, and what's happening in HopeHub",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-[#e76fab]" aria-hidden>
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={HOPEHUB_SIGNUP_URL} className={joinButtonClass()}>
                      Join free today
                    </a>
                    <Link href="/retreats" className={secondaryButtonClass()}>
                      Widow Wellness Retreats
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 lg:py-28"
        aria-labelledby="hopehub-faq-heading"
      >
        <div className={shell}>
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]">
                Questions
              </p>
              <h2
                id="hopehub-faq-heading"
                className="mt-3 text-pretty text-2xl font-semibold tracking-[-0.02em] text-black sm:text-3xl"
              >
                Frequently asked questions
              </h2>
            </div>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[#666766] lg:mt-0 lg:text-right">
              Straight answers—nothing hidden behind fine print.
            </p>
          </div>
          <div className="mt-12 space-y-3 lg:mt-14">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group border-b border-[#e3ddd4] bg-transparent py-1"
              >
                <summary className="cursor-pointer list-none py-4 text-left text-lg font-semibold text-black [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-6">
                    <span className="min-w-0 flex-1">{q}</span>
                    <span className="mt-0.5 shrink-0 text-xl font-light text-[#e76fab] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p
                  className={`border-t border-[#f0ebe4] pb-6 pt-4 ${bodyLede}`}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-12 lg:mt-14">
            <a href={HOPEHUB_SIGNUP_URL} className={joinButtonClass()}>
              Create your free account
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
