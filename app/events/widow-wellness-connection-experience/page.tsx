import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { BREAKOUT_LEADERS } from "@/lib/widow-wellness-event";
import { WidowWellnessClient } from "./WidowWellnessClient";

export const metadata: Metadata = {
  title: "Widow Wellness & Connection Experience — November 2027 Interest",
  description:
    "November 2026 sold out a month early — join the interest list for November 2027. See speakers, schedule, and details from this year's gathering. Presented by It's Lifey.",
  openGraph: {
    title: "Widow Wellness & Connection Experience | It's Lifey",
    description:
      "Sold out for November 2026. Join the interest list for November 2027 — connection, wellness, and hope for widows.",
  },
};

function publicAssetExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

export default function WidowWellnessConnectionExperiencePage() {
  const availableLeaderPhotos = Object.fromEntries(
    BREAKOUT_LEADERS.flatMap((leader) =>
      publicAssetExists(leader.photo) ? [[leader.name, leader.photo] as const] : [],
    ),
  );

  return <WidowWellnessClient availableLeaderPhotos={availableLeaderPhotos} />;
}
