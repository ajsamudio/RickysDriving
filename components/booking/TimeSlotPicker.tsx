"use client";

import { cn, formatTime24 } from "@/lib/utils";

export interface TimeSlot {
  time: string; // "HH:MM"
  available: boolean;
}

interface Props {
  slots: TimeSlot[];
  selected: string | null;
  onSelect: (time: string) => void;
  loading?: boolean;
}

export default function TimeSlotPicker({
  slots,
  selected,
  onSelect,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <svg
          className="w-6 h-6 animate-spin text-gold mx-auto mb-3"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p className="text-gray-500 text-sm">Loading available times…</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-off-white flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-navy font-semibold mb-1">No times available</p>
        <p className="text-gray-500 text-sm">
          Pick another day on the calendar.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Times shown in Pacific Time
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {slots.map((slot) => {
          const isSelected = selected === slot.time;
          return (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => slot.available && onSelect(slot.time)}
              className={cn(
                "py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-150 border-2",
                !slot.available &&
                  "border-gray-100 bg-off-white text-gray-300 cursor-not-allowed line-through",
                slot.available &&
                  !isSelected &&
                  "border-gray-200 bg-white text-navy hover:border-gold hover:bg-gold/5",
                isSelected && "border-gold bg-gold text-navy shadow-md"
              )}
            >
              {formatTime24(slot.time)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
