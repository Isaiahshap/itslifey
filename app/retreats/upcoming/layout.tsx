import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spring 2027 Widow Wellness Retreat — Coming Soon",
  description:
    "Join the interest list for the Spring 2027 Widow Wellness Retreat. Be first to receive details, early registration, and exclusive updates from It's Lifey.",
};

export default function UpcomingRetreatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
