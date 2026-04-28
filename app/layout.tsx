import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { MetaPixel } from "@/components/MetaPixel";
import { Navbar } from "@/components/Navbar";
import { SiteFinalCta } from "@/components/SiteFinalCta";
import { VirtualHealingAnnouncementBar } from "@/components/VirtualHealingAnnouncementBar";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Resolves absolute URLs for Open Graph, Twitter, and canonicals. Set in production. */
function siteOrigin(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const withProto = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(withProto.endsWith("/") ? withProto : `${withProto}/`);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL.replace(/\/$/, "")}/`);
  }
  return new URL("http://localhost:3000/");
}

const metadataBase = siteOrigin();

const defaultTitle =
  "It's Lifey | Widow retreats, support groups & community after loss";
const defaultDescription =
  "Retreats, HopeHub, and support groups for widows—created by Jennifer, a widow herself. A warm, premium community for grief support and connection after loss.";
const ogTitle = "It's Lifey | Support, retreats & community for widows";
const ogDescription =
  "Retreats, ongoing support, and community—rooted in lived experience. You do not have to navigate this alone.";

/** Shared preview image for Open Graph, Twitter/X, iMessage, Slack, etc. */
const socialPreviewImage = "/images/colorlogo.webp" as const;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: "%s | It's Lifey",
  },
  description: defaultDescription,
  keywords: [
    "widow retreats",
    "support for widows",
    "widow community",
    "support groups for widows",
    "grief support widows",
    "widowhood support",
  ],
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: "website",
    locale: "en_US",
    siteName: "It's Lifey",
    url: metadataBase,
    images: [
      {
        url: socialPreviewImage,
        alt: "It's Lifey — support and community for widows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [socialPreviewImage],
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
        <MetaPixel />
        <VirtualHealingAnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFinalCta />
        <Footer />
      </body>
    </html>
  );
}
