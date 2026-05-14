import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate, formatTime } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

interface UpcomingBooking {
  id: string;
  customer_name: string;
  scheduled_at: string;
  status: BookingStatus;
  service_id: string | null;
}

interface ServiceRow {
  id: string;
  name: string;
}

export default async function AdminDashboardPage() {
  const supabase = createSupabaseServerClient();
  const now = new Date();
  const nowIso = now.toISOString();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [upcomingRes, weekRes, monthRes, nextRes, servicesRes] = await Promise.all([
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed")
      .gte("scheduled_at", nowIso),
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed")
      .gte("scheduled_at", nowIso)
      .lt("scheduled_at", weekFromNow),
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed")
      .gte("created_at", monthStart),
    supabase
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .gte("scheduled_at", nowIso)
      .order("scheduled_at", { ascending: true })
      .limit(5),
    supabase.from("services").select("*"),
  ]);

  const upcomingCount = upcomingRes.count ?? 0;
  const weekCount = weekRes.count ?? 0;
  const monthCount = monthRes.count ?? 0;
  const nextBookings = (nextRes.data ?? []) as UpcomingBooking[];
  const services = (servicesRes.data ?? []) as ServiceRow[];
  const serviceMap = new Map(services.map((s) => [s.id, s.name]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-navy mb-1">Dashboard</h1>
        <p className="text-gray-500">An overview of your schedule.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Upcoming bookings" value={upcomingCount} href="/admin/bookings" />
        <StatCard label="Lessons this week" value={weekCount} />
        <StatCard label="Bookings this month" value={monthCount} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-navy">Next up</h2>
            <p className="text-sm text-gray-500">Your next 5 confirmed lessons.</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-sm font-semibold text-gold-dark hover:text-navy transition-colors"
          >
            View all →
          </Link>
        </div>
        {nextBookings.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No upcoming lessons yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {nextBookings.map((b) => (
              <li
                key={b.id}
                className="px-6 py-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-navy font-semibold truncate">
                    {b.customer_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {b.service_id ? serviceMap.get(b.service_id) ?? "Package" : "Package"}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-navy font-semibold text-sm">
                    {formatDate(b.scheduled_at)}
                  </p>
                  <p className="text-xs text-gold-dark">
                    {formatTime(b.scheduled_at)} PT
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <QuickLink
          href="/admin/availability"
          title="Edit weekly availability"
          body="Set which days and times you're available for lessons."
        />
        <QuickLink
          href="/admin/blocked-dates"
          title="Block off dates"
          body="Mark vacations or holidays as unavailable."
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const card = (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full hover:border-gold/40 transition-colors">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
        {label}
      </p>
      <p className="text-4xl font-black text-navy">{value}</p>
    </div>
  );
  return href ? <Link href={href}>{card}</Link> : card;
}

function QuickLink({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:border-gold/40 transition-all"
    >
      <h3 className="text-navy font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
      <p className="text-sm font-semibold text-gold-dark mt-3">Open →</p>
    </Link>
  );
}
