import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") ?? "upcoming";

  let query = auth.supabase
    .from("bookings")
    .select("*")
    .order("scheduled_at", { ascending: filter !== "past" });

  if (filter === "upcoming") {
    query = query
      .in("status", ["pending", "confirmed"])
      .gte("scheduled_at", new Date().toISOString());
  } else if (filter === "past") {
    query = query.lt("scheduled_at", new Date().toISOString());
  } else if (filter === "all") {
    // no extra filters
  }

  const { data, error } = await query.limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ bookings: data ?? [] });
}
