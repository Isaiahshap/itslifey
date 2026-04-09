/** Raw-ish shapes from WP REST (subset). */

export type WpEmbeddedMedia = {
  source_url?: string;
  media_details?: {
    sizes?: Record<
      string,
      { source_url?: string; width?: number; height?: number }
    >;
  };
};

export type WpPostRest = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: WpEmbeddedMedia[];
  };
};

export type WpTribeEventCategory = {
  name?: string;
  slug?: string;
};

export type WpTribeEventImage = {
  url?: string;
  sizes?: Record<string, { url?: string }>;
};

export type WpTribeEventRest = {
  id: number;
  slug: string;
  title: string;
  description: string;
  excerpt?: string;
  url: string;
  rest_url?: string;
  image?: WpTribeEventImage | null;
  start_date: string;
  end_date: string;
  utc_start_date: string;
  utc_end_date: string;
  timezone: string;
  all_day: boolean;
  cost?: string;
  categories?: WpTribeEventCategory[];
  website?: string;
  /** e.g. `["tc"]` when Tribe Commerce tickets exist */
  ticketed?: string[];
};

export type WpTribeEventsListResponse = {
  events: WpTribeEventRest[];
  total?: number;
  total_pages?: number;
};
