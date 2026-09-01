"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Force window to the top on every App Router navigation.
 * Mobile especially can land mid/bottom-page when a previous scroll
 * position or body overflow lock survives soft navigations.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    html.scrollTop = 0;
    document.body.scrollTop = 0;

    // Restore after the paint so any delayed layout doesn't keep a mid-page offset
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      html.style.scrollBehavior = previous;
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
