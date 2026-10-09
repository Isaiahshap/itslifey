import type { Metadata } from "next";
import { SpringRetreat2027Client } from "./SpringRetreat2027Client";

export const metadata: Metadata = {
  title: "Spring 2027 Widow Wellness Retreat — Coming Soon",
  description:
    "Join the interest list for the Spring 2027 Widow Wellness Retreat. Women who sign up before February 28, 2027 receive $250 off. Costa Rica is one destination we're considering.",
};

export default function SpringRetreat2027Page() {
  return <SpringRetreat2027Client />;
}
