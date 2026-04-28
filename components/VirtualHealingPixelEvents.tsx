"use client";

import { useEffect } from "react";

/**
 * Fires a Meta Pixel ViewContent event when the Virtual Healing
 * Experiences page is viewed. Placed at the top of the page component
 * so it fires immediately on mount.
 */
export function VirtualHealingPixelEvents() {
  useEffect(() => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: "Virtual Healing Experiences",
      content_category: "Support",
      value: 899,
      currency: "USD",
    });
  }, []);

  return null;
}
