import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { WP_EVENTS_EMBED_URL } from "@/lib/wp-config";

export const metadata: Metadata = {
  title: "Support groups & events for widows",
  description:
    "Upcoming It's Lifey gatherings—virtual and in-person sessions, expert events, and connection with women who understand.",
};

const HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4560.webp`;

export default function SupportGroupsPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="sg-index-heading"
      >
        <div className="ed-hero__media reveal-media">
          <Image
            src={HERO}
            alt="Women gathered in warm conversation during an It's Lifey retreat"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 40%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">Support</p>
            <h1 id="sg-index-heading" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>Support groups</ClipReveal>
              <ClipReveal delay={80}>&amp; events</ClipReveal>
            </h1>
            <p className="ed-lede reveal-up">
              Upcoming gatherings and sessions — browse the calendar, register,
              and complete checkout on our secure event pages.
            </p>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell">
          <div className="overflow-hidden border border-[var(--ed-rule)] bg-white">
            <iframe
              title="It's Lifey — upcoming events calendar"
              src={WP_EVENTS_EMBED_URL}
              className="block min-h-[min(85vh,900px)] w-full border-0 sm:min-h-[min(88vh,1000px)]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="payment *; fullscreen; clipboard-write"
            />
          </div>
          <p className="ed-body" style={{ marginTop: "1.5rem", textAlign: "center" }}>
            Prefer the full site?{" "}
            <a
              href={WP_EVENTS_EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--ed-pink-deep)] underline decoration-[rgba(231,111,171,0.4)] underline-offset-2"
            >
              Open the calendar in a new tab
            </a>
            . Questions?{" "}
            <Link
              href="/contact"
              className="font-semibold text-[var(--ed-pink-deep)] underline decoration-[rgba(231,111,171,0.4)] underline-offset-2"
            >
              Contact us
            </Link>{" "}
            or visit{" "}
            <Link
              href="/hopehub"
              className="font-semibold text-[var(--ed-pink-deep)] underline decoration-[rgba(231,111,171,0.4)] underline-offset-2"
            >
              HopeHub
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
