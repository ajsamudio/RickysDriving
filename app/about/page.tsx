import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Ricky",
  description:
    "Meet Ricky DeVera — Orange County's most patient driving instructor. Learn about the philosophy behind 500+ confident, license-ready students.",
};

const credentials = [
  "Licensed California driving instructor",
  "10+ years teaching first-time drivers",
  "Fully insured, dual-controlled training vehicle",
  "DMV-route certified across all OC test centers",
  "Background checked & TSA-compliant",
  "Bilingual: English & Spanish lessons available",
];

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Patience First",
    body:
      "Nervous? Anxious? Never driven? That's exactly who Ricky teaches best. Every lesson moves at your pace — no shouting, no judgment, no rushing.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Safety Obsessed",
    body:
      "Dual-controlled brakes, full insurance, and a perfect safety record. The car is set up so Ricky can intervene instantly — you'll never be in a situation you can't handle.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Confidence Built In",
    body:
      "The goal isn't to pass a test — it's to make you a calm, decisive driver for life. Ricky teaches the why behind every maneuver so you actually understand what you're doing.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Real Results",
    body:
      "98% first-try DMV pass rate. Ricky knows every OC test route by heart and teaches you exactly what examiners watch for — so test day feels like just another lesson.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=80"
            alt="Driving instructor"
            fill
            className="object-cover opacity-20"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 uppercase tracking-widest animate-rd-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              About Ricky
            </span>

            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] mb-6 text-balance animate-rd-fade-up delay-100">
              The instructor Orange County <span className="rd-shimmer">trusts</span>.
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-lg animate-rd-fade-up delay-200">
              500+ students. 98% first-try pass rate. A simple philosophy: meet
              every driver where they are, and build them up from there.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <div className="relative" data-reveal="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy shadow-xl">
                <Image
                  src="/images/ricky.webp"
                  alt="Ricky DeVera, driving instructor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl hidden sm:block">
                <p className="text-navy text-3xl font-black">10+</p>
                <p className="text-navy text-xs font-bold uppercase tracking-widest">
                  Years Teaching
                </p>
              </div>
            </div>

            {/* Story */}
            <div data-reveal="right">
              <h2 className="text-4xl sm:text-5xl font-black text-navy mb-6 text-balance">
                Hi, I&apos;m Ricky.
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I&apos;ve spent the last decade teaching Orange County
                  residents — teens, adults, and everyone in between — how to
                  drive. What started as helping a few family friends turned
                  into 500+ students and a school that&apos;s now known across
                  OC for one thing: patience.
                </p>
                <p>
                  Every driver I meet is different. Some have never touched a
                  steering wheel. Others have been white-knuckling the wheel
                  for years. A lot of my students come to me after a bad
                  experience with another instructor or a parent who
                  couldn&apos;t stay calm in the passenger seat.
                </p>
                <p>
                  My job is simple: make you feel safe enough to learn. The
                  rest follows naturally. By your last lesson, you&apos;re not
                  just driving — you&apos;re a driver.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-7 pt-6 border-t border-gray-100">
                <p className="text-navy font-bold">Ricky DeVera</p>
                <p className="text-gold-dark text-sm font-medium">
                  Owner & Lead Instructor
                </p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="mt-20 sm:mt-24">
            <h3 className="text-2xl sm:text-3xl font-black text-navy mb-8 text-center" data-reveal="up">
              Credentials & Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {credentials.map((c, i) => (
                <div
                  key={c}
                  className="flex items-start gap-3 bg-off-white rounded-xl p-4 border border-gray-100"
                  data-reveal="up"
                  data-reveal-delay={i * 60}
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
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 sm:py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal="up">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4">
              What I Stand For
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Four principles that guide every lesson, every student, every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-gold/40 hover:shadow-lg hover-lift"
                data-reveal="up"
                data-reveal-delay={i * 100}
              >
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-navy transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center" data-reveal="up">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 text-balance">
            Ready to learn with Ricky?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Lessons book up fast — especially during summer and DMV test
            season. Lock in your spot today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-black px-10 py-4 rounded-xl text-base transition-all shadow-xl hover:-translate-y-0.5"
            >
              Book a Lesson
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
