import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "Resources — It's Lifey",
  description:
    "Curated support resources for widows—coming soon. HopeHub and retreats are here when you need connection now.",
};

export default function ResourcesPage() {
  return (
    <ShellPage
      title="Resources"
      description="Soon you will find curated articles, tools, and gentle next steps—all in one calm place, designed for widows navigating life after loss."
      ctaHref="/hopehub"
      ctaLabel="Explore HopeHub"
    />
  );
}
