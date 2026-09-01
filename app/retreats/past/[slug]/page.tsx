import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipReveal } from "@/components/ClipReveal";
import { PastRetreatPhotoGallery } from "@/components/PastRetreatPhotoGallery";
import {
  getPastRetreat,
  getPastRetreatSlugs,
} from "@/lib/past-retreats";
import { EVENT_PATH } from "@/lib/widow-wellness-event";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPastRetreatSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const r = getPastRetreat(slug);
  if (!r) return {};
  return {
    title: r.seoTitle,
    description: r.seoDescription,
  };
}

export default async function PastRetreatDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const r = getPastRetreat(slug);
  if (!r) notFound();

  const fallbackHero = `/images/${encodeURIComponent("Summer retreat")}/IMG_4397.webp`;
  const heroSrc = r.coverImage ?? fallbackHero;

  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="past-retreat-heading"
      >
        <div className="ed-hero__media reveal-media">
          {/* Native img keeps EXIF/pixel orientation consistent with the gallery lightbox. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt={r.coverAlt ?? ""}
            className={`absolute inset-0 h-full w-full object-cover ${r.coverHeroObjectPosition ?? "object-center"}`}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">{r.cardEyebrow}</p>
            <h1 id="past-retreat-heading" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>{r.pageTitle}</ClipReveal>
            </h1>
            {r.cardBadge ? (
              <p className="ed-lede reveal-up">{r.cardBadge}</p>
            ) : null}
          </div>
        </div>
      </section>

      <nav className="ed-section ed-section--cream" style={{ paddingBlock: "1.25rem" }} aria-label="Breadcrumb">
        <div className="ed-shell">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-[var(--ed-muted)]">
            <li>
              <Link
                href="/retreats/past"
                className="font-semibold text-[var(--ed-pink-deep)] underline decoration-[rgba(231,111,171,0.35)] underline-offset-2"
              >
                Past retreats
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-[var(--ed-ink)]">{r.pageTitle}</li>
          </ol>
        </div>
      </nav>

      <article className="ed-section ed-section--cream" style={{ paddingTop: 0 }}>
        <div className="ed-shell">
          <div className="mx-auto max-w-3xl space-y-6">
            {r.body.map((p, i) => (
              <p key={i} className="ed-body ed-body--ink">
                {p}
              </p>
            ))}
          </div>

          {r.venueUrl ? (
            <p className="ed-body mx-auto mt-10 max-w-3xl">
              <span className="font-semibold text-[var(--ed-ink)]">Venue reference: </span>
              <a
                href={r.venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--ed-pink-deep)] underline decoration-[rgba(231,111,171,0.4)] underline-offset-2"
              >
                {r.venueLabel ?? "Retreat venue"}
              </a>
              .
            </p>
          ) : null}

          {r.kind === "upcoming" && r.gallery.length === 0 ? (
            <div className="ed-form-panel mx-auto mt-12 max-w-3xl">
              <p className="m-0 text-base font-semibold text-[var(--ed-ink)]">
                Photos aren&apos;t on the site yet
              </p>
              <p className="ed-body" style={{ marginTop: "0.75rem" }}>
                This spring weekend hasn&apos;t happened yet. After early May
                2026, we&apos;ll add images from the retreat here.
              </p>
            </div>
          ) : null}

          <PastRetreatPhotoGallery
            photos={r.gallery}
            coverSrc={r.coverImage}
          />
        </div>
      </article>

      <section className="ed-section ed-section--blush" style={{ paddingBlock: "2.5rem" }}>
        <div
          className="ed-shell"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Link
            href="/retreats/past"
            className="text-sm font-semibold text-[var(--ed-pink-deep)] underline decoration-[rgba(231,111,171,0.35)] underline-offset-2"
          >
            ← All past retreats
          </Link>
          <Link href={EVENT_PATH} className="il-btn il-btn--solid">
            Join an upcoming gathering
            <span aria-hidden className="il-btn__arrow">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
