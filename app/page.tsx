import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Ricky's Driving | Drive with Confidence. Learn with Ricky.",
  description:
    "Orange County's most trusted driving instructor. Personalized, one-on-one lessons that turn anxious beginners into road-ready, confident drivers.",
};

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Trust & Safety First",
    body:
      "Every lesson is built around your comfort. Ricky's patient, encouragement-first approach has helped hundreds of nervous first-timers become genuinely confident on the road.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Flexible Scheduling",
    body:
      "Morning, evening, or weekend — lessons fit around your life. Serving all of Orange County with convenient pick-up and drop-off options so getting started is effortless.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Real Results",
    body:
      "Our students pass their DMV tests. Ricky knows exactly what examiners look for and builds that knowledge into every lesson — so when test day comes, you're ready.",
  },
];

const previewPackages = [
  {
    title: "Starter",
    sessions: "1 Session",
    hours: "2 Hours",
    price: "Call for Pricing",
    features: [
      "One-on-one instruction",
      "Basic vehicle controls",
      "Parking lot fundamentals",
      "Personalized feedback",
    ],
  },
  {
    title: "Essential",
    sessions: "2 Sessions",
    hours: "4 Hours",
    price: "Call for Pricing",
    features: [
      "Everything in Starter",
      "Residential street driving",
      "Turns, signals & merging",
      "Progress evaluation",
    ],
    featured: true,
  },
  {
    title: "Confident",
    sessions: "3 Sessions",
    hours: "6 Hours",
    price: "Call for Pricing",
    features: [
      "Everything in Essential",
      "Highway & freeway driving",
      "DMV test-route practice",
      "Mock test evaluation",
    ],
  },
];

const testimonials = [
  {
    quote:
      "I was terrified to get behind the wheel — I'd put it off for years. Ricky made me feel completely at ease from the very first minute. After a few sessions I was driving on the freeway. Passed my test first try.",
    name: "Sarah M.",
    location: "Irvine, CA",
    rating: 5,
  },
  {
    quote:
      "My son has anxiety and we were worried about finding the right instructor. Ricky was incredibly patient and knew exactly how to build his confidence without pushing too hard. After three lessons he was a completely different driver.",
    name: "Linda K.",
    location: "Anaheim, CA",
    rating: 5,
  },
  {
    quote:
      "Ricky doesn't just teach you to drive — he teaches you to think like a driver. He walked me through the exact test route. Passed on my first attempt. Best money I've ever spent.",
    name: "Marcus T.",
    location: "Santa Ana, CA",
    rating: 5,
  },
];

const trustStats = [
  { stat: "500+", label: "Students Taught" },
  { stat: "#1", label: "In Orange County" },
  { stat: "5-Star", label: "Average Rating" },
  { stat: "98%", label: "First-Try Pass Rate" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
            alt="Open California road"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Orange County, CA
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 text-balance">
              Drive with{" "}
              <span className="text-gold">Confidence.</span>
              <br />
              Learn with{" "}
              <span className="relative inline-block">
                Ricky.
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gold rounded-full" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-lg">
              Orange County&apos;s most trusted driving instructor. Personalized,
              one-on-one lessons that turn anxious beginners into road-ready,
              confident drivers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5"
              >
                Book a Lesson
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl text-base transition-all backdrop-blur-sm"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-off-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustStats.map(({ stat, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-3xl sm:text-4xl font-black text-navy">{stat}</span>
                <span className="text-sm text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4">
              Why Students Choose Ricky
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Learning to drive should feel empowering — not stressful. Here&apos;s
              what sets Ricky&apos;s approach apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-gold/40 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-navy transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Package Preview ── */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4">
              Lesson Packages
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Whether you&apos;re picking up a permit for the first time or preparing
              for your DMV test, there&apos;s a package built for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
            {previewPackages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                title={pkg.title}
                sessions={pkg.sessions}
                hours={pkg.hours}
                price={pkg.price}
                features={pkg.features}
                featured={pkg.featured}
                stripeLink="/services"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-navy font-semibold border-2 border-navy hover:bg-navy hover:text-white px-8 py-3.5 rounded-xl transition-all"
            >
              See All Packages &amp; Pricing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4">
              What Students Are Saying
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Real stories from real Orange County drivers who went from nervous
              to unstoppable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.name}
                quote={t.quote}
                name={t.name}
                location={t.location}
                rating={t.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA Banner ── */}
      <section className="relative overflow-hidden bg-navy py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
            alt="Open road at sunset"
            fill
            className="object-cover opacity-10"
            unoptimized
          />
        </div>
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 text-balance">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Spots fill up fast. Join the hundreds of Orange County drivers who
            trusted Ricky to get them license-ready. Your first lesson is just
            one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-black px-10 py-4 rounded-xl text-base transition-all shadow-xl hover:-translate-y-0.5"
            >
              Book Your Lesson Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:border-white font-bold px-10 py-4 rounded-xl text-base transition-all"
            >
              Browse Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
