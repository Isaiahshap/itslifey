import type { Metadata } from "next";
import { SummerByTheSeaClient } from "./SummerByTheSeaClient";

export const metadata: Metadata = {
  title: "Summer by the Sea — Cape Cod 2027",
  description:
    "July 9–12, 2027. A Cape Cod widow wellness and connection retreat. Come alone. Leave with lifelong friends. Private coastal home, chef, spa, Martha's Vineyard, and women who understand.",
  openGraph: {
    title: "Summer by the Sea | It's Lifey",
    description:
      "July 9–12, 2027 on Cape Cod. Four days for widows — a private coastal home, spa, chef, Martha's Vineyard, and women who just get it.",
    images: [
      {
        url: "/images/Retreats/Summer2025/IMG_0683.webp",
        alt: "Women from a past It's Lifey summer retreat together outdoors",
      },
    ],
  },
};

export default function SummerByTheSeaPage() {
  return <SummerByTheSeaClient />;
}
