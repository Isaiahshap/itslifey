import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WpHtml } from "@/components/WpHtml";
import {
  formatEventWhen,
  getEventBySlug,
  getEvents,
  getTicketsForEvent,
} from "@/lib/wordpress";

export const revalidate = 120;
export const dynamicParams = true;

const shell =
  "mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8 2xl:max-w-[min(88rem,calc(100vw-4rem))]";

type PageProps = { params: Promise<{ slug: string }> };

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

  return (
    <div className="bg-[#f6f3ee]">
      <section
        className="border-b border-black/[0.06] bg-[#faf8f5]"
        aria-labelledby="event-title"
      >
        <div className={`${shell} py-8 sm:py-10`}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#666766]">
              <li>
                <Link
                  href="/support-groups"
                  className="font-semibold text-[#e76fab] underline decoration-[#e76fab]/35 underline-offset-2 hover:decoration-[#e76fab]"
                >
                  Support groups &amp; events
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="line-clamp-2 text-black">{ev.title}</li>
            </ol>
          </nav>
        </div>
      </section>

      {ev.imageUrl ? (
        <div className="relative w-full border-b border-black/[0.06] bg-[#ebe6df]">
          <div className="relative mx-auto aspect-[21/9] w-full max-w-6xl sm:aspect-[2.75/1]">
            <Image
              src={ev.imageUrl}
              alt=""
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>
        </div>
      ) : null}

      <article className={`${shell} py-12 sm:py-16 lg:py-20`}>
        <header className="mx-auto max-w-3xl">
          {ev.categoryLabel ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e76fab]">
              {ev.categoryLabel}
            </p>
          ) : null}
          <h1
            id="event-title"
            className="mt-3 text-pretty text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#141413] sm:text-4xl lg:text-[2.35rem]"
          >
            {ev.title}
          </h1>
          <p className="mt-5 text-lg font-medium text-[#2a2928]">
            {formatEventWhen(ev)}
          </p>
          {ev.costHtml ? (
            <div className="mt-3 text-lg font-semibold text-[#141413]">
              <WpHtml html={ev.costHtml} />
            </div>
          ) : null}

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#666766]">
            Registration and payment run on It&apos;s Lifey&apos;s event page
            (WordPress)—the same secure checkout you use when you start from the
            main site.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={purchaseHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#e76fab] px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-black/10 transition-colors hover:bg-[#d85e9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              {purchaseLabel}
            </a>
            <Link
              href="/hopehub"
              className="inline-flex items-center justify-center rounded-full border-2 border-black/14 bg-white px-8 py-3.5 text-base font-semibold text-black transition-colors hover:border-[#e76fab]/50 hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab]"
            >
              Explore HopeHub
            </Link>
          </div>

          {ticketTiers.length > 0 ? (
            <div className="mt-10 rounded-2xl border border-black/[0.08] bg-white/90 px-6 py-6 sm:px-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#666766]">
                Ticket options
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#666766]">
                Choose a tier on the next page to complete checkout.
              </p>
              <ul className="mt-5 space-y-3">
                {ticketTiers.map((t) => (
                  <li
                    key={t.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black/[0.06] pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="font-medium text-[#141413]">{t.title}</span>
                    <span className="text-[#2a2928]">{t.cost}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </header>

        <div className="mx-auto mt-14 max-w-3xl border-t border-black/[0.06] pt-12 sm:mt-16 sm:pt-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#666766]">
            About this session
          </h2>
          <div className="mt-6">
            <WpHtml html={ev.descriptionHtml} asArticle />
          </div>
        </div>
      </article>
    </div>
  );
}
