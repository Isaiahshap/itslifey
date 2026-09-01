"use client";

import { HERO_BLUR_DATA_URL } from "@/lib/hero-blur";
import { useState, type CSSProperties } from "react";

type HeroNativeImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Native <img> hero (WP / EXIF-sensitive sources) with blur LQIP underlay
 * that fades to the sharp photo on load.
 */
export function HeroNativeImage({
  src,
  alt,
  className = "",
  style,
  fetchPriority = "high",
}: HeroNativeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <span
        className="hero-image__blur"
        style={{ backgroundImage: `url(${HERO_BLUR_DATA_URL})` }}
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`hero-image hero-image--native ${loaded ? "is-loaded" : ""} ${className}`.trim()}
        style={style}
        onLoad={() => setLoaded(true)}
        fetchPriority={fetchPriority}
      />
    </>
  );
}
