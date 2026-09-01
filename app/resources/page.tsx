import type { Metadata } from "next";
import Image from "next/image";
import { HeroImage } from "@/components/HeroImage";
import Link from "next/link";
import { ClipReveal } from "@/components/ClipReveal";
import {
  RESOURCE_SECTIONS,
  RESOURCES_CLOSING,
  RESOURCES_INTRO,
} from "@/lib/resources";
import { EVENT_PATH } from "@/lib/widow-wellness-event";
import { HOPEHUB_SIGNUP_URL } from "@/lib/hopehub";

export const metadata: Metadata = {
  title: "Resources for Widows",
  description:
    "Trusted resources for widows—crisis support, grief help, mental health, parenting, finances, legal aid, and connection through It's Lifey.",
};

const HERO = `/images/${encodeURIComponent("Summer retreat")}/IMG_4297.webp`;

export default function ResourcesPage() {
  return (
    <div className="ed">
      <section
        data-entrance="hero"
        className="ed-hero"
        aria-labelledby="resources-hero-heading"
      >
        <div className="ed-hero__media reveal-media">
          <HeroImage
            src={HERO}
            alt="Women together during an It's Lifey summer retreat"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 40%" }}
          />
        </div>
        <div className="ed-hero__veil" aria-hidden />
        <div className="ed-hero__inner">
          <div className="ed-hero__panel">
            <p className="ed-kicker reveal-label">Support</p>
            <h1 id="resources-hero-heading" className="ed-title ed-title--wide">
              <ClipReveal delay={0}>Resources</ClipReveal>
              <ClipReveal delay={80}>for widows</ClipReveal>
            </h1>
            <p className="ed-lede reveal-up">
              Trusted places to turn—when you need help now, gentle guidance,
              or simply a place to begin.
            </p>
          </div>
        </div>
      </section>

      <section className="ed-section ed-section--cream">
        <div className="ed-shell ed-resources-intro">
          <div>
            {RESOURCES_INTRO.map((p) => (
              <p key={p} className="ed-body ed-body--ink ed-resources-intro__p">
                {p}
              </p>
            ))}
          </div>
          <nav className="ed-jump" aria-label="Resource topics">
            <p className="ed-kicker">Browse</p>
            <ul className="ed-jump__list">
              {RESOURCE_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {RESOURCE_SECTIONS.map((section, index) => {
        const flip = index % 2 === 1;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`ed-section ${
              section.tone === "crisis"
                ? "ed-section--crisis"
                : index % 2 === 0
                  ? "ed-section--cream"
                  : "ed-section--blush"
            }`}
          >
            <div
              className={`ed-shell ed-split ${flip ? "ed-split--flip" : ""}`}
            >
              <div>
                <p className="ed-kicker">{section.kicker}</p>
                <h2 className="ed-section-title">{section.title}</h2>
                {section.intro.map((p) => (
                  <p
                    key={p}
                    className="ed-body"
                    style={{ marginTop: "1.1rem", maxWidth: "42ch" }}
                  >
                    {p}
                  </p>
                ))}

                <div className="ed-resource-list">
                  {section.items.map((item) => (
                    <article key={item.name} className="ed-resource">
                      <h3 className="ed-resource__name">{item.name}</h3>
                      {item.body.map((p) => (
                        <p key={p} className="ed-resource__body">
                          {p}
                        </p>
                      ))}
                      {item.links.length > 0 ? (
                        <div className="ed-resource__links">
                          {item.links.map((link) =>
                            link.external ? (
                              <a
                                key={link.href + link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ed-resource__link"
                              >
                                {link.label}
                                <span aria-hidden> →</span>
                              </a>
                            ) : (
                              <Link
                                key={link.href + link.label}
                                href={link.href}
                                className="ed-resource__link"
                              >
                                {link.label}
                                <span aria-hidden> →</span>
                              </Link>
                            ),
                          )}
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>

              {section.image ? (
                <figure className="ed-split__media ed-split__media--tall m-0">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(max-width: 960px) 100vw, 48vw"
                    style={{
                      objectPosition: section.image.position ?? "center center",
                    }}
                  />
                </figure>
              ) : null}
            </div>
          </section>
        );
      })}

      <section className="ed-section ed-section--blush">
        <div className="ed-shell ed-resources-close">
          <p className="ed-kicker">A soft place to land</p>
          <h2 className="ed-section-title">{RESOURCES_CLOSING.title}</h2>
          {RESOURCES_CLOSING.body.map((p) => (
            <p
              key={p}
              className="ed-body"
              style={{ marginTop: "1.1rem", maxWidth: "48ch" }}
            >
              {p}
            </p>
          ))}
          <div className="ed-actions" style={{ marginTop: "2rem" }}>
            <a href={HOPEHUB_SIGNUP_URL} className="il-btn il-btn--solid">
              Join HopeHub free
              <span aria-hidden className="il-btn__arrow">
                →
              </span>
            </a>
            <Link href={EVENT_PATH} className="il-btn il-btn--ghost-light">
              Upcoming gathering
            </Link>
            <Link href="/contact" className="il-btn il-btn--ghost-light">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
