import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How It's Lifey approaches accessibility on itslifey.com, what works well today, and what we are improving.",
};

const p =
  "text-[0.98rem] leading-[1.75] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.78]";
const h2 = "mt-10 text-xl font-semibold tracking-tight text-[#141413] sm:text-2xl";
const ul = "mt-4 list-disc space-y-2 pl-6";

export default function AccessibilityPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section className="border-b border-[#e3ddd4] bg-[#faf8f5]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
            Accessibility
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight text-[#141413] sm:text-5xl">
            Accessibility at It&apos;s Lifey
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#666766] sm:text-xl">
            We want this site to feel usable, readable, and respectful for as many people as
            possible—including visitors who use keyboards, screen readers, or other assistive
            tools. This page describes what we prioritize today, where we are still learning,
            and how you can reach us with feedback.
          </p>
          <p className="mt-4 text-sm text-[#666766]">Last updated: April 9, 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <h2 className={`${h2} mt-0`}>What we are doing intentionally</h2>
        <ul className={`${ul} ${p}`}>
          <li>
            <strong className="text-[#141413]">Semantic structure.</strong> Pages use proper
            headings, landmarks, and lists so navigation and reading order make sense in
            assistive technologies.
          </li>
          <li>
            <strong className="text-[#141413]">Keyboard and focus.</strong> Interactive
            controls (links, buttons, form fields) are built to be reachable by keyboard, and
            many components include visible focus styles so you can see where you are on the
            page.
          </li>
          <li>
            <strong className="text-[#141413]">Readable typography.</strong> We use generous
            line height and body text sizes that support comfortable reading on phones and
            desktops.
          </li>
          <li>
            <strong className="text-[#141413]">Alt text on key images.</strong> Meaningful
            images include descriptive alternative text where it helps; decorative images are
            marked accordingly where implemented.
          </li>
        </ul>

        <h2 className={h2}>What we are still working on</h2>
        <p className={`${p} mt-4`}>
          We have <strong className="text-[#141413]">not</strong> claimed full third-party
          certification (for example, a formal WCAG audit report) for every page and every
          state of the site. Accessibility is ongoing work. Honest gaps and active priorities
          include:
        </p>
        <ul className={`${ul} ${p}`}>
          <li>
            <strong className="text-[#141413]">Full-site audit.</strong> We continue to review
            templates, forms, and interactive patterns (including mobile navigation and
            motion) to find and fix issues we may have missed.
          </li>
          <li>
            <strong className="text-[#141413]">Bypassing repeated navigation.</strong> A
            dedicated &quot;skip to main content&quot; control is not on the site today; we may
            add one as we refine the header and announcement patterns.
          </li>
          <li>
            <strong className="text-[#141413]">Third-party tools.</strong> Some features (such
            as spam protection on forms) rely on external services. Their interfaces may not
            always match our preferred accessibility baseline; we choose providers carefully and
            report issues when we can.
          </li>
          <li>
            <strong className="text-[#141413]">Media.</strong> As we add or update video or
            audio, we aim to provide captions or transcripts where they meaningfully support
            access—not every legacy clip may be fully captioned yet.
          </li>
          <li>
            <strong className="text-[#141413]">Contrast and motion.</strong> We design toward
            strong contrast and calm motion, but we will keep testing edge cases (for example,
            very small screens or reduced-motion preferences) and adjusting.
          </li>
        </ul>

        <h2 className={h2}>Help us improve</h2>
        <p className={`${p} mt-4`}>
          If something is hard to use—whether with a screen reader, keyboard only, or for
          another reason—please tell us. Specific pages, browsers, and a short description of
          what happened help us reproduce and fix issues faster.
        </p>
        <p className={`${p} mt-4`}>
          <Link
            href="/contact"
            className="font-semibold text-[#e76fab] underline underline-offset-2"
          >
            Contact us
          </Link>{" "}
          with the subject line &quot;Accessibility&quot; if you can.
        </p>

        <h2 className={h2}>Related</h2>
        <p className={`${p} mt-4`}>
          <Link
            href="/privacy"
            className="font-semibold text-[#e76fab] underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          {" · "}
          <Link
            href="/terms"
            className="font-semibold text-[#e76fab] underline underline-offset-2"
          >
            Terms of Service
          </Link>
        </p>
      </article>
    </div>
  );
}
