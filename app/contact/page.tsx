import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ricky's Driving School. Email, call, or send a message — Ricky responds personally within 24 hours.",
  alternates: { canonical: "/contact" },
};

const contactCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "info@rickysdriving.com",
    href: "mailto:info@rickysdriving.com",
    note: null,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call or text",
    value: "(562) 424-8885",
    href: "tel:+15624248885",
    note: "For more details, please call me",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Service area",
    value: "All of Orange County, CA",
    href: null,
    note: null,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Hours",
    value: "Mon–Sat, 8am–8pm",
    href: null,
    note: null,
  },
];

const ocCities = [
  "Irvine",
  "Anaheim",
  "Santa Ana",
  "Costa Mesa",
  "Huntington Beach",
  "Tustin",
  "Newport Beach",
  "Mission Viejo",
  "Fullerton",
  "Garden Grove",
  "Orange",
  "Laguna Niguel",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s <span className="marker marker-animate">talk.</span></>}
        description="Questions about packages? Picking the right lesson? Ready to book? Send a message — Ricky reads them all personally."
        image={{
          src: "/images/keys-handoff.webp",
          alt: "Car keys being handed over in warm afternoon light",
        }}
      />

      {/* ── Contact grid ── */}
      <section className="py-24 sm:py-28 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-14">
            {/* Left: contact info cards */}
            <div className="lg:col-span-2">
              <div className="mb-8" data-reveal="left">
                <span className="eyebrow mb-4">Reach out</span>
                <h2 className="text-4xl sm:text-5xl font-black text-ink mb-4 leading-[1]">
                  Get in touch
                </h2>
                <p className="text-ink-soft text-lg leading-relaxed">
                  Text is the fastest way to reach Ricky during lesson hours.
                  Email and the form are checked daily.
                </p>
              </div>

              <div className="space-y-3">
                {contactCards.map((c, i) => {
                  const inner = (
                    <>
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                          c.href ? "bg-lane text-ink" : "bg-paper text-ink"
                        }`}
                      >
                        {c.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft mb-0.5">
                          {c.label}
                        </p>
                        <p className="text-ink font-display font-bold text-lg truncate">{c.value}</p>
                        {c.note && (
                          <p className="text-sm text-ink-soft mt-0.5">{c.note}</p>
                        )}
                      </div>
                    </>
                  );

                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      className="flex items-center gap-4 p-5 rounded-[22px] bg-white ring-1 ring-ink/10 hover:ring-lane hover:shadow-[0_20px_40px_-28px_rgba(21,23,28,0.5)] hover-lift"
                      data-reveal="left"
                      data-reveal-delay={80 + i * 80}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      key={c.label}
                      className="flex items-center gap-4 p-5 rounded-[22px] bg-paper/60 ring-1 ring-ink/5"
                      data-reveal="left"
                      data-reveal-delay={80 + i * 80}
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3" data-reveal="right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Service area ── */}
      <section className="py-24 paper-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Service area"
            title="Serving all of Orange County."
            description="Pickup & drop-off included anywhere in OC. If you're here, Ricky comes to you."
            className="mb-12"
          />

          <div className="flex flex-wrap gap-2.5 justify-center max-w-3xl mx-auto">
            {ocCities.map((city, i) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 bg-sign text-white px-4 py-2 rounded-lg text-sm font-display font-bold ring-2 ring-inset ring-white/70 shadow-sm"
                data-reveal="up"
                data-reveal-delay={i * 30}
              >
                {city}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 bg-lane text-ink px-4 py-2 rounded-lg text-sm font-display font-bold shadow-sm">
              + everywhere else in OC
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
