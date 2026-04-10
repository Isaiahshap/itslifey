"use client";

import { FormHoneypot } from "@/components/FormHoneypot";
import { RecaptchaNotice } from "@/components/RecaptchaNotice";
import { HONEYPOT_FIELD } from "@/lib/form-spam";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";

const HERO_IMAGES = [
  "/images/Retreats/Summer2025/IMG_0683.webp",
  "/images/Retreats/Summer2025/IMG_1698.webp",
  "/images/Retreats/Summer2025/IMG_1845.webp",
  "/images/Retreats/Summer2025/IMG_1908.webp",
  "/images/Retreats/Summer2025/Jen Kitchen Table Horizontal.webp",
] as const;

const LOCATION_IMAGES = [
  "Summer Retreat House.webp",
  "Summer retreat House 2.webp",
  "Summer Retreat House 3.webp",
  "Summer Retreat House 4.webp",
  "Summer Retreat House 5.webp",
  "Summer Retreat House 6.webp",
  "Summer Retreat House 7.webp",
] as const;

const LOCATION_SRC = LOCATION_IMAGES.map(
  (name) => `/images/Retreats/Summer2026/${encodeURIComponent(name)}`,
);

const RETREAT_VIDEO_SRC =
  "https://px8.792.myftpupload.com/wp-content/uploads/2025/07/SnapInsta.to_AQM724iKzsU9Wz3BHDtdIx4iDtHXvfkDDOyhnDNp9Z7TcGciAdFqfYrWK2YOm_3NrOjwELawj5gosbMIPZFTH-7IljxTvCU9jUes72Q.mp4";

/** Wide editorial shell — breathes on large screens (aligned with HopeHub spread). */
const shell =
  "mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,100%)]";

const shellGallery =
  "mx-auto w-full min-w-0 max-w-7xl px-3 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(96rem,100%)]";

const TESTIMONIAL_FORM_PARTS = [
  `Although the "It's Lifey" retreat had a weekend structure, it was completely flexible and your participation in any of the activities or groups was your choice. There was zero pressure or judgment for not participating—or participating a lot.`,
  `The layout was amazing: a group session followed by a fun short outing, with time to relax and eat before another round. The thoughtfulness behind the details of planning a weekend that had the potential to be pretty heavy, but somehow remained pretty light and beautiful, was unparalleled.`,
] as const;

const TESTIMONIAL_AWAITS =
  "I learned there is so much power in community and sharing our stories. Grief looks different for everyone, but the loss of a spouse—be it sudden or after a long-term illness—bonds you in a way that is only understood by your widow sisters. Having never met any of these women before stepping foot on the property, I knew them instantly and I SAW them for who they are—for their pain and sorrow, and also their love and light. It's not a club any of us want to be a part of, yet I can't help but feel really special to be a part of this particular group.";

const INVESTMENT_MARQUEE_PARTS = [
  "Invest in YOU",
  "$3,999 single room",
  "$3,199 triple shared room",
  "Save $100 — register by April 30",
  "Payment plans available",
  "All-inclusive investment",
  "Accommodations (beautiful coastal private home)",
  "All meals and dining experiences",
  "Wellness and reflection sessions",
  "Spa experience",
  "Nantucket or Martha's Vineyard excursion",
  "All retreat programming",
] as const;

const INVESTMENT_MARQUEE_LINE = INVESTMENT_MARQUEE_PARTS.join("  ·  ");

const WHO_FOR_BULLETS = [
  "Feel exhausted from carrying everything on your own",
  "Long to be around women who truly understand widowhood",
  "Want time to reflect, rest, and reconnect with yourself",
  "Are ready for meaningful conversation and real connection",
  "Simply need a few days to step away and breathe",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-64px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const listParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const listChild = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function scrollToInquiry() {
  document.getElementById("retreat-inquiry")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function AttendButton({
  className = "",
  children = "I want to attend",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={scrollToInquiry}
      className={`inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-black/10 transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#d85e9a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] active:scale-[0.99] ${className}`}
    >
      {children}
    </button>
  );
}

function InvestmentMarquee() {
  return (
    <div
      className="w-full overflow-hidden border-y border-black/[0.08] bg-[#faf8f5] py-2.5"
      role="region"
      aria-label="What is included: scrolling summary of pricing and retreat inclusions"
    >
      <p className="sr-only">What&apos;s included: {INVESTMENT_MARQUEE_LINE}</p>
      <div className="retreat-marquee-track">
        <span className="shrink-0 whitespace-nowrap px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666766] sm:text-xs sm:tracking-[0.18em]">
          {INVESTMENT_MARQUEE_LINE}
        </span>
        <span className="shrink-0 whitespace-nowrap px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666766] sm:text-xs sm:tracking-[0.18em]">
          {INVESTMENT_MARQUEE_LINE}
        </span>
      </div>
    </div>
  );
}

export function UpcomingRetreatClient() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [inquirySubmit, setInquirySubmit] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [inquiryFeedback, setInquiryFeedback] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 7500);
    return () => window.clearInterval(id);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  async function handleInquirySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setInquirySubmit("sending");
    setInquiryFeedback("");
    const fd = new FormData(form);
    let recaptchaToken: string | undefined;
    try {
      recaptchaToken = await getRecaptchaToken("retreat_inquiry");
    } catch {
      setInquirySubmit("error");
      setInquiryFeedback(
        "We couldn’t verify the form. Please refresh the page and try again.",
      );
      return;
    }
    const payload = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      address: String(fd.get("address") ?? "").trim(),
      whyJoin: String(fd.get("whyJoin") ?? "").trim(),
      [HONEYPOT_FIELD]: String(fd.get(HONEYPOT_FIELD) ?? "").trim(),
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };
    try {
      const res = await fetch("/api/retreat-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setInquirySubmit("error");
        setInquiryFeedback(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }
      setInquirySubmit("success");
      setInquiryFeedback(
        "Thank you—we received your interest form and will be in touch soon.",
      );
      form.reset();
    } catch {
      setInquirySubmit("error");
      setInquiryFeedback(
        "We couldn’t reach the server. Check your connection and try again.",
      );
    }
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i === null ? null : (i + 1) % LOCATION_SRC.length,
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + LOCATION_SRC.length) % LOCATION_SRC.length,
        );
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex, closeLightbox]);

  return (
    <div className="min-w-0 overflow-x-clip bg-[#f6f3ee]">
      {/* ——— HERO ——— */}
      <section
        className="relative w-full min-w-0 overflow-hidden min-h-[min(86vh,700px)] lg:h-[min(86vh,920px)] lg:min-h-[600px]"
        aria-labelledby="retreat-hero-heading"
      >
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: heroIndex === i ? 1 : 0 }}
              transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] as const }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          ))}
          {/* Soft darken + hope-tinged vignette */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.55)_100%)]"
            aria-hidden
          />
        </div>

        <div
          className={`relative mx-auto flex h-full flex-col justify-end gap-7 pb-10 pt-28 sm:gap-8 sm:pb-14 sm:pt-32 lg:gap-10 lg:pb-14 lg:pt-24 ${shell}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-4xl lg:max-w-5xl"
          >
            <p className="m-0">
              <span className="inline-block rounded-full bg-[#e76fab] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-white ring-2 ring-white/30 sm:text-sm">
                It&apos;s Lifey · July 9th–12th, 2026
              </span>
            </p>
            <h1
              id="retreat-hero-heading"
              className="mt-5 max-w-[22ch] text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:max-w-none lg:text-6xl xl:text-7xl [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.75),0_4px_28px_rgba(0,0,0,0.6),0_12px_56px_rgba(0,0,0,0.45)]"
            >
              Upcoming Summer retreat 2026
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/92 sm:max-w-2xl sm:text-xl lg:text-[1.35rem] lg:leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.88),0_2px_10px_rgba(0,0,0,0.68),0_4px_24px_rgba(0,0,0,0.52),0_10px_40px_rgba(0,0,0,0.38)]">
              A luxury coastal retreat for widows ready to exhale—with women who
              truly get it.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                onClick={scrollToInquiry}
                className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-9 py-4 text-base font-semibold text-white shadow-lg shadow-black/20 ring-2 ring-white/30 transition-[background-color,transform] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99]"
              >
                Join us
              </button>
              <p className="max-w-[16rem] text-sm font-medium leading-snug text-white/90 sm:max-w-[18rem]">
                <span className="text-[#e76fab]">●</span> Save $100 when you
                register by April 30.
              </p>
            </div>
          </motion.div>

          <aside className="relative w-full max-w-none">
            <div className="relative isolate w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-black/45 px-5 py-5 shadow-[0_28px_80px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-inset ring-white/[0.06] sm:rounded-[1.35rem] sm:px-7 sm:py-5 md:px-10 md:py-6 lg:rounded-3xl lg:px-12 lg:py-6">
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.1] via-transparent to-[#e76fab]/[0.07] sm:rounded-[1.35rem] lg:rounded-3xl"
                aria-hidden
              />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-0 md:py-0.5">
                <p className="text-base font-medium italic leading-snug text-white/96 sm:text-lg md:flex-1 md:pr-8 md:leading-relaxed lg:pr-12 lg:text-[1.125rem]">
                  <span className="font-semibold not-italic text-white">
                    July 9th–July 12th, 2026.
                  </span>{" "}
                  Eight women. Four days. One quiet exhale on the coast.
                </p>
                <div
                  className="h-px w-16 shrink-0 rounded-full bg-gradient-to-r from-[#e76fab] to-[#f5a8d4]/90 md:hidden"
                  aria-hidden
                />
                <div
                  className="hidden shrink-0 self-stretch md:block md:w-px md:bg-gradient-to-b md:from-transparent md:via-white/20 md:to-transparent"
                  aria-hidden
                />
                <div className="md:flex-1 md:pl-8 lg:pl-12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#f5b8dc] sm:text-xs">
                    By a widow, for widows
                  </p>
                  <p className="mt-2 text-sm leading-snug text-white/78 sm:mt-2.5 sm:text-[15px] sm:leading-relaxed">
                    Intentionally small so conversation can go deep—and rest can
                    feel real.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Urgency — directly under hero */}
      <div
        className="border-b border-[#e76fab]/35 bg-gradient-to-r from-[#fdf6f9] via-white to-[#fdf6f9] px-4 py-3.5 text-center sm:py-4"
        role="status"
      >
        <p className="text-[13px] font-semibold leading-snug text-[#b84a82] sm:text-sm">
          <span className="font-semibold text-[#9a3d6c]">July 9th–July 12th, 2026.</span>{" "}
          Our last retreat sold out in one week—if this feels like your next
          step, don&apos;t wait.
        </p>
      </div>

      {/* ——— STORY + WHO IT'S FOR (editorial, compact) ——— */}
      <section
        className="border-b border-black/10 bg-white"
        aria-labelledby="retreat-story-heading"
      >
        <div className={`${shell} py-11 sm:py-14 lg:py-16`}>
          <motion.div
            {...fadeUp}
            className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-14"
          >
            <div className="lg:col-span-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e76fab] sm:text-[11px]">
                Widow Wellness Retreat
              </p>
              <h2
                id="retreat-story-heading"
                className="mt-3 text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-black sm:text-5xl lg:text-[3.15rem] lg:leading-[1.03]"
              >
                Rest, connection, and room to breathe
              </h2>
              <p className="mt-4 max-w-md text-base leading-snug text-[#666766] sm:text-lg">
                A luxury coastal retreat for widows ready to exhale
              </p>

              <p className="mt-8 max-w-xl border-l-2 border-[#e76fab] pl-5 text-[15px] italic leading-relaxed text-[#666766] sm:text-base">
                You don&apos;t have to perform grief &ldquo;the right
                way&rdquo; here.{" "}
                <span className="font-semibold not-italic text-black">
                  Come as you are.
                </span>
              </p>

              <div className="mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-[#666766] sm:text-base sm:leading-[1.65]">
                <p className="text-pretty font-medium text-black">
                  If your heart has been craving rest, connection, and a place
                  where you don&apos;t have to explain your story…
                </p>
                <p className="text-pretty font-semibold text-[#e76fab]">
                  This retreat was created for you.
                </p>
                <p className="text-pretty">
                  Four restorative days on the New England coast for widows who
                  need space to breathe, reflect, and reconnect with themselves—and
                  with women who truly understand.
                </p>
                <p className="text-pretty">
                  Step away from the noise of everyday life and immerse yourself in
                  a peaceful retreat filled with meaningful conversation, beautiful
                  surroundings, and genuine connection.
                </p>
                <p className="text-pretty font-semibold text-black">
                  Women arrive as strangers… and leave as lifelong friends.
                </p>
              </div>
            </div>

            <aside
              className="mt-11 border-t border-black/10 pt-10 lg:col-span-5 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1 xl:pl-12"
              id="who-this-is-for"
            >
              <h3
                id="who-for-heading"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-black"
              >
                Who this retreat is for
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#666766]">
                This retreat may be right for you if you:
              </p>

              <motion.ul
                className="mt-5 space-y-2.5"
                variants={listParent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-32px" }}
              >
                {WHO_FOR_BULLETS.map((item) => (
                  <motion.li
                    key={item}
                    variants={listChild}
                    className="flex gap-2.5 text-pretty text-[14px] leading-snug text-[#555] sm:text-[15px] sm:leading-relaxed"
                  >
                    <span className="mt-[0.35em] font-medium text-[#e76fab]" aria-hidden>
                      ·
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-7 border-t border-black/10 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                  Emotional safety first
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#666766]">
                  No explaining. No performing. Just women who get it.
                </p>
              </div>

              <p className="mt-7 text-base font-semibold leading-snug text-black">
                You don&apos;t have to explain your story here.
              </p>
              <p className="mt-1 text-sm text-[#666766]">
                Everyone in the room understands.
              </p>
            </aside>
          </motion.div>

          <div className="mt-10 border-t border-black/10 pt-10 sm:mt-11 sm:pt-11">
            <AttendButton />
          </div>
        </div>
      </section>

      {/* ——— WHAT AWAITS ——— */}
      <section
        className="border-b border-[#d85e9a] bg-[#e76fab]"
        aria-labelledby="what-awaits-heading"
      >
        <div className={`${shell} py-16 sm:py-20 lg:py-28`}>
          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-sm lg:rounded-[2.25rem]"
          >
            <div className="lg:grid lg:grid-cols-12 lg:gap-0">
              <div className="border-b border-black/[0.06] bg-[#fdfaf7] px-6 py-10 sm:px-10 sm:py-12 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-10 lg:py-14 xl:px-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                  The experience
                </p>
                <h2
                  id="what-awaits-heading"
                  className="mt-4 text-3xl font-semibold leading-[1.1] text-black sm:text-4xl"
                >
                  What awaits you
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#666766] sm:text-xl">
                  A retreat designed to feel like a gentle exhale—for your heart
                  and your nervous system. Nothing to prove; just space to be.
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#666766] sm:text-lg">
                  Everything is taken care of so you can arrive, exhale, and be
                  present. You don&apos;t have to hold it all together here.
                </p>
                <div className="mt-8 rounded-2xl border border-[#e76fab]/25 bg-white p-5 sm:p-6">
                  <p className="text-base leading-relaxed text-[#666766] sm:text-lg">
                    We keep the group small on purpose—{" "}
                    <span className="font-semibold text-black">eight women</span>
                    —so connection can feel real, not rushed, and the room stays
                    emotionally safe.
                  </p>
                </div>
                <div className="mt-10">
                  <AttendButton />
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#666766]">
                    No obligation when you reach out. We&apos;ll answer questions
                    and help you decide if the timing feels right—for you.
                  </p>
                </div>
              </div>

              <div className="px-6 py-10 sm:px-10 sm:py-12 lg:col-span-7 lg:px-10 lg:py-14 xl:px-12">
                <p className="text-sm font-semibold text-black">
                  Held for you in this retreat
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#666766]">
                  Details that matter—so you can focus on rest and connection.
                </p>
                <motion.ul
                  className="mt-8 space-y-3"
                  variants={listParent}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-48px" }}
                >
                  {[
                    "Luxury coastal accommodations",
                    "Wellness and reflection sessions",
                    "A rejuvenating spa experience",
                    "A day trip to Nantucket or Martha's Vineyard",
                    "Exceptional meals and relaxed oceanfront time",
                    "Honest conversations and laughter with women who truly get it",
                  ].map((item) => (
                    <motion.li
                      key={item}
                      variants={listChild}
                      className="flex gap-4 rounded-xl border border-[#e76fab]/12 bg-[#faf8f5] py-3.5 pl-4 pr-4 sm:gap-4 sm:py-4 sm:pl-5 sm:pr-5"
                    >
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e76fab]"
                        aria-hidden
                      />
                      <span className="text-pretty text-[15px] font-medium leading-snug text-[#555] sm:text-base sm:leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <figure className="mt-10 rounded-2xl border border-[#e76fab]/20 bg-[#fdf8fb] p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                    From women who were there
                  </p>
                  <blockquote className="mt-4 text-base leading-relaxed text-[#666766] sm:text-[1.05rem] sm:leading-relaxed">
                    <p className="text-pretty">{TESTIMONIAL_AWAITS}</p>
                  </blockquote>
                </figure>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— LOCATION GALLERY ——— */}
      <section
        className="border-b border-black/[0.06] bg-[#ede4df]"
        aria-labelledby="location-gallery-heading"
      >
        <div className={`${shellGallery} py-16 sm:py-20 lg:py-24`}>
          <motion.div {...fadeUp}>
            <div className="max-w-2xl lg:max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
                Summer 2026 home
              </p>
              <h2
                id="location-gallery-heading"
                className="mt-4 text-3xl font-semibold leading-[1.1] text-black sm:text-4xl lg:text-5xl"
              >
                Want a preview of the location?
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#666766] sm:text-xl">
                Coastal calm, room to breathe, and space that feels like a gentle
                exhale. Tap an image to see it larger.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:grid-rows-3 lg:gap-4">
              {LOCATION_SRC.map((src, index) => {
                const featured = index === 0;
                return (
                  <li
                    key={src}
                    className={`relative min-h-[140px] sm:min-h-[180px] ${
                      featured
                        ? "col-span-2 row-span-2 min-h-[220px] sm:min-h-[280px] lg:min-h-0"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className={`group relative h-full min-h-[inherit] w-full overflow-hidden rounded-2xl border-2 border-white bg-black/5 text-left shadow-md transition-[transform,box-shadow] duration-300 hover:border-[#e76fab] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] lg:rounded-3xl ${
                        featured ? "lg:rounded-[2rem]" : ""
                      }`}
                      aria-label={`Open location photo ${index + 1} in large view`}
                    >
                      <Image
                        src={src}
                        alt={`Summer 2026 retreat location, photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes={
                          featured
                            ? "(max-width:1024px) 100vw, 50vw"
                            : "(max-width:640px) 50vw, 25vw"
                        }
                      />
                      <span
                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                      {featured ? (
                        <span className="absolute bottom-4 left-4 rounded-full bg-[#e76fab] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                          Coastal retreat home
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Location photo enlarged"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute right-4 top-4 z-[110] rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Close
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + LOCATION_SRC.length) % LOCATION_SRC.length,
              );
            }}
            className="absolute left-2 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-3 text-lg leading-none text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-3 md:left-4"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % LOCATION_SRC.length);
            }}
            className="absolute right-2 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-3 text-lg leading-none text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3 md:right-4"
            aria-label="Next image"
          >
            ›
          </button>
          <div
            className="relative h-[min(78vh,820px)] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={LOCATION_SRC[lightboxIndex]!}
              alt={`Summer 2026 retreat location, photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}

      {/* ——— INVESTMENT ——— */}
      <section
        className="border-b border-black/[0.06] bg-[#f6f3ee]"
        aria-labelledby="investment-heading"
      >
        <div className={`${shell} py-12 sm:py-14 lg:py-16`}>
          <motion.div {...fadeUp} className="flex flex-col gap-12 lg:gap-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-12 xl:gap-x-16">
              <div className="min-w-0 lg:col-span-7">
                <h2
                  id="investment-heading"
                  className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight text-black sm:text-[2rem] lg:text-[2.125rem]"
                >
                  Invest in YOU
                </h2>
                <p className="mt-3 max-w-xl text-lg font-normal leading-relaxed text-[#666766] sm:text-xl">
                  (because you can&apos;t keep pouring from empty)
                </p>
                <p className="mt-8 max-w-xl text-[1.0625rem] leading-[1.65] text-[#2a2928] sm:text-lg">
                  The investment is $3,999 per person for a single room and
                  $3,199 per person for a triple shared room. You&apos;ll receive
                  $100 off if you register by April 30, and payment plans are
                  available.
                </p>
              </div>

              <div className="min-w-0 border-t border-[#e3ddd4] pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3a3a3]">
                  Retreat dates
                </p>
                <p
                  className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#7a7b7a] sm:text-4xl lg:text-[2.35rem] lg:leading-[1.1]"
                  aria-label="Retreat dates: July 9th through July 12th, 2026"
                >
                  July 9th
                  <span className="mx-2 inline-block text-2xl font-normal text-[#b8b8b8] sm:text-3xl">
                    –
                  </span>
                  July 12th
                </p>
                <p className="mt-2 text-sm font-medium text-[#888988]">2026</p>
              </div>
            </div>

            <div className="border-t border-[#dad6cf] pt-8 lg:pt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666766]">
                Retreat Price
              </p>
              <div className="mt-6 grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
                <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:col-span-7 lg:grid-cols-2 lg:gap-10">
                  <div className="border-r border-[#e3ddd4] pr-6 sm:pr-8">
                    <p className="text-3xl font-semibold tabular-nums tracking-tight text-black sm:text-4xl lg:text-[2.35rem]">
                      $3,999
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#666766] sm:text-[15px]">
                      Single room
                    </p>
                  </div>
                  <div className="pl-2 sm:pl-0">
                    <p className="text-3xl font-semibold tabular-nums tracking-tight text-black sm:text-4xl lg:text-[2.35rem]">
                      $3,199
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#666766] sm:text-[15px]">
                      Triple shared room
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-t border-[#ebe6df] pt-6 text-[15px] leading-snug sm:pt-0 sm:text-base lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-12">
                  <p className="text-[#666766]">All-inclusive investment</p>
                  <p className="font-semibold text-[#e76fab]">
                    Save $100 when you register by April 30
                  </p>
                  <p className="font-semibold text-[#666766]">
                    Payment plans available
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <InvestmentMarquee />
      </section>

      {/* ——— FINAL CTA ——— */}
      <section className="border-t border-white/20 bg-[#e76fab]">
        <div className={`${shell} py-16 text-center sm:py-20 lg:py-28`}>
          <motion.div {...fadeUp} className="mx-auto max-w-4xl">
            <h2 className="text-balance text-3xl font-semibold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              This retreat isn&apos;t about comparison—
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-white sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
              it&apos;s about connection, comfort, and feeling at home with
              people who truly understand.
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/95">
              Spots are limited! Secure your place today and take the first step
              toward a weekend of healing, inspiration, and meaningful new
              friendships.
            </p>
            <div className="mx-auto mt-8 max-w-xl border-t border-white/35 pt-8">
              <p className="text-base font-semibold text-white sm:text-lg">
                Save $100 when you register by April 30 · Payment plans
                available
              </p>
            </div>
            <div className="mx-auto mt-10 flex justify-center">
              <button
                type="button"
                onClick={scrollToInquiry}
                className="inline-flex w-full max-w-sm items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-[#e76fab] shadow-md shadow-black/10 transition-[background-color,transform] duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto active:scale-[0.99]"
              >
                I want to attend
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— VIDEO (above interest form) ——— */}
      <section
        className="border-b border-black/[0.06] bg-[#f6f3ee]"
        aria-labelledby="retreat-video-heading"
      >
        <div className={`${shell} py-14 lg:py-24`}>
          <motion.div
            {...fadeUp}
            className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-5 xl:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                See the feeling
              </p>
              <h2
                id="retreat-video-heading"
                className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-black sm:text-4xl lg:text-[2.35rem] xl:text-5xl"
              >
                A glimpse of what retreat can feel like
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#666766] sm:text-lg">
                Soft, human, real—take a quiet moment with this short video.
                There&apos;s no pressure here.
              </p>
            </div>
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="overflow-hidden rounded-2xl border-4 border-[#e76fab] bg-black shadow-xl shadow-black/15 lg:rounded-3xl">
                <video
                  className="aspect-video w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Video introducing the It's Lifey retreat experience"
                >
                  <source src={RETREAT_VIDEO_SRC} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— BE WITH PEOPLE (lead-in to form) ——— */}
      <section
        className="border-b border-black/[0.06] bg-white"
        aria-labelledby="retreat-get-it-heading"
      >
        <div className={`${shell} py-10 text-center sm:py-12 lg:py-14`}>
          <h2
            id="retreat-get-it-heading"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl lg:text-[2.35rem]"
          >
            Be with people who &ldquo;get it&rdquo;
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#666766] sm:text-lg">
            When you&apos;re ready, share a little about yourself—we&apos;ll take
            it from there.
          </p>
        </div>
      </section>

      {/* ——— INQUIRY FORM (last) ——— */}
      <section
        id="retreat-inquiry"
        className="scroll-mt-24 relative overflow-hidden border-b border-[#d85e9a] bg-[#e76fab]"
        aria-labelledby="inquiry-heading"
      >
        <div className={`${shell} relative py-14 lg:py-24`}>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <aside className="order-2 flex flex-col gap-8 lg:order-1 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-black/[0.06] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)] lg:p-10">
                <p className="text-2xl font-semibold leading-snug tracking-tight text-black sm:text-3xl">
                  We read every interest form with care.
                </p>
                <p className="mt-5 text-base leading-relaxed text-[#666766]">
                  No pressure, no rush—just a gentle next step when you&apos;re
                  ready.
                </p>
                <div className="mt-8 border-t border-black/[0.08] pt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                    Retreat price
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-snug text-black">
                    Invest in YOU
                    <span className="mt-1 block text-base font-normal text-[#666766]">
                      (because you can&apos;t keep pouring from empty)
                    </span>
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-black sm:text-3xl">
                    $3,999{" "}
                    <span className="text-base font-medium text-[#666766]">
                      Single Room
                    </span>
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-black sm:text-3xl">
                    $3,199{" "}
                    <span className="text-base font-medium text-[#666766]">
                      Triple Shared Room
                    </span>
                  </p>
                  <p className="mt-3 text-sm font-medium text-[#666766]">
                    all-inclusive investment
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#e76fab]">
                    Save $100 when you register by April 30
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#666766]">
                    Payment plans available
                  </p>
                </div>
                <div className="mt-8 border-l-4 border-[#e76fab] pl-5">
                  <p className="text-base font-medium leading-relaxed text-black">
                    Limited to eight women — so the room stays intimate and
                    emotionally safe.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/40 bg-white/95 p-6 shadow-lg shadow-black/10 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
                  From women who were there
                </p>
                <div className="mt-5 space-y-4">
                  {TESTIMONIAL_FORM_PARTS.map((text, i) => (
                    <figure
                      key={i}
                      className="rounded-xl border border-black/[0.06] bg-[#faf8f5] p-4 text-sm leading-relaxed text-[#666766] sm:p-4"
                    >
                      <blockquote className="text-pretty">
                        <p>{text}</p>
                      </blockquote>
                    </figure>
                  ))}
                </div>
              </div>
            </aside>

            <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-8">
              <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.12)] sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e76fab]">
                  Reserve your place
                </p>
                <h2
                  id="inquiry-heading"
                  className="mt-3 max-w-xl text-2xl font-semibold leading-tight text-black sm:text-3xl lg:text-4xl"
                >
                  Summer 2026 retreat interest form
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666766] sm:text-lg">
                  Share a few details—we&apos;ll follow up with next steps. The
                  investment is $3,999 per person for a single room and $3,199 per
                  person for a triple shared room. You&apos;ll receive $100 off if
                  you register by April 30, and payment plans are available.
                </p>
                <form
                  className="relative mt-8 space-y-5"
                  onSubmit={handleInquirySubmit}
                >
                  <FormHoneypot idPrefix="retreat-inquiry" />
                  {inquiryFeedback ? (
                    <p
                      role="status"
                      aria-live="polite"
                      className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                        inquirySubmit === "success"
                          ? "border-[#e76fab]/25 bg-[#fdf8fb] text-[#555]"
                          : "border-red-200 bg-red-50 text-red-900"
                      }`}
                    >
                      {inquiryFeedback}
                    </p>
                  ) : null}
                  <div>
                    <label
                      htmlFor="inquiry-full-name"
                      className="block text-sm font-semibold text-black"
                    >
                      Full name
                    </label>
                    <input
                      id="inquiry-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none ring-[#e76fab]/0 transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-sm font-semibold text-black"
                    >
                      Email
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="block text-sm font-semibold text-black"
                    >
                      Phone
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-address"
                      className="block text-sm font-semibold text-black"
                    >
                      Address
                    </label>
                    <input
                      id="inquiry-address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      required
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15"
                    />
                    <p className="mt-1.5 text-sm text-[#666766]">
                      City, state, or full mailing address—whatever you&apos;re
                      comfortable sharing.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-why"
                      className="block text-sm font-semibold text-black"
                    >
                      Why do you want to join this retreat?
                    </label>
                    <textarea
                      id="inquiry-why"
                      name="whyJoin"
                      rows={5}
                      required
                      className="mt-2 w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-base leading-relaxed text-black outline-none transition-shadow focus:border-[#e76fab]/40 focus:ring-4 focus:ring-[#e76fab]/15"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={inquirySubmit === "sending"}
                      className="w-full rounded-full bg-[#e76fab] px-8 py-4 text-base font-semibold text-white shadow-md shadow-black/10 transition-[background-color,opacity] duration-200 hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {inquirySubmit === "sending"
                        ? "Sending…"
                        : "I want to attend"}
                    </button>
                    <RecaptchaNotice />
                    <p className="mt-4 text-center text-sm text-[#666766] sm:text-left">
                      Questions? You can also reach out through{" "}
                      <Link
                        href="/contact"
                        className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/40 underline-offset-2 hover:decoration-[#e76fab]"
                      >
                        Contact
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
