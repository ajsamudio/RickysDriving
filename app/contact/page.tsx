import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ricky's Driving School. Email, call, or send a message — Ricky responds personally within 24 hours.",
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
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call or text",
    value: "(714) 555-0123",
    href: "tel:+17145550123",
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
      {/* ── Hero ── */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Contact
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] mb-6 text-balance">
              Let&apos;s <span className="text-gold">talk</span>.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              Questions about packages? Picking the right lesson? Ready to
              book? Send a message — Ricky reads them all personally.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact grid ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Left: contact info cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-black text-navy mb-3">
                  Get in touch
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Text is the fastest way to reach Ricky during lesson hours.
                  Email and the form below are checked daily.
                </p>
              </div>

              {contactCards.map((c) => {
                const inner = (
                  <>
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-navy text-gold flex items-center justify-center">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        {c.label}
                      </p>
                      <p className="text-navy font-bold">{c.value}</p>
                    </div>
                  </>
                );

                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-gold/40 hover:shadow-md transition-all"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={c.label}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-off-white"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Service area ── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-navy mb-3">
              Serving all of Orange County
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-xl mx-auto">
              Pickup & drop-off included anywhere in OC. If you&apos;re here,
              Ricky comes to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
            {ocCities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-navy font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {city}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 bg-navy text-white border border-navy px-4 py-2 rounded-full text-sm font-medium">
              + everywhere else in OC
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
