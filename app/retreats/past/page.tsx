import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAST_RETREATS } from "@/lib/past-retreats";

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

export const metadata: Metadata = {
  title: "Past retreats — It's Lifey",
  description:
    "Browse gatherings from It’s Lifey — spring, fall, and summer weekends for widows, with photos and stories from each retreat.",
};

export default function PastRetreatsPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section className="border-b border-[#e3ddd4] bg-[#faf8f5]">
        <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e76fab] sm:text-sm">
            Retreats
          </p>
          <h1 className="mt-3 max-w-3xl text-pretty text-4xl font-semibold leading-[1.08] tracking-tight text-black sm:text-5xl">
            Past retreats
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#666766] sm:text-xl">
            A look at where we&apos;ve gathered — including the spring 2026
            weekend (sold out) before photos are added. Tap a card for the full
            story and gallery.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-24">
        <div className={shell}>
          <ul className="grid list-none gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PAST_RETREATS.map((r) => (
              <li key={r.slug} className="min-w-0">
                <Link
                  href={`/retreats/past/${r.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#e8e2da] bg-[#fffcfa] shadow-[0_20px_50px_-36px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#ede8e2]">
                    {r.coverImage ? (
                      <Image
                        src={r.coverImage}
                        alt={r.coverAlt ?? ""}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#fdf8fb] to-[#f5e8ef] px-6 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                          Photos after early May 2026
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[#666766]">
                          This retreat hasn&apos;t happened yet — gallery will go
                          live here afterward.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      {r.cardBadge ? (
                        <span className="rounded-full bg-[#e76fab] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                          {r.cardBadge}
                        </span>
                      ) : null}
                      {r.kind === "upcoming" ? (
                        <span className="rounded-full border border-[#e76fab]/35 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c2528c]">
                          Upcoming
                        </span>
                      ) : (
                        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#666766]">
                          Past
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#666766]">
                      {r.cardEyebrow}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-black sm:text-[1.35rem]">
                      {r.cardTitle}
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#666766]">
                      {r.cardDescription}
                    </p>
                    <p className="mt-6 text-sm font-semibold text-[#e76fab] transition group-hover:text-[#d85e9a]">
                      View retreat
                      <span aria-hidden className="ml-1 inline-block transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/retreats/upcoming"
              className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Summer 2026 coastal retreat
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border-2 border-black/10 bg-white px-8 py-3.5 text-base font-semibold text-black transition-colors duration-200 hover:border-[#e76fab] hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
