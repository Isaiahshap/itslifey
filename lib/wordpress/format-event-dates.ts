import type { CalendarEventSummary } from "@/lib/wordpress/events";

function parseUtcInput(s: string): Date | null {
  if (!s) return null;
  const normalized = s.includes("T") ? s : s.replace(" ", "T");
  const d = new Date(
    normalized.endsWith("Z") ? normalized : `${normalized}Z`,
  );
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Human-readable range in the event’s timezone (from UTC fields).
 */
export function formatEventWhen(ev: CalendarEventSummary): string {
  const start = parseUtcInput(ev.utcStart);
  const end = parseUtcInput(ev.utcEnd);
  const tz = ev.timezone || "America/New_York";
  if (!start) return "";

  if (ev.allDay) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(start);
  }

  const sameDay =
    start &&
    end &&
    start.toDateString() === end.toDateString();

  const dateFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
  });

  const dateStr = dateFmt.format(start);
  if (!end) return `${dateStr} · ${timeFmt.format(start)}`;

  if (sameDay) {
    return `${dateStr} · ${timeFmt.format(start)} – ${timeFmt.format(end)}`;
  }

  return `${dateFmt.format(start)} · ${timeFmt.format(start)} → ${dateFmt.format(end)} · ${timeFmt.format(end)}`;
}
