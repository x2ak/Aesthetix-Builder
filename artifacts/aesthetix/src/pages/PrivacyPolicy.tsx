import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";

const cream = '#F7F4EE';
const charcoal = '#1A1A1C';
const inkSoft = '#4A4A4E';
const inkMute = '#8A8A8E';
const gold = '#C4A882';
const goldTint = '#F5EDD9';
const blush = '#E8D5D2';
const line = '#E5DFD3';
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
        <a href="/" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkMute, textDecoration: 'none', letterSpacing: '0.04em' }}>← Back to site</a>
      </div>
    </nav>
  );
}

function LegalFooter() {
  return (
    <footer style={{ background: cream, borderTop: `1px solid ${line}`, padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {[
        { size: 200, top: '-40px', right: '-40px', fill: false },
        { size: 80,  bottom: '10%', left: '5%',   fill: true  },
      ].map((c, i) => (
        <motion.div key={i} animate={{ y: [0, -12, 0] }} transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
            border: c.fill ? 'none' : `1.5px solid rgba(196,168,130,0.35)`,
            background: c.fill ? 'radial-gradient(circle, rgba(196,168,130,0.13) 0%, transparent 72%)' : 'transparent',
            top: (c as any).top, right: (c as any).right, bottom: (c as any).bottom, left: (c as any).left,
            pointerEvents: 'none', zIndex: 0 }} />
      ))}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, margin: 0 }}>
          Aesthetix Systems · London, UK · © 2026
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Privacy Policy
          </a>
          <a href="/terms" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

type Section = {
  heading: string;
  content?: string;
  intro?: string;
  list?: Array<string | { bold: string; rest: string }>;
  outro?: string;
  contact?: boolean;
};

const sections: Section[] = [
  {
    heading: '1. Who we are',
    content: `Aesthetix Systems ("we", "us", "our") is a website design and booking system provider based in London, United Kingdom. We build bespoke websites and booking platforms for aesthetic clinics across the UK.\n\nIf you have any questions about this policy, contact us at info@aesthetix-systems.co.uk.`,
  },
  {
    heading: '2. What information we collect',
    intro: 'We may collect the following when you interact with us:',
    list: [
      { bold: 'Contact details', rest: ' — your name, email, phone, business name, address' },
      { bold: 'Enquiry information', rest: ' — details you share via WhatsApp, Instagram DMs, or our contact form' },
      { bold: 'Technical data', rest: ' — IP address, browser type, device type, pages visited (via cookies and analytics tools)' },
      { bold: 'Marketing data', rest: ' — engagement data from Meta, TikTok, or other ad platforms' },
    ],
  },
  {
    heading: '3. How we use your information',
    intro: 'We use your data to:',
    list: [
      'Respond to enquiries and provide quotes',
      'Deliver our website design and booking system services',
      'Send project updates',
      'Improve our website and marketing',
      'Comply with legal obligations',
    ],
  },
  {
    heading: '4. Legal basis for processing',
    intro: 'Under UK GDPR, we process your data based on:',
    list: [
      { bold: 'Your consent', rest: ' — when you submit an enquiry' },
      { bold: 'Contract', rest: ' — when delivering services' },
      { bold: 'Legitimate interests', rest: ' — improving our business' },
      { bold: 'Legal obligation', rest: ' — when required by law' },
    ],
  },
  {
    heading: '5. Who we share your information with',
    content: 'We do not sell your personal data. We may share with:',
    list: [
      { bold: 'Service providers', rest: ' (Supabase, Stripe, hosting, email tools) — bound by data protection agreements' },
      { bold: 'Meta, TikTok, Google', rest: ' — if you engage with our ads or analytics' },
      { bold: 'Legal authorities', rest: ' — if required by law' },
    ],
  },
  {
    heading: '6. How long we keep your information',
    list: [
      { bold: 'Enquiries that don\'t become clients', rest: ' — up to 12 months' },
      { bold: 'Active client data', rest: ' — duration of services plus 7 years (tax/legal)' },
      { bold: 'Marketing data', rest: ' — until you unsubscribe or withdraw consent' },
    ],
  },
  {
    heading: '7. Your rights',
    intro: 'Under UK GDPR you have the right to:',
    list: [
      'Access your personal data',
      'Request correction',
      'Request deletion',
      'Object to or restrict processing',
      'Data portability',
      'Withdraw consent',
      'Lodge a complaint with the ICO at ico.org.uk',
    ],
    outro: 'To exercise these rights, email info@aesthetix-systems.co.uk.',
  },
  {
    heading: '8. Cookies',
    content: 'Our website uses cookies to improve user experience and for analytics. Manage cookies through your browser settings.',
  },
  {
    heading: '9. Third-party links',
    content: 'Our website may link to external sites. We\'re not responsible for their privacy practices.',
  },
  {
    heading: '10. Security',
    content: 'We protect your data with encryption, access controls, and secure hosting. No system is 100% secure — we cannot guarantee absolute security.',
  },
  {
    heading: '11. Changes to this policy',
    content: 'We may update this policy. The "Last updated" date reflects the latest version. Material changes will be communicated via our website.',
  },
  {
    heading: '12. Contact us',
    contact: true,
  },
];

function renderListItem(item: string | { bold: string; rest: string }, j: number) {
  if (typeof item === 'string') {
    return (
      <li key={j} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, marginBottom: 8 }}>
        {item}
      </li>
    );
  }
  return (
    <li key={j} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, marginBottom: 8 }}>
      <strong style={{ fontWeight: 500, color: charcoal }}>{item.bold}</strong>{item.rest}
    </li>
  );
}

export default function PrivacyPolicy() {
  useSEO({
    title: "Privacy Policy | Aesthetix Systems",
    description: "How Aesthetix Systems collects, uses, and protects your personal data. Read our full privacy policy.",
    canonical: "/privacy-policy",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: cream, minHeight: '100vh' }}>
      <LegalNav />
      <section style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, padding: '72px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: gold, margin: '0 0 16px' }}>
            Legal
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: BODY, fontWeight: 600, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: charcoal, margin: '0 0 16px', lineHeight: 1.08 }}>
            Privacy{' '}
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>Policy</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkMute, margin: 0 }}>
            Last updated: 23 April 2026
          </motion.p>
        </div>
      </section>

      <section style={{ background: cream, padding: '56px 24px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: inkSoft, lineHeight: 1.85, margin: 0 }}>
            At Aesthetix Systems, we respect your privacy and are committed to protecting your personal data. This policy explains what information we collect, how we use it, and your rights under UK data protection law (UK GDPR and the Data Protection Act 2018).
          </p>
        </div>
      </section>

      <section style={{ background: cream, padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {sections.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: 0.05 }}
              style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < sections.length - 1 ? `1px solid ${line}` : 'none' }}>
              <h2 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 18, color: charcoal, margin: '0 0 16px', lineHeight: 1.3 }}>
                {s.heading}
              </h2>
              {s.content && (
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, margin: s.list ? '0 0 14px' : 0, whiteSpace: 'pre-line' }}>
                  {s.content}
                </p>
              )}
              {s.intro && (
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, margin: '0 0 12px' }}>
                  {s.intro}
                </p>
              )}
              {s.list && (
                <ul style={{ margin: '0 0 14px', paddingLeft: 20 }}>
                  {s.list.map((item, j) => renderListItem(item, j))}
                </ul>
              )}
              {s.outro && (
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, margin: 0 }}>
                  {s.outro}
                </p>
              )}
              {s.contact && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Business', value: 'Aesthetix Systems' },
                    { label: 'Email', value: 'info@aesthetix-systems.co.uk' },
                    { label: 'Location', value: 'London, United Kingdom' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: gold, minWidth: 72, flexShrink: 0 }}>{row.label}</span>
                      <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <LegalFooter />
    </div>
  );
}
