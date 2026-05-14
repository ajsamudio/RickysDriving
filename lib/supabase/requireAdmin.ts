import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "./server";

/**
 * Returns an authenticated Supabase server client if the request has a valid
 * admin session, or a 401 NextResponse if not. Single-admin model: any
 * authenticated Supabase Auth user is treated as the admin.
 */
export async function requireAdmin() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true as const, supabase, user };
}
