"use client";

import Image from "next/image";
import { HeroImage } from "@/components/HeroImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ClipReveal } from "@/components/ClipReveal";
import { NewsletterSignupForm } from "@/components/NewsletterSignupForm";
import {
  computeHeroHeadlineFontSizePx,
  HERO_HEADLINE_LINE_HEIGHT_RATIO,
} from "@/lib/heroHeadlineFont";
import {
  EVENT_DATES,
  EVENT_LOCATION,
  EVENT_PATH,
  EVENT_SHORT_TAGLINE,
  SPONSORSHIP_PATH,
} from "@/lib/widow-wellness-event";
import "./home.css";

const HERO_IMAGES = [
  "/images/widowwellnessimages/IMG_0604.jpeg",
  "/images/widowwellnessimages/IMG_2517.jpeg",
  "/images/widowwellnessimages/IMG_3180.jpeg",
  "/images/widowwellnessimages/IMG_4386.jpeg",
  "/images/widowwellnessimages/IMG_4575.jpeg",
  "/images/widowwellnessimages/IMG_8510.jpeg",
] as const;

/** One-day gathering energy — communal tables, real connection. */
const EVENT_SHOWCASE_IMAGES = [
  "/images/widowwellnessimages/IMG_2517.jpeg",
  "/images/widowwellnessimages/IMG_4386.jpeg",
  "/images/widowwellnessimages/IMG_0604.jpeg",
] as const;

const PATHWAY_THUMBS = {
  hopehub: "/images/widowwellnessimages/IMG_3180.jpeg",
  event: "/images/widowwellnessimages/IMG_2517.jpeg",
  winter: "/images/winter/winter-retreat-10.jpg",
  spring: "/images/Retreats/Summer2025/IMG_1698.webp",
} as const;

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@ItsLifey-co";

const YOUTUBE_CONVERSATIONS = [
  {
    id: "i-ifgGkIskI",
    title: "Finding community after loss",
    guest: "SJ Hodges",
  },
  {
    id: "Ed-S6C8pIOY",
    title: "Grief, Gratitude & Healing",
    guest: "Dr. Peggy DeLong",
  },
  {
    id: "xRS5QOZPxl0",
    title: "End of Life Planning",
    guest: "Guest speakers",
  },
  {
    id: "d5lqHsTRgcM",
    title: "Navigating Finances After Loss",
    guest: "Deborah Cartisser",
  },
  {
    id: "bZHfbL5YXtY",
    title: "Compassion-Focused Therapy",
    guest: "Lenore Mewton",
  },
  {
    id: "51RdueWbby8",
    title: "Your Story Matters",
    guest: "Mark Carpenter",
  },
] as const;

function delayStyle(ms: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${ms}ms` };
}

function CtaArrow() {
  return (
    <span aria-hidden className="il-btn__arrow">
      →
    </span>
  );
}

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [eventShowcaseIndex, setEventShowcaseIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const [heroHeadlinePx, setHeroHeadlinePx] = useState<number | undefined>(
    undefined,
  );

  useLayoutEffect(() => {
    const el = heroCopyRef.current;
    if (!el) return;

    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w < 1) return;
      setHeroHeadlinePx(computeHeroHeadlineFontSizePx(w));
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setEventShowcaseIndex((i) => (i + 1) % EVENT_SHOWCASE_IMAGES.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const activeVideo = YOUTUBE_CONVERSATIONS[videoIndex];

  return (
    <div className="home">
      {/* ——— HERO ——— */}
      <section
        className="home-hero"
        data-entrance="hero"
        aria-labelledby="hero-heading"
      >
        <div
          className="home-hero__media reveal-media"
          style={delayStyle(160)}
        >
          {HERO_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="home-hero__slide"
              initial={false}
              animate={{ opacity: heroIndex === i ? 1 : 0 }}
              transition={{ duration: 3.2, ease: [0.45, 0, 0.55, 1] as const }}
            >
              <HeroImage
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          ))}
          <div className="home-hero__veil" aria-hidden />
        </div>

        <div className="home-hero__inner">
          <div ref={heroCopyRef} className="home-hero__panel">
            <p className="home-hero__brand reveal-label" style={delayStyle(180)}>
              It&apos;s Lifey
            </p>
            <p
              className="home-hero__eyebrow reveal-label"
              style={delayStyle(180)}
            >
              By a widow, for widows
            </p>
            <h1
              id="hero-heading"
              className="home-hero__title"
              style={
                heroHeadlinePx !== undefined
                  ? {
                      fontSize: Math.min(heroHeadlinePx, 46),
                      lineHeight: HERO_HEADLINE_LINE_HEIGHT_RATIO,
                    }
                  : {
                      fontSize: "clamp(1.85rem, 4.5vw, 2.85rem)",
                      lineHeight: HERO_HEADLINE_LINE_HEIGHT_RATIO,
                    }
              }
            >
              <ClipReveal delay={0}>
                A place for widows to feel{" "}
                <span className="il-em il-em--inline">supported, understood,</span>
              </ClipReveal>
              <span className="il-em">
                <ClipReveal delay={100}>and less alone.</ClipReveal>
              </span>
            </h1>
            <p className="home-hero__lede reveal-up" style={delayStyle(260)}>
              Support, retreats, and community for widows navigating life after
              loss.
            </p>
            <div
              className="home-hero__actions reveal-up"
              style={delayStyle(340)}
            >
              <Link href={EVENT_PATH} className="il-btn il-btn--solid">
                Join the event
                <CtaArrow />
              </Link>
              <Link
                href="/retreats/winter-widow-wellness"
                className="il-btn il-btn--ghost-light"
              >
                Winter Retreat 2027
                <CtaArrow />
              </Link>
            </div>
          </div>
        </div>

        <a
          href="#home-highlights"
          className="home-hero__scroll reveal-up"
          style={delayStyle(420)}
          aria-label="Scroll to next section"
        >
          <span aria-hidden>↓</span>
        </a>
      </section>

      {/* ——— HIGHLIGHTS ——— */}
      <section
        id="home-highlights"
        className="home-highlights"
        aria-label="Ways to begin"
      >
        <div className="home-highlights__grid home-highlights__grid--duo" data-reveal="">
          <Link
            href={EVENT_PATH}
            className="home-highlight reveal-up"
            style={delayStyle(0)}
          >
            <p className="home-highlight__kicker">One-day gathering</p>
            <h2 className="home-highlight__title">
              Join the Widow Connection Event
            </h2>
            <div className="home-highlight__meta">
              <span className="home-highlight__arrow" aria-hidden>
                →
              </span>
              <span className="home-highlight__thumb">
                <Image
                  src={EVENT_SHOWCASE_IMAGES[0]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </span>
            </div>
          </Link>

          <Link
            href="/retreats/winter-widow-wellness"
            className="home-highlight reveal-up"
            style={delayStyle(80)}
          >
            <p className="home-highlight__kicker">Winter Retreat 2027</p>
            <h2 className="home-highlight__title">
              Join the Winter Widow Wellness Retreat
            </h2>
            <div className="home-highlight__meta">
              <span className="home-highlight__arrow" aria-hidden>
                →
              </span>
              <span className="home-highlight__thumb">
                <Image
                  src={PATHWAY_THUMBS.winter}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ——— ABOUT ——— */}
      <section className="home-section" aria-labelledby="welcome-heading">
        <div className="home-shell home-split" data-reveal="">
          <div className="home-split__media reveal-media" style={delayStyle(40)}>
            <Image
              src="/images/jen3.jpg"
              alt="Jennifer, founder of It's Lifey, smiling warmly in soft natural light"
              fill
              className="object-cover"
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </div>
          <div className="reveal-up" style={delayStyle(120)}>
            <p className="home-kicker">Our story</p>
            <h2 id="welcome-heading" className="home-title">
              <ClipReveal delay={0}>Welcome to the</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={80}>It&apos;s Lifey Family</ClipReveal>
              </span>
            </h2>
            <div className="home-copy">
              <p>
                If you&apos;ve ever wondered where the playbook for life is —
                it&apos;s in the wisdom of those who have lived it. And for
                widows, that wisdom is hard-earned.
              </p>
              <p>
                Join a community built by a widow who understands. You&apos;re
                not alone — and you don&apos;t have to take the next step by
                yourself.
              </p>
            </div>
            <Link href="/about" className="il-link">
              Learn more
              <CtaArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— EVENT FEATURE ——— */}
      <section
        id="support-paths"
        className="home-section home-section--pink"
        aria-labelledby="event-heading"
      >
        <div className="home-shell home-split home-split--flip" data-reveal="">
          <div className="home-split__media reveal-media" style={delayStyle(40)}>
            {EVENT_SHOWCASE_IMAGES.map((src, i) => (
              <motion.div
                key={src}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: eventShowcaseIndex === i ? 1 : 0,
                }}
                transition={{
                  duration: 2.4,
                  ease: [0.45, 0, 0.55, 1] as const,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 960px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
          <div className="reveal-up" style={delayStyle(120)}>
            <p className="home-kicker">
              Widow Wellness &amp; Connection Experience
            </p>
            <h2 id="event-heading" className="home-title">
              <ClipReveal delay={0}>Join the event</ClipReveal>
            </h2>
            <p className="home-copy">
              A one-day gathering for widows across New England — inspiration,
              education, healing, and women who truly understand.{" "}
              {EVENT_SHORT_TAGLINE}
            </p>
            <p className="home-meta">
              {EVENT_DATES} · {EVENT_LOCATION}
            </p>
            <div className="home-actions">
              <Link href={EVENT_PATH} className="il-btn il-btn--on-dark">
                Join the event
                <CtaArrow />
              </Link>
              <Link
                href={SPONSORSHIP_PATH}
                className="il-btn il-btn--ghost-dark"
              >
                Sponsor the event
                <CtaArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— PATHWAYS ——— */}
      <section
        className="home-section home-section--blush"
        aria-labelledby="pathways-heading"
      >
        <div className="home-shell home-split" data-reveal="">
          <div className="reveal-up" style={delayStyle(0)}>
            <p className="home-kicker">Ways to begin</p>
            <h2 id="pathways-heading" className="home-title">
              <ClipReveal delay={0}>Support that meets you</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={80}>where you are</ClipReveal>
              </span>
            </h2>
            <p className="home-copy">
              Whether you want community from home, a one-day gathering, or a
              longer retreat — there is a gentle next step here.
            </p>
          </div>
          <div className="home-pathways" role="list">
            <div
              className="reveal-up"
              style={delayStyle(60)}
              role="listitem"
            >
              <Link href="/hopehub" className="home-pathway">
                <span className="home-pathway__thumb">
                  <Image
                    src={PATHWAY_THUMBS.hopehub}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </span>
                <p className="home-pathway__title">HopeHub free community</p>
                <span className="home-pathway__arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
            <div
              className="reveal-up"
              style={delayStyle(120)}
              role="listitem"
            >
              <Link href={EVENT_PATH} className="home-pathway">
                <span className="home-pathway__thumb">
                  <Image
                    src={PATHWAY_THUMBS.event}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </span>
                <p className="home-pathway__title">
                  Widow Wellness &amp; Connection Experience
                </p>
                <span className="home-pathway__arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
            <div
              className="reveal-up"
              style={delayStyle(180)}
              role="listitem"
            >
              <Link
                href="/retreats/winter-widow-wellness"
                className="home-pathway"
              >
                <span className="home-pathway__thumb">
                  <Image
                    src={PATHWAY_THUMBS.winter}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </span>
                <p className="home-pathway__title">Winter Retreat 2027</p>
                <span className="home-pathway__arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
            <div
              className="reveal-up"
              style={delayStyle(240)}
              role="listitem"
            >
              <Link
                href="/retreats/spring-retreat-2027"
                className="home-pathway"
              >
                <span className="home-pathway__thumb">
                  <Image
                    src={PATHWAY_THUMBS.spring}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </span>
                <p className="home-pathway__title">Spring Retreat 2027</p>
                <span className="home-pathway__arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— VIDEOS ——— */}
      <section className="home-videos" aria-labelledby="videos-heading">
        <div className="home-shell" data-reveal="">
          <div className="home-videos__intro reveal-up" style={delayStyle(0)}>
            <p className="home-kicker">Watch &amp; listen</p>
            <h2 id="videos-heading" className="home-title">
              <ClipReveal delay={0}>Conversations that</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={80}>understand</ClipReveal>
              </span>
            </h2>
            <p className="home-copy">
              Honest talks with experts and widows — on grief, planning,
              finances, therapy, and everyday life after losing a spouse.
            </p>
          </div>

          <div
            className="home-videos__stage reveal-media"
            style={delayStyle(100)}
          >
            <div className="home-videos__main">
              <div className="home-videos__frame">
                <div className="home-videos__frame-inner">
                  <iframe
                    key={activeVideo.id}
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0`}
                    title={`${activeVideo.title} | It's Lifey x ${activeVideo.guest}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>

              <div className="home-videos__now">
                <p className="home-videos__now-label">Now playing</p>
                <p className="home-videos__now-title">{activeVideo.title}</p>
                <p className="home-videos__now-guest">
                  It&apos;s Lifey × {activeVideo.guest}
                </p>
              </div>
            </div>

            <div
              className="home-videos__rail"
              role="tablist"
              aria-label="More conversations"
            >
              {YOUTUBE_CONVERSATIONS.map((video, i) => {
                const isActive = videoIndex === i;
                return (
                  <button
                    key={video.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setVideoIndex(i)}
                    className={`home-videos__side${isActive ? " is-active" : ""}`}
                  >
                    <span className="home-videos__side-thumb">
                      <Image
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </span>
                    <span className="home-videos__side-copy">
                      <span className="home-videos__side-title">
                        {video.title}
                      </span>
                      <span className="home-videos__side-guest">
                        {video.guest}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="home-videos__cta reveal-up" style={delayStyle(180)}>
            <p>
              Our YouTube channel has{" "}
              <strong>30+ videos</strong> of conversations and support — whenever
              you need something steady to listen to.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="il-btn il-btn--solid"
              style={{ marginTop: "1.25rem" }}
            >
              Watch more on YouTube
              <CtaArrow />
            </a>
          </div>
        </div>
      </section>

      {/* ——— EMAIL ——— */}
      <section className="home-email" aria-labelledby="email-heading">
        <div className="home-shell home-email__grid" data-reveal="">
          <div className="reveal-up" style={delayStyle(0)}>
            <p className="home-kicker">Newsletter</p>
            <h2 id="email-heading" className="home-title">
              <ClipReveal delay={0}>Soft updates,</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={80}>when you want them</ClipReveal>
              </span>
            </h2>
            <p className="home-copy">
              Occasional notes on gatherings, HopeHub, and support—never noisy,
              never salesy. Unsubscribe anytime.
            </p>
          </div>
          <div className="reveal-up" style={delayStyle(120)}>
            <NewsletterSignupForm variant="editorial" />
          </div>
        </div>
      </section>
    </div>
  );
}
