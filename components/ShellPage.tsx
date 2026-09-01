import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { EVENT_PATH } from "@/lib/widow-wellness-event";

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
  ctaHref = EVENT_PATH,
  ctaLabel = "Join Widow Wellness & Connection Experience",
}: ShellPageProps) {
  return (
    <div className="bg-[#f6f3ee]">
      <section data-entrance="hero" className="border-b border-[#e3ddd4]">
        <div className="mx-auto max-w-3xl px-3 py-16 sm:px-4 sm:py-24 lg:px-5 lg:py-28">
          <p
            className="reveal-label text-sm font-semibold uppercase tracking-[0.18em] text-[#e76fab]"
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            Coming soon
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
            <ClipReveal delay={0}>{title}</ClipReveal>
          </h1>
          <p
            className="reveal-up mt-8 text-lg leading-relaxed text-black"
            style={{ ["--reveal-delay" as string]: "260ms" }}
          >
            {description}
          </p>
          <p
            className="reveal-up mt-6 text-lg leading-relaxed text-black"
            style={{ ["--reveal-delay" as string]: "300ms" }}
          >
            We&apos;re preparing something thoughtful for this space. In the
            meantime, you can explore the homepage or join us for the Widow
            Wellness &amp; Connection Experience when you&apos;re ready.
          </p>
          <div
            className="reveal-up mt-12 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ["--reveal-delay" as string]: "340ms" }}
          >
            <Link href={ctaHref} className="il-btn il-btn--solid">
              {ctaLabel}
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </Link>
            <Link href="/" className="il-btn il-btn--ghost-light">
              Back to home
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
