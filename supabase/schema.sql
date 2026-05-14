-- Ricky's Driving — Supabase schema
-- Run this once in the Supabase SQL editor for your project.

-- =========================================================================
-- Tables
-- =========================================================================

-- Lesson packages
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  duration_minutes int not null,
  price_cents int not null,
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Recurring weekly availability (solo instructor — no coach_id)
create table if not exists availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- One-off blocked dates (vacation, holidays, etc.)
create table if not exists blocked_dates (
  id uuid primary key default gen_random_uuid(),
  blocked_date date not null unique,
  reason text,
  created_at timestamptz not null default now()
);

-- Bookings (guest checkout — customer details stored inline)
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  scheduled_at timestamptz not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','cancelled','completed')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists bookings_scheduled_at_idx on bookings (scheduled_at);
create index if not exists bookings_status_idx on bookings (status);

-- Stripe payment records
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  amount_cents int not null,
  status text not null default 'pending'
    check (status in ('pending','paid','refunded')),
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists payments_session_idx on payments (stripe_session_id);

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table services enable row level security;
alter table availability enable row level security;
alter table blocked_dates enable row level security;
alter table bookings enable row level security;
alter table payments enable row level security;

-- Public can read active services + availability + blocked dates (for the booking page calendar).
drop policy if exists "services public read" on services;
create policy "services public read" on services
  for select using (is_active);

drop policy if exists "availability public read" on availability;
create policy "availability public read" on availability
  for select using (is_active);

drop policy if exists "blocked_dates public read" on blocked_dates;
create policy "blocked_dates public read" on blocked_dates
  for select using (true);

-- Bookings/payments are NOT publicly readable.
-- All writes (and admin reads) go through the service-role key in API routes,
-- which bypasses RLS. The /admin pages authenticate via Supabase Auth and
-- the API routes verify the session before performing actions.

-- =========================================================================
-- Seed data — replace prices/availability with Ricky's real values later.
-- =========================================================================

insert into services (slug, name, description, duration_minutes, price_cents, display_order)
values
  ('starter', 'Starter', 'One 2-hour session — perfect for first-time drivers.', 120, 12000, 1),
  ('essential', 'Essential', 'Two 2-hour sessions — build real road confidence.', 240, 22000, 2),
  ('confident', 'Confident', 'Three 2-hour sessions — DMV-ready with mock test.', 360, 32000, 3)
on conflict (slug) do nothing;

-- Mon–Fri 9am–5pm placeholder. Edit via /admin/availability after seeding.
insert into availability (day_of_week, start_time, end_time)
values
  (1, '09:00', '17:00'),
  (2, '09:00', '17:00'),
  (3, '09:00', '17:00'),
  (4, '09:00', '17:00'),
  (5, '09:00', '17:00')
on conflict do nothing;
