import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about driving lessons with Ricky — permits, pricing, the DMV test, scheduling, and more.",
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
      "Pricing varies by package and is shown at checkout. Call or text for current rates — Ricky keeps prices competitive with other OC instructors while offering more personalized instruction.",
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
  { title: "Getting Started", items: gettingStarted },
  { title: "Lessons & Scheduling", items: scheduling },
  { title: "Pricing & Payment", items: pricing },
  { title: "DMV Test", items: dmv },
  { title: "Cancellations & Refunds", items: cancellations },
];

export default function FAQPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 uppercase tracking-widest animate-rd-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              FAQ
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] mb-6 text-balance animate-rd-fade-up delay-100">
              Questions, <span className="rd-shimmer">answered</span>.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl animate-rd-fade-up delay-200">
              Everything new students ask — permits, packages, DMV test prep,
              cancellations, and the rest.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {categories.map((cat) => (
            <div key={cat.title} data-reveal="up">
              <div className="flex items-center gap-3 mb-7">
                <span className="w-2 h-8 bg-gold rounded-full" />
                <h2 className="text-2xl sm:text-3xl font-black text-navy">
                  {cat.title}
                </h2>
              </div>
              <FAQAccordion items={cat.items} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center" data-reveal="up">
          <h2 className="text-3xl sm:text-4xl font-black text-navy mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Ricky reads every message himself and gets back to you within a
            day — usually much faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              Contact Ricky
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-md"
            >
              Book a Lesson
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
