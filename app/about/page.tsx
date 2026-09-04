import type { Metadata } from "next";
import Image from "next/image";
import { HeroImage } from "@/components/HeroImage";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";

export const metadata: Metadata = {
  title: "About Jennifer & It's Lifey",
  description:
    "Jennifer shares how widowhood shaped It's Lifey and HopeHub—real story, real community, and support for widows who crave connection and compassion.",
};

const HERO = "/images/hero2.webp";

export default function AboutPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="about-hero-heading"
      >
        <div className="ed-hero__media reveal-media">
          <HeroImage
            src={HERO}
            alt="Jennifer, founder of It's Lifey, in a bright kitchen"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 52%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">It&apos;s Lifey</p>
            <h1 id="about-hero-heading" className="ed-title">
              <ClipReveal delay={0}>About Jennifer</ClipReveal>
            </h1>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell">
          <p className="ed-kicker">Our story</p>
          <h2 className="ed-section-title">
            <ClipReveal delay={0}>Hi, I&apos;m Jen.</ClipReveal>
            <ClipReveal delay={80}>In May 2024, I became a widow.</ClipReveal>
          </h2>
          <p className="ed-pull">
            And I have learned, connection is lifesaving.
          </p>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-body ed-body--ink">
              My husband and I were on a dream trip to Greece when, on the
              fourth night of our vacation, he unexpectedly had a heart attack
              and died in our hotel room. I came home alone, a widow, suddenly
              responsible for navigating grief, logistics, and the emotional
              fallout of a blended family trying to make sense of something
              senseless.
            </p>
            <p className="ed-body" style={{ marginTop: "1.15rem" }}>
              That loss broke me open, but it also stripped life down to its
              truth: connection is lifesaving. I had already weathered divorce,
              blended family challenges, heartbreak, and addiction in my orbit —
              but widowhood brought a level of loneliness nothing prepared me
              for. What helped wasn&apos;t clichés or advice; it was real
              conversations with real people who understood.
            </p>
          </div>
          <figure className="ed-split__media ed-split__media--tall m-0">
            <Image
              src="/images/jenabout1.jpg"
              alt="Jennifer dancing with her husband at a celebration"
              fill
              sizes="(max-width: 960px) 100vw, 48vw"
            />
          </figure>
        </div>
      </section>

      <section className="ed-section ed-section--blush">
        <div className="ed-shell">
          <blockquote className="ed-quote">
            <p>
              There is no greater agony than bearing an untold story inside you.
            </p>
            <cite>Maya Angelou</cite>
          </blockquote>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-split ed-split--flip">
          <div>
            <p className="ed-kicker">Why It&apos;s Lifey exists</p>
            <h2 className="ed-section-title">
              I decided I would not grieve in silence.
            </h2>
            <p className="ed-body" style={{ marginTop: "1.25rem" }}>
              I would tell my story as it is — raw, honest, and human — so
              others wouldn&apos;t feel so alone in theirs. That calling became
              It&apos;s Lifey and HopeHub, a community for widows who crave
              connection, compassion, and a place to land when everything feels
              heavy.
            </p>
            <p className="ed-body" style={{ marginTop: "1.15rem" }}>
              Through virtual support groups, expert-guided conversations,
              healing retreats, and one-on-one connection, I&apos;m building the
              thing I desperately needed: a home for widows to feel seen,
              supported, and surrounded.
            </p>
            <p className="ed-pull">
              Loneliness is brutal — but community heals.
            </p>
          </div>
          <figure className="ed-split__media ed-split__media--tall m-0">
            <Image
              src="/images/jenabout2.jpg"
              alt="Jennifer smiling in soft light"
              fill
              sizes="(max-width: 960px) 100vw, 48vw"
            />
          </figure>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell">
          <div className="ed-founder">
            <div>
              <p className="ed-kicker">Founder</p>
              <h2 className="ed-section-title">Jen Newberg</h2>
              <p className="ed-body" style={{ marginTop: "1.25rem" }}>
                Jen is a communications and partnerships executive in both the
                for-profit and non-profit space, with experience leading
                mission-driven campaigns for brands like T-Mobile, Purina, Dove,
                Planet Fitness and more. Her superpower is connecting people, and
                she specializes in building authentic, value-based connections.
              </p>
              <p className="ed-body" style={{ marginTop: "1.1rem" }}>
                Drawing from her own journey through life transitions — and the
                loss of her husband in 2024 — Jen founded It&apos;s Lifey to
                ensure that no widow ever has to feel alone. She believes
                there&apos;s no playbook for life, but with community and shared
                experience, we can find our way through.
              </p>
              <div style={{ marginTop: "1.75rem" }}>
                <Link href="/resources" className="il-btn il-btn--solid">
                  Explore Resources
                  <span aria-hidden className="il-btn__arrow">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <figure className="ed-founder__media m-0">
              <Image
                src="/images/jen4.jpg"
                alt="Jennifer, founder of It's Lifey"
                fill
                sizes="(max-width: 900px) 100vw, 22rem"
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
