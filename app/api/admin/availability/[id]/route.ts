import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

interface Context {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: Context) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const update: Record<string, unknown> = {};

  if (body.start_time !== undefined) {
    if (!TIME_RE.test(String(body.start_time))) {
      return NextResponse.json({ error: "Invalid start_time" }, { status: 400 });
    }
    update.start_time = String(body.start_time);
  }
  if (body.end_time !== undefined) {
    if (!TIME_RE.test(String(body.end_time))) {
      return NextResponse.json({ error: "Invalid end_time" }, { status: 400 });
    }
    update.end_time = String(body.end_time);
  }
  if (body.is_active !== undefined) {
    update.is_active = Boolean(body.is_active);
  }
  if (body.day_of_week !== undefined) {
    const d = Number(body.day_of_week);
    if (!Number.isInteger(d) || d < 0 || d > 6) {
      return NextResponse.json({ error: "Invalid day_of_week" }, { status: 400 });
    }
    update.day_of_week = d;
  }

  if (update.start_time && update.end_time && update.start_time >= update.end_time) {
    return NextResponse.json(
      { error: "Start time must be before end time." },
      { status: 400 }
    );
  }

  const { data, error } = await auth.supabase
    .from("availability")
    .update(update)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ availability: data });
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { error } = await auth.supabase
    .from("availability")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
