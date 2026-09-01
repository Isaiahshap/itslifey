import type { Metadata } from "next";
import { WinterWidowWellnessClient } from "./WinterWidowWellnessClient";

export const metadata: Metadata = {
  title: "Winter Widow Wellness Retreat 2026",
  description:
    "Come as strangers. Leave as lifelong friends. Three luxurious nights near New York's Hudson Valley for widows — private chef, spa, guided winter adventure, and women who just get it.",
  openGraph: {
    title: "Winter Widow Wellness Retreat | It's Lifey",
    description:
      "A small-group winter escape for widows — luxury, connection, spa, adventure, and women who understand without explanation.",
  },
};

export default function WinterWidowWellnessPage() {
  return <WinterWidowWellnessClient />;
}
