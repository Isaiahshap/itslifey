import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support groups & events for widows",
  description:
    "Upcoming HopeHub and community events—virtual and in-person gatherings, expert sessions, and connection with women who understand.",
};

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

/** WordPress The Events Calendar — list view (checkout & tickets load here). */
const EVENTS_EMBED_SRC = "https://px8.792.myftpupload.com/event/";

export default function SupportGroupsPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section
        className="border-b border-black/[0.06] bg-[#faf8f5]"
        aria-labelledby="sg-index-heading"
      >
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#666766] sm:text-[11px]">
            Support
          </p>
          <h1
            id="sg-index-heading"
            className="mt-4 max-w-4xl text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl"
          >
            Support groups &amp; events
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[#2a2928]">
            Upcoming gatherings and sessions hosted through HopeHub and
            It&apos;s Lifey—browse the calendar below, register, and complete
            checkout on our secure event pages.
          </p>
        </div>
      </section>

      <div className={`${shell} pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24`}>
        <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-md shadow-black/[0.06]">
          <iframe
            title="It's Lifey — upcoming events calendar"
            src={EVENTS_EMBED_SRC}
            className="block min-h-[min(85vh,900px)] w-full border-0 sm:min-h-[min(88vh,1000px)]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="payment *; fullscreen; clipboard-write"
          />
        </div>
        <p className="mt-6 text-center text-sm leading-relaxed text-[#666766]">
          Prefer the full site?{" "}
          <a
            href={EVENTS_EMBED_SRC}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
          >
            Open the calendar in a new tab
          </a>
          . Questions?{" "}
          <Link
            href="/contact"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
          >
            Contact us
          </Link>
          {" "}or visit{" "}
          <Link
            href="/hopehub"
            className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
          >
            HopeHub
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
