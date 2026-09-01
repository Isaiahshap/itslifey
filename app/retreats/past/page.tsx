import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { PAST_RETREATS } from "@/lib/past-retreats";
import { EVENT_PATH } from "@/lib/widow-wellness-event";

export const metadata: Metadata = {
  title: "Past retreats — It's Lifey",
  description:
    "Browse gatherings from It’s Lifey — spring, fall, and summer weekends for widows, with photos and stories from each retreat.",
};

const HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4456.webp`;

export default function PastRetreatsPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="past-retreats-heading"
      >
        <div className="ed-hero__media reveal-media">
          <Image
            src={HERO}
            alt="Women from an It's Lifey retreat gathered on a dock"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 35%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">Retreats</p>
            <h1 id="past-retreats-heading" className="ed-title">
              <ClipReveal delay={0}>Past retreats</ClipReveal>
            </h1>
            <p className="ed-lede reveal-up">
              A look at where we&apos;ve gathered — summer, spring, and fall
              weekends for widows.
            </p>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell">
          <ul className="grid list-none gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
            {PAST_RETREATS.map((r) => (
              <li key={r.slug} className="min-w-0">
                <Link
                  href={`/retreats/past/${r.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-[var(--ed-rule)] bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[var(--ed-blush)]">
                    {r.coverImage ? (
                      <Image
                        src={r.coverImage}
                        alt={r.coverAlt ?? ""}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <p className="ed-kicker">Photos coming soon</p>
                        <p className="ed-body" style={{ marginTop: "0.75rem" }}>
                          We&apos;ll add images from this retreat here once the
                          gallery is ready.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="ed-kicker" style={{ color: "var(--ed-muted)" }}>
                      {r.cardEyebrow}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-[var(--ed-ink)] sm:text-[1.35rem]">
                      {r.cardTitle}
                    </h2>
                    <p className="ed-body" style={{ marginTop: "0.75rem", flex: 1 }}>
                      {r.cardDescription}
                    </p>
                    <p className="mt-6 text-sm font-semibold text-[var(--ed-pink-deep)] transition group-hover:text-[var(--ed-pink)]">
                      View retreat
                      <span
                        aria-hidden
                        className="ml-1 inline-block transition group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="ed-actions" style={{ marginTop: "3rem", justifyContent: "center" }}>
            <Link href={EVENT_PATH} className="il-btn il-btn--solid">
              Join an upcoming gathering
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </Link>
            <Link href="/" className="il-btn il-btn--ghost-light">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
