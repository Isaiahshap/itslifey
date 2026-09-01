import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipReveal } from "@/components/ClipReveal";
import { WpHtml } from "@/components/WpHtml";
import { getPostBySlug, getPosts } from "@/lib/wordpress";

export const revalidate = 120;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

const FALLBACK_HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4349.webp`;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: `${post.title} — It's Lifey`,
    description: post.excerptText.slice(0, 160),
  };
}

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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const heroSrc = post.featuredImageUrl || FALLBACK_HERO;

  return (
    <div className="ed">
      <article>
        <section
          data-entrance="hero"
          className="ed-hero"
          aria-labelledby="blog-post-heading"
        >
          <div className="ed-hero__media reveal-media">
            {/* eslint-disable-next-line @next/next/no-img-element -- Featured image URLs come from WP/CDN; next/image 500s in prod when host is not allowlisted. */}
            <img
              src={heroSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div className="ed-hero__veil" aria-hidden />
          <div className="ed-hero__inner">
            <div className="ed-hero__panel">
              <p className="ed-kicker reveal-label">
                <Link href="/blog" className="no-underline hover:underline">
                  Blog
                </Link>
                <span aria-hidden> · </span>
                <time dateTime={post.dateISO}>{formatDate(post.dateISO)}</time>
              </p>
              <h1 id="blog-post-heading" className="ed-title ed-title--wide">
                <ClipReveal delay={0}>{post.title}</ClipReveal>
              </h1>
            </div>
          </div>
        </section>

        <div className="ed-section ed-section--cream">
          <div className="ed-shell">
            <div className="mx-auto max-w-3xl">
              <WpHtml html={post.contentHtml} asArticle />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
