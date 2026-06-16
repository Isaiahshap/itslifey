import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summer 2026 Widow Wellness Retreat — New England coast",
  description:
    "Summer 2026 widow wellness retreat is sold out. Two day-attendance spots remain—stay at a nearby hotel and join during the day on the New England coast.",
};

export default function UpcomingRetreatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
