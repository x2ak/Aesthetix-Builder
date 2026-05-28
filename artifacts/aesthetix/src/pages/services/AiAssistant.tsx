import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Clock, MessageCircle, TrendingUp } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const cream = "#F7F4EE";
const charcoal = "#1A1A1C";
const charcoalSoft = "#2E2E32";
const inkSoft = "#4A4A4E";
const inkMute = "#8A8A8E";
const gold = "#C4A882";
const goldTint = "#F5EDD9";
const line = "#E5DFD3";
const surface = "#FFFFFF";
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20the%20AI%20receptionist%20for%20my%20clinic!";

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

const CONVERSATION = [
  { from: "client", msg: "Hi! How much is lip filler?" },
  { from: "clinic", msg: "Hi! Lip filler starts from £150 for 0.5ml and £220 for 1ml 💋 We use Juvederm Ultra — would you like to book a consultation?" },
  { from: "client", msg: "Yes please, when are you free?" },
  { from: "clinic", msg: "We have availability this Thursday at 2pm, Friday at 10am, or Saturday at 11am. Which works best for you?" },
  { from: "client", msg: "Saturday at 11 please!" },
  { from: "clinic", msg: "Perfect! I've reserved Saturday 11am for you. Just confirm your name and I'll send you a booking link 🌟" },
];

const CAPABILITIES = [
  { title: "Answers treatment questions", body: "Trained on your full treatment menu, pricing, and FAQs — so it answers exactly like you would. Accurately. Every time." },
  { title: "Captures leads 24/7", body: "At 11pm when a potential patient messages asking about Botox — your AI responds instantly rather than losing them to a competitor." },
  { title: "Books consultations", body: "Guides patients through to a booking or consultation request. Hands off the lead with full context when you come online." },
  { title: "Handles multiple conversations", body: "While you're in treatment with a patient, your AI is handling five enquiries simultaneously. No missed messages." },
  { title: "Knows your pricing", body: "Always quotes accurately. Always upsells tactfully. Never gives outdated information — we update it whenever you need." },
  { title: "Escalates when needed", body: "If a question is too complex or sensitive, it flags it for you personally. It knows the boundaries of its role." },
];

const HOW = [
  { n: "01", title: "We learn your clinic", body: "You send us your treatment menu, pricing, FAQs, and anything you want the AI to know. We do the rest." },
  { n: "02", title: "We train it on your voice", body: "The AI is configured to sound like your clinic — professional, warm, and on-brand. Not robotic." },
  { n: "03", title: "It goes live on your site", body: "Embedded directly into your website. No extra apps. No extra logins. Patients just message and it responds." },
  { n: "04", title: "We keep it updated", body: "Add new treatments, update pricing, change hours — we update your AI whenever you need, as part of your plan." },
];

const FAQ = [
  { q: "Will patients know they're talking to an AI?", a: "That's up to you. We can configure it to be transparent ('Hi, I'm the Aesthetix virtual assistant') or to present as part of your team. Either way, responses are so natural that most patients simply don't ask." },
  { q: "What if it gets a question wrong?", a: "It only answers questions within its training data. If it doesn't know something, it says so and offers to connect them with a team member — it never makes things up." },
  { q: "Can I update the AI's knowledge?", a: "Anytime. Just WhatsApp us with the change — new treatment, updated price, new opening hours — and we'll update it within 24 hours on your maintenance plan." },
  { q: "Does it work on Instagram DMs too?", a: "The website version is embedded on your site. Instagram DM integration is available as an add-on — ask us about it when you enquire." },
  { q: "Is it GDPR compliant?", a: "Yes. All conversations are processed in accordance with UK GDPR. We provide a data processing agreement as standard." },
];

export default function AiAssistant() {
  const isMobile = useIsMobile();
  const [visibleMsgs, setVisibleMsgs] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setInterval(() => setVisibleMsgs(v => v < CONVERSATION.length ? v + 1 : v), 1400);
    return () => clearInterval(t);
  }, []);

  useSEO({
    title: "AI Receptionist for Aesthetics Clinics | Aesthetix Systems",
    description: "24/7 AI receptionist for aesthetics and beauty clinics. Answers treatment questions, captures leads, and books consultations automatically. Never miss an enquiry.",
    canonical: "/services/ai-assistant",
  });

  return (
    <div style={{ background: charcoal, minHeight: "100vh", fontFamily: BODY }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(26,26,28,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 60 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 18, color: cream }}>Aesthetix<span style={{ color: gold }}> Systems</span></span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 400, fontSize: 12, color: "rgba(247,244,238,0.5)" }}>← Back</button>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "10px 20px", borderRadius: 2, textDecoration: "none" }}>Get a Quote</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 100, paddingBottom: isMobile ? 64 : 100, paddingLeft: 24, paddingRight: 24, position: "relative", overflow: "hidden" }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(196,168,130,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>AI Receptionist</p>
            <h1 style={{ fontFamily: DISP, fontSize: isMobile ? "clamp(36px,10vw,48px)" : "clamp(48px,6vw,72px)", fontWeight: 400, color: cream, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
              Always on.<br />Never wrong.<br /><em style={{ fontStyle: "italic", color: gold }}>Always booking.</em>
            </h1>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 15 : 18, color: "rgba(247,244,238,0.65)", lineHeight: 1.75, maxWidth: 580, margin: "0 0 40px" }}>
              Your clinic's AI receptionist answers treatment questions, captures enquiries, and books consultations — 24 hours a day, 7 days a week. Even when you're mid-treatment.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "16px 32px", borderRadius: 2, textDecoration: "none" }}>
              Add AI to My Clinic <ArrowRight size={14} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Live Demo */}
      <section style={{ padding: isMobile ? "64px 20px" : "80px 32px", background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>See It in Action</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 26 : 36, fontWeight: 400, color: cream, marginBottom: 32, letterSpacing: "-0.01em" }}>
              A real conversation. <em style={{ fontStyle: "italic", color: gold }}>Your AI.</em>
            </h2>
          </FadeIn>
          {/* Chat window */}
          <FadeIn delay={0.1}>
            <div style={{ background: charcoalSoft, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Chat header */}
              <div style={{ background: "rgba(255,255,255,0.04)", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageCircle size={16} color={charcoal} />
                </div>
                <div>
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: cream, margin: 0 }}>FlawlessSkin AI</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: "rgba(247,244,238,0.4)", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5AC47D", display: "inline-block" }} /> Online · Replies instantly
                  </p>
                </div>
              </div>
              {/* Messages */}
              <div style={{ padding: isMobile ? "20px 16px" : "24px 24px", display: "flex", flexDirection: "column", gap: 10, minHeight: 280 }}>
                <AnimatePresence>
                  {CONVERSATION.slice(0, visibleMsgs).map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }} style={{ display: "flex", justifyContent: msg.from === "clinic" ? "flex-end" : "flex-start" }}>
                      <div style={{ background: msg.from === "clinic" ? gold : "rgba(255,255,255,0.06)", borderRadius: msg.from === "clinic" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: isMobile ? "10px 14px" : "12px 16px", maxWidth: "78%" }}>
                        <p style={{ fontFamily: BODY, fontSize: isMobile ? 12 : 13, fontWeight: 300, color: msg.from === "clinic" ? charcoal : "rgba(247,244,238,0.85)", margin: 0, lineHeight: 1.55 }}>{msg.msg}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {visibleMsgs < CONVERSATION.length && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: 4, padding: "6px 0 0 4px" }}>
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.2 }} style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(247,244,238,0.25)", display: "inline-block" }} />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: "rgba(247,244,238,0.3)", textAlign: "center", marginTop: 16 }}>
              Trained on your exact treatments, pricing, and tone of voice.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: isMobile ? "48px 20px" : "60px 32px", background: charcoal }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 28 : 0 }}>
          {[
            { stat: "24/7", label: "always available" },
            { stat: "< 3s", label: "average response time" },
            { stat: "∞", label: "simultaneous conversations" },
            { stat: "0", label: "sick days" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", borderRight: !isMobile && i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", padding: "0 24px" }}>
                <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 38 : 44, color: gold, margin: "0 0 4px", lineHeight: 1 }}>{s.stat}</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: "rgba(247,244,238,0.45)", margin: 0 }}>{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>What It Does</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: cream, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Your best receptionist. <em style={{ fontStyle: "italic", color: gold }}>Reinvented.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
            {CAPABILITIES.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 0.07}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,168,130,0.15)", borderRadius: 14, padding: "24px 22px" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(196,168,130,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Check size={15} color={gold} />
                  </div>
                  <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 14, color: cream, margin: "0 0 8px" }}>{cap.title}</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: "rgba(247,244,238,0.55)", lineHeight: 1.65, margin: 0 }}>{cap.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: charcoal }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>The Setup</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: cream, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Live on your site <em style={{ fontStyle: "italic", color: gold }}>in days.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {HOW.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ display: "flex", gap: isMobile ? 20 : 32, alignItems: "flex-start", padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 36, color: "rgba(196,168,130,0.3)", lineHeight: 1, flexShrink: 0, minWidth: 48 }}>{step.n}</span>
                  <div>
                    <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: cream, margin: "0 0 8px" }}>{step.title}</h3>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: "rgba(247,244,238,0.55)", lineHeight: 1.7, margin: 0 }}>{step.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 38, fontWeight: 400, color: cream, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Common <em style={{ fontStyle: "italic", color: gold }}>questions.</em>
            </h2>
          </FadeIn>
          {FAQ.map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 0", ...(i === FAQ.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}) }}>
                <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 15, color: cream, marginBottom: 10 }}>{item.q}</h3>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: "rgba(247,244,238,0.55)", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", textAlign: "center", background: charcoal, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, height: 300, background: "radial-gradient(ellipse, rgba(196,168,130,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <FadeIn>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Get Started</p>
          <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 30 : 48, fontWeight: 400, color: cream, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Stop missing enquiries. <em style={{ fontStyle: "italic", color: gold }}>Start booking.</em>
          </h2>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: "rgba(247,244,238,0.5)", marginBottom: 36 }}>Your AI receptionist can be live within days of signing off.</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "18px 36px", borderRadius: 2, textDecoration: "none" }}>
            Message on WhatsApp <ArrowRight size={14} />
          </a>
        </FadeIn>
      </section>

      <footer style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: DISP, fontStyle: "italic", fontSize: 16, color: cream, marginBottom: 8, display: "block", margin: "0 auto 8px" }}>Aesthetix<span style={{ color: gold }}> Systems</span></button>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: "rgba(247,244,238,0.25)", margin: 0 }}>© {new Date().getFullYear()} Aesthetix Systems · London, UK</p>
      </footer>
    </div>
  );
}
