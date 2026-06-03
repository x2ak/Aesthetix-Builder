import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', 'Inter', sans-serif";
const CREAM = '#F7F4EE';
const CHARCOAL = '#1A1A1C';
const GOLD = '#C4A882';
const INK_MUTE = '#6B6860';

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

const features = [
  { n: '01', title: 'Brand-led design', body: "Custom visuals built around your clinic's identity — not a template." },
  { n: '02', title: 'Online booking', body: 'Integrated booking system your clients can use 24/7.' },
  { n: '03', title: 'Mobile-first build', body: 'Pixel-perfect on every screen — from iPhone to desktop.' },
  { n: '04', title: 'SEO foundation', body: 'Structured for search from day one so you get found locally.' },
  { n: '05', title: 'Launch support', body: 'We handle domain setup, go-live, and 30 days of post-launch fixes.' },
  { n: '06', title: 'Admin dashboard', body: 'Manage appointments, client records and revenue from one place.' },
];

export default function Payment() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleCheckout() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  }

  if (status === 'deposit-success') {
    const schedule = [
      { label: '£99 deposit', sub: 'Paid today — deducted from your total', done: true },
      { label: '50% on kickoff date', sub: 'Invoiced once we agree your start date', done: false },
      { label: '50% on completion', sub: 'Paid when your site goes live', done: false },
    ];
    return (
      <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: 480, width: '100%' }}>
          {/* Tick */}
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l6 6 10-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.75rem' }}>Build Slot Secured</p>
          <h1 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3rem)', color: CHARCOAL, marginBottom: '1rem', lineHeight: 1.15 }}>Deposit received.</h1>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: INK_MUTE, maxWidth: 400, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Your place in our build queue is confirmed. We'll contact you within <strong style={{ color: CHARCOAL, fontWeight: 600 }}>24 hours</strong> to discuss your build date and kick things off.
          </p>

          {/* Payment schedule card */}
          <div style={{ background: '#fff', border: '1px solid #E5DFD3', borderRadius: 12, padding: '24px 28px', marginBottom: '2.5rem', textAlign: 'left' }}>
            <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: INK_MUTE, margin: '0 0 18px' }}>Your Payment Schedule</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {schedule.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: s.done ? GOLD : 'transparent', border: s.done ? 'none' : `1.5px solid #C4A882`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {s.done ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 10, color: GOLD }}>{i + 1}</span>
                    )}
                  </div>
                  <div>
                    <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 14, color: CHARCOAL, margin: 0 }}>{s.label}</p>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: INK_MUTE, margin: 0 }}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27ve%20just%20paid%20my%20deposit%20and%20I%27m%20ready%20to%20discuss%20my%20build%20date!"
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', background: CHARCOAL, color: CREAM, border: 'none', borderRadius: 2, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}
            >
              Message us on WhatsApp
            </a>
            <button
              onClick={() => navigate('/')}
              style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'transparent', color: CHARCOAL, border: `1.5px solid ${CHARCOAL}`, borderRadius: 2, padding: '14px 28px', cursor: 'pointer' }}
            >
              Back to home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l6 6 10-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3rem)', color: CHARCOAL, marginBottom: '1rem' }}>Payment received.</h1>
          <p style={{ fontFamily: BODY, fontSize: 16, color: INK_MUTE, maxWidth: 440, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            We'll be in touch within 24 hours to kick off your project. Check your inbox — we've sent a confirmation.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', background: CHARCOAL, color: CREAM, border: 'none', borderRadius: 2, padding: '14px 32px', cursor: 'pointer' }}
          >
            Back to home
          </button>
        </motion.div>
      </div>
    );
  }

  if (status === 'cancelled') {
    return (
      <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3rem)', color: CHARCOAL, marginBottom: '1rem' }}>Payment cancelled.</h1>
          <p style={{ fontFamily: BODY, fontSize: 16, color: INK_MUTE, maxWidth: 420, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            No charge was made. If you have questions, reach us on WhatsApp anytime.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/pay')} style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', background: CHARCOAL, color: CREAM, border: 'none', borderRadius: 2, padding: '14px 32px', cursor: 'pointer' }}>
              Try again
            </button>
            <a href="https://wa.me/447495963388" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', color: CHARCOAL, border: `1.5px solid ${CHARCOAL}`, borderRadius: 2, padding: '14px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              WhatsApp us
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: BODY }}>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2.5rem', background: CREAM, borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke={GOLD} strokeWidth="1.5" />
              <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, color: CHARCOAL, letterSpacing: '0.16em', margin: 0, lineHeight: 1 }}>AESTHETIX</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7.5, color: GOLD, letterSpacing: '0.24em', margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
            </div>
          </div>
        </button>
        <a href="https://wa.me/447495963388" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none' }}>
          Questions? WhatsApp us →
        </a>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 'clamp(7rem,15vw,10rem)', paddingBottom: 'clamp(4rem,8vw,6rem)', paddingLeft: 'clamp(1.5rem,8vw,6rem)', paddingRight: 'clamp(1.5rem,8vw,6rem)', maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: '1.25rem' }}>
            Website build — one-time payment
          </p>
          <h1 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(2.8rem,7vw,5rem)', color: CHARCOAL, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Your clinic, online.<br />
            <span style={{ color: GOLD }}>Done properly.</span>
          </h1>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 'clamp(1rem,2vw,1.15rem)', color: INK_MUTE, maxWidth: 560, lineHeight: 1.75, marginBottom: 0 }}>
            One fixed price. No hidden fees. We design, build and launch a bespoke website and booking system for your aesthetics clinic — then hand it over to you.
          </p>
        </motion.div>
      </section>

      {/* Price card + features */}
      <section style={{ paddingLeft: 'clamp(1.5rem,8vw,6rem)', paddingRight: 'clamp(1.5rem,8vw,6rem)', paddingBottom: 'clamp(4rem,8vw,6rem)', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>

          {/* Sticky price card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ background: CHARCOAL, borderRadius: 4, padding: '2.5rem', position: 'sticky', top: '5.5rem' }}
          >
            <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: '1.5rem' }}>
              Complete package
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 64, color: '#F7F4EE', lineHeight: 1 }}>£1,098</span>
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: 'rgba(247,244,238,0.5)', marginBottom: '2rem', letterSpacing: '0.02em' }}>
              One-time · no monthly fees · VAT not included
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Custom design', 'Online booking system', 'Mobile-optimised', 'SEO ready', 'Admin dashboard', '30-day support'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: BODY, fontWeight: 400, fontSize: 14, color: 'rgba(247,244,238,0.85)' }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: GOLD, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {error && (
              <p style={{ fontFamily: BODY, fontSize: 13, color: '#ff6b6b', marginBottom: '1rem', lineHeight: 1.5 }}>{error}</p>
            )}

            <motion.button
              onClick={handleCheckout}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: '100%', fontFamily: BODY, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', background: GOLD, color: CHARCOAL, border: 'none', borderRadius: 2, padding: '16px 24px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}
            >
              {loading ? 'Redirecting…' : 'Pay £1,098 — secure checkout'}
            </motion.button>

            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: 'rgba(247,244,238,0.4)', marginTop: '1rem', textAlign: 'center', letterSpacing: '0.03em' }}>
              Secured by Stripe · Card payments accepted
            </p>
          </motion.div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {features.map((f, i) => (
              <div
                key={f.n}
                style={{ padding: '1.75rem 0', borderBottom: i < features.length - 1 ? `1px solid rgba(26,26,28,0.1)` : 'none' }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, color: GOLD, letterSpacing: '0.08em', minWidth: 22, paddingTop: 3 }}>{f.n}</span>
                  <div>
                    <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: CHARCOAL, marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>{f.title}</p>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: INK_MUTE, lineHeight: 1.65, margin: 0 }}>{f.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ borderTop: `1px solid rgba(26,26,28,0.08)`, padding: 'clamp(3rem,6vw,4rem) clamp(1.5rem,8vw,6rem)', background: CREAM }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: INK_MUTE, textAlign: 'center', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 2.5rem' }}>
            We've built for Starr Beautyy, Dermadoll, FlawlessSkin and more. Every site is bespoke — no templates, no shortcuts.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem,6vw,5rem)', flexWrap: 'wrap' }}>
            {[['3+', 'Clinics launched'], ['£1,098', 'Fixed price'], ['7 days', 'Fastest build'], ['30 days', 'Post-launch support']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(1.5rem,4vw,2.2rem)', color: GOLD, marginBottom: 4 }}>{val}</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: INK_MUTE, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: CREAM, borderTop: '1px solid #E5DFD3' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '44px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke={GOLD} strokeWidth="1.5" />
                <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, color: CHARCOAL, letterSpacing: '0.16em', margin: 0, lineHeight: 1 }}>AESTHETIX</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7.5, color: GOLD, letterSpacing: '0.24em', margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
              </div>
            </div>
          </button>
          <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 15, color: GOLD, margin: '0 0 28px', lineHeight: 1.5, opacity: 0.9 }}>We build the digital presence your clinic deserves.</p>
          <div style={{ textAlign: 'center', marginBottom: 20, lineHeight: 2.2 }}>
            {[
              { label: 'Bespoke Websites', path: '/services/bespoke-websites' },
              { label: 'Booking Systems', path: '/services/booking-systems' },
              { label: 'AI Assistant', path: '/services/ai-assistant' },
              { label: 'Ongoing Support', path: '/services/ongoing-support' },
            ].map(({ label, path }, i, arr) => (
              <span key={label} style={{ whiteSpace: 'nowrap' }}>
                <a href={path} onClick={(e) => { e.preventDefault(); navigate(path); }} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: '#4A4A4E', textDecoration: 'none', letterSpacing: '0.02em' }}>{label}</a>
                {i < arr.length - 1 && <span style={{ color: '#E5DFD3', margin: '0 8px', fontSize: 9 }}>·</span>}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 32 }}>
            <a href="https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20clinic!" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', border: '1px solid #E5DFD3', color: GOLD, textDecoration: 'none', flexShrink: 0 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.855L.057 23.09a.75.75 0 0 0 .921.921l5.233-1.474A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.953-1.354l-.355-.21-3.678 1.034 1.034-3.677-.21-.356A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            </a>
            <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', border: '1px solid #E5DFD3', color: GOLD, textDecoration: 'none', flexShrink: 0 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com/@aesthetix_systems" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', border: '1px solid #E5DFD3', color: GOLD, textDecoration: 'none', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
            </a>
          </div>
          <div style={{ height: 1, background: '#E5DFD3', marginBottom: 20, width: '100%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: INK_MUTE, letterSpacing: '0.03em' }}>© {new Date().getFullYear()} Aesthetix Systems</span>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 20px' }}>
              <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: INK_MUTE, letterSpacing: '0.03em' }}>London, UK</span>
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: INK_MUTE, textDecoration: 'none', letterSpacing: '0.03em' }}>Privacy Policy</a>
              <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: INK_MUTE, textDecoration: 'none', letterSpacing: '0.03em' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
