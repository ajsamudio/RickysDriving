import type { Metadata } from "next";
import Link from "next/link";
import PackageCard from "@/components/PackageCard";

export const metadata: Metadata = {
  title: "Lesson Packages & Pricing",
  description:
    "Driving lesson packages built for every level — from absolute beginners to DMV-test-ready drivers. Transparent pricing, one-on-one instruction, all of Orange County.",
};

const packages = [
  {
    slug: "starter",
    title: "Starter",
    sessions: "1 Session",
    hours: "2 Hours",
    price: "Call for Pricing",
    features: [
      "One-on-one instruction with Ricky",
      "Basic vehicle controls walkthrough",
      "Parking-lot fundamentals",
      "Mirror & seat positioning",
      "First-time-driver assessment",
      "Pickup & drop-off in OC included",
    ],
  },
  {
    slug: "essential",
    title: "Essential",
    sessions: "2 Sessions",
    hours: "4 Hours",
    price: "Call for Pricing",
    featured: true,
    features: [
      "Everything in Starter",
      "Residential street driving",
      "Lane changes, signals & merging",
      "Right-of-way and intersections",
      "Mid-package progress evaluation",
      "Custom homework between lessons",
    ],
  },
  {
    slug: "confident",
    title: "Confident",
    sessions: "3 Sessions",
    hours: "6 Hours",
    price: "Call for Pricing",
    features: [
      "Everything in Essential",
      "Highway & freeway driving",
      "Real DMV test-route practice",
      "Full mock DMV test with scoring",
      "Test-day strategy session",
      "Use of training vehicle for the DMV test",
    ],
  },
];

const addOns = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "DMV Test-Day Rental",
    body: "Use Ricky's dual-controlled, fully insured vehicle for your behind-the-wheel test. Includes a 30-minute warm-up drive.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Individual Hours",
    body: "Already comfortable on the road but need targeted practice? Book single 1-hour or 2-hour sessions à la carte.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Permit Prep",
    body: "Stuck on the written test? One focused session covers OC-relevant signs, right-of-way scenarios, and study strategies.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Adult Refresher",
    body: "Haven't driven in years? Anxious behind the wheel? Custom-paced refresher sessions for adult drivers getting back on the road.",
  },
];

const included = [
  "One-on-one instruction with Ricky — never a stand-in",
  "Fully insured, dual-controlled training vehicle",
  "Pickup & drop-off anywhere in Orange County",
  "Honest post-lesson feedback after every session",
  "Flexible rescheduling up to 24 hours in advance",
  "Texts & email check-ins between lessons",
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Lesson Packages
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] mb-6 text-balance">
              Built for every <span className="text-gold">level</span>.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              Whether you&apos;ve never sat behind a wheel or you&apos;re
              tuning up for next week&apos;s DMV test, there&apos;s a package
              that fits.
            </p>
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                title={pkg.title}
                sessions={pkg.sessions}
                hours={pkg.hours}
                price={pkg.price}
                features={pkg.features}
                featured={pkg.featured}
                stripeLink={`/booking?package=${pkg.slug}`}
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-10 max-w-2xl mx-auto">
            All packages include pickup &amp; drop-off in Orange County.
            Sessions are typically scheduled 2 hours at a time but can be split
            on request.
          </p>
        </div>
      </section>

      {/* ── Add-ons ── */}
      <section className="py-20 sm:py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4">
              Add-ons & Extras
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Mix and match. Every driver&apos;s journey is different — book
              only what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((a) => (
              <div
                key={a.title}
                className="group flex gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:border-gold/40 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-colors">
                  {a.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy mb-1.5">
                    {a.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold-dark transition-colors text-sm"
            >
              Don&apos;t see what you need? Ask Ricky.
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4">
              Every Lesson Includes
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              No hidden fees. No surprises. Just driving lessons that work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-5 rounded-xl border border-gray-100 bg-off-white"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-navy"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-navy text-sm font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ teaser ── */}
      <section className="py-16 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-navy mb-3">
            Have questions?
          </h3>
          <p className="text-gray-500 mb-6">
            Pricing, scheduling, DMV test — chances are it&apos;s covered.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-navy font-semibold border-2 border-navy hover:bg-navy hover:text-white px-7 py-3 rounded-xl transition-all text-sm"
          >
            Read the FAQ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 text-balance">
            Pick your package. Pick your time.
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Book online in under two minutes. You&apos;ll see Ricky&apos;s real
            availability and lock in your slot instantly.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-black px-10 py-4 rounded-xl text-base transition-all shadow-xl hover:-translate-y-0.5"
          >
            Book Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
