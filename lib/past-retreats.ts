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

/** Photos from `public/images/Summer retreat` (web-optimized webp). */
function summerRetreatImg(file: string, alt: string) {
  const src = `/images/${encodeURIComponent("Summer retreat")}/${encodeURIComponent(file)}`;
  return { src, alt };
}

const SUMMER_2025_FOLDER = "Summer2025";
const FALL_2025_FOLDER = "fall 2025";
const SPRING_2026_FOLDER = "spring2026";

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

const spring2026Files = [
  "IMG_2602-upright.webp",
  "IMG_2618-upright.webp",
  "IMG_181043_0-upright.webp",
  "IMG_2483-upright.webp",
  "IMG_2513-upright.webp",
  "IMG_2545-upright.webp",
  "IMG_2567-upright.webp",
  "IMG_2591-upright.webp",
] as const;

/** Experience photos from the July 2026 Summer Widow Wellness Retreat. */
const summer2026ExperienceFiles = [
  "2575.webp",
  "IMG_1431.webp",
  "IMG_4297.webp",
  "IMG_4317.webp",
  "IMG_4332.webp",
  "IMG_4341.webp",
  "IMG_4349.webp",
  "IMG_4366.webp",
  "IMG_4381.webp",
  "IMG_4397.webp",
  "IMG_4446.webp",
  "IMG_4456.webp",
  "IMG_4560.webp",
  "IMG_4575.webp",
  "IMG_4585.webp",
  "IMG_4590.webp",
  "IMG_4615.webp",
  "IMG_4616.webp",
  "IMG_6568.webp",
] as const;

export const PAST_RETREATS: PastRetreat[] = [
  {
    slug: "summer-2026-cape-cod",
    kind: "past",
    cardBadge: "Sold out",
    cardEyebrow: "July 9–12, 2026 · Cape Cod",
    cardTitle: "Summer Widow Wellness Retreat",
    cardDescription:
      "A beautiful weekend of rest, connection, laughter, and tears — with widows who truly understand this journey, and friendships that continued beyond the retreat.",
    pageTitle: "Summer 2026 Widow Wellness Retreat",
    coverImage: summerRetreatImg(
      "2575.webp",
      "Women from the Summer 2026 Widow Wellness Retreat gathered together outdoors",
    ).src,
    coverAlt:
      "Widows together at the Summer 2026 It's Lifey Widow Wellness Retreat",
    coverHeroObjectPosition: "object-[center_40%]",
    gallery: summer2026ExperienceFiles.map((file, i) =>
      summerRetreatImg(file, `Summer 2026 Widow Wellness Retreat — photo ${i + 1}`),
    ),
    body: [
      "What a beautiful weekend we shared at our Summer Widow Wellness Retreat.",
      "Over a few days, an incredible group of widows came together to rest, connect, laugh, cry, reflect, and simply be with women who truly understand this journey. Watching these friendships form and continue beyond the retreat is such a beautiful reminder that healing happens in community.",
      "A heartfelt thank you to our co-host, Colleen Marie, for sharing her wisdom and creating such a meaningful experience for everyone.",
      "If you're longing for this kind of support and connection, we'd love to have you join us at our Widow Wellness & Connection Experience this November — or on the interest list for our Spring 2027 retreat.",
    ],
    seoTitle: "Summer 2026 Widow Wellness Retreat — Cape Cod — It's Lifey",
    seoDescription:
      "Highlights from the It’s Lifey Summer 2026 Widow Wellness Retreat — rest, connection, laughter, and community for widows on Cape Cod.",
  },
  {
    slug: "spring-2026",
    kind: "past",
    cardBadge: "Sold out in 10 days",
    cardEyebrow: "Early May 2026 · Cape Cod",
    cardTitle: "Spring retreat with Lisa Pontius",
    cardDescription:
      "Intimate weekend retreat — sold out in 10 days. Grounding sessions, movement, Tarot evening, and the Red String Ceremony.",
    pageTitle: "Spring 2026 retreat",
    coverImage: img(
      SPRING_2026_FOLDER,
      "IMG_2602-upright.webp",
      "Women together at the Spring 2026 It's Lifey widow retreat",
    ).src,
    coverAlt: "Widows gathered at the Spring 2026 It's Lifey retreat on Cape Cod",
    coverHeroObjectPosition: "object-[center_32%]",
    venueUrl: "https://www.larkhotels.com/massachusetts/cape-cod/falmouth/the-coonamessett",
    venueLabel: "The Coonamessett (venue)",
    gallery: spring2026Files.map((file, i) =>
      img(SPRING_2026_FOLDER, file, `Spring 2026 retreat — photo ${i + 1}`),
    ),
    body: [
      "Co-hosted by social influencer and widow Lisa Pontius, this intimate weekend retreat brought widows together on Cape Cod to step away, breathe, and reconnect with themselves and others who truly understand.",
      "From a warm Friday arrival and grounding nature session to an evening Tarot experience, the weekend began with intention, calm, and a touch of magic.",
      "Saturday blended movement and meaning with yoga, Reiki, JourneyDance, and optional 1:1 sessions including tarot, mediumship, and astrology — all balanced with plenty of time to rest and restore.",
      "Guests shared meals, stories, and a Girls Night Out, creating space for both deep connection and unexpected moments of lightness.",
      "On Sunday, a powerful nervous system experience helped guests regulate and reconnect, honoring that grief lives in the body as much as the mind.",
      "The retreat closed with Jen Newberg’s final session and the unforgettable Red String Ceremony — leaving guests grounded, connected, and reminded that they are not alone.",
    ],
    seoTitle: "Spring 2026 retreat — It's Lifey",
    seoDescription:
      "Highlights from the sold-out Spring 2026 It’s Lifey widow retreat on Cape Cod, co-hosted with Lisa Pontius — Tarot, movement, nervous system care, and the Red String Ceremony.",
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
