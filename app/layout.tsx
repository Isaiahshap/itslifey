import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteFinalCta } from "@/components/SiteFinalCta";
import { VirtualHealingAnnouncementBar } from "@/components/VirtualHealingAnnouncementBar";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "It's Lifey | Widow retreats, support groups & community after loss",
    template: "%s | It's Lifey",
  },
  description:
    "Retreats, HopeHub, and support groups for widows—created by Jennifer, a widow herself. A warm, premium community for grief support and connection after loss.",
  keywords: [
    "widow retreats",
    "support for widows",
    "widow community",
    "support groups for widows",
    "grief support widows",
    "widowhood support",
  ],
  openGraph: {
    title: "It's Lifey | Support, retreats & community for widows",
    description:
      "Retreats, ongoing support, and community—rooted in lived experience. You do not have to navigate this alone.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased text-black">
        <VirtualHealingAnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFinalCta />
        <Footer />
      </body>
    </html>
  );
}
