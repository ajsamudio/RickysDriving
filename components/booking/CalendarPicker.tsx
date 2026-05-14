"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  isPast,
  addMonths,
  subMonths,
} from "date-fns";
import { cn, toYMD } from "@/lib/utils";

interface Props {
  availableDays: number[]; // 0=Sun .. 6=Sat
  blockedDates: string[]; // YYYY-MM-DD strings
  selected: Date | null;
  onSelect: (date: Date) => void;
}

export default function CalendarPicker({
  availableDays,
  blockedDates,
  selected,
  onSelect,
}: Props) {
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const blockedSet = new Set(blockedDates);

  const start = startOfWeek(startOfMonth(viewMonth));
  const end = endOfWeek(endOfMonth(viewMonth));
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setViewMonth((m) => subMonths(m, 1))}
          className="w-9 h-9 rounded-lg hover:bg-off-white text-navy/70 hover:text-navy transition-colors flex items-center justify-center"
          aria-label="Previous month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-bold text-navy uppercase tracking-wide text-sm sm:text-base">
          {format(viewMonth, "MMMM yyyy")}
        </h3>
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="w-9 h-9 rounded-lg hover:bg-off-white text-navy/70 hover:text-navy transition-colors flex items-center justify-center"
          aria-label="Next month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-gray-400 text-[11px] font-semibold uppercase tracking-widest py-2"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const inMonth = isSameMonth(day, viewMonth);
          const isSelected = selected && isSameDay(day, selected);
          const past = isPast(day) && !isToday(day);
          const blocked = blockedSet.has(toYMD(day));
          const onAvailableDay = availableDays.includes(day.getDay());
          const available = inMonth && !past && !blocked && onAvailableDay;

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={!available}
              onClick={() => available && onSelect(day)}
              className={cn(
                "relative h-11 w-full rounded-xl text-sm font-semibold transition-all duration-150",
                !inMonth && "opacity-0 pointer-events-none",
                inMonth && !available && "text-gray-300 cursor-not-allowed",
                inMonth && available && !isSelected && "text-navy hover:bg-gold/15 hover:text-navy",
                isSelected && "bg-gold text-navy shadow-md ring-2 ring-gold/30",
                isToday(day) && !isSelected && "ring-1 ring-gold/40"
              )}
            >
              {format(day, "d")}
              {isToday(day) && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 mt-6 pt-5 border-t border-gray-100 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gold" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full ring-1 ring-gold/40" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-off-white border border-gray-200" /> Unavailable
        </span>
      </div>
    </div>
  );
}
