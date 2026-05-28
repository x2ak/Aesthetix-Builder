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
const surface = '#FDFAF5';

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
  const bg: Record<string, string> = {
    gold: goldTint, green: '#E8F5E9', red: '#FFEBEE', grey: '#F5F5F5',
  };
  const text: Record<string, string> = {
    gold: gold, green: '#388E3C', red: '#C62828', grey: inkMute,
  };
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
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: BODY }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${line}` }}>
            {['#', 'Name', 'Phone', 'Handle', 'Business', 'Booking Method', 'Volume', 'Style', 'Package', 'Date'].map(h => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} style={{ borderBottom: `1px solid ${line}`, background: i % 2 === 0 ? 'transparent' : '#FDFAF5' }}>
              <td style={{ padding: '12px 14px', fontSize: 12, color: inkMute }}>{r.id}</td>
              <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: charcoal, whiteSpace: 'nowrap' }}>{r.name}</td>
              <td style={{ padding: '12px 14px', fontSize: 13, color: inkSoft }}>
                <a href={`tel:${r.phone}`} style={{ color: gold, textDecoration: 'none' }}>{r.phone}</a>
              </td>
              <td style={{ padding: '12px 14px', fontSize: 12, color: inkMute }}>{r.handle ?? '—'}</td>
              <td style={{ padding: '12px 14px', fontSize: 12, color: inkSoft }}>{r.businessType ?? '—'}</td>
              <td style={{ padding: '12px 14px', fontSize: 12, color: inkSoft, whiteSpace: 'nowrap' }}>{r.currentBookingMethod ?? '—'}</td>
              <td style={{ padding: '12px 14px', fontSize: 12, color: inkSoft }}>{r.monthlyBookings ?? '—'}</td>
              <td style={{ padding: '12px 14px', fontSize: 12, color: inkSoft }}>{r.style ?? '—'}</td>
              <td style={{ padding: '12px 14px' }}>
                {r.packageChoice ? (
                  <Badge
                    label={r.packageChoice}
                    color={r.packageChoice === 'Premium' ? 'gold' : r.packageChoice === 'Custom' ? 'grey' : 'green'}
                  />
                ) : '—'}
              </td>
              <td style={{ padding: '12px 14px', fontSize: 11, color: inkMute, whiteSpace: 'nowrap' }}>{fmt(r.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SlotBookingsTab({ pwd }: { pwd: string }) {
  const [rows, setRows] = useState<SlotBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

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
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: BODY }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${line}` }}>
            {['#', 'Name', 'Phone', 'Amount', 'Status', 'Stripe Session', 'Date'].map(h => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} style={{ borderBottom: `1px solid ${line}`, background: i % 2 === 0 ? 'transparent' : '#FDFAF5' }}>
              <td style={{ padding: '12px 14px', fontSize: 12, color: inkMute }}>{r.id}</td>
              <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: charcoal }}>{r.name ?? '—'}</td>
              <td style={{ padding: '12px 14px', fontSize: 13, color: inkSoft }}>
                {r.phone ? <a href={`tel:${r.phone}`} style={{ color: gold, textDecoration: 'none' }}>{r.phone}</a> : '—'}
              </td>
              <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: charcoal }}>
                £{((r.amountPence ?? 0) / 100).toFixed(2)}
              </td>
              <td style={{ padding: '12px 14px' }}>
                <Badge
                  label={r.status ?? 'unknown'}
                  color={r.status === 'initiated' ? 'gold' : r.status === 'paid' ? 'green' : 'grey'}
                />
              </td>
              <td style={{ padding: '12px 14px', fontSize: 11, color: inkMute, fontFamily: 'monospace', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.stripeSessionId ?? '—'}
              </td>
              <td style={{ padding: '12px 14px', fontSize: 11, color: inkMute, whiteSpace: 'nowrap' }}>{fmt(r.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          {[
            { label: 'Total Enquiries', value: enquiryCount ?? '…', icon: '📋', sub: 'Quiz submissions' },
            { label: 'Slot Bookings', value: bookingCount ?? '…', icon: '💳', sub: 'Deposit initiated' },
            { label: 'Deposit Value', value: bookingCount !== null ? `£${(bookingCount * 99).toLocaleString()}` : '…', icon: '💰', sub: 'At £99 each' },
          ].map(s => (
            <div key={s.label} style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 14, padding: '20px 22px' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: charcoal, marginBottom: 2 }}>{String(s.value)}</div>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: charcoal, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 16, overflow: 'hidden' }}>
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
