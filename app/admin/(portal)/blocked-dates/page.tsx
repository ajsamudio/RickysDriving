import { createSupabaseServerClient } from "@/lib/supabase/server";
import BlockedDatesEditor from "@/components/admin/BlockedDatesEditor";
import type { BlockedDate } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminBlockedDatesPage() {
  const supabase = createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data } = await supabase
    .from("blocked_dates")
    .select("*")
    .gte("blocked_date", today)
    .order("blocked_date", { ascending: true });

  const rows = (data ?? []) as BlockedDate[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-navy mb-1">Blocked Dates</h1>
        <p className="text-gray-500 max-w-2xl">
          Block off specific dates (vacations, holidays, personal time).
          Customers won&apos;t be able to book any times on these dates.
        </p>
      </div>
      <BlockedDatesEditor initialRows={rows} />
    </div>
  );
}
