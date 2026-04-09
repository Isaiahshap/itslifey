import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Jennifer & It's Lifey",
  description:
    "Jennifer shares how widowhood shaped It's Lifey and HopeHub—real story, real community, and support for widows who crave connection and compassion.",
};

const HERO_IMAGE =
  "/images/imgi_6_Shutterstock_2149264945-e1744221827756.jpg" as const;

/** Shared body copy in the print-style measure */
const bodyText =
  "text-[0.98rem] leading-[1.72] text-[#2a2928] sm:text-[1.0625rem] sm:leading-[1.78]";

export default function AboutPage() {
  return (
    <div className="bg-[#f6f3ee]">
      <section
        className="relative h-[50vh] min-h-[16rem] w-full overflow-hidden"
        aria-labelledby="about-hero-heading"
      >
        <Image
          src={HERO_IMAGE}
          alt="Hands clasped together, raised toward bright sunlight"
          fill
          priority
          className="object-cover object-[center_38%] scale-[1.02]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/28 to-black/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/20"
          aria-hidden
        />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 pt-20 sm:px-8 sm:pb-14 sm:pt-24 lg:px-12 lg:pb-16">
          <div className="max-w-lg border-l-2 border-[#e76fab]/90 pl-6 sm:pl-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/80 sm:text-[11px]">
              It&apos;s Lifey
            </p>
            <h1
              id="about-hero-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]"
            >
              About
            </h1>
          </div>
        </div>
      </section>

      <article className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:max-w-[72rem] lg:px-12 lg:py-28">
        {/* Opening line only */}
        <header className="mx-auto mb-10 max-w-none border-b border-[#d8d2c8] pb-10 sm:mb-12 sm:pb-12 lg:mb-12 lg:max-w-[56rem] xl:max-w-[62rem]">
          <div
            className="mb-8 h-px w-10 bg-[#e76fab]/70 sm:mb-9"
            aria-hidden
          />
          <p className="m-0 max-w-xl text-pretty text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#141413] sm:max-w-2xl sm:text-[2.125rem] sm:leading-[1.12] lg:text-[2.5rem] lg:leading-[1.08]">
            <span className="block">Hi, I&apos;m Jen.</span>
            <span className="mt-2 block sm:mt-2.5">
              In May 2024, I became a widow.
            </span>
          </p>
        </header>

        {/* First paragraph + jenabout1 (text left, image right) */}
        <div className="mx-auto mb-10 flex max-w-none flex-col gap-8 hyphens-auto text-pretty sm:mb-12 lg:mb-14 lg:max-w-[56rem] lg:flex-row lg:items-start lg:gap-10 xl:max-w-[62rem] xl:gap-12">
          <p className={`min-w-0 flex-1 ${bodyText} m-0`}>
            My husband and I were on a dream trip to Greece when, on the fourth
            night of our vacation, he unexpectedly had a heart attack and died
            in our hotel room. I came home alone, a widow, suddenly responsible
            for navigating grief, logistics, and the emotional fallout of a
            blended family trying to make sense of something senseless. That
            loss broke me open, but it also stripped life down to its truth:
            connection is lifesaving. I had already weathered divorce, blended
            family challenges, heartbreak, and addiction in my orbit – but
            widowhood brought a level of loneliness nothing prepared me for.
            What helped wasn&apos;t clichés or advice; it was real conversations
            with real people who understood.
          </p>
          <figure className="m-0 w-full shrink-0 lg:max-w-[min(100%,13.5rem)] xl:max-w-[15rem]">
            <div className="overflow-hidden rounded-sm bg-[#ebe6df] shadow-sm ring-1 ring-black/[0.06]">
              <Image
                src="/images/jenabout1.jpg"
                alt="Jennifer dancing with her husband at a celebration"
                width={480}
                height={600}
                className="aspect-[4/5] h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 15rem"
              />
            </div>
          </figure>
        </div>

        <figure
          className="relative mx-auto my-10 max-w-none overflow-hidden rounded-2xl bg-[#fffcfa] px-7 py-12 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] ring-1 ring-[#ebe6df]/90 sm:my-12 sm:px-10 sm:py-14 lg:my-12 lg:max-w-[56rem] lg:rounded-none lg:border-y lg:border-[#e3ddd4] lg:bg-[#faf7f3] lg:px-12 lg:py-14 lg:shadow-none lg:ring-0 xl:max-w-[62rem] xl:px-16"
        >
          <span
            className="pointer-events-none absolute left-5 top-6 select-none font-semibold leading-none text-[#e76fab]/[0.14] sm:left-8 sm:top-8 sm:text-[4.5rem] lg:text-[5rem]"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="relative z-[1] m-0">
            <p
              className={`m-0 text-[1.15rem] font-medium leading-[1.48] text-[#1a1a1a] sm:text-[1.25rem] sm:leading-[1.5] lg:text-center lg:text-[1.28rem]`}
            >
              There is no greater agony than bearing an untold story inside you.
            </p>
          </blockquote>
          <figcaption
            className="relative z-[1] mt-7 text-center text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-[#666766] sm:text-[0.8125rem]"
          >
            Maya Angelou
          </figcaption>
        </figure>

        {/* jenabout2 left, closing letter right */}
        <div className="mx-auto mt-10 flex max-w-none flex-col gap-8 hyphens-auto text-pretty sm:mt-12 lg:mt-14 lg:max-w-[56rem] lg:flex-row lg:items-start lg:gap-10 xl:max-w-[62rem] xl:gap-12">
          <figure className="m-0 w-full shrink-0 lg:max-w-[min(100%,13.5rem)] xl:max-w-[15rem]">
            <div className="overflow-hidden rounded-sm bg-[#ebe6df] shadow-sm ring-1 ring-black/[0.06]">
              <Image
                src="/images/jenabout2.jpg"
                alt="Jennifer smiling in soft light"
                width={480}
                height={600}
                className="aspect-[4/5] h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 15rem"
              />
            </div>
          </figure>
          <div className="min-w-0 flex-1 space-y-8">
            <p className={`${bodyText} m-0`}>
              I decided I would not grieve in silence. I would tell my story as
              it is…raw, honest, and human …so others wouldn&apos;t feel so alone
              in theirs. That calling became It&apos;s Lifey and HopeHub, a
              community for widows who crave connection, compassion, and a place
              to land when everything feels heavy.
            </p>
            <p className={`${bodyText} m-0`}>
              Through virtual support groups, expert-guided conversations,
              healing retreats, and one-on-one connection, I&apos;m building the
              thing I desperately needed: a home for widows to feel seen,
              supported, and surrounded.
            </p>
            <p
              className={`m-0 border-l-2 border-[#e76fab]/55 pl-5 text-[0.98rem] font-medium leading-[1.62] text-[#1a1a1a] sm:pl-6 sm:text-[1.0625rem] sm:leading-[1.6]`}
            >
              Because loneliness is brutal—but community heals. And that&apos;s
              the heart of everything I do.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-none border border-[#d8d2c8] bg-[#fffcfa] p-8 sm:mt-20 sm:p-10 lg:mt-24 lg:max-w-[56rem] xl:max-w-[62rem]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-12">
            <div className="min-w-0 flex-1">
              <div className="mb-8 h-px w-9 bg-[#e76fab]/75" aria-hidden />
              <h2 className="m-0 border-b border-[#ebe6df] pb-5 text-[1.28rem] font-semibold leading-tight tracking-[-0.02em] text-black sm:text-[1.4rem]">
                Jen Newberg, Founder
              </h2>
              <p className={`mt-7 ${bodyText} m-0 mb-0`}>
                Jen is a communications and partnerships executive, both in the
                for-profit and non-profit space, with experience leading
                mission-driven campaigns for brands like T-Mobile, Purina, Dove,
                Planet Fitness and more. Her superpower is connecting people, and
                she specializes in building authentic, value-based connections.
                Drawing from her own journey through life transitions, and more
                specifically the loss of her husband in 2024, Jen founded
                It&apos;s Lifey – to ensure that no widow ever has to feel alone.
                She believes there&apos;s no playbook for life – but with
                community and shared experience, we can find our way through.
              </p>
            </div>
            <figure className="m-0 mx-auto w-full max-w-[19rem] shrink-0 lg:mx-0 lg:max-w-[min(100%,18rem)] xl:max-w-[20rem]">
              <div className="overflow-hidden rounded-sm bg-[#ebe6df] shadow-sm ring-1 ring-black/[0.06]">
                <Image
                  src="/images/jen4.jpg"
                  alt="Jennifer, founder of It's Lifey"
                  width={600}
                  height={750}
                  className="aspect-[4/5] h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 20rem"
                />
              </div>
            </figure>
          </div>
        </div>

      </article>
    </div>
  );
}
