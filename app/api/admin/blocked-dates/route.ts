import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await auth.supabase
    .from("blocked_dates")
    .select("*")
    .gte("blocked_date", today)
    .order("blocked_date", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ blockedDates: data ?? [] });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const blocked_date = String(body.blocked_date ?? "");
  const reason = body.reason ? String(body.reason).slice(0, 200) : null;

  if (!DATE_RE.test(blocked_date)) {
    return NextResponse.json(
      { error: "blocked_date must be YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const { data, error } = await auth.supabase
    .from("blocked_dates")
    .insert([{ blocked_date, reason }])
    .select("*")
    .single();

  if (error) {
    const msg = error.message.includes("duplicate")
      ? "That date is already blocked."
      : error.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
  return NextResponse.json({ blockedDate: data });
}
