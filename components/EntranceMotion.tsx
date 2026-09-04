"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SKIP =
  "nav, header, footer, script, style, noscript, button, a, label, input, textarea, select, option, li, figcaption";

/**
 * Sitewide entrance: text + photo only.
 * Never animates whole sections.
 *
 * - Hero ([data-entrance="hero"] or first section): is-ready on next frame
 * - Headings → clip-reveal line lift
 * - Supporting copy → reveal-up / reveal-label
 * - Photos / media → reveal-media (rise + unmask)
 * - Each marked node gets data-reveal and is-visible once in view
 */
export function EntranceMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    const markReveal = (el: HTMLElement, delayMs?: number) => {
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", "");
      }
      if (
        delayMs !== undefined &&
        !el.style.getPropertyValue("--reveal-delay")
      ) {
        el.style.setProperty("--reveal-delay", `${delayMs}ms`);
      }
    };

    const ensureClipReveal = (heading: HTMLElement) => {
      if (heading.querySelector(".clip-reveal")) return;
      if (heading.dataset.clipReady === "1") return;
      heading.dataset.clipReady = "1";

      const html = heading.innerHTML.trim();
      if (!html) return;

      // Preserve existing markup inside a single masked line
      heading.innerHTML = `<span class="clip-reveal"><span class="clip-reveal__inner">${html}</span></span>`;
    };

    const tagText = (el: HTMLElement, delayMs = 0) => {
      if (el.closest(SKIP) && el.tagName !== "P" && !/^H[1-3]$/.test(el.tagName)) {
        return;
      }
      if (
        el.classList.contains("reveal-up") ||
        el.classList.contains("reveal-label") ||
        el.classList.contains("reveal-media") ||
        el.classList.contains("clip-reveal")
      ) {
        markReveal(el, delayMs);
        return;
      }

      if (/^H[1-3]$/.test(el.tagName)) {
        ensureClipReveal(el);
        markReveal(el, delayMs);
        return;
      }

      const len = el.textContent?.trim().length ?? 0;
      if (len < 2) return;

      const isLabel = el.tagName === "P" && len < 42;
      el.classList.add(isLabel ? "reveal-label" : "reveal-up");
      markReveal(el, delayMs);
    };

    const tagMedia = (el: HTMLElement, delayMs = 40) => {
      const target =
        el.closest<HTMLElement>("figure, picture, [class*='__media'], [class*='-media']") ??
        el;

      if (
        target.closest(
          "nav, header, footer, button, a.home-highlight, .home-highlight, .ww-sponsors, [class*='sponsors__logo'], [class*='sponsor-logo']",
        )
      ) {
        return;
      }
      if (target.dataset.mediaReady === "1") return;
      target.dataset.mediaReady = "1";
      target.classList.add("reveal-media");
      markReveal(target, delayMs);
    };

    const tagHero = (hero: HTMLElement) => {
      if (!hero.hasAttribute("data-entrance")) {
        hero.setAttribute("data-entrance", "hero");
      }

      const media = hero.querySelector<HTMLElement>(
        "[class*='__media'], [class*='-media'], .reveal-media, figure",
      );
      if (media) tagMedia(media, 160);

      const h1 = hero.querySelector<HTMLElement>("h1");
      if (h1) {
        if (!h1.querySelector(".clip-reveal")) ensureClipReveal(h1);
        // Hero headings animate via is-ready parent, not scroll
        h1.removeAttribute("data-reveal");
      }

      let delay = 180;
      hero
        .querySelectorAll<HTMLElement>(
          "p, .il-btn, a.il-btn, button.il-btn, button.ww-btn, button.wwr-btn, [class*='actions'], [class*='lede'], [class*='meta'], [class*='eyebrow'], [class*='brand']",
        )
        .forEach((el) => {
          if (el.closest("h1, nav, .home-hero__scroll")) return;
          if (
            el.classList.contains("reveal-up") ||
            el.classList.contains("reveal-label") ||
            el.classList.contains("reveal-media")
          ) {
            if (!el.style.getPropertyValue("--reveal-delay")) {
              el.style.setProperty("--reveal-delay", `${delay}ms`);
            }
            delay += 50;
            return;
          }
          const len = el.textContent?.trim().length ?? 0;
          const isLabel =
            el.tagName === "P" && len < 48
              ? true
              : el.className.includes("eyebrow") ||
                el.className.includes("brand") ||
                el.className.includes("kicker") ||
                el.className.includes("label");
          el.classList.add(isLabel ? "reveal-label" : "reveal-up");
          if (!el.style.getPropertyValue("--reveal-delay")) {
            el.style.setProperty("--reveal-delay", `${delay}ms`);
          }
          delay += 50;
        });
    };

    const enhancePage = () => {
      const main = document.querySelector("main");
      if (!main) return;

      // Strip accidental section-level motion (whole block sliding)
      main.querySelectorAll<HTMLElement>("section.reveal-up, article.reveal-up").forEach((el) => {
        el.classList.remove("reveal-up");
      });

      // Sponsor logos must never get reveal-media (filter + clip-path glitches)
      main
        .querySelectorAll<HTMLElement>(
          ".ww-sponsors .reveal-media, .ww-sponsors [data-reveal]",
        )
        .forEach((el) => {
          el.classList.remove("reveal-media", "is-visible", "reveal-up", "reveal-label");
          el.removeAttribute("data-reveal");
          delete el.dataset.mediaReady;
        });

      const sections = Array.from(
        main.querySelectorAll<HTMLElement>("section, article"),
      );

      const hero = sections[0];
      if (hero) tagHero(hero);

      const scopeEls = sections.length ? sections.slice(1) : [main];

      scopeEls.forEach((scope) => {
        // Never motion the section itself
        scope.classList.remove("reveal-up");

        scope
          .querySelectorAll<HTMLElement>("h1, h2, h3")
          .forEach((h, i) => tagText(h, Math.min(i * 40, 160)));

        scope
          .querySelectorAll<HTMLElement>("p")
          .forEach((p, i) => {
            if (p.closest("form, nav, footer, li, button, a")) return;
            if ((p.textContent?.trim().length ?? 0) < 12) return;
            tagText(p, Math.min(40 + i * 30, 200));
          });

        scope
          .querySelectorAll<HTMLElement>("a.ed-resource__link, .ed-resource__link")
          .forEach((link, i) => {
            link.classList.add("reveal-up");
            markReveal(link, Math.min(80 + i * 45, 280));
          });

        scope
          .querySelectorAll<HTMLElement>(
            "img, video, figure, picture, [class*='__media'], [class*='-media'], [class*='gallery'] > *, [class*='break']",
          )
          .forEach((node) => {
            if (node.tagName === "IMG" || node.tagName === "VIDEO") {
              const host = node.parentElement;
              if (host) tagMedia(host);
              return;
            }
            tagMedia(node);
          });
      });
    };

    const armHeroes = () => {
      document
        .querySelectorAll<HTMLElement>('[data-entrance="hero"]:not(.is-ready)')
        .forEach((el) => {
          if (reduce) {
            el.classList.add("is-ready");
            return;
          }
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              el.classList.add("is-ready");
            });
          });
        });
    };

    const armReveals = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => {
          // Skip nodes inside the hero — hero uses is-ready
          if (el.closest('[data-entrance="hero"]')) return;
          if (reduce) {
            el.classList.add("is-visible");
            return;
          }
          io.observe(el);
        });
    };

    let scheduled = 0;
    const arm = () => {
      if (scheduled) return;
      scheduled = window.requestAnimationFrame(() => {
        scheduled = 0;
        enhancePage();
        armHeroes();
        armReveals();
      });
    };

    arm();

    const mo = new MutationObserver(() => arm());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (scheduled) window.cancelAnimationFrame(scheduled);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
