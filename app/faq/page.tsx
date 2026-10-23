import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import PageHero from "@/components/PageHero";
import { ArrowIcon } from "@/components/CtaSign";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about driving lessons with Ricky — permits, pricing, the DMV test, scheduling, and more.",
  alternates: { canonical: "/faq" },
};

const gettingStarted: FAQItem[] = [
  {
    question: "Do I need a learner's permit before my first lesson?",
    answer:
      "Yes. California law requires a valid learner's permit before any behind-the-wheel instruction. If you haven't gotten yours yet, no problem — book a Permit Prep session and Ricky will help you pass the written test first.",
  },
  {
    question: "What ages do you teach?",
    answer:
      "Anyone 15½ and older with a valid permit. Ricky regularly teaches teens preparing for their first license, adults who never learned, and drivers returning to the road after years off.",
  },
  {
    question: "What should I bring to my first lesson?",
    answer:
      "Just your learner's permit and a pair of closed-toe shoes. No need to bring a car — Ricky uses a dual-controlled, fully insured training vehicle for every lesson.",
  },
  {
    question: "How do I know which package is right for me?",
    answer:
      "If you've never driven before, start with Essential — most beginners feel road-ready after those 4 hours. If you're testing soon, the Confident package adds mock DMV tests. Still unsure? Text Ricky and he'll recommend based on your experience.",
  },
];

const scheduling: FAQItem[] = [
  {
    question: "What areas do you serve?",
    answer:
      "All of Orange County — Irvine, Anaheim, Santa Ana, Costa Mesa, Huntington Beach, Tustin, Mission Viejo, and everywhere in between. Pickup and drop-off at your home, school, or work is included in every package.",
  },
  {
    question: "How far in advance do I need to book?",
    answer:
      "Booking 1–2 weeks ahead is ideal. During DMV test season (summer + winter break) slots fill up faster — book 3+ weeks out to be safe. Same-week openings happen, but they're not guaranteed.",
  },
  {
    question: "Can I reschedule a lesson?",
    answer:
      "Yes — reschedules are free up to 24 hours before your lesson. Within 24 hours, a $30 reschedule fee applies. Just text Ricky directly to move things around.",
  },
  {
    question: "What if it's raining or the weather is bad?",
    answer:
      "Light rain is fine — actually great practice. For heavy storms or unsafe conditions, Ricky will reach out to reschedule at no charge. Your safety is always the priority.",
  },
];

const pricing: FAQItem[] = [
  {
    question: "How much do lessons cost?",
    answer:
      "Call or text Ricky for current package pricing. He'll help you choose the right lesson plan based on your experience, goals, and DMV test timeline.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Online bookings are paid securely via Stripe (all major credit and debit cards, plus Apple Pay and Google Pay). For in-person payments, Ricky also accepts Zelle and Venmo.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. Full refunds are available up to 48 hours before your first scheduled lesson. After your first lesson, partial refunds are issued for any unused sessions in your package — no questions asked.",
  },
  {
    question: "Are there discounts for booking multiple lessons?",
    answer:
      "Built right in. The Essential and Confident packages already include a discount versus booking single sessions. For longer commitments (5+ sessions), reach out and Ricky can put together a custom package.",
  },
];

const dmv: FAQItem[] = [
  {
    question: "Can I use Ricky's car for my DMV behind-the-wheel test?",
    answer:
      "Yes — and most students do. The Confident package includes vehicle use for the test, or you can book it as an add-on. The car is fully insured, registered, and meets every DMV requirement.",
  },
  {
    question: "Which DMV office should I test at?",
    answer:
      "Different OC offices have very different test routes and pass rates. Ricky knows them all — Costa Mesa, Westminster, San Clemente, Laguna Hills, Fullerton — and will recommend the best one based on where you live and your strengths.",
  },
  {
    question: "How can I be sure I'm ready for the test?",
    answer:
      "The Confident package includes a full mock DMV test scored exactly the way the examiner will score yours. If Ricky doesn't think you're ready, he'll tell you honestly — and recommend extra hours if needed.",
  },
];

const cancellations: FAQItem[] = [
  {
    question: "What's your cancellation policy?",
    answer:
      "Cancel 48+ hours before your first lesson for a full refund. Cancel within 24 hours and a $30 fee applies. After the first lesson, unused sessions in a package can be refunded or credited.",
  },
  {
    question: "What if Ricky has to cancel?",
    answer:
      "Rare, but it happens (illness, family emergencies). You'll get as much notice as possible and the lesson will be rescheduled at your convenience — or refunded in full.",
  },
  {
    question: "Can I gift a lesson to someone?",
    answer:
      "Absolutely. Driving lessons make a fantastic gift for new permit holders. Reach out via the contact page and Ricky will set up a gift booking with a printable certificate.",
  },
];

const categories = [
  { id: "getting-started", title: "Getting Started", items: gettingStarted },
  { id: "scheduling", title: "Lessons & Scheduling", items: scheduling },
  { id: "pricing", title: "Pricing & Payment", items: pricing },
  { id: "dmv-test", title: "DMV Test", items: dmv },
  { id: "cancellations", title: "Cancellations & Refunds", items: cancellations },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <span className="marker marker-animate">answered.</span></>}
        description="Everything new students ask — permits, packages, DMV test prep, cancellations, and the rest."
      />

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-28 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Category index */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft mb-4">
                Jump to
              </p>
              <nav className="flex lg:flex-col flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="group inline-flex items-center gap-3 rounded-full lg:rounded-2xl bg-paper hover:bg-lane px-4 py-2.5 lg:px-5 lg:py-4 text-sm lg:text-base font-semibold text-ink transition-colors"
                  >
                    <span className="hidden lg:inline-flex w-7 h-7 rounded-full bg-white text-xs font-black items-center justify-center group-hover:bg-ink group-hover:text-lane transition-colors">
                      {i + 1}
                    </span>
                    {cat.title}
                  </a>
                ))}
              </nav>

              <div className="hidden lg:block mt-8 rounded-[24px] asphalt text-white p-7">
                <p className="font-display text-2xl font-black leading-tight">
                  Still have questions?
                </p>
                <p className="mt-2 text-white/65 text-sm leading-relaxed">
                  Ricky reads every message himself and gets back to you
                  within a day — usually much faster.
                </p>
                <a href="tel:+15624248885" className="btn-primary btn-sm mt-5 w-full">
                  Call (562) 424-8885
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-16">
            {categories.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-28" data-reveal="up">
                <h2 className="text-3xl sm:text-4xl font-black text-ink mb-4">
                  {cat.title}
                </h2>
                <FAQAccordion items={cat.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="py-24 paper-grid">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center" data-reveal="up">
          <span className="eyebrow mb-4">Talk to Ricky</span>
          <h2 className="text-4xl sm:text-5xl font-black text-ink mb-5 text-balance">
            Didn&apos;t find your answer?
          </h2>
          <p className="text-ink-soft text-lg mb-9 leading-relaxed">
            Ricky reads every message himself and gets back to you within a
            day — usually much faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-dark">
              Contact Ricky
              <ArrowIcon />
            </Link>
            <Link href="/booking" className="btn-primary">
              Book a lesson
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
