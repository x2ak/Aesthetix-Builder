import { useState, useEffect } from "react";

const BODY = "'Inter Tight', system-ui, sans-serif";
const DISP = "'Instrument Serif', Georgia, serif";
const gold = '#C4A882';
const charcoal = '#1A1A1C';
const cream = '#F7F4EE';
const line = '#E5DFD3';
const inkMute = '#8A8A8E';
const inkSoft = '#4A4A4E';
const goldTint = '#F5EDD9';

type Enquiry = {
  id: number;
  name: string;
  phone: string;
  handle: string | null;
  businessType: string | null;
  currentBookingMethod: string | null;
  monthlyBookings: string | null;
  painPoints: string[] | null;
  style: string | null;
  packageChoice: string | null;
  createdAt: string;
};

type SlotBooking = {
  id: number;
  name: string | null;
  phone: string | null;
  stripeSessionId: string | null;
  amountPence: number | null;
  status: string | null;
  createdAt: string;
};

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
        <path d="M14 7l4.5 11H9.5L14 7z" stroke={gold} strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <path d="M11 14.5h6" stroke={gold} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', color: charcoal }}>AESTHETIX</div>
        <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 8, letterSpacing: '0.22em', color: inkMute }}>SYSTEMS</div>
      </div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  const bg: Record<string, string> = { gold: goldTint, green: '#E8F5E9', red: '#FFEBEE', grey: '#F5F5F5' };
  const text: Record<string, string> = { gold: gold, green: '#388E3C', red: '#C62828', grey: inkMute };
  return (
    <span style={{
      fontFamily: BODY, fontSize: 11, fontWeight: 600,
      color: text[color] ?? inkMute, background: bg[color] ?? '#F5F5F5',
      border: `1px solid ${text[color] ?? inkMute}22`,
      borderRadius: 999, padding: '2px 10px',
    }}>
      {label}
    </span>
  );
}

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/* ─── Detail row helper ─── */
function DetailRow({ label, value, link }: { label: string; value: string | null | undefined; link?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: 14, borderBottom: `1px solid ${line}` }}>
      <span style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute }}>{label}</span>
      {link ? (
        <a href={link} style={{ fontFamily: BODY, fontSize: 15, fontWeight: 500, color: gold, textDecoration: 'none' }}>{value}</a>
      ) : (
        <span style={{ fontFamily: BODY, fontSize: 15, color: charcoal, fontWeight: 400 }}>{value}</span>
      )}
    </div>
  );
}

/* ─── Enquiry Detail Drawer ─── */
function EnquiryDrawer({ row, onClose }: { row: Enquiry; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,28,0.45)', zIndex: 200, backdropFilter: 'blur(2px)' }} />
      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: '100%', maxWidth: 420,
        background: '#FFFFFF', boxShadow: '-8px 0 40px rgba(26,26,28,0.12)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#FFFFFF', zIndex: 1 }}>
          <div>
            <p style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: gold, margin: '0 0 4px' }}>Enquiry #{row.id}</p>
            <h2 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: charcoal, margin: 0, fontWeight: 400 }}>{row.name}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: `1px solid ${line}`, borderRadius: 999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, color: inkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <DetailRow label="Phone" value={row.phone} link={`tel:${row.phone}`} />
          <DetailRow label="Instagram / Handle" value={row.handle} />
          <DetailRow label="Business Type" value={row.businessType} />
          <DetailRow label="Current Booking Method" value={row.currentBookingMethod} />
          <DetailRow label="Monthly Bookings" value={row.monthlyBookings} />
          {row.painPoints && row.painPoints.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: 14, borderBottom: `1px solid ${line}` }}>
              <span style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute }}>Pain Points</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {row.painPoints.map(p => (
                  <span key={p} style={{ fontFamily: BODY, fontSize: 12, background: goldTint, color: gold, borderRadius: 999, padding: '3px 10px', fontWeight: 500 }}>{p}</span>
                ))}
              </div>
            </div>
          )}
          <DetailRow label="Style Preference" value={row.style} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: 14, borderBottom: `1px solid ${line}` }}>
            <span style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute }}>Package Interest</span>
            <div style={{ marginTop: 4 }}>
              {row.packageChoice ? (
                <Badge
                  label={row.packageChoice}
                  color={row.packageChoice === 'Premium' ? 'gold' : row.packageChoice === 'Custom' ? 'grey' : 'green'}
                />
              ) : <span style={{ fontFamily: BODY, fontSize: 14, color: inkMute }}>—</span>}
            </div>
          </div>
          <DetailRow label="Submitted" value={fmt(row.createdAt)} />
        </div>

        {/* CTA */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${line}`, marginTop: 'auto', display: 'flex', gap: 10 }}>
          <a
            href={`tel:${row.phone}`}
            style={{ flex: 1, display: 'block', textAlign: 'center', fontFamily: BODY, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: charcoal, background: gold, padding: '13px', borderRadius: 999, textDecoration: 'none' }}
          >
            Call Now
          </a>
          {row.handle && (
            <a
              href={`https://instagram.com/${row.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, display: 'block', textAlign: 'center', fontFamily: BODY, fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: charcoal, background: 'transparent', border: `1.5px solid ${line}`, padding: '13px', borderRadius: 999, textDecoration: 'none' }}
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── Slot Booking Detail Drawer ─── */
function BookingDrawer({ row, onClose }: { row: SlotBooking; onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,28,0.45)', zIndex: 200, backdropFilter: 'blur(2px)' }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: '100%', maxWidth: 420,
        background: '#FFFFFF', boxShadow: '-8px 0 40px rgba(26,26,28,0.12)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#FFFFFF', zIndex: 1 }}>
          <div>
            <p style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: gold, margin: '0 0 4px' }}>Booking #{row.id}</p>
            <h2 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: charcoal, margin: 0, fontWeight: 400 }}>{row.name ?? 'Unknown'}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: `1px solid ${line}`, borderRadius: 999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, color: inkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <DetailRow label="Phone" value={row.phone} link={row.phone ? `tel:${row.phone}` : undefined} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: 14, borderBottom: `1px solid ${line}` }}>
            <span style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute }}>Amount Paid</span>
            <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 28, color: charcoal }}>£{((row.amountPence ?? 0) / 100).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 14, borderBottom: `1px solid ${line}` }}>
            <span style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute }}>Status</span>
            <div>
              <Badge
                label={row.status ?? 'unknown'}
                color={row.status === 'initiated' ? 'gold' : row.status === 'paid' ? 'green' : 'grey'}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: 14, borderBottom: `1px solid ${line}` }}>
            <span style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute }}>Stripe Session ID</span>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: inkSoft, wordBreak: 'break-all' }}>{row.stripeSessionId ?? '—'}</span>
          </div>
          <DetailRow label="Date" value={fmt(row.createdAt)} />
        </div>

        {row.phone && (
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${line}`, marginTop: 'auto' }}>
            <a
              href={`tel:${row.phone}`}
              style={{ display: 'block', textAlign: 'center', fontFamily: BODY, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: charcoal, background: gold, padding: '13px', borderRadius: 999, textDecoration: 'none' }}
            >
              Call Now
            </a>
          </div>
        )}
      </div>
    </>
  );
}

function LoginScreen({ onLogin }: { onLogin: (pwd: string) => void }) {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!pwd) return;
    setLoading(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      if (res.ok) {
        onLogin(pwd);
      } else {
        const data = await res.json();
        setErr(data.error ?? 'Incorrect password');
      }
    } catch {
      setErr('Connection error. Try again.');
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: charcoal, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
              <path d="M14 7l4.5 11H9.5L14 7z" stroke={gold} strokeWidth="1.3" strokeLinejoin="round" fill="none" />
              <path d="M11 14.5h6" stroke={gold} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: gold, margin: '0 0 8px' }}>Aesthetix Systems</p>
          <h1 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 32, color: cream, margin: 0, fontWeight: 400 }}>Admin Portal</h1>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '32px 28px' }}>
          <label style={{ fontFamily: BODY, fontSize: 11, fontWeight: 500, color: inkMute, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            Password
          </label>
          <input
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Enter admin password"
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8, padding: '12px 14px',
              fontFamily: BODY, fontSize: 14, color: cream,
              outline: 'none', marginBottom: err ? 8 : 20,
              transition: 'border-color 0.18s',
            }}
            onFocus={e => { e.target.style.borderColor = gold; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
          {err && (
            <p style={{ fontFamily: BODY, fontSize: 12, color: '#e57373', marginBottom: 16, marginTop: 0 }}>{err}</p>
          )}
          <button
            onClick={submit}
            disabled={loading || !pwd}
            style={{
              width: '100%', background: pwd ? gold : 'rgba(196,168,130,0.3)',
              color: pwd ? charcoal : 'rgba(196,168,130,0.5)',
              border: 'none', borderRadius: 999, padding: '13px',
              fontFamily: BODY, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em',
              cursor: pwd && !loading ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </div>
      </div>
    </div>
  );
}

function EnquiriesTab({ pwd }: { pwd: string }) {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetch('/api/admin/enquiries', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRows(data); else setErr(data.error ?? 'Error'); })
      .catch(() => setErr('Failed to load'))
      .finally(() => setLoading(false));
  }, [pwd]);

  if (loading) return <div style={{ fontFamily: BODY, color: inkMute, padding: 40, textAlign: 'center' }}>Loading…</div>;
  if (err) return <div style={{ fontFamily: BODY, color: '#c62828', padding: 40, textAlign: 'center' }}>{err}</div>;
  if (rows.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px 24px' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
      <p style={{ fontFamily: BODY, color: inkMute, fontSize: 15 }}>No enquiries yet. They'll appear here once someone submits the quiz.</p>
    </div>
  );

  return (
    <>
      {selected && <EnquiryDrawer row={selected} onClose={() => setSelected(null)} />}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: BODY }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${line}` }}>
              {['#', 'Name', 'Phone', 'Handle', 'Business', 'Package', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.id}
                onClick={() => setSelected(r)}
                style={{ borderBottom: `1px solid ${line}`, background: i % 2 === 0 ? 'transparent' : '#FDFAF5', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => (e.currentTarget.style.background = goldTint)}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : '#FDFAF5')}
              >
                <td style={{ padding: '12px 14px', fontSize: 12, color: inkMute }}>{r.id}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: charcoal, whiteSpace: 'nowrap' }}>{r.name}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: gold }}>
                  {r.phone}
                </td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: inkMute }}>{r.handle ?? '—'}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: inkSoft }}>{r.businessType ?? '—'}</td>
                <td style={{ padding: '12px 14px' }}>
                  {r.packageChoice ? (
                    <Badge
                      label={r.packageChoice}
                      color={r.packageChoice === 'Premium' ? 'gold' : r.packageChoice === 'Custom' ? 'grey' : 'green'}
                    />
                  ) : '—'}
                </td>
                <td style={{ padding: '12px 14px', fontSize: 11, color: inkMute, whiteSpace: 'nowrap' }}>{fmt(r.createdAt)}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, color: gold, letterSpacing: '0.06em' }}>View →</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SlotBookingsTab({ pwd }: { pwd: string }) {
  const [rows, setRows] = useState<SlotBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [selected, setSelected] = useState<SlotBooking | null>(null);

  useEffect(() => {
    fetch('/api/admin/slot-bookings', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRows(data); else setErr(data.error ?? 'Error'); })
      .catch(() => setErr('Failed to load'))
      .finally(() => setLoading(false));
  }, [pwd]);

  if (loading) return <div style={{ fontFamily: BODY, color: inkMute, padding: 40, textAlign: 'center' }}>Loading…</div>;
  if (err) return <div style={{ fontFamily: BODY, color: '#c62828', padding: 40, textAlign: 'center' }}>{err}</div>;
  if (rows.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px 24px' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>💳</div>
      <p style={{ fontFamily: BODY, color: inkMute, fontSize: 15 }}>No deposit bookings yet. They'll appear when someone clicks to pay their slot deposit.</p>
    </div>
  );

  return (
    <>
      {selected && <BookingDrawer row={selected} onClose={() => setSelected(null)} />}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: BODY }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${line}` }}>
              {['#', 'Name', 'Phone', 'Amount', 'Status', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.id}
                onClick={() => setSelected(r)}
                style={{ borderBottom: `1px solid ${line}`, background: i % 2 === 0 ? 'transparent' : '#FDFAF5', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => (e.currentTarget.style.background = goldTint)}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : '#FDFAF5')}
              >
                <td style={{ padding: '12px 14px', fontSize: 12, color: inkMute }}>{r.id}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: charcoal }}>{r.name ?? '—'}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: gold }}>{r.phone ?? '—'}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: charcoal }}>
                  £{((r.amountPence ?? 0) / 100).toFixed(2)}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <Badge
                    label={r.status ?? 'unknown'}
                    color={r.status === 'initiated' ? 'gold' : r.status === 'paid' ? 'green' : 'grey'}
                  />
                </td>
                <td style={{ padding: '12px 14px', fontSize: 11, color: inkMute, whiteSpace: 'nowrap' }}>{fmt(r.createdAt)}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, color: gold, letterSpacing: '0.06em' }}>View →</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function Admin() {
  const [pwd, setPwd] = useState<string | null>(() => sessionStorage.getItem('aesthetix_admin_key'));
  const [tab, setTab] = useState<'enquiries' | 'bookings'>('enquiries');
  const [enquiryCount, setEnquiryCount] = useState<number | null>(null);
  const [bookingCount, setBookingCount] = useState<number | null>(null);

  useEffect(() => {
    if (!pwd) return;
    fetch('/api/admin/enquiries', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json()).then(d => Array.isArray(d) && setEnquiryCount(d.length)).catch(() => {});
    fetch('/api/admin/slot-bookings', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json()).then(d => Array.isArray(d) && setBookingCount(d.length)).catch(() => {});
  }, [pwd]);

  function handleLogin(password: string) {
    sessionStorage.setItem('aesthetix_admin_key', password);
    setPwd(password);
  }

  function handleLogout() {
    sessionStorage.removeItem('aesthetix_admin_key');
    setPwd(null);
  }

  function goToTab(t: 'enquiries' | 'bookings') {
    setTab(t);
    setTimeout(() => {
      document.getElementById('admin-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  if (!pwd) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={{ minHeight: '100vh', background: cream, fontFamily: BODY }}>
      {/* Top bar */}
      <div style={{ background: '#FFFFFF', borderBottom: `1px solid ${line}`, padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute }}>Admin Portal</span>
            <button
              onClick={handleLogout}
              style={{ fontFamily: BODY, fontSize: 12, color: inkMute, background: 'none', border: `1px solid ${line}`, borderRadius: 999, padding: '5px 14px', cursor: 'pointer' }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 80px' }}>
        {/* Clickable Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          {/* Total Enquiries */}
          <button
            onClick={() => goToTab('enquiries')}
            style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 14, padding: '20px 22px', textAlign: 'left', cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(196,168,130,0.18)`; (e.currentTarget as HTMLElement).style.borderColor = gold; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = line; }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>📋</div>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: charcoal, marginBottom: 2 }}>{enquiryCount ?? '…'}</div>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: charcoal, marginBottom: 2 }}>Total Enquiries</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute, marginBottom: 10 }}>Quiz submissions</div>
            <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, color: gold, letterSpacing: '0.06em' }}>View all →</div>
          </button>

          {/* Slot Bookings */}
          <button
            onClick={() => goToTab('bookings')}
            style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 14, padding: '20px 22px', textAlign: 'left', cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(196,168,130,0.18)`; (e.currentTarget as HTMLElement).style.borderColor = gold; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = line; }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>💳</div>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: charcoal, marginBottom: 2 }}>{bookingCount ?? '…'}</div>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: charcoal, marginBottom: 2 }}>Slot Bookings</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute, marginBottom: 10 }}>Deposit initiated</div>
            <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, color: gold, letterSpacing: '0.06em' }}>View all →</div>
          </button>

          {/* Deposit Value — not clickable, just info */}
          <div style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>💰</div>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: charcoal, marginBottom: 2 }}>
              {bookingCount !== null ? `£${(bookingCount * 99).toLocaleString()}` : '…'}
            </div>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: charcoal, marginBottom: 2 }}>Deposit Value</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>At £99 each</div>
          </div>
        </div>

        {/* Tabs */}
        <div id="admin-tabs" style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ borderBottom: `1px solid ${line}`, display: 'flex', padding: '0 24px' }}>
            {(['enquiries', 'bookings'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: BODY, fontSize: 13, fontWeight: 600,
                  color: tab === t ? charcoal : inkMute,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '16px 20px', marginRight: 4,
                  borderBottom: `2px solid ${tab === t ? gold : 'transparent'}`,
                  transition: 'color 0.15s, border-color 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {t === 'enquiries' ? `Quiz Enquiries ${enquiryCount !== null ? `(${enquiryCount})` : ''}` : `Slot Bookings ${bookingCount !== null ? `(${bookingCount})` : ''}`}
              </button>
            ))}
          </div>

          <div style={{ padding: 0 }}>
            {tab === 'enquiries' ? <EnquiriesTab key={pwd} pwd={pwd} /> : <SlotBookingsTab key={pwd} pwd={pwd} />}
          </div>
        </div>
      </div>
    </div>
  );
}
