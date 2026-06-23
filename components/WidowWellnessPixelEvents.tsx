"use client";

import { useEffect } from "react";

type WidowWellnessPixelEventsProps = {
  contentName: string;
  value?: number;
};

export function WidowWellnessPixelEvents({
  contentName,
  value = 129,
}: WidowWellnessPixelEventsProps) {
  useEffect(() => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: contentName,
      content_category: "Events",
      value,
      currency: "USD",
    });
  }, [contentName, value]);

  return null;
}
