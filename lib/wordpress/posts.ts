import { decode } from "he";
import { WP_REST_POSTS } from "@/lib/wp-config";
import { normalizeWpUrl } from "@/lib/wp-url";
import type { WpPostRest } from "@/lib/wordpress/types";
import { wpFetchJson } from "@/lib/wordpress/wp-fetch";

export type BlogPostSummary = {
  id: number;
  slug: string;
  title: string;
  excerptText: string;
  dateISO: string;
  featuredImageUrl: string | null;
};

export type BlogPostDetail = BlogPostSummary & {
  contentHtml: string;
};

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function featuredFromEmbedded(post: WpPostRest): string | null {
  const m = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!m) return null;
  const raw =
    m.source_url ||
    m.media_details?.sizes?.large?.source_url ||
    m.media_details?.sizes?.["medium_large"]?.source_url ||
    m.media_details?.sizes?.medium?.source_url;
  if (!raw) return null;
  return normalizeWpUrl(raw) || null;
}

function mapPostSummary(post: WpPostRest): BlogPostSummary {
  const excerptRaw = post.excerpt?.rendered ?? "";
  const excerptText = stripTags(decode(excerptRaw)).slice(0, 280);
  return {
    id: post.id,
    slug: post.slug,
    title: decode(post.title?.rendered ?? "").trim() || "Untitled",
    excerptText:
      excerptText ||
      stripTags(decode(post.content?.rendered ?? "")).slice(0, 280),
    dateISO: post.date,
    featuredImageUrl: featuredFromEmbedded(post),
  };
}

export async function getPosts(): Promise<BlogPostSummary[]> {
  const url = `${WP_REST_POSTS}?per_page=100&_embed=1&orderby=date&order=desc&status=publish`;
  const data = await wpFetchJson<WpPostRest[]>(url);
  if (!data || !Array.isArray(data)) return [];
  return data.map(mapPostSummary);
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const safe = encodeURIComponent(slug);
  const url = `${WP_REST_POSTS}?slug=${safe}&_embed=1&status=publish`;
  const data = await wpFetchJson<WpPostRest[]>(url);
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const post = data[0];
  const summary = mapPostSummary(post);
  return {
    ...summary,
    contentHtml: post.content?.rendered ?? "",
  };
}
