import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getResend } from "@/lib/resend";
import { bookingConfirmationEmail } from "@/lib/emails/bookingConfirmation";
import { instructorNotificationEmail } from "@/lib/emails/instructorNotification";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe signature or webhook secret." },
      { status: 400 }
    );
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        { error: "No bookingId in session metadata." },
        { status: 400 }
      );
    }

    // Mark payment paid.
    await supabase
      .from("payments")
      .update({
        status: "paid",
        stripe_payment_intent_id: session.payment_intent as string | null,
        paid_at: new Date().toISOString(),
      })
      .eq("stripe_session_id", session.id);

    // Mark booking confirmed and fetch with service for the email.
    await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", bookingId);

    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    let service: { name: string; duration_minutes: number; price_cents: number } | null = null;
    if (booking?.service_id) {
      const { data: serviceRow } = await supabase
        .from("services")
        .select("*")
        .eq("id", booking.service_id)
        .maybeSingle();
      if (serviceRow) {
        service = {
          name: serviceRow.name,
          duration_minutes: serviceRow.duration_minutes,
          price_cents: serviceRow.price_cents,
        };
      }
    }

    // Send emails (best-effort — webhook still returns 200 on email failure).
    if (booking && service) {
      try {
        if (process.env.RESEND_API_KEY) {
          const resend = getResend();
          const from = process.env.RESEND_FROM_EMAIL ?? "bookings@rickysdriving.com";
          const instructorEmail = process.env.INSTRUCTOR_EMAIL;

          const confirmation = bookingConfirmationEmail({
            customerName: booking.customer_name,
            serviceName: service.name,
            scheduledAt: booking.scheduled_at,
            durationMinutes: service.duration_minutes,
            priceCents: service.price_cents,
          });

          await resend.emails.send({
            from,
            to: booking.customer_email,
            subject: confirmation.subject,
            html: confirmation.html,
          });

          if (instructorEmail) {
            const notif = instructorNotificationEmail({
              customerName: booking.customer_name,
              customerEmail: booking.customer_email,
              customerPhone: booking.customer_phone,
              serviceName: service.name,
              scheduledAt: booking.scheduled_at,
              durationMinutes: service.duration_minutes,
              priceCents: service.price_cents,
              notes: booking.notes,
            });
            await resend.emails.send({
              from,
              to: instructorEmail,
              subject: notif.subject,
              html: notif.html,
            });
          }
        }
      } catch (err) {
        console.error("Resend email failed:", err);
      }
    }

    return NextResponse.json({ received: true });
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      await supabase.from("bookings").update({ status: "cancelled" }).eq("id", bookingId);
      await supabase
        .from("payments")
        .update({ status: "refunded" })
        .eq("stripe_session_id", session.id);
    }

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ received: true, ignored: event.type });
}
