import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import BookingWizard from "@/components/booking/BookingWizard";
import type { Service, Availability, BlockedDate } from "@/lib/types";

export const metadata: Metadata = {
  title: "Book a Lesson",
  description:
    "Pick your package, your day, and your time. Pay securely and lock in your driving lesson with Ricky.",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { package?: string; cancelled?: string };
}

export default async function BookingPage({ searchParams }: PageProps) {
  const supabase = createSupabaseServerClient();

  const [servicesRes, availabilityRes, blockedRes] = await Promise.all([
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
    supabase.from("availability").select("*").eq("is_active", true),
    supabase
      .from("blocked_dates")
      .select("*")
      .gte("blocked_date", new Date().toISOString().slice(0, 10)),
  ]);

  const services = (servicesRes.data ?? []) as Service[];
  const availability = (availabilityRes.data ?? []) as Availability[];
  const blockedDates = (blockedRes.data ?? []) as BlockedDate[];

  const dataError =
    servicesRes.error || availabilityRes.error || blockedRes.error;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-[40px] border-gold/10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest animate-rd-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Book a Lesson
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-4 text-balance animate-rd-fade-up delay-100">
              Three steps. <span className="rd-shimmer">Two minutes.</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl animate-rd-fade-up delay-200">
              Pick a package, choose a time that works for you, and pay
              securely. You&apos;ll get a confirmation email instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 sm:py-16 bg-off-white min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchParams.cancelled === "1" && (
            <div className="bg-white border border-gold/40 rounded-2xl p-4 mb-6 text-sm text-navy flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                ℹ
              </span>
              <p className="leading-relaxed">
                <span className="font-semibold">Checkout cancelled.</span> No
                charge was made — your slot is still open. Pick up where you
                left off.
              </p>
            </div>
          )}

          {dataError ? (
            <SetupNotice />
          ) : services.length === 0 || availability.length === 0 ? (
            <SetupNotice />
          ) : (
            <BookingWizard
              services={services}
              availability={availability}
              blockedDates={blockedDates}
              initialPackageSlug={searchParams.package ?? null}
            />
          )}
        </div>
      </section>
    </>
  );
}

function SetupNotice() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center">
      <div className="w-14 h-14 rounded-full bg-gold/15 text-gold-dark mx-auto mb-5 flex items-center justify-center text-2xl">
        ⚙
      </div>
      <h2 className="text-2xl font-black text-navy mb-3">
        Booking is almost ready.
      </h2>
      <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
        Supabase isn&apos;t connected yet (or no services/availability are
        configured). Set the environment variables in{" "}
        <code className="bg-off-white px-1.5 py-0.5 rounded text-navy text-sm">
          .env.local
        </code>{" "}
        and run the SQL in{" "}
        <code className="bg-off-white px-1.5 py-0.5 rounded text-navy text-sm">
          supabase/schema.sql
        </code>
        .
      </p>
      <p className="text-sm text-gray-400">
        Need help? See the setup section of the README.
      </p>
    </div>
  );
}
