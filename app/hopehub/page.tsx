import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CalendarHeart,
  HeartHandshake,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Users,
} from "lucide-react";

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

const HOPEHUB_JOIN_URL =
  "https://login.circle.so/sign_up?request_host=hopehub.circle.so&user%5Binvitation_token%5D=947aa1f252e04c03277aa4ecc32ab3747f11b503-49bc1d95-158d-4c38-9554-fa6340a7d8cd#email";

const HOPEHUB_MEMBER_LOGIN_URL = "https://hopehub.circle.so";

const VIDEO_INTRO =
  "https://itslifey.com/wp-content/uploads/2026/02/AQPoYR04ZdxlPRzYl_JTjjRX-Vg6TuN2D6yL8ntO1SRRVy-uUIlek2ibpVU5iFIsGKVw8FxuwHfcGbap5bRMI1CKkwGVd9xI98lm3-UTFQ.mp4";

const VIDEO_DEMO =
  "https://itslifey.com/wp-content/uploads/2026/02/full-demo.mp4";

const insideItems = [
  {
    title: "1:1 conversations",
    body: "A private space to connect with widows who understand—ask questions, share what you’re going through, and know you’re not alone.",
    icon: MessageCircle,
  },
  {
    title: "Support groups",
    body: "Hosted multiple times a week—topic-driven (loneliness, the emotional rollercoaster, honoring your person, new skills, solo parenting) and open discussion.",
    icon: Users,
  },
  {
    title: "Expert Q&A",
    body: "Live sessions with therapists, financial advisors, attorneys, and healers. Ask in real time or catch the replay—recordings stay in the community.",
    icon: Mic2,
  },
  {
    title: "Resource library",
    body: "Vetted professionals, podcast ideas, grief gifts, and more—so you spend less time searching and more time being cared for.",
    icon: BookOpen,
  },
  {
    title: "Virtual events",
    body: "Healing sessions, workshops, and chances to be together online when in-person isn’t possible.",
    icon: MonitorPlay,
  },
  {
    title: "In-person retreats",
    body: "Pathways to Widow Wellness Retreats and other gatherings when you’re ready to meet face to face.",
    icon: CalendarHeart,
  },
] as const;

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
          src="/images/Hopehub/hopehubhero.jpg"
          alt="Group of women smiling together outdoors among green trees, representing HopeHub community"
          fill
          priority
          className="object-cover object-[center_40%]"
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
            <a href={HOPEHUB_JOIN_URL} className={joinButtonClass()}>
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

      {/* Editorial open: dark panel */}
      <section
        className="border-b border-white/10 bg-[#2e2e2c] py-16 text-white sm:py-20 lg:py-28"
        aria-labelledby="hopehub-connection-heading"
      >
        <div className={shell}>
          <h2 id="hopehub-connection-heading" className="sr-only">
            Why HopeHub exists
          </h2>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-5 xl:col-span-4">
              <div
                className="mb-8 h-px w-11 bg-[#e76fab] sm:mb-10"
                aria-hidden
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/55">
                Free · Online · By a widow
              </p>
              <p className="mt-8 text-pretty text-2xl font-semibold leading-[1.18] tracking-[-0.02em] text-white sm:text-3xl sm:leading-[1.14] lg:text-[2.125rem] lg:leading-[1.12]">
                Connection isn&apos;t just life-changing—it&apos;s lifesaving.
              </p>
            </div>
            <div
              className="mt-12 space-y-6 text-pretty text-[1.0625rem] leading-[1.82] text-white/85 sm:text-lg sm:leading-[1.78] lg:col-span-7 lg:mt-0 xl:col-span-8 lg:columns-2 lg:gap-x-12 lg:[column-fill:balance]"
            >
              <p className="break-inside-avoid">
                HopeHub is an online community for widows, by a widow, built on
                one belief: no woman should grieve alone.
              </p>
              <p className="break-inside-avoid">
                Inside, you&apos;ll find women who speak your language and never
                judge your feelings—along with access to trusted experts:
                therapists, financial advisors, attorneys, holistic healers, and
                fellow widows who can help with the emotional and logistical
                weight of widowhood.
              </p>
              <p className="break-inside-avoid">
                This space welcomes anyone who has lost a partner—married or not,
                from every background and identity.
              </p>
            </div>
          </div>
          <div className="mt-14 sm:mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-14">
            <figure className="border-l-2 border-[#e76fab] pl-6 sm:pl-8 lg:col-span-7">
              <blockquote className="m-0 text-lg font-medium leading-snug text-white sm:text-xl sm:leading-relaxed lg:text-[1.35rem] lg:leading-relaxed">
                <p className="m-0">
                  You may arrive feeling uncertain or alone.
                  <br />
                  You can leave knowing you&apos;ve found your people.
                </p>
              </blockquote>
            </figure>
            <p className="mt-8 text-pretty border border-white/15 bg-white/[0.08] px-6 py-5 text-[1.0625rem] font-medium leading-relaxed text-white/95 shadow-sm backdrop-blur-[2px] sm:px-7 sm:py-6 lg:col-span-5 lg:mt-0 lg:self-center lg:px-8 lg:py-8">
              No more navigating a world that doesn&apos;t understand you.
              Let&apos;s do this together.
            </p>
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
              { stat: "Weekly", label: "widow meetups" },
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
        className="py-16 sm:py-20 lg:py-28"
        aria-labelledby="hopehub-inside-heading"
      >
        <div className={shell}>
          <div className="flex flex-col gap-4 border-b border-[#e3ddd4] pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]">
                Inside the community
              </p>
              <h2
                id="hopehub-inside-heading"
                className="mt-3 max-w-xl text-pretty text-2xl font-semibold tracking-[-0.02em] text-black sm:text-3xl lg:text-[2.125rem] lg:leading-tight"
              >
                What you&apos;ll find inside
              </h2>
            </div>
            <p className="max-w-md text-[1.0625rem] leading-relaxed text-[#666766] lg:text-right lg:text-[15px]">
              Real relationships, structured support, and room to show up exactly
              as you are.
            </p>
          </div>
          <ul className="mt-0 divide-y divide-[#ebe6df] lg:mt-2">
            {insideItems.map(({ title, body, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-5 py-10 sm:flex-row sm:items-start sm:gap-8 lg:gap-12 lg:py-12"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e76fab]/10 text-[#b8457a] sm:mt-0.5 lg:h-14 lg:w-14">
                  <Icon
                    className="h-6 w-6 lg:h-7 lg:w-7"
                    strokeWidth={1.65}
                    aria-hidden
                  />
                </span>
                <div className="min-w-0 flex-1 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                  <h3 className="text-lg font-semibold tracking-tight text-black sm:text-xl lg:max-w-xs">
                    {title}
                  </h3>
                  <p className={`mt-3 lg:mt-0 lg:border-l lg:border-[#f0ebe4] lg:pl-10 xl:pl-12 ${bodyLede}`}>
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
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
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
                Introduction
              </p>
              <div className="overflow-hidden rounded-xl bg-black ring-1 ring-white/10 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.9)]">
                <video
                  className="aspect-video w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="HopeHub introduction video"
                >
                  <source src={VIDEO_INTRO} type="video/mp4" />
                </video>
              </div>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
                Full demo
              </p>
              <div className="overflow-hidden rounded-xl bg-black ring-1 ring-white/10 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.9)]">
                <video
                  className="aspect-video w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="HopeHub full demo video"
                >
                  <source src={VIDEO_DEMO} type="video/mp4" />
                </video>
              </div>
            </div>
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
                    <a href={HOPEHUB_JOIN_URL} className={joinButtonClass()}>
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
            <a href={HOPEHUB_JOIN_URL} className={joinButtonClass()}>
              Create your free account
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
