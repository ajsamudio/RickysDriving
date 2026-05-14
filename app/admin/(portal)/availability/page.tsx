import { createSupabaseServerClient } from "@/lib/supabase/server";
import AvailabilityEditor from "@/components/admin/AvailabilityEditor";
import type { Availability } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminAvailabilityPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("availability")
    .select("*")
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  const rows = (data ?? []) as Availability[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-navy mb-1">Weekly Availability</h1>
        <p className="text-gray-500 max-w-2xl">
          Set the recurring days and time windows you&apos;re available for
          lessons. Customers will only see slots that fall inside these windows.
        </p>
      </div>
      <AvailabilityEditor initialRows={rows} />
    </div>
  );
}
