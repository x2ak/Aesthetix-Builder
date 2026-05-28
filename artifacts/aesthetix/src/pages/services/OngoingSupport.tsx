import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, Zap, MessageCircle, RefreshCw } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const cream = "#F7F4EE";
const charcoal = "#1A1A1C";
const inkSoft = "#4A4A4E";
const inkMute = "#8A8A8E";
const gold = "#C4A882";
const goldTint = "#F5EDD9";
const line = "#E5DFD3";
const surface = "#FFFFFF";
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20maintenance%20plan%20for%20my%20clinic!";

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

const PLANS = [
  {
    tag: "Core",
    price: "£19.99",
    period: "/mo",
    note: "Essential protection",
    highlight: false,
    features: [
      { label: "Hosting & SSL certificate", detail: "Your site stays live, secure, and fast. Always." },
      { label: "Database & server maintenance", detail: "Backend kept healthy and optimised." },
      { label: "Security patches", detail: "We apply updates as soon as they're released." },
      { label: "Uptime monitoring", detail: "24/7 automated alerts if anything goes down." },
      { label: "Site changes billed separately", detail: "Content updates quoted on request at our standard rate." },
    ],
    waMsg: "Hi Sim, I'm interested in the Core maintenance plan!",
  },
  {
    tag: "Core + Changes",
    price: "£34.99",
    period: "/mo",
    note: "Most popular",
    highlight: true,
    features: [
      { label: "Everything in Core", detail: "Full hosting, SSL, security and monitoring." },
      { label: "4 hours of changes per month", detail: "Copy updates, price changes, new treatment pages, images — anything." },
      { label: "Rollover unused hours", detail: "Unused time from quiet months rolls over." },
      { label: "Priority WhatsApp support", detail: "Message Sim directly — response within a few hours." },
      { label: "Quarterly performance review", detail: "We check your site speed and SEO quarterly." },
    ],
    waMsg: "Hi Sim, I'm interested in the Core + Changes plan!",
  },
  {
    tag: "Premium Plus",
    price: "£59.99",
    period: "/mo",
    note: "The full package",
    highlight: false,
    features: [
      { label: "Everything in Core + Changes", detail: "All maintenance, hosting, and change hours." },
      { label: "AI receptionist included", detail: "24/7 AI that answers questions and books patients — always on." },
      { label: "Branded SMS sender ID", detail: "Your clinic name appears as the SMS sender, not a number." },
      { label: "£10/mo SMS campaign credit", detail: "Send patient campaigns, appointment reminders, and promos." },
      { label: "£9.99 fair-use overage", detail: "Predictable costs even in busy months." },
    ],
    waMsg: "Hi Sim, I'm interested in the Premium Plus plan!",
  },
  {
    tag: "Custom",
    price: "Custom",
    period: "",
    note: "Tailored to you",
    highlight: false,
    features: [
      { label: "All Premium Plus features", detail: "The full package as the baseline." },
      { label: "Bespoke development hours", detail: "Ongoing feature development, integrations, and custom builds." },
      { label: "Dedicated account manager", detail: "One point of contact for everything." },
      { label: "Fee confirmed per project", detail: "Scoped and priced around your specific requirements." },
    ],
    waMsg: "Hi Sim, I'm interested in a custom maintenance plan!",
  },
];

const WHY = [
  {
    icon: <Shield size={20} color={gold} />,
    title: "Security never sleeps",
    body: "Outdated plugins and expired SSL certificates are the number one cause of clinic websites getting hacked or blacklisted by Google. We make sure yours stays protected.",
  },
  {
    icon: <Zap size={20} color={gold} />,
    title: "Speed = bookings",
    body: "A website that takes 4 seconds to load loses 80% of mobile visitors. We keep your site performing at its peak — updates, caching, image optimisation.",
  },
  {
    icon: <RefreshCw size={20} color={gold} />,
    title: "Your content stays fresh",
    body: "New treatments, updated pricing, seasonal promotions — your website should always reflect your current offering. Not what you launched with 18 months ago.",
  },
  {
    icon: <MessageCircle size={20} color={gold} />,
    title: "You have someone to call",
    body: "If something looks wrong, just message. No tickets. No support queues. Just WhatsApp Sim directly and it gets fixed.",
  },
];

const WHATHAPPENS = [
  "Your SSL certificate expires — Chrome flags your site as 'Not Secure'",
  "A plugin update breaks your booking calendar overnight",
  "Your hosting provider has an outage with no one to escalate to",
  "A Google algorithm update tanks your rankings with no one to respond",
  "Your treatment menu is outdated but you can't update it yourself",
  "A patient reports the contact form isn't working — you don't find out for days",
];

export default function OngoingSupport() {
  const isMobile = useIsMobile();
  const [openPlan, setOpenPlan] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useSEO({
    title: "Clinic Website Maintenance & Support | Aesthetix Systems",
    description: "Monthly maintenance plans for aesthetics clinic websites. Hosting, security, content updates, AI receptionist, and priority WhatsApp support. From £19.99/month.",
    canonical: "/services/ongoing-support",
  });

  return (
    <div style={{ background: charcoal, minHeight: "100vh", fontFamily: BODY }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(26,26,28,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 60 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
              <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, color: cream, letterSpacing: "0.16em", margin: 0, lineHeight: 1 }}>AESTHETIX</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7.5, color: gold, letterSpacing: "0.24em", margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
            </div>
          </div>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 400, fontSize: 12, color: "rgba(247,244,238,0.45)" }}>← Back</button>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "10px 20px", borderRadius: 2, textDecoration: "none" }}>Get a Quote</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 100, paddingBottom: isMobile ? 64 : 100, paddingLeft: 24, paddingRight: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", right: "10%", width: 400, height: 400, background: "radial-gradient(ellipse, rgba(196,168,130,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Ongoing Support</p>
            <h1 style={{ fontFamily: DISP, fontSize: isMobile ? "clamp(36px,10vw,48px)" : "clamp(48px,6vw,72px)", fontWeight: 400, color: cream, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
              Your website,<br /><em style={{ fontStyle: "italic", color: gold }}>always at its best.</em>
            </h1>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 15 : 18, color: "rgba(247,244,238,0.6)", lineHeight: 1.75, maxWidth: 580, margin: "0 0 40px" }}>
              A great website isn't a one-time project — it's a living asset. Our maintenance plans keep yours fast, secure, up to date, and generating bookings month after month.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "16px 32px", borderRadius: 2, textDecoration: "none" }}>
              View Plans <ArrowRight size={14} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* What happens without it */}
      <section style={{ padding: isMobile ? "56px 20px" : "80px 32px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(196,168,130,0.6)", marginBottom: 12 }}>Without a Plan</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 24 : 34, fontWeight: 400, color: cream, marginBottom: 32, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              What happens when <em style={{ fontStyle: "italic", color: gold }}>no one's watching.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
            {WHATHAPPENS.map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "16px 18px" }}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠️</span>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: "rgba(247,244,238,0.55)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: charcoal }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Why It Matters</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: cream, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Your website is your <em style={{ fontStyle: "italic", color: gold }}>hardest-working employee.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {WHY.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.08}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,168,130,0.12)", borderRadius: 14, padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(196,168,130,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{w.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: cream, margin: "0 0 8px" }}>{w.title}</h3>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: "rgba(247,244,238,0.5)", lineHeight: 1.7, margin: 0 }}>{w.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Maintenance Plans</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: cream, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Simple plans. <em style={{ fontStyle: "italic", color: gold }}>Total peace of mind.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 12 }}>
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.tag} delay={i * 0.08}>
                <div style={{ background: plan.highlight ? "rgba(196,168,130,0.09)" : "rgba(255,255,255,0.03)", border: plan.highlight ? "1.5px solid rgba(196,168,130,0.5)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: isMobile ? "28px 22px" : "28px 22px", display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
                  {plan.highlight && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: gold, color: charcoal, fontFamily: BODY, fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 20 }}>Popular</div>
                  )}
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: plan.highlight ? gold : "rgba(247,244,238,0.4)", margin: "0 0 8px" }}>{plan.tag}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
                    <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 36 : 32, color: plan.highlight ? gold : cream, lineHeight: 1 }}>{plan.price}</span>
                    {plan.period && <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: "rgba(247,244,238,0.35)" }}>{plan.period}</span>}
                  </div>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: "rgba(247,244,238,0.3)", marginBottom: 20 }}>{plan.note}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {plan.features.map((f) => (
                      <li key={f.label}>
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }} onClick={() => setOpenPlan(openPlan === i ? null : i)}>
                          <Check size={13} color={gold} style={{ flexShrink: 0, marginTop: 3 }} />
                          <div>
                            <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 12, color: "rgba(247,244,238,0.75)", lineHeight: 1.4 }}>{f.label}</span>
                            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: "rgba(247,244,238,0.35)", lineHeight: 1.5, margin: "3px 0 0" }}>{f.detail}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <a href={`https://wa.me/447495963388?text=${encodeURIComponent(plan.waMsg)}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: plan.highlight ? charcoal : cream, background: plan.highlight ? gold : "rgba(255,255,255,0.07)", border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "13px 16px", textDecoration: "none" }}>
                    Get Started
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Response promise */}
      <section style={{ padding: isMobile ? "48px 20px" : "64px 32px", background: charcoal }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ background: "rgba(196,168,130,0.08)", border: "1px solid rgba(196,168,130,0.2)", borderRadius: 20, padding: isMobile ? "32px 24px" : "48px 48px" }}>
              <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Our Promise</p>
              <h2 style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 26 : 34, fontWeight: 400, color: cream, marginBottom: 16 }}>
                "If something's wrong with your site, we fix it — not next week, not tomorrow. Today."
              </h2>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: "rgba(247,244,238,0.45)", lineHeight: 1.7, marginBottom: 0 }}>
                Priority plan clients message Sim on WhatsApp and get a response within a few hours. Because your booking system going down at 6pm on a Friday isn't something that can wait until Monday.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", textAlign: "center", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <FadeIn>
          <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 30 : 48, fontWeight: 400, color: cream, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Protect your <em style={{ fontStyle: "italic", color: gold }}>biggest asset.</em>
          </h2>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: "rgba(247,244,238,0.45)", marginBottom: 36 }}>Message Sim to discuss which plan fits your clinic.</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "18px 36px", borderRadius: 2, textDecoration: "none" }}>
            Message on WhatsApp <ArrowRight size={14} />
          </a>
        </FadeIn>
      </section>

      <footer style={{ background: cream, borderTop: `1px solid ${line}` }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "44px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
                <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, color: charcoal, letterSpacing: "0.16em", margin: 0, lineHeight: 1 }}>AESTHETIX</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7.5, color: gold, letterSpacing: "0.24em", margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
              </div>
            </div>
          </button>
          <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 15, color: gold, margin: "0 0 28px", lineHeight: 1.5, opacity: 0.9 }}>We build the digital presence your clinic deserves.</p>
          <div style={{ textAlign: "center", marginBottom: 20, lineHeight: 2.2 }}>
            {[
              { label: "Bespoke Websites", path: "/services/bespoke-websites" },
              { label: "Booking Systems", path: "/services/booking-systems" },
              { label: "AI Assistant", path: "/services/ai-assistant" },
              { label: "Ongoing Support", path: "/services/ongoing-support" },
            ].map(({ label, path }, i, arr) => (
              <span key={label} style={{ whiteSpace: "nowrap" }}>
                <a href={path} onClick={(e) => { e.preventDefault(); navigate(path); }} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkSoft, textDecoration: "none", letterSpacing: "0.02em" }}>{label}</a>
                {i < arr.length - 1 && <span style={{ color: line, margin: "0 8px", fontSize: 9 }}>·</span>}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <a href="https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20clinic!" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "50%", border: `1px solid ${line}`, color: gold, textDecoration: "none", flexShrink: 0 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.855L.057 23.09a.75.75 0 0 0 .921.921l5.233-1.474A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.953-1.354l-.355-.21-3.678 1.034 1.034-3.677-.21-.356A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            </a>
            <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "50%", border: `1px solid ${line}`, color: gold, textDecoration: "none", flexShrink: 0 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com/@aesthetix_systems" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "50%", border: `1px solid ${line}`, color: gold, textDecoration: "none", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
            </a>
          </div>
          <div style={{ height: 1, background: line, marginBottom: 20, width: "100%" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, letterSpacing: "0.03em" }}>© {new Date().getFullYear()} Aesthetix Systems</span>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4px 20px" }}>
              <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, letterSpacing: "0.03em" }}>London, UK</span>
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, textDecoration: "none", letterSpacing: "0.03em" }}>Privacy Policy</a>
              <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, textDecoration: "none", letterSpacing: "0.03em" }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
