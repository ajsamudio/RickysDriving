import Link from "next/link";

interface PackageCardProps {
  title: string;
  hours: string;
  sessions: string;
  price: string;
  features: string[];
  stripeLink?: string;
  featured?: boolean;
}

export default function PackageCard({
  title,
  hours,
  sessions,
  price,
  features,
  stripeLink = "/booking",
  featured = false,
}: PackageCardProps) {
  const [hourCount, ...hourLabel] = hours.split(" ");

  return (
    <div
      className={`relative flex flex-col h-full rounded-[28px] transition-shadow ${
        featured
          ? "asphalt text-white shadow-[0_30px_60px_-25px_rgba(21,23,28,0.7)] md:-mt-4 md:mb-4"
          : "bg-white text-ink ring-1 ring-ink/10 shadow-[0_20px_40px_-30px_rgba(21,23,28,0.4)] hover:shadow-[0_30px_50px_-30px_rgba(21,23,28,0.5)]"
      }`}
    >
      {featured && (
        <div className="absolute -top-3.5 right-7">
          <span className="inline-flex items-center gap-1.5 bg-lane text-ink text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-[0_3px_0_-1px_#c48f00]">
            ★ Most popular
          </span>
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className={`text-2xl font-black ${featured ? "text-white" : "text-ink"}`}>
            {title}
          </h3>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              featured ? "bg-white/10 text-white/80" : "bg-paper text-ink/70"
            }`}
          >
            {sessions}
          </span>
        </div>

        <div className="flex items-end gap-3 mt-6">
          <span
            className={`font-display font-black text-[88px] leading-[0.8] tracking-tighter ${
              featured ? "text-lane" : "text-ink"
            }`}
          >
            {hourCount}
          </span>
          <span
            className={`pb-1 text-sm font-semibold leading-tight ${
              featured ? "text-white/60" : "text-ink-soft"
            }`}
          >
            {hourLabel.join(" ").toLowerCase()}
            <br />
            behind the wheel
          </span>
        </div>

        <div className={`my-7 h-[3px] ${featured ? "lane-dash" : "lane-dash opacity-70"}`} aria-hidden="true" />

        <ul className="space-y-3 flex-1 mb-8">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[15px]">
              <span
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center ${
                  featured ? "bg-lane text-ink" : "bg-sign text-white"
                }`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className={featured ? "text-white/85" : "text-ink/80"}>{f}</span>
            </li>
          ))}
        </ul>

        <p className={`text-xs font-bold uppercase tracking-[0.16em] mb-3 ${featured ? "text-white/50" : "text-ink-soft"}`}>
          {price}
        </p>
        <Link href={stripeLink} className={`w-full ${featured ? "btn-primary" : "btn-dark"}`}>
          Get started
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
