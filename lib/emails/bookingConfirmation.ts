interface Params {
  customerName: string;
  serviceName: string;
  scheduledAt: string; // ISO
  durationMinutes: number;
  priceCents: number;
}

export function bookingConfirmationEmail({
  customerName,
  serviceName,
  scheduledAt,
  durationMinutes,
  priceCents,
}: Params) {
  const date = new Date(scheduledAt);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  });
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceCents / 100);

  const subject = `Your lesson is confirmed — ${dateStr}`;

  const html = `
<!doctype html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#F8F8F6;margin:0;padding:32px 16px;color:#0A1628;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(10,22,40,0.08);">
    <tr><td style="background:#0A1628;padding:32px 32px 28px;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;font-weight:700;">Ricky's Driving</p>
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;line-height:1.1;">You're booked, ${customerName}!</h1>
    </td></tr>
    <tr><td style="padding:28px 32px;">
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#374151;">
        Your lesson is confirmed. Below is everything you need — Ricky will text you
        the morning of your lesson to confirm pickup details.
      </p>
      <table cellpadding="0" cellspacing="0" style="width:100%;background:#F8F8F6;border-radius:12px;padding:20px;border:1px solid #eaeaea;">
        <tr><td style="padding:6px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Package</td></tr>
        <tr><td style="padding:0 0 14px;font-size:17px;color:#0A1628;font-weight:700;">${serviceName}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Date & time</td></tr>
        <tr><td style="padding:0 0 14px;font-size:17px;color:#0A1628;font-weight:700;">${dateStr}<br/><span style="color:#a8872e;">${timeStr} PT</span></td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Duration</td></tr>
        <tr><td style="padding:0 0 14px;font-size:17px;color:#0A1628;font-weight:700;">${durationMinutes} minutes</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Paid</td></tr>
        <tr><td style="padding:0;font-size:17px;color:#0A1628;font-weight:700;">${price}</td></tr>
      </table>
      <h3 style="margin:28px 0 8px;font-size:15px;color:#0A1628;">What to bring</h3>
      <ul style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.7;">
        <li>Your learner's permit (required by California law)</li>
        <li>Closed-toe shoes</li>
        <li>Water bottle</li>
        <li>Any questions you've been saving up</li>
      </ul>
      <p style="margin:24px 0 0;font-size:14px;color:#374151;line-height:1.6;">
        Need to reschedule? Reply to this email or text Ricky directly.
        Reschedules are free up to 24 hours before your lesson.
      </p>
    </td></tr>
    <tr><td style="background:#F8F8F6;padding:18px 32px;text-align:center;font-size:12px;color:#9CA3AF;border-top:1px solid #eaeaea;">
      Ricky's Driving · Orange County, CA
    </td></tr>
  </table>
</body></html>
  `.trim();

  return { subject, html };
}
