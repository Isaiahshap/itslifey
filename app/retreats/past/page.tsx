import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "Past retreats — It's Lifey",
  description:
    "Look back at gatherings and retreat seasons from It's Lifey—community and care for widows, created from lived experience.",
};

export default function PastRetreatsPage() {
  return (
    <ShellPage
      title="Past retreats"
      description="Photos, reflections, and highlights from past retreats will live here—a gentle archive you can browse when you want to see what these weekends feel like."
      ctaLabel="View upcoming retreats"
      ctaHref="/retreats/upcoming"
    />
  );
}
