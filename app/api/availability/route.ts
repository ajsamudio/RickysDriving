import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/availability?date=YYYY-MM-DD
 *
 * Returns the times already booked (HH:MM in PT) for that date,
 * plus the start/end window of the instructor's recurring availability
 * for that weekday. The client uses this to render the time-slot grid.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Missing or invalid `date` query (expected YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  // Day of week in PT — important: a date like "2026-05-15" interpreted as a
  // calendar day, not midnight UTC.
  const [y, m, d] = date.split("-").map(Number);
  const dayOfWeek = new Date(Date.UTC(y, m - 1, d)).getUTCDay();

  // Get the recurring availability window for that weekday.
  const { data: availabilityData, error: availErr } = await supabase
    .from("availability")
    .select("start_time, end_time")
    .eq("day_of_week", dayOfWeek)
    .eq("is_active", true);

  if (availErr) {
    return NextResponse.json({ error: availErr.message }, { status: 500 });
  }

  const availability = (availabilityData ?? []) as Array<{
    start_time: string;
    end_time: string;
  }>;

  // Is the date blocked?
  const { data: blocked } = await supabase
    .from("blocked_dates")
    .select("id")
    .eq("blocked_date", date)
    .maybeSingle();

  if (blocked) {
    return NextResponse.json({
      windows: [],
      bookedTimes: [],
      blocked: true,
    });
  }

  // Booked slots that day (pending + confirmed count toward capacity).
  const dayStartUTC = new Date(Date.UTC(y, m - 1, d, 0, 0)).toISOString();
  const dayEndUTC = new Date(Date.UTC(y, m - 1, d + 1, 0, 0)).toISOString();

  const { data: bookingsData, error: bookErr } = await supabase
    .from("bookings")
    .select("scheduled_at, status")
    .gte("scheduled_at", dayStartUTC)
    .lt("scheduled_at", dayEndUTC)
    .in("status", ["pending", "confirmed"]);

  if (bookErr) {
    return NextResponse.json({ error: bookErr.message }, { status: 500 });
  }

  const bookings = (bookingsData ?? []) as Array<{
    scheduled_at: string;
    status: string;
  }>;
  const bookedTimes = bookings.map((b) => {
    const dt = new Date(b.scheduled_at);
    return dt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Los_Angeles",
    });
  });

  return NextResponse.json({
    windows: availability.map((a) => ({
      start: a.start_time.slice(0, 5),
      end: a.end_time.slice(0, 5),
    })),
    bookedTimes,
    blocked: false,
  });
}
