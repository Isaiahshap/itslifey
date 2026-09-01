import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipReveal } from "@/components/ClipReveal";
import { WpHtml } from "@/components/WpHtml";
import {
  formatEventWhen,
  getEventBySlug,
  getEvents,
  getTicketsForEvent,
} from "@/lib/wordpress";

export const revalidate = 120;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

const FALLBACK_HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4585.webp`;

export async function generateStaticParams() {
  const events = await getEvents({ upcomingOnly: false });
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ev = await getEventBySlug(slug);
  if (!ev) return { title: "Event" };
  return {
    title: `${ev.title} — Support & events | It's Lifey`,
    description: `Join us for ${ev.title}. ${formatEventWhen(ev)}`,
  };
}

export default async function SupportGroupEventPage({ params }: PageProps) {
  const { slug } = await params;
  const ev = await getEventBySlug(slug);
  if (!ev) notFound();

  const ticketTiers = await getTicketsForEvent(ev.id);
  const purchaseHref = ev.purchaseUrl;
  const purchaseLabel = ev.website ? "Register" : "Get tickets";
  const heroSrc = ev.imageUrl || FALLBACK_HERO;

  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="event-title"
      >
        <div className="ed-hero__media reveal-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">
              {ev.categoryLabel || "Support & events"}
            </p>
            <h1 id="event-title" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>{ev.title}</ClipReveal>
            </h1>
            <p className="ed-lede reveal-up">{formatEventWhen(ev)}</p>
            <div className="ed-actions reveal-up">
              <a
                href={purchaseHref}
                target="_blank"
                rel="noopener noreferrer"
                className="il-btn il-btn--solid"
              >
                {purchaseLabel}
                <span aria-hidden className="il-btn__arrow">
                  →
                </span>
              </a>
              <Link href="/hopehub" className="il-btn il-btn--ghost-light">
                Explore HopeHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav
        className="ed-section ed-section--cream"
        style={{ paddingBlock: "1.25rem" }}
        aria-label="Breadcrumb"
      >
        <div className="ed-shell">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-[var(--ed-muted)]">
            <li>
              <Link
                href="/support-groups"
                className="font-semibold text-[var(--ed-pink-deep)] underline decoration-[rgba(231,111,171,0.35)] underline-offset-2"
              >
                Support groups &amp; events
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="line-clamp-2 text-[var(--ed-ink)]">{ev.title}</li>
          </ol>
        </div>
      </nav>

      <article className="ed-section ed-section--cream" style={{ paddingTop: 0 }}>
        <div className="ed-shell">
          <header className="mx-auto max-w-3xl">
            {ev.costHtml ? (
              <div className="text-lg font-semibold text-[var(--ed-ink)]">
                <WpHtml html={ev.costHtml} />
              </div>
            ) : null}

            <p className="ed-body" style={{ marginTop: "1.25rem" }}>
              Registration and payment run on It&apos;s Lifey&apos;s event page
              (WordPress)—the same secure checkout you use when you start from the
              main site.
            </p>

            {ticketTiers.length > 0 ? (
              <div className="ed-form-panel" style={{ marginTop: "2rem" }}>
                <p className="ed-kicker">Ticket options</p>
                <p className="ed-body" style={{ marginTop: "0.5rem" }}>
                  Choose a tier on the next page to complete checkout.
                </p>
                <ul className="mt-5 list-none space-y-3 p-0">
                  {ticketTiers.map((t) => (
                    <li
                      key={t.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--ed-rule)] pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="font-medium text-[var(--ed-ink)]">
                        {t.title}
                      </span>
                      <span className="text-[var(--ed-muted)]">{t.cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </header>

          <div className="mx-auto mt-14 max-w-3xl border-t border-[var(--ed-rule)] pt-12 sm:mt-16 sm:pt-16">
            <p className="ed-kicker">About this session</p>
            <div className="mt-6">
              <WpHtml html={ev.descriptionHtml} asArticle />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
