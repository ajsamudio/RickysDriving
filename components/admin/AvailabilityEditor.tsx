"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Availability } from "@/lib/types";
import { cn, formatTime24 } from "@/lib/utils";

const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface Props {
  initialRows: Availability[];
}

export default function AvailabilityEditor({ initialRows }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<Availability[]>(initialRows);
  const [adding, setAdding] = useState(false);
  const [newDay, setNewDay] = useState(1);
  const [newStart, setNewStart] = useState("09:00");
  const [newEnd, setNewEnd] = useState("17:00");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/admin/availability", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { availability: Availability[] };
      setRows(data.availability);
    }
    router.refresh();
  }

  async function handleAdd() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day_of_week: newDay,
          start_time: newStart,
          end_time: newEnd,
          is_active: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Couldn't save.");
      setAdding(false);
      setNewStart("09:00");
      setNewEnd("17:00");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save.");
    } finally {
      setBusy(false);
    }
  }

  async function handleToggle(row: Availability) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/availability/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !row.is_active }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Couldn't update.");
      }
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't update.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(row: Availability) {
    if (!confirm(`Delete ${DAY_LABELS[row.day_of_week]} ${formatTime24(row.start_time.slice(0, 5))}–${formatTime24(row.end_time.slice(0, 5))}?`)) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/availability/${row.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Couldn't delete.");
      }
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't delete.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-3">
        <h2 className="text-lg font-black text-navy">Recurring time windows</h2>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            disabled={busy}
            className="bg-gold hover:bg-gold-dark text-navy font-bold text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            + Add window
          </button>
        )}
      </div>

      {adding && (
        <div className="px-6 py-5 bg-off-white border-b border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <Field label="Day">
              <select
                value={newDay}
                onChange={(e) => setNewDay(Number(e.target.value))}
                className="admin-input"
                disabled={busy}
              >
                {DAY_LABELS.map((d, i) => (
                  <option key={d} value={i}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Start">
              <input
                type="time"
                value={newStart}
                onChange={(e) => setNewStart(e.target.value)}
                className="admin-input"
                disabled={busy}
              />
            </Field>
            <Field label="End">
              <input
                type="time"
                value={newEnd}
                onChange={(e) => setNewEnd(e.target.value)}
                className="admin-input"
                disabled={busy}
              />
            </Field>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={busy}
                className="flex-1 bg-navy hover:bg-navy-light text-white font-bold text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setError(null);
                }}
                disabled={busy}
                className="px-3 text-navy/70 hover:text-navy font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {rows.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500 mb-2">No availability set yet.</p>
          <p className="text-sm text-gray-400">
            Add a window above to start accepting bookings.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {rows.map((row) => {
            const inactive = !row.is_active;
            return (
              <li
                key={row.id}
                className={cn(
                  "px-6 py-4 flex items-center justify-between gap-4",
                  inactive && "opacity-60"
                )}
              >
                <div className="min-w-0">
                  <p className="text-navy font-bold">
                    {DAY_LABELS[row.day_of_week]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatTime24(row.start_time.slice(0, 5))} –{" "}
                    {formatTime24(row.end_time.slice(0, 5))}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(row)}
                    disabled={busy}
                    className={cn(
                      "text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50",
                      inactive
                        ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        : "bg-gold/15 text-gold-dark hover:bg-gold/25"
                    )}
                  >
                    {inactive ? "Inactive" : "Active"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(row)}
                    disabled={busy}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1.5 transition-colors disabled:opacity-50"
                    aria-label="Delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <style jsx>{`
        :global(.admin-input) {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          color: #0a1628;
          font-size: 0.9rem;
          background: #ffffff;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.admin-input:focus) {
          outline: none;
          border-color: #c9a84c;
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.2);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
