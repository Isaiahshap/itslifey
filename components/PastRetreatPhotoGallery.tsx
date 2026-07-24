"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export type PastRetreatPhoto = {
  src: string;
  alt: string;
};

type Props = {
  photos: PastRetreatPhoto[];
  /** When set, this src is omitted from the thumb grid (already shown as the page hero). */
  coverSrc?: string;
};

function fileNameFromSrc(src: string) {
  try {
    const path = decodeURIComponent(src.split("?")[0] ?? src);
    const base = path.split("/").pop();
    return base && base.length > 0 ? base : "retreat-photo.webp";
  } catch {
    return "retreat-photo.webp";
  }
}

export function PastRetreatPhotoGallery({ photos, coverSrc }: Props) {
  const labelId = useId();
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);

  const goPrev = useCallback(() => {
    setIndex((i) =>
      i === null || photos.length === 0
        ? i
        : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const goNext = useCallback(() => {
    setIndex((i) =>
      i === null || photos.length === 0 ? i : (i + 1) % photos.length,
    );
  }, [photos.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, goPrev, goNext]);

  if (photos.length === 0) return null;

  const thumbs = coverSrc
    ? photos.filter((p) => p.src !== coverSrc)
    : photos;

  const active = index !== null ? photos[index] : null;

  function onThumbKeyDown(e: ReactKeyboardEvent, photoIndex: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open(photoIndex);
    }
  }

  return (
    <>
      {thumbs.length > 0 ? (
        <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#666766]">
            Photos
          </h2>
          <p className="mt-2 text-sm text-[#666766]">
            Tap a photo to view it larger — you can save any image from there.
          </p>
          <ul className="mt-6 grid list-none grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
            {thumbs.map((photo) => {
              const photoIndex = photos.findIndex((p) => p.src === photo.src);
              return (
                <li key={photo.src}>
                  <button
                    type="button"
                    onClick={() => open(photoIndex)}
                    onKeyDown={(e) => onThumbKeyDown(e, photoIndex)}
                    className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#ede8e2] text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:aspect-[4/5] sm:rounded-2xl"
                    aria-label={`View larger: ${photo.alt}`}
                  >
                    {/* Native img matches lightbox rendering (avoids Next optimizer orientation quirks). */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <AnimatePresence>
        {active && index !== null ? (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            className="fixed inset-0 z-[120] flex flex-col bg-black/92"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={close}
          >
            <div
              className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p
                id={labelId}
                className="min-w-0 truncate text-sm font-medium text-white/85"
              >
                {index + 1} / {photos.length}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={active.src}
                  download={fileNameFromSrc(active.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Save photo
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/25 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Close photo viewer"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-6 sm:px-12 sm:pb-10">
              {photos.length > 1 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-2 z-10 hidden rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inline-flex"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
              ) : null}

              <motion.div
                key={active.src}
                className="relative h-full max-h-[min(82vh,900px)] w-full max-w-6xl"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Native img so browsers can long-press / right-click save easily */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.src}
                  alt={active.alt}
                  className="mx-auto h-full max-h-[min(82vh,900px)] w-auto max-w-full object-contain select-none"
                  draggable={false}
                />
              </motion.div>

              {photos.length > 1 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-2 z-10 hidden rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inline-flex"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              ) : null}
            </div>

            {photos.length > 1 ? (
              <div
                className="flex shrink-0 justify-center gap-3 px-4 pb-5 sm:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25"
                  aria-label="Next photo"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
