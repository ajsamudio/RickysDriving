"use client";

import { useState } from "react";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gold text-navy text-sm font-semibold py-2.5 px-4 flex items-center justify-center gap-3 relative">
      <span className="text-base">🎓</span>
      <span>
        Now accepting new students for June — limited spots available.{" "}
        <a
          href="/booking"
          className="underline underline-offset-2 hover:text-navy/70 transition-colors"
        >
          Book today →
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/60 hover:text-navy transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
