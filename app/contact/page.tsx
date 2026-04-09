import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — It's Lifey",
  description:
    "Reach It's Lifey with questions about retreats, HopeHub, and support for widows. We read every message.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section className="border-b border-[#e3ddd4] bg-[#faf8f5]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-5 sm:py-16 lg:px-6 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e76fab] sm:text-sm">
            Contact
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-black sm:text-5xl">
            We&apos;re glad you reached out
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#666766] sm:text-xl">
            Share a note below—we read every message and respond as soon as we
            can. You&apos;ll get a short confirmation email when your form is
            received.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-6">
          <div className="rounded-[1.35rem] border border-[#e8e2da] bg-[#fffcfa] p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.12)] sm:p-10 lg:p-12">
            <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
              Send a message
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#666766]">
              Name, email, and your message are all we need. Phone is optional if
              you&apos;d rather we call you back.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
