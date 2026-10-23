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
    <section className="min-h-[80vh] paper-grid py-16 sm:py-24 flex items-start justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6">
        <div className="bg-white rounded-[32px] shadow-[0_40px_80px_-40px_rgba(21,23,28,0.6)] ring-1 ring-ink/10 overflow-hidden animate-rd-fade-up">
          <div className="sign-plate !rounded-none p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-lane rounded-full mx-auto mb-5 flex items-center justify-center shadow-lg animate-rd-fade-in delay-200">
              <svg className="w-8 h-8 text-ink" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
              You&apos;re booked!
            </h1>
            <p className="text-white/80 leading-relaxed max-w-md mx-auto">
              Payment received. Ricky will see your lesson on his schedule and
              reach out the morning of.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            {summary ? (
              <div className="bg-paper rounded-[20px] p-5 sm:p-6 mb-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Lesson
                </p>
                <p className="text-ink font-bold text-lg mb-4">
                  {summary.serviceName}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Date
                    </p>
                    <p className="text-ink font-semibold">
                      {formatDate(summary.scheduledAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Time
                    </p>
                    <p className="text-ink font-semibold">
                      {formatTime(summary.scheduledAt)} PT
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Duration
                    </p>
                    <p className="text-ink font-semibold">
                      {summary.durationMinutes} minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Paid
                    </p>
                    <p className="text-ink font-semibold">
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

            <h3 className="text-ink text-xl font-black mb-4">What happens next</h3>
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
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lane text-ink font-black flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="btn-dark flex-1"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="btn-outline flex-1"
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
