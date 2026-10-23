import type { Metadata } from "next";
import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaSign, { ArrowIcon } from "@/components/CtaSign";

export const metadata: Metadata = {
  title: "Lesson Packages & Pricing",
  description:
    "Driving lesson packages for every level, from first-time drivers to DMV test preparation. One-on-one instruction throughout Orange County. Call for current pricing.",
  alternates: { canonical: "/services" },
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
      <PageHero
        eyebrow="Lesson packages"
        title={<>Built for every <span className="marker marker-animate">level.</span></>}
        description="Whether you've never sat behind a wheel or you're tuning up for next week's DMV test, there's a package that fits."
        image={{
          src: "/images/parking-lot.webp",
          alt: "Aerial view of a practice parking lot with cones around a white training car",
        }}
      >
        <Link href="/booking" className="btn-primary">
          Book a lesson
          <ArrowIcon />
        </Link>
        <a href="tel:+15624248885" className="btn-outline">
          Call for pricing
        </a>
      </PageHero>

      {/* ── Packages ── */}
      <section className="py-24 sm:py-28 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch pt-4">
            {packages.map((pkg, i) => (
              <div key={pkg.title} data-reveal="up" data-reveal-delay={i * 120}>
                <PackageCard
                  title={pkg.title}
                  sessions={pkg.sessions}
                  hours={pkg.hours}
                  price={pkg.price}
                  features={pkg.features}
                  featured={pkg.featured}
                  stripeLink={`/booking?package=${pkg.slug}`}
                />
              </div>
            ))}
          </div>

          <p className="text-center text-ink-soft mt-12 max-w-2xl mx-auto">
            All packages include pickup &amp; drop-off in Orange County.
            Sessions are typically scheduled 2 hours at a time but can be split
            on request.
          </p>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="pb-24 sm:pb-28 bg-[#FFFDF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sign-plate p-8 sm:p-12 lg:p-14 text-white grid grid-cols-1 lg:grid-cols-5 gap-10 items-center" data-reveal="zoom">
            <div className="lg:col-span-2">
              <span className="eyebrow !text-lane mb-4">No hidden fees</span>
              <h2 className="text-4xl sm:text-5xl font-black leading-[1]">
                Every lesson includes
              </h2>
              <p className="text-white/75 mt-4 text-lg leading-relaxed">
                No surprises. Just driving lessons that work.
              </p>
            </div>
            <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3 border-b border-white/15">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lane flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-ink" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-white/90 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Add-ons ── */}
      <section className="py-24 sm:py-28 paper-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Add-ons & extras"
            title="Mix and match."
            description="Every driver's journey is different — book only what you need."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((a, i) => (
              <div
                key={a.title}
                className="group flex gap-6 p-8 rounded-[28px] bg-white ring-1 ring-ink/5 shadow-[0_20px_40px_-32px_rgba(21,23,28,0.5)] hover-lift"
                data-reveal="up"
                data-reveal-delay={i * 80}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-lane text-ink flex items-center justify-center transition-transform group-hover:-rotate-6">
                  {a.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-ink mb-2">{a.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3" data-reveal="up">
            <Link href="/contact" className="btn-outline">
              Don&apos;t see what you need? Ask Ricky
              <ArrowIcon />
            </Link>
            <Link href="/faq" className="btn-outline">
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

      <CtaSign
        tab="Book online"
        title="Pick your package. Pick your time."
        body="Book online in under two minutes. You'll see Ricky's real availability and lock in your slot instantly."
        primary={{ label: "Book now", href: "/booking" }}
      />
    </>
  );
}
