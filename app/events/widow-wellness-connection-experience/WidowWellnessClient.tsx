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
import { useEffect, useRef, useState, type ReactNode } from "react";
import "./widow-wellness.css";

const HERO_IMAGE =
  "/images/Retreats/Summer2025/Jen Kitchen Table Horizontal.webp";
const EXP_A = "/images/Retreats/Summer2025/IMG_1832.webp";
const EXP_B = "/images/Retreats/fall 2025/IMG_0978.webp";
const EXP_C = "/images/Retreats/Summer2025/IMG_1698.webp";
const EXP_D = "/images/Retreats/fall 2025/IMG_0966.webp";
const BREAK_IMAGE = "/images/Retreats/Summer2025/IMG_1908.webp";
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

      {/* 1. Hero — event poster */}
      <section
        ref={heroRef}
        className="ww-hero"
        aria-labelledby="ww-hero-heading"
      >
        <div className="ww-hero__media">
          <Image
            src={HERO_IMAGE}
            alt="Women gathered around a dinner table in warm conversation"
            fill
            priority
            sizes="(max-width: 960px) 100vw, 58vw"
          />
        </div>
        <div className="ww-hero__panel">
          <p className="ww-hero__brand">Presented by It&apos;s Lifey</p>
          <h1 id="ww-hero-heading" className="ww-hero__title">
            Widow Wellness &amp;{" "}
            <em>Connection</em> Experience
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

      {/* 2. Compact sponsor strip */}
      <section className="ww-sponsors" aria-label="Event sponsors">
        <div className="ww-shell">
          <p className="ww-sponsors__label">Presented with support from</p>
          <div className="ww-sponsors__track">
            {EVENT_SPONSORS.map((sponsor) => (
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
                    sponsor.featured ? " ww-sponsors__logo--feature" : ""
                  }`}
                >
                  <Image
                    src={sponsor.logo}
                    alt=""
                    fill
                    className="object-contain"
                    sizes={sponsor.featured ? "160px" : "120px"}
                  />
                </span>
                <p className="ww-sponsors__name">{sponsor.name}</p>
              </a>
            ))}
          </div>
          <p className="ww-sponsors__cta">
            <Link href={SPONSORSHIP_PATH} className="ww-link">
              Interested in sponsoring?
            </Link>
          </p>
        </div>
      </section>

      {/* 3. Intro / emotional premise */}
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
                <p className="ww-body" style={{ fontWeight: 600, color: "var(--ww-ink)" }}>
                  By a widow, for widows. {EVENT_SHORT_TAGLINE}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Experience collage */}
      <section
        className="ww-experience"
        aria-labelledby="ww-experience-heading"
      >
        <div className="ww-shell">
          <Reveal>
            <div className="ww-experience__header">
              <h2 id="ww-experience-heading" className="ww-experience__title">
                More than a conference — a day to exhale
              </h2>
              <p className="ww-experience__lede">
                The experience begins the evening before with an optional VIP
                Mocktail Hour featuring Kelley Lynn. The following day includes
                breakfast, keynotes, wellness and educational breakouts,
                networking, lunch, and conversations designed to help widows
                navigate life after loss with greater confidence and support.
              </p>
            </div>
          </Reveal>

          <div className="ww-experience__grid">
            <figure className="ww-tile ww-tile--photo ww-tile--a">
              <Image
                src={EXP_A}
                alt="Widows talking and laughing together at an It's Lifey gathering"
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
                Whether you&apos;re newly widowed or years into your journey,
                this is a welcoming space to connect, learn, heal, and be
                reminded that you do not have to navigate widowhood alone.
              </p>
            </div>
            <figure className="ww-tile ww-tile--photo ww-tile--d">
              <Image
                src={EXP_C}
                alt="A quiet moment of connection outdoors"
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
                alt="Shared meal and conversation in soft evening light"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
              />
            </figure>
            <div className="ww-tile ww-tile--copy ww-tile--h">
              <strong>What the day includes</strong>
              <p>
                Keynotes · Interactive wellness breakouts · Breakfast &amp;
                shared lunch · Networking · Practical tools &amp; trusted
                resources · The Hope Mic Story Slam
              </p>
            </div>
            <figure className="ww-tile ww-tile--photo ww-tile--wide">
              <Image
                src={EXP_B}
                alt="Women gathered outdoors in soft natural light"
                fill
                sizes="100vw"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 5. Full-bleed photographic break */}
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
          Come alone. You won&apos;t be alone for long.
        </p>
      </section>

      {/* 6. Kelley Lynn */}
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
                <p className="ww-host__role">
                  Mocktail Hour · November 13
                </p>
                <p className="ww-body" style={{ marginTop: "1.25rem" }}>
                  VIP guests gather the evening before for an intimate mocktail
                  hour featuring widow, comedian, TEDx speaker, author, and
                  grief advocate Kelley Lynn. Expect laughter, honesty,
                  connection, and hope — a powerful night before the main
                  event.
                </p>
                <p className="ww-body">
                  Kelley became a leading voice in grief support. Her TEDx talk,
                  &ldquo;When Someone You Love Dies, There is No Such Thing as
                  Moving On,&rdquo; has reached millions. Her book,{" "}
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

      {/* 7. Event Flow */}
      <section className="ww-flow" aria-labelledby="ww-flow-heading">
        <div className="ww-shell">
          <Reveal>
            <div className="ww-flow__intro">
              <p className="ww-eyebrow">Your day, step by step</p>
              <h2 id="ww-flow-heading" className="ww-flow__title">
                Event Flow
              </h2>
              <p className="ww-flow__lede">
                November 13–14 at Presence &amp; Co. — an optional VIP evening,
                a full day of connection and wellness, and a closing that
                belongs to the women in the room.
              </p>
            </div>
          </Reveal>

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
                <h3 className="ww-flow__row-title">Lunch &amp; Connection</h3>
                <ul className="ww-flow__list">
                  <li>Shared lunch</li>
                  <li>Sponsor and resource table visits</li>
                  <li>
                    Time for widows to connect in a relaxed, supportive setting
                  </li>
                </ul>
              </article>

              <article className="ww-flow__row">
                <p className="ww-flow__when">Afternoon · ~2 p.m.</p>
                <h3 className="ww-flow__row-title">Afternoon Program</h3>
                <ul className="ww-flow__list">
                  <li>Afternoon keynote</li>
                  <li>Wellness breakout sessions · approximately 2 p.m.</li>
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
                  The Hope Mic Story Slam · Stories of Experience, Strength
                  &amp; Hope
                </h3>
                <div className="ww-flow__prose">
                  <p>
                    The day will close with The Hope Mic Story Slam — an open
                    invitation for widows to share their stories in a
                    supportive, judgment-free space.
                  </p>
                  <p>
                    Each speaker will have 3 minutes to share a piece of their
                    experience, strength, and hope — whether it&apos;s a moment
                    of grief, love, humor, survival, rebuilding, or what life
                    after loss has taught them.
                  </p>
                  <p>
                    This closing event honors the truth that every widow has a
                    story, and that sharing those stories can be healing for the
                    person speaking and for every woman listening.
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
      </section>

      {/* 8. Registration */}
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
                  share a few details, and you&apos;ll be taken to secure Stripe
                  checkout to complete payment. We&apos;ll also email you the
                  link — your spot isn&apos;t confirmed until payment is
                  received.
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
                      Whether you&apos;re joining for the full day or adding the
                      VIP evening with Kelley Lynn, you&apos;ll step into a
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
                    <strong>VIP — $169</strong>
                    <p>
                      Mocktail hour with Kelley Lynn on November 13, plus the
                      full main event on November 14.
                    </p>
                  </div>
                  <div className="ww-register__tier">
                    <strong>General Admission — $129</strong>
                    <p>
                      The full main event — welcome, keynotes, breakouts, lunch,
                      and The Hope Mic Story Slam.
                    </p>
                  </div>
                </div>

                <p className="ww-body" style={{ marginTop: "1.35rem" }}>
                  Newly widowed or years into your journey — you belong here.
                  Come as you are. Leave with practical tools, trusted
                  resources, and the quiet relief of women who understand
                  without you having to explain.
                </p>
                <p className="ww-body" style={{ marginTop: "0.85rem" }}>
                  Questions before you register? Reach out at{" "}
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

      {/* 9. Breakout leaders */}
      <section
        className="ww-leaders"
        aria-labelledby="ww-leaders-heading"
      >
        <div className="ww-shell">
          <Reveal>
            <p className="ww-eyebrow">Session leaders</p>
            <h2 id="ww-leaders-heading" className="ww-leaders__title">
              Introducing the Breakout Session Leaders
            </h2>
          </Reveal>

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
        </div>
      </section>

      {/* 10. Sponsorship CTA */}
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
