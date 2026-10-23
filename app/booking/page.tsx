import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import BookingWizard from "@/components/booking/BookingWizard";
import PageHero from "@/components/PageHero";
import type { Service, Availability, BlockedDate } from "@/lib/types";

export const metadata: Metadata = {
  title: "Book a Lesson",
  description:
    "Pick your package, your day, and your time. Pay securely and lock in your driving lesson with Ricky.",
  alternates: { canonical: "/booking" },
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
      <PageHero
        eyebrow="Book a lesson"
        title={<>Three steps. <span className="marker marker-animate">Two minutes.</span></>}
        description="Pick a package, choose a time that works for you, and pay securely. You'll get a confirmation email instantly."
      />

      {/* Wizard */}
      <section className="py-14 sm:py-20 paper-grid min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchParams.cancelled === "1" && (
            <div className="bg-white ring-2 ring-lane rounded-[20px] p-4 mb-6 text-sm text-ink flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-lane/20 text-lane-dark flex items-center justify-center flex-shrink-0 mt-0.5">
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
    <div className="bg-white ring-1 ring-ink/10 rounded-[28px] p-8 sm:p-12 text-center shadow-[0_20px_40px_-30px_rgba(21,23,28,0.4)]">
      <div className="w-14 h-14 rounded-full bg-lane/15 text-lane-dark mx-auto mb-5 flex items-center justify-center text-2xl">
        ⚙
      </div>
      <h2 className="text-2xl font-black text-ink mb-3">
        Booking is almost ready.
      </h2>
      <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
        Supabase isn&apos;t connected yet (or no services/availability are
        configured). Set the environment variables in{" "}
        <code className="bg-paper px-1.5 py-0.5 rounded text-ink text-sm">
          .env.local
        </code>{" "}
        and run the SQL in{" "}
        <code className="bg-paper px-1.5 py-0.5 rounded text-ink text-sm">
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
