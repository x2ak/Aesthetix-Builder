import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, X } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const cream = "#F7F4EE";
const charcoal = "#1A1A1C";
const inkSoft = "#4A4A4E";
const inkMute = "#8A8A8E";
const gold = "#C4A882";
const goldTint = "#F5EDD9";
const blush = "#E8D5D2";
const line = "#E5DFD3";
const surface = "#FFFFFF";
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20bespoke%20website%20for%20my%20clinic!";

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 769);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 769);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
        <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: "left" }}>
        <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, color: charcoal, letterSpacing: "0.16em", margin: 0, lineHeight: 1 }}>AESTHETIX</p>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7, color: gold, letterSpacing: "0.24em", margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
      </div>
    </div>
  );
}

const PROCESS = [
  { n: "01", title: "Discovery Call", body: "We start with a 30-minute call to understand your clinic, your patients, and your goals. No templates, no assumptions — just your story." },
  { n: "02", title: "Brand & Concept", body: "We develop a visual direction tailored to your clinic's identity — colours, typography, tone of voice. You sign off before we touch a line of code." },
  { n: "03", title: "Design", body: "Full page designs, beautifully crafted in every pixel. You'll see exactly how your site looks before it's built — desktop and mobile." },
  { n: "04", title: "Build & Test", body: "We code everything by hand. Fast, clean, accessible. Tested across every device and browser before it goes live." },
  { n: "05", title: "Launch", body: "Your site goes live. We handle everything — domain, hosting, SSL. You get the keys. You own it entirely, forever." },
];

const INCLUDED = [
  { cat: "Design", items: ["Custom visual identity", "Mobile-first layouts", "Dark/light mode option", "Custom iconography & illustrations"] },
  { cat: "Performance", items: ["Sub-2-second load time", "Image optimisation", "Core Web Vitals optimised", "SEO structure built in"] },
  { cat: "Features", items: ["Booking system integration", "Treatment menu pages", "Before & after gallery", "Patient testimonial section"] },
  { cat: "Copy & Content", items: ["Copywriting consultation", "Treatment descriptions", "About & team pages", "FAQ section"] },
  { cat: "Technical", items: ["Custom domain setup", "SSL certificate", "Analytics integration", "GDPR-compliant cookie policy"] },
  { cat: "Launch", items: ["You own all the code", "Full handover & training", "30-day post-launch support", "No lock-in, ever"] },
];

const COMPARE = [
  { label: "Unique to your clinic", template: false },
  { label: "Built around your brand", template: false },
  { label: "No Wix / Squarespace branding", template: false },
  { label: "You own the code", template: false },
  { label: "Custom booking integration", template: false },
  { label: "Optimised for your treatments", template: false },
  { label: "Loads fast on mobile", template: "Sometimes" },
  { label: "SEO-ready from day one", template: "Partial" },
];

const PRICING = [
  {
    label: "Core",
    build: "£1,499",
    monthly: "from £19.99/mo",
    note: "The complete clinic system",
    highlight: false,
    features: [
      "Full bespoke multi-page website",
      "Your own branded booking platform",
      "50% Stripe deposits",
      "Automated SMS + email confirmations",
      "Private admin portal",
      "Mobile-first, loads in under 2s",
      "Custom domain + hosting included",
    ],
  },
  {
    label: "Premium",
    build: "£2,499",
    monthly: "from £59.99/mo",
    note: "Everything in Core, plus AI",
    highlight: true,
    features: [
      "Everything in Core",
      "AI trained on your treatments",
      "Books enquiries 24/7 automatically",
      "Multi-practitioner management",
      "Analytics & insights dashboard",
      "Priority support & updates",
    ],
  },
  {
    label: "Custom",
    build: "Let's talk",
    monthly: "custom",
    note: "Built around your exact needs",
    highlight: false,
    features: [
      "Everything in Core & Premium",
      "Loyalty schemes & memberships",
      "Training academies & courses",
      "Multi-location & franchise setups",
      "Online stores & e-commerce",
      "Any feature or integration you need",
    ],
  },
];

export default function BespokeWebsites() {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useSEO({
    title: "Bespoke Clinic Website Design | Aesthetix Systems",
    description: "Custom-designed websites for aesthetics and beauty clinics. No templates. Built around your brand, your treatments, and your patients. From £1,499.",
    canonical: "/services/bespoke-websites",
  });

  return (
    <div style={{ background: cream, minHeight: "100vh", fontFamily: BODY }}>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(247,244,238,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 60 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Logo />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 400, fontSize: 12, color: inkSoft }}>← Back</button>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "10px 18px", borderRadius: 2, textDecoration: "none" }}>Get a Quote</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, paddingTop: 100, paddingBottom: isMobile ? 64 : 100, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Bespoke Website Design</p>
            <h1 style={{ fontFamily: DISP, fontSize: isMobile ? "clamp(36px,10vw,48px)" : "clamp(48px,6vw,72px)", fontWeight: 400, color: charcoal, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
              Not a template.<br />Not a theme.<br /><em style={{ fontStyle: "italic", color: gold }}>A website built for your clinic.</em>
            </h1>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 15 : 18, color: inkSoft, lineHeight: 1.75, maxWidth: 580, margin: "0 0 40px" }}>
              Every clinic is different. Every patient journey is different. Your website should be too. We design and build entirely from scratch — no page builders, no themes, no shortcuts.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "16px 28px", borderRadius: 2, textDecoration: "none" }}>Start Your Project</a>
              <button onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: inkSoft, background: "transparent", border: `1.5px solid rgba(74,74,78,0.3)`, padding: "16px 24px", borderRadius: 2, cursor: "pointer" }}>See the Process</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Template vs Bespoke — no-scroll card rows */}
      <section style={{ padding: isMobile ? "56px 20px" : "100px 32px", background: cream }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Why It Matters</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 26 : 42, fontWeight: 400, color: charcoal, marginBottom: 36, letterSpacing: "-0.02em", maxWidth: 520, lineHeight: 1.2 }}>
              Templates build <em style={{ fontStyle: "italic" }}>average clinics.</em> We build exceptional ones.
            </h2>
          </FadeIn>

          {/* Column headers */}
          <FadeIn delay={0.05}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 0, paddingBottom: 10, borderBottom: `1px solid ${line}`, marginBottom: 0 }}>
              <div />
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: isMobile ? 9 : 11, letterSpacing: "0.1em", textTransform: "uppercase", color: inkMute }}>Template</span>
              </div>
              <div style={{ textAlign: "center", background: goldTint, borderRadius: "4px 4px 0 0", paddingTop: 6, paddingBottom: 6 }}>
                <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: isMobile ? 9 : 11, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal }}>Bespoke</span>
              </div>
            </div>
          </FadeIn>

          {COMPARE.map((row, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", alignItems: "center", borderBottom: `1px solid ${line}` }}>
                <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 13 : 14, color: inkSoft, padding: "14px 0 14px" }}>{row.label}</div>
                <div style={{ textAlign: "center", padding: "14px 0" }}>
                  {row.template === false
                    ? <X size={13} color="#D4A5A5" />
                    : <span style={{ fontFamily: BODY, fontSize: 10, color: inkMute }}>{row.template}</span>}
                </div>
                <div style={{ textAlign: "center", padding: "14px 0", background: goldTint }}>
                  <Check size={14} color={gold} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" style={{ background: `linear-gradient(180deg, #FAF8F3 0%, ${cream} 100%)`, padding: isMobile ? "64px 20px" : "100px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>The Process</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: charcoal, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              From your first message to <em style={{ fontStyle: "italic" }}>live in weeks.</em>
            </h2>
          </FadeIn>
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {PROCESS.map((step, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div style={{ borderTop: `1px solid ${line}`, padding: "24px 0", display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 32, color: `rgba(196,168,130,0.4)`, lineHeight: 1, flexShrink: 0 }}>{step.n}</span>
                    <div>
                      <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: charcoal, margin: "0 0 8px" }}>{step.title}</h3>
                      <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.65, margin: 0 }}>{step.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1px solid ${line}` }}>
                {PROCESS.map((step, i) => (
                  <button key={i} onClick={() => setActiveStep(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "20px 24px 0", textAlign: "center", position: "relative", outline: "none" }}>
                    <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "2.2rem", color: i === activeStep ? gold : "rgba(196,168,130,0.28)", lineHeight: 1, display: "block", marginBottom: 6, transition: "color 0.3s", textShadow: i === activeStep ? "0 0 28px rgba(196,168,130,0.55)" : "none" }}>{step.n}</span>
                    <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: i === activeStep ? charcoal : inkMute, display: "block", marginBottom: 16, transition: "color 0.3s" }}>{step.title}</span>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: i === activeStep ? gold : "transparent", transition: "background 0.3s" }} />
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={activeStep} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} style={{ background: surface, border: `1px solid ${line}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: "36px 40px" }}>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: inkSoft, lineHeight: 1.8, margin: 0, maxWidth: 580 }}>{PROCESS[activeStep].body}</p>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* What's Included */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>What's Included</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: charcoal, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Everything your clinic <em style={{ fontStyle: "italic" }}>actually needs.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
            {INCLUDED.map((cat, i) => (
              <FadeIn key={cat.cat} delay={i * 0.07}>
                <div style={{ background: i % 2 === 0 ? cream : surface, border: `1px solid rgba(201,168,130,0.25)`, borderLeft: `3px solid ${gold}`, borderRadius: 14, padding: isMobile ? "24px 20px" : "28px 24px", height: "100%" }}>
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, margin: "0 0 16px" }}>{cat.cat}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {cat.items.map((item) => (
                      <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Check size={13} color={gold} style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — real packages */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: charcoal }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn style={{ textAlign: isMobile ? "left" : "center" }}>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Investment</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: cream, marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              One build price. <em style={{ fontStyle: "italic", color: gold }}>Yours forever.</em>
            </h2>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 14 : 15, color: "rgba(247,244,238,0.55)", marginBottom: 48, lineHeight: 1.7, maxWidth: 520, margin: isMobile ? "0 0 36px" : "0 auto 48px" }}>No monthly platform fees. No Squarespace. No Wix. One build investment — then a small monthly maintenance plan to keep everything running perfectly.</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
            {PRICING.map((tier, i) => (
              <FadeIn key={tier.label} delay={i * 0.1}>
                <div style={{ background: tier.highlight ? "rgba(196,168,130,0.10)" : "rgba(255,255,255,0.03)", border: tier.highlight ? `1.5px solid rgba(196,168,130,0.5)` : `1px solid rgba(255,255,255,0.07)`, borderRadius: 16, padding: isMobile ? "28px 22px" : "28px 24px", display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
                  {tier.highlight && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: gold, color: charcoal, fontFamily: BODY, fontWeight: 700, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>Most Popular</div>
                  )}
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tier.highlight ? gold : "rgba(247,244,238,0.4)", margin: "0 0 10px" }}>{tier.label}</p>
                  <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 34 : 36, color: tier.highlight ? gold : cream, margin: "0 0 2px", lineHeight: 1 }}>{tier.build}</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: "rgba(247,244,238,0.35)", margin: "0 0 4px" }}>+ {tier.monthly} maintenance</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: "rgba(247,244,238,0.4)", margin: "0 0 20px", lineHeight: 1.4 }}>{tier.note}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Check size={12} color={gold} style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 300, color: "rgba(247,244,238,0.7)", lineHeight: 1.45 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(tier.label)}%20package!`} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: tier.highlight ? charcoal : cream, background: tier.highlight ? gold : "rgba(255,255,255,0.07)", border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "13px 16px", textDecoration: "none" }}>
                    Get Started
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} style={{ textAlign: "center" }}>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: "rgba(247,244,238,0.3)", marginBottom: 0 }}>
              Not sure which plan is right for you? Message Sim on WhatsApp — we'll scope it out together.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: cream, borderTop: `1px solid ${line}`, padding: "32px 24px", textAlign: "center" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
            <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, color: charcoal, letterSpacing: "0.16em", margin: 0, lineHeight: 1 }}>AESTHETIX</p>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 6.5, color: gold, letterSpacing: "0.24em", margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
          </div>
        </button>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, margin: 0 }}>© {new Date().getFullYear()} Aesthetix Systems · London, UK</p>
      </footer>
    </div>
  );
}
