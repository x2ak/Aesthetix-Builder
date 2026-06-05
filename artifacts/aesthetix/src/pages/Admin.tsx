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

type SeoKeywordPosition = {
  id: number;
  keyword: string;
  ourPath: string;
  ourPosition: number | null;
  competitors: Array<{ rank: number; url: string; title: string; description: string }>;
  suggestedTitle: string | null;
  suggestedDescription: string | null;
  analyzedAt: string;
};

type SeoMetaOverride = {
  id: number;
  path: string;
  title: string;
  metaDescription: string;
  reason: string | null;
  ourPreviousRank: number | null;
  updatedAt: string;
};

type SeoCrawlRun = {
  id: number;
  runAt: string;
  totalPages: number;
  pagesOk: number;
  pagesFailed: number;
  googlePinged: boolean;
  durationMs: number | null;
};

type SeoPageResult = {
  id: number;
  runId: number;
  url: string;
  statusCode: number | null;
  responseTimeMs: number | null;
  hasTitle: boolean;
  title: string | null;
  hasMetaDescription: boolean;
  metaDescription: string | null;
  hasCanonical: boolean;
  hasOgTitle: boolean;
  hasSchema: boolean;
  isNoindex: boolean;
  issues: string[];
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

function SeoTab({ pwd }: { pwd: string }) {
  const [runs, setRuns] = useState<SeoCrawlRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [selectedRun, setSelectedRun] = useState<SeoCrawlRun | null>(null);
  const [pages, setPages] = useState<SeoPageResult[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [crawlMsg, setCrawlMsg] = useState('');

  function loadRuns() {
    setLoading(true);
    fetch('/api/admin/seo/runs', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRuns(data); else setErr(data.error ?? 'Error'); })
      .catch(() => setErr('Failed to load'))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadRuns(); }, [pwd]);

  function selectRun(run: SeoCrawlRun) {
    setSelectedRun(run);
    setPages([]);
    setPagesLoading(true);
    fetch(`/api/admin/seo/runs/${run.id}/pages`, { headers: { 'x-admin-key': pwd } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPages(data); })
      .catch(() => {})
      .finally(() => setPagesLoading(false));
  }

  async function triggerCrawl() {
    setCrawling(true);
    setCrawlMsg('Crawling all pages… this takes about 30 seconds.');
    try {
      const res = await fetch('/api/admin/seo/crawl', { method: 'POST', headers: { 'x-admin-key': pwd } });
      const data = await res.json();
      if (data.ok) {
        setCrawlMsg('Crawl complete! Refreshing…');
        loadRuns();
      } else {
        setCrawlMsg(`Error: ${data.error}`);
      }
    } catch {
      setCrawlMsg('Failed to trigger crawl.');
    }
    setTimeout(() => { setCrawling(false); setCrawlMsg(''); }, 3000);
  }

  if (loading) return <div style={{ fontFamily: BODY, color: inkMute, padding: 40, textAlign: 'center' }}>Loading…</div>;
  if (err) return <div style={{ fontFamily: BODY, color: '#c62828', padding: 40, textAlign: 'center' }}>{err}</div>;

  const latest = runs[0];

  return (
    <div style={{ padding: 24 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontFamily: BODY, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: gold, margin: '0 0 4px' }}>SEO Crawler</p>
          <h2 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: charcoal, margin: 0, fontWeight: 400 }}>
            {latest ? `Last crawl: ${new Date(latest.runAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}` : 'No crawls yet'}
          </h2>
        </div>
        <button
          onClick={triggerCrawl}
          disabled={crawling}
          style={{
            fontFamily: BODY, fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
            background: crawling ? 'rgba(196,168,130,0.3)' : gold, color: crawling ? 'rgba(196,168,130,0.6)' : charcoal,
            border: 'none', borderRadius: 999, padding: '10px 22px', cursor: crawling ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
          }}
        >
          {crawling ? 'Crawling…' : 'Run Crawl Now'}
        </button>
      </div>
      {crawlMsg && (
        <div style={{ fontFamily: BODY, fontSize: 13, color: inkSoft, background: goldTint, border: `1px solid ${line}`, borderRadius: 8, padding: '10px 16px', marginBottom: 20 }}>
          {crawlMsg}
        </div>
      )}

      {/* Latest summary cards */}
      {latest && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '✅', val: latest.pagesOk, label: 'Pages OK', color: '#388E3C' },
            { icon: '🔴', val: latest.pagesFailed, label: 'Pages Failed', color: '#C62828' },
            { icon: '📄', val: latest.totalPages, label: 'Total Pages', color: charcoal },
            { icon: '🔔', val: latest.googlePinged ? 'Yes' : 'No', label: 'Google Pinged', color: latest.googlePinged ? '#388E3C' : inkMute },
            { icon: '⚡', val: latest.durationMs ? `${(latest.durationMs / 1000).toFixed(1)}s` : '—', label: 'Duration', color: charcoal },
          ].map(c => (
            <div key={c.label} style={{ background: '#FDFAF5', border: `1px solid ${line}`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 22, color: c.color, marginBottom: 2 }}>{c.val}</div>
              <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>{c.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Runs list */}
      {runs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 24px', color: inkMute, fontFamily: BODY }}>
          No crawls yet — click "Run Crawl Now" to start your first check.
        </div>
      ) : (
        <div>
          <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, marginBottom: 10 }}>Crawl History</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: BODY, marginBottom: 28 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${line}` }}>
                {['Date', 'Pages OK', 'Failed', 'Google Pinged', 'Duration', ''].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {runs.map((r, i) => (
                <tr
                  key={r.id}
                  onClick={() => selectRun(r)}
                  style={{ borderBottom: `1px solid ${line}`, background: selectedRun?.id === r.id ? goldTint : (i % 2 === 0 ? 'transparent' : '#FDFAF5'), cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => { if (selectedRun?.id !== r.id) (e.currentTarget as HTMLElement).style.background = goldTint; }}
                  onMouseLeave={e => { if (selectedRun?.id !== r.id) (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'transparent' : '#FDFAF5'; }}
                >
                  <td style={{ padding: '10px 12px', fontSize: 12, color: charcoal, whiteSpace: 'nowrap' }}>{new Date(r.runAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 700, color: '#388E3C' }}>{r.pagesOk}</td>
                  <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 700, color: r.pagesFailed > 0 ? '#C62828' : inkMute }}>{r.pagesFailed}</td>
                  <td style={{ padding: '10px 12px' }}><Badge label={r.googlePinged ? 'Yes' : 'No'} color={r.googlePinged ? 'green' : 'grey'} /></td>
                  <td style={{ padding: '10px 12px', fontSize: 12, color: inkMute }}>{r.durationMs ? `${(r.durationMs / 1000).toFixed(1)}s` : '—'}</td>
                  <td style={{ padding: '10px 12px', fontSize: 11, fontWeight: 600, color: gold }}>Details →</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Per-page results */}
          {selectedRun && (
            <div>
              <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, marginBottom: 10 }}>
                Page Results — {new Date(selectedRun.runAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </p>
              {pagesLoading ? (
                <div style={{ fontFamily: BODY, color: inkMute, padding: 20 }}>Loading pages…</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: BODY, fontSize: 12 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${line}` }}>
                        {['URL', 'Status', 'Response', 'Title', 'Description', 'Canonical', 'Schema', 'Issues'].map(h => (
                          <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: inkMute, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pages.map((p, i) => {
                        const ok = p.statusCode === 200;
                        return (
                          <tr key={p.id} style={{ borderBottom: `1px solid ${line}`, background: i % 2 === 0 ? 'transparent' : '#FDFAF5' }}>
                            <td style={{ padding: '9px 10px', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: charcoal, fontWeight: 500 }}>
                              {p.url.replace('https://aesthetix-systems.co.uk', '')}
                            </td>
                            <td style={{ padding: '9px 10px' }}>
                              <Badge label={String(p.statusCode ?? '—')} color={ok ? 'green' : 'red'} />
                            </td>
                            <td style={{ padding: '9px 10px', color: (p.responseTimeMs ?? 0) > 3000 ? '#C62828' : inkSoft }}>
                              {p.responseTimeMs ? `${p.responseTimeMs}ms` : '—'}
                            </td>
                            <td style={{ padding: '9px 10px', textAlign: 'center' }}>{p.hasTitle ? '✅' : '❌'}</td>
                            <td style={{ padding: '9px 10px', textAlign: 'center' }}>{p.hasMetaDescription ? '✅' : '❌'}</td>
                            <td style={{ padding: '9px 10px', textAlign: 'center' }}>{p.hasCanonical ? '✅' : '❌'}</td>
                            <td style={{ padding: '9px 10px', textAlign: 'center' }}>{p.hasSchema ? '✅' : '❌'}</td>
                            <td style={{ padding: '9px 10px', maxWidth: 200 }}>
                              {p.issues.length === 0 ? (
                                <span style={{ color: '#388E3C', fontWeight: 600, fontSize: 11 }}>All good</span>
                              ) : (
                                <span style={{ color: '#C62828', fontSize: 11 }}>{p.issues.join(', ')}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
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

type BlogPostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
};

function IntelligenceTab({ pwd }: { pwd: string }) {
  const [data, setData] = useState<{ keywords: SeoKeywordPosition[]; overrides: SeoMetaOverride[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedKeyword, setExpandedKeyword] = useState<number | null>(null);

  function loadData() {
    setLoading(true);
    fetch('/api/admin/seo/intelligence', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json())
      .then(d => setData(d as { keywords: SeoKeywordPosition[]; overrides: SeoMetaOverride[] }))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadData(); }, []);

  async function handleRun() {
    setRunning(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/seo/intelligence/run', {
        method: 'POST',
        headers: { 'x-admin-key': pwd },
      });
      const d = await res.json() as { message?: string; error?: string };
      setMessage(d.message ?? d.error ?? 'Started');
    } catch {
      setMessage('Request failed');
    } finally {
      setRunning(false);
    }
  }

  function rankBadge(pos: number | null) {
    if (pos === null) return <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, background: '#FFEBEE', color: '#C62828', borderRadius: 999, padding: '2px 10px' }}>Not found</span>;
    if (pos <= 3) return <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, background: '#E8F5E9', color: '#388E3C', borderRadius: 999, padding: '2px 10px' }}>#{pos} Top 3 🏆</span>;
    if (pos <= 10) return <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, background: goldTint, color: gold, borderRadius: 999, padding: '2px 10px' }}>#{pos} Page 1</span>;
    return <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, background: '#F5F5F5', color: inkMute, borderRadius: 999, padding: '2px 10px' }}>#{pos}</span>;
  }

  const keywords = data?.keywords ?? [];
  const overrides = data?.overrides ?? [];
  const trackedCount = keywords.length;
  const top10Count = keywords.filter(k => k.ourPosition !== null && k.ourPosition <= 10).length;
  const overrideCount = overrides.length;

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: charcoal, margin: '0 0 4px' }}>SEO Intelligence</h2>
          <p style={{ fontFamily: BODY, fontSize: 13, color: inkMute, margin: 0 }}>Runs every Monday at 08:00 UTC. Checks rankings, crawls competitors, rewrites meta tags with AI.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {message && (
            <span style={{ fontFamily: BODY, fontSize: 12, color: inkMute, background: '#F5F5F5', padding: '6px 14px', borderRadius: 999 }}>
              {message}
            </span>
          )}
          <button
            onClick={handleRun}
            disabled={running}
            style={{
              fontFamily: BODY, fontSize: 13, fontWeight: 600,
              background: running ? '#F5F5F5' : charcoal, color: running ? inkMute : cream,
              border: 'none', borderRadius: 8, padding: '10px 20px', cursor: running ? 'default' : 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            {running ? 'Starting…' : '⟳ Run Now'}
          </button>
          <button
            onClick={loadData}
            style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, background: 'none', color: inkSoft, border: `1px solid ${line}`, borderRadius: 8, padding: '10px 20px', cursor: 'pointer' }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Warning banner on first run */}
      {!loading && keywords.length === 0 && (
        <div style={{ background: goldTint, border: `1px solid ${gold}44`, borderRadius: 10, padding: '14px 18px', marginBottom: 24 }}>
          <p style={{ fontFamily: BODY, fontSize: 13, color: charcoal, margin: 0 }}>
            <strong>No data yet.</strong> Click "Run Now" to start the first analysis. It takes 5–10 minutes to check all 8 keywords and crawl competitors. Check back after — the page will update when done.
          </p>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        {[
          { label: 'Keywords Tracked', value: trackedCount },
          { label: 'On Page 1 (Top 10)', value: top10Count },
          { label: 'Pages Auto-Updated', value: overrideCount },
        ].map(s => (
          <div key={s.label} style={{ background: '#FDFAF5', border: `1px solid ${line}`, borderRadius: 10, padding: '12px 18px', minWidth: 130 }}>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 22, color: charcoal }}>{s.value}</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ color: inkMute, padding: '40px 0', textAlign: 'center', fontFamily: BODY }}>Loading…</div>
      ) : (
        <>
          {/* Keyword Rankings */}
          {keywords.length > 0 && (
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute, margin: '0 0 14px' }}>Keyword Rankings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {keywords.map((kw, i) => (
                  <div key={kw.id} style={{ borderBottom: `1px solid ${line}` }}>
                    <button
                      onClick={() => setExpandedKeyword(expandedKeyword === i ? null : i)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                        padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: charcoal, margin: '0 0 3px' }}>{kw.keyword}</p>
                        <p style={{ fontFamily: BODY, fontSize: 11, color: inkMute, margin: 0 }}>
                          {kw.ourPath} · Checked {new Date(kw.analyzedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {rankBadge(kw.ourPosition)}
                        <span style={{ fontFamily: BODY, fontSize: 12, color: inkMute }}>{expandedKeyword === i ? '▲' : '▼'}</span>
                      </div>
                    </button>

                    {expandedKeyword === i && (
                      <div style={{ padding: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {/* Competitors */}
                        {kw.competitors.length > 0 && (
                          <div>
                            <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: inkMute, margin: '0 0 8px' }}>Competitors above us</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {kw.competitors.map(c => (
                                <div key={c.url} style={{ background: '#FDFAF5', border: `1px solid ${line}`, borderRadius: 8, padding: '10px 14px' }}>
                                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 4 }}>
                                    <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: inkMute, flexShrink: 0 }}>#{c.rank}</span>
                                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontSize: 12, color: gold, wordBreak: 'break-all', textDecoration: 'none' }}>{c.url.replace(/^https?:\/\//, '').slice(0, 60)}</a>
                                  </div>
                                  <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: charcoal, margin: '0 0 2px' }}>{c.title}</p>
                                  <p style={{ fontFamily: BODY, fontSize: 12, color: inkSoft, margin: 0 }}>{c.description.slice(0, 160)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* AI Suggestions */}
                        {(kw.suggestedTitle || kw.suggestedDescription) && (
                          <div style={{ background: '#F0F7F0', border: '1px solid #C8E6C9', borderRadius: 8, padding: '12px 14px' }}>
                            <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#388E3C', margin: '0 0 8px' }}>AI-generated improvement</p>
                            {kw.suggestedTitle && <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: charcoal, margin: '0 0 4px' }}>{kw.suggestedTitle}</p>}
                            {kw.suggestedDescription && <p style={{ fontFamily: BODY, fontSize: 12, color: inkSoft, margin: 0 }}>{kw.suggestedDescription}</p>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applied Meta Overrides */}
          {overrides.length > 0 && (
            <div>
              <h3 style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: inkMute, margin: '0 0 14px' }}>Live Meta Tag Overrides</h3>
              <p style={{ fontFamily: BODY, fontSize: 13, color: inkMute, margin: '0 0 16px' }}>These AI-written titles and descriptions are now live on your site, replacing the defaults.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {overrides.map(o => (
                  <div key={o.id} style={{ border: `1px solid ${line}`, borderRadius: 10, padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                      <code style={{ fontFamily: 'monospace', fontSize: 12, color: gold, background: goldTint, padding: '2px 8px', borderRadius: 4 }}>{o.path}</code>
                      <span style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>Updated {new Date(o.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <p style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: charcoal, margin: '0 0 4px' }}>{o.title}</p>
                    <p style={{ fontFamily: BODY, fontSize: 12, color: inkSoft, margin: '0 0 8px' }}>{o.metaDescription}</p>
                    {o.reason && <p style={{ fontFamily: BODY, fontSize: 11, color: inkMute, margin: 0 }}>Reason: {o.reason}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function BlogTab({ pwd }: { pwd: string }) {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  function loadPosts() {
    setLoading(true);
    fetch('/api/blog/posts?limit=50')
      .then(r => r.json())
      .then(d => setPosts(Array.isArray(d.posts) ? d.posts : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadPosts(); }, []);

  async function handleGenerate() {
    setGenerating(true);
    setMessage('');
    try {
      const res = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: { 'x-admin-key': pwd, 'Content-Type': 'application/json' },
      });
      const data = await res.json() as { message?: string; postId?: number; error?: string };
      setMessage(data.message ?? data.error ?? 'Done');
      if (data.postId) loadPosts();
    } catch {
      setMessage('Request failed');
    } finally {
      setGenerating(false);
    }
  }

  const CATEGORY_LABELS: Record<string, string> = { insights: 'Insights', guides: 'Guides', seo: 'SEO', technology: 'Technology' };

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: charcoal, margin: '0 0 4px' }}>Blog Posts</h2>
          <p style={{ fontFamily: BODY, fontSize: 13, color: inkMute, margin: 0 }}>AI generates one post on the 1st of every month. Trigger manually below.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {message && (
            <span style={{ fontFamily: BODY, fontSize: 12, color: message.includes('generated') ? '#388E3C' : inkMute, background: message.includes('generated') ? '#E8F5E9' : '#F5F5F5', padding: '6px 14px', borderRadius: 999 }}>
              {message}
            </span>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{
              fontFamily: BODY, fontSize: 13, fontWeight: 600,
              background: generating ? '#F5F5F5' : charcoal, color: generating ? inkMute : cream,
              border: 'none', borderRadius: 8, padding: '10px 20px', cursor: generating ? 'default' : 'pointer',
              letterSpacing: '0.04em', transition: 'background 0.15s',
            }}
          >
            {generating ? 'Generating…' : '✦ Generate Now'}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Published', value: posts.length },
          { label: 'Topics Remaining', value: Math.max(0, 12 - posts.length) },
        ].map(s => (
          <div key={s.label} style={{ background: '#FDFAF5', border: `1px solid ${line}`, borderRadius: 10, padding: '12px 18px', minWidth: 120 }}>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 22, color: charcoal }}>{s.value}</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Posts list */}
      {loading ? (
        <div style={{ color: inkMute, padding: '40px 0', textAlign: 'center', fontFamily: BODY }}>Loading…</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: inkMute, fontFamily: BODY }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>✍️</div>
          <p style={{ fontSize: 15 }}>No posts yet. Click "Generate Now" to create your first article.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {posts.map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '16px 0', borderBottom: `1px solid ${line}`, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <Badge label={CATEGORY_LABELS[p.category] ?? p.category} color="gold" />
                  <span style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>{p.readingMinutes} min</span>
                  <span style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>#{i + 1}</span>
                </div>
                <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 17, color: charcoal, margin: '0 0 4px', lineHeight: 1.3 }}>{p.title}</p>
                <p style={{ fontFamily: BODY, fontSize: 12, color: inkSoft, margin: '0 0 4px' }}>{p.excerpt.slice(0, 120)}{p.excerpt.length > 120 ? '…' : ''}</p>
                <p style={{ fontFamily: BODY, fontSize: 11, color: inkMute, margin: 0 }}>
                  {new Date(p.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' · '}
                  <code style={{ fontSize: 10 }}>/blog/{p.slug}</code>
                </p>
              </div>
              <a
                href={`/blog/${p.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: gold, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                View →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [pwd, setPwd] = useState<string | null>(() => sessionStorage.getItem('aesthetix_admin_key'));
  const [tab, setTab] = useState<'enquiries' | 'bookings' | 'seo' | 'blog' | 'intelligence'>('enquiries');
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [enquiryCount, setEnquiryCount] = useState<number | null>(null);
  const [bookingCount, setBookingCount] = useState<number | null>(null);
  const [seoHealthLabel, setSeoHealthLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!pwd) return;
    fetch('/api/admin/enquiries', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json()).then(d => Array.isArray(d) && setEnquiryCount(d.length)).catch(() => {});
    fetch('/api/admin/slot-bookings', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json()).then(d => Array.isArray(d) && setBookingCount(d.length)).catch(() => {});
    fetch('/api/blog/posts?limit=50')
      .then(r => r.json()).then(d => Array.isArray(d.posts) && setBlogCount(d.posts.length)).catch(() => {});
    fetch('/api/admin/seo/runs', { headers: { 'x-admin-key': pwd } })
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          const latest = d[0] as SeoCrawlRun;
          const pct = latest.totalPages > 0 ? Math.round((latest.pagesOk / latest.totalPages) * 100) : 0;
          setSeoHealthLabel(`${pct}%`);
        } else {
          setSeoHealthLabel('—');
        }
      })
      .catch(() => {});
  }, [pwd]);

  function handleLogin(password: string) {
    sessionStorage.setItem('aesthetix_admin_key', password);
    setPwd(password);
  }

  function handleLogout() {
    sessionStorage.removeItem('aesthetix_admin_key');
    setPwd(null);
  }

  function goToTab(t: 'enquiries' | 'bookings' | 'seo' | 'blog' | 'intelligence') {
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

          {/* Blog Posts */}
          <button
            onClick={() => goToTab('blog')}
            style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 14, padding: '20px 22px', textAlign: 'left', cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(196,168,130,0.18)`; (e.currentTarget as HTMLElement).style.borderColor = gold; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = line; }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>✍️</div>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: charcoal, marginBottom: 2 }}>{blogCount ?? '…'}</div>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: charcoal, marginBottom: 2 }}>Blog Posts</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute, marginBottom: 10 }}>AI-generated monthly</div>
            <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, color: gold, letterSpacing: '0.06em' }}>Manage →</div>
          </button>

          {/* SEO Health */}
          <button
            onClick={() => goToTab('seo')}
            style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 14, padding: '20px 22px', textAlign: 'left', cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(196,168,130,0.18)`; (e.currentTarget as HTMLElement).style.borderColor = gold; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = line; }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>🔍</div>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: charcoal, marginBottom: 2 }}>{seoHealthLabel ?? '…'}</div>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: charcoal, marginBottom: 2 }}>SEO Health</div>
            <div style={{ fontFamily: BODY, fontSize: 11, color: inkMute, marginBottom: 10 }}>Pages passing last crawl</div>
            <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, color: gold, letterSpacing: '0.06em' }}>View report →</div>
          </button>
        </div>

        {/* Tabs */}
        <div id="admin-tabs" style={{ background: '#FFFFFF', border: `1px solid ${line}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ borderBottom: `1px solid ${line}`, display: 'flex', padding: '0 24px', overflowX: 'auto' }}>
            {([
              { key: 'enquiries', label: `Quiz Enquiries${enquiryCount !== null ? ` (${enquiryCount})` : ''}` },
              { key: 'bookings', label: `Slot Bookings${bookingCount !== null ? ` (${bookingCount})` : ''}` },
              { key: 'seo', label: 'SEO Crawler' },
              { key: 'blog', label: `Blog Posts${blogCount !== null ? ` (${blogCount})` : ''}` },
              { key: 'intelligence', label: '🧠 SEO Intelligence' },
            ] as const).map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  fontFamily: BODY, fontSize: 13, fontWeight: 600,
                  color: tab === t.key ? charcoal : inkMute,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '16px 20px', marginRight: 4, whiteSpace: 'nowrap',
                  borderBottom: `2px solid ${tab === t.key ? gold : 'transparent'}`,
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 0 }}>
            {tab === 'enquiries' && <EnquiriesTab key={pwd} pwd={pwd} />}
            {tab === 'bookings' && <SlotBookingsTab key={pwd} pwd={pwd} />}
            {tab === 'seo' && <SeoTab key={pwd} pwd={pwd} />}
            {tab === 'blog' && <BlogTab key={pwd} pwd={pwd} />}
            {tab === 'intelligence' && <IntelligenceTab key={pwd} pwd={pwd} />}
          </div>
        </div>
      </div>
    </div>
  );
}
