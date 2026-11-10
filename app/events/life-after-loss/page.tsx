import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { HeroImage } from "@/components/HeroImage";
import {
  LAL_EVENT_ADDRESS,
  LAL_EVENT_DATE_LONG,
  LAL_EVENT_LOCATION,
  LAL_EVENT_NAME,
  LAL_EVENT_REGISTER_URL,
  LAL_EVENT_TIME,
  LAL_EVENT_VENUE_FULL,
  LAL_EVENT_WHEN,
  LAL_PARTNERS,
  LAL_SPEAKERS,
  LAL_TOPICS,
} from "@/lib/life-after-loss-event";

export const metadata: Metadata = {
  title: "Life After Loss — An Evening of Support & Planning",
  description:
    "Join Law Mom®, It's Lifey, and Kaplan Family Financial for a warm evening in Norwell for widows — estate planning, finances, and connection. February 9, 2027.",
  openGraph: {
    title: "Life After Loss: An Evening of Support & Planning | It's Lifey",
    description:
      "A gentle, judgment-free evening for widows in Norwell — practical answers on estate planning and finances, with women who understand.",
  },
};

const HERO = "/images/widowwellnessimages/IMG_4575.jpeg";

function CtaArrow() {
  return (
    <span aria-hidden className="il-btn__arrow">
      →
    </span>
  );
}

export default function LifeAfterLossPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="lal-hero-heading"
      >
        <div className="ed-hero__media reveal-media">
          <HeroImage
            src={HERO}
            alt="Women gathered in warm conversation at an It's Lifey event"
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
              {LAL_EVENT_WHEN} · {LAL_EVENT_LOCATION}
            </p>
            <h1 id="lal-hero-heading" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>Life After Loss</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={90}>
                  An evening of support &amp; planning
                </ClipReveal>
              </span>
            </h1>
            <p className="ed-lede reveal-up">
              A warm, intimate evening at Tutti Bellissima in Norwell — created
              especially for widows.
            </p>
            <div className="ed-actions reveal-up">
              <a
                href={LAL_EVENT_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="il-btn il-btn--solid"
              >
                Reserve your seat
                <CtaArrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream" aria-label="Presented by">
        <div className="ed-shell">
          <p className="ed-kicker">Presented together</p>
          <div className="mt-8 flex flex-wrap items-center justify-start gap-x-10 gap-y-8 sm:gap-x-14">
            {LAL_PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target={partner.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  partner.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="relative block h-14 w-[7.5rem] opacity-90 transition-opacity hover:opacity-100 sm:h-16 sm:w-36"
                aria-label={partner.name}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain object-left"
                  sizes="144px"
                />
              </a>
            ))}
          </div>
          <p className="ed-body mt-8 max-w-[48ch]">
            Join Law Mom®, It&apos;s Lifey, and Kaplan Family Financial for a
            gentle, judgment-free space to connect with women who understand —
            and get clear, practical answers at your own pace.
          </p>
        </div>
      </section>

      <section
        className="ed-section ed-section--blush"
        aria-labelledby="lal-why-heading"
      >
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-kicker">Why this evening</p>
            <h2 id="lal-why-heading" className="ed-section-title">
              <ClipReveal delay={0}>Losing a spouse</ClipReveal>
              <ClipReveal delay={80}>changes everything</ClipReveal>
            </h2>
            <p className="ed-body ed-body--ink" style={{ marginTop: "1.25rem" }}>
              Including the paperwork nobody warned you about. This is a
              warm place to sit with women who get it — and to leave with more
              clarity around the practical next steps that often feel
              overwhelming alone.
            </p>
            <p className="ed-pull">Come as you are.</p>
            <p className="ed-body" style={{ marginTop: "1rem" }}>
              You don&apos;t need to have it all figured out, and you don&apos;t
              have to do it alone. Bring a friend, a sister, or a grown child if
              it helps. Seats are limited so it stays intimate.
            </p>
          </div>
          <figure className="ed-split__media m-0">
            <Image
              src="/images/widowwellnessimages/IMG_3180.jpeg"
              alt="Women connecting during an It's Lifey gathering"
              fill
              sizes="(max-width: 960px) 100vw, 48vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section
        className="ed-section ed-section--cream"
        aria-labelledby="lal-topics-heading"
      >
        <div className="ed-shell">
          <p className="ed-kicker">What we&apos;ll cover</p>
          <h2 id="lal-topics-heading" className="ed-section-title">
            <ClipReveal delay={0}>Practical answers,</ClipReveal>
            <ClipReveal delay={80}>at your pace</ClipReveal>
          </h2>
          <div className="mt-10 grid gap-0 border-t border-[var(--ed-rule)] md:grid-cols-2">
            {LAL_TOPICS.map((topic) => (
              <article
                key={topic.title}
                className="border-b border-[var(--ed-rule)] py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <h3 className="m-0 max-w-[18ch] text-[1.35rem] font-semibold leading-snug tracking-tight text-[var(--ed-ink)] sm:text-[1.5rem]">
                  {topic.title}
                </h3>
                <p className="ed-body mt-4 max-w-[42ch]">{topic.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="ed-section ed-section--blush"
        aria-labelledby="lal-speakers-heading"
      >
        <div className="ed-shell">
          <p className="ed-kicker">Your guides</p>
          <h2 id="lal-speakers-heading" className="ed-section-title">
            <ClipReveal delay={0}>People who can</ClipReveal>
            <ClipReveal delay={80}>help you steady</ClipReveal>
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
            {LAL_SPEAKERS.map((speaker) => (
              <article key={speaker.name} className="grid gap-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-7">
                <div className="relative aspect-[3/4] w-full max-w-[11rem] overflow-hidden bg-[var(--ed-blush)] sm:max-w-none">
                  <Image
                    src={speaker.photo}
                    alt={speaker.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 176px, 136px"
                  />
                </div>
                <div>
                  <h3 className="m-0 text-[1.4rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--ed-pink)]">
                    {speaker.role}
                  </p>
                  <p className="ed-body mt-4 max-w-[40ch]">{speaker.bio}</p>
                  <p className="mt-4">
                    <a
                      href={speaker.companyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[var(--ed-ink)] underline decoration-[rgba(231,111,171,0.45)] underline-offset-[3px] hover:text-[var(--ed-pink)]"
                    >
                      Visit website
                    </a>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="ed-section ed-section--cream"
        aria-labelledby="lal-details-heading"
      >
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-kicker">Evening details</p>
            <h2 id="lal-details-heading" className="ed-section-title">
              <ClipReveal delay={0}>When &amp; where</ClipReveal>
            </h2>
            <dl className="mt-8 grid gap-5">
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  Date
                </dt>
                <dd className="mt-1 text-[1.15rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                  {LAL_EVENT_DATE_LONG}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  Time
                </dt>
                <dd className="mt-1 text-[1.15rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                  {LAL_EVENT_TIME}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  Location
                </dt>
                <dd className="mt-1 text-[1.15rem] font-semibold tracking-tight text-[var(--ed-ink)]">
                  {LAL_EVENT_VENUE_FULL}
                  <br />
                  <span className="text-[1rem] font-medium text-[var(--ed-muted)]">
                    {LAL_EVENT_ADDRESS}
                  </span>
                </dd>
              </div>
            </dl>
            <div className="ed-actions mt-8">
              <a
                href={LAL_EVENT_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="il-btn il-btn--solid"
              >
                Reserve your seat
                <CtaArrow />
              </a>
              <Link href="/contact" className="il-link">
                Questions? Contact us
                <CtaArrow />
              </Link>
            </div>
          </div>
          <div className="ed-form-panel self-start">
            <p className="ed-kicker">A note</p>
            <p className="mt-3 text-[1.2rem] font-semibold leading-snug tracking-tight text-[var(--ed-ink)]">
              Seats are limited so it stays intimate.
            </p>
            <p className="ed-body mt-3">
              This evening is for widows who want soft company and clear
              guidance — not pressure. Come for the conversation, leave with a
              steadier sense of what can wait and what can move forward.
            </p>
            <p className="ed-body mt-5 text-[0.9rem]">
              Disclaimer: Law Mom, It&apos;s Lifey, and Kaplan Family Financial
              are separate entities.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-t border-[#d85e9a]/30 bg-[#c94d8a] px-4 py-16 sm:px-5 sm:py-24"
        aria-labelledby="lal-final-cta"
      >
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-white/85">
            {LAL_EVENT_NAME}
          </p>
          <h2
            id="lal-final-cta"
            className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            You don&apos;t have to figure this out alone.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/95">
            Join us in Norwell for a gentle evening of support, estate planning
            clarity, and financial steadying — with women who understand.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={LAL_EVENT_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="il-btn il-btn--on-dark"
            >
              Reserve your seat
              <CtaArrow />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
