"use client";

import { useEffect } from "react";

/**
 * Fires Meta Pixel ViewContent when the First40 workshop page loads.
 * Use with Lead (form submit) for ad funnel reporting.
 */
export function First40PixelEvents() {
  useEffect(() => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: "First40 Workshop",
      content_category: "Workshop",
      value: 49,
      currency: "USD",
    });
  }, []);

  return null;
}
