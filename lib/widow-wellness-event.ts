export const EVENT_NAME = "Widow Wellness & Connection Experience";
export const EVENT_SHORT_TAGLINE = "Real talk. Real connection. Real hope.";
export const EVENT_DATES = "November 13–14, 2026";
export const EVENT_LOCATION = "Presence & Co. · Reading, Massachusetts";

export const EVENT_PATH = "/events/widow-wellness-connection-experience";
export const SPONSORSHIP_PATH =
  "/events/widow-wellness-connection-experience/sponsorship";
export const SPONSORSHIP_PDF = "/images/mocktail_sponsorhip_packet.pdf";

export const HOTEL_NAME = "Lakeside Inn";
export const HOTEL_BLOCK_URL =
  "https://www.skywaresystems.net/SkyBook?PropertyRowID=261&HotelID=1&Code=JEN2026";

export const EVENT_SPONSORS = [
  {
    name: "LRVS Advisory Group",
    tier: "Presenting Sponsor",
    href: "https://www.lrvsadvisory.com/",
    logo: "/images/sponsors/lrvs-advisory-group.png",
    featured: true,
    surface: "light" as const,
  },
  {
    name: "Aussemista Style",
    tier: "Connection Sponsor",
    href: "https://www.aussemistastyle.com/",
    logo: "/images/sponsors/aussemista-style.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Howe2Organize",
    tier: "Scholarship Sponsor",
    href: "https://www.howe2organize.com/",
    logo: "/images/sponsors/howe2organize.png",
    featured: false,
    surface: "light" as const,
  },
] as const;

export const TICKET_TIERS = {
  vip: {
    key: "vip",
    label: "VIP — Mocktail Hour + Main Event",
    shortLabel: "VIP",
    price: 169,
    stripeUrl: "https://buy.stripe.com/7sYdRa18B29W3gggn65Rm0f",
    description:
      "Mocktail hour with Kelley Lynn on November 13, plus the full main event on November 14.",
  },
  regular: {
    key: "regular",
    label: "General Admission — Main Event",
    shortLabel: "General Admission",
    price: 129,
    stripeUrl: "https://buy.stripe.com/dRmfZicRjdSEcQQ2wg5Rm0e",
    description:
      "The full main event — welcome, keynotes, breakouts, lunch, and The Hope Mic Story Slam.",
  },
} as const;

export type TicketTierKey = keyof typeof TICKET_TIERS;

export const SPONSOR_TIERS = [
  {
    key: "presenting",
    label: "Presenting Sponsor",
    price: 7500,
    stripeUrl: "https://buy.stripe.com/eVq7sM8B37ugeYY8UE5Rm06",
    availability: "Only 1 available",
  },
  {
    key: "healing",
    label: "Healing Sponsor",
    price: 3500,
    stripeUrl: "https://buy.stripe.com/3cI00kcRj7ugeYYdaU5Rm07",
    availability: "4 slots left",
  },
  {
    key: "connection",
    label: "Connection Sponsor",
    price: 2500,
    stripeUrl: "https://buy.stripe.com/cNiaEY5oRbKwg32daU5Rm08",
    availability: "4 slots left",
  },
  {
    key: "community",
    label: "Community Supporter",
    price: 1000,
    stripeUrl: "https://buy.stripe.com/14AeVe6sV15S5oogn65Rm09",
    availability: "4 slots left",
  },
  {
    key: "vip_mocktail",
    label: "VIP Mocktail Hour Sponsor",
    price: 1500,
    stripeUrl: "https://buy.stripe.com/fZu8wQ04xeWIbMM5Is5Rm0a",
    availability: "Only 1 available",
  },
  {
    key: "hope_mic",
    label: "The Hope Mic Story Slam Sponsor",
    price: 1500,
    stripeUrl: "https://buy.stripe.com/dRm28saJb9Co5oo3Ak5Rm0b",
    availability: "Only 1 available",
  },
  {
    key: "lunch",
    label: "Lunch Sponsor",
    price: 1000,
    stripeUrl: "https://buy.stripe.com/dRm4gA8B315S2cc0o85Rm0c",
    availability: "Only 1 available",
  },
  {
    key: "coffee",
    label: "Coffee & Connection Sponsor",
    price: 550,
    stripeUrl: "https://buy.stripe.com/5kQ9AUaJb4i4aIIb2M5Rm0d",
    availability: "Only 1 available",
  },
] as const;

export type SponsorTierKey = (typeof SPONSOR_TIERS)[number]["key"];

export function getTicketTier(key: string) {
  return TICKET_TIERS[key as TicketTierKey] ?? null;
}

export function getSponsorTier(key: string) {
  return SPONSOR_TIERS.find((tier) => tier.key === key) ?? null;
}

export function stripeUrlWithEmail(baseUrl: string, email: string) {
  const url = new URL(baseUrl);
  url.searchParams.set("prefilled_email", email);
  return url.toString();
}
