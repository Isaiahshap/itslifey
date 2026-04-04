import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "Widow retreats — Join an upcoming retreat",
  description:
    "Restorative widow retreats with real connection, compassionate support, and space to breathe. Created by a widow, for widows.",
};

export default function RetreatsPage() {
  return (
    <ShellPage
      title="Retreats for widows"
      description="Upcoming retreat details, dates, and registration will live here. Until then, know this: retreats are built for emotional safety, meaningful connection, and gentle structure—so you can show up exactly as you are."
    />
  );
}
