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
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20clinic!";

function Nav() {
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

function Footer() {
  return (
    <footer style={{ background: cream, borderTop: `1px solid ${line}`, padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {[
        { size: 200, top: '-40px', right: '-40px', fill: false },
        { size: 80,  bottom: '10%', left: '5%',   fill: true  },
      ].map((c, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: c.size, height: c.size, borderRadius: '50%',
            border: c.fill ? 'none' : `1.5px solid rgba(196,168,130,0.35)`,
            background: c.fill ? 'radial-gradient(circle, rgba(196,168,130,0.13) 0%, transparent 72%)' : 'transparent',
            top: (c as any).top, right: (c as any).right,
            bottom: (c as any).bottom, left: (c as any).left,
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, margin: '0 0 4px' }}>
          Aesthetix Systems · London, UK · © 2026
        </p>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}

const sections = [
  {
    heading: '1. Who we are',
    content: `Aesthetix Systems is a web design agency specialising in bespoke websites and booking systems for aesthetics and beauty clinics. We are based in Birmingham, United Kingdom.\n\nFor data protection purposes, Aesthetix Systems is the data controller for the personal information you provide to us.`,
  },
  {
    heading: '2. What information we collect',
    list: [
      'Contact details — your name, email address, phone number, business name, and business address',
      'Enquiry information — details you share when requesting a quote or booking a consultation (e.g. via WhatsApp, Instagram DMs, or our contact form)',
      'Technical data — your IP address, browser type, device type, and pages visited on our website (via cookies and analytics tools)',
      'Marketing data — if you engage with our social media ads (Meta, TikTok), we may receive engagement data from those platforms',
    ],
  },
  {
    heading: '3. How we use your information',
    intro: 'We use your personal information to:',
    list: [
      'Respond to your enquiries and provide quotes',
      'Deliver our website design and booking system services',
      'Send project updates and communications relating to work we\'re doing for you',
      'Improve our website and marketing',
      'Comply with our legal obligations',
    ],
  },
  {
    heading: '4. Legal basis for processing',
    intro: 'Under UK GDPR, we process your data based on:',
    list: [
      'Your consent — when you submit an enquiry or message us',
      'Contract — when we\'re delivering services to you',
      'Legitimate interests — to improve our business and respond to enquiries',
      'Legal obligation — when required by law',
    ],
  },
  {
    heading: '5. Who we share your information with',
    content: 'We do not sell your personal data.',
    intro: 'We may share it only with:',
    list: [
      'Service providers we use to run our business (e.g. Supabase, Stripe, hosting providers, email tools) — all bound by data protection agreements',
      'Meta, TikTok, and Google — if you interact with our advertising or analytics tools',
      'Legal authorities — if required by law',
    ],
  },
  {
    heading: '6. How long we keep your information',
    intro: 'We keep your personal data only as long as necessary:',
    list: [
      'Enquiries that don\'t become clients — up to 12 months',
      'Active client data — for the duration of our work plus 7 years (for tax and legal purposes)',
      'Marketing data — until you unsubscribe or withdraw consent',
    ],
  },
  {
    heading: '7. Your rights',
    intro: 'Under UK GDPR, you have the right to:',
    list: [
      'Access the personal data we hold about you',
      'Request correction of inaccurate data',
      'Request deletion of your data ("right to be forgotten")',
      'Object to or restrict our processing',
      'Request data portability',
      'Withdraw consent at any time',
      'Lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk',
    ],
    outro: 'To exercise any of these rights, email us at info@aesthetix-systems.co.uk.',
  },
  {
    heading: '8. Cookies',
    content: 'Our website uses cookies to improve user experience and for analytics. By using our site, you consent to our use of cookies. You can manage cookies through your browser settings.',
  },
  {
    heading: '9. Third-party links',
    content: 'Our website may link to external sites (e.g. client websites, social media). We\'re not responsible for the privacy practices of those sites.',
  },
  {
    heading: '10. Security',
    content: 'We take reasonable steps to protect your personal data from unauthorised access, loss, or misuse. However, no method of transmission over the internet is 100% secure.',
  },
  {
    heading: '11. Changes to this policy',
    content: 'We may update this Privacy Policy from time to time. The latest version will always be available on this page with the date it was last updated.',
  },
  {
    heading: '12. Contact us',
    content: null,
    contact: true,
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Aesthetix Systems';
  }, []);

  return (
    <div style={{ background: cream, minHeight: '100vh' }}>
      <Nav />

      {/* Hero header */}
      <section style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, padding: '72px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: gold, margin: '0 0 16px' }}>
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: BODY, fontWeight: 600, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: charcoal, margin: '0 0 16px', lineHeight: 1.08 }}>
            Privacy{' '}
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>Policy</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkMute, margin: 0 }}>
            Last updated: 21 April 2026
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: cream, padding: '56px 24px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: inkSoft, lineHeight: 1.85, margin: 0 }}>
            At Aesthetix Systems, we respect your privacy and are committed to protecting your personal data. This policy explains what information we collect, how we use it, and your rights under UK data protection law (UK GDPR and the Data Protection Act 2018).
          </p>
        </div>
      </section>

      {/* Sections */}
      <section style={{ background: cream, padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.05 }}
              style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < sections.length - 1 ? `1px solid ${line}` : 'none' }}>
              <h2 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 18, color: charcoal, margin: '0 0 16px', lineHeight: 1.3 }}>
                {s.heading}
              </h2>
              {s.content && s.content !== null && (
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, margin: s.intro || s.list ? '0 0 14px' : 0 }}>
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
                  {s.list.map((item, j) => (
                    <li key={j} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, marginBottom: 8 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {(s as any).outro && (
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, margin: 0 }}>
                  {(s as any).outro}
                </p>
              )}
              {(s as any).contact && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Business', value: 'Aesthetix Systems' },
                    { label: 'Email', value: 'info@aesthetix-systems.co.uk' },
                    { label: 'WhatsApp', value: '+44 7495 963388' },
                    { label: 'Location', value: 'Birmingham, United Kingdom' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: gold, minWidth: 80, flexShrink: 0 }}>{row.label}</span>
                      <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
