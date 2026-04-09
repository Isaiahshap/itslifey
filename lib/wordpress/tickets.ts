import { decode } from "he";
import { WP_HEADLESS_ORIGIN } from "@/lib/wp-config";
import { wpFetchJson } from "@/lib/wordpress/wp-fetch";

const WP_TICKETS = `${WP_HEADLESS_ORIGIN}/wp-json/tribe/tickets/v1/tickets`;

type WpTicketRow = {
  id: number;
  post_id: number;
  title: string;
  cost: string;
  is_available?: boolean;
};

type WpTicketsResponse = {
  tickets?: WpTicketRow[];
};

export type EventTicketTier = {
  id: number;
  title: string;
  cost: string;
  available: boolean;
};

/**
 * Ticket rows from Tribe Commerce for a single event.
 * The REST `post` filter is unreliable; we filter by `post_id === event id`.
 */
export async function getTicketsForEvent(
  eventPostId: number,
): Promise<EventTicketTier[]> {
  const url = `${WP_TICKETS}?post=${eventPostId}&per_page=100`;
  const data = await wpFetchJson<WpTicketsResponse>(url);
  const rows = data?.tickets ?? [];
  return rows
    .filter((t) => Number(t.post_id) === eventPostId)
    .map((t) => ({
      id: t.id,
      title: decode((t.title ?? "").trim()) || "Ticket",
      cost: (t.cost ?? "").trim(),
      available: t.is_available !== false,
    }));
}
