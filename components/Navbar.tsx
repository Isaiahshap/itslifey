"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/hopehub", label: "HopeHub" },
  { href: "/retreats", label: "Retreats" },
  { href: "/support-groups", label: "Support Groups" },
  { href: "/blog", label: "Blog" },
] as const;

function linkClass(active: boolean) {
  return [
    "text-[15px] font-medium transition-colors duration-200",
    active ? "text-[#e76fab]" : "text-black hover:text-[#e76fab]",
  ].join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#ebe6df]/90 bg-[#f6f3ee]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
        <Link
          href="/"
          className="relative flex shrink-0 items-center gap-2 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e76fab]"
          aria-label="It's Lifey — Home"
        >
          <Image
            src="/images/itslifeylogo.png"
            alt="It's Lifey"
            width={200}
            height={60}
            className="h-11 w-auto sm:h-[3.25rem]"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(pathname === href)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/retreats"
            className="hidden rounded-full bg-[#e76fab] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-md sm:inline-flex"
          >
            Join Upcoming Retreat
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ebe6df] bg-white text-black transition-colors hover:bg-neutral-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[#ebe6df] bg-[#f6f3ee] px-3 py-5 sm:px-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-3 ${linkClass(pathname === href)}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/retreats"
              className="mt-3 rounded-full bg-[#e76fab] px-5 py-3 text-center text-[15px] font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Join Upcoming Retreat
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
