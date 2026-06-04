import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources — It's Lifey",
  description:
    "Articles, tools, and vetted resources for widows—free inside HopeHub, the It's Lifey online community.",
};

const shell =
  "mx-auto w-full max-w-6xl px-4 sm:px-5 lg:px-6 xl:px-8";

const RESOURCE_GUIDE_EMBED_SRC =
  "https://simplebooklet.com/itslifeyresourceguide#page=1";

export default function ResourcesPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section
        className="py-8 sm:py-10 lg:py-12"
        aria-labelledby="resources-heading"
      >
        <div className={shell}>
          <div className="flex flex-col gap-4 border-b border-black/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pb-8">
            <div>
              <h1
                id="resources-heading"
                className="text-pretty text-2xl font-semibold tracking-[-0.02em] text-[#141413] sm:text-[1.75rem]"
              >
                Resource library
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-[#666766]">
                Most resources are available free in{" "}
                <Link
                  href="/hopehub"
                  className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/35 underline-offset-[0.2em] transition-colors hover:text-[#d85e9a] hover:decoration-[#d85e9a]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
                >
                  HopeHub
                </Link>
                .
              </p>
            </div>
            <Link
              href="/hopehub"
              className="shrink-0 text-sm font-semibold text-[#e76fab] underline decoration-[#e76fab]/35 underline-offset-[0.2em] transition-colors hover:text-[#d85e9a] hover:decoration-[#d85e9a]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:text-base"
            >
              Open HopeHub →
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-28px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.08] sm:mt-8">
            <div className="relative min-h-[min(78vh,760px)] w-full sm:min-h-[min(82vh,880px)]">
              <iframe
                className="absolute inset-0 h-full w-full border-0"
                src={RESOURCE_GUIDE_EMBED_SRC}
                title="It's Lifey resource guide"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
