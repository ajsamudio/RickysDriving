import { createSupabaseServerClient } from "@/lib/supabase/server";
import BookingsTable from "@/components/admin/BookingsTable";
import type { Booking, Service } from "@/lib/types";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { filter?: string };
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const supabase = createSupabaseServerClient();
  const filter = searchParams.filter ?? "upcoming";

  let query = supabase
    .from("bookings")
    .select("*")
    .order("scheduled_at", { ascending: filter !== "past" });

  if (filter === "upcoming") {
    query = query
      .in("status", ["pending", "confirmed"])
      .gte("scheduled_at", new Date().toISOString());
  } else if (filter === "past") {
    query = query.lt("scheduled_at", new Date().toISOString());
  }

  const [bookingsRes, servicesRes] = await Promise.all([
    query.limit(200),
    supabase.from("services").select("*"),
  ]);

  const bookings = (bookingsRes.data ?? []) as Booking[];
  const services = (servicesRes.data ?? []) as Service[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-navy mb-1">Bookings</h1>
        <p className="text-gray-500">
          Every paid lesson, in chronological order.
        </p>
      </div>
      <BookingsTable
        bookings={bookings}
        services={services}
        currentFilter={filter as "upcoming" | "past" | "all"}
      />
    </div>
  );
}
