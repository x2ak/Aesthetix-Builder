import { useEffect } from "react";
import { motion } from "framer-motion";

const cream = '#F7F4EE';
const charcoal = '#1A1A1C';
const inkSoft = '#4A4A4E';
const inkMute = '#8A8A8E';
const gold = '#C4A882';
const line = '#E5DFD3';
const surface = '#FDFAF5';
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";

function Nav() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(26,26,28,0.72)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
            <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, color: cream, letterSpacing: '0.15em', margin: 0, lineHeight: 1 }}>AESTHETIX</p>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7, color: gold, letterSpacing: '0.22em', margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a href="/#work" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: 'rgba(247,244,238,0.6)', textDecoration: 'none', letterSpacing: '0.04em' }}>← All work</a>
          <a href="https://wa.me/447495963388" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, color: charcoal, background: gold, borderRadius: 999, padding: '8px 20px', textDecoration: 'none', letterSpacing: '0.06em' }}>
            Get a build →
          </a>
        </div>
      </div>
    </nav>
  );
}

export type CaseStudyData = {
  slug: string;
  client: string;
  tagline: string;
  industry: string;
  location: string;
  buildTime: string;
  techStack: string[];
  liveUrl: string;
  heroImg: string;
  brief: string;
  features: string[];
  screenshots: { src: string; caption: string }[];
  metaTitle: string;
  metaDesc: string;
  theme: {
    heroBg: string;
    accent: string;
    accentRgb: string;
  };
  metrics: { value: string; label: string }[];
  quote: string;
};

export function CaseStudyPage({ data }: { data: CaseStudyData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = data.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', data.metaDesc);
  }, [data]);

  const { heroBg, accent, accentRgb } = data.theme;

  return (
    <div style={{ background: cream, minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ background: heroBg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', paddingTop: 60 }}>
        {/* Animated ambient orbs */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '8%', left: '60%', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, rgba(${accentRgb},0.22) 0%, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{ position: 'absolute', top: '40%', left: '-5%', width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, rgba(${accentRgb},0.16) 0%, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ x: [0, 25, -35, 0], y: [0, -20, 40, 0], scale: [1, 1.2, 0.85, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          style={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, rgba(${accentRgb},0.13) 0%, transparent 70%)`, filter: 'blur(45px)', pointerEvents: 'none' }}
        />
        {/* Central fixed glow anchor */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 40% at 50% 20%, rgba(${accentRgb},0.1) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        {/* noise texture feel */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 52, paddingBottom: 52 }}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <span style={{ width: 28, height: 1, background: accent }} />
            <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: accent }}>Case Study</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: cream, margin: '0 0 20px', lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            {data.client}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(247,244,238,0.65)', margin: '0 0 36px', maxWidth: 520, lineHeight: 1.7 }}>
            {data.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <a href={data.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, letterSpacing: '0.06em', color: charcoal, background: accent, borderRadius: 999, padding: '13px 30px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Visit live site →
            </a>
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: accent, letterSpacing: '0.06em', opacity: 0.8 }}>
              {data.location} · {data.buildTime}
            </span>
          </motion.div>
        </div>

        {/* Floating website screenshot */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', width: '100%' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px 16px 0 0', overflow: 'hidden', boxShadow: `0 -8px 80px rgba(${accentRgb},0.15), 0 40px 120px rgba(0,0,0,0.6)` }}>
            <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
              <span style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 5, height: 20, marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: BODY, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{data.liveUrl.replace('https://', '')}</span>
              </span>
            </div>
            <img src={data.heroImg} alt={`${data.client} website`}
              style={{ width: '100%', display: 'block', maxHeight: 480, objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </motion.div>
      </section>

      {/* ─── METRICS STRIP ─── */}
      <section style={{ background: charcoal, borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 40vw), 1fr))' }}>
            {data.metrics.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{
                  padding: '36px 28px',
                  borderRight: i < data.metrics.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: accent, margin: 0, lineHeight: 1 }}>{m.value}</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(247,244,238,0.4)', margin: 0, lineHeight: 1.4 }}>{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE STORY ─── */}
      <section style={{ background: cream, padding: 'clamp(64px, 8vw, 104px) 28px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {/* Section label */}
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.26em', color: accent, margin: '0 0 28px' }}>
            The Brief
          </motion.p>

          {/* Elegant intro line */}
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: charcoal, margin: '0 0 36px', lineHeight: 1.35, fontWeight: 400 }}>
            {data.tagline}
          </motion.h2>

          {/* Body — first paragraph only, keep it punchy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 17, color: inkSoft, lineHeight: 1.9, margin: 0 }}>
            {data.brief.split('\n\n')[0]}
          </motion.p>
        </div>
      </section>

      {/* ─── PULL QUOTE ─── */}
      <section style={{ background: heroBg, padding: 'clamp(56px, 7vw, 96px) 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(${accentRgb},0.12) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <motion.span initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }}
            style={{ display: 'block', width: 36, height: 2, background: accent, margin: '0 auto 32px' }} />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: cream, lineHeight: 1.45, margin: '0 0 28px' }}>
            "{data.quote}"
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: accent, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0, opacity: 0.75 }}>
            {data.client} · {data.location}
          </motion.p>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ background: surface, padding: 'clamp(40px, 5vw, 64px) 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: accent, margin: 0 }}>
              What we delivered
            </motion.p>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, letterSpacing: '0.04em' }}>
              {data.features.length} features
            </motion.span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 2 }}>
            {data.features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.025 }}
                style={{ background: cream, border: `1px solid ${line}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 16, color: accent, lineHeight: 1, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.6 }}>{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      {data.screenshots.length > 0 && (
        <section style={{ background: charcoal, padding: 'clamp(56px, 6vw, 88px) 28px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: accent, margin: '0 0 12px' }}>
              The build
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: cream, margin: '0 0 48px', lineHeight: 1.1 }}>
              See it for yourself
            </motion.h2>
            {/* First screenshot full-width */}
            {data.screenshots[0] && (
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7 }}
                style={{ marginBottom: 3, borderRadius: 14, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: 'rgba(247,244,238,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{data.screenshots[0].caption}</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                  </div>
                </div>
                <img src={data.screenshots[0].src} alt={data.screenshots[0].caption} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
              </motion.div>
            )}
            {/* Remaining screenshots in a grid */}
            {data.screenshots.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 3 }}>
                {data.screenshots.slice(1).map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.1 }}
                    style={{ borderRadius: 14, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: 'rgba(247,244,238,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{s.caption}</p>
                    </div>
                    <img src={s.src} alt={s.caption} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── TECH STACK ─── */}
      <section style={{ background: cream, padding: '56px 28px', borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
          <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: inkMute, margin: 0, flexShrink: 0 }}>Built with</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {data.techStack.map((t, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.035 }}
                style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: inkSoft, border: `1px solid ${line}`, borderRadius: 20, padding: '6px 14px' }}>
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <footer style={{ background: heroBg, padding: 'clamp(72px, 10vw, 120px) 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 50%, rgba(${accentRgb},0.14) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: accent, margin: '0 0 20px' }}>
            Your clinic is next
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: cream, margin: '0 0 14px', lineHeight: 1.1 }}>
            Want a build like this?
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.18 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: 'rgba(247,244,238,0.55)', margin: '0 0 40px', lineHeight: 1.7 }}>
            We build premium websites and booking systems for aesthetics clinics across the UK. Most builds go live in 2–3 weeks.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 }}>
            <a href="https://wa.me/447495963388" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: BODY, fontWeight: 500, fontSize: 14, color: charcoal, background: accent, borderRadius: 999, padding: '16px 36px', textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Message us on WhatsApp →
            </a>
          </motion.div>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: gold, letterSpacing: '0.1em', margin: '36px 0 0', opacity: 0.7 }}>
            AESTHETIX SYSTEMS · LONDON, UK · © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
