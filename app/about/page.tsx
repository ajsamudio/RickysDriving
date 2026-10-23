import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaSign from "@/components/CtaSign";

export const metadata: Metadata = {
  title: "About Ricky",
  description:
    "Meet Ricky DeVera — Orange County's most patient driving instructor. Learn about the philosophy behind 500+ confident, license-ready students.",
  alternates: { canonical: "/about" },
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
      <PageHero
        eyebrow="About Ricky"
        title={<>The instructor Orange County <span className="marker marker-animate">trusts.</span></>}
        description="500+ students. 98% first-try pass rate. A simple philosophy: meet every driver where they are, and build them up from there."
      />

      {/* ── Bio ── */}
      <section className="py-24 sm:py-32 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Portrait */}
            <div className="lg:col-span-5 relative max-w-md mx-auto w-full" data-reveal="left">
              <div className="relative aspect-[4/5] rounded-[36px] overflow-hidden bg-ink shadow-[0_40px_80px_-30px_rgba(21,23,28,0.6)] -rotate-[1.5deg]">
                <Image
                  src="/images/ricky.webp"
                  alt="Ricky DeVera, driving instructor"
                  fill
                  sizes="(max-width: 1024px) 90vw, 28rem"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-3 sm:-right-8 sign-plate px-7 py-5 text-white">
                <span className="block font-display font-black text-4xl leading-none">10+</span>
                <span className="block mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Years teaching
                </span>
              </div>
            </div>

            {/* Story */}
            <div className="lg:col-span-7" data-reveal="right">
              <span className="eyebrow mb-5">My story</span>
              <h2 className="text-5xl sm:text-6xl font-black text-ink leading-[0.98] mb-8 text-balance">
                Hi, I&apos;m Ricky.
              </h2>
              <div className="space-y-5 text-ink-soft text-lg leading-relaxed">
                <p>
                  I&apos;ve spent the last decade teaching Orange County
                  residents — teens, adults, and everyone in between — how to
                  drive. What started as helping a few family friends turned
                  into 500+ students and a school that&apos;s now known across
                  OC for one thing: <span className="font-bold text-ink">patience.</span>
                </p>
                <p>
                  Every driver I meet is different. Some have never touched a
                  steering wheel. Others have been white-knuckling the wheel
                  for years. A lot of my students come to me after a bad
                  experience with another instructor or a parent who
                  couldn&apos;t stay calm in the passenger seat.
                </p>
                <p className="font-display text-2xl font-bold text-ink leading-snug border-l-4 border-lane pl-5">
                  My job is simple: make you feel safe enough to learn. The
                  rest follows naturally.
                </p>
                <p>
                  By your last lesson, you&apos;re not just driving —
                  you&apos;re a driver.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-9 pt-7 border-t border-ink/10 flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-lane flex items-center justify-center font-display font-black text-xl text-ink">
                  R
                </span>
                <div>
                  <p className="text-ink font-display font-black text-lg">Ricky DeVera</p>
                  <p className="text-sign text-sm font-semibold">Owner &amp; Lead Instructor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="pb-24 sm:pb-32 bg-[#FFFDF8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sign-plate p-8 sm:p-12 text-white" data-reveal="zoom">
            <h3 className="text-3xl sm:text-4xl font-black mb-8 text-center">
              Credentials &amp; experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {credentials.map((c) => (
                <div key={c} className="flex items-start gap-3 py-2 border-b border-white/15">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lane flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-ink" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-white/90 font-medium leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 sm:py-32 paper-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What I stand for"
            title="Four rules of the road."
            description="The principles that guide every lesson, every student, every time."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group flex gap-6 p-8 sm:p-9 rounded-[28px] bg-white ring-1 ring-ink/5 shadow-[0_20px_40px_-32px_rgba(21,23,28,0.5)] hover-lift"
                data-reveal="up"
                data-reveal-delay={i * 100}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-lane flex items-center justify-center text-ink transition-transform group-hover:-rotate-6">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-ink mb-2">{v.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSign
        title="Ready to learn with Ricky?"
        body="Lessons book up fast — especially during summer and DMV test season. Lock in your spot today."
        secondary={{ label: "Browse packages", href: "/services" }}
      />
    </>
  );
}
