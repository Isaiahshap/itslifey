import type { Metadata } from "next";
import Image from "next/image";
import { ClipReveal } from "@/components/ClipReveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — It's Lifey",
  description:
    "Reach It's Lifey with questions about retreats, HopeHub, and support for widows. We read every message.",
};

const HERO = "/images/widowwellnessimages/IMG_4575.jpeg";
const SIDE = "/images/widowwellnessimages/IMG_0604.jpeg";

export default function ContactPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="contact-hero-heading"
      >
        <div className="ed-hero__media reveal-media">
          <Image
            src={HERO}
            alt="Women sharing a warm meal and conversation together"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">Contact</p>
            <h1 id="contact-hero-heading" className="ed-title">
              <ClipReveal delay={0}>We&apos;re glad you</ClipReveal>
              <ClipReveal delay={80}>reached out</ClipReveal>
            </h1>
            <p className="ed-lede reveal-up">
              Share a note below. We read every message and respond as soon as
              we can.
            </p>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-split">
          <div>
            <p className="ed-kicker">Send a message</p>
            <h2 className="ed-section-title">
              Tell us what you need
            </h2>
            <p className="ed-body" style={{ marginTop: "1.15rem" }}>
              Questions about retreats, HopeHub, support groups, or simply
              wanting to say hello — we&apos;re here. You&apos;ll get a short
              confirmation email when your form is received.
            </p>

            <div className="ed-form-panel" style={{ marginTop: "2rem" }}>
              <ContactForm />
            </div>
          </div>

          <div className="ed-contact-aside">
            <figure className="ed-split__media ed-split__media--tall m-0">
              <Image
                src={SIDE}
                alt="Widows gathered in warm connection at an It's Lifey event"
                fill
                sizes="(max-width: 960px) 100vw, 48vw"
              />
            </figure>
            <div>
              <p className="ed-kicker">Prefer email?</p>
              <p className="ed-body" style={{ marginTop: "0.75rem" }}>
                You can also reach Jennifer directly at{" "}
                <a href="mailto:jennifer@itslifey.com">
                  jennifer@itslifey.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
