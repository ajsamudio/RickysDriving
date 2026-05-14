import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";

interface Context {
  params: { id: string };
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { error } = await auth.supabase
    .from("blocked_dates")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
