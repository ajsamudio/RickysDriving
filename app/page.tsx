import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeading from "@/components/SectionHeading";
import CtaSign, { ArrowIcon } from "@/components/CtaSign";

export const metadata: Metadata = {
  title: "Ricky's Driving | Drive with Confidence. Learn with Ricky.",
  description:
    "Orange County's most trusted driving instructor. Personalized, one-on-one lessons that turn anxious beginners into road-ready, confident drivers.",
  alternates: { canonical: "/" },
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

const steps = [
  {
    title: "Pick your package",
    body: "From a first-time parking-lot session to full DMV test prep — choose what fits where you are.",
  },
  {
    title: "Choose a time",
    body: "See Ricky's real availability and lock in a slot that works around school, work, and life.",
  },
  {
    title: "Hit the road",
    body: "Ricky picks you up anywhere in OC in a dual-controlled car. Just bring your permit.",
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
  { stat: "500+", label: "Students taught" },
  { stat: "#1", label: "In Orange County" },
  { stat: "5.0★", label: "Average rating" },
  { stat: "98%", label: "First-try pass rate" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="paper-grid relative overflow-hidden">
        {/* Soft sun glow */}
        <div className="absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full bg-lane/30 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-7 animate-rd-fade-up">
                Licensed instructor · Orange County, CA
              </span>

              <h1 className="text-[3.4rem] leading-[0.95] sm:text-7xl lg:text-[5.1rem] font-black text-ink text-balance animate-rd-fade-up delay-100">
                Drive with <span className="marker marker-animate">confidence.</span>
                <br />
                Learn with Ricky.
              </h1>

              <p className="mt-7 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl animate-rd-fade-up delay-200">
                Orange County&apos;s most trusted driving instructor. Personalized,
                one-on-one lessons that turn anxious beginners into road-ready,
                confident drivers.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-rd-fade-up delay-300">
                <Link href="/booking" className="btn-primary text-base px-8 py-4">
                  Book a lesson
                  <ArrowIcon />
                </Link>
                <Link href="/services" className="btn-outline text-base px-8 py-4">
                  View packages
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4 animate-rd-fade-up delay-400">
                <div className="flex -space-x-2.5" aria-hidden="true">
                  {["S", "L", "M", "J"].map((initial, i) => (
                    <span
                      key={initial}
                      className={`w-10 h-10 rounded-full ring-[3px] ring-paper flex items-center justify-center font-display font-black text-sm ${
                        ["bg-sign text-white", "bg-lane text-ink", "bg-ink text-white", "bg-white text-ink"][i]
                      }`}
                    >
                      {initial}
                    </span>
                  ))}
                </div>
                <div className="text-sm leading-snug">
                  <div className="flex items-center gap-1 text-lane-strong" aria-label="5 out of 5 stars">
                    {"★★★★★"}
                  </div>
                  <p className="text-ink-soft">
                    <span className="font-bold text-ink">500+ students</span> taught across OC
                  </p>
                </div>
              </div>
            </div>

            {/* Portrait with road-sign badges */}
            <div className="lg:col-span-5 relative max-w-md mx-auto w-full animate-rd-fade-up delay-200">
              <div className="relative aspect-[4/5] rounded-[36px] overflow-hidden bg-ink shadow-[0_40px_80px_-30px_rgba(21,23,28,0.6)]">
                <Image
                  src="/images/ricky.webp"
                  alt="Ricky DeVera, Orange County driving instructor"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 28rem"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/75 to-transparent" />
                <p className="absolute left-6 bottom-14 text-white">
                  <span className="block font-display font-black text-2xl">Ricky DeVera</span>
                  <span className="block text-sm text-white/75">Owner &amp; lead instructor</span>
                </p>
              </div>

              {/* Diamond warning-sign badge */}
              <div className="absolute -top-6 -right-3 sm:-right-8 w-32 h-32 animate-rd-float">
                <div className="absolute inset-3 rotate-45 rounded-2xl bg-lane shadow-[0_18px_30px_-12px_rgba(196,143,0,0.8)] ring-[3px] ring-inset ring-ink" />
                <div className="relative h-full flex flex-col items-center justify-center text-ink">
                  <span className="font-display font-black text-3xl leading-none">98%</span>
                  <span className="text-[10px] font-black uppercase tracking-wider mt-1">Pass rate</span>
                </div>
              </div>

              {/* Freeway-sign badge */}
              <div className="absolute -bottom-8 -right-3 sm:-right-8 sign-plate px-6 py-4 text-white">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">Experience</span>
                <span className="block font-display font-black text-3xl leading-none mt-1">10+ years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar: the road ── */}
      <section className="asphalt relative overflow-hidden" aria-label="Highlights">
        <div className="absolute inset-x-0 top-3 h-[2px] bg-white/50" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-3 h-[2px] bg-white/50" aria-hidden="true" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 lane-dash lane-dash-animate opacity-80" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustStats.map(({ stat, label }, i) => (
              <div
                key={label}
                className="asphalt rounded-2xl ring-1 ring-white/10 px-4 py-5 text-center"
                data-reveal="up"
                data-reveal-delay={i * 80}
              >
                <span className="block font-display text-4xl sm:text-5xl font-black text-white">{stat}</span>
                <span className="block mt-1 text-xs font-bold uppercase tracking-[0.16em] text-lane">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Ricky ── */}
      <section className="py-24 sm:py-32 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative" data-reveal="left">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(21,23,28,0.55)]">
                <Image
                  src="/images/student-wheel.webp"
                  alt="A student driver with hands on the wheel while the instructor points ahead"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 right-6 sm:right-10 bg-white rounded-2xl shadow-[0_20px_40px_-20px_rgba(21,23,28,0.5)] ring-1 ring-ink/5 p-5 max-w-[260px]">
                <p className="text-sm text-ink/80 leading-snug">
                  &ldquo;Every student learns best when they feel{" "}
                  <span className="font-bold text-ink">safe, supported, and never rushed.</span>&rdquo;
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-sign">— Ricky</p>
              </div>
            </div>

            <div data-reveal="right">
              <span className="eyebrow mb-5">Meet your instructor</span>
              <h2 className="text-5xl sm:text-6xl font-black text-ink leading-[0.98] mb-7 text-balance">
                Hi, I&apos;m Ricky.
              </h2>
              <p className="text-ink-soft text-lg leading-relaxed mb-5">
                For over a decade I&apos;ve helped Orange County drivers go from
                white-knuckle nervous to genuinely confident behind the wheel. I
                built my teaching around one idea: every student learns best when
                they feel safe, supported, and never rushed.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-9">
                Whether it&apos;s your very first time in the driver&apos;s seat or
                you&apos;re polishing up for your DMV test, I&apos;ll meet you
                exactly where you are — and get you road-ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className="btn-dark">
                  Book a lesson with Ricky
                  <ArrowIcon />
                </Link>
                <Link href="/about" className="btn-outline">
                  Read Ricky&apos;s story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 sm:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why students choose Ricky"
            title="Learning to drive should feel empowering."
            description="Not stressful. Here's what sets Ricky's approach apart."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative p-9 rounded-[28px] bg-white ring-1 ring-ink/5 shadow-[0_20px_40px_-32px_rgba(21,23,28,0.5)] hover-lift"
                data-reveal="up"
                data-reveal-delay={i * 120}
              >
                {/* Mile marker */}
                <span className="absolute top-8 right-8 w-9 h-12 rounded-md bg-sign text-white flex flex-col items-center justify-center font-display font-black leading-none shadow-sm ring-2 ring-inset ring-white/80">
                  <span className="text-[8px] tracking-widest opacity-80">MI</span>
                  <span className="text-base">{i + 1}</span>
                </span>
                <div className="w-14 h-14 rounded-2xl bg-lane flex items-center justify-center text-ink mb-7 transition-transform group-hover:-rotate-6">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-ink mb-3">{f.title}</h3>
                <p className="text-ink-soft leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 sm:py-32 bg-[#FFFDF8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1" data-reveal="left">
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(21,23,28,0.55)]">
                <Image
                  src="/images/training-car.webp"
                  alt="A white training car turning through a sunny Orange County intersection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <SectionHeading
                align="left"
                eyebrow="How it works"
                title={<>Three steps. <span className="marker">Two minutes.</span></>}
                description="Booking a lesson is the easiest part of learning to drive."
                className="mb-12"
              />

              <ol className="relative space-y-4">
                {/* Road running down the step numbers */}
                <span className="absolute left-[27px] top-6 bottom-6 w-[6px] rounded-full asphalt" aria-hidden="true">
                  <span className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[2px] bg-[repeating-linear-gradient(180deg,#FFC21A_0_10px,transparent_10px_18px)]" />
                </span>
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    className="relative flex gap-6 items-start rounded-[24px] p-5 hover:bg-paper transition-colors"
                    data-reveal="up"
                    data-reveal-delay={i * 120}
                  >
                    <span className="relative z-10 flex-shrink-0 w-[60px] h-[60px] -ml-[3px] rounded-full bg-lane ring-[6px] ring-[#FFFDF8] flex items-center justify-center font-display font-black text-2xl text-ink">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-2xl font-black text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-ink-soft leading-relaxed max-w-md">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 pl-5" data-reveal="up">
                <Link href="/booking" className="btn-primary">
                  Start booking
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Package Preview ── */}
      <section className="py-24 sm:py-32 paper-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Lesson packages"
            title="A package for every stage."
            description="Whether you're picking up a permit for the first time or preparing for your DMV test, there's a package built for you."
            className="mb-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
            {previewPackages.map((pkg, i) => (
              <div key={pkg.title} data-reveal="up" data-reveal-delay={i * 120}>
                <PackageCard
                  title={pkg.title}
                  sessions={pkg.sessions}
                  hours={pkg.hours}
                  price={pkg.price}
                  features={pkg.features}
                  featured={pkg.featured}
                  stripeLink="/services"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-14" data-reveal="up">
            <Link href="/services" className="btn-outline">
              See all packages &amp; add-ons
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative py-24 sm:py-32 bg-ink overflow-hidden">
        <Image
          src="/images/freeway-dusk.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Student stories"
            title="From nervous to unstoppable."
            description="Real stories from real Orange County drivers."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} data-reveal="up" data-reveal-delay={i * 120}>
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  location={t.location}
                  rating={t.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CtaSign
        title={<>Your license, straight ahead.</>}
        body="Spots fill up fast. Join the hundreds of Orange County drivers who trusted Ricky to get them license-ready."
      />
    </>
  );
}
