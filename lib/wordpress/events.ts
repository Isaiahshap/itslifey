import { decode } from "he";
import { WP_REST_EVENTS } from "@/lib/wp-config";
import { normalizeWpUrl } from "@/lib/wp-url";
import type { WpTribeEventRest, WpTribeEventsListResponse } from "@/lib/wordpress/types";
import { wpFetchJson } from "@/lib/wordpress/wp-fetch";

export type CalendarEventSummary = {
  id: number;
  slug: string;
  title: string;
  descriptionHtml: string;
  imageUrl: string | null;
  /** ISO-like UTC datetime from API */
  utcStart: string;
  utcEnd: string;
  timezone: string;
  allDay: boolean;
  costHtml: string | null;
  categoryLabel: string | null;
  /** Canonical event permalink on WordPress (tickets / checkout load here). */
  externalUrl: string;
  /** Optional custom registration / external link from the event editor */
  website: string | null;
  /** Tribe ticket providers present on the event (e.g. `tc`) */
  hasTickets: boolean;
  /**
   * Where users should go to register or buy tickets — custom `website` if set,
   * otherwise the WordPress event page (Tribe Commerce checkout lives there).
   */
  purchaseUrl: string;
};

function parseUtc(s: string): Date | null {
  if (!s) return null;
  const normalized = s.includes("T") ? s : s.replace(" ", "T");
  const d = new Date(
    normalized.endsWith("Z") ? normalized : `${normalized}Z`,
  );
  return Number.isNaN(d.getTime()) ? null : d;
}

function mapEvent(e: WpTribeEventRest): CalendarEventSummary {
  const img =
    e.image?.url ||
    e.image?.sizes?.medium?.url ||
    e.image?.sizes?.["medium_large"]?.url ||
    null;
  const category = e.categories?.[0]?.name?.trim() || null;
  const websiteNorm = e.website?.trim()
    ? normalizeWpUrl(e.website) || e.website.trim()
    : null;
  const eventPageUrl = normalizeWpUrl(e.url) || e.url;
  const hasTickets = Array.isArray(e.ticketed) && e.ticketed.length > 0;
  return {
    id: e.id,
    slug: e.slug,
    title: decode(e.title ?? "").trim() || "Event",
    descriptionHtml: e.description ?? "",
    imageUrl: img ? normalizeWpUrl(img) || null : null,
    utcStart: e.utc_start_date,
    utcEnd: e.utc_end_date,
    timezone: e.timezone || "America/New_York",
    allDay: Boolean(e.all_day),
    costHtml: e.cost ? e.cost.trim() : null,
    categoryLabel: category,
    externalUrl: eventPageUrl,
    website: websiteNorm,
    hasTickets,
    purchaseUrl: websiteNorm || eventPageUrl,
  };
}

export async function getEvents(options?: {
  upcomingOnly?: boolean;
}): Promise<CalendarEventSummary[]> {
  const upcomingOnly = options?.upcomingOnly ?? true;
  const url = `${WP_REST_EVENTS}?per_page=100&status=publish`;
  const data = await wpFetchJson<WpTribeEventsListResponse>(url);
  if (!data?.events || !Array.isArray(data.events)) return [];
  const mapped = data.events.map(mapEvent);
  if (!upcomingOnly) return mapped.sort((a, b) => a.utcStart.localeCompare(b.utcStart));
  const now = Date.now();
  const upcoming = mapped.filter((ev) => {
    const t = parseUtc(ev.utcStart);
    return t && t.getTime() >= now - 60 * 60 * 1000;
  });
  upcoming.sort((a, b) => a.utcStart.localeCompare(b.utcStart));
  return upcoming;
}

export async function getEventBySlug(
  slug: string,
): Promise<CalendarEventSummary | null> {
  const safe = encodeURIComponent(slug);
  const url = `${WP_REST_EVENTS}?slug=${safe}&per_page=1&status=publish`;
  const data = await wpFetchJson<WpTribeEventsListResponse>(url);
  const ev = data?.events?.[0];
  if (!ev) return null;
  return mapEvent(ev);
}

export async function getEventById(id: number): Promise<CalendarEventSummary | null> {
  const url = `${WP_REST_EVENTS}/${id}`;
  const data = await wpFetchJson<WpTribeEventRest>(url);
  if (!data?.id) return null;
  return mapEvent(data);
}
