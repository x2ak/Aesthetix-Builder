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
const sage = "#6B8E5A";
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

const PROCESS = [
  {
    n: "01",
    title: "Discovery Call",
    body: "We start with a 30-minute call to understand your clinic, your patients, and your goals. No templates, no assumptions — just your story.",
  },
  {
    n: "02",
    title: "Brand & Concept",
    body: "We develop a visual direction tailored to your clinic's identity — colours, typography, tone of voice. You sign off before we touch a line of code.",
  },
  {
    n: "03",
    title: "Design",
    body: "Full page designs, beautifully crafted in every pixel. You'll see exactly how your site looks before it's built — desktop and mobile.",
  },
  {
    n: "04",
    title: "Build & Test",
    body: "We code everything by hand. Fast, clean, accessible. Tested across every device and browser before it goes live.",
  },
  {
    n: "05",
    title: "Launch",
    body: "Your site goes live. We handle everything — domain, hosting, SSL. You get the keys. You own it entirely, forever.",
  },
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
  { label: "Unique to your clinic", template: false, bespoke: true },
  { label: "Built around your brand", template: false, bespoke: true },
  { label: "No Wix / Squarespace branding", template: false, bespoke: true },
  { label: "You own the code", template: false, bespoke: true },
  { label: "Custom booking integration", template: false, bespoke: true },
  { label: "Optimised for your treatments", template: false, bespoke: true },
  { label: "Loads fast on mobile", template: "Sometimes", bespoke: true },
  { label: "SEO-ready from day one", template: "Partial", bespoke: true },
];

export default function BespokeWebsites() {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useSEO({
    title: "Bespoke Clinic Website Design | Aesthetix Systems",
    description: "Custom-designed websites for aesthetics and beauty clinics. No templates. Built around your brand, your treatments, and your patients. From £999.",
    canonical: "/services/bespoke-websites",
  });

  return (
    <div style={{ background: cream, minHeight: "100vh", fontFamily: BODY }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(247,244,238,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 60 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 18, color: charcoal }}>Aesthetix<span style={{ color: gold }}> Systems</span></span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 400, fontSize: 12, color: inkSoft, letterSpacing: "0.02em" }}>← Back</button>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "10px 20px", borderRadius: 2, textDecoration: "none" }}>Get a Quote</a>
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
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "16px 32px", borderRadius: 2, textDecoration: "none" }}>Start Your Project</a>
              <button onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: inkSoft, background: "transparent", border: `1.5px solid rgba(74,74,78,0.3)`, padding: "16px 28px", borderRadius: 2, cursor: "pointer" }}>See the Process</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Template vs Bespoke */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: cream }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Why It Matters</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: charcoal, marginBottom: 48, letterSpacing: "-0.02em", maxWidth: 560, lineHeight: 1.2 }}>
              Templates build <em style={{ fontStyle: "italic" }}>average clinics.</em> We build exceptional ones.
            </h2>
          </FadeIn>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
              <thead>
                <tr>
                  <th style={{ fontFamily: BODY, fontWeight: 400, fontSize: 12, color: inkMute, textAlign: "left", padding: "0 0 16px", letterSpacing: "0.05em", borderBottom: `1px solid ${line}` }}></th>
                  <th style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, color: inkMute, textAlign: "center", padding: "0 16px 16px", letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: `1px solid ${line}` }}>Template</th>
                  <th style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, color: charcoal, textAlign: "center", padding: "0 16px 16px", letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: `1.5px solid ${gold}`, background: goldTint, borderRadius: "4px 4px 0 0" }}>Bespoke</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${line}` }}>
                    <td style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, padding: "14px 0" }}>{row.label}</td>
                    <td style={{ textAlign: "center", padding: "14px 16px" }}>
                      {row.template === true ? <Check size={16} color={sage} /> : row.template === false ? <X size={14} color="#D4A5A5" /> : <span style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>{row.template}</span>}
                    </td>
                    <td style={{ textAlign: "center", padding: "14px 16px", background: goldTint }}>
                      <Check size={16} color={gold} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {PROCESS.map((step, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div style={{ borderTop: `1px solid ${line}`, padding: "24px 0", display: "flex", gap: 20, alignItems: "flex-start" }} onClick={() => setActiveStep(i)}>
                    <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 32, color: i === activeStep ? gold : `rgba(196,168,130,0.25)`, lineHeight: 1, flexShrink: 0, transition: "color 0.3s" }}>{step.n}</span>
                    <div>
                      <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: charcoal, margin: "0 0 8px" }}>{step.title}</h3>
                      <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.65, margin: 0 }}>{step.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1px solid ${line}`, marginBottom: 0 }}>
              {PROCESS.map((step, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "20px 24px 0", textAlign: "center", position: "relative", outline: "none" }}>
                  <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "2.2rem", color: i === activeStep ? gold : "rgba(196,168,130,0.28)", lineHeight: 1, display: "block", marginBottom: 6, transition: "color 0.3s", textShadow: i === activeStep ? "0 0 28px rgba(196,168,130,0.55)" : "none" }}>{step.n}</span>
                  <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: i === activeStep ? charcoal : inkMute, display: "block", marginBottom: 16, transition: "color 0.3s" }}>{step.title}</span>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: i === activeStep ? gold : "transparent", transition: "background 0.3s" }} />
                </button>
              ))}
            </div>
          )}
          {!isMobile && (
            <AnimatePresence mode="wait">
              <motion.div key={activeStep} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} style={{ background: surface, border: `1px solid ${line}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: "36px 40px" }}>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: inkSoft, lineHeight: 1.8, margin: 0, maxWidth: 580 }}>{PROCESS[activeStep].body}</p>
              </motion.div>
            </AnimatePresence>
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

      {/* Pricing */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: charcoal, textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Investment</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: cream, marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              One price. <em style={{ fontStyle: "italic", color: gold }}>You own it forever.</em>
            </h2>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: "rgba(247,244,238,0.6)", marginBottom: 48, lineHeight: 1.7 }}>No monthly platform fees. No Squarespace subscription. No Wix branding. One investment, yours forever.</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
            {[
              { label: "Essential", price: "from £999", note: "Perfect for new clinics", features: ["5 pages", "Booking integration", "Mobile optimised", "SEO foundations"] },
              { label: "Premium", price: "from £1,999", note: "For established clinics", features: ["10+ pages", "Custom illustrations", "Treatment gallery", "Advanced SEO"] },
              { label: "Premium Plus", price: "from £3,499", note: "The full package", features: ["Unlimited pages", "AI Receptionist", "Custom booking system", "Priority support"] },
            ].map((tier, i) => (
              <FadeIn key={tier.label} delay={i * 0.1}>
                <div style={{ background: i === 2 ? "rgba(196,168,130,0.12)" : "rgba(255,255,255,0.04)", border: i === 2 ? `1.5px solid rgba(196,168,130,0.5)` : `1px solid rgba(255,255,255,0.08)`, borderRadius: 14, padding: "28px 24px", textAlign: "left" }}>
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: i === 2 ? gold : inkMute, marginBottom: 8 }}>{tier.label}</p>
                  <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 32 : 36, color: i === 2 ? gold : cream, margin: "0 0 4px" }}>{tier.price}</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: "rgba(247,244,238,0.4)", marginBottom: 20 }}>{tier.note}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <Check size={12} color={gold} style={{ flexShrink: 0 }} />
                        <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 300, color: "rgba(247,244,238,0.7)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "18px 36px", borderRadius: 2, textDecoration: "none" }}>
              Get a Free Quote <ArrowRight size={14} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: cream, borderTop: `1px solid ${line}`, padding: "32px 24px", textAlign: "center" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: DISP, fontStyle: "italic", fontSize: 16, color: charcoal, marginBottom: 16 }}>
          Aesthetix<span style={{ color: gold }}> Systems</span>
        </button>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, margin: 0 }}>© {new Date().getFullYear()} Aesthetix Systems · London, UK</p>
      </footer>
    </div>
  );
}
