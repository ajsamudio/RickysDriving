"use client";

import { useState } from "react";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="asphalt text-white text-[13px] font-medium py-2.5 pl-4 pr-10 flex items-center justify-center gap-3 relative">
      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-lane text-ink px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
        Enrolling
      </span>
      <span className="text-white/80">
        Now accepting new students for summer and fall — limited spots available.{" "}
        <a
          href="/booking"
          className="text-lane font-semibold underline-offset-4 hover:underline"
        >
          Book today →
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
