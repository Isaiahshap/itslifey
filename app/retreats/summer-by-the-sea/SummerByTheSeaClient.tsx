"use client";

import { ClipReveal } from "@/components/ClipReveal";
import { HeroImage } from "@/components/HeroImage";
import { SummerByTheSeaInterestForm } from "@/components/SummerByTheSeaInterestForm";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import "./summer-by-the-sea.css";

function delayStyle(ms: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${ms}ms` };
}

const HERO_IMAGES = [
  {
    src: "/images/Retreats/Summer2025/IMG_1698.webp",
    position: "center 48%",
  },
  {
    src: "/images/Retreats/Summer2025/IMG_1856.webp",
    position: "center 42%",
  },
  {
    src: "/images/Retreats/Summer2025/IMG_0683.webp",
    position: "center 68%",
  },
] as const;

const HOUSE = "/images/Retreats/Summer2026/Summer Retreat House.webp";
const BREAK = "/images/Retreats/Summer2025/IMG_0683.webp";

const GALLERY = [
  {
    src: "/images/Retreats/Summer2026/Summer retreat House 2.webp",
    alt: "Aerial view of the white Cape Cod retreat house among the trees",
    className: "sbs-gallery__item--a",
    position: "center",
  },
  {
    src: "/images/Retreats/Summer2026/Summer Retreat House 6.webp",
    alt: "Quiet bedroom with a white quilt in the retreat house",
    className: "sbs-gallery__item--b",
    position: "center 40%",
  },
  {
    src: "/images/Retreats/Summer2026/Summer Retreat House 7.webp",
    alt: "Long outdoor dining table on the stone patio of the coastal house",
    className: "sbs-gallery__item--c",
    position: "center",
  },
  {
    src: "/images/Retreats/Summer2025/IMG_1908.webp",
    alt: "Women in a gentle standing practice on the lawn during a past summer retreat",
    className: "sbs-gallery__item--d",
    position: "center 42%",
  },
  {
    src: "/images/Retreats/Summer2025/IMG_1869.webp",
    alt: "Women gathered around an outdoor table during a past summer retreat",
    className: "sbs-gallery__item--e",
    position: "center 40%",
  },
  {
    src: "/images/Retreats/Summer2025/IMG_1856.webp",
    alt: "A group of women walking the gardens together on a past summer retreat",
    className: "sbs-gallery__item--wide",
    position: "center 45%",
  },
] as const;

const INCLUDES = [
  {
    name: "A private coastal home",
    copy: "A beautiful house with room to unwind, gather, and be off the clock. Comfort, intimacy, and nowhere you have to be.",
  },
  {
    name: "A day on Martha's Vineyard",
    copy: "The island, unhurried. Time to wander, take it in, and come home with a story.",
  },
  {
    name: "A spa experience",
    copy: "Rest, recharge, and let someone else take care of you. This part is simply for your body.",
  },
  {
    name: "Private chef dining",
    copy: "Good food, and the conversations that happen when the table is set and the evening is open.",
  },
  {
    name: "What's next",
    copy: "Gentle structure, alongside the fun, for the question so many widows carry: who am I now, and where do I want to go?",
  },
  {
    name: "Women who get it",
    copy: "Shared laughter, honest talk, a few tears, and friendships that last long after you go home.",
  },
] as const;

function scrollToInterest() {
  document.getElementById("sbs-interest")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function scrollToIncludes() {
  document.getElementById("sbs-includes")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function SummerByTheSeaClient() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: "Summer by the Sea",
      content_category: "Retreat",
    });
  }, []);

  return (
    <div className="sbs">
      <section
        className="sbs-hero"
        data-entrance="hero"
        aria-labelledby="sbs-hero-heading"
      >
        <div className="sbs-hero__media reveal-media" style={delayStyle(160)}>
          {HERO_IMAGES.map((image, i) => (
            <motion.div
              key={image.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: heroIndex === i ? 1 : 0 }}
              transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] as const }}
              aria-hidden={i === 0 ? undefined : true}
            >
              <HeroImage
                src={image.src}
                alt={
                  i === 0
                    ? "Women gathered in a glass-walled room during a past It's Lifey summer retreat"
                    : ""
                }
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: image.position }}
              />
            </motion.div>
          ))}
        </div>
        <div className="sbs-hero__veil" aria-hidden />
        <div className="sbs-hero__content">
          <p className="sbs-hero__brand reveal-label" style={delayStyle(180)}>
            It&apos;s Lifey · Summer Retreat 2027
          </p>
          <h1 id="sbs-hero-heading" className="sbs-hero__title">
            <ClipReveal delay={0}>Summer</ClipReveal>
            <span className="il-em">
              <ClipReveal delay={80}>by the Sea</ClipReveal>
            </span>
          </h1>
          <p className="sbs-hero__lede reveal-up" style={delayStyle(260)}>
            Come alone. Leave with lifelong friends.
          </p>
          <div className="sbs-hero__meta reveal-up" style={delayStyle(300)}>
            <span>July 9–12, 2027</span>
            <span>Cape Cod, Massachusetts</span>
            <span>Four days</span>
            <span>A private coastal home</span>
          </div>
          <div className="sbs-hero__actions reveal-up" style={delayStyle(340)}>
            <button
              type="button"
              className="il-btn il-btn--solid"
              onClick={scrollToInterest}
            >
              Share your interest
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </button>
            <button
              type="button"
              className="il-btn il-btn--ghost-dark"
              onClick={scrollToIncludes}
            >
              What&apos;s included
              <span aria-hidden className="il-btn__arrow">
                ↓
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="sbs-intro" aria-labelledby="sbs-intro-heading">
        <div className="sbs-shell">
          <div data-reveal="" className="reveal-up">
            <div className="sbs-intro__grid">
              <div>
                <p className="sbs-eyebrow">Cape Cod · July 9–12, 2027</p>
                <h2 id="sbs-intro-heading" className="sbs-intro__title">
                  <ClipReveal delay={0}>Four days</ClipReveal>
                  <ClipReveal delay={80}>on the Cape.</ClipReveal>
                </h2>
                <p className="sbs-intro__pull">
                  Some experiences you just have to do again.
                </p>
              </div>
              <div className="sbs-intro__copy">
                <p className="sbs-body">
                  Our 2026 Cape Cod summer retreat was, in a word, magical.
                  Laughter, late-night conversations, adventures, and
                  friendships that didn&apos;t end when the weekend did.
                </p>
                <p className="sbs-body">
                  We&apos;re bringing that back July 9–12, 2027. Four days on
                  the Cape. Ocean air, sandy beaches, incredible food, and
                  women who just get it.
                </p>
                <p className="sbs-body sbs-body--strong">
                  You don&apos;t have to explain yourself here.
                </p>
                <button
                  type="button"
                  className="il-btn il-btn--solid"
                  style={{ marginTop: "0.4rem" }}
                  onClick={scrollToInterest}
                >
                  Share your interest
                  <span aria-hidden className="il-btn__arrow">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sbs-story" aria-labelledby="sbs-story-heading">
        <div className="sbs-shell">
          <div className="sbs-story__grid">
            <figure className="sbs-story__media reveal-media" data-reveal="">
              <Image
                src={HOUSE}
                alt="Sunlit living room with a wall of wood-framed windows in the Cape Cod retreat house"
                fill
                sizes="(max-width: 980px) 100vw, 52vw"
              />
            </figure>
            <div data-reveal="" className="reveal-up sbs-story__copy">
              <p className="sbs-eyebrow">A little different this time</p>
              <h2 id="sbs-story-heading" className="sbs-story__title">
                <ClipReveal delay={0}>What&apos;s next</ClipReveal>
                <ClipReveal delay={80}>for me?</ClipReveal>
              </h2>
              <p className="sbs-body">
                You&apos;ll stay in a private coastal home, with meals from a
                private chef, a spa experience, and a day on Martha&apos;s
                Vineyard. The details are handled, so you can put ordinary
                responsibilities down.
              </p>
              <p className="sbs-body">
                This time, there&apos;s a new thread running through the days.
                Alongside the beach, the spa, and time that is simply for fun,
                we&apos;ll work with a partner — still to be announced — who
                helps women build a life led by choice, not only by what has
                happened.
              </p>
              <p className="sbs-body">
                For so many of us, including Jennifer, when a partner dies, a
                part of our identity goes too. The retreat holds both: being
                taken care of, and a gentle way to ask what&apos;s next.
              </p>
              <p className="sbs-body sbs-body--strong">
                Grief is part of your story. It doesn&apos;t have to be the
                whole story.
              </p>
              <button
                type="button"
                className="il-btn il-btn--solid"
                style={{ marginTop: "0.4rem" }}
                onClick={scrollToInterest}
              >
                Share your interest
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="sbs-includes"
        className="sbs-includes"
        aria-labelledby="sbs-includes-heading"
      >
        <div className="sbs-shell">
          <div data-reveal="" className="reveal-up">
            <p className="sbs-eyebrow">What awaits you</p>
            <h2 id="sbs-includes-heading" className="sbs-includes__title">
              Four days, fully taken care of
            </h2>
            <p className="sbs-includes__lede">
              A private home, a day on the island, and women who understand
              without an explanation.
            </p>
          </div>
          <ul className="sbs-includes__list">
            {INCLUDES.map((item) => (
              <li key={item.name} className="sbs-include">
                <h3 className="sbs-include__name">{item.name}</h3>
                <p className="sbs-include__copy">{item.copy}</p>
              </li>
            ))}
          </ul>
          <div className="sbs-includes__cta">
            <button
              type="button"
              className="il-btn il-btn--solid"
              onClick={scrollToInterest}
            >
              Share your interest
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="sbs-break reveal-media" data-reveal="">
        <Image src={BREAK} alt="" fill sizes="100vw" />
        <div className="sbs-break__veil" aria-hidden />
        <blockquote className="sbs-break__quote">
          Come for the ocean. Stay for the connection.
        </blockquote>
      </section>

      <section className="sbs-place" aria-labelledby="sbs-place-heading">
        <div className="sbs-shell">
          <div data-reveal="" className="reveal-up">
            <p className="sbs-eyebrow">Cape Cod</p>
            <h2 id="sbs-place-heading" className="sbs-place__title">
              The house, the days, the women
            </h2>
          </div>
          <div className="sbs-gallery reveal-media" data-reveal="">
            {GALLERY.map((image) => (
              <figure key={image.src} className={`sbs-gallery__item ${image.className}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  style={{ objectPosition: image.position }}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sbs-community" aria-labelledby="sbs-community-heading">
        <div className="sbs-shell">
          <div className="sbs-community__layout">
            <div data-reveal="" className="reveal-up">
              <p className="sbs-eyebrow">More than a retreat</p>
              <h2 id="sbs-community-heading" className="sbs-community__title">
                <ClipReveal delay={0}>You don&apos;t have to</ClipReveal>
                <ClipReveal delay={80}>arrive figured out.</ClipReveal>
              </h2>
            </div>
            <div data-reveal="" className="reveal-up sbs-community__copy">
              <p className="sbs-body">
                You don&apos;t need to be at a particular stage of grief. You
                don&apos;t need to have it all figured out. And you don&apos;t
                need to know anyone before you arrive.
              </p>
              <p className="sbs-body">
                Our retreats aren&apos;t about fixing grief or moving on.
                They&apos;re about discovering that life can still hold joy,
                adventure, laughter, and meaningful connection.
              </p>
              <p className="sbs-body">
                We&apos;re bringing back what made 2026 so special. The true
                magic still can&apos;t be planned. It shows up in the
                unexpected friendships, the belly laughs, the tears, and the
                feeling of being completely understood.
              </p>
              <p className="sbs-body sbs-body--strong">
                Come alone. You won&apos;t be alone for long. Space is
                intentionally limited, so the group stays intimate.
              </p>
              <button
                type="button"
                className="il-btn il-btn--solid"
                style={{ marginTop: "0.45rem" }}
                onClick={scrollToInterest}
              >
                Share your interest
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="sbs-interest"
        className="sbs-register"
        aria-labelledby="sbs-register-heading"
      >
        <div className="sbs-shell">
          <div className="sbs-register__grid">
            <div data-reveal="" className="reveal-up">
              <p className="sbs-eyebrow">Interest list</p>
              <h2 id="sbs-register-heading" className="sbs-register__title">
                <ClipReveal delay={0}>Share your</ClipReveal>
                <ClipReveal delay={80}>interest</ClipReveal>
              </h2>
              <p className="sbs-body" style={{ marginTop: "1.25rem" }}>
                Tell us you&apos;d like to come. No payment today. We&apos;ll
                follow up by email as the details and registration open.
              </p>
              <p className="sbs-body" style={{ marginTop: "1rem" }}>
                July 9–12, 2027 · Cape Cod, Massachusetts. Intimate by design.
              </p>
              <p className="sbs-body" style={{ marginTop: "1rem" }}>
                Questions?{" "}
                <a href="mailto:jennifer@itslifey.com" className="sbs-link">
                  jennifer@itslifey.com
                </a>
              </p>
              <p className="sbs-register__links">
                <Link href="/retreats/winter-widow-wellness" className="sbs-link">
                  Winter Retreat
                </Link>
                <Link href="/retreats/spring-retreat-2027" className="sbs-link">
                  Spring Retreat
                </Link>
                <Link
                  href="/events/widow-wellness-connection-experience"
                  className="sbs-link"
                >
                  November event
                </Link>
                <Link href="/retreats/past" className="sbs-link">
                  Past retreats
                </Link>
              </p>
            </div>
            <div className="sbs-register__form">
              <SummerByTheSeaInterestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="sbs-close" data-reveal="" aria-labelledby="sbs-close-heading">
        <div className="sbs-shell reveal-up">
          <h2 id="sbs-close-heading" className="sbs-close__title">
            <ClipReveal delay={0}>Come alone.</ClipReveal>
            <span className="il-em">
              <ClipReveal delay={80}>Leave with lifelong friends.</ClipReveal>
            </span>
          </h2>
          <p className="sbs-close__copy">
            July 9–12, 2027, on Cape Cod. Four days of rest, ocean, and women
            who understand.
          </p>
          <button type="button" className="il-btn il-btn--on-dark" onClick={scrollToInterest}>
            Share your interest
            <span aria-hidden className="il-btn__arrow">
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
