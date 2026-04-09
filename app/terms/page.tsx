import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the It's Lifey website and general expectations for programs and community spaces.",
};

const p =
  "text-[0.98rem] leading-[1.75] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.78]";
const h2 = "mt-10 text-xl font-semibold tracking-tight text-[#141413] sm:text-2xl";

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section className="border-b border-[#e3ddd4] bg-[#faf8f5]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
            Legal
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight text-[#141413] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[#666766]">Last updated: April 9, 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className={p}>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
          It&apos;s Lifey website and related online services (collectively, the
          &quot;Site&quot;). By using the Site, you agree to these Terms.
        </p>

        <h2 className={h2}>Who we are</h2>
        <p className={`${p} mt-4`}>
          The Site is operated by It&apos;s Lifey. Program-specific terms or registration
          materials may add to these Terms where you enroll in a paid offering or event.
        </p>

        <h2 className={h2}>Use of the Site</h2>
        <p className={`${p} mt-4`}>
          You agree to use the Site lawfully and respectfully. You will not attempt to disrupt
          the Site, scrape it in a way that harms performance, or use it to harass others.
          We may suspend or limit access if we reasonably believe these Terms are violated.
        </p>

        <h2 className={h2}>Not medical, legal, or therapeutic advice</h2>
        <p className={`${p} mt-4`}>
          Content on the Site—including articles, descriptions of retreats or groups, and
          community spaces—is for general information and support. It is not a substitute for
          professional medical, mental health, or legal advice. If you are in crisis, contact
          your local emergency number or a crisis line you trust.
        </p>

        <h2 className={h2}>Programs, retreats, and fees</h2>
        <p className={`${p} mt-4`}>
          Registration, payment, cancellation, and refund rules for specific programs are
          provided at signup or in separate communications. If there is a conflict between
          those materials and these Terms on a specific program, the program-specific terms
          control for that program.
        </p>

        <h2 className={h2}>Community conduct</h2>
        <p className={`${p} mt-4`}>
          HopeHub, support groups, and other spaces are built for safety and respect. We may
          remove content or restrict participation that is abusive, discriminatory, or
          harmful to the community, at our discretion.
        </p>

        <h2 className={h2}>Intellectual property</h2>
        <p className={`${p} mt-4`}>
          Text, images, branding, and design on the Site are owned by It&apos;s Lifey or used
          with permission. You may not copy, republish, or exploit Site content for commercial
          purposes without written consent.
        </p>

        <h2 className={h2}>Disclaimer of warranties</h2>
        <p className={`${p} mt-4`}>
          The Site is provided &quot;as is.&quot; To the fullest extent permitted by law, we
          disclaim warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not guarantee uninterrupted or error-free operation.
        </p>

        <h2 className={h2}>Limitation of liability</h2>
        <p className={`${p} mt-4`}>
          To the fullest extent permitted by law, It&apos;s Lifey and its team will not be
          liable for indirect, incidental, special, consequential, or punitive damages, or
          for any loss of profits or data, arising from your use of the Site or participation
          in programs, except where liability cannot be excluded by law.
        </p>

        <h2 className={h2}>Changes</h2>
        <p className={`${p} mt-4`}>
          We may update these Terms. The &quot;Last updated&quot; date will change when we do.
          Continued use of the Site after changes constitutes acceptance of the revised Terms.
        </p>

        <h2 className={h2}>Contact</h2>
        <p className={`${p} mt-4`}>
          Questions about these Terms?{" "}
          <Link
            href="/contact"
            className="font-semibold text-[#e76fab] underline underline-offset-2"
          >
            Contact us
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
