export const EVENT_NAME = "Widow Wellness & Connection Experience";
export const EVENT_SHORT_TAGLINE = "Real talk. Real connection. Real hope.";
export const EVENT_DATES = "November 13–14, 2026";
export const EVENT_LOCATION = "Presence & Co. · Reading, Massachusetts";

export const EVENT_PATH = "/events/widow-wellness-connection-experience";
export const SPONSORSHIP_PATH =
  "/events/widow-wellness-connection-experience/sponsorship";
export const SPONSORSHIP_PDF = "/sponsor.pdf";

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
    name: "Kaplan Family Financial",
    tier: "Healing Sponsor",
    href: "https://kaplanfamilyfinancial.com/",
    logo: "/images/sponsors/kaplan-family-financial.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Law Mom",
    tier: "Healing Sponsor",
    href: "https://lawmom.com/",
    logo: "/images/sponsors/law-mom.png",
    featured: false,
    surface: "dark" as const,
  },
  {
    name: "Cove Wellness",
    tier: "Healing Sponsor",
    href: "https://thecovewellnesscenter.com/",
    logo: "/images/sponsors/cove-wellness.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Ascent Capital",
    tier: "Healing Sponsor",
    href: "https://calendly.com/arieldetlefsen",
    logo: "/images/sponsors/ascent-capital.webp",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "A New Path Coaching",
    tier: "The Hope Mic Story Slam Sponsor",
    href: "https://www.anewpathcoaching.com/",
    logo: "/images/sponsors/newpath.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Parents Estate Planning",
    tier: "VIP Mocktail Hour Sponsor",
    href: "https://www.parentsestateplanning.com/",
    logo: "/images/sponsors/theparentsestateplanning.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Lamacchia Realty",
    tier: "Connection Sponsor",
    href: "https://lamacchiarealty.com/team_members/tina-davis-chiruna/",
    logo: "/images/sponsors/lamacchia.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Aussemista Style",
    tier: "Connection Sponsor",
    href: "https://www.aussemistastyle.com/",
    logo: "/images/sponsors/aussemista-style.webp",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Dovetail Mortgage",
    tier: "Connection Sponsor",
    href: "https://dovetail-mortgage.com",
    logo: "/images/sponsors/dovetail-mortgage.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Tasteful Skin",
    tier: "Connection Sponsor",
    href: "https://tastefulskin.com/",
    logo: "/images/sponsors/tasteful-skin.webp",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "The Modern Events Company",
    tier: "Connection Sponsor",
    href: "https://themoderneventsco.com/",
    logo: "/images/sponsors/the-modern-events-company.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Touchstone Closing & Escrow",
    tier: "Connection Sponsor",
    href: "https://touchstoneclosing.com/",
    logo: "/images/sponsors/touchstone-closing.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Ashley Liddle",
    tier: "Community Supporter",
    href: "https://www.elliman.com/",
    logo: "/images/sponsors/douglas-elliman.webp",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Bea.",
    tier: "Community Supporter",
    href: "https://findbea.com/",
    logo: "/images/sponsors/bea.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "The MRP Project",
    tier: "Community Supporter",
    href: "https://themrpproject.org",
    logo: "/images/sponsors/the-mrp-project.jpg",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Eastern Bank",
    tier: "Community Supporter",
    href: "https://www.easternbank.com/",
    logo: "/images/sponsors/eastern-bank.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Howe2Organize",
    tier: "Widow Scholarship Sponsor",
    href: "https://www.howe2organize.com/",
    logo: "/images/sponsors/howe2organize.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Laurie Foley",
    tier: "Widow Scholarship Sponsor",
    href: null,
    logo: "/images/sponsors/laurie-foley.png",
    featured: false,
    surface: "light" as const,
  },
  {
    name: "Lightwork",
    tier: "Coffee & Connection Sponsor",
    href: "https://lightworktr.com/",
    logo: "/images/sponsors/lightwork.png",
    featured: false,
    surface: "light" as const,
  },
] as const;

export type KeynoteSpeaker = {
  name: string;
  role: string;
  org: string;
  bio: string[];
  photo: string | null;
  photoPosition?: string;
  website: string | null;
  websiteLabel?: string;
  social: string | null;
  comingSoon: boolean;
};

export const KEYNOTE_SPEAKERS: KeynoteSpeaker[] = [
  {
    name: "Anita Coyle",
    role: "Main Stage Keynote · November 14",
    org: "Widow We Do Now? Podcast",
    bio: [
      "Anita's world collapsed when her husband died unexpectedly in 2019 while swimming laps, leaving her to raise four kids (ages 12, 8, 5 & 2) alone.",
      "Soon after, she met another young widow named Mel. Having someone who truly understood the widowhood experience was life-saving. They supported each other with dark humor and cheese — which led to the creation of the Widow We Do Now? Podcast. The podcast and its grief community have grown into something beautiful: real friendships, real experiences, real hope.",
      "Anita uses physical activity to help process the challenges of widowed life. She races mountain bikes and triathlons, and is a physical therapist in her professional life.",
    ],
    photo: "/images/widowwellnessimages/anita.jpeg",
    website: "https://widowwedonow.com",
    social: "@Widowwedonow",
    comingSoon: false,
  },
  {
    name: "Linda Limperis",
    role: "Main Stage Keynote · November 14",
    org: "Teacher, Mentor, Counselor & Widow Advocate",
    bio: [
      "Linda became a widow at 54 and suddenly found herself navigating a life she never imagined. Because many of her friends and family had not experienced the loss of a spouse, she felt very alone in her grief. She began doing the work of healing through grief counseling, support groups, journaling, grief classes, yoga, and meditation.",
      "Eventually, Linda moved to New York City to begin a new chapter of her life, where she met and connected with other widows who became an important source of inspiration and support. Her own journey taught her that while grief changes us, there can still be hope, laughter, love, and new possibilities.",
      "Today, Linda is passionate about helping other widows feel less alone. She started a social group in her community to bring widows together and create a space for connection and support. As a teacher, counselor, mentor, and widow advocate, Linda brings warmth, empathy, humor, and honesty to her conversations about grief and rebuilding life after loss.",
      "Linda’s message is that there is no timeline for grief, and grief is never a straight line. It is possible to honor the memories and love we carry while still making new memories, stepping outside our comfort zones, and opening our hearts to what comes next.",
    ],
    photo: "/images/widowwellnessimages/linda-limperis.jpg",
    website: "https://www.instagram.com/lindakarol42/",
    websiteLabel: "Instagram",
    social: "@lindakarol42",
    comingSoon: false,
  },
  {
    name: "Lisa Woolery",
    role: "Main Stage Keynote · November 14",
    org: "CWO (Chief Widow Officer), The Widow’s Comeback",
    bio: [
      "Lisa Woolery is an award-winning author, widow advocate, and founder of The Widow’s Comeback, a community dedicated to helping widows navigate grief, rediscover themselves, and build a life they never expected to have.",
      "Lisa became a widow in 2019 when her husband, Eric, died, leaving her to raise their two tweens and navigate a future she could not yet imagine. As she searched for stories of women who had survived widowhood, she realized how deeply she wanted to share her own story and help other women find hope.",
      "She is the author of the award-winning memoir The Widow’s Comeback, along with a grief journal and other resources created specifically for widows. Through her writing, workshops, teaching, and online community, Lisa combines honest storytelling, humor, faith, and practical guidance.",
      "Her message is simple: Your life is not over. Lisa understands how devastating widowhood can feel, but she also knows that hope can return, joy can find its way back in, and it is possible to rebuild a meaningful life while still honoring the love and memories you carry.",
      "Lisa is passionate about helping widows feel less alone and showing them that a comeback is possible. She brings warmth, honesty, humor, and hope to her conversations, offering new widows encouragement for the road ahead and longer-term widows a reminder of how far they have already come.",
    ],
    photo: "/images/widowwellnessimages/lisa-woolery.jpg",
    photoPosition: "50% 18%",
    website: "https://www.thewidowscomeback.com/",
    social: null,
    comingSoon: false,
  },
];

export const BREAKOUT_LEADERS = [
  {
    name: "Karen Sullivan & Jeff Van Siclen · LRVS Advisory Group",
    slot: "morning" as const,
    session: "Your Next Financial Chapter: Financial Planning after Loss",
    description: [
      "Life after loss often comes with financial decisions you never expected to make. This session will offer practical guidance to help you feel more informed and confident about your financial future.",
    ],
    website: "https://www.lrvsadvisory.com/",
    photo: "/images/widowwellnessimages/karen-sullivan.jpg",
  },
  {
    name: "Alyssa Zonghetti · A to Z Hypnotherapy",
    slot: "morning" as const,
    session: "Reclaiming Yourself in a Life You Didn't Choose",
    description: [
      "Widowhood can leave you wondering who you are now. This session is about reconnecting with yourself, reclaiming your identity, and finding your way into a new chapter.",
    ],
    website: "https://www.atozhypnotherapy.com/about",
    photo: "/images/widowwellnessimages/alyssa-zonghetti.webp",
  },
  {
    name: "Marlene Boyette · Leela Yoga + Wellness",
    slot: "morning" as const,
    session:
      "Healing Through Mind, Body, and Heart Connection: A Three Part Yoga, Mindfulness & Reflection Practice",
    description: [
      "This gentle, three part practice guides participants through the mind, the body, and the heart.",
      "We begin by settling the mind with grounding and mindfulness, then move into a brief restorative and heart opening yoga practice to help each person soften back into her body and rest.",
      "We close at the heart center, weaving together gentle movement, seated practice, and space for reflection and sharing, so that grief and warmth can be held together in community.",
    ],
    website: "https://leelayogawellness.com/about-marlene",
    photo: "/images/widowwellnessimages/marlene-boyette.jpg",
  },
  {
    name: "Susan Trotter · Relationship Coaching",
    slot: "afternoon" as const,
    session: "Opening Your Heart Again: Dating & Relationships",
    description: [
      "Exploring the possibility of opening your heart again after loss. Susan will share guidance and compassionate insight around dating, relationships, and navigating this part of widowhood.",
    ],
    website: "https://www.susantrotterphd.com/",
    photo: "/images/widowwellnessimages/susan-trotter.jpg",
  },
  {
    name: "Colleen Marie · Colleen Marie Healing",
    slot: "afternoon" as const,
    session: "The Art of Letting Go",
    description: [
      "A beautiful opportunity to explore what it means to release what no longer serves you and make space for what comes next. Colleen will guide you through reflection and spiritual practices designed to support your journey forward.",
    ],
    website: "https://colleenmariehealing.com/",
    photo: "/images/widowwellnessimages/colleen-marie.webp",
  },
  {
    name: "Carrie Rowan · Look for the Good",
    slot: "afternoon" as const,
    session: "The Hidden Story Stealing Your Power",
    description: [
      "Your story didn't end with your loss. Carrie will help you think about what comes next and the possibilities that still exist for your life.",
    ],
    website: "https://carrierowan.com/",
    photo: "/images/widowwellnessimages/carrie-rowan.jpg",
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
    availability: "Sold out",
  },
  {
    key: "connection",
    label: "Connection Sponsor",
    price: 2500,
    stripeUrl: "https://buy.stripe.com/cNiaEY5oRbKwg32daU5Rm08",
    availability: "Sold out",
  },
  {
    key: "hope_mic",
    label: "The Hope Mic Story Slam Sponsor",
    price: 1500,
    stripeUrl: "https://buy.stripe.com/dRm28saJb9Co5oo3Ak5Rm0b",
    availability: "Sold out",
  },
  {
    key: "vip_mocktail",
    label: "VIP Mocktail Hour Sponsor",
    price: 1500,
    stripeUrl: "https://buy.stripe.com/fZu8wQ04xeWIbMM5Is5Rm0a",
    availability: "Sold out",
  },
  {
    key: "community",
    label: "Community Supporter",
    price: 1000,
    stripeUrl: "https://buy.stripe.com/14AeVe6sV15S5oogn65Rm09",
    availability: "1 slot left",
  },
  {
    key: "healing",
    label: "Healing Sponsor",
    price: 3500,
    stripeUrl: "https://buy.stripe.com/3cI00kcRj7ugeYYdaU5Rm07",
    availability: "Sold out",
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
    availability: "Sold out",
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
