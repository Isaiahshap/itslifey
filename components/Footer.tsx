import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/hopehub", label: "HopeHub" },
  { href: "/retreats", label: "Retreats" },
  { href: "/support-groups", label: "Support Groups" },
  { href: "/blog", label: "Blog" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#ebe6df] bg-[#f0ebe4]/80">
      <div className="mx-auto max-w-7xl px-3 py-14 sm:px-4 lg:px-5">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e76fab]"
              aria-label="It's Lifey — Home"
            >
              <Image
                src="/images/itslifeylogo.png"
                alt="It's Lifey"
                width={168}
                height={50}
                className="h-11 w-auto opacity-95 sm:h-12"
              />
            </Link>
            <p className="mt-5 text-lg leading-relaxed text-black">
              Support, retreats, and community for widows—created by someone
              who understands, from lived experience.
            </p>
          </div>
          <nav
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2"
            aria-label="Footer"
          >
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[15px] font-medium text-black transition-colors hover:text-[#e76fab]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-12 text-sm text-black">
          © {new Date().getFullYear()} It&apos;s Lifey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
