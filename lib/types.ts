export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Availability {
  id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string; // "HH:MM" or "HH:MM:SS"
  end_time: string;
  is_active: boolean;
  created_at: string;
}

export interface BlockedDate {
  id: string;
  blocked_date: string; // "YYYY-MM-DD"
  reason: string | null;
  created_at: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  service_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  scheduled_at: string; // ISO8601
  status: BookingStatus;
  notes: string | null;
  created_at: string;
}

export type PaymentStatus = "pending" | "paid" | "refunded";

export interface Payment {
  id: string;
  booking_id: string;
  amount_cents: number;
  status: PaymentStatus;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface BookingWithService extends Booking {
  service: Service | null;
}
