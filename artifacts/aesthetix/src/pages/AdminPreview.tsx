import { useEffect } from "react";

const BODY = "'Inter Tight', system-ui, sans-serif";
const DISP = "'Instrument Serif', Georgia, serif";

type Props = { client: 'starr' | 'dermadoll' | 'flawlessskin' };
type WeekSlot = { label: string; full: boolean; closed?: boolean };

const CONFIGS = {
  starr: {
    name: 'Starr Beauty',
    sub: 'BEAUTY',
    bg: '#FAF4F6',
    sidebar: '#5C1325',
    accent: '#C4A44A',
    accentLight: '#F9EFD4',
    textLight: '#FAF4F6',
    stats: [
      { label: 'Total Revenue (This Month)', value: '£3,240', sub: '22 bookings' },
      { label: 'Deposits Collected', value: '£780', sub: 'confirmed' },
      { label: 'Balance Outstanding', value: '£1,820', sub: 'awaiting payment' },
      { label: 'Total Clients', value: '47', sub: 'registered' },
    ],
    clients: [
      { name: 'Client A', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 5, spent: '£720', location: 'Hornchurch' },
      { name: 'Client B', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 3, spent: '£480', location: 'Marylebone' },
      { name: 'Client C', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 2, spent: '£320', location: 'Hornchurch' },
      { name: 'Client D', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 1, spent: '£140', location: 'Marylebone' },
    ],
    bookings: [
      { client: 'Client A', treat: 'Russian Lips', date: '14 May', dep: '£50', status: 'Confirmed' },
      { client: 'Client B', treat: 'Cheek Filler', date: '13 May', dep: '£60', status: 'Complete' },
      { client: 'Client C', treat: 'Botox 2 Areas', date: '12 May', dep: '£40', status: 'Complete' },
      { client: 'Client D', treat: 'Russian Lips', date: '16 May', dep: '£50', status: 'Confirmed' },
      { client: 'Client E', treat: 'Lip Flip', date: '11 May', dep: '£25', status: 'Complete' },
    ],
    nav: ['Dashboard', 'Bookings', 'Clients', 'Treatments', 'Locations', 'Availability', 'Finance', 'Settings'],
    weekLabel: 'Hornchurch',
    week: [
      { label: '3 booked', full: false },
      { label: '5 booked', full: true },
      { label: '4 booked', full: false },
      { label: '3 booked', full: false },
      { label: '4 booked', full: false },
      { label: '5 booked', full: true },
      { label: 'Closed', full: false, closed: true },
    ],
  },
  dermadoll: {
    name: 'Dermadoll',
    sub: 'AESTHETICS',
    bg: '#F8F5F0',
    sidebar: '#1C1A18',
    accent: '#B89A6A',
    accentLight: '#F5EDD9',
    textLight: '#F7F4EE',
    stats: [
      { label: 'Total Revenue (This Month)', value: '£780', sub: '11 bookings' },
      { label: 'Deposits Collected', value: '£300', sub: 'confirmed' },
      { label: 'Balance Outstanding', value: '£480', sub: 'awaiting payment' },
      { label: 'Total Clients', value: '23', sub: 'registered' },
    ],
    clients: [
      { name: 'Client A', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 1, spent: '£140', location: 'Birmingham' },
      { name: 'Client B', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 2, spent: '£0', location: 'Solihull' },
      { name: 'Client C', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 1, spent: '£0', location: 'Birmingham' },
      { name: 'Client D', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 1, spent: '£0', location: 'Birmingham' },
    ],
    bookings: [
      { client: 'Client A', treat: 'Botox 2 Areas', date: '28 Apr', dep: '£50', status: 'Confirmed' },
      { client: 'Client B', treat: 'Consultation', date: '28 Apr', dep: 'Free', status: 'Complete' },
      { client: 'Client C', treat: 'Consultation', date: '22 Apr', dep: 'Free', status: 'Complete' },
      { client: 'Client D', treat: 'Consultation', date: '02 May', dep: 'Free', status: 'Confirmed' },
    ],
    nav: ['Dashboard', 'Bookings', 'Clients', 'Treatments', 'Finance', 'Settings'],
    weekLabel: 'Birmingham & Solihull',
    week: [
      { label: '2 booked', full: false },
      { label: '3 booked', full: true },
      { label: '2 booked', full: false },
      { label: '2 booked', full: false },
      { label: '1 booked', full: false },
      { label: '3 booked', full: true },
      { label: 'Closed', full: false, closed: true },
    ],
  },
  flawlessskin: {
    name: 'FlawlessSkin',
    sub: '',
    bg: '#F4F7F2',
    sidebar: '#2A3A28',
    accent: '#5C7A54',
    accentLight: '#EAF1E8',
    textLight: '#F7F4EE',
    stats: [
      { label: 'Total Revenue (This Month)', value: '£2,310', sub: '27 bookings' },
      { label: 'Deposits Collected', value: '£560', sub: 'via Stripe' },
      { label: 'Balance Outstanding', value: '£1,480', sub: 'awaiting payment' },
      { label: 'Total Clients', value: '31', sub: 'registered' },
    ],
    clients: [
      { name: 'Client A', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 4, spent: '£480', location: 'Hall Green' },
      { name: 'Client B', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 3, spent: '£345', location: 'Hall Green' },
      { name: 'Client C', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 2, spent: '£295', location: 'Hall Green' },
      { name: 'Client D', email: 'client@•••••.com', phone: '07XXX XXX XXX', visits: 1, spent: '£215', location: 'Hall Green' },
    ],
    bookings: [
      { client: 'Client A', treat: 'PRP + Exosomes', date: '14 May', dep: '£25', status: 'Confirmed' },
      { client: 'Client B', treat: 'Exosome Glass Skin', date: '12 May', dep: '£25', status: 'Complete' },
      { client: 'Client C', treat: 'AC Stem Cell Acne', date: '11 May', dep: '£25', status: 'Complete' },
      { client: 'Client D', treat: 'Salmon DNA x3', date: '09 May', dep: '£25', status: 'Complete' },
      { client: 'Client E', treat: 'PRP Vampire Facial', date: '16 May', dep: '£25', status: 'Confirmed' },
    ],
    nav: ['Dashboard', 'Bookings', 'Treatments', 'Availability', 'Settings'],
    weekLabel: 'Hall Green, Birmingham',
    week: [
      { label: '2 booked', full: false },
      { label: '3 booked', full: true },
      { label: '4 booked', full: true },
      { label: '2 booked', full: false },
      { label: '4 booked', full: true },
      { label: '5 booked', full: true },
      { label: '1 booked', full: false },
    ],
  },
};

export default function AdminPreview({ client }: Props) {
  const cfg = CONFIGS[client];

  useEffect(() => {
    document.title = `${cfg.name} Admin Portal — Preview`;
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: BODY, background: cfg.sidebar }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: cfg.sidebar, display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)' }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 18, color: cfg.textLight, margin: 0, lineHeight: 1.1 }}>{cfg.name}</p>
          {cfg.sub && <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 8, letterSpacing: '0.2em', color: cfg.accent, margin: '3px 0 0' }}>{cfg.sub}</p>}
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: 'rgba(255,255,255,0.3)', margin: '6px 0 0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin Portal</p>
        </div>
        {/* Nav */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {cfg.nav.map((item, i) => (
            <div key={item} style={{
              padding: '10px 20px',
              display: 'flex', alignItems: 'center', gap: 10,
              background: i === 0 ? `rgba(255,255,255,0.06)` : 'transparent',
              borderLeft: i === 0 ? `2px solid ${cfg.accent}` : '2px solid transparent',
              cursor: 'pointer',
            }}>
              <span style={{ fontFamily: BODY, fontWeight: i === 0 ? 400 : 300, fontSize: 12, color: i === 0 ? cfg.textLight : 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>{item}</span>
            </div>
          ))}
        </nav>
        {/* User */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: cfg.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, color: cfg.textLight }}>{cfg.name[0]}</span>
            </div>
            <div>
              <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, color: cfg.textLight, margin: 0 }}>Admin</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: 'rgba(255,255,255,0.35)', margin: 0 }}>owner@•••••.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, background: cfg.bg, overflowY: 'auto', padding: '28px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 20, color: '#1A1A1C', margin: 0 }}>Dashboard</h1>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: '#8A8A8E', margin: '4px 0 0' }}>Welcome back — here's your overview</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ background: cfg.accentLight, borderRadius: 8, padding: '6px 14px' }}>
              <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, color: cfg.accent }}>May 2026</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {cfg.stats.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '18px 20px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8A8A8E', margin: '0 0 8px' }}>{s.label}</p>
              <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 22, color: '#1A1A1C', margin: '0 0 4px' }}>{s.value}</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: cfg.accent, margin: 0 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {/* Recent Bookings */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)', padding: '20px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: '#1A1A1C', margin: 0 }}>Recent Bookings</h2>
              <span style={{ fontFamily: BODY, fontSize: 10, color: cfg.accent, cursor: 'pointer' }}>View all →</span>
            </div>
            {cfg.bookings.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Client', 'Treatment', 'Date', 'Deposit', 'Status'].map(h => (
                      <th key={h} style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A8A8E', textAlign: 'left', padding: '0 0 10px', borderBottom: '1px solid #F0EDE7' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cfg.bookings.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: '#1A1A1C', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{row.client}</td>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: '#4A4A4E', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{row.treat}</td>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: '#4A4A4E', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{row.date}</td>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: '#4A4A4E', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{row.dep}</td>
                      <td style={{ padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>
                        <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: row.status === 'Complete' ? '#8A8A8E' : '#4CAF50', background: row.status === 'Complete' ? '#F5F5F5' : '#E8F5E9', borderRadius: 4, padding: '3px 8px' }}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center' }}>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: '#8A8A8E' }}>Portal access pending</p>
              </div>
            )}
          </div>

          {/* Client Database */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)', padding: '20px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: '#1A1A1C', margin: 0 }}>Client Database</h2>
              <span style={{ fontFamily: BODY, fontSize: 10, color: cfg.accent, cursor: 'pointer' }}>View all →</span>
            </div>
            {cfg.clients.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Name', 'Contact', 'Visits', 'Spent', 'Location'].map(h => (
                      <th key={h} style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A8A8E', textAlign: 'left', padding: '0 0 10px', borderBottom: '1px solid #F0EDE7' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cfg.clients.map((c, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: '#1A1A1C', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{c.name}</td>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: '#8A8A8E', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>
                        <div style={{ filter: 'blur(5px)', userSelect: 'none' }}>client@•••.com</div>
                      </td>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: '#4A4A4E', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{c.visits}</td>
                      <td style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, color: cfg.accent, padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{c.spent}</td>
                      <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: '#4A4A4E', padding: '10px 0', borderBottom: '1px solid #F7F4EE' }}>{c.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center' }}>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: '#8A8A8E' }}>Admin login pending</p>
              </div>
            )}
          </div>
        </div>

        {/* Calendar availability strip */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)', padding: '20px 20px' }}>
          <h2 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: '#1A1A1C', margin: '0 0 14px' }}>
            This Week — {cfg.weekLabel}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const slot = cfg.week[i] as WeekSlot;
              const bg = slot.closed ? '#F0EDE7' : slot.full ? cfg.accent : slot.label === 'Open' ? '#F7F4EE' : cfg.accentLight;
              const col = slot.closed ? '#C0BDB8' : slot.full ? '#fff' : slot.label === 'Open' ? '#8A8A8E' : cfg.accent;
              return (
                <div key={day} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A8A8E', margin: '0 0 8px' }}>{day}</p>
                  <div style={{ background: bg, borderRadius: 6, padding: '8px 4px', minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: BODY, fontWeight: slot.full ? 400 : 300, fontSize: 10, color: col }}>{slot.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PII notice */}
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: '#C0BDB8', textAlign: 'center', marginTop: 16, letterSpacing: '0.06em' }}>
          Client contact details blurred for privacy · Real booking and finance data
        </p>
      </main>
    </div>
  );
}
