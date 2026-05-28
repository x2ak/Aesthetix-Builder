import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Calendar, Clock, Bell, Shield } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const cream = "#F7F4EE";
const charcoal = "#1A1A1C";
const inkSoft = "#4A4A4E";
const inkMute = "#8A8A8E";
const gold = "#C4A882";
const goldTint = "#F5EDD9";
const line = "#E5DFD3";
const surface = "#FFFFFF";
const sage = "#6B8E5A";
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20booking%20system%20for%20my%20clinic!";

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

const STEPS = [
  { n: "01", title: "Patient visits your site", body: "They discover you via Google, Instagram, or word of mouth — and land on a site that immediately communicates premium quality.", Illust: () => (
    <div style={{ background: cream, borderRadius: 10, padding: "14px 16px", marginTop: 16, border: `1px solid ${line}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: charcoal, display: "flex", alignItems: "center", justifyContent: "center" }}><Calendar size={14} color={gold} /></div>
        <div><p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, color: charcoal, margin: 0 }}>Book a Consultation</p><p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, margin: 0 }}>Available now · 30 min</p></div>
      </div>
      {["Lip Filler — £150", "Anti-Wrinkle — £95", "Profhilo — £260"].map((t, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: `1px solid ${line}` }}><span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 300, color: inkSoft }}>{t.split("—")[0]}</span><span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 500, color: gold }}>{t.split("—")[1]}</span></div>)}
    </div>
  )},
  { n: "02", title: "They pick a treatment & time", body: "A beautifully designed booking flow — treatment selection, date picker, practitioner choice. Frictionless. No redirects to third-party platforms.", Illust: () => (
    <div style={{ background: cream, borderRadius: 10, padding: "14px 16px", marginTop: 16, border: `1px solid ${line}` }}>
      <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 500, color: charcoal, margin: "0 0 10px" }}>Choose a time</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
        {["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"].map((t, i) => <div key={t} style={{ background: i === 2 ? gold : goldTint, border: `1px solid ${i === 2 ? gold : line}`, borderRadius: 6, padding: "8px 4px", textAlign: "center" }}><span style={{ fontFamily: BODY, fontSize: 11, fontWeight: i === 2 ? 600 : 300, color: i === 2 ? charcoal : inkSoft }}>{t}</span></div>)}
      </div>
    </div>
  )},
  { n: "03", title: "Instant confirmation & reminders", body: "SMS and email confirmations fire automatically. Reminder sent 24 hours before. No-shows drop. Your calendar stays full.", Illust: () => (
    <div style={{ background: charcoal, borderRadius: 10, padding: "12px 14px", marginTop: 16 }}>
      <p style={{ fontFamily: BODY, fontSize: 9, fontWeight: 300, color: "rgba(247,244,238,0.6)", margin: "0 0 4px" }}>SMS · Delivered</p>
      <p style={{ fontFamily: BODY, fontSize: 12, fontWeight: 300, color: cream, lineHeight: 1.55, margin: 0 }}>Hi Sarah 💋 Your Lip Filler appointment is confirmed for <strong>Fri 16 May at 2pm</strong>. See you then! — FlawlessSkin</p>
    </div>
  )},
];

const INTEGRATIONS = [
  { name: "Fresha", desc: "Keep your existing Fresha calendar — we embed it seamlessly within your branded site." },
  { name: "Ovatu", desc: "Full Ovatu integration with your clinic's colours, fonts, and booking flow." },
  { name: "Timely", desc: "Timely booking embedded natively so patients never leave your site." },
  { name: "Bespoke", desc: "Need something custom? We build fully bespoke booking systems tailored to your exact workflow." },
];

const FEATURES = [
  { icon: <Calendar size={18} color={gold} />, title: "24/7 Patient Booking", body: "Patients book at 11pm from their sofa. You wake up to a full calendar." },
  { icon: <Bell size={18} color={gold} />, title: "SMS & Email Reminders", body: "Automated reminders cut no-shows by up to 60%. Sent under your clinic's name." },
  { icon: <Clock size={18} color={gold} />, title: "Real-Time Availability", body: "Calendar syncs instantly. No double bookings, no phone tag." },
  { icon: <Shield size={18} color={gold} />, title: "No Third-Party Branding", body: "Patients stay on your site. No Fresha logos. No Booksy redirects." },
];

export default function BookingSystems() {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 3500);
    return () => clearInterval(t);
  }, []);

  useSEO({
    title: "Clinic Booking System Design | Aesthetix Systems",
    description: "Online booking systems for aesthetics and beauty clinics. Fresha, Ovatu, Timely integration or fully bespoke. Your brand, zero third-party fees.",
    canonical: "/services/booking-systems",
  });

  return (
    <div style={{ background: cream, minHeight: "100vh", fontFamily: BODY }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(247,244,238,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 60 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 18, color: charcoal }}>Aesthetix<span style={{ color: gold }}> Systems</span></span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 400, fontSize: 12, color: inkSoft }}>← Back</button>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "10px 20px", borderRadius: 2, textDecoration: "none" }}>Get a Quote</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #FAF8F3 0%, #F7F4EE 100%)", paddingTop: 100, paddingBottom: isMobile ? 64 : 100, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Online Booking Systems</p>
            <h1 style={{ fontFamily: DISP, fontSize: isMobile ? "clamp(36px,10vw,48px)" : "clamp(48px,6vw,72px)", fontWeight: 400, color: charcoal, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
              Your calendar.<br />Your brand.<br /><em style={{ fontStyle: "italic", color: gold }}>Zero middlemen.</em>
            </h1>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 15 : 18, color: inkSoft, lineHeight: 1.75, maxWidth: 580, margin: "0 0 40px" }}>
              Stop sending patients to Fresha. Stop paying monthly fees to platforms that put their logo on your bookings. Your clinic deserves its own booking system — seamlessly built into your website.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "16px 32px", borderRadius: 2, textDecoration: "none" }}>Book a Demo</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: charcoal, padding: isMobile ? "32px 20px" : "40px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 24 : 0 }}>
          {[
            { stat: "70%", label: "reduction in admin time" },
            { stat: "24/7", label: "patient booking availability" },
            { stat: "60%", label: "fewer no-shows with reminders" },
            { stat: "£0", label: "monthly platform fees" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", borderRight: !isMobile && i < 3 ? `1px solid rgba(255,255,255,0.08)` : "none", padding: "0 24px" }}>
                <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 36 : 42, color: gold, margin: "0 0 4px", lineHeight: 1 }}>{s.stat}</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: "rgba(247,244,238,0.55)", margin: 0 }}>{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: "linear-gradient(180deg, #FAF8F3 0%, #F7F4EE 100%)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>The Patient Journey</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: charcoal, marginBottom: isMobile ? 36 : 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              From discovery to <em style={{ fontStyle: "italic" }}>confirmed booking.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1px solid ${line}` }}>
            {STEPS.map((step, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: isMobile ? "16px 8px 0" : "22px 24px 0", textAlign: "center", position: "relative", outline: "none" }}>
                <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? "1.8rem" : "2.2rem", color: i === activeStep ? gold : "rgba(196,168,130,0.28)", lineHeight: 1, display: "block", marginBottom: 6, transition: "color 0.3s", textShadow: i === activeStep ? "0 0 28px rgba(196,168,130,0.55)" : "none" }}>{step.n}</span>
                {!isMobile && <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: i === activeStep ? charcoal : inkMute, display: "block", marginBottom: 16, transition: "color 0.3s" }}>{step.title}</span>}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: i === activeStep ? gold : "transparent", transition: "background 0.4s" }} />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {(() => {
              const ActiveIllust = STEPS[activeStep].Illust;
              return (
                <motion.div key={activeStep} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} style={{ background: surface, border: `1px solid ${line}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: isMobile ? "24px 20px" : "36px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 40, alignItems: "center" }}>
                  <div>
                    <h3 style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 22 : 28, fontWeight: 400, color: charcoal, margin: "0 0 12px" }}>{STEPS[activeStep].title}</h3>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 14 : 16, color: inkSoft, lineHeight: 1.8, margin: 0 }}>{STEPS[activeStep].body}</p>
                  </div>
                  <ActiveIllust />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: cream }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Features</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: charcoal, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Built to fill your <em style={{ fontStyle: "italic" }}>calendar.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div style={{ background: "#FDFAF5", border: `1px solid ${line}`, borderRadius: 14, padding: "28px 28px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: goldTint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: charcoal, margin: "0 0 8px" }}>{f.title}</h3>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.65, margin: 0 }}>{f.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: "linear-gradient(180deg, #FAF8F3 0%, #F7F4EE 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Integrations</p>
            <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 28 : 42, fontWeight: 400, color: charcoal, marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Works with what <em style={{ fontStyle: "italic" }}>you already use.</em>
            </h2>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.7, marginBottom: 48, maxWidth: 520 }}>
              Already on Fresha or Timely? We embed it seamlessly into your site so patients never see a third-party redirect. Or we build you something entirely bespoke.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {INTEGRATIONS.map((intg, i) => (
              <FadeIn key={intg.name} delay={i * 0.08}>
                <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: "24px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: charcoal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 16, color: gold }}>{ intg.name[0]}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: charcoal, margin: "0 0 6px" }}>{intg.name}</h3>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.6, margin: 0 }}>{intg.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "64px 20px" : "100px 32px", background: charcoal, textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: DISP, fontSize: isMobile ? 30 : 48, fontWeight: 400, color: cream, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Ready to fill your <em style={{ fontStyle: "italic", color: gold }}>calendar?</em>
          </h2>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: "rgba(247,244,238,0.6)", marginBottom: 36 }}>Message Sim on WhatsApp — we'll scope your booking system in 24 hours.</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: BODY, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: charcoal, background: gold, padding: "18px 36px", borderRadius: 2, textDecoration: "none" }}>
            Message on WhatsApp <ArrowRight size={14} />
          </a>
        </FadeIn>
      </section>

      <footer style={{ background: cream, borderTop: `1px solid ${line}`, padding: "32px 24px", textAlign: "center" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: DISP, fontStyle: "italic", fontSize: 16, color: charcoal, marginBottom: 8, display: "block", margin: "0 auto 8px" }}>Aesthetix<span style={{ color: gold }}> Systems</span></button>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, margin: 0 }}>© {new Date().getFullYear()} Aesthetix Systems · London, UK</p>
      </footer>
    </div>
  );
}
