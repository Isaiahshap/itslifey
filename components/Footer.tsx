import Image from "next/image";
import Link from "next/link";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
] as const;

const programsLinks = [
  { href: "/hopehub", label: "HopeHub" },
  { href: "/retreats", label: "Retreats" },
  { href: "/retreats/upcoming", label: "Upcoming Retreats" },
  { href: "/retreats/past", label: "Past Retreats" },
  { href: "/support-groups", label: "Support Groups" },
  {
    href: "/support/virtual-healing-experiences",
    label: "Virtual Healing Experiences",
  },
  { href: "/resources", label: "Resources" },
] as const;

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

function footerLinkClass() {
  return "text-[15px] font-medium text-black transition-colors duration-200 hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] focus-visible:rounded-sm";
}

function legalLinkClass() {
  return "text-sm font-medium text-[#666766] underline-offset-2 transition-colors hover:text-[#e76fab] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] focus-visible:rounded-sm";
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e3ddd4] bg-[#f6f3ee]">
      <div
        className="h-1 w-full bg-gradient-to-r from-[#e76fab]/90 via-[#c94d8a] to-[#e76fab]/90"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-5 sm:px-6 sm:pt-16 sm:pb-6 lg:px-8 lg:pt-20 lg:pb-7">
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
                className="h-11 w-auto opacity-[0.96] sm:h-[3.15rem]"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-[#2a2928]">
              Support, retreats, and community for widows—created by Jennifer,
              from lived experience.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#666766]">
              You deserve clarity, warmth, and a path forward that feels human—not
              rushed, not clinical.
            </p>
            <SocialMediaLinks
              className="mt-8 flex flex-wrap items-center gap-2"
              linkClassName="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#666766] transition-[color,background-color,box-shadow] duration-200 hover:bg-[#e76fab]/12 hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
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
                When you&apos;re ready, start with what feels kindest—limited
                cohort experiences, a retreat weekend, HopeHub, or a support group.
              </p>
              <Link
                href="/support/virtual-healing-experiences"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#e76fab] px-6 py-2.5 text-center text-[15px] font-semibold text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:w-auto"
              >
                Virtual Healing Experiences
              </Link>
              <p className="mt-4">
                <Link
                  href="/retreats/upcoming"
                  className={`${footerLinkClass()} text-[14px]`}
                >
                  Upcoming retreat →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-[#e3ddd4] pt-10 sm:mt-16 sm:gap-8 sm:pt-12">
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8"
          >
            {legalLinks.map(({ href, label }, i) => (
              <span key={href} className="flex items-center gap-x-5 sm:gap-x-8">
                {i > 0 ? (
                  <span className="text-[#d4cfc7]" aria-hidden>
                    |
                  </span>
                ) : null}
                <Link href={href} className={legalLinkClass()}>
                  {label}
                </Link>
              </span>
            ))}
          </nav>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#666766]">
              {`© ${year} It's Lifey. All rights reserved.`}
            </p>
            <p className="text-sm text-[#666766]">By a widow, for widows.</p>
          </div>
          <p className="mt-6 border-t border-[#ebe6df] pt-5 text-center text-xs text-[#888988] sm:mt-8 sm:pt-6">
            Made with ❤️ by{" "}
            <a
              href="https://www.causehouse.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#666766] underline decoration-[#e76fab]/40 underline-offset-2 transition-colors hover:text-[#e76fab] hover:decoration-[#e76fab]"
            >
              CauseHouse
            </a>
          </p>
        </div>
      </div>

      <div className="relative mt-0 w-full overflow-hidden leading-[0]" aria-hidden>
        <svg
          className="block h-10 w-full min-w-full text-[#e76fab] sm:h-12 md:h-14"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="footerPinkWave"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#f0a8cf" />
              <stop offset="55%" stopColor="#e76fab" />
              <stop offset="100%" stopColor="#d85e9a" />
            </linearGradient>
          </defs>
          <path
            fill="url(#footerPinkWave)"
            d="M0,28 C120,8 280,48 420,26 C560,4 680,44 840,24 C1000,4 1140,38 1280,22 C1340,14 1390,18 1440,16 L1440,56 L0,56 Z"
          />
        </svg>
      </div>
    </footer>
  );
}
