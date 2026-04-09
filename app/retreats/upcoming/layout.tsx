import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summer 2026 Widow Wellness Retreat — New England coast",
  description:
    "Four restorative days for widows on the New England coast—luxury accommodations, wellness, spa, and connection with women who truly understand. Limited to eight. Apply to reserve your place.",
};

export default function UpcomingRetreatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
