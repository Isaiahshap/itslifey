import { layout, prepare } from "@chenglou/pretext";

/** Plain string used for Pretext measurement; must match visible hero headline wording. */
export const HERO_HEADLINE_FOR_LAYOUT =
  "A place for widows to feel supported, understood, and less alone.";

const FONT_FAMILY = `"Nunito Sans", sans-serif`;
const FONT_WEIGHT = 600;

/** Matches the hero h1 `leading-*` intent (tight stack). */
export const HERO_HEADLINE_LINE_HEIGHT_RATIO = 1.1;

const MIN_PX = 24;
const MAX_PX = 62;

function maxLinesForWidth(containerWidthPx: number): number {
  if (containerWidthPx < 320) return 6;
  if (containerWidthPx < 400) return 5;
  return 4;
}

/**
 * Largest font size (px) such that the headline fits in `maxWidthPx` within `maxLines`,
 * using Pretext (canvas-accurate) wrapping — no DOM reflow in the hot path.
 */
export function computeHeroHeadlineFontSizePx(
  containerWidthPx: number,
  maxLines?: number,
): number {
  const w = Math.max(1, Math.floor(containerWidthPx));
  const lines = maxLines ?? maxLinesForWidth(w);
  let lo = MIN_PX;
  let hi = MAX_PX;
  let best = MIN_PX;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const font = `${FONT_WEIGHT} ${mid}px ${FONT_FAMILY}`;
    const prepared = prepare(HERO_HEADLINE_FOR_LAYOUT, font);
    const lineHeightPx = mid * HERO_HEADLINE_LINE_HEIGHT_RATIO;
    const { lineCount } = layout(prepared, w, lineHeightPx);
    if (lineCount <= lines) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  /* Slightly smaller type on phone so the hero stack breathes (CTAs stay full size). */
  if (w < 480) {
    best = Math.round(best * 0.84);
  } else if (w < 640) {
    best = Math.round(best * 0.9);
  } else if (w >= 1024) {
    /* Wider hero column on lg+ — keep type a touch smaller so lines feel airy, not squeezed. */
    best = Math.round(best * 0.83);
    best = Math.min(best, 50);
  } else if (w >= 768) {
    best = Math.round(best * 0.92);
    best = Math.min(best, 54);
  }

  return Math.max(MIN_PX, best);
}
