import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import {
  HOPEHUB_MEMBER_LOGIN_URL,
  HOPEHUB_SIGNUP_URL,
} from "@/lib/hopehub";
import { HOPEHUB_FAQS } from "@/lib/faqs";
import { EVENT_PATH } from "@/lib/widow-wellness-event";

export const metadata: Metadata = {
  title: "HopeHub — Free online community for widows",
  description:
    "HopeHub is a free online community for widows—connection, support groups, expert sessions, and resources. Built by a widow who understands.",
};

const HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4446.webp`;
const STORY = "/images/33958e9aeb59efedea29fdaba7824398.jpeg";
const HOPEHUB_PREVIEW_VIDEO_SRC = "/images/hopehub.mp4";

const forYouIf = [
  "You’ve lost your spouse or partner and feel like no one truly understands what you’re going through.",
  "You miss having someone who gets it without long explanations.",
  "You want real conversation—not platitudes or advice that doesn’t fit your reality.",
  "You’re navigating big decisions and wish you had people to talk them through with.",
  "You want connection, community, and friendships with women who understand this road.",
  "Some days you feel strong, and other days everything feels heavy—and you want a soft place to land.",
] as const;

const included = [
  "Introduce yourself and meet other widows (including by location)",
  "Community discussion feed and ongoing conversation",
  "Regular virtual new-member meetups",
  "In-person coffee meetups where available (starting in MetroWest, MA)",
  "Newsletter with conversations, resources, and what's happening in HopeHub",
] as const;

const stats = [
  { value: "Hundreds", label: "of members" },
  { value: "Daily", label: "new connections" },
  { value: "Monthly", label: "widow meetups" },
  { value: "24/7", label: "community access" },
] as const;

export default function HopeHubPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="hopehub-hero-heading"
      >
        <div className="ed-hero__media reveal-media">
          <Image
            src={HERO}
            alt="Women gathered in a bright living room during an It's Lifey retreat"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 45%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">HopeHub</p>
            <h1 id="hopehub-hero-heading" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>If you are a widow</ClipReveal>
              <ClipReveal delay={70}>tired of doing this alone,</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={140}>welcome.</ClipReveal>
              </span>
            </h1>
            <p className="ed-lede reveal-up">
              A free, private online community for widows — created by someone
              who has lived this loss.
            </p>
            <div className="ed-actions reveal-up">
              <a href={HOPEHUB_SIGNUP_URL} className="il-btn il-btn--solid">
                Join the community
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </a>
              <a
                href={HOPEHUB_MEMBER_LOGIN_URL}
                className="il-btn il-btn--ghost-light"
                rel="noopener noreferrer"
              >
                Members log in
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-kicker">Why HopeHub exists</p>
            <h2 className="ed-section-title">
              No one was meant to carry grief alone.
            </h2>
            <p className="ed-body ed-body--ink" style={{ marginTop: "1.25rem" }}>
              HopeHub is a free, private online community for widows—created by
              someone who has lived this loss. Inside, you&apos;ll find women who
              understand without a long backstory: real conversation, steady
              encouragement, and space to feel what you feel.
            </p>
            <p className="ed-body" style={{ marginTop: "1.1rem" }}>
              When the practical side of life gets heavy, therapists, advisors,
              and other professionals show up here too. Whether your loss was
              recent or years ago, you belong.
            </p>
            <p className="ed-pull">Connection becomes the antidote.</p>
          </div>
          <figure className="ed-split__media ed-split__media--tall m-0">
            <Image
              src={STORY}
              alt="Group of women together outdoors in autumn, supporting one another"
              fill
              sizes="(max-width: 960px) 100vw, 48vw"
            />
          </figure>
        </div>
      </section>

      <section className="ed-section ed-section--blush" aria-label="At a glance">
        <div className="ed-shell">
          <p className="ed-kicker">At a glance</p>
          <div className="ed-stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="ed-stats__item">
                <p className="ed-stats__value">{value}</p>
                <p className="ed-stats__label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-for-you">
          <div>
            <p className="ed-kicker">Invitation</p>
            <h2 className="ed-section-title">HopeHub is for you if…</h2>
            <p className="ed-body" style={{ marginTop: "1.1rem" }}>
              No checklist to pass—only an invitation to come as you are.
            </p>
          </div>
          <ul className="ed-checklist">
            {forYouIf.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-video-block">
          <div>
            <p className="ed-kicker">Watch</p>
            <h2 className="ed-section-title">See HopeHub for yourself</h2>
            <p className="ed-body" style={{ marginTop: "1.1rem" }}>
              A short introduction so you can sense the tone of the community
              before you step in.
            </p>
          </div>
          <div className="ed-video">
            <video
              controls
              playsInline
              preload="metadata"
              aria-label="Short video introducing HopeHub, the free online community for widows"
            >
              <source src={HOPEHUB_PREVIEW_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--blush">
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-kicker">Join free</p>
            <h2 className="ed-section-title">
              Join the HopeHub community
            </h2>
            <p className="ed-body ed-body--ink" style={{ marginTop: "1.25rem" }}>
              Widowhood can feel incredibly isolating. Inside HopeHub, women who
              truly understand are waiting to meet you.
            </p>
            <p className="ed-body" style={{ marginTop: "1.1rem" }}>
              Hundreds of women across the country are already finding their
              people here. Explore quietly or dive in; there&apos;s room for you.
            </p>
            <p className="ed-body" style={{ marginTop: "1.1rem" }}>
              Your privacy and trust matter. HopeHub is a confidential space
              where widows can share openly, knowing care has been taken to
              protect the community.
            </p>
            <div className="ed-actions" style={{ marginTop: "1.75rem" }}>
              <a href={HOPEHUB_SIGNUP_URL} className="il-btn il-btn--solid">
                Join free today
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </a>
              <Link href={EVENT_PATH} className="il-btn il-btn--ghost-light">
                One-day gathering
              </Link>
            </div>
          </div>
          <div>
            <p className="ed-kicker">Everything included</p>
            <ul className="ed-checklist" style={{ marginTop: "1.25rem" }}>
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell">
          <div className="ed-faq-panel">
            <p className="ed-kicker">Questions</p>
            <h2 className="ed-section-title">Frequently asked questions</h2>
            <p
              className="ed-body"
              style={{ marginTop: "1rem", maxWidth: "38ch" }}
            >
              Straight answers—nothing hidden behind fine print.
            </p>
            <div className="ed-faq ed-faq--lux">
              {HOPEHUB_FAQS.map(({ q, a }) => (
                <details key={q} className="ed-faq__item">
                  <summary className="ed-faq__q">
                    <span>{q}</span>
                    <span className="ed-faq__mark" aria-hidden />
                  </summary>
                  <div className="ed-faq__panel">
                    <div className="ed-faq__panel-inner">
                      <p className="ed-faq__a">{a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
            <div className="ed-faq-panel__foot">
              <Link href="/faq" className="ed-resource__link">
                See all FAQs
                <span aria-hidden> →</span>
              </Link>
              <a href={HOPEHUB_SIGNUP_URL} className="il-btn il-btn--solid">
                Create your free account
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
