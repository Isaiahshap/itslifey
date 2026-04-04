import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "Support groups for widows",
  description:
    "Gentle, recurring support groups for widows—accessible conversation-centered community after loss.",
};

export default function SupportGroupsPage() {
  return (
    <ShellPage
      title="Support groups"
      description="Soon you’ll find schedules, formats, and how to join. Support groups are designed to be accessible and recurring—honest conversation without judgment, at a pace that respects your capacity."
    />
  );
}
