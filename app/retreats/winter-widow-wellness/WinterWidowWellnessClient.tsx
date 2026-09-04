"use client";

import { ClipReveal } from "@/components/ClipReveal";
import { WinterWidowWellnessEarlyBirdForm } from "@/components/WinterWidowWellnessEarlyBirdForm";
import Image from "next/image";
import { HeroImage } from "@/components/HeroImage";
import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import "./winter-widow-wellness.css";

function delayStyle(ms: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${ms}ms` };
}

const HERO = "/images/winter/winter-retreat-01.jpg";
const BREAK = "/images/winter/winter-retreat-05.jpg";
const STORY = "/images/winter/winter-retreat-02.jpg";
const GAL_A = "/images/winter/winter-retreat-08.jpg";
const GAL_B = "/images/winter/winter-retreat-04.jpg";
const GAL_C = "/images/winter/winter-retreat-07.jpg";
const GAL_D = "/images/winter/winter-retreat-03.jpg";
const GAL_E = "/images/winter/winter-retreat-10.jpg";
const GAL_F = "/images/winter/winter-retreat-06.jpg";

const INCLUDES = [
  {
    name: "Three Nights of Luxury",
    copy: "Gorgeous accommodations on a stunning 100-acre private property surrounded by the peaceful beauty of the Hudson Valley in winter.",
  },
  {
    name: "Your Own Private Chef",
    copy: "Beautiful meals prepared especially for us — because some of the best connections happen gathered around a table with great food and nowhere else to be.",
  },
  {
    name: "A Day of Spa & Pampering",
    copy: "A day devoted entirely to you. Spa treatments, relaxation, soaking, unwinding and the rare luxury of letting someone else take care of you.",
  },
  {
    name: "A Guided Winter Adventure",
    copy: "We'll bundle up for a specially curated, low-impact outdoor experience designed for beauty, fun, bonding and maybe stepping just a tiny bit outside our comfort zones — together.",
  },
  {
    name: "Cozy Winter Moments",
    copy: "Warm drinks. Soft blankets. Fireside conversations. Quiet mornings. Late-night laughter. And plenty of unscheduled time to simply hang out and connect.",
  },
] as const;

const TIMES = [
  "Time to talk about the hard stuff — or not talk about it at all.",
  "Time to laugh without guilt.",
  "Time to try something new.",
  "Time to be taken care of.",
  "Time to remember that life can still surprise you in really beautiful ways.",
] as const;

const ROOMS = [
  {
    room: "Private Room",
    price: "$4,200",
    availabilityWas: "10 available",
    availability: "7 available · Per person",
    soldOut: false,
  },
  {
    room: "Double Room",
    price: "$3,700",
    availabilityWas: null,
    availability: "1 available · Per person",
    soldOut: false,
  },
  {
    room: "Triple Room",
    price: "$3,200",
    availabilityWas: "1 available",
    availability: "Sold out",
    soldOut: true,
  },
] as const;

function scrollToInterest() {
  document.getElementById("wwr-early-bird")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function scrollToIncludes() {
  document.getElementById("wwr-includes")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function WinterWidowWellnessClient() {
  useEffect(() => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: "Winter Widow Wellness Retreat",
      content_category: "Retreat",
    });
  }, []);

  return (
    <div className="wwr">
      <section
        className="wwr-hero"
        data-entrance="hero"
        aria-labelledby="wwr-hero-heading"
      >
        <div className="wwr-hero__media reveal-media" style={delayStyle(160)}>
          <HeroImage
            src={HERO}
            alt="Bright great room with dining table, sofas, and floor-to-ceiling forest views"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="wwr-hero__veil" aria-hidden />
        <div className="wwr-hero__content">
          <p className="wwr-hero__brand reveal-label" style={delayStyle(180)}>
            It&apos;s Lifey · Winter Retreat 2027
          </p>
          <h1 id="wwr-hero-heading" className="wwr-hero__title">
            <ClipReveal delay={0}>Winter Widow</ClipReveal>
            <ClipReveal delay={80}>
              <em>Wellness</em> Retreat
            </ClipReveal>
          </h1>
          <p className="wwr-hero__lede reveal-up" style={delayStyle(260)}>
            Come as strangers. Leave as lifelong friends.
          </p>
          <div className="wwr-hero__meta reveal-up" style={delayStyle(300)}>
            <span>January 15–18, 2027</span>
            <span>Hudson Valley</span>
            <span>100-acre private property</span>
            <span>Three luxurious nights</span>
          </div>
          <div className="wwr-hero__actions reveal-up" style={delayStyle(340)}>
            <button type="button" className="wwr-btn" onClick={scrollToInterest}>
              Share your interest
            </button>
            <button
              type="button"
              className="wwr-btn wwr-btn--ghost"
              onClick={scrollToIncludes}
            >
              What&apos;s included
            </button>
          </div>
        </div>
      </section>

      <section className="wwr-intro" aria-labelledby="wwr-intro-heading">
        <div className="wwr-shell">
          <div data-reveal="" className="reveal-up">
            <div className="wwr-intro__grid">
              <div>
                <p className="wwr-eyebrow">Women who just get it</p>
                <h2 id="wwr-intro-heading" className="wwr-intro__title">
                  <ClipReveal delay={0}>Come as strangers.</ClipReveal>
                  <ClipReveal delay={80}>Leave as lifelong friends.</ClipReveal>
                </h2>
                <p className="wwr-intro__pull">
                  A life retreat for women who happen to be widows.
                </p>
              </div>
              <div className="wwr-intro__copy">
                <p className="wwr-body">
                  There is something incredibly powerful about being surrounded
                  by women who just get it — women who understand the
                  contradictions of widowhood. Missing him while moving forward.
                  Carrying heartbreak while finding hope. Grieving what was
                  while discovering who you are now. And yes, laughing, having
                  fun, and embracing the life that&apos;s still yours to live.
                </p>
                <p className="wwr-body">
                  At every It&apos;s Lifey retreat, women arrive as strangers
                  and leave connected — with new friendships, group chats, and
                  women they can turn to long after the retreat ends.
                </p>
                <p className="wwr-body">
                  This winter, we&apos;re bringing that magic to the Hudson
                  Valley — January 15–18, 2027 — with a little more luxury,
                  pampering, adventure, and fun.
                </p>
                <button
                  type="button"
                  className="wwr-btn"
                  style={{ marginTop: "1.5rem" }}
                  onClick={scrollToInterest}
                >
                  Share your interest
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wwr-escape" aria-labelledby="wwr-escape-heading">
        <div className="wwr-shell">
          <div data-reveal="" className="reveal-up">
            <div className="wwr-escape__grid">
              <figure className="wwr-escape__media reveal-media" data-reveal="">
                <Image
                  src={STORY}
                  alt="Open great room with long dining table, sofas, and floor-to-ceiling windows"
                  fill
                  sizes="(max-width: 900px) 100vw, 52vw"
                />
              </figure>
              <div className="wwr-escape__copy">
                <p className="wwr-eyebrow">Your winter escape</p>
                <h2 id="wwr-escape-heading" className="wwr-escape__title">
                  Three luxurious nights on 100 private acres
                </h2>
                <p className="wwr-body">
                  A small group of widows will escape together for three
                  luxurious nights on a breathtaking 100-acre private property
                  near New York&apos;s Hudson Valley.
                </p>
                <p className="wwr-body">
                  Think of gorgeous accommodations. A private chef. A full day
                  of spa and pampering. A guided winter adventure. Fireside
                  conversations. Beautiful meals. Cozy mornings. Late-night
                  laughter.
                </p>
                <p className="wwr-body wwr-body--strong">
                  And perhaps most importantly, time together.
                </p>
                <ul className="wwr-times">
                  {TIMES.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="wwr-body">
                  This isn&apos;t a retreat where you&apos;ll spend three days
                  sitting around talking about grief. It&apos;s a life retreat
                  for women who happen to be widows.
                </p>
                <p className="wwr-body">
                  There is always room for grief here. But there&apos;s just as
                  much room for friendship, adventure, laughter, rest, beauty
                  and joy.
                </p>
                <button
                  type="button"
                  className="wwr-btn"
                  style={{ marginTop: "1.5rem" }}
                  onClick={scrollToInterest}
                >
                  Share your interest
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="wwr-includes"
        className="wwr-includes"
        aria-labelledby="wwr-includes-heading"
      >
        <div className="wwr-shell">
          <div data-reveal="" className="reveal-up">
            <p className="wwr-eyebrow">What&apos;s waiting for you</p>
            <h2 id="wwr-includes-heading" className="wwr-includes__title">
              Your winter escape includes
            </h2>
            <p className="wwr-includes__lede">
              Luxury, pampering, adventure, and unhurried time with women who
              understand without explanation.
            </p>
          </div>

          <div className="wwr-includes__grid">
            {INCLUDES.map((item) => (
              <article key={item.name} className="wwr-include">
                <h3 className="wwr-include__name">{item.name}</h3>
                <p className="wwr-include__copy">{item.copy}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "2.25rem", textAlign: "center" }}>
            <button type="button" className="wwr-btn" onClick={scrollToInterest}>
              Share your interest
            </button>
          </div>
        </div>
      </section>

      <section className="wwr-break reveal-media" data-reveal="" aria-label="Emotional invitation">
        <Image
          src={BREAK}
          alt="Cozy lounge with twin stone fireplaces and a private bar"
          fill
          sizes="100vw"
        />
        <div className="wwr-break__veil" aria-hidden />
        <p className="wwr-break__quote">
          Come for the house, the chef, the spa — stay for the women.
        </p>
      </section>

      <section className="wwr-shell" aria-label="Retreat property">
        <div className="wwr-gallery reveal-media" data-reveal="">
          <figure className="wwr-gallery__item wwr-gallery__item--a">
            <Image
              src={GAL_A}
              alt="Private log lodge nestled among trees on the Hudson Valley property"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </figure>
          <figure className="wwr-gallery__item wwr-gallery__item--b">
            <Image
              src={GAL_B}
              alt="Bright luxury bedroom with four-poster bed and vaulted wood beams"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </figure>
          <figure className="wwr-gallery__item wwr-gallery__item--c">
            <Image
              src={GAL_C}
              alt="Private chef kitchen with dining table ready for shared meals"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </figure>
          <figure className="wwr-gallery__item wwr-gallery__item--d">
            <Image
              src={GAL_D}
              alt="Conversation seating facing a wall of windows into the trees"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </figure>
          <figure className="wwr-gallery__item wwr-gallery__item--e">
            <Image
              src={GAL_E}
              alt="Aerial view of the private Hudson Valley lodge and grounds"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </figure>
          <figure className="wwr-gallery__item wwr-gallery__item--wide">
            <Image
              src={GAL_F}
              alt="Wood-paneled game room with pool table and warm string lights"
              fill
              sizes="100vw"
            />
          </figure>
        </div>
      </section>

      <section className="wwr-pricing" aria-labelledby="wwr-pricing-heading">
        <div className="wwr-shell">
          <div data-reveal="" className="reveal-up">
            <p className="wwr-eyebrow">Retreat investment</p>
            <h2 id="wwr-pricing-heading" className="wwr-pricing__title">
              Space is intentionally limited
            </h2>
            <p className="wwr-pricing__lede">
              Your retreat investment includes three nights of accommodations,
              private chef-prepared meals, spa experience, guided winter
              excursion, curated wellness and pampering experiences, and all
              retreat programming.
            </p>
          </div>

          <div className="wwr-pricing__list">
            {ROOMS.map((tier) => (
              <article
                key={tier.room}
                className={`wwr-pricing__row${tier.soldOut ? " is-sold-out" : ""}`}
              >
                <p className="wwr-pricing__room">{tier.room}</p>
                <div className="wwr-pricing__amount">
                  <p className="wwr-pricing__price">{tier.price}</p>
                  <p className="wwr-pricing__save">Per person</p>
                </div>
                <p className="wwr-pricing__meta">
                  {tier.availabilityWas ? (
                    <>
                      <s className="wwr-pricing__was">{tier.availabilityWas}</s>{" "}
                    </>
                  ) : null}
                  <span
                    className={
                      tier.soldOut ? "wwr-pricing__sold-out" : undefined
                    }
                  >
                    {tier.availability}
                  </span>
                </p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button type="button" className="wwr-btn" onClick={scrollToInterest}>
              Share your interest
            </button>
          </div>
        </div>
      </section>

      <section className="wwr-colleen" aria-labelledby="wwr-need-heading">
        <div className="wwr-shell">
          <div data-reveal="" className="reveal-up">
            <p className="wwr-eyebrow">Why this matters</p>
            <h2 id="wwr-need-heading" className="wwr-colleen__title">
              Maybe you need this more than you realize
            </h2>
            <div className="wwr-need__copy">
              <p className="wwr-body">
                Widowhood can be incredibly lonely — even when you&apos;re
                surrounded by people who love you.
              </p>
              <p className="wwr-body">
                There is a different kind of comfort that comes from being with
                women who understand without explanation.
              </p>
              <p className="wwr-body">
                So come for the beautiful house, the chef, the spa, the
                adventure and the chance to escape winter for a few days. But
                come mostly for the women you&apos;ll meet there.
              </p>
              <p className="wwr-body wwr-body--strong">
                Because long after the retreat ends, that&apos;s the part you
                may treasure most.
              </p>
              <button
                type="button"
                className="wwr-btn"
                style={{ marginTop: "1.75rem" }}
                onClick={scrollToInterest}
              >
                Share your interest
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="wwr-early-bird"
        className="wwr-register"
        aria-labelledby="wwr-register-heading"
      >
        <div className="wwr-shell">
          <div className="wwr-register__grid">
            <div data-reveal="" className="reveal-up">
              <div>
                <p className="wwr-eyebrow">Reserve your spot</p>
                <h2 id="wwr-register-heading" className="wwr-register__title">
                  Share your interest
                </h2>
                <p className="wwr-body" style={{ marginTop: "1.15rem" }}>
                  Tell us you&apos;re interested below — no payment today.
                  We&apos;ll follow up by email to confirm your spot and answer
                  any questions.
                </p>
                <p className="wwr-body" style={{ marginTop: "1rem" }}>
                  Intimate by design. Once rooms fill, they&apos;re gone.
                </p>
                <p className="wwr-body" style={{ marginTop: "1rem" }}>
                  Questions?{" "}
                  <a href="mailto:jennifer@itslifey.com" className="wwr-link">
                    jennifer@itslifey.com
                  </a>
                  .
                </p>
                <p style={{ marginTop: "1.5rem" }}>
                  <Link href="/retreats/spring-retreat-2027" className="wwr-link">
                    Spring Retreat 2027 →
                  </Link>
                  {" · "}
                  <Link href="/retreats/past" className="wwr-link">
                    Past retreats
                  </Link>
                </p>
              </div>
            </div>

            <div className="wwr-register__form">
              <WinterWidowWellnessEarlyBirdForm />
            </div>
          </div>
        </div>
      </section>

      <section className="wwr-close" data-reveal="" aria-labelledby="wwr-close-heading">
        <div className="wwr-shell reveal-up">
          <h2 id="wwr-close-heading" className="wwr-close__title">
            <ClipReveal delay={0}>Come as strangers.</ClipReveal>
            <ClipReveal delay={80}>Leave as lifelong friends.</ClipReveal>
          </h2>
          <p className="wwr-close__copy">
            A winter escape for widows — luxury, rest, adventure, and women who
            understand without you having to explain.
          </p>
          <button type="button" className="wwr-btn" onClick={scrollToInterest}>
            Share your interest
          </button>
        </div>
      </section>
    </div>
  );
}
