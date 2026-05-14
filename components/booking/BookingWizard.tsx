"use client";

import { useEffect, useMemo, useState } from "react";
import CalendarPicker from "./CalendarPicker";
import TimeSlotPicker, { TimeSlot } from "./TimeSlotPicker";
import type { Service, Availability, BlockedDate } from "@/lib/types";
import {
  cn,
  formatPrice,
  formatTime24,
  ptDateTimeToUTCISO,
  toYMD,
} from "@/lib/utils";

interface Props {
  services: Service[];
  availability: Availability[];
  blockedDates: BlockedDate[];
  initialPackageSlug: string | null;
}

type Step = 1 | 2 | 3;

export default function BookingWizard({
  services,
  availability,
  blockedDates,
  initialPackageSlug,
}: Props) {
  const [step, setStep] = useState<Step>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    () => services.find((s) => s.slug === initialPackageSlug)?.id ?? null
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedService = services.find((s) => s.id === selectedServiceId) ?? null;
  const availableDays = useMemo(
    () => Array.from(new Set(availability.map((a) => a.day_of_week))),
    [availability]
  );
  const blockedDateStrings = useMemo(
    () => blockedDates.map((b) => b.blocked_date),
    [blockedDates]
  );

  // Whenever the selected date changes, fetch booked times and rebuild slots.
  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setSlotsLoading(true);

    (async () => {
      const ymd = toYMD(selectedDate);
      try {
        const res = await fetch(`/api/availability?date=${ymd}`, {
          cache: "no-store",
        });
        const data = (await res.json()) as {
          windows: { start: string; end: string }[];
          bookedTimes: string[];
          blocked: boolean;
        };
        if (cancelled) return;

        if (data.blocked || !data.windows.length) {
          setSlots([]);
          return;
        }

        const generated = generateSlots(data.windows, data.bookedTimes);
        setSlots(filterPastSlots(generated, selectedDate));
      } catch {
        if (!cancelled) setSlots([]);
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  // Reset time selection whenever the date changes.
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  async function handleSubmit() {
    if (!selectedService || !selectedDate || !selectedTime) return;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please fill in all your contact details.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const scheduledAt = ptDateTimeToUTCISO(toYMD(selectedDate), selectedTime);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          scheduledAt,
          customerName: name.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          notes: notes.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Couldn't start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setSubmitting(false);
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  const canAdvance =
    (step === 1 && selectedServiceId) ||
    (step === 2 && selectedDate && selectedTime) ||
    step === 3;

  return (
    <div>
      <StepIndicator step={step} />

      {step === 1 && (
        <StepShell
          title="Choose your package"
          subtitle="Pick the package that fits where you are in your journey."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s) => {
              const isSelected = selectedServiceId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedServiceId(s.id)}
                  className={cn(
                    "text-left rounded-2xl p-6 border-2 transition-all",
                    isSelected
                      ? "border-gold bg-white shadow-lg"
                      : "border-gray-200 bg-white hover:border-gold/40 hover:shadow-md"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-black text-navy">{s.name}</h3>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-navy" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-black text-navy mb-1">
                    {formatPrice(s.price_cents)}
                  </p>
                  <p className="text-xs text-gold-dark font-semibold uppercase tracking-widest mb-3">
                    {s.duration_minutes} min
                  </p>
                  {s.description && (
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {s.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell
          title="Pick a date & time"
          subtitle="Days Ricky isn't available are dimmed."
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <CalendarPicker
                availableDays={availableDays}
                blockedDates={blockedDateStrings}
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
            <div className="lg:col-span-2">
              {selectedDate ? (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 h-full">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    Selected day
                  </p>
                  <p className="text-navy font-black text-lg mb-5">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <TimeSlotPicker
                    slots={slots}
                    selected={selectedTime}
                    onSelect={setSelectedTime}
                    loading={slotsLoading}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-off-white flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-navy font-semibold">Pick a date</p>
                  <p className="text-gray-500 text-sm">
                    Available times will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </StepShell>
      )}

      {step === 3 && selectedService && selectedDate && selectedTime && (
        <StepShell
          title="Your details"
          subtitle="We need a way to reach you about your lesson."
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-4">
              <Field label="Full name" required>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Alex Johnson"
                  disabled={submitting}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email" required>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="you@email.com"
                    disabled={submitting}
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    placeholder="(714) 555-0102"
                    disabled={submitting}
                  />
                </Field>
              </div>
              <Field label="Anything Ricky should know? (optional)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-input"
                  rows={4}
                  placeholder="First-time driver, prefer mornings, pickup at my home in Tustin…"
                  disabled={submitting}
                />
              </Field>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-navy text-white rounded-2xl shadow-lg p-6 sm:p-7 sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                  Order Summary
                </p>
                <div className="space-y-3 mb-5 pb-5 border-b border-white/10">
                  <SummaryRow label="Package" value={selectedService.name} />
                  <SummaryRow
                    label="Date"
                    value={selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  />
                  <SummaryRow label="Time" value={`${formatTime24(selectedTime)} PT`} />
                  <SummaryRow
                    label="Duration"
                    value={`${selectedService.duration_minutes} min`}
                  />
                </div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-gray-300 text-sm">Total</span>
                  <span className="text-3xl font-black text-gold">
                    {formatPrice(selectedService.price_cents)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed text-navy font-black py-4 rounded-xl transition-all shadow-md"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Redirecting to checkout…
                    </>
                  ) : (
                    <>
                      Pay {formatPrice(selectedService.price_cents)} Securely
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                  Secure payment by Stripe. Cancel up to 24 hours before your
                  lesson for a full refund.
                </p>
              </div>
            </div>
          </div>
        </StepShell>
      )}

      {/* Step nav */}
      <div className="flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={() => setStep((s) => (s === 1 ? 1 : ((s - 1) as Step)))}
          disabled={step === 1}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
            step === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-navy border-2 border-navy hover:bg-navy hover:text-white"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {step < 3 && (
          <button
            type="button"
            onClick={() => canAdvance && setStep((s) => (s + 1) as Step)}
            disabled={!canAdvance}
            className={cn(
              "inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all",
              canAdvance
                ? "bg-gold hover:bg-gold-dark text-navy shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          color: #0a1628;
          font-size: 0.95rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: #ffffff;
        }
        :global(.form-input:focus) {
          outline: none;
          border-color: #c9a84c;
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.2);
        }
        :global(.form-input:disabled) {
          background: #f9fafb;
        }
      `}</style>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps = [
    { n: 1, label: "Package" },
    { n: 2, label: "Date & Time" },
    { n: 3, label: "Details" },
  ];
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                step === s.n && "bg-gold text-navy ring-4 ring-gold/20",
                step > s.n && "bg-navy text-white",
                step < s.n && "bg-white text-gray-400 border border-gray-200"
              )}
            >
              {step > s.n ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                s.n
              )}
            </div>
            <span
              className={cn(
                "hidden sm:inline text-sm font-semibold transition-colors",
                step >= s.n ? "text-navy" : "text-gray-400"
              )}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-8 sm:w-16 mx-2 sm:mx-3 rounded-full transition-colors",
                step > s.n ? "bg-navy" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-center mb-7">
        <h2 className="text-3xl sm:text-4xl font-black text-navy mb-2">
          {title}
        </h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy mb-2">
        {label} {required && <span className="text-gold-dark">*</span>}
      </span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-semibold text-right">{value}</span>
    </div>
  );
}

/**
 * Generate hourly slots from one or more availability windows, marking each
 * slot's availability based on already-booked times.
 */
function generateSlots(
  windows: { start: string; end: string }[],
  bookedTimes: string[]
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const bookedSet = new Set(bookedTimes);

  for (const w of windows) {
    const [sh, sm] = w.start.split(":").map(Number);
    const [eh, em] = w.end.split(":").map(Number);
    let h = sh;
    let m = sm;
    while (h * 60 + m + 60 <= eh * 60 + em) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      slots.push({ time, available: !bookedSet.has(time) });
      m += 60;
      if (m >= 60) {
        h += 1;
        m -= 60;
      }
    }
  }
  return slots;
}

function filterPastSlots(slots: TimeSlot[], date: Date): TimeSlot[] {
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  if (!isToday) return slots;

  const currentHHMM = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Los_Angeles",
  });
  return slots.filter((s) => s.time > currentHHMM);
}
