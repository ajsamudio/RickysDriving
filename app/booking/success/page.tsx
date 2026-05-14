import type { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your driving lesson is booked.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { session_id?: string };
}

interface BookingSummary {
  serviceName: string;
  scheduledAt: string;
  durationMinutes: number;
  priceCents: number;
  customerEmail: string;
}

async function loadSummary(sessionId: string): Promise<BookingSummary | null> {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const bookingId = session.metadata?.bookingId;
    if (!bookingId) return null;

    const supabase = createSupabaseAdminClient();
    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .maybeSingle();

    if (!booking || !booking.service_id) return null;

    const { data: service } = await supabase
      .from("services")
      .select("*")
      .eq("id", booking.service_id)
      .maybeSingle();

    if (!service) return null;

    return {
      serviceName: service.name,
      scheduledAt: booking.scheduled_at,
      durationMinutes: service.duration_minutes,
      priceCents: service.price_cents,
      customerEmail: booking.customer_email,
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const summary = searchParams.session_id
    ? await loadSummary(searchParams.session_id)
    : null;

  return (
    <section className="min-h-[80vh] bg-off-white py-16 sm:py-24 flex items-start justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gold/30 overflow-hidden">
          <div className="bg-gold p-8 sm:p-10 text-center">
            <div className="w-16 h-16 bg-navy rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-navy mb-2">
              You&apos;re booked!
            </h1>
            <p className="text-navy/80 leading-relaxed">
              Payment received. Ricky will see your lesson on his schedule and
              reach out the morning of.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            {summary ? (
              <div className="bg-off-white rounded-xl border border-gray-100 p-5 sm:p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Lesson
                </p>
                <p className="text-navy font-bold text-lg mb-4">
                  {summary.serviceName}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Date
                    </p>
                    <p className="text-navy font-semibold">
                      {formatDate(summary.scheduledAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Time
                    </p>
                    <p className="text-navy font-semibold">
                      {formatTime(summary.scheduledAt)} PT
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Duration
                    </p>
                    <p className="text-navy font-semibold">
                      {summary.durationMinutes} minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Paid
                    </p>
                    <p className="text-navy font-semibold">
                      {formatPrice(summary.priceCents)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mb-6 leading-relaxed">
                A confirmation email is on its way with all the details.
              </p>
            )}

            <h3 className="text-navy font-bold mb-3">What happens next</h3>
            <ol className="space-y-2 mb-7">
              {[
                "You'll get a confirmation email in the next few minutes.",
                "Ricky will text you the day before to confirm pickup details.",
                "Show up with your learner's permit and closed-toe shoes — that's it.",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold-dark font-bold flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-bold py-3 rounded-xl transition-all text-sm"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white font-bold py-3 rounded-xl transition-all text-sm"
              >
                Need to reschedule?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
