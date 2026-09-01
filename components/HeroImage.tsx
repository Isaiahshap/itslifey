import Image, { type ImageProps } from "next/image";
import { HERO_BLUR_DATA_URL } from "@/lib/hero-blur";

type HeroImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  /** Optional custom LQIP; defaults to shared warm hero blur. */
  blurDataURL?: string;
};

/**
 * Full-bleed hero photo with blur placeholder → sharp crossfade.
 * Prevents the black flash while the full image loads.
 */
export function HeroImage({
  alt,
  className = "",
  blurDataURL = HERO_BLUR_DATA_URL,
  ...props
}: HeroImageProps) {
  return (
    <Image
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={`hero-image ${className}`.trim()}
      {...props}
    />
  );
}
