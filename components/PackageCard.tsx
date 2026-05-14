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
  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-shadow hover:shadow-xl ${
        featured
          ? "bg-navy text-white border-gold shadow-lg"
          : "bg-white text-navy border-gray-200 shadow-sm"
      }`}
    >
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-gold text-navy text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        <div className="mb-5">
          <h3
            className={`text-xl font-bold mb-1 ${
              featured ? "text-white" : "text-navy"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm ${featured ? "text-gold" : "text-gold-dark"}`}
          >
            {sessions} &nbsp;·&nbsp; {hours}
          </p>
        </div>

        <div className="mb-6">
          <span
            className={`text-4xl font-black ${
              featured ? "text-gold" : "text-navy"
            }`}
          >
            {price}
          </span>
        </div>

        <ul className="space-y-2.5 flex-1 mb-7">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <svg
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  featured ? "text-gold" : "text-gold"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={featured ? "text-gray-200" : "text-gray-600"}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={stripeLink}
          className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all ${
            featured
              ? "bg-gold text-navy hover:bg-gold-light"
              : "bg-navy text-white hover:bg-navy-light"
          }`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
