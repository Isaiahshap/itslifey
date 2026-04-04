import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "About Jennifer & It's Lifey",
  description:
    "Learn how It's Lifey began with Jennifer's lived experience as a widow—and why this community exists for widows seeking support, retreats, and connection.",
};

export default function AboutPage() {
  return (
    <ShellPage
      title="About Jennifer & It’s Lifey"
      description="Soon you’ll find Jennifer’s full story here: how loss shaped her path, why she built this community, and what she hopes every widow feels when she arrives on this site—seen, safe, and less alone."
      ctaHref="/retreats"
      ctaLabel="Join Upcoming Retreat"
    />
  );
}
