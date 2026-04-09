import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "Press — It's Lifey",
  description:
    "Media resources and press information for It's Lifey—support and retreats for widows, founded by Jennifer.",
};

export default function PressPage() {
  return (
    <ShellPage
      title="Press"
      description="If you’re covering grief support, widowhood, or retreat communities, we’re glad to help with accurate context and thoughtful quotes when Jennifer’s schedule allows. This page will soon include a simple press kit and contact path for media requests."
    />
  );
}
