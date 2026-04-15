import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog — Stories & support for widows",
  description:
    "Articles and reflections from It's Lifey—clear, compassionate support for widows navigating grief and life after loss.",
};

export const revalidate = 120;

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function BlogArchivePage() {
  const posts = await getPosts();

  return (
    <div className="bg-[#f6f3ee]">
      <section
        className="border-b border-black/[0.06] bg-[#faf8f5]"
        aria-labelledby="blog-index-heading"
      >
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#666766] sm:text-[11px]">
            It&apos;s Lifey
          </p>
          <h1
            id="blog-index-heading"
            className="mt-4 max-w-2xl text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl"
          >
            Blog
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#2a2928]">
            Thoughtful pieces you can return to on hard days and quiet ones
            alike—clear, warm, and grounded in real life.
          </p>
        </div>
      </section>

      <div className={`${shell} py-14 sm:py-16 lg:py-20`}>
        {posts.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-black/[0.08] bg-white px-8 py-14 text-center shadow-sm shadow-black/[0.04] sm:px-12 sm:py-16">
            <div
              className="mx-auto mb-6 h-px w-12 bg-[#e76fab]/70"
              aria-hidden
            />
            <h2 className="text-xl font-semibold text-[#141413] sm:text-2xl">
              New stories are on the way
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#666766]">
              There aren&apos;t any posts published yet. When articles go live,
              they&apos;ll appear here—honest, compassionate reading for widows,
              written with care.
            </p>
            <p className="mt-8">
              <Link
                href="/hopehub"
                className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-black/10 transition-colors hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
              >
                Explore HopeHub
              </Link>
            </p>
          </div>
        ) : (
          <ul className="mx-auto grid max-w-4xl gap-10 sm:gap-12">
            {posts.map((post) => (
              <li key={post.id}>
                <article className="flex flex-col gap-6 border-b border-black/[0.06] pb-10 sm:flex-row sm:gap-10 sm:pb-12 last:border-b-0 last:pb-0">
                  {post.featuredImageUrl ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-[#ebe6df] sm:aspect-square sm:max-w-[280px]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- Featured image URLs come from WP/CDN; next/image 500s in prod when host is not allowlisted. */}
                      <img
                        src={post.featuredImageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </Link>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <time
                      dateTime={post.dateISO}
                      className="text-sm font-medium text-[#666766]"
                    >
                      {formatDate(post.dateISO)}
                    </time>
                    <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-[#141413]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#141413] transition-colors hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-[#2a2928]">
                      {post.excerptText}
                    </p>
                    <p className="mt-5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 transition-colors hover:decoration-[#e76fab]"
                      >
                        Read article
                      </Link>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
