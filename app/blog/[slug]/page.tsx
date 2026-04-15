import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WpHtml } from "@/components/WpHtml";
import { getPostBySlug, getPosts } from "@/lib/wordpress";

export const revalidate = 120;
export const dynamicParams = true;

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

type PageProps = { params: Promise<{ slug: string }> };

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

  return (
    <div className="bg-[#f6f3ee]">
      <article>
        <header
          className={`border-b border-black/[0.06] bg-[#faf8f5] ${shell}`}
        >
          <div className="mx-auto max-w-3xl py-12 sm:py-14 lg:py-16">
            <nav aria-label="Breadcrumb" className="text-sm text-[#666766]">
              <Link
                href="/blog"
                className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/35 underline-offset-2 hover:decoration-[#e76fab]"
              >
                Blog
              </Link>
              <span aria-hidden className="mx-2">
                /
              </span>
              <span className="text-black">{post.title}</span>
            </nav>
            <time
              dateTime={post.dateISO}
              className="mt-6 block text-sm font-medium text-[#666766]"
            >
              {formatDate(post.dateISO)}
            </time>
            <h1 className="mt-3 text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl lg:text-[2.35rem]">
              {post.title}
            </h1>
          </div>
        </header>

        {post.featuredImageUrl ? (
          <div className="relative mx-auto aspect-[21/9] max-h-[min(52vh,520px)] w-full max-w-6xl overflow-hidden bg-[#1a1918] sm:px-5 lg:px-8">
            {/* eslint-disable-next-line @next/next/no-img-element -- Featured image URLs come from WP/CDN; next/image 500s in prod when host is not allowlisted. */}
            <img
              src={post.featuredImageUrl}
              alt=""
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        ) : null}

        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <div className="mx-auto max-w-3xl">
            <WpHtml html={post.contentHtml} asArticle />
          </div>
        </div>
      </article>
    </div>
  );
}
