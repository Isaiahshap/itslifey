export const EVENT_NAME = "Widow Wellness & Connection Experience";
export const EVENT_SHORT_TAGLINE = "Real talk. Real connection. Real hope.";
export const EVENT_DATES = "November 13–14, 2026";
export const EVENT_LOCATION = "Presence & Co. · Reading, Massachusetts";

export const EVENT_PATH = "/events/widow-wellness-connection-experience";
export const SPONSORSHIP_PATH =
  "/events/widow-wellness-connection-experience/sponsorship";
export const SPONSORSHIP_PDF = "/sponsorship_new.pdf";

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

export const BREAKOUT_LEADERS = [
  {
    name: "Marlene Boyette",
    slot: "morning" as const,
    session:
      "Healing Through Mind, Body, and Heart Connection: A Three Part Yoga, Mindfulness & Reflection Practice",
    description: [
      "This gentle, three part practice guides participants through the mind, the body, and the heart.",
      "We begin by settling the mind with grounding and mindfulness, then move into a brief restorative and heart opening yoga practice to help each person soften back into her body and rest.",
      "We close at the heart center, weaving together gentle movement, seated practice, and space for reflection and sharing, so that grief and warmth can be held together in community.",
    ],
    website: "https://leelayogawellness.com/about-marlene",
    photo: "/images/events/widow-wellness/leaders/marlene-boyette.webp",
  },
  {
    name: "LRVS Financial",
    slot: "morning" as const,
    session: "Navigating Your Financial Next Chapter",
    description: [
      "Life after loss often comes with financial decisions you never expected to make. This session will offer practical guidance to help you feel more informed and confident about your financial future.",
    ],
    website: "https://www.lrvsadvisory.com/",
    photo: "/images/events/widow-wellness/leaders/lrvs-financial.webp",
  },
  {
    name: "Alyssa Zonghetti",
    slot: "morning" as const,
    session: "Reclaiming Yourself in a Life You Didn't Choose",
    description: [
      "Widowhood can leave you wondering who you are now. This session is about reconnecting with yourself, reclaiming your identity, and finding your way into a new chapter.",
    ],
    website: "https://www.atozhypnotherapy.com/about",
    photo: "/images/events/widow-wellness/leaders/alyssa-zonghetti.webp",
  },
  {
    name: "Carrie Rowan",
    slot: "afternoon" as const,
    session: "The Hidden Story Stealing Your Power",
    description: [
      "Your story didn't end with your loss. Carrie will help you think about what comes next and the possibilities that still exist for your life.",
    ],
    website: "https://carrierowan.com/",
    photo: "/images/events/widow-wellness/leaders/carrie-rowan.webp",
  },
  {
    name: "Colleen Marie",
    slot: "afternoon" as const,
    session: "The Art of Letting Go",
    description: [
      "A beautiful opportunity to explore what it means to release what no longer serves you and make space for what comes next. Colleen will guide you through reflection and spiritual practices designed to support your journey forward.",
    ],
    website: "https://colleenmariehealing.com/",
    photo: "/images/events/widow-wellness/leaders/colleen-marie.webp",
  },
  {
    name: "Susan Trotter",
    slot: "afternoon" as const,
    session: "Opening Your Heart Again: Dating & Relationships",
    description: [
      "Exploring the possibility of opening your heart again after loss. Susan will share guidance and compassionate insight around dating, relationships, and navigating this part of widowhood.",
    ],
    website: "https://www.susantrotterphd.com/",
    photo: "/images/events/widow-wellness/leaders/susan-trotter.webp",
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
    key: "connection",
    label: "Connection Sponsor",
    price: 2500,
    stripeUrl: "https://buy.stripe.com/cNiaEY5oRbKwg32daU5Rm08",
    availability: "4 slots left",
  },
  {
    key: "hope_mic",
    label: "The Hope Mic Story Slam Sponsor",
    price: 1500,
    stripeUrl: "https://buy.stripe.com/dRm28saJb9Co5oo3Ak5Rm0b",
    availability: "Only 1 available",
  },
  {
    key: "vip_mocktail",
    label: "VIP Mocktail Hour Sponsor",
    price: 1500,
    stripeUrl: "https://buy.stripe.com/fZu8wQ04xeWIbMM5Is5Rm0a",
    availability: "Only 1 available",
  },
  {
    key: "community",
    label: "Community Supporter",
    price: 1000,
    stripeUrl: "https://buy.stripe.com/14AeVe6sV15S5oogn65Rm09",
    availability: "4 slots left",
  },
  {
    key: "healing",
    label: "Healing Sponsor",
    price: 3500,
    stripeUrl: "https://buy.stripe.com/3cI00kcRj7ugeYYdaU5Rm07",
    availability: "4 slots left",
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
