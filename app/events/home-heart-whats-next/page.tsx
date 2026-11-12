import type { Metadata } from "next";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { HeroImage } from "@/components/HeroImage";
import {
  HHH_DIRECTIONS_HREF,
  HHH_EVENT_ADDRESS,
  HHH_EVENT_CITY,
  HHH_EVENT_DATE_LONG,
  HHH_EVENT_NAME,
  HHH_EVENT_PLACE,
  HHH_EVENT_TIME,
  HHH_EVENT_WHEN,
  HHH_HOSTS,
  HHH_RSVP_EMAIL,
  HHH_RSVP_HREF,
  HHH_TOPICS,
} from "@/lib/home-heart-event";

export const metadata: Metadata = {
  title: "Home, Heart & What's Next — An Evening for Widows",
  description:
    "Cocktails and an honest conversation for widows about staying, selling, or waiting — with Ashley Liddle and Shereen Berlin. Thursday, March 4, 2027, in Wellesley. No pressure to make a move.",
  openGraph: {
    title: "Home, Heart & What's Next | It's Lifey",
    description:
      "An intimate evening of cocktails and conversation for widows, about the emotional and practical sides of deciding what comes next for your home.",
  },
};

const HERO = "/images/widowwellnessimages/IMG_4386.jpeg";

function CtaArrow() {
  return (
    <span aria-hidden className="il-btn__arrow">
      →
    </span>
  );
}

export default function HomeHeartEventPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="hhh-hero-heading"
      >
        <div className="ed-hero__media reveal-media">
          <HeroImage
            src={HERO}
            alt="Women sharing a meal and conversation around a dining table"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 42%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">
              {HHH_EVENT_WHEN} · {HHH_EVENT_CITY}
            </p>
            <h1 id="hhh-hero-heading" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>Home, Heart</ClipReveal>
              <ClipReveal delay={80}>&amp; What&apos;s Next</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={150}>Cocktails &amp; conversation</ClipReveal>
              </span>
            </h1>
            <p className="ed-lede reveal-up">
              An evening for widows. Every chapter deserves a space. Sometimes
              it&apos;s the home you&apos;re already in.
            </p>
            <div className="ed-actions reveal-up">
              <a href={HHH_RSVP_HREF} className="il-btn il-btn--solid">
                RSVP by email
                <CtaArrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="ed-section ed-section--blush"
        aria-labelledby="hhh-why-heading"
      >
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-kicker">The question</p>
            <h2 id="hhh-why-heading" className="ed-section-title">
              <ClipReveal delay={0}>The house</ClipReveal>
              <ClipReveal delay={80}>can feel different</ClipReveal>
            </h2>
            <p
              className="ed-body ed-body--ink"
              style={{ marginTop: "1.25rem" }}
            >
              After losing your person, even the place you call home can feel
              different. The rooms hold memories, the walls tell stories, and
              suddenly you may find yourself wondering what you&apos;re holding
              onto.
            </p>
            <p className="ed-body" style={{ marginTop: "1rem" }}>
              Join Ashley Liddle and Shereen Berlin of Coldwell Banker Realty
              for an intimate, honest conversation about the emotional and
              practical sides of deciding what comes next for your home.
            </p>
          </div>
          <p className="m-0 max-w-[24ch] text-[clamp(1.45rem,1.15rem+1vw,2.05rem)] font-semibold italic leading-[1.2] tracking-tight text-[var(--ed-ink)]">
            Do I stay? Do I sell? Am I holding onto the house — or the life we
            built inside it?
          </p>
        </div>
      </section>

      <section
        className="ed-section ed-section--cream"
        aria-labelledby="hhh-topics-heading"
      >
        <div className="ed-shell">
          <p className="ed-kicker">The evening</p>
          <h2 id="hhh-topics-heading" className="ed-section-title">
            <ClipReveal delay={0}>What we&apos;ll</ClipReveal>
            <ClipReveal delay={80}>explore</ClipReveal>
          </h2>
          <ol className="mt-10 list-none border-t border-[var(--ed-rule)] p-0">
            {HHH_TOPICS.map((topic, index) => (
              <li
                key={topic.title}
                className="grid gap-2 border-b border-[var(--ed-rule)] py-7 last:border-b-0 sm:grid-cols-[4.25rem_minmax(0,1fr)] sm:items-baseline sm:gap-8 sm:py-8"
              >
                <span className="text-[0.72rem] font-bold tracking-[0.18em] text-[var(--ed-pink)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="max-w-[46rem]">
                  <h3 className="m-0 text-[1.35rem] font-semibold leading-snug tracking-tight text-[var(--ed-ink)] sm:text-[1.5rem]">
                    {topic.title}
                  </h3>
                  <p className="ed-body max-w-[52ch]" style={{ marginTop: "0.65rem" }}>
                    {topic.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="ed-section ed-section--blush"
        aria-labelledby="hhh-hosts-heading"
      >
        <div className="ed-shell">
          <p className="ed-kicker">Your hosts</p>
          <h2 id="hhh-hosts-heading" className="ed-section-title">
            <ClipReveal delay={0}>Meet Ashley</ClipReveal>
            <ClipReveal delay={80}>&amp; Shereen</ClipReveal>
          </h2>
          <div className="mt-10 grid border-t border-[var(--ed-rule)] md:grid-cols-2">
            {HHH_HOSTS.map((host, index) => (
              <article
                key={host.name}
                className={
                  index === 0
                    ? "border-b border-[var(--ed-rule)] py-8 md:border-r md:border-b-0 md:py-10 md:pr-12"
                    : "py-8 md:py-10 md:pl-12"
                }
              >
                <h3 className="m-0 text-[1.55rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                  {host.name}
                </h3>
                <p className="mt-1 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--ed-pink)]">
                  {host.role}
                </p>
                <p className="ed-body max-w-[42ch]" style={{ marginTop: "1rem" }}>
                  {host.bio}
                </p>
                <p className="mt-4">
                  <a
                    href={host.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[var(--ed-ink)] underline decoration-[rgba(231,111,171,0.45)] underline-offset-[3px] hover:text-[var(--ed-pink)]"
                  >
                    {host.linkLabel}
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="ed-section ed-section--cream"
        aria-labelledby="hhh-details-heading"
      >
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-kicker">Evening details</p>
            <h2 id="hhh-details-heading" className="ed-section-title">
              <ClipReveal delay={0}>When &amp; where</ClipReveal>
            </h2>
            <dl className="mt-8 grid gap-5">
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  Date
                </dt>
                <dd className="mt-1 text-[1.15rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                  {HHH_EVENT_DATE_LONG}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  Time
                </dt>
                <dd className="mt-1 text-[1.15rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                  {HHH_EVENT_TIME}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  Place
                </dt>
                <dd className="mt-1 text-[1.15rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                  {HHH_EVENT_PLACE}
                  <br />
                  <span className="text-[1rem] font-medium text-[var(--ed-muted)]">
                    {HHH_EVENT_ADDRESS}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  RSVP
                </dt>
                <dd className="mt-1 text-[1.15rem] font-semibold tracking-tight">
                  <a
                    href={HHH_RSVP_HREF}
                    className="text-[var(--ed-ink)] underline decoration-[rgba(231,111,171,0.45)] underline-offset-[3px] hover:text-[var(--ed-pink)]"
                  >
                    {HHH_RSVP_EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="ed-actions mt-8">
              <a href={HHH_RSVP_HREF} className="il-btn il-btn--solid">
                RSVP by email
                <CtaArrow />
              </a>
              <a
                href={HHH_DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="il-link"
              >
                Get directions
                <CtaArrow />
              </a>
            </div>
          </div>
          <div className="ed-form-panel self-start">
            <p className="ed-kicker">A note</p>
            <p className="mt-3 text-[1.2rem] font-semibold leading-snug tracking-tight text-[var(--ed-ink)]">
              There are no right answers, and no expectation that you make a
              move.
            </p>
            <p className="ed-body" style={{ marginTop: "0.85rem" }}>
              Just cocktails, good company, helpful information, and meaningful
              conversation with other widows navigating life&apos;s next chapter.
              Come as you are.
            </p>
            <p className="ed-body" style={{ marginTop: "1.25rem" }}>
              <Link href="/contact" className="il-link">
                Questions? Contact us
                <CtaArrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-t border-[#d85e9a]/30 bg-[#c94d8a] px-4 py-16 sm:px-5 sm:py-24"
        aria-labelledby="hhh-final-cta"
      >
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-white/85">
            {HHH_EVENT_NAME}
          </p>
          <h2
            id="hhh-final-cta"
            className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Home isn&apos;t just a place. It&apos;s a feeling.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/95">
            You deserve to feel at home in whatever chapter comes next.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href={HHH_RSVP_HREF} className="il-btn il-btn--on-dark">
              RSVP by email
              <CtaArrow />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
