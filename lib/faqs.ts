/** Shared FAQ content for /faq and HopeHub.
 *  Answers may include markdown-style links: [label](/path)
 */

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const HOPEHUB_FAQS: FaqItem[] = [
  {
    q: "Who can join HopeHub?",
    a: "HopeHub is for widows—women who have lost a spouse or life partner. Whether your loss was recent or years ago, whether you’re 25 or 75, you’re welcome. Every widow’s story is different, and that’s honored here.",
  },
  {
    q: "How is HopeHub different from other groups?",
    a: "Big social feeds can feel loud and unsafe. Local meetups can be hard to find. HopeHub is one private home for real conversation, expert guidance, structured groups, and paths to in-person connection—available whenever you need it.",
  },
  {
    q: "Do I need to share my story or participate a lot?",
    a: "No. Many members start by reading and listening. Join in when and how you want. There’s no pressure to share before you’re ready. Sometimes simply being near others who understand is healing.",
  },
  {
    q: "Are support groups facilitated by professionals?",
    a: "Groups are led by widows who understand because they’ve lived it—loneliness, grief’s ups and downs, skills, solo parenting, dating, and more. Open meetings let you ask questions and share where you are that day. Professional support is there when you need it.",
  },
  {
    q: "Is my information private and secure?",
    a: "Yes. Your privacy matters. Information isn’t sold to third parties, and confidentiality is taken seriously. What you share in HopeHub is meant to stay in this community.",
  },
  {
    q: "Is HopeHub really free?",
    a: "Yes. HopeHub is completely free—full access to the community, groups, expert sessions, resources, and events. No paid tier, no surprise fees.",
  },
  {
    q: "Are there in-person events?",
    a: "Yes. There are in-person gatherings like the [Widow Wellness & Connection Experience](/events/widow-wellness-connection-experience) and multi-day [retreats](/retreats/winter-widow-wellness). Details and registration are shared inside HopeHub and on the It’s Lifey site.",
  },
  {
    q: "How do I get started?",
    a: "Create your free account—it takes a few minutes. Set up your profile, say hello if you’d like, and explore at your own pace.",
  },
];

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "hopehub",
    title: "HopeHub",
    items: HOPEHUB_FAQS,
  },
  {
    id: "getting-started",
    title: "Getting started with It’s Lifey",
    items: [
      {
        q: "What is It’s Lifey?",
        a: "It’s Lifey is a support, retreat, and community organization for widows—created by Jennifer, a widow herself. We offer [HopeHub](/hopehub) (a free online community), in-person gatherings, [retreats](/retreats/winter-widow-wellness), and ongoing support so widows don’t have to navigate life after loss alone.",
      },
      {
        q: "Who is It’s Lifey for?",
        a: "Widows—women who have lost a spouse or life partner. Whether your loss was recent or years ago, you are welcome. Lived experience and emotional safety come first.",
      },
      {
        q: "Where should I start if I’m new?",
        a: "If you want connection from home, join [HopeHub](/hopehub) for free. If you’re ready for an in-person day, explore the [Widow Wellness & Connection Experience](/events/widow-wellness-connection-experience). If you want a longer weekend, look at our upcoming [Winter Retreat](/retreats/winter-widow-wellness) or [Spring Retreat](/retreats/spring-retreat-2027). You can also browse trusted outside resources on our [Resources](/resources) page.",
      },
      {
        q: "Is It’s Lifey a crisis service?",
        a: "No. It’s Lifey offers community and support, not emergency crisis care. If you are in crisis or having suicidal thoughts, call or text 988, or call 911 for a life-threatening emergency.",
      },
    ],
  },
  {
    id: "retreats-events",
    title: "Retreats & events",
    items: [
      {
        q: "What kinds of gatherings do you host?",
        a: "One-day experiences like the [Widow Wellness & Connection Experience](/events/widow-wellness-connection-experience), multi-day retreats such as [Winter Widow Wellness](/retreats/winter-widow-wellness) and [Spring retreats](/retreats/spring-retreat-2027), plus virtual offerings when available. Each gathering is designed for connection, rest, and being with women who understand. You can also browse [past retreats](/retreats/past).",
      },
      {
        q: "Do I have to come with a friend?",
        a: "No. Many women arrive alone and leave with new friendships. You are welcome to come exactly as you are.",
      },
      {
        q: "How do I hear about new retreats first?",
        a: "Join the interest list on the [Winter Retreat](/retreats/winter-widow-wellness) or [Spring 2027 retreat](/retreats/spring-retreat-2027) page, follow updates in [HopeHub](/hopehub), or sign up for soft email updates from the homepage.",
      },
    ],
  },
  {
    id: "resources-support",
    title: "Resources & outside support",
    items: [
      {
        q: "Where can I find crisis or mental health help?",
        a: "Call or text 988 for the Suicide & Crisis Lifeline. Text HOME to 741741 for Crisis Text Line. For local services including counseling and practical help, call 211. Our [Resources](/resources) page lists trusted organizations for grief, mental health, finances, legal aid, parenting, and more.",
      },
      {
        q: "Do you provide medical, legal, or financial advice?",
        a: "No. We share community and curated links to reputable organizations. For medical, legal, or financial decisions, please consult qualified professionals or the specialist resources linked on our [Resources](/resources) page.",
      },
    ],
  },
  {
    id: "practical",
    title: "Practical questions",
    items: [
      {
        q: "How do I contact Jennifer or the team?",
        a: "Use the [Contact](/contact) page form, or email jennifer@itslifey.com. We read every message and respond as soon as we can.",
      },
      {
        q: "How do I stay updated without overwhelm?",
        a: "Join [HopeHub](/hopehub) for community on your own pace, or subscribe to occasional email notes—never noisy, never salesy. You can unsubscribe anytime.",
      },
    ],
  },
];
