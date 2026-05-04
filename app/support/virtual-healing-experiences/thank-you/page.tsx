import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spot Reserved — The Body Keeps the Story | It's Lifey",
  description:
    "Your deposit has been received. Your spot in The Body Keeps the Story is officially reserved.",
  robots: { index: false, follow: false },
};

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

export default function VirtualHealingThankYouPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 min-h-full w-full bg-gradient-to-b from-[#fdf8fb] via-[#f8eef3] to-[#f0dfe8]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 min-h-full w-full bg-[radial-gradient(ellipse_160%_90%_at_50%_-18%,rgba(231,111,171,0.18),transparent_58%)]"
          aria-hidden
        />

        <div
          className={`relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center ${shell}`}
        >
          <div className="mx-auto max-w-lg">
            {/* Pink checkmark circle */}
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#e76fab]/25 bg-white shadow-[0_12px_36px_-10px_rgba(199,77,138,0.25)]">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e76fab"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7a6a72]">
              Payment confirmed
            </p>
            <h1 className="mt-4 text-pretty text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#141413] sm:text-4xl">
              Your spot is reserved.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[0.98rem] leading-[1.78] text-[#555] sm:text-[1.0625rem]">
              Thank you — your $200 deposit has been received and your place
              in <strong className="font-semibold text-[#141413]">The Body Keeps the Story</strong> is officially
              held. A confirmation email is on its way to your inbox.
            </p>

            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#e76fab]/18 bg-white/70 p-5 text-left backdrop-blur-[2px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8457e]">
                What happens next
              </p>
              <ul className="mt-3 space-y-2.5 text-[0.9rem] leading-relaxed text-[#444]">
                <li className="flex gap-2.5">
                  <span className="mt-0.5 text-[#e76fab]" aria-hidden>→</span>
                  Check your email for a deposit confirmation from Jennifer.
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-0.5 text-[#e76fab]" aria-hidden>→</span>
                  You&apos;ll receive the Zoom link, schedule, and preparation
                  notes before May 20.
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-0.5 text-[#e76fab]" aria-hidden>→</span>
                  Your deposit applies toward your $899/$849
                  total — nothing more is owed until you hear from us.
                </li>
              </ul>
            </div>

            <p className="mt-10 text-sm text-[#666766]">
              Questions?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
              >
                Reach out any time.
              </Link>
            </p>

            <p className="mt-8">
              <Link
                href="/"
                className="text-sm font-semibold text-[#141413] underline decoration-[#e76fab]/40 underline-offset-[3px] hover:text-[#e76fab] hover:decoration-[#e76fab]"
              >
                ← Back to It&apos;s Lifey
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
