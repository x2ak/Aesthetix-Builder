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
        <a href="/" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkMute, textDecoration: 'none', letterSpacing: '0.04em' }}>← Back to home</a>
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
    heading: '1. About these terms',
    content: `These Terms & Conditions ("Terms") govern the supply of website, booking platform, hosting and related services ("Services") by Aesthetix Systems ("we", "us", "Aesthetix Systems") to the business client who orders them ("you", "the Client").\n\nBy paying a deposit, signing a proposal, or beginning a monthly plan, you agree to these Terms. They apply alongside any individual proposal or build contract; where a signed proposal conflicts with these Terms, the signed proposal takes precedence.\n\nContact: info@aesthetix-systems.co.uk · aesthetix-systems.co.uk`,
  },
  {
    heading: '2. The Services',
    content: `Aesthetix Systems builds bespoke booking platforms and websites for aesthetics and related clinics, and provides ongoing hosting, maintenance and optional support under a monthly plan.\n\nThe one-off build fee for your platform is set out in your individual proposal or build contract. These Terms primarily govern the ongoing monthly plan that begins once your platform is live, and the contract terms attached to it.`,
  },
  {
    heading: '3. Monthly plans',
    content: 'All monthly fees are quoted in GBP. "From" prices are starting points; your actual monthly fee depends on the features included in your build and is confirmed in your proposal or build contract.',
    subsections: [
      {
        subheading: '3.1 Core — from £19.99/month',
        content: 'Includes:',
        list: [
          'Website and booking platform hosting',
          'SSL certificate (secure HTTPS)',
          'Database hosting and maintenance',
          'Platform security and uptime maintenance',
        ],
      },
      {
        subheading: '',
        content: 'Site changes are not included on the Core plan. If you need changes after handover, you can either: (a) pay for each change separately on an ad-hoc quoted basis; or (b) upgrade to the Core + Changes plan (see 3.2).',
      },
      {
        subheading: '3.2 Core + Changes — £34.99/month',
        content: 'Includes everything in Core, plus 4 hours of site changes per month (copy edits, treatment/menu updates, price changes, availability updates, minor tweaks, bug fixes).\n\nUnused hours do not roll over. Work beyond the 4-hour monthly allowance is quoted and billed separately before it is carried out. New features (as opposed to changes) are always treated as separate quoted work, not as part of the allowance.\n\nYou may upgrade to this plan at any time. Upgrading starts a new 12-month minimum term from the date of upgrade (see section 8).',
      },
      {
        subheading: '3.3 Premium Plus — from £59.99/month',
        content: 'Includes everything in Core, plus:',
        list: [
          'Branded SMS sender ID (your clinic name shown as the sender instead of a generic +44 number)',
          'AI receptionist — included so you never run out of conversations or miss converting an enquiry into a booking',
          '£10 of SMS campaign credit per month',
        ],
      },
      {
        subheading: '',
        content: 'In the rare event AI usage exceeds normal fair use in a given month, a single one-off charge of £9.99 applies for that month. This is very unlikely to happen.\n\nSMS campaign sends use your £10 monthly credit first. Once that credit is used, further sends are charged on a pay-as-you-go basis, which you can top up at any time from your admin portal.',
      },
      {
        subheading: '3.4 Custom Build — from £59.99/month',
        content: 'For builds with a bespoke feature set. The monthly fee is set per build according to the features included, and is confirmed in your custom build contract. SMS campaign credit, AI receptionist, and overage charges follow the same model as Premium Plus.',
      },
    ],
  },
  {
    heading: '4. SMS campaigns (Premium Plus & Custom)',
    content: `Branded SMS marketing campaigns are charged on a pay-as-you-go basis, separate from your monthly fee.\n\nBefore any campaign is sent, your admin portal shows a full cost breakdown (network cost, our send fee, and total). The total is charged before the campaign sends.\n\nLonger messages, branded sender IDs, and certain characters or emojis may split a message into multiple parts ("segments"), each charged separately. The portal calculates this automatically and shows you the total before you confirm.\n\nYou are responsible for ensuring your SMS campaigns comply with applicable marketing and data protection law, including obtaining valid consent from recipients and providing an opt-out.`,
  },
  {
    heading: '5. What\'s included and what\'s not',
    content: 'Included in your monthly plan: hosting, SSL, database, security and uptime maintenance as set out in your plan; and, on the Core + Changes plan, 4 hours of changes per month.',
    intro: 'Not included (billed separately or by other providers):',
    list: [
      'One-off build fee (per your proposal/build contract)',
      'New features or design work beyond your plan\'s scope',
      'Third-party fees you incur directly or that pass through your account (e.g. payment processing fees, SMS network costs, additional AI usage)',
      'Search engine optimisation, paid advertising management, and content creation, unless separately agreed',
      'Stock photography and copywriting beyond what is extracted from your existing materials',
    ],
  },
  {
    heading: '6. Payment terms',
    content: `Monthly fees are billed in advance, on a recurring basis, via the payment method on file (card or direct debit through our payment provider).\n\nYour monthly plan begins as set out in your proposal or build contract (for some clients an initial fee-free period applies; this will be stated in writing).\n\nIf a payment fails, we may suspend Services (including taking your site offline) after giving you reasonable notice and an opportunity to resolve it. Services resume once the account is brought up to date.\n\nPay-as-you-go charges (AI top-ups, SMS campaigns) are charged at the time of the top-up or send.`,
  },
  {
    heading: '7. Ownership',
    content: 'On full payment of your one-off build fee, ownership of your platform — source code, domain, brand assets and your client data — transfers to you, as set out in your build contract. Your ongoing monthly plan covers the hosting and services needed to keep it running; it does not affect your ownership of the platform itself.',
  },
  {
    heading: '8. Minimum term',
    content: 'Every monthly plan has a 12-month minimum term unless your individual contract states otherwise. The term begins on the start date stated in your proposal or build contract.\n\nIf you upgrade your plan, a new 12-month minimum term begins on the date of the upgrade. The previous term is superseded by the new one.',
  },
  {
    heading: '9. Cancellation and early termination',
    content: `You may cancel at the end of your minimum term by giving written notice (email is sufficient) at least 30 days before the term ends.\n\nIf you cancel before the end of your minimum term, an early-termination charge applies: 50% of the total remaining monthly fees for the unexpired portion of the term, payable upfront on cancellation. Your admin portal shows the current figure at any time. This charge reflects the committed costs and capacity reserved for your account over the agreed term.\n\nWe may terminate or suspend Services for non-payment, breach of these Terms, or misuse of the platform (including unlawful use of SMS/AI features), with reasonable notice where practicable.`,
  },
  {
    heading: '10. Hosting, uptime and third-party services',
    content: 'We aim to keep your platform available and maintained but do not guarantee uninterrupted service. Downtime may occur due to maintenance, third-party providers, or events outside our control.\n\nYour platform relies on third-party services (e.g. payment processing, email, SMS, AI, calendar). Their availability and pricing are outside our control, and their own terms apply to their parts of the service.',
  },
  {
    heading: '11. Your data and your clients\' data',
    content: 'You remain the data controller for your own and your clients\' personal data held in your platform; we act as a data processor in providing the Services.\n\nYou are responsible for using the platform — including booking data, medical/consent forms, and SMS/email marketing — in compliance with UK GDPR, the Data Protection Act 2018, and applicable marketing regulations.\n\nWe handle personal data only as needed to provide the Services and in line with applicable data protection law.',
  },
  {
    heading: '12. Liability',
    content: `Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or anything else that cannot lawfully be limited.\n\nSubject to that, our total liability arising out of or in connection with the Services is limited to the total fees you have paid us in the 12 months preceding the event giving rise to the claim.\n\nWe are not liable for indirect or consequential loss, loss of profit, loss of business, or loss of data, except where such loss cannot lawfully be excluded.`,
  },
  {
    heading: '13. Changes to these terms',
    content: 'We may update these Terms from time to time. Material changes affecting your plan or fees will be notified to you in advance. Continued use of the Services after a change takes effect constitutes acceptance.',
  },
  {
    heading: '14. Governing law',
    content: 'These Terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.',
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
    document.title = 'Terms & Conditions | Aesthetix Systems';
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
            Terms &{' '}
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>Conditions</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkMute, margin: 0 }}>
            Last updated: 28 May 2026
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
                  {sub.subheading && (
                    <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 15, color: charcoal, margin: '0 0 10px', letterSpacing: '0.01em' }}>
                      {sub.subheading}
                    </h3>
                  )}
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
