import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { data, error } = await auth.supabase
    .from("availability")
    .select("*")
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ availability: data ?? [] });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const day_of_week = Number(body.day_of_week);
  const start_time = String(body.start_time ?? "");
  const end_time = String(body.end_time ?? "");
  const is_active = body.is_active !== false;

  if (!Number.isInteger(day_of_week) || day_of_week < 0 || day_of_week > 6) {
    return NextResponse.json(
      { error: "day_of_week must be an integer 0–6." },
      { status: 400 }
    );
  }
  if (!TIME_RE.test(start_time) || !TIME_RE.test(end_time)) {
    return NextResponse.json(
      { error: "Times must be in HH:MM format." },
      { status: 400 }
    );
  }
  if (start_time >= end_time) {
    return NextResponse.json(
      { error: "Start time must be before end time." },
      { status: 400 }
    );
  }

  const { data, error } = await auth.supabase
    .from("availability")
    .insert([{ day_of_week, start_time, end_time, is_active }])
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ availability: data });
}
