import type { Metadata } from "next";
import { ShellPage } from "@/components/ShellPage";

export const metadata: Metadata = {
  title: "Contact — It's Lifey",
  description:
    "Get in touch with It's Lifey—questions about retreats, Hope Hub, and support for widows.",
};

export default function ContactPage() {
  return (
    <ShellPage
      title="Contact"
      description="We’re building a calm, straightforward way to reach us—so your note doesn’t get lost and you receive a human response. Until that’s live, the best next step is to explore retreats or Hope Hub, or join the email list from the homepage when you’re ready."
    />
  );
}
