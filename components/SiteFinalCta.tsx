"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Global pre-footer CTA (renders from root layout; no Framer Motion). Hidden on Summer retreat page — it has its own closing CTA. */
export function SiteFinalCta() {
  const pathname = usePathname();
  if (pathname === "/retreats/upcoming") {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden border-t border-[#d85e9a]/30 bg-[#c94d8a] px-3 py-24 sm:px-4 lg:px-5 lg:py-32"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <h2
          id="final-cta-heading"
          className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
        >
          You do not have to navigate this alone.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white">
          However today feels, you can take this slowly. If you want company,
          a listening ear, or a gentler place to land, you&apos;ll find people
          here who understand—because they&apos;ve been there too.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/retreats"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#c94d8a] shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-neutral-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Join Upcoming Retreat
          </Link>
          <Link
            href="/about"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-white bg-white px-8 py-3.5 text-base font-semibold text-black transition-[background-color] duration-200 hover:bg-transparent hover:text-white sm:w-auto"
          >
            Learn More About It&apos;s Lifey
          </Link>
        </div>
      </div>
    </section>
  );
}
