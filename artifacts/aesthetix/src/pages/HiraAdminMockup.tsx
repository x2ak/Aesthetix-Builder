const BODY = "'Inter Tight', system-ui, sans-serif";
const DISP = "'Instrument Serif', Georgia, serif";
const gold = '#C4A882';
const sidebarBg = '#F9F7F3';
const mainBg = '#FFFFFF';
const borderCol = '#EDE9E1';
const textDark = '#1A1A1C';
const textMid = '#4A4A4E';
const textMute = '#8A8A8E';

const bookings = [
  { client: 'Amara Patel',    treatment: 'Signature Russian Lips',   date: '31 May 2026', status: 'Confirmed' },
  { client: 'Jessica Chen',   treatment: 'Full Face Filler 3ml',     date: '30 May 2026', status: 'Completed' },
  { client: 'Sophie Williams',treatment: 'Foundation Botox',         date: '29 May 2026', status: 'Completed' },
  { client: 'Emma Taylor',    treatment: 'Skin Booster Course x3',   date: '4 Jun 2026',  status: 'Forms_pending' },
  { client: 'Layla Hassan',   treatment: '3 Area Anti-Wrinkle',      date: '1 Jun 2026',  status: 'Confirmed' },
  { client: 'Chloe Martin',   treatment: 'Profhilo Treatment',       date: '3 Jun 2026',  status: 'Awaiting_payment' },
  { client: 'Anya Roberts',   treatment: 'Dermal Filler Lips',       date: '6 Jun 2026',  status: 'Confirmed' },
];

const activity = [
  { status: 'Completed',        client: 'Jessica Chen',   detail: 'Full Face Filler 3ml',   amount: '£480', ago: '1d ago' },
  { status: 'Confirmed',        client: 'Amara Patel',    detail: 'Signature Russian Lips',  amount: '£350', ago: '2d ago' },
  { status: 'Awaiting_payment', client: 'Chloe Martin',   detail: 'Profhilo Treatment',      amount: '£320', ago: '3d ago' },
  { status: 'Forms_pending',    client: 'Emma Taylor',    detail: 'Skin Booster Course x3',  amount: '£420', ago: '4d ago' },
  { status: 'Completed',        client: 'Sophie Williams',detail: 'Foundation Botox',        amount: '£280', ago: '5d ago' },
];

const todayAppts = [
  { time: '09:30', client: 'Amara Patel',     treatment: 'Signature Russian Lips' },
  { time: '11:00', client: 'Sophie Williams', treatment: 'Foundation Botox' },
  { time: '13:30', client: 'Lauren Price',    treatment: '2 Area Anti-Wrinkle' },
  { time: '15:00', client: 'Chloe Martin',    treatment: 'Profhilo Treatment' },
  { time: '16:30', client: 'Anya Roberts',    treatment: 'Dermal Filler Lips' },
];

const revenue = [
  { label: 'Signature Russian Lips', amount: 2100, pct: 100 },
  { label: 'Foundation Botox',       amount: 1680, pct: 80  },
  { label: 'Full Face Filler',       amount: 1400, pct: 67  },
  { label: 'Skin Booster Course',    amount: 1260, pct: 60  },
  { label: 'Profhilo Treatment',     amount: 1050, pct: 50  },
  { label: '3 Area Anti-Wrinkle',    amount:  960, pct: 46  },
];

const navSections = [
  { label: 'OVERVIEW', items: ['Dashboard', 'Schedule', 'New Bookings', 'Availability'] },
  { label: 'BUSINESS', items: ['Abandoned', 'Clients', 'Treatments', 'Forms', 'Courses', 'Finance', 'Academy', 'Shop', 'Campaigns', 'Discount Codes'] },
  { label: 'SYSTEM',   items: ['Media', 'FAQ', 'AI Assistant', 'Settings'] },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    Confirmed:        { bg: '#EAF6EC', color: '#2D7A3A', label: 'Confirmed' },
    Completed:        { bg: '#F0F0F0', color: '#4A4A4E', label: 'Completed' },
    Forms_pending:    { bg: '#FFF8E1', color: '#A07800', label: 'Forms_pending' },
    Awaiting_payment: { bg: '#FEF0F0', color: '#B83232', label: 'Awaiting_payment' },
  };
  const s = map[status] ?? { bg: '#F0F0F0', color: '#4A4A4E', label: status };
  return (
    <span style={{ fontFamily: BODY, fontSize: 9, fontWeight: 400, background: s.bg, color: s.color, borderRadius: 4, padding: '2px 6px', whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
}

function DotStatus({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Completed: '#2D7A3A', Confirmed: '#2D7A3A', Awaiting_payment: '#B83232', Forms_pending: '#A07800',
  };
  return <span style={{ width: 7, height: 7, borderRadius: '50%', background: colors[status] ?? '#999', display: 'inline-block', flexShrink: 0 }} />;
}

export default function HiraAdminMockup() {
  return (
    <div style={{ display: 'flex', background: mainBg, fontFamily: BODY, fontSize: 11, overflow: 'hidden', minHeight: 540 }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width: 130, flexShrink: 0, background: sidebarBg, borderRight: `1px solid ${borderCol}`, display: 'flex', flexDirection: 'column', padding: '14px 0' }}>
        {/* Logo */}
        <div style={{ padding: '0 14px 16px', borderBottom: `1px solid ${borderCol}` }}>
          <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 13, color: textDark, margin: 0, lineHeight: 1.1 }}>HIRA</p>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7.5, letterSpacing: '0.18em', color: textMute, margin: '2px 0 0', textTransform: 'uppercase', lineHeight: 1 }}>AESTHETICS</p>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7, color: gold, margin: '3px 0 0', letterSpacing: '0.1em' }}>— HIRA AESTHETICS</p>
        </div>
        {/* Nav */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
          {navSections.map(sec => (
            <div key={sec.label} style={{ marginBottom: 10 }}>
              <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.16em', color: textMute, margin: '0 0 4px', padding: '0 14px' }}>{sec.label}</p>
              {sec.items.map(item => (
                <div key={item} style={{
                  padding: '4px 14px',
                  background: item === 'Dashboard' ? `rgba(196,168,130,0.12)` : 'transparent',
                  borderLeft: item === 'Dashboard' ? `2px solid ${gold}` : '2px solid transparent',
                }}>
                  <span style={{ fontSize: 10, color: item === 'Dashboard' ? textDark : textMid, fontWeight: item === 'Dashboard' ? 500 : 300 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Sign out */}
        <div style={{ padding: '10px 14px', borderTop: `1px solid ${borderCol}` }}>
          <span style={{ fontSize: 10, color: textMute, fontWeight: 300 }}>SIGN OUT</span>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ background: sidebarBg, borderBottom: `1px solid ${borderCol}`, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 18, color: textDark, margin: 0, flex: 1 }}>Dashboard</p>
          <div style={{ background: '#fff', border: `1px solid ${borderCol}`, borderRadius: 6, padding: '5px 10px', fontSize: 9.5, color: textMute, minWidth: 140 }}>
            Search clients, treatments...
          </div>
          <button style={{ fontFamily: BODY, fontSize: 9.5, background: 'none', border: `1px solid ${borderCol}`, borderRadius: 6, padding: '5px 10px', color: textMid, cursor: 'default' }}>EXPORT</button>
          <button style={{ fontFamily: BODY, fontSize: 9.5, background: gold, border: 'none', borderRadius: 6, padding: '5px 12px', color: '#fff', fontWeight: 500, cursor: 'default' }}>+ NEW BOOKING</button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Greeting card */}
          <div style={{ background: '#FAF8F4', border: `1px solid ${borderCol}`, borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 15, color: textDark, margin: '0 0 2px' }}>Good morning</p>
              <p style={{ fontSize: 9.5, color: textMute, margin: 0 }}>Thursday, 28 May 2026</p>
            </div>
            <span style={{ fontSize: 8, fontWeight: 500, letterSpacing: '0.12em', color: gold, textTransform: 'uppercase' }}>HIRA AESTHETICS</span>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { label: 'REVENUE THIS MONTH', value: '£8,450', sub: '↑ 62% vs last month' },
              { label: 'APPOINTMENTS',       value: '47',     sub: '+12 from last month' },
              { label: 'ACTIVE CLIENTS',     value: '89',     sub: '+11 new this month' },
              { label: 'AVG. SPEND',         value: '£184',   sub: '+£22 per visit' },
            ].map(c => (
              <div key={c.label} style={{ background: '#FAF8F4', border: `1px solid ${borderCol}`, borderRadius: 8, padding: '10px 12px' }}>
                <p style={{ fontSize: 7.5, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em', color: textMute, margin: '0 0 6px' }}>{c.label}</p>
                <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: textDark, margin: '0 0 4px', lineHeight: 1 }}>{c.value}</p>
                <p style={{ fontSize: 9, color: '#2D7A3A', margin: 0 }}>{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Abandoned */}
          <div style={{ background: '#FAF8F4', border: `1px solid ${borderCol}`, borderRadius: 8, padding: '10px 12px', display: 'inline-flex', gap: 20, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 7.5, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em', color: textMute, margin: '0 0 4px' }}>ABANDONED</p>
              <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: '#B83232', margin: '0 0 2px', lineHeight: 1 }}>3</p>
              <p style={{ fontSize: 9, color: textMute, margin: 0 }}>Awaiting recovery</p>
            </div>
          </div>

          {/* Recent bookings + Today */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 10 }}>

            {/* Recent Bookings */}
            <div style={{ background: '#FAF8F4', border: `1px solid ${borderCol}`, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${borderCol}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: textDark, margin: 0 }}>Recent Bookings</p>
                <span style={{ fontSize: 9, color: gold }}>View all →</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderCol}` }}>
                    {['CLIENT', 'TREATMENT', 'DATE', 'STATUS'].map(h => (
                      <th key={h} style={{ fontFamily: BODY, fontWeight: 400, fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em', color: textMute, padding: '7px 14px', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i} style={{ borderBottom: i < bookings.length - 1 ? `1px solid ${borderCol}` : 'none', background: i % 2 === 0 ? mainBg : '#FAF8F4' }}>
                      <td style={{ padding: '7px 14px', fontSize: 10, color: gold, fontWeight: 400 }}>{b.client}</td>
                      <td style={{ padding: '7px 14px', fontSize: 10, color: textDark, fontWeight: 500 }}>{b.treatment}</td>
                      <td style={{ padding: '7px 14px', fontSize: 10, color: textMid }}>{b.date}</td>
                      <td style={{ padding: '7px 14px' }}><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right column: Today + Activity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              {/* Today */}
              <div style={{ background: '#FAF8F4', border: `1px solid ${borderCol}`, borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: `1px solid ${borderCol}` }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: textDark, margin: 0 }}>
                    <span style={{ fontFamily: DISP, fontStyle: 'italic' }}>Today</span> — 28 May 2026
                  </p>
                </div>
                <div style={{ padding: '6px 0' }}>
                  {todayAppts.map((a, i) => (
                    <div key={i} style={{ padding: '5px 14px', display: 'flex', gap: 10, alignItems: 'flex-start', borderBottom: i < todayAppts.length - 1 ? `1px solid ${borderCol}` : 'none' }}>
                      <span style={{ fontSize: 9, color: gold, fontWeight: 500, minWidth: 30, flexShrink: 0, marginTop: 1 }}>{a.time}</span>
                      <div>
                        <p style={{ fontSize: 10, color: textDark, fontWeight: 500, margin: 0 }}>{a.client}</p>
                        <p style={{ fontSize: 9, color: textMute, margin: 0 }}>{a.treatment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ background: '#FAF8F4', border: `1px solid ${borderCol}`, borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: `1px solid ${borderCol}` }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: textDark, margin: 0 }}>Recent Activity</p>
                </div>
                <div style={{ padding: '6px 0' }}>
                  {activity.map((a, i) => (
                    <div key={i} style={{ padding: '5px 14px', display: 'flex', gap: 8, alignItems: 'flex-start', borderBottom: i < activity.length - 1 ? `1px solid ${borderCol}` : 'none' }}>
                      <DotStatus status={a.status} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 9.5, color: textMid, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <span style={{ color: textDark, fontWeight: 500 }}>{a.status}</span> — {a.client}
                        </p>
                        <p style={{ fontSize: 8.5, color: textMute, margin: 0 }}>{a.detail} · {a.amount} · {a.ago}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Revenue by Treatment */}
          <div style={{ background: '#FAF8F4', border: `1px solid ${borderCol}`, borderRadius: 8, padding: '12px 16px' }}>
            <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 13, color: textDark, margin: '0 0 12px' }}>Revenue by Treatment</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {revenue.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 9, color: textMid, minWidth: 130, flexShrink: 0 }}>{r.label}</span>
                  <div style={{ flex: 1, height: 10, background: borderCol, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${r.pct}%`, height: '100%', background: gold, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 9, color: textDark, fontWeight: 500, minWidth: 36, textAlign: 'right' }}>£{r.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
