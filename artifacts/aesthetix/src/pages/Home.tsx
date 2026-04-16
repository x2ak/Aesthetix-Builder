import { useState, useEffect, useRef } from "react";

/* ─── Design tokens ─── */
const R = "#C2185B";
const BK = "#0A0A0A";
const OBK = "#111111";
const CH = "#1A1A1A";
const SRF = "#1E1E1E";
const BDR = "#2A2A2A";
const BDRL = "#333333";
const WH = "#FAFAFA";
const G1 = "#888888";
const G2 = "#555555";
const DISP = "'Cormorant Garamond', Georgia, serif";
const BODY = "'DM Sans', sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20%F0%9F%91%8B";

/* ─── Mobile hook ─── */
function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

/* ─── Animated counter ─── */
function Counter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1500;
        const start = Date.now();
        const tick = () => {
          const t = Math.min((Date.now() - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(ease * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ─── Fade-in on scroll ─── */
function FadeIn({ children, style = {}, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Rose hover button ─── */
function RoseBtn({ href, children, outline = false, style = {} }: { href: string; children: React.ReactNode; outline?: boolean; style?: React.CSSProperties }) {
  return (
    <a href={href}
      style={{
        display: "inline-block", padding: "13px 28px", borderRadius: 1, textDecoration: "none",
        fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.1em",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
        ...(outline
          ? { background: "transparent", color: WH, border: `1px solid ${BDRL}` }
          : { background: R, color: WH, border: "none", boxShadow: "0 0 30px rgba(194,24,91,0.25)" }),
        ...style,
      }}
      onMouseEnter={e => {
        if (outline) { e.currentTarget.style.borderColor = WH; }
        else { e.currentTarget.style.background = "#A01048"; }
      }}
      onMouseLeave={e => {
        if (outline) { e.currentTarget.style.borderColor = BDRL; }
        else { e.currentTarget.style.background = R; }
      }}
    >{children}</a>
  );
}

export default function Home() {
  const isMobile = useIsMobile();
  const px = isMobile ? "20px" : "48px";
  const sectionPy = isMobile ? "64px" : "100px";

  const [scrolled, setScrolled] = useState(false);
  const [topBarVis, setTopBarVis] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSocial, setFormSocial] = useState("");
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setTopBarVis(y < lastScroll.current || y < 40);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "New enquiry from Aesthetix Systems website",
      "",
      `Name: ${formName}`,
      `Phone: ${formPhone}`,
      `Email: ${formEmail}`,
      formSocial ? `Social: ${formSocial}` : null,
      "",
      "Message:",
      formMessage,
    ].filter(l => l !== null).join("\n");
    window.open(`https://wa.me/447495963388?text=${encodeURIComponent(msg)}`, "_blank");
    setFormSubmitted(true);
  };

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%", background: CH, border: `1px solid ${BDR}`, borderRadius: 0,
    padding: "12px 14px", fontFamily: BODY, fontWeight: 300, fontSize: 14, color: WH, outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase",
    letterSpacing: "0.1em", color: G1, display: "block", marginBottom: 6,
  };

  return (
    <div style={{ fontFamily: BODY, background: BK, color: WH, overflowX: "hidden" }}>

      {/* ── TOP BAR ── */}
      <div style={{
        background: R, padding: "9px 16px", textAlign: "center",
        fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 10 : 11, letterSpacing: "0.07em", color: WH,
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        transform: topBarVis ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.2s ease",
      }}>
        {isMobile ? "Birmingham, UK · Currently Accepting Clients" : "Birmingham, UK · @aesthetix_systems · Currently Accepting New Clients"}
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: topBarVis ? 37 : 0, left: 0, right: 0, zIndex: 150, height: 56,
        display: "flex", alignItems: "center", padding: `0 ${px}`,
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${BDR}` : "none",
        transition: "all 0.3s ease",
      }}>
        <a href="#home" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2, lineHeight: 1 }}>
          <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 14, color: WH, letterSpacing: "0.18em" }}>AESTHETIX</span>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 8, color: R, letterSpacing: "0.22em" }}>SYSTEMS</span>
        </a>

        {!isMobile && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 32 }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a href="#contact" style={{
              background: R, color: WH, padding: "7px 16px", borderRadius: 2,
              fontFamily: BODY, fontWeight: 400, fontSize: 11, letterSpacing: "0.08em", textDecoration: "none",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
              onMouseLeave={e => e.currentTarget.style.background = R}
            >Start a Project</a>
          </div>
        )}

        {isMobile && (
          <button style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 8 }} onClick={() => setMobileOpen(true)}>
            <div style={{ width: 20, height: 2, background: R, marginBottom: 4 }} />
            <div style={{ width: 20, height: 2, background: R, marginBottom: 4 }} />
            <div style={{ width: 20, height: 2, background: R }} />
          </button>
        )}
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: BK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: WH, fontSize: 28, cursor: "pointer" }}>✕</button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {navLinks.map((l, i) => (
              <div key={l.label} style={{ width: "100%" }}>
                <a href={l.href} onClick={() => setMobileOpen(false)} style={{
                  display: "block", fontFamily: DISP, fontStyle: "italic", fontWeight: 300,
                  fontSize: "2rem", color: WH, textDecoration: "none", padding: "14px 0", textAlign: "center",
                }}>{l.label}</a>
                {i < navLinks.length - 1 && <div style={{ width: 160, height: 1, background: R, margin: "0 auto" }} />}
              </div>
            ))}
          </div>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{
            marginTop: 36, background: R, color: WH, padding: "13px 36px",
            fontFamily: BODY, fontWeight: 400, fontSize: 12, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 1,
          }}>Start a Project</a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100dvh", background: BK, position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Ghost wordmark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontFamily: DISP, fontWeight: 300, fontSize: isMobile ? "clamp(5rem, 40vw, 10rem)" : "clamp(8rem, 18vw, 16rem)",
          color: WH, opacity: 0.025, whiteSpace: "nowrap", pointerEvents: "none",
          letterSpacing: "0.1em", zIndex: 0, userSelect: "none",
        }}>AESTHETIX</div>

        {/* Rose orb */}
        <div style={{
          position: "absolute", width: isMobile ? 300 : 600, height: isMobile ? 300 : 600,
          background: "radial-gradient(circle at center, rgba(194,24,91,0.12) 0%, transparent 70%)",
          top: "50%", right: isMobile ? "-10%" : "15%", transform: "translateY(-50%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Scan lines */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)",
          pointerEvents: "none", zIndex: 2,
        }} />

        <div style={{
          position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto",
          padding: isMobile ? `0 20px` : `0 48px`, width: "100%",
          paddingTop: topBarVis ? (isMobile ? "90px" : "101px") : "64px",
          paddingBottom: isMobile ? "80px" : "0px",
        }}>
          <div className="fade-up-1" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isMobile ? 12 : 0 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: R, flexShrink: 0 }} />
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: G1, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Aesthetix Systems · Birmingham, UK
            </span>
          </div>

          <h1 className="fade-up-2" style={{
            fontFamily: DISP, fontStyle: "italic", fontWeight: 300,
            fontSize: isMobile ? "clamp(3rem, 13vw, 4.5rem)" : "clamp(4rem, 8.5vw, 8.5rem)",
            lineHeight: 0.95, color: WH, margin: isMobile ? "12px 0 0" : "20px 0 0", letterSpacing: "-0.5px",
          }}>
            <span style={{ display: "block" }}>Your Clinic.</span>
            <span style={{ display: "block", color: R }}>Your Brand.</span>
            <span style={{ display: "block" }}>Online.</span>
          </h1>

          <p className="fade-up-3" style={{
            fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 14 : 16, color: G1,
            lineHeight: 1.7, maxWidth: 480, margin: isMobile ? "16px 0 24px" : "24px 0 40px",
          }}>
            Premium websites, booking systems and AI assistants built exclusively for aesthetics businesses. Your digital presence, elevated.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: R, color: WH, padding: isMobile ? "13px 0" : "13px 28px",
              borderRadius: 1, fontFamily: BODY, fontWeight: 400, fontSize: 12,
              textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none",
              textAlign: "center", display: "block",
              boxShadow: "0 0 40px rgba(194,24,91,0.3)",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
              onMouseLeave={e => e.currentTarget.style.background = R}
            >Start a Project</a>
            <a href="#work" style={{
              background: "transparent", border: `1px solid ${BDRL}`, color: G1,
              padding: isMobile ? "13px 0" : "13px 28px", borderRadius: 1,
              fontFamily: BODY, fontWeight: 400, fontSize: 12,
              textTransform: "uppercase", letterSpacing: "0.1em",
              textDecoration: "none", textAlign: "center", display: "block",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = WH; e.currentTarget.style.color = WH; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BDRL; e.currentTarget.style.color = G1; }}
            >View Our Work</a>
          </div>

          {/* Stats */}
          <div className="fade-up-5" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)",
            gap: isMobile ? "20px 16px" : "0",
            columnGap: isMobile ? "16px" : "48px",
            marginTop: isMobile ? 32 : 64,
            paddingTop: isMobile ? 24 : 40,
            borderTop: `1px solid ${BDR}`,
          }}>
            {[
              { num: 10, suf: "+", label: "Clinics Launched" },
              { num: 0, pre: "£", label: "Setup Surprises" },
              { suf: "24/7", label: "AI Coverage", raw: true },
              { suf: "100%", label: "Aesthetics Focused", raw: true },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "2rem" : "2.8rem", color: WH, lineHeight: 1 }}>
                  {s.raw ? s.suf : <Counter end={s.num!} prefix={s.pre} suffix={s.suf} />}
                </div>
                <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G1, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        {!isMobile && (
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: G2, letterSpacing: "0.15em" }}>SCROLL</span>
            <div className="scroll-line" style={{ width: 1, background: R }} />
          </div>
        )}
      </section>

      {/* ── WORK / PORTFOLIO ── */}
      <section id="work" style={{ background: OBK, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${px}` }}>
          <FadeIn style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 10, textTransform: "uppercase" }}>Our Work</div>
              <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "2rem" : "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>Built for beauty.</div>
            </div>
            {!isMobile && (
              <a href="#contact" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = R}
                onMouseLeave={e => e.currentTarget.style.color = G1}
              >Start your project →</a>
            )}
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 2 }}>
            {[
              { full: true, gradient: "linear-gradient(135deg, #1A0A12, #3D1020)", tag: "AESTHETICS CLINIC · BIRMINGHAM", name: "Dermadoll Aesthetics", services: "Website · Booking System · Admin Portal", live: true, href: "https://dermadoll-aesthetics.co.uk" },
              { full: false, gradient: "linear-gradient(135deg, #0D1520, #1A2A3D)", tag: "SKIN CLINIC · BIRMINGHAM", name: "FlawlessSkin", services: "Website · Stripe Payments · Luxury Design", href: "https://flawless-skin.co.uk" },
              { full: false, gradient: "linear-gradient(135deg, #1A1508, #2E2510)", tag: "AESTHETICS CLINIC · DEMO", name: "Starr Aesthetics", services: "Website · Booking · Treatment Menu", href: "#contact" },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 80}
                style={{ gridColumn: (!isMobile && card.full) ? "1 / -1" : undefined }}
              >
                <div className="portfolio-card" style={{
                  position: "relative", background: card.gradient,
                  aspectRatio: (!isMobile && card.full) ? "8/5" : "4/3",
                  cursor: card.href ? "pointer" : "default",
                }}
                  onClick={() => card.href && window.open(card.href, card.href.startsWith("http") ? "_blank" : "_self")}
                >
                  <div className="card-overlay" style={{ position: "absolute", inset: 0, background: "rgba(194,24,91,0.08)" }} />
                  {!isMobile && <div className="card-arrow" style={{ position: "absolute", top: 24, right: 24, fontFamily: DISP, fontSize: "2rem", color: R }}>→</div>}
                  {card.live && <div style={{ position: "absolute", top: 16, right: 16, background: R, color: WH, padding: "3px 10px", borderRadius: 20, fontFamily: BODY, fontWeight: 300, fontSize: 10 }}>Live ↗</div>}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "20px 16px" : 28, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: R, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>{card.tag}</div>
                    <div style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? 18 : 22, color: WH, marginBottom: 3 }}>{card.name}</div>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G1 }}>{card.services}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <RoseBtn href="#contact">Start Your Project →</RoseBtn>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: BK, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${px}` }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>What We Build</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
              Everything your clinic needs.<br />Nothing you don't.
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 1, background: BDR, marginTop: 48 }}>
            {[
              { n: "01", title: "Premium Websites", desc: "A website that sells while you sleep.", features: ["Fully custom design, built around your brand", "Mobile-first, fast-loading, SEO ready", "Treatments, pricing, about, gallery sections", "Delivered in 3–5 days"] },
              { n: "02", title: "Booking Systems", desc: "Take deposits. Block your calendar. Stop the no-shows.", features: ["Custom calendar and availability management", "50% Stripe deposit collected at booking", "Automated confirmation emails", "Reschedule and cancellation policy enforcement"] },
              { n: "03", title: "AI Assistant", desc: "24/7 support, trained on your business.", features: ["Trained on your treatments, prices, FAQs", "Talks exactly like you — your tone, your brand", "Answers client questions around the clock", "Captures enquiries and booking requests overnight"] },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="service-cell" style={{ background: BK, padding: isMobile ? "28px 20px" : "40px 36px" }}>
                  <div className="service-num" style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "3rem", color: BDRL, lineHeight: 1, marginBottom: 16 }}>{s.n}</div>
                  <div className="service-title" style={{ fontFamily: BODY, fontWeight: 400, fontSize: 15, color: WH, marginBottom: 10 }}>{s.title}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, lineHeight: 1.75, marginBottom: 16 }}>{s.desc}</div>
                  <div style={{ borderTop: `1px solid ${BDR}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.features.map((f, j) => (
                      <div key={j} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1 }}>
                        <span style={{ color: R, marginRight: 8 }}>—</span>{f}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ padding: isMobile ? "36px 0" : "60px 48px", borderTop: `1px solid ${BDR}`, textAlign: "center", marginTop: 0 }}>
              <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? "1.3rem" : "clamp(1.4rem, 2.5vw, 2rem)", color: R, lineHeight: 1.5 }}>
                "Every website we build comes with a strategy, not just a template."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── AI ASSISTANT ── */}
      <section id="ai" style={{ background: CH, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${px}`, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80 }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>AI Assistant</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
              Your best employee.<br />Never takes a day off.
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, lineHeight: 1.8, marginTop: 16, maxWidth: 420 }}>
              We build and train a custom AI assistant for your clinic. It lives on your website, knows everything about your business, and handles enquiries 24 hours a day — even while you're in treatment.
            </p>
            <div style={{ marginTop: 24 }}>
              {[
                { t: "Trained on your business", s: "Treatments, prices, FAQs, aftercare — all loaded in" },
                { t: "Sounds like you", s: "Custom tone, your brand voice, your personality" },
                { t: "Captures leads while you sleep", s: "Collects name, number and enquiry automatically" },
                { t: "Answers instantly", s: "No more clients waiting hours for a reply on Instagram" },
                { t: "Works on any device", s: "Embedded directly into your website — no extra apps" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 4 ? `1px solid ${BDR}` : "none" }}>
                  <span style={{ color: R, flexShrink: 0, fontFamily: BODY, fontSize: 14 }}>—</span>
                  <div>
                    <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: WH }}>{f.t}</div>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G1, marginTop: 2 }}>{f.s}</div>
                  </div>
                </div>
              ))}
            </div>
            <RoseBtn href="#contact" style={{ marginTop: 24 }}>Add AI to My Website</RoseBtn>
          </FadeIn>

          {/* Chat mock */}
          <FadeIn delay={200}>
            <div style={{ background: SRF, border: `1px solid ${BDR}`, borderRadius: 2, overflow: "hidden", maxWidth: isMobile ? "100%" : "unset" }}>
              <div style={{ background: OBK, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${BDR}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 12, color: WH }}>Lumi — Dermadoll Aesthetics</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G1 }}>AI Assistant · Online now</div>
                </div>
              </div>
              <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ alignSelf: "flex-end", background: R, padding: "9px 12px", borderRadius: "2px 12px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "80%" }}>
                  Hi! How much is lip filler?
                </div>
                <div style={{ alignSelf: "flex-start", background: BDR, padding: "9px 12px", borderRadius: "12px 2px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "85%", lineHeight: 1.5 }}>
                  Hi! Lip filler starts from £100 for 0.5ml and up to £150 for 1ml. Russian technique also available!<br /><br />Would you like to book in?
                </div>
                <div style={{ alignSelf: "flex-end", background: R, padding: "9px 12px", borderRadius: "2px 12px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "80%" }}>
                  Yes please! What dates?
                </div>
                <div style={{ alignSelf: "flex-start", background: BDR, padding: "9px 12px", borderRadius: "12px 2px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "85%", lineHeight: 1.5 }}>
                  We have:<br />· Thursday 17th — 2pm, 4pm<br />· Friday 18th — 10am, 12pm<br /><br />Which works?
                </div>
                <div style={{ alignSelf: "flex-start", background: BDR, padding: "9px 14px", borderRadius: "12px 2px 12px 12px", display: "flex", gap: 4, alignItems: "center" }}>
                  <div className="typing-dot-1" style={{ width: 6, height: 6, borderRadius: "50%", background: G1 }} />
                  <div className="typing-dot-2" style={{ width: 6, height: 6, borderRadius: "50%", background: G1 }} />
                  <div className="typing-dot-3" style={{ width: 6, height: 6, borderRadius: "50%", background: G1 }} />
                </div>
              </div>
              <div style={{ background: OBK, padding: "10px 12px", borderTop: `1px solid ${BDR}`, display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ flex: 1, background: SRF, border: `1px solid ${BDR}`, padding: "8px 10px", borderRadius: 2, fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G2 }}>Type a message...</div>
                <div style={{ width: 30, height: 30, background: R, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={WH} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </div>
              </div>
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G2, fontStyle: "italic", textAlign: "center", marginTop: 10 }}>
              * AI assistant demo — based on a real client implementation
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ background: OBK, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${px}` }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>How It Works</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
              From first message to<br />live in days.
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "28px 20px" : "0", marginTop: 48 }}>
            {[
              { n: "1", title: "Discovery Call", desc: "We learn your brand, clients and goals.", time: "Day 1" },
              { n: "2", title: "Design & Build", desc: "We design and build your website, booking system and AI.", time: "Days 2–4" },
              { n: "3", title: "You Review", desc: "You see the full site before it goes live. We refine until it's perfect.", time: "Day 5" },
              { n: "4", title: "Go Live", desc: "Your new digital presence launches. Domain, hosting, testing — all handled.", time: "Day 6–7" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ paddingRight: (!isMobile && i < 3) ? 24 : 0, paddingLeft: (!isMobile && i > 0) ? 24 : 0, borderRight: (!isMobile && i < 3) ? `1px solid ${BDR}` : "none" }}>
                  <div style={{ width: 44, height: 44, border: `1px solid ${R}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, background: OBK }}>
                    <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 18, color: R }}>{s.n}</span>
                  </div>
                  <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: WH, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, lineHeight: 1.65 }}>{s.desc}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.1em", marginTop: 10 }}>{s.time}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div style={{
              marginTop: 40, padding: isMobile ? 24 : 40, background: SRF,
              border: `1px solid ${BDR}`, borderLeft: `3px solid ${R}`,
              display: "flex", flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
              gap: 24,
            }}>
              <div style={{ fontFamily: DISP, fontStyle: "italic", fontSize: isMobile ? "1.2rem" : "1.5rem", color: WH, lineHeight: 1.4 }}>
                Most clients are live within one week of their first message.
              </div>
              <RoseBtn href="#contact" style={{ flexShrink: 0, whiteSpace: "nowrap" as const }}>Start the Process →</RoseBtn>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: BK, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: `0 ${px}` }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>Pricing</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
              Transparent pricing.<br />No surprises.
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, marginTop: 12 }}>
              All prices in GBP. Payment split 50% to start, 50% on completion.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 1, background: BDR, marginTop: 40 }}>
            {[
              { name: "STARTER", price: "£400", sub: "one-time build fee", tag: "", highlight: false, features: ["Custom single-page website", "Treatment menu and pricing", "Instagram + WhatsApp contact links", "Mobile optimised", "Hosting: £25/mo"] },
              { name: "CORE", price: "£650", sub: "one-time build fee", tag: "MOST POPULAR", highlight: true, features: ["Everything in Starter", "Multi-page website (up to 6 sections)", "Custom booking calendar", "Stripe deposit collection", "Automated email confirmations", "Before & after gallery", "Hosting: £35/mo"] },
              { name: "PREMIUM", price: "£950", sub: "one-time build fee", tag: "", highlight: false, features: ["Everything in Core", "Custom AI assistant trained on your business", "AI answers client questions 24/7", "AI captures leads overnight", "Admin portal — manage bookings and clients", "Priority support", "Hosting: £45/mo"] },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{
                  background: BK, padding: isMobile ? "28px 20px" : 40, position: "relative",
                  borderTop: p.highlight ? `3px solid ${R}` : `1px solid ${BDR}`,
                }}>
                  {p.tag && <div style={{ position: "absolute", top: p.highlight ? 14 : 12, right: 14, fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: R }}>{p.tag}</div>}
                  <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: G1, marginBottom: 10 }}>{p.name}</div>
                  <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "3rem", color: WH, lineHeight: 1 }}>{p.price}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, marginTop: 4 }}>{p.sub}</div>
                  <div style={{ height: 1, background: BDR, margin: "20px 0" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 10 }}>
                        <span style={{ color: R, flexShrink: 0, fontFamily: BODY, fontSize: 13 }}>→</span>
                        <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" style={{
                    display: "block", textAlign: "center", marginTop: 24, padding: "13px 0", borderRadius: 1,
                    fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
                    textDecoration: "none", transition: "background 0.2s",
                    ...(p.highlight ? { background: R, color: WH, border: "none" } : { background: "transparent", color: WH, border: `1px solid ${BDRL}` }),
                  }}
                    onMouseEnter={e => { if (p.highlight) e.currentTarget.style.background = "#A01048"; }}
                    onMouseLeave={e => { if (p.highlight) e.currentTarget.style.background = R; }}
                  >Get Started →</a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <div style={{ display: "flex", gap: 32, paddingTop: 32, borderTop: `1px solid ${BDR}`, marginTop: 1, flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ flex: 1, fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, lineHeight: 1.8 }}>
                All projects include a discovery call, custom design, one round of revisions, mobile testing and handover. No hidden extras.
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                {["50% to start, 50% on completion", "No lock-in contracts on hosting", "Domain setup guidance included", "Revisions until you're happy"].map((t, i) => (
                  <div key={i} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, display: "flex", gap: 8 }}>
                    <span style={{ color: R }}>✓</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: CH, padding: `${sectionPy} ${px}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "5fr 4fr", gap: isMobile ? 40 : 80 }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>About</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.5rem, 5vw, 3.5rem)", color: WH, lineHeight: 1.1 }}>
              Built by someone who<br />understands your industry.
            </div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, lineHeight: 1.85, marginTop: 20 }}>
              <p>Aesthetix Systems was built by Sim — a Birmingham-based developer and designer who works exclusively with aesthetics clinics and beauty businesses.</p>
              <p style={{ marginTop: 14 }}>Every website is built from scratch, to your brand, with your clients in mind. No templates. No generic layouts. No agencies that also build plumbing websites.</p>
              <p style={{ marginTop: 14 }}>Just premium digital work, for the industry that deserves it most.</p>
            </div>
            <div style={{ marginTop: 24, fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: G2 }}>
              Birmingham, UK · Est. 2024 · Aesthetics Only · @aesthetix_systems
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ borderLeft: `2px solid ${R}`, paddingLeft: 24 }}>
              <p style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.3rem" : "clamp(1.4rem, 3vw, 2.2rem)", color: WH, lineHeight: 1.4 }}>
                "I only work with aesthetics businesses. That focus is what makes the work better."
              </p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, marginTop: 10 }}>— Sim, Aesthetix Systems</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${BDR}`, marginTop: 28 }}>
              {[{ n: "10+", l: "Clinics Launched" }, { n: "7", l: "Days to Go Live" }, { n: "100%", l: "Aesthetics Focused" }, { n: "24/7", l: "AI Coverage" }].map((s, i) => (
                <div key={i} style={{ padding: 18, borderRight: i % 2 === 0 ? `1px solid ${BDR}` : "none", borderBottom: i < 2 ? `1px solid ${BDR}` : "none" }}>
                  <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "2rem", color: R, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G1, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="proof" style={{ background: OBK, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${px}` }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>What Clients Say</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "2rem" : "clamp(2.5rem, 5vw, 4rem)", color: WH }}>Results speak.</div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 1, background: BDR, marginTop: 40 }}>
            {[
              { quote: "Sim delivered exactly what I asked for — and more. The site looks genuinely high-end and the booking system has completely changed how clients book with me.", name: "Niamh", business: "Dermadoll Aesthetics", initials: "N", service: "Website + Booking" },
              { quote: "I was sceptical about the AI assistant but it now handles enquiries while I'm in treatments. Clients get answers immediately and I wake up to bookings.", name: "Tyler", business: "The Peel Room", initials: "T", service: "Website + AI Assistant" },
              { quote: "Turned around a full site in under a week. It looks better than clinics charging ten times what I do. Clients comment on how professional it looks.", name: "Mimi", business: "Mimis Aesthetics", initials: "M", service: "Full Website Build" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ background: OBK, padding: isMobile ? "28px 20px" : 36 }}>
                  <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "4rem", color: R, opacity: 0.3, lineHeight: 0, display: "block", marginBottom: 16 }}>"</span>
                  <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "1.1rem", color: WH, lineHeight: 1.65 }}>{t.quote}</p>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${BDR}`, display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: R, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BODY, fontWeight: 400, fontSize: 12, color: WH, flexShrink: 0 }}>{t.initials}</div>
                      <div>
                        <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: WH }}>{t.name}</div>
                        <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G1 }}>{t.business}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: R, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.service}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: BK, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: `0 ${px}` }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>Questions</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2rem, 4vw, 3.5rem)", color: WH }}>Before you reach out.</div>
          </FadeIn>

          <div style={{ marginTop: 40 }}>
            {[
              { q: "How quickly can you build my website?", a: "Most websites are live within 5–7 days of our first conversation. We move fast because we know aesthetics businesses can't wait weeks." },
              { q: "Do I need to provide my own photos?", a: "Not for the initial build — we use professional placeholder layouts so you can see the design before you have photos. You can swap them in any time." },
              { q: "What is the AI assistant exactly?", a: "It's a custom chatbot trained specifically on your business — your treatments, prices, FAQs, aftercare advice, booking process. It sits on your website and answers client questions 24/7 in your tone and brand voice." },
              { q: "Do I own the website?", a: "Yes. You own all the content, images and branding. We host it on your behalf as part of the monthly retainer, which you can cancel with 30 days' notice." },
              { q: "What's included in the monthly hosting fee?", a: "Hosting, performance monitoring, security updates, minor content tweaks (text/price changes), and priority support. No surprise invoices." },
              { q: "Do you work with businesses outside Birmingham?", a: "Absolutely. We work remotely with clinics and beauty businesses across the UK. Everything is handled via video call, WhatsApp and email." },
              { q: "Can I see examples of your work?", a: "Yes — the portfolio section above shows recent projects. You can also view live sites linked from our Instagram @aesthetix_systems." },
            ].map((f, i) => (
              <div key={i} className="faq-row">
                <div style={{ padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16 }}
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: isMobile ? 13 : 14, color: faqOpen === i ? R : WH, transition: "color 0.3s", flex: 1 }}>{f.q}</span>
                  <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 20, color: R, flexShrink: 0 }}>{faqOpen === i ? "−" : "+"}</span>
                </div>
                <div className={`faq-answer${faqOpen === i ? " open" : ""}`}>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, lineHeight: 1.8, paddingBottom: 18 }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40, flexDirection: isMobile ? "column" : "row" }}>
            <RoseBtn href="#contact">Start a Project</RoseBtn>
            <RoseBtn href="https://instagram.com/aesthetix_systems" outline>Message on Instagram</RoseBtn>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: CH, padding: `${sectionPy} 0` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: `0 ${px}`, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80 }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>Get In Touch</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
              Ready to elevate<br />your clinic online?
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, lineHeight: 1.8, marginTop: 16 }}>
              Drop a message with your business name, what you're looking for, and we'll come back within 24 hours with next steps. No hard sell. Just a conversation.
            </p>
            <div style={{ marginTop: 28 }}>
              {[
                { label: "INSTAGRAM", val: "@aesthetix_systems →", href: "https://instagram.com/aesthetix_systems" },
                { label: "EMAIL", val: "hello@aesthetix-systems.co.uk", href: "mailto:hello@aesthetix-systems.co.uk" },
                { label: "WHATSAPP", val: "Message Sim directly →", href: WA },
                { label: "LOCATION", val: "Birmingham, UK" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderBottom: `1px solid ${BDR}`, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: R, minWidth: 90, flexShrink: 0 }}>{row.label}</span>
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, textDecoration: "none", wordBreak: "break-all" }}
                      onMouseEnter={e => e.currentTarget.style.color = WH}
                      onMouseLeave={e => e.currentTarget.style.color = G1}
                    >{row.val}</a>
                  ) : (
                    <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1 }}>{row.val}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ background: SRF, border: `1px solid ${BDR}`, borderTop: `2px solid ${R}`, padding: isMobile ? 20 : 36 }}>
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={R} strokeWidth="2" style={{ margin: "0 auto 12px", display: "block" }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <div style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 22, color: WH, marginBottom: 6 }}>Message received.</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1 }}>We'll be in touch within 24 hours.</div>
                  <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 12, color: R, fontFamily: BODY, fontWeight: 300, fontSize: 13, textDecoration: "none" }}>@aesthetix_systems</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "Your Name", type: "text", val: formName, set: setFormName, placeholder: "Your full name", required: true },
                    { label: "Phone Number", type: "tel", val: formPhone, set: setFormPhone, placeholder: "+44 7700 000000", required: true },
                    { label: "Email Address", type: "email", val: formEmail, set: setFormEmail, placeholder: "hello@yourclinic.com", required: true },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={labelStyle}>{f.label}</label>
                      <input required={f.required} type={f.type} value={f.val}
                        onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = R}
                        onBlur={e => e.target.style.borderColor = BDR}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={labelStyle}>Tell Us More</label>
                    <textarea required rows={4} value={formMessage} onChange={e => setFormMessage(e.target.value)}
                      placeholder="Your clinic, what you need, what's not working..."
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => e.target.style.borderColor = R}
                      onBlur={e => e.target.style.borderColor = BDR}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Social Handle <span style={{ color: G2 }}>(optional)</span></label>
                    <input type="text" value={formSocial} onChange={e => setFormSocial(e.target.value)}
                      placeholder="@yourclinic" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = R}
                      onBlur={e => e.target.style.borderColor = BDR}
                    />
                  </div>
                  <button type="submit" style={{
                    width: "100%", height: 46, background: R, color: WH, border: "none", borderRadius: 1,
                    cursor: "pointer", fontFamily: BODY, fontWeight: 400, fontSize: 12,
                    textTransform: "uppercase", letterSpacing: "0.1em", transition: "background 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
                    onMouseLeave={e => e.currentTarget.style.background = R}
                  >Send Message →</button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: BK, borderTop: `1px solid ${BDR}`, padding: isMobile ? "36px 20px 24px" : "48px 48px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "28px 16px" : 40 }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 14, color: WH, letterSpacing: "0.18em" }}>AESTHETIX</div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 8, color: R, letterSpacing: "0.22em", marginTop: 2 }}>SYSTEMS</div>
            <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 13, color: G1, marginTop: 10, lineHeight: 1.5 }}>We build the digital presence your clinic deserves.</p>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G2, marginTop: 6 }}>Birmingham, UK</div>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: G2, marginBottom: 10 }}>Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {navLinks.map(l => (
                <a key={l.label} href={l.href} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = WH}
                  onMouseLeave={e => e.currentTarget.style.color = G1}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: G2, marginBottom: 10 }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Website Design", "Booking Systems", "AI Assistant", "Hosting"].map(s => (
                <span key={s} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1 }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: G2, marginBottom: 10 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = R}
                onMouseLeave={e => e.currentTarget.style.color = G1}
              >@aesthetix_systems</a>
              <a href="mailto:hello@aesthetix-systems.co.uk" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G1, textDecoration: "none", wordBreak: "break-all" }}
                onMouseEnter={e => e.currentTarget.style.color = WH}
                onMouseLeave={e => e.currentTarget.style.color = G1}
              >hello@aesthetix-systems.co.uk</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "24px auto 0", paddingTop: 20, borderTop: `1px solid ${BDR}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G2 }}>© 2026 Aesthetix Systems · Birmingham, UK</span>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G2 }}>Built by Aesthetix Systems</span>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a href={WA} target="_blank" rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 150,
          width: 52, height: 52, borderRadius: "50%", background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
