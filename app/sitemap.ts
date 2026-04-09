import type { MetadataRoute } from "next";
import { join } from "node:path";
import { discoverAppStaticPaths } from "@/lib/discover-app-static-paths";
import { getPastRetreatSlugs } from "@/lib/past-retreats";
import { getEvents } from "@/lib/wordpress/events";
import { getPosts } from "@/lib/wordpress/posts";

export const revalidate = 3600;

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

function priorityForPath(path: string): number {
  if (path === "/") return 1;
  if (
    path === "/retreats/upcoming" ||
    path === "/support/virtual-healing-experiences" ||
    path === "/hopehub"
  )
    return 0.95;
  if (path.split("/").length <= 2) return 0.85;
  return 0.65;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteOrigin();
  const appDir = join(process.cwd(), "app");

  const staticPaths = discoverAppStaticPaths(appDir);
  const seen = new Set<string>();

  const entries: MetadataRoute.Sitemap = [];

  const push = (path: string, opts?: { lastModified?: Date; priority?: number }) => {
    const normalized = path === "" || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
    const key = normalized;
    if (seen.has(key)) return;
    seen.add(key);
    entries.push({
      url: `${base}${normalized === "/" ? "" : normalized}`,
      lastModified: opts?.lastModified ?? new Date(),
      changeFrequency: normalized === "/" ? "weekly" : "monthly",
      priority: opts?.priority ?? priorityForPath(normalized),
    });
  };

  for (const p of staticPaths) {
    push(p, { priority: priorityForPath(p) });
  }

  try {
    const posts = await getPosts();
    for (const post of posts) {
      push(`/blog/${post.slug}`, {
        lastModified: new Date(post.dateISO),
        priority: 0.7,
      });
    }
  } catch {
    /* WordPress unavailable — static routes still listed */
  }

  for (const slug of getPastRetreatSlugs()) {
    push(`/retreats/past/${slug}`, { priority: 0.6 });
  }

  try {
    const events = await getEvents({ upcomingOnly: false });
    for (const ev of events) {
      push(`/support-groups/${ev.slug}`, {
        lastModified: new Date(ev.utcStart),
        priority: 0.65,
      });
    }
  } catch {
    /* Events API unavailable */
  }

  entries.sort((a, b) => a.url.localeCompare(b.url));

  return entries;
}
