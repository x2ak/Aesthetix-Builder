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
          <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 18, color: cream }}>Aesthetix<span style={{ color: gold }}> Systems</span></span>
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

      <footer style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: DISP, fontStyle: "italic", fontSize: 16, color: cream, display: "block", margin: "0 auto 8px" }}>Aesthetix<span style={{ color: gold }}> Systems</span></button>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: "rgba(247,244,238,0.2)", margin: 0 }}>© {new Date().getFullYear()} Aesthetix Systems · London, UK</p>
      </footer>
    </div>
  );
}
