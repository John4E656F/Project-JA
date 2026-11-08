"use client";

import { downloadCalendar } from "../lib/calendar";

export function CalendarDownloadButton() {
  return (
    <button
      className="inline-flex min-h-10 items-center justify-center gap-3 px-5 py-3 text-[0.71rem] font-bold tracking-[0.14em] text-burgundy uppercase underline underline-offset-[5px] transition-transform hover:-translate-y-0.5"
      onClick={downloadCalendar}
    >
      Download for Apple / Outlook <span aria-hidden="true">↓</span>
    </button>
  );
}
