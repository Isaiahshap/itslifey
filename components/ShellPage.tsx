import Link from "next/link";

type ShellPageProps = {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

/**
 * Shared layout for non-home routes: keeps shell pages consistent without
 * splitting homepage sections into separate files.
 */
export function ShellPage({
  title,
  description,
  ctaHref = "/retreats",
  ctaLabel = "Join Upcoming Retreat",
}: ShellPageProps) {
  return (
    <div className="bg-[#f6f3ee]">
      <div className="mx-auto max-w-3xl px-3 py-20 sm:px-4 sm:py-28 lg:px-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e76fab]">
          Coming soon
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
          {title}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-black">{description}</p>
        <p className="mt-6 text-lg leading-relaxed text-black">
          We&apos;re preparing something thoughtful for this space. In the
          meantime, you can explore the homepage or join us for an upcoming
          retreat when you&apos;re ready.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-black/10 bg-white px-8 py-3.5 text-base font-semibold text-black transition-colors duration-200 hover:border-[#e76fab] hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
