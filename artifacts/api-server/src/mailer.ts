import { Resend } from 'resend';

const TO = 'info@aesthetix-systems.co.uk';
const FROM = 'Aesthetix Systems <notifications@aesthetix-systems.co.uk>';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendEnquiryEmail(data: {
  id: number;
  name: string;
  phone: string;
  handle?: string | null;
  businessType?: string | null;
  currentBookingMethod?: string | null;
  monthlyBookings?: string | null;
  painPoints?: string[] | null;
  style?: string | null;
  packageChoice?: string | null;
}) {
  const resend = getResend();
  if (!resend) return;

  const rows = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Instagram / Handle', data.handle || '—'],
    ['Business Type', data.businessType || '—'],
    ['Current Booking Method', data.currentBookingMethod || '—'],
    ['Monthly Bookings', data.monthlyBookings || '—'],
    ['Pain Points', data.painPoints?.join(', ') || '—'],
    ['Style Preference', data.style || '—'],
    ['Package Interest', data.packageChoice || '—'],
  ];

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:10px 14px;font-size:12px;font-weight:600;color:#8A8A8E;text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap;border-bottom:1px solid #E5DFD3;">${label}</td>
        <td style="padding:10px 14px;font-size:14px;color:#1A1A1C;border-bottom:1px solid #E5DFD3;">${value}</td>
      </tr>`)
    .join('');

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New Enquiry #${data.id} — ${data.name} (${data.packageChoice ?? 'package TBC'})`,
    html: `
      <div style="font-family:'Inter',system-ui,sans-serif;max-width:600px;margin:0 auto;background:#FDFAF5;">
        <div style="background:#1A1A1C;padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#C4A882;">Aesthetix Systems</p>
          <h1 style="margin:0;font-size:22px;color:#F7F4EE;font-weight:400;">New Quiz Enquiry</h1>
        </div>
        <div style="padding:24px 32px;">
          <table style="width:100%;border-collapse:collapse;border:1px solid #E5DFD3;border-radius:8px;overflow:hidden;">
            ${tableRows}
          </table>
          <div style="margin-top:24px;display:flex;gap:12px;">
            <a href="tel:${data.phone}" style="display:inline-block;background:#C4A882;color:#1A1A1C;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.06em;">Call ${data.name.split(' ')[0]}</a>
            ${data.handle ? `<a href="https://instagram.com/${data.handle.replace('@','')}" style="display:inline-block;background:transparent;color:#1A1A1C;padding:12px 24px;border-radius:999px;border:1.5px solid #E5DFD3;text-decoration:none;font-weight:600;font-size:13px;" target="_blank">View Instagram</a>` : ''}
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #E5DFD3;">
          <p style="margin:0;font-size:11px;color:#8A8A8E;">Enquiry #${data.id} · Received via aesthetix-systems.co.uk quiz</p>
        </div>
      </div>
    `,
  });
}

export async function sendDepositEmail(data: {
  id: number;
  name?: string | null;
  phone?: string | null;
  stripeSessionId: string;
  amountPence: number;
}) {
  const resend = getResend();
  if (!resend) return;

  const amount = `£${(data.amountPence / 100).toFixed(2)}`;

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `💳 New Deposit Initiated — ${data.name ?? 'Unknown'} (${amount})`,
    html: `
      <div style="font-family:'Inter',system-ui,sans-serif;max-width:600px;margin:0 auto;background:#FDFAF5;">
        <div style="background:#1A1A1C;padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#C4A882;">Aesthetix Systems</p>
          <h1 style="margin:0;font-size:22px;color:#F7F4EE;font-weight:400;">Build Slot Deposit Initiated</h1>
        </div>
        <div style="padding:24px 32px;">
          <table style="width:100%;border-collapse:collapse;border:1px solid #E5DFD3;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:10px 14px;font-size:12px;font-weight:600;color:#8A8A8E;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #E5DFD3;">Name</td>
              <td style="padding:10px 14px;font-size:14px;color:#1A1A1C;border-bottom:1px solid #E5DFD3;">${data.name ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-size:12px;font-weight:600;color:#8A8A8E;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #E5DFD3;">Phone</td>
              <td style="padding:10px 14px;font-size:14px;color:#1A1A1C;border-bottom:1px solid #E5DFD3;">${data.phone ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-size:12px;font-weight:600;color:#8A8A8E;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #E5DFD3;">Amount</td>
              <td style="padding:10px 14px;font-size:20px;color:#1A1A1C;font-weight:700;border-bottom:1px solid #E5DFD3;">${amount}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-size:12px;font-weight:600;color:#8A8A8E;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #E5DFD3;">Status</td>
              <td style="padding:10px 14px;font-size:14px;color:#C4A882;font-weight:600;border-bottom:1px solid #E5DFD3;">Initiated — awaiting Stripe confirmation</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-size:12px;font-weight:600;color:#8A8A8E;text-transform:uppercase;letter-spacing:0.08em;">Stripe Session</td>
              <td style="padding:10px 14px;font-size:11px;color:#4A4A4E;font-family:monospace;">${data.stripeSessionId}</td>
            </tr>
          </table>
          ${data.phone ? `<div style="margin-top:24px;"><a href="tel:${data.phone}" style="display:inline-block;background:#C4A882;color:#1A1A1C;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.06em;">Call ${data.name?.split(' ')[0] ?? 'Client'}</a></div>` : ''}
        </div>
        <div style="padding:16px 32px;border-top:1px solid #E5DFD3;">
          <p style="margin:0;font-size:11px;color:#8A8A8E;">Booking #${data.id} · Deposit initiated via aesthetix-systems.co.uk</p>
        </div>
      </div>
    `,
  });
}
