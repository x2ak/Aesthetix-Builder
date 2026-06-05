import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Calendar, Clock, Bell, Shield } from "lucide-react";
import { useSEO, useBreadcrumb } from "@/hooks/useSEO";

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
  useBreadcrumb([
    { name: "Home", url: "/" },
    { name: "Booking Systems", url: "/services/booking-systems" },
  ]);

  return (
    <div style={{ background: cream, minHeight: "100vh", fontFamily: BODY }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(247,244,238,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 60 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
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
