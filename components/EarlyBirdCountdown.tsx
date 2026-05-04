"use client";

import { useEffect, useState } from "react";

// May 10, 2026 at 11:59 PM Eastern (UTC-4 in May = EDT)
const DEADLINE = new Date("2026-05-11T03:59:00Z").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft | null {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function EarlyBirdCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = getTimeLeft();
    setTimeLeft(initial);
    if (!initial) return;

    const id = setInterval(() => {
      const next = getTimeLeft();
      setTimeLeft(next);
      if (!next) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // Nothing during SSR or after deadline
  if (!mounted || !timeLeft) return null;

  const units = [
    { label: timeLeft.days === 1 ? "day" : "days", value: timeLeft.days },
    { label: "hr", value: timeLeft.hours },
    { label: "min", value: timeLeft.minutes },
    { label: "sec", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#e76fab]/20 bg-[#fdf6fb] px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b8457e]">
        ITSLIFEY50 ends in
      </span>
      <div className="flex items-center gap-1.5">
        {units.map(({ label, value }, i) => (
          <span key={label} className="flex items-baseline gap-0.5">
            {i > 0 && (
              <span className="mx-0.5 text-[13px] font-semibold text-[#e76fab]/50">
                :
              </span>
            )}
            <span className="min-w-[1.6rem] text-center font-mono text-[15px] font-bold tabular-nums text-[#b8457e]">
              {i === 0 ? value : pad(value)}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-[#c2528c]/60">
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
