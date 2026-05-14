"use client";

import Link from "next/link";
import { useState } from "react";
import type { Booking, Service, BookingStatus } from "@/lib/types";
import { cn, formatDate, formatTime } from "@/lib/utils";

interface Props {
  bookings: Booking[];
  services: Service[];
  currentFilter: "upcoming" | "past" | "all";
}

const filters: { key: "upcoming" | "past" | "all"; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "all", label: "All" },
];

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: "bg-gray-100 text-gray-600",
  confirmed: "bg-gold/20 text-gold-dark",
  cancelled: "bg-red-50 text-red-700",
  completed: "bg-navy/10 text-navy",
};

export default function BookingsTable({
  bookings,
  services,
  currentFilter,
}: Props) {
  const serviceMap = new Map(services.map((s) => [s.id, s.name]));
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 w-fit">
        {filters.map((f) => {
          const active = f.key === currentFilter;
          return (
            <Link
              key={f.key}
              href={`/admin/bookings?filter=${f.key}`}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                active
                  ? "bg-navy text-white"
                  : "text-navy/60 hover:text-navy"
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {bookings.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-gray-500">No bookings to show.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {bookings.map((b) => {
              const isOpen = expanded === b.id;
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : b.id)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-off-white transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-navy font-bold truncate">
                          {b.customer_name}
                        </p>
                        <span
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                            STATUS_STYLE[b.status]
                          )}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {b.service_id
                          ? serviceMap.get(b.service_id) ?? "Package"
                          : "Package"}
                        {" · "}
                        {b.customer_email}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-navy font-semibold text-sm">
                        {formatDate(b.scheduled_at)}
                      </p>
                      <p className="text-xs text-gold-dark">
                        {formatTime(b.scheduled_at)} PT
                      </p>
                    </div>
                    <svg
                      className={cn(
                        "w-4 h-4 text-gray-400 transition-transform flex-shrink-0",
                        isOpen && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 bg-off-white border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4">
                        <Detail
                          label="Email"
                          value={
                            <a
                              href={`mailto:${b.customer_email}`}
                              className="text-gold-dark hover:text-navy transition-colors"
                            >
                              {b.customer_email}
                            </a>
                          }
                        />
                        <Detail
                          label="Phone"
                          value={
                            <a
                              href={`tel:${b.customer_phone}`}
                              className="text-gold-dark hover:text-navy transition-colors"
                            >
                              {b.customer_phone}
                            </a>
                          }
                        />
                        <Detail
                          label="Booked on"
                          value={formatDate(b.created_at)}
                        />
                        <Detail label="Booking ID" value={b.id.slice(0, 8)} />
                        {b.notes && (
                          <div className="sm:col-span-2">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                              Notes
                            </p>
                            <p className="text-sm text-navy bg-white border border-gray-100 rounded-lg p-3 leading-relaxed">
                              {b.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
        {label}
      </p>
      <p className="text-sm text-navy">{value}</p>
    </div>
  );
}
