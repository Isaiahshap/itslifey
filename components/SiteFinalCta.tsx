"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT_PATH } from "@/lib/widow-wellness-event";

/** Global pre-footer CTA (renders from root layout; no Framer Motion). Hidden on event pages — they have their own closing CTAs. */
export function SiteFinalCta() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/retreats/spring-retreat-2027") ||
    pathname.startsWith("/retreats/winter-widow-wellness") ||
    pathname.startsWith("/events/widow-wellness-connection-experience") ||
    pathname.startsWith("/resources")
  ) {
    return null;
  }

  return (
    <section
      className="site-final-cta relative overflow-hidden border-t border-[#d85e9a]/30 bg-[#c94d8a] px-3 py-16 sm:px-4 sm:py-24 lg:px-5 lg:py-32"
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
        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link href={EVENT_PATH} className="il-btn il-btn--on-dark">
            Join Widow Wellness &amp; Connection Experience
            <span aria-hidden className="il-btn__arrow">
              →
            </span>
          </Link>
          <Link href="/resources" className="il-btn il-btn--ghost-dark">
            Explore Resources
            <span aria-hidden className="il-btn__arrow">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
