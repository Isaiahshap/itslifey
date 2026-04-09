import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPastRetreat,
  getPastRetreatSlugs,
} from "@/lib/past-retreats";

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

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

  const galleryWithoutHero = r.coverImage
    ? r.gallery.filter((g) => g.src !== r.coverImage)
    : r.gallery;

  return (
    <div className="bg-[#f6f3ee]">
      <section className="border-b border-[#e3ddd4] bg-[#faf8f5]">
        <div className={`${shell} py-8 sm:py-10`}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#666766]">
              <li>
                <Link
                  href="/retreats/past"
                  className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/35 underline-offset-2 hover:decoration-[#e76fab]"
                >
                  Past retreats
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-black">{r.pageTitle}</li>
            </ol>
          </nav>
        </div>
      </section>

      {r.coverImage ? (
        <div className="relative h-[min(56vh,520px)] min-h-[220px] w-full overflow-hidden bg-[#1a1918]">
          <Image
            src={r.coverImage}
            alt={r.coverAlt ?? ""}
            fill
            priority
            className={`object-cover ${r.coverHeroObjectPosition ?? "object-center"}`}
            sizes="100vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25"
            aria-hidden
          />
        </div>
      ) : (
        <div className="border-b border-[#d85e9a] bg-[#e76fab]">
          <div className={`${shell} py-16 sm:py-20`}>
            <div className="max-w-3xl">
              {r.cardBadge ? (
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
                  {r.cardBadge}
                </p>
              ) : null}
              <h1 className="mt-4 text-pretty text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
                {r.pageTitle}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/90">
                {r.cardEyebrow}
              </p>
            </div>
          </div>
        </div>
      )}

      <article>
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          {r.coverImage ? (
            <header className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {r.cardBadge ? (
                  <span className="rounded-full bg-[#e76fab] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                    {r.cardBadge}
                  </span>
                ) : null}
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    r.kind === "upcoming"
                      ? "border-[#e76fab]/40 text-[#c2528c]"
                      : "border-black/10 text-[#666766]"
                  }`}
                >
                  {r.kind === "upcoming" ? "Upcoming" : "Past"}
                </span>
              </div>
              <h1 className="mt-5 text-pretty text-4xl font-semibold leading-[1.08] tracking-tight text-black sm:text-5xl">
                {r.pageTitle}
              </h1>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#666766]">
                {r.cardEyebrow}
              </p>
            </header>
          ) : null}

          <div
            className={`max-w-3xl space-y-6 text-pretty text-lg leading-[1.78] text-[#2a2928] sm:text-xl sm:leading-[1.72] ${r.coverImage ? "mx-auto mt-10 sm:mt-12" : "pt-2"}`}
          >
            {r.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {r.venueUrl ? (
            <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-[#666766] sm:mt-12">
              <span className="font-semibold text-black">Venue reference: </span>
              <a
                href={r.venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
              >
                {r.venueLabel ?? "Retreat venue"}
              </a>
              {" — "}for a sense of the setting (photos from our weekend will be
              added after early May).
            </p>
          ) : null}

          {r.kind === "upcoming" && r.gallery.length === 0 ? (
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#e76fab]/25 bg-[#fdf8fb] px-6 py-8 sm:px-8">
              <p className="text-base font-semibold text-black">
                Photos aren&apos;t on the site yet
              </p>
              <p className="mt-3 text-lg leading-relaxed text-[#666766]">
                This spring weekend hasn&apos;t happened yet. After early May
                2026, we&apos;ll add images from the retreat here.
              </p>
            </div>
          ) : null}

          {galleryWithoutHero.length > 0 ? (
            <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#666766]">
                Photos
              </h2>
              <ul className="mt-6 grid list-none grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
                {galleryWithoutHero.map((photo) => (
                  <li
                    key={photo.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#ede8e2] sm:rounded-2xl"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      <section className="border-t border-[#e3ddd4] bg-[#faf8f5] py-12 sm:py-14">
        <div
          className={`${shell} flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between`}
        >
          <Link
            href="/retreats/past"
            className="text-sm font-semibold text-[#e76fab] underline decoration-[#e76fab]/35 underline-offset-2 hover:decoration-[#e76fab]"
          >
            ← All past retreats
          </Link>
          <Link
            href="/retreats/upcoming"
            className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:text-base"
          >
            View upcoming coastal retreat
          </Link>
        </div>
      </section>
    </div>
  );
}
