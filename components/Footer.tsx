import Image from "next/image";
import Link from "next/link";

const browseLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

const communityLinks = [
  { href: "/hopehub", label: "HopeHub" },
  { href: "/retreats", label: "Retreats" },
  { href: "/support-groups", label: "Support Groups" },
] as const;

function footerLinkClass() {
  return "text-[15px] font-medium text-black transition-colors duration-200 hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] focus-visible:rounded-sm";
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e3ddd4] bg-[#f6f3ee]">
      <div
        className="h-1 w-full bg-gradient-to-r from-[#e76fab]/90 via-[#c94d8a] to-[#e76fab]/90"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-8 lg:col-span-7 lg:grid-cols-3 xl:col-span-8">
            <nav aria-labelledby="footer-browse-heading">
              <h2
                id="footer-browse-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]"
              >
                Browse
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {browseLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClass()}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-community-heading">
              <h2
                id="footer-community-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]"
              >
                Community
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {communityLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClass()}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]">
                Next step
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[#2a2928]">
                When you&apos;re ready, start with what feels kindest—a retreat
                weekend, HopeHub, or a support group.
              </p>
              <Link
                href="/retreats"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#e76fab] px-6 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
              >
                Join Upcoming Retreat
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#e3ddd4] pt-10 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-12">
          <p className="text-sm text-[#666766]">
            {`© ${year} It's Lifey. All rights reserved.`}
          </p>
          <p className="text-sm text-[#666766]">
            By a widow, for widows.
          </p>
        </div>
      </div>
    </footer>
  );
}
