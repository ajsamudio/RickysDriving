interface LogoProps {
  tone?: "dark" | "light";
}

export default function Logo({ tone = "dark" }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* Mark: a road curving into the distance on a lane-yellow tile */}
      <span className="relative w-9 h-9 rounded-[10px] bg-lane flex items-center justify-center shadow-[0_3px_0_-1px_#c48f00] transition-transform group-hover:-rotate-6">
        <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
          <path d="M11 30 C12 20 20 14 21 2 L25 2 C24 15 17 21 18 30 Z" fill="#15171C" />
          <path
            d="M14.6 28 C15 22 19.8 17 22.6 6"
            stroke="#FFC21A"
            strokeWidth="1.6"
            strokeDasharray="3 2.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`block font-display font-black text-[19px] tracking-tight ${
            tone === "dark" ? "text-ink" : "text-white"
          }`}
        >
          Ricky&apos;s Driving
        </span>
        <span
          className={`block text-[10px] font-bold uppercase tracking-[0.22em] mt-1 ${
            tone === "dark" ? "text-sign" : "text-lane"
          }`}
        >
          Orange County
        </span>
      </span>
    </span>
  );
}
