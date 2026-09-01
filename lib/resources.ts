export type ResourceLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ResourceItem = {
  name: string;
  body: string[];
  links: ResourceLink[];
};

export type ResourceSection = {
  id: string;
  kicker: string;
  title: string;
  intro: string[];
  image?: { src: string; alt: string; position?: string };
  items: ResourceItem[];
  tone?: "crisis" | "default";
};

const summer = (file: string) =>
  `/images/${encodeURIComponent("Summer retreat")}/${file}`;

export const RESOURCES_INTRO = [
  "Losing a spouse can affect every part of your life. Grief, loneliness, parenting, finances, mental health, legal questions, and everyday responsibilities can all become harder at once.",
  "You do not have to figure everything out on your own.",
  "Below are trusted resources that may be able to help—whether you need immediate support, want to connect with other widows, are looking for grief support, or need practical help with finances, parenting, or legal issues.",
] as const;

export const RESOURCES_CLOSING = {
  title: "Not sure where to start?",
  body: [
    "That is okay. You do not need to know exactly what kind of help you need before reaching out.",
    "For immediate emotional support, call or text 988. For help finding local services such as counseling, financial assistance, food, housing, or community programs, call 211.",
    "If what you need most is connection with other widows, explore HopeHub or join an upcoming It’s Lifey gathering.",
    "Take what is useful to you. Leave what is not. There is no single way to move through grief.",
  ],
} as const;

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: "crisis",
    kicker: "Immediate support",
    title: "If you need help right now",
    tone: "crisis",
    intro: [
      "If you are in crisis, reach out now. Support is free, confidential, and available around the clock.",
    ],
    image: {
      src: summer("IMG_4349.webp"),
      alt: "Women gathered around a table in warm candlelight",
      position: "center 40%",
    },
    items: [
      {
        name: "988 Suicide & Crisis Lifeline",
        body: [
          "If you are experiencing suicidal thoughts, overwhelming emotional distress, or a mental health crisis, call or text 988.",
          "Support is free, confidential, and available 24 hours a day.",
        ],
        links: [
          {
            label: "Visit the 988 Suicide & Crisis Lifeline",
            href: "https://988lifeline.org/",
            external: true,
          },
        ],
      },
      {
        name: "Crisis Text Line",
        body: [
          "If talking on the phone feels difficult, you can connect with a trained Crisis Counselor by text.",
          "Text HOME to 741741 in the United States. Support is free and available 24/7.",
        ],
        links: [
          {
            label: "Visit Crisis Text Line",
            href: "https://www.crisistextline.org/",
            external: true,
          },
        ],
      },
      {
        name: "Emergency services",
        body: [
          "If you or someone else is in immediate physical danger or experiencing a life-threatening emergency, call 911 or go to the nearest emergency room.",
        ],
        links: [],
      },
    ],
  },
  {
    id: "connect",
    kicker: "Community",
    title: "Connect with other widows",
    intro: [
      "Sometimes the most helpful person to talk to is someone who understands what it is like to lose a spouse.",
    ],
    image: {
      src: summer("IMG_4585.webp"),
      alt: "Widows together indoors during an It's Lifey retreat",
      position: "center 35%",
    },
    items: [
      {
        name: "It’s Lifey HopeHub",
        body: [
          "HopeHub is a free, private space created by It’s Lifey to help widows connect, share, and find community with others who understand widowhood.",
        ],
        links: [
          {
            label: "Visit HopeHub",
            href: "https://www.itslifey.com/hopehub",
            external: true,
          },
        ],
      },
      {
        name: "It’s Lifey events",
        body: [
          "It’s Lifey hosts gatherings designed to bring widows together in a supportive, welcoming environment—a chance to meet other widows, build real connections, and spend time with people who understand.",
          "Check upcoming events and ways to participate.",
        ],
        links: [
          {
            label: "View upcoming gathering",
            href: "https://www.itslifey.com/events/widow-wellness-connection-experience",
            external: true,
          },
          {
            label: "Support groups & events",
            href: "https://www.itslifey.com/support-groups",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "grief",
    kicker: "Support",
    title: "Grief & bereavement",
    intro: [
      "There is no correct timeline for grief. Support can be useful whether your loss happened recently or many years ago.",
    ],
    image: {
      src: summer("IMG_4560.webp"),
      alt: "Women in quiet conversation in a sunlit retreat house",
      position: "center 40%",
    },
    items: [
      {
        name: "Dougy Center",
        body: [
          "The Dougy Center provides free grief resources for adults, children, teenagers, young adults, parents, and families—covering many kinds of loss, including the death of a spouse.",
        ],
        links: [
          {
            label: "Explore Dougy Center resources",
            href: "https://www.dougy.org/grief-support-resources",
            external: true,
          },
        ],
      },
      {
        name: "The Dinner Party Resource Library",
        body: [
          "Guides, conversations, books, and practical resources focused on grief, loss, and life after someone you love dies.",
        ],
        links: [
          {
            label: "Explore The Dinner Party resources",
            href: "https://www.thedinnerparty.org/resources",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "mental-health",
    kicker: "Care",
    title: "Depression, anxiety & mental health",
    intro: [
      "Grief can sometimes overlap with depression, anxiety, trauma, sleep problems, or other mental health concerns. If you are struggling, reaching out for support can be an important step.",
    ],
    image: {
      src: summer("IMG_4366.webp"),
      alt: "Women practicing gentle movement together at a retreat",
      position: "center 35%",
    },
    items: [
      {
        name: "NAMI HelpLine",
        body: [
          "The National Alliance on Mental Illness provides free mental health information, support, and help finding resources.",
          "Call 1-800-950-NAMI (6264) or text NAMI to 62640. The NAMI HelpLine is not an emergency crisis service. If you are in crisis, call or text 988.",
        ],
        links: [
          {
            label: "Visit the NAMI HelpLine",
            href: "https://www.nami.org/nami-helpline/",
            external: true,
          },
          {
            label: "Find your local NAMI",
            href: "https://www.nami.org/find-your-local-nami/",
            external: true,
          },
        ],
      },
      {
        name: "FindTreatment.gov",
        body: [
          "A federal directory for finding mental health and substance use treatment providers in your area.",
        ],
        links: [
          {
            label: "Find mental health treatment",
            href: "https://findtreatment.gov/",
            external: true,
          },
        ],
      },
      {
        name: "SAMHSA National Helpline",
        body: [
          "Confidential information and referrals for people looking for mental health or substance use treatment.",
          "Call 1-800-662-4357.",
        ],
        links: [
          {
            label: "View SAMHSA helplines",
            href: "https://www.samhsa.gov/find-help/helplines",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "suicide-loss",
    kicker: "Specialized support",
    title: "After losing a spouse to suicide",
    intro: [
      "Losing a spouse to suicide can bring additional layers of grief, trauma, confusion, anger, and unanswered questions. Specialized support is available.",
    ],
    image: {
      src: summer("IMG_4615.webp"),
      alt: "Women gathered outdoors in quiet connection",
      position: "center 40%",
    },
    items: [
      {
        name: "988 Suicide & Crisis Lifeline",
        body: [
          "You can contact 988 not only if you are having suicidal thoughts, but also if you are overwhelmed by grief, emotional distress, or concern for someone else.",
          "Call or text 988.",
        ],
        links: [
          {
            label: "Visit the 988 Suicide & Crisis Lifeline",
            href: "https://988lifeline.org/",
            external: true,
          },
        ],
      },
      {
        name: "Crisis Text Line suicide resources",
        body: [
          "Information about suicide, coping after a suicide loss, and helping someone who may be experiencing suicidal thoughts.",
        ],
        links: [
          {
            label: "Explore suicide support resources",
            href: "https://www.crisistextline.org/topics/suicide/",
            external: true,
          },
        ],
      },
      {
        name: "Dougy Center",
        body: [
          "Resources for adults, parents, children, and families grieving a death by suicide.",
        ],
        links: [
          {
            label: "Explore grief support resources",
            href: "https://www.dougy.org/grief-support-resources",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "parenting",
    kicker: "Family",
    title: "Parenting after the loss of a spouse",
    intro: [
      "Parenting while grieving can be exhausting. You may be trying to manage your own loss while also helping your children understand theirs. You do not need to have all the answers.",
    ],
    image: {
      src: "/images/widowwellnessimages/IMG_0604.jpeg",
      alt: "Women connecting warmly at an It's Lifey gathering",
      position: "center 40%",
    },
    items: [
      {
        name: "Dougy Center: resources for children",
        body: [
          "Age-appropriate activities, information, and support resources for grieving children.",
        ],
        links: [
          {
            label: "Explore resources for children",
            href: "https://www.dougy.org/grief-support-resources/kids",
            external: true,
          },
        ],
      },
      {
        name: "Dougy Center: parents & caregivers",
        body: [
          "Resources designed for parents and caregivers supporting children through the death of someone important in their lives.",
        ],
        links: [
          {
            label: "Explore resources for parents and caregivers",
            href: "https://www.dougy.org/grief-support-resources/parents-caregivers",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "financial",
    kicker: "Practical help",
    title: "Financial help & survivor benefits",
    intro: [
      "The financial side of losing a spouse can feel overwhelming, especially while you are also grieving. There may be benefits and community resources available to help.",
    ],
    image: {
      src: summer("IMG_4456.webp"),
      alt: "Women from an It's Lifey retreat gathered on a dock",
      position: "center 35%",
    },
    items: [
      {
        name: "Social Security survivor benefits",
        body: [
          "Depending on your circumstances, you or your children may qualify for Social Security survivor benefits based on your spouse’s work history.",
        ],
        links: [
          {
            label: "Learn about Social Security survivor benefits",
            href: "https://www.ssa.gov/survivor",
            external: true,
          },
        ],
      },
      {
        name: "211",
        body: [
          "211 connects people with local services including financial assistance, food, housing support, utility assistance, mental health services, transportation, and community programs.",
          "Call 211 or search for services online.",
        ],
        links: [
          {
            label: "Find help through 211",
            href: "https://www.211.org/",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "legal",
    kicker: "Guidance",
    title: "Legal help",
    intro: [
      "After the death of a spouse, you may encounter legal questions involving estates, probate, housing, benefits, debt, custody, or other issues. Free or low-cost legal assistance may be available.",
    ],
    image: {
      src: summer("IMG_4397.webp"),
      alt: "Women standing together on the beach at a summer retreat",
      position: "center 42%",
    },
    items: [
      {
        name: "Legal Services Corporation",
        body: [
          "Helps you locate nonprofit legal aid organizations in your area.",
        ],
        links: [
          {
            label: "Find legal help",
            href: "https://www.lsc.gov/",
            external: true,
          },
        ],
      },
      {
        name: "LawHelp.org",
        body: [
          "Connects people with free legal aid programs, legal information, and court resources by state.",
        ],
        links: [
          {
            label: "Visit LawHelp.org",
            href: "https://www.lawhelp.org/",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "military",
    kicker: "Veterans",
    title: "Military & veteran families",
    intro: [
      "If your spouse served in the military, you may qualify for additional benefits and support.",
    ],
    image: {
      src: summer("IMG_4332.webp"),
      alt: "A joyful moment shared during an It's Lifey retreat",
      position: "center 30%",
    },
    items: [
      {
        name: "VA survivor benefits",
        body: [
          "The Department of Veterans Affairs provides information about benefits that may be available to surviving spouses, children, and parents of eligible veterans—including survivor compensation, pensions, education benefits, and other assistance.",
        ],
        links: [
          {
            label: "Explore VA survivor benefits",
            href: "https://www.va.gov/family-and-caregiver-benefits/survivor-compensation/",
            external: true,
          },
        ],
      },
      {
        name: "Veterans Crisis Line",
        body: [
          "Veterans and people concerned about a veteran can call 988 and press 1 to reach the Veterans Crisis Line.",
        ],
        links: [
          {
            label: "Visit the Veterans Crisis Line",
            href: "https://www.veteranscrisisline.net/",
            external: true,
          },
        ],
      },
    ],
  },
];
