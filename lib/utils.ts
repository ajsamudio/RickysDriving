export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

export function formatTime(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  });
}

export function formatTime24(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/**
 * Combines a YYYY-MM-DD date with an HH:MM Pacific Time string into a UTC ISO string.
 * Accounts for DST automatically via the IANA timezone database.
 */
export function ptDateTimeToUTCISO(dateYMD: string, timeHHMM: string): string {
  const [y, m, d] = dateYMD.split("-").map(Number);
  const [h, min] = timeHHMM.split(":").map(Number);

  // Build a UTC timestamp for the same wall clock, then adjust by the PT offset.
  const asUTC = Date.UTC(y, m - 1, d, h, min);
  const ptOffsetMinutes = getPTOffsetMinutes(new Date(asUTC));
  return new Date(asUTC + ptOffsetMinutes * 60 * 1000).toISOString();
}

function getPTOffsetMinutes(at: Date): number {
  // Format the moment in PT and parse back to compute the offset.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(at);

  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const ptAsUTC = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") === 24 ? 0 : get("hour"),
    get("minute")
  );
  return (at.getTime() - ptAsUTC) / 60000;
}

export function toYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
