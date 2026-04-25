import { useEffect } from "react";
import { motion } from "framer-motion";

const cream = '#F7F4EE';
const charcoal = '#1A1A1C';
const inkSoft = '#4A4A4E';
const inkMute = '#8A8A8E';
const gold = '#C4A882';
const goldTint = '#F5EDD9';
const blush = '#E8D5D2';
const line = '#E5DFD3';
const surface = '#FDFAF5';
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";

function LegalNav() {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: cream, borderBottom: `1px solid ${line}`, padding: '0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
            <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: charcoal, letterSpacing: '0.15em', margin: 0, lineHeight: 1 }}>AESTHETIX</p>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 8, color: gold, letterSpacing: '0.22em', margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="/#work" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkMute, textDecoration: 'none', letterSpacing: '0.04em' }}>← All Work</a>
          <a href="/" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkMute, textDecoration: 'none', letterSpacing: '0.04em' }}>Back to site</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ background: charcoal, padding: '64px 32px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: cream, margin: 0, lineHeight: 1.25 }}>
          Want a build like this for your clinic?
        </p>
        <a href="https://wa.me/447495963388" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: BODY, fontWeight: 500, fontSize: 14, color: charcoal, background: gold, borderRadius: 999, padding: '14px 32px', textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Book a 15-min call →
        </a>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, margin: 0, letterSpacing: '0.06em' }}>
          Aesthetix Systems · London, UK · © 2026
        </p>
      </div>
    </footer>
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
};

function FeatureTick({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <span style={{ color: gold, fontSize: 14, lineHeight: '22px', flexShrink: 0 }}>✦</span>
      <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, lineHeight: 1.7 }}>{text}</span>
    </div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: gold, border: `1px solid rgba(196,168,130,0.4)`, borderRadius: 20, padding: '6px 14px' }}>
      {label}
    </span>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.18em', color: gold, margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: charcoal, margin: 0, lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}

export function CaseStudyPage({ data }: { data: CaseStudyData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = data.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', data.metaDesc);
  }, [data]);

  return (
    <div style={{ background: cream, minHeight: '100vh' }}>
      <LegalNav />

      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, padding: '72px 24px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: gold, margin: '0 0 14px' }}>
            Case Study
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: BODY, fontWeight: 600, fontSize: 'clamp(2rem, 5vw, 3.8rem)', color: charcoal, margin: '0 0 12px', lineHeight: 1.05 }}>
            {data.client}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: inkSoft, margin: '0 0 28px', lineHeight: 1.5 }}>
            {data.tagline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
            style={{ marginBottom: 40 }}>
            <a href={data.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, letterSpacing: '0.06em', color: charcoal, background: gold, borderRadius: 999, padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>
              Visit Live Site →
            </a>
          </motion.div>
          {/* Browser chrome + screenshot */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            style={{ background: '#F0EDE7', border: `1px solid ${line}`, borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 24px 80px rgba(26,26,28,0.12)' }}>
            <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${line}` }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5816A', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F0C05A', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#72B87A', display: 'inline-block' }} />
              <span style={{ flex: 1, background: 'rgba(26,26,28,0.07)', borderRadius: 5, height: 20, marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: BODY, fontSize: 10, color: inkMute }}>{data.liveUrl.replace('https://', '')}</span>
              </span>
            </div>
            <img src={data.heroImg} alt={`${data.client} website`}
              style={{ width: '100%', display: 'block', maxHeight: 520, objectFit: 'cover', objectPosition: 'top' }} />
          </motion.div>
        </div>
      </section>

      {/* Meta grid */}
      <section style={{ background: surface, borderBottom: `1px solid ${line}`, padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '28px 40px' }}>
            <MetaItem label="Client" value={data.client} />
            <MetaItem label="Industry" value={data.industry} />
            <MetaItem label="Location" value={data.location} />
            <MetaItem label="Build Time" value={data.buildTime} />
            <MetaItem label="Live URL" value={data.liveUrl.replace('https://', '')} />
          </div>
        </div>
      </section>

      {/* The Brief */}
      <section style={{ background: cream, padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: gold, margin: '0 0 16px' }}>
            The Brief
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 17, color: inkSoft, lineHeight: 1.9, margin: 0 }}>
            {data.brief}
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: gold, margin: '0 0 12px' }}>
            Features Built
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            style={{ fontFamily: BODY, fontWeight: 600, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: charcoal, margin: '0 0 40px', lineHeight: 1.15 }}>
            What we <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>delivered</em>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px 48px' }}>
            {data.features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <FeatureTick text={f} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      {data.screenshots.length > 0 && (
        <section style={{ background: cream, padding: '72px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: gold, margin: '0 0 12px' }}>
              Gallery
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              style={{ fontFamily: BODY, fontWeight: 600, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: charcoal, margin: '0 0 40px', lineHeight: 1.15 }}>
              The finished <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>product</em>
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
              {data.screenshots.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.08 }}
                  style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,26,28,0.07)' }}>
                  <div style={{ background: '#EDEBE5', padding: '16px 16px 0' }}>
                    <img src={s.src} alt={s.caption}
                      style={{ width: '100%', display: 'block', borderRadius: '8px 8px 0 0', objectFit: 'contain' }} />
                  </div>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0, padding: '14px 18px' }}>{s.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section style={{ background: surface, borderTop: `1px solid ${line}`, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: gold, margin: '0 0 20px' }}>
            Tech Stack
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {data.techStack.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <TechBadge label={t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
