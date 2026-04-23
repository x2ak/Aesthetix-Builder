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
          <a href="/terms-of-service" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

type ListItem = string | { bold: string; rest: string };

type Section = {
  heading: string;
  content?: string;
  intro?: string;
  list?: ListItem[];
  outro?: string;
  subsections?: { subheading: string; content?: string; list?: ListItem[] }[];
  contact?: boolean;
};

const sections: Section[] = [
  {
    heading: '1. Introduction',
    content: `Welcome to Aesthetix Systems ("we", "us", "our"). These Terms of Service ("Terms") govern your use of our website (aesthetix-systems.co.uk) and our services, including bespoke website design, booking systems, and related development work for aesthetic clinics.\n\nBy engaging our services or using our website, you agree to these Terms. If you don't agree, please don't use our services.`,
  },
  {
    heading: '2. Who we are',
    content: 'Aesthetix Systems is a trading name operating from London, United Kingdom. Contact: info@aesthetix-systems.co.uk.',
  },
  {
    heading: '3. Our services',
    intro: 'We offer:',
    list: [
      { bold: 'Starter tier', rest: ' — basic bespoke website build' },
      { bold: 'Core tier', rest: ' — full website + booking system + admin portal' },
      { bold: 'Premium tier', rest: ' — Core plus advanced features (AI assistant, multi-location, advanced analytics)' },
      { bold: 'Retainer', rest: ' — ongoing hosting, maintenance, and support' },
    ],
    outro: 'Specific deliverables are outlined in an individual project proposal for each client.',
  },
  {
    heading: '4. Engagement and payment',
    subsections: [
      {
        subheading: '4.1 Project agreement',
        content: 'By paying a deposit (or first Klarna instalment) after receiving a proposal, you agree to these Terms and the project scope in that proposal.',
      },
      {
        subheading: '4.2 Payment structure',
        list: [
          'Standard: 50% deposit upfront, 50% on launch',
          'Alternative: Klarna Pay in 3 or equivalent instalment plans (where offered)',
          'Retainers: monthly in advance',
        ],
      },
      {
        subheading: '4.3 Late or non-payment',
        content: 'We reserve the right to pause work or withhold website launch if invoices remain unpaid beyond 7 days after due date.',
      },
      {
        subheading: '4.4 Refunds',
        content: 'Deposits are non-refundable once design or development work has begun, as they reserve our time and resources. If you cancel before work has started, we may provide a partial refund at our discretion.',
      },
    ],
  },
  {
    heading: '5. Delivery timelines',
    content: 'Project timelines are estimates provided in the proposal. Typical Core builds take 2–3 weeks from project kickoff. Delays caused by late client feedback, missing assets, or scope changes may extend timelines.',
  },
  {
    heading: '6. Client responsibilities',
    intro: 'You agree to:',
    list: [
      'Provide timely feedback during the project',
      'Supply accurate brand assets, content, and information',
      'Review work at each stage and raise concerns promptly',
      'Pay invoices on time',
      'Not use our services for any unlawful or harmful purpose',
    ],
  },
  {
    heading: '7. Revisions and scope',
    content: 'Each tier includes a reasonable number of revisions during the design and development phase. Major scope changes after project kickoff may incur additional fees, which will be communicated and agreed in writing before work proceeds.',
  },
  {
    heading: '8. Intellectual property',
    subsections: [
      {
        subheading: '8.1 Your content',
        content: 'You retain full ownership of all content you provide (logos, images, text, branding). You grant us permission to use this content solely to deliver your project.',
      },
      {
        subheading: '8.2 Our work',
        content: 'Upon full payment, ownership of the final website code, design assets, and booking system transfers to you. You may use, modify, and host the website as you wish.',
      },
      {
        subheading: '8.3 Our tools and methodologies',
        content: 'We retain ownership of any reusable templates, frameworks, code libraries, and methodologies we use across clients. You receive a perpetual licence to use these as integrated into your website.',
      },
      {
        subheading: '8.4 Portfolio rights',
        content: 'We reserve the right to display your completed project in our portfolio, case studies, and marketing materials unless you request otherwise in writing.',
      },
    ],
  },
  {
    heading: '9. Third-party services',
    content: 'Our builds integrate with third-party services (such as Stripe, Supabase, Resend, Google Calendar). You are responsible for maintaining your own accounts and complying with those providers\' terms. We are not liable for outages, pricing changes, or policy changes made by third parties.',
  },
  {
    heading: '10. Liability',
    intro: 'To the fullest extent permitted by law, we are not liable for:',
    list: [
      'Loss of profits, revenue, or business opportunities',
      'Loss of data (though we take reasonable steps to protect it)',
      'Indirect, incidental, or consequential damages',
      'Issues caused by third-party services or your own hosting decisions',
    ],
    outro: 'Our total liability for any claim relating to the services is limited to the amount you paid us in the 12 months preceding the claim.',
  },
  {
    heading: '11. Data protection',
    content: 'Our handling of personal data is governed by our Privacy Policy, available at aesthetix-systems.co.uk/privacy-policy.',
  },
  {
    heading: '12. Termination',
    content: 'Either party may terminate the engagement in writing. If you terminate after work has begun, deposits are non-refundable and any additional work completed up to that point will be invoiced.\n\nWe may terminate immediately if you breach these Terms, fail to pay, or behave abusively towards our team.',
  },
  {
    heading: '13. Governing law',
    content: 'These Terms are governed by the laws of England and Wales. Any disputes shall be resolved in the courts of England and Wales.',
  },
  {
    heading: '14. Changes to these Terms',
    content: 'We may update these Terms from time to time. The "Last updated" date reflects the latest version. Material changes will be communicated via our website.',
  },
  {
    heading: '15. Contact us',
    contact: true,
  },
];

function renderListItem(item: ListItem, j: number) {
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

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | Aesthetix Systems';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'The Terms of Service governing Aesthetix Systems\' website and bespoke build services.');
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
            Terms of{' '}
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>Service</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkMute, margin: 0 }}>
            Last updated: 23 April 2026
          </motion.p>
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
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, margin: s.list || s.subsections ? '0 0 14px' : 0, whiteSpace: 'pre-line' }}>
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
              {s.subsections && s.subsections.map((sub, si) => (
                <div key={si} style={{ marginBottom: si < (s.subsections?.length ?? 0) - 1 ? 24 : 0 }}>
                  <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 15, color: charcoal, margin: '0 0 10px', letterSpacing: '0.01em' }}>
                    {sub.subheading}
                  </h3>
                  {sub.content && (
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.82, margin: sub.list ? '0 0 12px' : 0 }}>
                      {sub.content}
                    </p>
                  )}
                  {sub.list && (
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {sub.list.map((item, j) => renderListItem(item, j))}
                    </ul>
                  )}
                </div>
              ))}
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
