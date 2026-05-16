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
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: DISP, fontStyle: 'italic', fontSize: 20, color: CHARCOAL, letterSpacing: '-0.01em', padding: 0 }}>
          Aesthetix
        </button>
        <a href="https://wa.me/447495963388" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none' }}>
          Questions? WhatsApp us →
        </a>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 'clamp(7rem,15vw,10rem)', paddingBottom: 'clamp(4rem,8vw,6rem)', paddingLeft: 'clamp(1.5rem,8vw,6rem)', paddingRight: 'clamp(1.5rem,8vw,6rem)', maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.25rem' }}>
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
            <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.5rem' }}>
              Complete package
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 64, color: '#F7F4EE', lineHeight: 1 }}>£999</span>
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
              {loading ? 'Redirecting…' : 'Pay £999 — secure checkout'}
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
            {[['3+', 'Clinics launched'], ['£999', 'Fixed price'], ['7 days', 'Fastest build'], ['30 days', 'Post-launch support']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(1.5rem,4vw,2.2rem)', color: GOLD, marginBottom: 4 }}>{val}</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: INK_MUTE, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid rgba(26,26,28,0.08)`, padding: '2rem clamp(1.5rem,8vw,6rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 16, color: CHARCOAL }}>Aesthetix Systems</span>
        <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 11, color: '#00FFFF', letterSpacing: '0.02em' }}>Built with Intent.</span>
      </footer>
    </div>
  );
}
