import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import { HeroImage } from "@/components/HeroImage";
import { PAST_RETREATS } from "@/lib/past-retreats";

export const metadata: Metadata = {
  title: "Retreats — It's Lifey",
  description:
    "Winter, spring, and summer retreats for widows, plus past It's Lifey weekends. Come alone. Leave with women who understand.",
  openGraph: {
    title: "Retreats | It's Lifey",
    description:
      "Upcoming widow retreats — winter in the Hudson Valley, spring, and summer on Cape Cod — and gatherings from past seasons.",
    images: [
      {
        url: "/images/Summer%20retreat/IMG_4456.webp",
        alt: "Women from an It's Lifey retreat gathered on a dock",
      },
    ],
  },
};

const HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4456.webp`;

const upcoming = [
  {
    href: "/retreats/winter-widow-wellness",
    kicker: "Next retreat · January 15–18, 2027",
    title: "Winter Retreat",
    place: "Hudson Valley · 100-acre private property",
    copy: "Three luxurious nights with a private chef, a day of spa, a guided winter adventure, and women who just get it. Come as strangers. Leave as lifelong friends.",
    cta: "Share your interest",
    image: "/images/winter/winter-retreat-01.jpg",
    alt: "Bright great room with a dining table and floor-to-ceiling forest views",
    position: "center 42%",
  },
  {
    href: "/retreats/spring-retreat-2027",
    kicker: "Spring 2027 · Interest list open",
    title: "Spring Retreat",
    place: "Dates and place still being set",
    copy: "A weekend where you don't have to explain your grief. Women who join the list before February 28, 2027 receive $250 off. Costa Rica is one place we're considering — nothing is booked yet.",
    cta: "Join the interest list",
    image: "/images/Retreats/spring2026/IMG_2602-upright.webp",
    alt: "Women together at a past It's Lifey spring retreat",
    position: "center 32%",
  },
  {
    href: "/retreats/summer-by-the-sea",
    kicker: "July 9–12, 2027 · Cape Cod",
    title: "Summer Retreat",
    place: "Summer by the Sea · private coastal home",
    copy: "Four days on the Cape. A private house, a chef, a spa day, a day on Martha's Vineyard, and time with women who understand without a long explanation.",
    cta: "Share your interest",
    image: "/images/Retreats/Summer2026/Summer Retreat House.webp",
    alt: "The white Cape Cod house for the Summer by the Sea retreat, set among the trees",
    position: "center 50%",
  },
] as const;

export default function RetreatsPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="retreats-heading"
      >
        <div className="ed-hero__media reveal-media">
          <HeroImage
            src={HERO}
            alt="Women from an It's Lifey retreat gathered on a dock"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 35%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">It&apos;s Lifey retreats</p>
            <h1 id="retreats-heading" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>Winter Retreat.</ClipReveal>
              <ClipReveal delay={80}>Spring Retreat.</ClipReveal>
              <span className="il-em">
                <ClipReveal delay={150}>Summer Retreat.</ClipReveal>
              </span>
            </h1>
            <p className="ed-lede reveal-up">
              Small gatherings for widows. You can come alone. You will be with
              women who understand.
            </p>
            <div className="ed-actions reveal-up">
              <Link href="#upcoming" className="il-btn il-btn--solid">
                See upcoming retreats
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </Link>
              <Link href="#past" className="il-btn il-btn--ghost-light">
                Past retreats
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="upcoming">
        {upcoming.map((retreat, index) => (
          <section
            key={retreat.href}
            className={`ed-section scroll-mt-24 ${
              index % 2 === 1 ? "ed-section--blush" : "ed-section--cream"
            }`}
            aria-labelledby={`retreat-${index}-heading`}
          >
            <Link
              href={retreat.href}
              data-reveal=""
              className={`ed-shell ed-split group text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e76fab] ${
                index % 2 === 1 ? "ed-split--flip" : ""
              }`}
            >
              <div className="ed-split__media ed-split__media--tall reveal-media m-0">
                <Image
                  src={retreat.image}
                  alt={retreat.alt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: retreat.position }}
                  sizes="(max-width: 960px) 100vw, 50vw"
                />
              </div>
              <div className="reveal-up">
                <p className="ed-kicker">{retreat.kicker}</p>
                <h2 id={`retreat-${index}-heading`} className="ed-section-title">
                  {retreat.title}
                </h2>
                <p
                  className="ed-body ed-body--ink"
                  style={{ marginTop: "1.15rem" }}
                >
                  {retreat.copy}
                </p>
                <p className="ed-body" style={{ marginTop: "0.85rem" }}>
                  {retreat.place}
                </p>
                <span className="il-link">
                  {retreat.cta}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </section>
        ))}
      </div>

      <section
        id="past"
        className="ed-section ed-section--cream scroll-mt-24"
        aria-labelledby="past-retreats-heading"
      >
        <div className="ed-shell">
          <div style={{ maxWidth: "40rem" }}>
            <p className="ed-kicker">Already gathered</p>
            <h2 id="past-retreats-heading" className="ed-section-title">
              Past retreats
            </h2>
            <p className="ed-body" style={{ marginTop: "1rem" }}>
              Summer, spring, and fall weekends — photos and a short story from
              each one.
            </p>
          </div>

          <div className="ed-blog-list" style={{ marginTop: "2.25rem" }}>
            {PAST_RETREATS.map((retreat) => (
              <Link
                key={retreat.slug}
                href={`/retreats/past/${retreat.slug}`}
                className="ed-blog-item"
              >
                <div className="ed-blog-item__media">
                  {retreat.coverImage ? (
                    <Image
                      src={retreat.coverImage}
                      alt={retreat.coverAlt ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 800px) 100vw, 28rem"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="ed-blog-item__meta">
                    {retreat.cardEyebrow}
                    {retreat.cardBadge ? ` · ${retreat.cardBadge}` : ""}
                  </p>
                  <h3 className="ed-blog-item__title">{retreat.cardTitle}</h3>
                  <p className="ed-blog-item__excerpt">
                    {retreat.cardDescription}
                  </p>
                  <p className="ed-blog-item__more">
                    View retreat <span aria-hidden>→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="ed-section ed-section--blush"
        aria-labelledby="retreats-close-heading"
      >
        <div className="ed-shell" style={{ maxWidth: "40rem" }}>
          <p className="ed-kicker reveal-label">January 15–18, 2027</p>
          <h2 id="retreats-close-heading" className="ed-section-title">
            Winter Retreat is next.
          </h2>
          <p className="ed-body ed-body--ink" style={{ marginTop: "1.15rem" }}>
            Hudson Valley. Tell us you&apos;re interested and we&apos;ll follow
            up by email. No payment today.
          </p>
          <div className="ed-actions">
            <Link
              href="/retreats/winter-widow-wellness"
              className="il-btn il-btn--solid"
            >
              Winter Retreat
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </Link>
            <Link
              href="/retreats/spring-retreat-2027"
              className="il-btn il-btn--ghost-light"
            >
              Spring Retreat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
