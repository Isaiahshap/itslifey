import { redirect } from "next/navigation";

/** Legacy URL — Spring 2027 now lives at /retreats/spring-retreat-2027 */
export default function UpcomingRetreatsRedirect() {
  redirect("/retreats/spring-retreat-2027");
}
