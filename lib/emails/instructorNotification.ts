interface Params {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  scheduledAt: string;
  durationMinutes: number;
  priceCents: number;
  notes: string | null;
}

export function instructorNotificationEmail({
  customerName,
  customerEmail,
  customerPhone,
  serviceName,
  scheduledAt,
  durationMinutes,
  priceCents,
  notes,
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

  const subject = `New booking — ${customerName} · ${dateStr}`;

  const html = `
<!doctype html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#F8F8F6;margin:0;padding:32px 16px;color:#0A1628;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(10,22,40,0.08);">
    <tr><td style="background:#C9A84C;padding:24px 28px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#0A1628;text-transform:uppercase;font-weight:700;">New booking</p>
      <h1 style="margin:0;color:#0A1628;font-size:24px;font-weight:900;">${dateStr}</h1>
      <p style="margin:4px 0 0;color:#0A1628;font-size:18px;font-weight:700;">${timeStr} PT</p>
    </td></tr>
    <tr><td style="padding:24px 28px;">
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;width:120px;">Student</td>
            <td style="padding:8px 0;font-size:15px;color:#0A1628;font-weight:600;">${customerName}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</td>
            <td style="padding:8px 0;font-size:15px;color:#0A1628;"><a href="mailto:${customerEmail}" style="color:#a8872e;text-decoration:none;">${customerEmail}</a></td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</td>
            <td style="padding:8px 0;font-size:15px;color:#0A1628;"><a href="tel:${customerPhone}" style="color:#a8872e;text-decoration:none;">${customerPhone}</a></td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Package</td>
            <td style="padding:8px 0;font-size:15px;color:#0A1628;font-weight:600;">${serviceName} · ${durationMinutes} min</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Paid</td>
            <td style="padding:8px 0;font-size:15px;color:#0A1628;font-weight:600;">${price}</td></tr>
        ${
          notes
            ? `<tr><td style="padding:8px 0;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;vertical-align:top;">Notes</td>
              <td style="padding:8px 0;font-size:14px;color:#374151;line-height:1.6;font-style:italic;">"${notes}"</td></tr>`
            : ""
        }
      </table>
    </td></tr>
  </table>
</body></html>
  `.trim();

  return { subject, html };
}
