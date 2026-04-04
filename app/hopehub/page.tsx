import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "HopeHub — Ongoing support for widows",
  description:
    "HopeHub offers ongoing connection and care between retreats—community and resources for widows navigating life after loss.",
};

export default function HopeHubPage() {
  return (
    <ShellPage
      title="HopeHub"
      description="HopeHub is where ongoing support lives—steady connection, encouragement, and community between the bigger moments. This page will share how to join, what to expect, and how we keep the environment gentle and emotionally safe."
    />
  );
}
