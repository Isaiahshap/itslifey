import type { Metadata } from "next";
import { SponsorshipClient } from "./SponsorshipClient";

export const metadata: Metadata = {
  title: "Sponsorship — Widow Wellness & Connection Experience 2026",
  description:
    "Sponsor the Widow Wellness & Connection Experience — meaningful visibility with widows seeking trusted support, healing, and community. Levels from $550.",
  openGraph: {
    title: "Sponsor Widow Wellness 2026 | It's Lifey",
    description:
      "Help widows feel less alone. Sponsorship opportunities for the November 2026 event in Reading, MA.",
  },
};

export default function WidowWellnessSponsorshipPage() {
  return <SponsorshipClient />;
}
