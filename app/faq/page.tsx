import type { Metadata } from "next";
import Image from "next/image";
import { HeroImage } from "@/components/HeroImage";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { FaqAnswer } from "@/components/FaqAnswer";
import { FAQ_GROUPS } from "@/lib/faqs";
import { HOPEHUB_SIGNUP_URL } from "@/lib/hopehub";
import { EVENT_PATH } from "@/lib/widow-wellness-event";

export const metadata: Metadata = {
  title: "FAQ — Common questions about It's Lifey",
  description:
    "Answers about HopeHub, retreats, events, resources, and how It's Lifey supports widows after loss.",
};

const HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4575.webp`;

export default function FaqPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="faq-hero-heading"
      >
        <div className="ed-hero__media reveal-media">
          <HeroImage
            src={HERO}
            alt="Women sharing conversation at an It's Lifey gathering"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 40%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">Answers</p>
            <h1 id="faq-hero-heading" className="ed-title">
              <ClipReveal delay={0}>Frequently</ClipReveal>
              <ClipReveal delay={80}>asked questions</ClipReveal>
            </h1>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-faq-page">
          <nav className="ed-jump ed-jump--compact" aria-label="FAQ topics">
            <p className="ed-kicker">Topics</p>
            <ul className="ed-jump__list">
              {FAQ_GROUPS.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>{g.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          {FAQ_GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="ed-faq-group">
              <h2 className="ed-faq-group__title">{group.title}</h2>
              <div className="ed-faq ed-faq--lux">
                {group.items.map(({ q, a }) => (
                  <details key={q} className="ed-faq__item">
                    <summary className="ed-faq__q">
                      <span>{q}</span>
                      <span className="ed-faq__mark" aria-hidden />
                    </summary>
                    <div className="ed-faq__panel">
                      <div className="ed-faq__panel-inner">
                        <FaqAnswer text={a} />
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="ed-faq-page__cta">
            <p className="ed-kicker">Still have a question?</p>
            <h2 className="ed-section-title">We&apos;re here</h2>
            <p className="ed-body" style={{ marginTop: "1rem", maxWidth: "40ch" }}>
              Reach out anytime—or step into community when you&apos;re ready.
            </p>
            <div className="ed-actions" style={{ marginTop: "1.75rem" }}>
              <Link href="/contact" className="il-btn il-btn--solid">
                Contact us
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </Link>
              <a href={HOPEHUB_SIGNUP_URL} className="il-btn il-btn--ghost-light">
                Join HopeHub
              </a>
              <Link href={EVENT_PATH} className="il-btn il-btn--ghost-light">
                Upcoming gathering
              </Link>
              <Link
                href="/retreats/winter-widow-wellness"
                className="il-btn il-btn--ghost-light"
              >
                Upcoming retreats
              </Link>
              <Link href="/resources" className="il-btn il-btn--ghost-light">
                Browse resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
