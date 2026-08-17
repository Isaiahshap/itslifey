import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { BREAKOUT_LEADERS } from "@/lib/widow-wellness-event";
import { WidowWellnessClient } from "./WidowWellnessClient";

export const metadata: Metadata = {
  title: "Widow Wellness & Connection Experience — November 2026",
  description:
    "A one-day gathering for widows in Reading, MA — keynotes, wellness breakouts, community, and The Hope Mic. VIP evening with Kelley Lynn. Presented by It's Lifey.",
  openGraph: {
    title: "Widow Wellness & Connection Experience | It's Lifey",
    description:
      "Real talk. Real connection. Real hope. November 13–14, 2026 at Presence & Co., Reading, Massachusetts.",
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
