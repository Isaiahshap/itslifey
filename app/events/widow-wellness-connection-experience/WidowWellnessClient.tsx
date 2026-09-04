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
  KEYNOTE_SPEAKERS,
  SPONSORSHIP_PATH,
} from "@/lib/widow-wellness-event";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import "./widow-wellness.css";

/* ─── Image constants — all indoor ─── */
const HERO_IMAGE = "/images/widowwellnessimages/IMG_8510.jpeg";
const EXP_A = "/images/widowwellnessimages/IMG_3180.jpeg";
const EXP_B = "/images/widowwellnessimages/IMG_0604.jpeg";
const EXP_C = "/images/widowwellnessimages/IMG_4575.jpeg";
const EXP_D = "/images/widowwellnessimages/IMG_2517.jpeg";
const BREAK_IMAGE = "/images/widowwellnessimages/IMG_4386.jpeg";
const KELLEY_BANNER = "/images/widowwellnessimages/kelleylinn.png";

const morningBreakouts = BREAKOUT_LEADERS.filter((l) => l.slot === "morning");
const afternoonBreakouts = BREAKOUT_LEADERS.filter(
  (l) => l.slot === "afternoon",
);

function scrollToRegister() {
  document.getElementById("ww-register")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function scrollToDetails() {
  document.getElementById("ww-intro")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* ─── Scroll-triggered fade-up ─── */
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ww-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}

/* ─── Collapsible section (Event Flow, Breakouts, gallery) ─── */
const LARGE_SPONSOR_LOGOS = new Set([
  "Parents Estate Planning",
  "Lightwork",
  "Howe2Organize",
  "Lamacchia Realty",
]);

function AccordionSection({
  title,
  subtitle,
  eyebrow,
  preview,
  children,
  defaultOpen = false,
  onDark = false,
  overlay = false,
}: {
  title: ReactNode;
  subtitle?: string;
  eyebrow?: string;
  preview?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  onDark?: boolean;
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`ww-accordion${open ? " is-open" : ""}${onDark ? " ww-accordion--dark" : ""}${overlay ? " ww-accordion--overlay" : ""}`}
    >
      <button
        type="button"
        className="ww-accordion__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="ww-accordion__trigger-text">
          {eyebrow && (
            <span className="ww-accordion__eyebrow">{eyebrow}</span>
          )}
          <span className="ww-accordion__title">{title}</span>
          {subtitle && (
            <span className="ww-accordion__subtitle">{subtitle}</span>
          )}
        </span>
        <span className="ww-accordion__arrow" aria-hidden>
          ↓
        </span>
      </button>
      {preview ? (
        <div className="ww-accordion__stack">
          <div className="ww-accordion__preview">{preview}</div>
          <div className="ww-accordion__body" aria-hidden={!open}>
            <div className="ww-accordion__inner">
              <div className="ww-accordion__panel">{children}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ww-accordion__body" aria-hidden={!open}>
          <div className="ww-accordion__inner">{children}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Keynote speaker card with expandable bio ─── */
function SpeakerCard({
  speaker,
}: {
  speaker: (typeof KEYNOTE_SPEAKERS)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`ww-speaker-card${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="ww-speaker-card__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {speaker.photo && (
          <figure className="ww-speaker-card__photo">
            <Image src={speaker.photo} alt={speaker.name} fill sizes="88px" />
          </figure>
        )}
        <div className="ww-speaker-card__meta">
          <p className="ww-speaker-card__label">{speaker.role}</p>
          <h3 className="ww-speaker-card__name">{speaker.name}</h3>
          {speaker.org && (
            <p className="ww-speaker-card__org">{speaker.org}</p>
          )}
          <p className="ww-speaker-card__preview">{speaker.bio[0]}</p>
        </div>
        <span className="ww-speaker-card__expand-arrow" aria-hidden>
          ↓
        </span>
      </button>

      <div className="ww-speaker-card__body" aria-hidden={!open}>
        <div className="ww-speaker-card__inner">
          <div className="ww-speaker-card__full">
            {speaker.photo && (
              <figure className="ww-speaker-card__full-photo">
                <Image
                  src={speaker.photo}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 900px) 100vw, 260px"
                />
              </figure>
            )}
            <div className="ww-speaker-card__full-bio">
              {speaker.bio.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
              <div className="ww-speaker-card__links">
                {speaker.website && (
                  <a
                    href={speaker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ww-link"
                  >
                    Visit website →
                  </a>
                )}
                {speaker.social && (
                  <span className="ww-speaker-card__social">
                    {speaker.social}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main client component ─── */
export function WidowWellnessClient({
  availableLeaderPhotos = {},
}: {
  availableLeaderPhotos?: Partial<Record<string, string>>;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const registerRef = useRef<HTMLElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const register = registerRef.current;
    if (!hero) return;

    let heroOut = false;
    let registerIn = false;

    const update = () => {
      setStickyVisible(heroOut && !registerIn);
    };

    const heroIo = new IntersectionObserver(
      ([entry]) => {
        heroOut = !entry?.isIntersecting;
        update();
      },
      { threshold: 0.08 },
    );
    heroIo.observe(hero);

    const registerIo = register
      ? new IntersectionObserver(
          ([entry]) => {
            registerIn = Boolean(entry?.isIntersecting);
            update();
          },
          { threshold: 0.2 },
        )
      : null;
    if (register && registerIo) registerIo.observe(register);

    return () => {
      heroIo.disconnect();
      registerIo?.disconnect();
    };
  }, []);

  return (
    <div className="ww">
      <WidowWellnessPixelEvents contentName={EVENT_NAME} value={129} />

      {/* 1. Hero */}
      <section
        ref={heroRef}
        className="ww-hero"
        aria-labelledby="ww-hero-heading"
      >
        <div className="ww-hero__media">
          <Image
            src={HERO_IMAGE}
            alt="Widows gathered in a warm circle of connection and support"
            fill
            priority
            sizes="(max-width: 960px) 100vw, 58vw"
          />
        </div>
        <div className="ww-hero__panel">
          <p className="ww-hero__brand">Presented by It&apos;s Lifey</p>
          <h1 id="ww-hero-heading" className="ww-hero__title">
            Widow Wellness &amp; <em>Connection</em> Experience
          </h1>
          <p className="ww-hero__lede">
            A gathering for widows across New England — inspiration, education,
            healing, and women who truly understand.
          </p>
          <div className="ww-hero__meta">
            <span className="ww-hero__date">{EVENT_DATES}</span>
            <span>{EVENT_LOCATION}</span>
          </div>
          <div className="ww-hero__actions">
            <button type="button" className="ww-btn" onClick={scrollToRegister}>
              Reserve Your Spot
            </button>
            <button
              type="button"
              className="ww-btn ww-btn--ghost"
              onClick={scrollToDetails}
            >
              Explore the Weekend
            </button>
          </div>
        </div>
      </section>

      {/* 2. Sponsor strip */}
      <section className="ww-sponsors" aria-label="Event sponsors">
        <div className="ww-shell">
          <p className="ww-sponsors__label">Presented with support from</p>

          {EVENT_SPONSORS.filter((s) => s.featured).map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ww-sponsors__featured"
              aria-label={`${sponsor.name} — ${sponsor.tier}`}
            >
              <p className="ww-sponsors__tier">{sponsor.tier}</p>
              <span className="ww-sponsors__logo ww-sponsors__logo--feature">
                <Image
                  src={sponsor.logo}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="280px"
                />
              </span>
              <p className="ww-sponsors__name">{sponsor.name}</p>
            </a>
          ))}

          <div className="ww-sponsors__track">
            {EVENT_SPONSORS.filter((s) => !s.featured).map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ww-sponsors__item"
                aria-label={`${sponsor.name} — ${sponsor.tier}`}
              >
                <p className="ww-sponsors__tier">{sponsor.tier}</p>
                <span
                  className={`ww-sponsors__logo${
                    LARGE_SPONSOR_LOGOS.has(sponsor.name)
                      ? " ww-sponsors__logo--prominent"
                      : ""
                  }${
                    sponsor.name === "Lightwork"
                      ? " ww-sponsors__logo--lightwork"
                      : ""
                  }`}
                >
                  <Image
                    src={sponsor.logo}
                    alt=""
                    fill
                    className="object-contain"
                    sizes={
                      sponsor.name === "Lightwork"
                        ? "280px"
                        : LARGE_SPONSOR_LOGOS.has(sponsor.name)
                          ? "240px"
                          : "140px"
                    }
                  />
                </span>
                <p className="ww-sponsors__name">{sponsor.name}</p>
              </a>
            ))}
            <Link href={SPONSORSHIP_PATH} className="ww-sponsors__cta-inline">
              Interested in sponsoring?
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Intro */}
      <section
        id="ww-intro"
        className="ww-intro"
        aria-labelledby="ww-intro-heading"
      >
        <div className="ww-shell">
          <Reveal>
            <div className="ww-intro__grid">
              <div>
                <p className="ww-eyebrow">Why this day matters</p>
                <h2 id="ww-intro-heading" className="ww-intro__title">
                  Connection, support, and hope — in one room
                </h2>
                <p className="ww-intro__pull">
                  You don&apos;t have to explain the backstory here.
                </p>
              </div>
              <div className="ww-intro__copy">
                <p className="ww-body">
                  The Widow Wellness &amp; Connection Experience is a one-day
                  gathering created specifically for widows seeking connection,
                  support, wellness, and hope after loss.
                </p>
                <p className="ww-body">
                  Hosted by It&apos;s Lifey, this unique event brings together
                  women from across New England for a meaningful day of
                  inspiration, education, healing, and community. Through
                  powerful keynote speakers, interactive breakout sessions,
                  wellness experiences, and opportunities for authentic
                  connection, you&apos;ll gain practical tools, valuable
                  resources, and the support of women who truly understand your
                  journey.
                </p>
                <p
                  className="ww-body"
                  style={{ fontWeight: 600, color: "var(--ww-ink)" }}
                >
                  By a widow, for widows. {EVENT_SHORT_TAGLINE}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Experience collage — collapsible */}
      <section
        className="ww-experience"
        aria-labelledby="ww-experience-heading"
      >
        <div className="ww-shell">
          <AccordionSection
            eyebrow="Glimpse the gathering"
            title={
              <span id="ww-experience-heading">
                More than a conference — a day to exhale
              </span>
            }
            subtitle="See photos from past It's Lifey gatherings"
          >
            <div style={{ paddingBottom: "2.5rem" }}>
              <p className="ww-experience__lede" style={{ marginBottom: "1.75rem" }}>
                The experience begins the evening before with an optional VIP
                Mocktail Hour. The following day includes breakfast, keynotes,
                wellness and educational breakouts, networking, lunch, and
                conversations designed to help widows navigate life after loss.
              </p>
              <div className="ww-experience__grid">
                <figure className="ww-tile ww-tile--photo ww-tile--a">
                  <Image
                    src={EXP_A}
                    alt="Widows in a warm circle of connection at an It's Lifey gathering"
                    fill
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                </figure>
                <div className="ww-tile ww-tile--word ww-tile--b">
                  <div>
                    <span>CONNECTION</span>
                    <small>Women who get it</small>
                  </div>
                </div>
                <div className="ww-tile ww-tile--copy ww-tile--c">
                  <strong>Come as you are</strong>
                  <p>
                    Whether you&apos;re newly widowed or years into your
                    journey, this is a welcoming space to connect, learn, heal,
                    and be reminded that you do not have to navigate widowhood
                    alone.
                  </p>
                </div>
                <figure className="ww-tile ww-tile--photo ww-tile--d">
                  <Image
                    src={EXP_C}
                    alt="Women sharing a warm meal and conversation"
                    fill
                    sizes="(max-width: 900px) 100vw, 30vw"
                  />
                </figure>
                <div className="ww-tile ww-tile--word ww-tile--e">
                  <div>
                    <span>COMMUNITY</span>
                    <small>Shared meals &amp; hope</small>
                  </div>
                </div>
                <div className="ww-tile ww-tile--word ww-tile--f">
                  <div>
                    <span>WELLNESS</span>
                    <small>Mind · body · heart</small>
                  </div>
                </div>
                <figure className="ww-tile ww-tile--photo ww-tile--g">
                  <Image
                    src={EXP_D}
                    alt="Widows gathered around a table in warm conversation"
                    fill
                    sizes="(max-width: 900px) 100vw, 48vw"
                  />
                </figure>
                <div className="ww-tile ww-tile--copy ww-tile--h">
                  <strong>What the day includes</strong>
                  <p>
                    Keynotes · Interactive wellness breakouts · Breakfast &amp;
                    shared lunch · Networking · Practical tools &amp; trusted
                    resources · The Hope Mic Story Share
                  </p>
                </div>
                <figure className="ww-tile ww-tile--photo ww-tile--wide">
                  <Image
                    src={EXP_B}
                    alt="Women laughing together at a shared meal"
                    fill
                    sizes="100vw"
                  />
                </figure>
              </div>
            </div>
          </AccordionSection>
        </div>
      </section>

      {/* 5. Full-bleed photo break */}
      <section className="ww-break" aria-label="Emotional invitation">
        <Image
          src={BREAK_IMAGE}
          alt="Women sharing a warm moment of laughter together"
          fill
          sizes="100vw"
          priority={false}
        />
        <div className="ww-break__veil" aria-hidden />
        <p className="ww-break__quote">
          Come alone. Leave with your people.
        </p>
      </section>

      {/* 6. Keynote speakers — Anita + TBD, above Kelley */}
      <section className="ww-keynotes" aria-labelledby="ww-keynotes-heading">
        <div className="ww-shell">
          <Reveal>
            <div className="ww-keynotes__header">
              <p className="ww-eyebrow">Main stage · November 14</p>
              <h2 id="ww-keynotes-heading" className="ww-keynotes__title">
                Keynote Speakers
              </h2>
            </div>
          </Reveal>

          <div className="ww-keynotes__list">
            {KEYNOTE_SPEAKERS.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Kelley Lynn — VIP Evening */}
      <section className="ww-host" aria-labelledby="ww-host-heading">
        <div className="ww-shell">
          <Reveal>
            <div className="ww-host__grid">
              <div className="ww-host__visual">
                <span className="ww-host__orb" aria-hidden />
                <figure className="ww-host__figure">
                  <Image
                    src={KELLEY_BANNER}
                    alt="Featured guest Kelley Lynn — Friday Night VIP Event"
                    width={1221}
                    height={538}
                    sizes="(max-width: 960px) 100vw, 50vw"
                  />
                </figure>
              </div>
              <div className="ww-host__copy">
                <p className="ww-eyebrow">Featured host · VIP evening</p>
                <h2 id="ww-host-heading" className="ww-host__name">
                  Kelley Lynn
                </h2>
                <p className="ww-host__role">Mocktail Hour · November 13</p>
                <p className="ww-body" style={{ marginTop: "1.25rem" }}>
                  VIP guests gather the evening before for an intimate mocktail
                  hour featuring widow, comedian, TEDx speaker, author, and
                  grief advocate Kelley Lynn. Expect laughter, honesty,
                  connection, and hope — a powerful night before the main
                  event.
                </p>
                <p className="ww-body">
                  Kelley became a leading voice in grief support. Her TEDx
                  talk, &ldquo;When Someone You Love Dies, There is No Such
                  Thing as Moving On,&rdquo; has reached millions. Her book,{" "}
                  <em>My Husband Is Not a Rainbow</em>, shares an honest and
                  often humorous perspective on grief, love, and rebuilding
                  life after loss.
                </p>
                <p className="ww-host__note">
                  Included with the $169 VIP ticket
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Registration — moved before Event Flow */}
      <section
        id="ww-register"
        ref={registerRef}
        className="ww-register"
        aria-labelledby="ww-register-heading"
      >
        <div className="ww-shell">
          <div className="ww-register__grid">
            <Reveal>
              <div>
                <p className="ww-eyebrow">Join us</p>
                <h2 id="ww-register-heading" className="ww-register__title">
                  Reserve Your Spot
                </h2>
                <p className="ww-body" style={{ marginTop: "1.15rem" }}>
                  We&apos;d love to have you in the room. Choose your ticket,
                  share a few details, and you&apos;ll be taken to secure
                  Stripe checkout to complete payment. We&apos;ll also email
                  you the link — your spot isn&apos;t confirmed until payment
                  is received.
                </p>

                <dl className="ww-register__facts">
                  <div className="ww-register__fact">
                    <dt>When</dt>
                    <dd>{EVENT_DATES}</dd>
                  </div>
                  <div className="ww-register__fact">
                    <dt>Where</dt>
                    <dd>{EVENT_LOCATION}</dd>
                    <p>
                      Whether you&apos;re joining for the full day or adding
                      the VIP evening with Kelley Lynn, you&apos;ll step into a
                      space built for widows — real talk, real connection, and
                      real hope.
                    </p>
                  </div>
                  <div className="ww-register__fact">
                    <dt>Where to stay</dt>
                    <dd>Hotel block at {HOTEL_NAME}</dd>
                    <p>
                      We&apos;ve reserved a nearby hotel block at {HOTEL_NAME}{" "}
                      for guests traveling in for the weekend.{" "}
                      <a
                        href={HOTEL_BLOCK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ww-link"
                      >
                        Book {HOTEL_NAME}
                      </a>
                    </p>
                  </div>
                </dl>

                <div className="ww-register__tiers">
                  <div className="ww-register__tier">
                    <span className="ww-register__tier-label">VIP</span>
                    <span className="ww-register__tier-price">$169</span>
                    <p>
                      Mocktail hour with Kelley Lynn on November 13, plus the
                      full main event on November 14.
                    </p>
                  </div>
                  <div className="ww-register__tier">
                    <span className="ww-register__tier-label">
                      General Admission
                    </span>
                    <span className="ww-register__tier-price">$129</span>
                    <p>
                      The full main event — welcome, keynotes, breakouts,
                      lunch, and The Hope Mic Story Share.
                    </p>
                  </div>
                </div>

                <p className="ww-body" style={{ marginTop: "1.75rem" }}>
                  Newly widowed or years into your journey — you belong here.
                  Come alone. Leave with practical tools, trusted resources,
                  and the quiet relief of women who understand without you
                  having to explain.
                </p>
                <p className="ww-body" style={{ marginTop: "0.85rem" }}>
                  Questions?{" "}
                  <a href="mailto:jennifer@itslifey.com" className="ww-link">
                    jennifer@itslifey.com
                  </a>
                  . We read every message with care.
                </p>
              </div>
            </Reveal>

            <div className="ww-register__form">
              <WidowWellnessRegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Event Flow — collapsible */}
      <section className="ww-flow" aria-labelledby="ww-flow-heading">
        <div className="ww-shell">
          <AccordionSection
            eyebrow="Your day, step by step"
            title={
              <span id="ww-flow-heading">Event Flow</span>
            }
            subtitle={`November 13–14 · ${EVENT_LOCATION}`}
            onDark
          >
            <div className="ww-flow__content">
              <div className="ww-flow__day">
                <div className="ww-flow__day-side">
                  <p className="ww-flow__day-label">Friday</p>
                  <p className="ww-flow__day-sub">November 13 · Evening</p>
                </div>
                <div className="ww-flow__rows">
                  <article className="ww-flow__row">
                    <p className="ww-flow__when">Evening</p>
                    <h3 className="ww-flow__row-title ww-flow__row-title--flag">
                      VIP Evening · Mocktail Hour with Kelley Lynn
                    </h3>
                    <ul className="ww-flow__list">
                      <li>Welcome and connection</li>
                      <li>Mocktails and light bites</li>
                      <li>Conversation with Kelley Lynn</li>
                      <li>Laughter, honesty, and hope</li>
                      <li>
                        Time for widows, sponsors, and VIP guests to connect
                      </li>
                    </ul>
                  </article>
                </div>
              </div>

              <div className="ww-flow__day">
                <div className="ww-flow__day-side">
                  <p className="ww-flow__day-label">Saturday</p>
                  <p className="ww-flow__day-sub">November 14 · Main event</p>
                </div>
                <div className="ww-flow__rows">
                  <article className="ww-flow__row">
                    <p className="ww-flow__when">Morning</p>
                    <h3 className="ww-flow__row-title">
                      Main Widow Wellness Experience · Morning Welcome
                    </h3>
                    <ul className="ww-flow__list">
                      <li>Arrival, coffee, and connection</li>
                      <li>Welcome from It&apos;s Lifey</li>
                      <li>Grounding moment / candle lighting</li>
                      <li>Opening keynote</li>
                    </ul>
                  </article>

                  <article className="ww-flow__row">
                    <p className="ww-flow__when">~10 a.m.</p>
                    <h3 className="ww-flow__row-title">
                      Mid-Morning Breakout Sessions
                    </h3>
                    <p
                      className="ww-flow__lede"
                      style={{ marginTop: "0.55rem", maxWidth: "none" }}
                    >
                      Widows will choose from healing and wellness-centered
                      sessions:
                    </p>
                    <ul className="ww-flow__list">
                      {morningBreakouts.map((leader) => (
                        <li key={leader.name}>
                          <strong>{leader.session}</strong>
                          <span>{leader.name}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="ww-flow__row">
                    <p className="ww-flow__when">Midday</p>
                    <h3 className="ww-flow__row-title">
                      Lunch &amp; Connection
                    </h3>
                    <ul className="ww-flow__list">
                      <li>Shared lunch</li>
                      <li>Sponsor and resource table visits</li>
                      <li>
                        Time for widows to connect in a relaxed, supportive
                        setting
                      </li>
                    </ul>
                  </article>

                  <article className="ww-flow__row">
                    <p className="ww-flow__when">Afternoon · ~2 p.m.</p>
                    <h3 className="ww-flow__row-title">Afternoon Program</h3>
                    <ul className="ww-flow__list">
                      <li>Afternoon keynote</li>
                      <li>
                        Wellness breakout sessions · approximately 2 p.m.
                      </li>
                      {afternoonBreakouts.map((leader) => (
                        <li key={leader.name}>
                          <strong>{leader.session}</strong>
                          <span>{leader.name}</span>
                        </li>
                      ))}
                      <li>Guided reflection or community conversation</li>
                    </ul>
                  </article>

                  <article className="ww-flow__row">
                    <p className="ww-flow__when">Closing</p>
                    <h3 className="ww-flow__row-title ww-flow__row-title--flag">
                      The Hope Mic Story Share · Stories of Experience,
                      Strength &amp; Hope
                    </h3>
                    <div className="ww-flow__prose">
                      <p>
                        The day will close with The Hope Mic Story Share — an
                        open invitation for widows to share their stories in a
                        supportive, judgment-free space.
                      </p>
                      <p>
                        Each speaker will have 3 minutes to share a piece of
                        their experience, strength, and hope — whether
                        it&apos;s a moment of grief, love, humor, survival,
                        rebuilding, or what life after loss has taught them.
                      </p>
                      <p>
                        This closing event honors the truth that every widow
                        has a story, and that sharing those stories can be
                        healing for the person speaking and for every woman
                        listening.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              <div className="ww-flow__cta">
                <button
                  type="button"
                  className="ww-btn ww-btn--on-dark"
                  onClick={scrollToRegister}
                >
                  Reserve Your Spot
                </button>
              </div>
            </div>
          </AccordionSection>
        </div>
      </section>

      {/* 10. Breakout leaders — collapsible */}
      <section className="ww-leaders" aria-labelledby="ww-leaders-heading">
        <div className="ww-shell">
          <AccordionSection
            eyebrow="Session leaders"
            title={
              <span id="ww-leaders-heading">
                Breakout Sessions
              </span>
            }
            subtitle="6 sessions · Morning & Afternoon · choose your path"
            overlay
            preview={
              <div className="ww-leaders__preview">
                {BREAKOUT_LEADERS.map((leader) => {
                  const photo = availableLeaderPhotos[leader.name];
                  return (
                    <div key={leader.name} className="ww-leaders__preview-tile">
                      <div className="ww-leaders__preview-photo">
                        {photo && (
                          <Image src={photo} alt="" fill sizes="64px" />
                        )}
                      </div>
                      <p className="ww-leaders__preview-slot">
                        {leader.slot === "morning" ? "AM" : "PM"}
                      </p>
                      <p className="ww-leaders__preview-name">
                        {leader.name.split(" ·")[0]}
                      </p>
                      <p className="ww-leaders__preview-session">
                        {leader.session}
                      </p>
                    </div>
                  );
                })}
              </div>
            }
          >
            <ul className="ww-leaders__list">
              {BREAKOUT_LEADERS.map((leader) => {
                const photo = availableLeaderPhotos[leader.name];
                return (
                  <li key={leader.name} className="ww-leader">
                    {photo ? (
                      <figure className="ww-leader__photo">
                        <Image
                          src={photo}
                          alt={leader.name}
                          fill
                          sizes="92px"
                        />
                      </figure>
                    ) : (
                      <div className="ww-leader__photo" aria-hidden />
                    )}
                    <div>
                      <p className="ww-leader__slot">
                        {leader.slot === "morning"
                          ? "Morning · approximately 10 a.m."
                          : "Afternoon · approximately 2 p.m."}
                      </p>
                      <h3 className="ww-leader__name">{leader.name}</h3>
                      <p className="ww-leader__session">{leader.session}</p>
                      <div className="ww-leader__bio">
                        {leader.description.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>
                      <a
                        href={leader.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ww-link ww-leader__link"
                      >
                        Website →
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </AccordionSection>
        </div>
      </section>

      {/* 11. Sponsorship CTA */}
      <section
        className="ww-sponsor-cta"
        aria-labelledby="ww-sponsor-cta-heading"
      >
        <div className="ww-shell">
          <Reveal>
            <div className="ww-sponsor-cta__grid">
              <h2
                id="ww-sponsor-cta-heading"
                className="ww-sponsor-cta__title"
              >
                Interested in supporting this experience?
              </h2>
              <div>
                <p className="ww-sponsor-cta__copy">
                  Help widows feel less alone while connecting your brand with
                  women actively seeking trusted support, resources, and
                  community. Sponsorship levels start at $250 — with meaningful
                  visibility across the event, marketing channels, and attendee
                  experience.
                </p>
                <Link href={SPONSORSHIP_PATH} className="ww-btn">
                  Explore Sponsorship
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky CTA */}
      <div
        className={`ww-sticky${stickyVisible ? " is-visible" : ""}`}
        role="region"
        aria-label="Quick registration"
      >
        <div className="ww-sticky__meta">
          <p>{EVENT_DATES}</p>
          <span>{EVENT_LOCATION}</span>
        </div>
        <button type="button" className="ww-btn" onClick={scrollToRegister}>
          Reserve Your Spot
        </button>
      </div>
    </div>
  );
}
