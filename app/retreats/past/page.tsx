import { redirect } from "next/navigation";

/** Older “past retreats” URL now opens the full retreat index. */
export default function PastRetreatsPage() {
  redirect("/retreats");
}
