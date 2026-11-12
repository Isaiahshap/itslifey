export const LAL_EVENT_NAME =
  "Life After Loss: An Evening of Support & Planning";
export const LAL_EVENT_SHORT_NAME = "Life After Loss";
/** Menu label. The line break keeps the long title readable in the Events dropdown. */
export const LAL_NAV_LABEL =
  "The Stuff Nobody Tells You:\nMoney, Estate Planning & Widowhood";
export const LAL_EVENT_DATE = "February 9, 2027";
export const LAL_EVENT_TIME = "6–8 PM";
export const LAL_EVENT_DATE_LONG = "Tuesday, February 9, 2027";
export const LAL_EVENT_WHEN = "February 9, 2027 · 6–8 PM";
export const LAL_EVENT_VENUE = "Tutti Bellissima";
export const LAL_EVENT_VENUE_FULL = "Tutti Bellissima Intimates";
export const LAL_EVENT_CITY = "Norwell, MA";
export const LAL_EVENT_ADDRESS = "392 Washington Street, Norwell, MA 02061";
export const LAL_EVENT_LOCATION = `${LAL_EVENT_VENUE} · ${LAL_EVENT_CITY}`;
export const LAL_EVENT_PATH = "/events/life-after-loss";
export const LAL_EVENT_REGISTER_URL =
  "https://www.eventbrite.com/e/norwell-life-after-loss-an-evening-of-support-planning-tickets-2004440377126";

export const LAL_IMAGE_DIR = "/images/events/life-after-loss" as const;

export const LAL_PARTNERS = [
  {
    name: "It's Lifey",
    href: "/",
    logo: "/images/itslifeylogo.png",
  },
  {
    name: "Law Mom",
    href: "https://lawmom.com/",
    logo: `${LAL_IMAGE_DIR}/law-mom-logo.png`,
  },
  {
    name: "Kaplan Family Financial",
    href: "https://kaplanfamilyfinancial.com/",
    logo: `${LAL_IMAGE_DIR}/kaplan-logo.png`,
  },
] as const;

export const LAL_SPEAKERS = [
  {
    name: "Sam Allen",
    role: "Estate Planning Attorney & Founder, Law Mom",
    bio: "Sam Allen leads Law Mom, helping individuals and families plan for the future and protect what matters most. Through personalized estate-planning guidance, Sam helps clients make informed decisions about their assets, loved ones, and legacies.",
    photo: `${LAL_IMAGE_DIR}/sam-allen.jpg`,
    companyHref: "https://lawmom.com/",
  },
  {
    name: "Alex Snyder",
    role: "Partner & Financial Advisor, Kaplan Family Financial",
    bio: "Alex Snyder takes a personal, collaborative approach to financial planning, helping families understand their financial goals and make informed long-term decisions. Alex works alongside estate-planning professionals to help align clients' financial strategies with their broader family needs.",
    photo: `${LAL_IMAGE_DIR}/alex-snyder.jpg`,
    companyHref: "https://kaplanfamilyfinancial.com/",
  },
] as const;

export const LAL_TOPICS = [
  {
    title: "Your estate plan, rewritten for you",
    text: "Law Mom® will walk through what needs updating now: your will or trust, your health care proxy and power of attorney, and who's named to step in for you.",
  },
  {
    title: "Your finances, with confidence",
    text: "Alex Snyder will help you make sense of what comes next: retitling accounts, updating beneficiaries, understanding survivor benefits, and building a plan that lets you feel steady again. Big financial decisions can wait until you're ready.",
  },
] as const;
