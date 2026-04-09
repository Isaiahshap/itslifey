/**
 * Past / archived retreat listings and detail copy.
 * Images live under public/images/Retreats/…
 */

export type PastRetreatKind = "upcoming" | "past";

export type PastRetreat = {
  slug: string;
  kind: PastRetreatKind;
  cardTitle: string;
  cardEyebrow: string;
  /** Short promo line on the card */
  cardBadge?: string;
  cardDescription: string;
  /** H1 on the detail page */
  pageTitle: string;
  /** Hero / card cover; omit when photos aren’t available yet */
  coverImage?: string;
  coverAlt?: string;
  /** Extra `object-*` classes for the detail hero only (with `object-cover`). */
  coverHeroObjectPosition?: string;
  gallery: { src: string; alt: string }[];
  venueUrl?: string;
  venueLabel?: string;
  body: string[];
  seoTitle: string;
  seoDescription: string;
};

function img(folder: string, file: string, alt: string) {
  const src = `/images/Retreats/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
  return { src, alt };
}

const SUMMER_2025_FOLDER = "Summer2025";
const FALL_2025_FOLDER = "fall 2025";

const summer2025Files = [
  "Jen Kitchen Table Horizontal.webp",
  "IMG_0683.webp",
  "IMG_1698.webp",
  "IMG_1845.webp",
  "IMG_1908.webp",
  "IMG_1828.webp",
  "IMG_1832.webp",
  "IMG_1865.webp",
  "IMG_1869.webp",
  "IMG_1856.webp",
] as const;

const fall2025Files = [
  "IMG_0395.webp",
  "IMG_0966.webp",
  "IMG_0978.webp",
  "IMG_1241.webp",
  "IMG_173840_0.webp",
  "IMG_230434_0.webp",
] as const;

export const PAST_RETREATS: PastRetreat[] = [
  {
    slug: "spring-2026",
    kind: "upcoming",
    cardBadge: "Sold out in 10 days",
    cardEyebrow: "Early May 2026 · Cape Cod",
    cardTitle: "Spring retreat with Lisa Pontius",
    cardDescription:
      "Intimate weekend retreat — sold out in 10 days. Grounding sessions, movement, Tarot evening, and the Red String Ceremony.",
    pageTitle: "Spring 2026 retreat",
    venueUrl: "https://www.larkhotels.com/massachusetts/cape-cod/falmouth/the-coonamessett",
    venueLabel: "The Coonamessett (venue)",
    gallery: [],
    body: [
      "Co-hosted by social influencer and widow Lisa Pontius, this intimate weekend retreat is designed for widows ready to step away, breathe, and reconnect with themselves and others who truly understand.",
      "From a warm Friday arrival and grounding nature session to an evening Tarot experience, the weekend begins with intention, calm, and a touch of magic.",
      "Saturday blends movement and meaning with yoga, Reiki, JourneyDance, and optional 1:1 sessions including tarot, mediumship, and astrology — all balanced with plenty of time to rest and restore.",
      "Guests will also share meals, stories, and a Girls Night Out, creating space for both deep connection and unexpected moments of lightness.",
      "On Sunday, a powerful nervous system experience will help guests regulate and reconnect, honoring that grief lives in the body as much as the mind.",
      "The retreat closes with Jen Newberg’s final session and the unforgettable Red String Ceremony — leaving guests grounded, connected, and reminded that they are not alone.",
    ],
    seoTitle: "Spring 2026 retreat — It's Lifey",
    seoDescription:
      "Sold-out intimate spring weekend for widows on Cape Cod, co-hosted with Lisa Pontius — Tarot, movement, nervous system care, and the Red String Ceremony.",
  },
  {
    slug: "fall-2025",
    kind: "past",
    cardEyebrow: "Fall 2025 · New Hampshire",
    cardTitle: "Fall Widow Retreat",
    cardDescription:
      "Lake Winnipesaukee, crisp air, and fall foliage — mediumship, yoga, JourneyDance, fire ceremony, and sound healing.",
    pageTitle: "Fall 2025 widow retreat",
    coverImage: img(FALL_2025_FOLDER, "IMG_1241.webp", "Fall retreat gathering near the lake").src,
    coverAlt: "Widows together during the fall retreat weekend",
    coverHeroObjectPosition: "object-[center_72%]",
    gallery: fall2025Files.map((file, i) =>
      img(FALL_2025_FOLDER, file, `Fall 2025 retreat — photo ${i + 1}`),
    ),
    body: [
      "The It’s Lifey Fall Widow Retreat took place at the serene Inn on Golden Pond, nestled near the peaceful waters of Lake Winnipesaukee, surrounded by crisp air and vibrant fall foliage.",
      "From the moment women arrived, the weekend offered a blend of structure and spaciousness, opening with grounding sessions, intuitive healing, and meaningful connection led by wellness leaders from across New England.",
      "The experience wove together powerful modalities including mediumship, yoga, JourneyDance, and guided meditation, allowing each woman to engage in what she needed most.",
      "There was time for everything — shared meals, optional hikes through autumn landscapes, quiet reflection, and deep conversations that only happen when everyone truly “gets it.”",
      "Evenings brought a mix of warmth and release, from dinners out to a moving fire ceremony focused on letting go.",
      "The retreat closed with sound healing and the Red String Ceremony, leaving each woman feeling more connected, supported, and held as she stepped back into her life.",
    ],
    seoTitle: "Fall 2025 Widow Retreat — It's Lifey",
    seoDescription:
      "Highlights from the It’s Lifey fall retreat at Inn on Golden Pond — Lake Winnipesaukee, healing modalities, and community with women who understand.",
  },
  {
    slug: "summer-2025-berkshires",
    kind: "past",
    cardEyebrow: "Summer 2025 · Berkshires",
    cardTitle: "First Summer Retreat",
    cardDescription:
      "Our first Berkshires weekend — private chef, voices like Rosie Moss and Kelley Lynn, boating, farm visits, and women who arrived as strangers.",
    pageTitle: "First summer retreat · Berkshires",
    coverImage: img(SUMMER_2025_FOLDER, "IMG_1832.webp", "Women together at the first Berkshires summer retreat").src,
    coverAlt: "Group of women at the first It’s Lifey summer retreat in the Berkshires",
    coverHeroObjectPosition: "object-[center_44%]",
    gallery: summer2025Files.map((file, i) =>
      img(SUMMER_2025_FOLDER, file, `First summer retreat — photo ${i + 1}`),
    ),
    body: [
      "The first It’s Lifey Summer Retreat in the Berkshires brought together an incredible group of women in a gorgeous private home, where every detail — including meals prepared by a private chef — was designed to allow guests to simply arrive and exhale.",
      "The experience featured powerful voices like Rosie Moss, Michelle Bader Ebersole, and Kelley Lynn, who shared their stories with honesty, humor, and heart.",
      "Days were thoughtfully balanced with connection and restoration, from meaningful group conversations to peaceful time on the water boating together.",
      "Guests also explored the beauty of the Berkshires with visits to a local organic farm and market, grounding themselves in nature and simplicity.",
      "It was more than a retreat — it was a deeply personal, shared experience where women arrived as strangers and left feeling seen, supported, and no longer alone.",
    ],
    seoTitle: "First Summer Retreat 2025 — Berkshires — It's Lifey",
    seoDescription:
      "The first It’s Lifey summer retreat in the Berkshires — private chef, inspiring speakers, boating, farm visits, and community for widows.",
  },
];

export function getPastRetreat(slug: string): PastRetreat | undefined {
  return PAST_RETREATS.find((r) => r.slug === slug);
}

export function getPastRetreatSlugs(): string[] {
  return PAST_RETREATS.map((r) => r.slug);
}
