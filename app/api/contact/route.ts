import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (name.length > 120 || message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const instructorEmail = process.env.INSTRUCTOR_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "bookings@rickysdriving.com";

  if (!process.env.RESEND_API_KEY || !instructorEmail) {
    // Resend not configured — log and acknowledge so the form still feels
    // responsive in development. In production these env vars must be set.
    console.warn(
      "[contact] RESEND_API_KEY or INSTRUCTOR_EMAIL not configured — message not delivered:",
      { name, email, phone, messagePreview: message.slice(0, 120) }
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = getResend();

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "—";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const html = `
<!doctype html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#F8F8F6;margin:0;padding:32px 16px;color:#0A1628;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(10,22,40,0.08);">
    <tr><td style="background:#0A1628;padding:24px 28px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;font-weight:700;">New website message</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:900;">From ${safeName}</h1>
    </td></tr>
    <tr><td style="padding:24px 28px;">
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr><td style="padding:6px 0;font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;width:100px;">Email</td>
            <td style="padding:6px 0;font-size:14px;color:#0A1628;"><a href="mailto:${safeEmail}" style="color:#a8872e;text-decoration:none;">${safeEmail}</a></td></tr>
        <tr><td style="padding:6px 0;font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</td>
            <td style="padding:6px 0;font-size:14px;color:#0A1628;">${safePhone}</td></tr>
      </table>
      <div style="background:#F8F8F6;border-left:3px solid #C9A84C;padding:16px 20px;border-radius:8px;color:#374151;font-size:14px;line-height:1.6;">
        ${safeMessage}
      </div>
    </td></tr>
  </table>
</body></html>
    `.trim();

    await resend.emails.send({
      from,
      to: instructorEmail,
      replyTo: email,
      subject: `New message from ${name}`,
      html,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Resend send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again or email directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
