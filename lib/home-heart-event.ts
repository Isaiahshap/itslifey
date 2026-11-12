export const HHH_EVENT_NAME = "Home, Heart & What's Next";
export const HHH_EVENT_PATH = "/events/home-heart-whats-next";
export const HHH_EVENT_DATE_LONG = "Thursday, March 4, 2027";
export const HHH_EVENT_TIME = "6:30–8:00 PM";
export const HHH_EVENT_WHEN = "March 4, 2027 · 6:30–8:00 PM";
export const HHH_EVENT_CITY = "Wellesley, MA";
export const HHH_EVENT_PLACE = "At the home of Ashley Liddle";
export const HHH_EVENT_ADDRESS = "22 Boulder Road, Wellesley, MA";
export const HHH_EVENT_LOCATION = `${HHH_EVENT_PLACE} · ${HHH_EVENT_CITY}`;
export const HHH_RSVP_EMAIL = "ashley@ashleyliddle.com";
export const HHH_RSVP_HREF = `mailto:${HHH_RSVP_EMAIL}?subject=${encodeURIComponent(
  "RSVP: Home, Heart & What's Next"
)}`;
export const HHH_DIRECTIONS_HREF =
  "https://www.google.com/maps/search/?api=1&query=22%20Boulder%20Road%2C%20Wellesley%2C%20MA";

export const HHH_TOPICS = [
  {
    title: "The emotional side of home",
    text: "Memories, attachments, and why letting go can be so complicated.",
  },
  {
    title: "Staying, selling, or simply waiting",
    text: "How to figure out what's right for you, without pressure or a timeline.",
  },
  {
    title: "The practical stuff",
    text: "Understanding your home's value, the real estate market, and what to consider financially and logistically.",
  },
  {
    title: "Rightsizing your life",
    text: "It's not always about downsizing. It's about finding the space that fits who you are today.",
  },
  {
    title: "Honoring the past while making room for the future",
    text: "Because moving forward doesn't mean leaving your memories behind.",
  },
] as const;

export const HHH_HOSTS = [
  {
    name: "Ashley Liddle",
    role: "Coldwell Banker Realty",
    bio: "Ashley specializes in helping individuals and families navigate real estate decisions during significant life transitions. She understands that decisions about home are rarely just about buying or selling — they're deeply personal. With compassion, thoughtful guidance, and a focus on each client's unique needs, Ashley helps people make informed decisions that balance financial realities, emotional well-being, and long-term goals.",
    href: "https://www.ashleyliddle.com/",
    linkLabel: "ashleyliddle.com",
  },
  {
    name: "Shereen Berlin",
    role: "Coldwell Banker Realty",
    bio: "Shereen brings extensive real estate expertise and a personal, concierge-level approach to helping clients navigate life's important transitions. Known for her exceptional service and trusted network of mortgage professionals, attorneys, contractors, movers, organizers, and more, she helps make even complicated real estate decisions feel manageable. Serving Greater Boston and the surrounding suburbs, Shereen values the genuine relationships she builds with her clients, many of whom become lifelong friends.",
    href: "https://homesbyshereen.com/",
    linkLabel: "homesbyshereen.com",
  },
] as const;
