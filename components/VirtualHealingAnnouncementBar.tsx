"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCallback, useState } from "react";

export function VirtualHealingAnnouncementBar() {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div
      className={`overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "max-h-[200px]" : "max-h-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="relative border-b border-white/25 bg-gradient-to-r from-[#c94d8a] via-[#e76fab] to-[#d85e9a]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-11 py-2.5 sm:px-14 sm:py-3 lg:px-16">
          <p className="text-center text-[11px] font-semibold leading-snug tracking-wide text-white sm:text-xs sm:leading-normal sm:tracking-normal">
            <Link
              href="/events/widow-wellness-connection-experience"
              className="underline decoration-white/50 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
            >
              Join Widow Wellness &amp; Connection Experience
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
