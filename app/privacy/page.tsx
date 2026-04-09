import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How It's Lifey collects, uses, and protects information when you use our website, forms, and programs.",
};

const p =
  "text-[0.98rem] leading-[1.75] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.78]";
const h2 = "mt-10 text-xl font-semibold tracking-tight text-[#141413] sm:text-2xl";
const ul = "mt-4 list-disc space-y-2 pl-6 text-[#2a2928]";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section className="border-b border-[#e3ddd4] bg-[#faf8f5]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
            Legal
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight text-[#141413] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#666766]">Last updated: April 9, 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className={p}>
          It&apos;s Lifey (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
          This policy describes how we handle information when you visit{" "}
          <Link href="/" className="font-semibold text-[#e76fab] underline underline-offset-2">
            itslifey.com
          </Link>{" "}
          (the &quot;Site&quot;), use our forms, or participate in programs we offer.
        </p>

        <h2 className={h2}>Information we may collect</h2>
        <ul className={ul}>
          <li className={p}>
            <strong className="text-[#141413]">Contact and inquiries.</strong> When you use
            our contact form, newsletter signup, retreat or program interest forms, or similar
            fields, we collect what you provide (for example, name, email, phone if you choose
            to share it, and your message).
          </li>
          <li className={p}>
            <strong className="text-[#141413]">Technical data.</strong> Like most sites, our
            hosting and infrastructure may log basic technical information (such as browser type,
            general region, and pages visited) to keep the Site secure and reliable.
          </li>
        </ul>

        <h2 className={h2}>How we use information</h2>
        <p className={`${p} mt-4`}>
          We use information you share to respond to you, send confirmations or updates you
          asked for, operate retreats and support offerings, improve the Site, and comply with
          law. We do not sell your personal information.
        </p>

        <h2 className={h2}>Email and marketing</h2>
        <p className={`${p} mt-4`}>
          If you join our email list, we send messages you can reasonably expect from that
          signup (for example, retreat news or community updates). You can unsubscribe using
          the link in those emails or by contacting us.
        </p>

        <h2 className={h2}>Third-party services</h2>
        <p className={`${p} mt-4`}>
          We use trusted providers to send email, host the Site, and protect forms (for example,
          spam prevention). Those providers process data only as needed to perform their
          services and under appropriate agreements.
        </p>

        <h2 className={h2}>Retention</h2>
        <p className={`${p} mt-4`}>
          We keep information only as long as needed for the purposes above, unless a longer
          period is required by law or for legitimate business needs (such as program
          administration).
        </p>

        <h2 className={h2}>Your choices</h2>
        <p className={`${p} mt-4`}>
          You may request access, correction, or deletion of your personal information where
          applicable, or object to certain processing, by contacting us. We will respond
          within a reasonable time.
        </p>

        <h2 className={h2}>Children</h2>
        <p className={`${p} mt-4`}>
          The Site and programs are intended for adults. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2 className={h2}>Changes</h2>
        <p className={`${p} mt-4`}>
          We may update this policy from time to time. The &quot;Last updated&quot; date at the
          top will change when we do. Continued use of the Site after changes means you accept
          the updated policy.
        </p>

        <h2 className={h2}>Contact</h2>
        <p className={`${p} mt-4`}>
          Questions about privacy? Reach us through{" "}
          <Link
            href="/contact"
            className="font-semibold text-[#e76fab] underline underline-offset-2"
          >
            Contact
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
