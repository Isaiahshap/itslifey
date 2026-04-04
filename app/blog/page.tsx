import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "Blog — Stories & support for widows",
  description:
    "Articles and reflections from It's Lifey—clear, compassionate support for widows navigating grief and life after loss.",
};

export default function BlogPage() {
  return (
    <ShellPage
      title="Blog"
      description="We’re preparing articles that are clear, warm, and grounded in real life—not generic advice. When the blog launches, you’ll find thoughtful pieces you can return to on hard days and quiet ones alike."
    />
  );
}
