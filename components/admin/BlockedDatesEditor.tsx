"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlockedDate } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface Props {
  initialRows: BlockedDate[];
}

export default function BlockedDatesEditor({ initialRows }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<BlockedDate[]>(initialRows);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/admin/blocked-dates", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { blockedDates: BlockedDate[] };
      setRows(data.blockedDates);
    }
    router.refresh();
  }

  async function handleAdd() {
    if (!date) {
      setError("Pick a date first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked_date: date, reason: reason || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Couldn't save.");
      setDate("");
      setReason("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(row: BlockedDate) {
    if (!confirm(`Unblock ${formatDate(row.blocked_date)}?`)) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blocked-dates/${row.id}`, {
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
      <div className="px-6 py-5 border-b border-gray-100 bg-off-white">
        <h2 className="text-base font-black text-navy mb-4">Add a blocked date</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <label className="block sm:col-span-1">
            <span className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
              Date
            </span>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="admin-input"
              disabled={busy}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
              Reason (optional)
            </span>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="admin-input"
              placeholder="Vacation"
              disabled={busy}
              maxLength={200}
            />
          </label>
          <button
            type="button"
            onClick={handleAdd}
            disabled={busy || !date}
            className="bg-gold hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-navy font-bold text-sm py-2.5 px-4 rounded-lg transition-colors"
          >
            Block date
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {rows.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">No upcoming blocked dates.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {rows.map((row) => (
            <li
              key={row.id}
              className="px-6 py-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-navy font-bold">
                  {formatDate(row.blocked_date)}
                </p>
                {row.reason && (
                  <p className="text-sm text-gray-500 truncate">{row.reason}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(row)}
                disabled={busy}
                className="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1.5 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                Unblock
              </button>
            </li>
          ))}
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
