import Image from "next/image";
import Link from "next/link";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";
import { EVENT_PATH } from "@/lib/widow-wellness-event";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const programsLinks = [
  { href: "/hopehub", label: "HopeHub" },
  {
    href: "/retreats/winter-widow-wellness",
    label: "Winter Retreat 2026",
  },
  {
    href: "/retreats/spring-retreat-2027",
    label: "Spring Retreat 2027",
  },
  { href: "/retreats/past", label: "Past Retreats" },
  {
    href: "/events/widow-wellness-connection-experience",
    label: "Widow Wellness & Connection Experience",
  },
  {
    href: "/events/widow-wellness-connection-experience/sponsorship",
    label: "Event Sponsorship",
  },
] as const;

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

function footerLinkClass() {
  return "text-[13px] font-medium tracking-tight text-[#1a1918] transition-colors duration-150 hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]";
}

function legalLinkClass() {
  return "text-[11px] font-semibold uppercase tracking-[0.12em] text-[#666766] transition-colors duration-150 hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]";
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e3ddd4] bg-[#fffcfa]">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-6 sm:pt-16 sm:pb-12 lg:px-8 lg:pt-16 lg:pb-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5 xl:col-span-4">
            <Link
              href="/"
              className="inline-block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e76fab]"
              aria-label="It's Lifey — Home"
            >
              <Image
                src="/images/itslifeylogo.png"
                alt="It's Lifey"
                width={180}
                height={54}
                className="h-10 w-auto sm:h-11"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#2a2928]">
              Support, retreats, and community for widows—created by Jennifer,
              from lived experience.
            </p>
            <SocialMediaLinks
              className="mt-7 flex flex-wrap items-center gap-0.5"
              linkClassName="inline-flex h-10 w-10 items-center justify-center rounded-none text-[#666766] transition-colors duration-150 hover:bg-[#f6f3ee] hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:col-span-7 lg:grid-cols-3 xl:col-span-8">
            <nav aria-labelledby="footer-explore-heading">
              <h2
                id="footer-explore-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]"
              >
                Explore
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {exploreLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClass()}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-programs-heading">
              <h2
                id="footer-programs-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]"
              >
                Programs &amp; support
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {programsLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClass()}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]">
                Next step
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[#2a2928]">
                When you&apos;re ready, start with the Widow Wellness &amp;
                Connection Experience or HopeHub.
              </p>
              <Link
                href={EVENT_PATH}
                className="il-btn il-btn--solid il-btn--compact mt-5"
              >
                Join the event
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </Link>
              <p className="mt-4">
                <Link
                  href="/hopehub"
                  className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#e76fab] transition-colors duration-150 hover:text-[#d85e9a]"
                >
                  Explore HopeHub →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-[#e3ddd4] pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {legalLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={legalLinkClass()}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-1 sm:items-end">
            <p className="text-[12px] font-medium tracking-wide text-[#666766]">
              {`© ${year} It's Lifey`}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888988]">
              By a widow, for widows
            </p>
          </div>
        </div>

        <p className="mt-8 text-[11px] tracking-wide text-[#888988]">
          Made with care by{" "}
          <a
            href="https://www.causehouse.co"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#666766] underline decoration-[#e76fab]/35 underline-offset-2 transition-colors hover:text-[#e76fab] hover:decoration-[#e76fab]"
          >
            CauseHouse
          </a>
        </p>
      </div>
    </footer>
  );
}
