import type { Metadata } from "next";
import Image from "next/image";
import { HeroImage } from "@/components/HeroImage";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { getPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog — Stories & support for widows",
  description:
    "Articles and reflections from It's Lifey—clear, compassionate support for widows navigating grief and life after loss.",
};

export const revalidate = 120;

const HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4366.webp`;
const FALLBACK_THUMB = "/images/widowwellnessimages/IMG_3180.jpeg";

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
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="blog-index-heading"
      >
        <div className="ed-hero__media reveal-media">
          <HeroImage
            src={HERO}
            alt="Women practicing yoga together in a bright summer retreat house"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 40%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">It&apos;s Lifey</p>
            <h1 id="blog-index-heading" className="ed-title">
              <ClipReveal delay={0}>Stories &amp; support</ClipReveal>
            </h1>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell">
          {posts.length === 0 ? (
            <div className="ed-empty">
              <p className="ed-kicker">Coming soon</p>
              <h2 className="ed-empty__title">New stories are on the way</h2>
              <p
                className="ed-body"
                style={{ margin: "1.15rem auto 0", maxWidth: "36ch" }}
              >
                There aren&apos;t any posts published yet. When articles go
                live, they&apos;ll appear here — honest, compassionate reading
                for widows, written with care.
              </p>
              <p style={{ marginTop: "1.75rem" }}>
                <Link href="/hopehub" className="il-btn il-btn--solid">
                  Explore HopeHub
                  <span aria-hidden className="il-btn__arrow">
                    →
                  </span>
                </Link>
              </p>
            </div>
          ) : (
            <>
              <p className="ed-kicker">From the journal</p>
              <h2 className="ed-section-title">Latest articles</h2>
              <div className="ed-blog-list" style={{ marginTop: "2rem" }}>
                {posts.map((post) => {
                  const image = post.featuredImageUrl || FALLBACK_THUMB;
                  const isRemote = Boolean(post.featuredImageUrl);

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="ed-blog-item"
                    >
                      <div className="ed-blog-item__media">
                        {isRemote ? (
                          // eslint-disable-next-line @next/next/no-img-element -- Featured image URLs come from WP/CDN; next/image needs host allowlisting.
                          <img
                            src={image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <Image
                            src={FALLBACK_THUMB}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 800px) 100vw, 40vw"
                          />
                        )}
                      </div>
                      <div>
                        <time
                          dateTime={post.dateISO}
                          className="ed-blog-item__meta"
                        >
                          {formatDate(post.dateISO)}
                        </time>
                        <h3 className="ed-blog-item__title">{post.title}</h3>
                        <p className="ed-blog-item__excerpt">
                          {post.excerptText}
                        </p>
                        <span className="ed-blog-item__more">
                          Read article
                          <span aria-hidden>→</span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
