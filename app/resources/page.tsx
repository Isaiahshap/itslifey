import type { Metadata } from "next";
import Link from "next/link";
import { HOPEHUB_SIGNUP_URL } from "@/lib/hopehub";

export const metadata: Metadata = {
  title: "Resources — It's Lifey",
  description:
    "Articles, tools, and vetted resources for widows—free inside HopeHub, the It's Lifey online community.",
};

const shell =
  "mx-auto w-full max-w-3xl px-4 sm:px-5 lg:px-6 xl:px-8";

export default function ResourcesPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section
        className="border-b border-black/[0.06] bg-[#faf8f5]"
        aria-labelledby="resources-heading"
      >
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#666766] sm:text-[11px]">
            Resources
          </p>
          <h1
            id="resources-heading"
            className="mt-4 text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl"
          >
            Resources
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#2a2928] sm:text-xl sm:leading-relaxed">
            The resource library lives inside{" "}
            <span className="font-semibold text-black">HopeHub</span>—our free
            online community for widows. There&apos;s no paid tier and no
            surprise fees: create a free account and you&apos;ll have access to
            articles, tools, expert sessions, and vetted recommendations alongside
            women who truly get it.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666766] sm:text-lg">
            Take a closer look at how HopeHub works, or join free in a few
            minutes—it&apos;s the same welcoming space Jennifer built for widows
            who are tired of figuring everything out alone.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/hopehub"
              className="inline-flex items-center justify-center rounded-full border-2 border-black/12 bg-white px-8 py-3.5 text-base font-semibold text-black transition-colors duration-200 hover:border-[#e76fab] hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Learn more
            </Link>
            <a
              href={HOPEHUB_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Sign up now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
