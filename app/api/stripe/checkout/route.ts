import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

interface CheckoutBody {
  serviceId: string;
  scheduledAt: string; // UTC ISO
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string | null;
}

export async function POST(req: NextRequest) {
  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    serviceId,
    scheduledAt,
    customerName,
    customerEmail,
    customerPhone,
    notes,
  } = body;

  if (!serviceId || !scheduledAt || !customerName || !customerEmail || !customerPhone) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const scheduled = new Date(scheduledAt);
  if (Number.isNaN(scheduled.getTime()) || scheduled.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "The selected time is invalid or in the past." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  // Fetch the service.
  const { data: service, error: serviceErr } = await supabase
    .from("services")
    .select("*")
    .eq("id", serviceId)
    .maybeSingle();

  if (serviceErr || !service || !service.is_active) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  // Guard: is the slot still free? (1 student per slot — solo instructor)
  const { data: conflicting } = await supabase
    .from("bookings")
    .select("id")
    .eq("scheduled_at", scheduled.toISOString())
    .in("status", ["pending", "confirmed"])
    .limit(1);

  if (conflicting && conflicting.length > 0) {
    return NextResponse.json(
      { error: "That time was just booked — please pick another." },
      { status: 409 }
    );
  }

  // Insert pending booking.
  const { data: booking, error: bookingErr } = await supabase
    .from("bookings")
    .insert([
      {
        service_id: serviceId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        scheduled_at: scheduled.toISOString(),
        status: "pending",
        notes: notes ?? null,
      },
    ])
    .select("*")
    .single();

  if (bookingErr || !booking) {
    return NextResponse.json(
      { error: bookingErr?.message ?? "Could not create booking." },
      { status: 500 }
    );
  }

  // Create Stripe Checkout session.
  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${service.name} — Driving Lesson`,
              description:
                service.description ??
                `${service.duration_minutes} minutes of one-on-one driving instruction with Ricky.`,
            },
            unit_amount: service.price_cents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking.id,
      },
      success_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/booking?cancelled=1`,
    });
  } catch (err) {
    // Stripe failed — clean up the pending booking.
    await supabase.from("bookings").delete().eq("id", booking.id);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Could not start checkout.",
      },
      { status: 500 }
    );
  }

  // Record pending payment.
  await supabase.from("payments").insert([
    {
      booking_id: booking.id,
      amount_cents: service.price_cents,
      status: "pending",
      stripe_session_id: session.id,
    },
  ]);

  return NextResponse.json({ url: session.url });
}
