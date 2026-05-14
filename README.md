# Ricky's Driving

Booking site for a solo driving instructor in Orange County, CA. Next.js 14 (App Router) + Tailwind + Supabase + Stripe + Resend.

## Features

- Marketing pages: **Home**, **About**, **Services**, **FAQ**, **Contact** (with functional contact form)
- **Booking** flow — 3-step wizard:
  1. Pick a package
  2. Pick a date + time from Ricky's real availability
  3. Enter details → Stripe Checkout
- Stripe webhook confirms the booking and triggers Resend emails (customer + Ricky)
- **Admin portal** at `/admin` (Supabase Auth, single user) — dashboard, availability editor, blocked dates, bookings table

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create services

You need accounts on three platforms. All have free / generous trial tiers.

| Service | Why | Free tier |
|---|---|---|
| [Supabase](https://supabase.com) | Database + Auth | Yes |
| [Stripe](https://stripe.com) | Payments | Test mode is free |
| [Resend](https://resend.com) | Transactional email | 3,000 emails/mo free |

### 3. Configure `.env.local`

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=bookings@rickysdriving.com
INSTRUCTOR_EMAIL=ricky@rickysdriving.com
```

### 4. Set up the Supabase database

1. Open your Supabase project's SQL editor
2. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and run it
3. This creates the `services`, `availability`, `blocked_dates`, `bookings`, `payments` tables, sets up RLS, and seeds three sample packages + Mon–Fri 9–5 availability

### 5. Create the admin user

In Supabase: **Authentication → Users → Add user** (Ricky's email + a strong password). That account can sign in at `/admin/login`.

### 6. Start the Stripe webhook listener (development only)

In a separate terminal:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_…` secret it prints into your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### 7. Verify your Resend sending domain

In Resend, add a domain (e.g. `rickysdriving.com`) and add the DNS records it asks for. Your `RESEND_FROM_EMAIL` must use this verified domain.

### 8. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## End-to-end test

1. **Public pages** — visit `/`, `/about`, `/services`, `/faq`, `/contact`. Submit the contact form → you should receive an email at `INSTRUCTOR_EMAIL`.
2. **Booking** — visit `/booking`. Pick Essential → pick a date → pick a time → fill name/email/phone → click Pay. Use Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC. You'll land on `/booking/success` and both you and Ricky should get email confirmations.
3. **Admin** — visit `/admin`. You'll be redirected to `/admin/login`. Sign in. Toggle one of the availability rows → reload `/booking` → that day is dimmed on the calendar. Block tomorrow's date → it's also dimmed.

## Deploy

1. Push to GitHub
2. Import to Vercel
3. Add all the env vars from `.env.local` to Vercel project settings (set `NEXT_PUBLIC_APP_URL` to your production URL)
4. In Stripe Dashboard → **Webhooks**, add an endpoint at `https://your-domain.com/api/stripe/webhook` for the `checkout.session.completed` + `checkout.session.expired` events. Copy its `whsec_` to Vercel env vars.

## Project structure

```
app/
  page.tsx                          home
  about/page.tsx
  services/page.tsx
  faq/page.tsx
  contact/page.tsx
  booking/
    page.tsx                        3-step wizard
    success/page.tsx
  admin/
    login/page.tsx
    (portal)/                       route group — wrapped in AdminNav
      layout.tsx
      page.tsx                      dashboard
      availability/page.tsx
      blocked-dates/page.tsx
      bookings/page.tsx
  api/
    contact/route.ts
    availability/route.ts           public — fetches booked times for a date
    stripe/checkout/route.ts        creates pending booking + Stripe session
    stripe/webhook/route.ts         confirms booking, sends emails
    admin/
      availability/route.ts + [id]/route.ts
      blocked-dates/route.ts + [id]/route.ts
      bookings/route.ts
components/
  Navbar, Footer, AnnouncementBanner
  PackageCard, TestimonialCard
  FAQAccordion, ContactForm
  booking/{CalendarPicker, TimeSlotPicker, BookingWizard}
  admin/{AdminNav, AvailabilityEditor, BlockedDatesEditor, BookingsTable}
lib/
  supabase/{client, server, admin, requireAdmin}.ts
  emails/{bookingConfirmation, instructorNotification}.ts
  stripe.ts, resend.ts, types.ts, utils.ts
middleware.ts                       protects /admin/*
supabase/schema.sql
```
