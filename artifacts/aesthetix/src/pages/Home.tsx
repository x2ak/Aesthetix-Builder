import { useState, useEffect, useRef } from "react";

/* ─── Design tokens ─── */
const R = "#C2185B";          // rose
const BK = "#0A0A0A";         // black
const OBK = "#111111";        // off-black
const CH = "#1A1A1A";         // charcoal
const SRF = "#1E1E1E";        // surface
const BDR = "#2A2A2A";        // border
const BDRL = "#333333";       // border-light
const WH = "#FAFAFA";         // white
const G1 = "#888888";         // grey-1
const G2 = "#555555";         // grey-2
const DISP = "'Cormorant Garamond', Georgia, serif";
const BODY = "'DM Sans', sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20%F0%9F%91%8B";

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
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Home() {
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

  const portfolioCards = [
    {
      full: true,
      gradient: "linear-gradient(135deg, #1A0A12, #3D1020)",
      tag: "AESTHETICS CLINIC · BIRMINGHAM",
      name: "Dermadoll Aesthetics",
      services: "Website · Booking System · Admin Portal",
      live: true,
      href: "https://dermadoll-aesthetics.co.uk",
    },
    {
      full: false,
      gradient: "linear-gradient(135deg, #0D1520, #1A2A3D)",
      tag: "SKIN CLINIC · BIRMINGHAM",
      name: "FlawlessSkin",
      services: "Website · Stripe Payments · Luxury Design",
      href: "https://flawless-skin.co.uk",
    },
    {
      full: false,
      gradient: "linear-gradient(135deg, #1A1508, #2E2510)",
      tag: "AESTHETICS CLINIC · DEMO BUILD",
      name: "Starr Aesthetics",
      services: "Website · Booking · Treatment Menu",
      href: "#contact",
    },
    {
      full: false,
      gradient: "linear-gradient(135deg, #0A1A14, #152A1E)",
      tag: "BEAUTY CLINIC · LONDON",
      name: "Naturelle Aesthetics",
      services: "Website · AI Assistant · Lead Capture",
    },
  ];

  const services = [
    {
      n: "01",
      title: "Premium Websites",
      desc: "A website that sells while you sleep.",
      features: [
        "Fully custom design, built around your brand",
        "Mobile-first, fast-loading, SEO ready",
        "Treatments, pricing, about, gallery sections",
        "Delivered in 3–5 days",
      ],
    },
    {
      n: "02",
      title: "Booking Systems",
      desc: "Take deposits. Block your calendar. Stop the no-shows.",
      features: [
        "Custom calendar and availability management",
        "50% Stripe deposit collected at booking",
        "Automated confirmation emails to you and client",
        "Reschedule and cancellation policy enforcement",
      ],
    },
    {
      n: "03",
      title: "AI Assistant",
      desc: "24/7 support, trained on your business.",
      features: [
        "Trained on your treatments, prices, FAQs",
        "Talks exactly like you — your tone, your brand",
        "Answers client questions around the clock",
        "Captures enquiries and booking requests overnight",
      ],
    },
  ];

  const steps = [
    { n: "1", title: "Discovery Call", desc: "We learn your brand, your clients, your goals. Quick call or voice note — whatever works for you.", time: "Day 1" },
    { n: "2", title: "Design & Build", desc: "We design and build your website, booking system and AI assistant tailored to your clinic.", time: "Days 2–4" },
    { n: "3", title: "You Review", desc: "You see the full site before it goes live. We refine until it's exactly right.", time: "Day 5" },
    { n: "4", title: "Go Live", desc: "Your new digital presence launches. We handle everything — domain, hosting, testing across all devices.", time: "Day 6–7" },
  ];

  const pricing = [
    {
      name: "STARTER",
      price: "£400",
      sub: "one-time build fee",
      tag: "",
      highlight: false,
      features: [
        "Custom single-page website",
        "Treatment menu and pricing",
        "Instagram + WhatsApp contact links",
        "Mobile optimised",
        "Hosting: £25/mo",
      ],
    },
    {
      name: "CORE",
      price: "£650",
      sub: "one-time build fee",
      tag: "MOST POPULAR",
      highlight: true,
      features: [
        "Everything in Starter",
        "Multi-page website (up to 6 sections)",
        "Custom booking calendar",
        "Stripe deposit collection",
        "Automated email confirmations",
        "Before & after gallery",
        "Hosting: £35/mo",
      ],
    },
    {
      name: "PREMIUM",
      price: "£950",
      sub: "one-time build fee",
      tag: "",
      highlight: false,
      features: [
        "Everything in Core",
        "Custom AI assistant trained on your business",
        "AI answers client questions 24/7",
        "AI captures leads overnight",
        "Admin portal — manage bookings and clients",
        "Priority support",
        "Hosting: £45/mo",
      ],
    },
  ];

  const testimonials = [
    {
      quote: "Sim delivered exactly what I asked for — and more. The site looks genuinely high-end and the booking system has completely changed how clients book with me.",
      name: "Niamh",
      business: "Dermadoll Aesthetics",
      initials: "N",
      service: "Website + Booking System",
    },
    {
      quote: "I was sceptical about the AI assistant but it now handles enquiries while I'm in treatments. Clients get answers immediately and I wake up to bookings.",
      name: "Tyler",
      business: "The Peel Room",
      initials: "T",
      service: "Website + AI Assistant",
    },
    {
      quote: "Turned around a full site in under a week. It looks better than clinics charging ten times what I do. I've already had comments from clients about how professional it looks.",
      name: "Mimi",
      business: "Mimis Aesthetics",
      initials: "M",
      service: "Full Website Build",
    },
  ];

  const faqs = [
    { q: "How quickly can you build my website?", a: "Most websites are live within 5–7 days of our first conversation. We move fast because we know aesthetics businesses can't wait weeks." },
    { q: "Do I need to provide my own photos?", a: "Not for the initial build — we use professional placeholder layouts so you can see the design before you have photos. You can swap them in any time." },
    { q: "What is the AI assistant exactly?", a: "It's a custom chatbot trained specifically on your business — your treatments, prices, FAQs, aftercare advice, booking process. It sits on your website and answers client questions 24/7 in your tone and brand voice." },
    { q: "Do I own the website?", a: "Yes. You own all the content, images and branding. We host it on your behalf as part of the monthly retainer, which you can cancel with 30 days' notice." },
    { q: "What's included in the monthly hosting fee?", a: "Hosting, performance monitoring, security updates, minor content tweaks (text/price changes), and priority support. No surprise invoices." },
    { q: "Do you work with businesses outside Birmingham?", a: "Absolutely. We work remotely with clinics and beauty businesses across the UK. Everything is handled via video call, WhatsApp and email. Location is never a barrier." },
    { q: "Can I see examples of your work?", a: "Yes — the portfolio section above shows recent projects. You can also view live sites linked from our Instagram @aesthetix_systems." },
  ];

  /* ─── Input / Textarea style ─── */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: CH,
    border: `1px solid ${BDR}`,
    borderRadius: 0,
    padding: "12px 14px",
    fontFamily: BODY,
    fontWeight: 300,
    fontSize: 14,
    color: WH,
    outline: "none",
  };

  return (
    <div style={{ fontFamily: BODY, background: BK, color: WH, overflowX: "hidden" }}>

      {/* ── TOP BAR ── */}
      <div style={{
        background: R,
        padding: "9px 24px",
        textAlign: "center",
        fontFamily: BODY,
        fontWeight: 300,
        fontSize: 11,
        letterSpacing: "0.07em",
        color: WH,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        transform: topBarVis ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.2s ease",
      }}>
        Birmingham, UK · @aesthetix_systems · Currently Accepting New Clients
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed",
        top: topBarVis ? 37 : 0,
        left: 0,
        right: 0,
        zIndex: 150,
        height: 64,
        display: "flex",
        alignItems: "center",
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${BDR}` : "none",
        transition: "all 0.3s ease",
        padding: "0 48px",
      }}>
        <a href="#home" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2, lineHeight: 1 }}>
          <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 15, color: WH, letterSpacing: "0.18em" }}>AESTHETIX</span>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: R, letterSpacing: "0.22em" }}>SYSTEMS</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ marginLeft: "auto", alignItems: "center", gap: 36 }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#contact" style={{
            background: R, color: WH, padding: "8px 18px", borderRadius: 2,
            fontFamily: BODY, fontWeight: 400, fontSize: 11, letterSpacing: "0.08em",
            textDecoration: "none", transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#A01048")}
            onMouseLeave={e => (e.currentTarget.style.background = R)}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 8 }} onClick={() => setMobileOpen(true)}>
          <div style={{ width: 22, height: 2, background: R, marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, background: R, marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, background: R }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: BK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: WH, fontSize: 28, cursor: "pointer" }}>✕</button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "100%" }}>
            {navLinks.map((l, i) => (
              <div key={l.label}>
                <a href={l.href} onClick={() => setMobileOpen(false)} style={{
                  display: "block", fontFamily: DISP, fontStyle: "italic", fontWeight: 300,
                  fontSize: "2.2rem", color: WH, textDecoration: "none", padding: "16px 0", textAlign: "center",
                }}>
                  {l.label}
                </a>
                {i < navLinks.length - 1 && <div style={{ width: 200, height: 1, background: R, margin: "0 auto" }} />}
              </div>
            ))}
          </div>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{
            marginTop: 40, background: R, color: WH, padding: "14px 40px",
            fontFamily: BODY, fontWeight: 400, fontSize: 13, letterSpacing: "0.1em",
            textDecoration: "none", borderRadius: 1,
          }}>
            Start a Project
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ height: "100dvh", background: BK, position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Ghost wordmark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontFamily: DISP, fontWeight: 300, fontSize: "clamp(8rem, 18vw, 16rem)",
          color: WH, opacity: 0.025, whiteSpace: "nowrap", pointerEvents: "none",
          letterSpacing: "0.1em", zIndex: 0, userSelect: "none",
        }}>
          AESTHETIX
        </div>

        {/* Rose orb */}
        <div style={{
          position: "absolute", width: 600, height: 600,
          background: "radial-gradient(circle at center, rgba(194,24,91,0.12) 0%, transparent 70%)",
          top: "50%", right: "15%", transform: "translateY(-50%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Scan lines */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)",
          pointerEvents: "none", zIndex: 2,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", padding: "0 48px", width: "100%", paddingTop: topBarVis ? "101px" : "64px" }}>
          <div className="fade-up-1" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: R, flexShrink: 0 }} />
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G1, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Aesthetix Systems · Birmingham, UK
            </span>
          </div>

          <h1 className="fade-up-2" style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(4rem, 8.5vw, 8.5rem)", lineHeight: 0.95, color: WH, margin: "20px 0 0", letterSpacing: "-0.5px" }}>
            <span style={{ display: "block" }}>Your Clinic.</span>
            <span style={{ display: "block", color: R }}>Your Brand.</span>
            <span style={{ display: "block" }}>Online.</span>
          </h1>

          <p className="fade-up-3" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: G1, lineHeight: 1.7, maxWidth: 480, margin: "24px 0 40px" }}>
            Premium websites, booking systems and AI assistants built exclusively for aesthetics businesses. Your digital presence, elevated.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: R, color: WH, padding: "14px 32px", borderRadius: 1,
              fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
              textDecoration: "none", boxShadow: "0 0 40px rgba(194,24,91,0.3)", display: "inline-block",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#A01048"; e.currentTarget.style.boxShadow = "0 0 60px rgba(194,24,91,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = R; e.currentTarget.style.boxShadow = "0 0 40px rgba(194,24,91,0.3)"; }}
            >
              Start a Project
            </a>
            <a href="#work" style={{
              background: "transparent", border: `1px solid ${BDRL}`, color: G1,
              padding: "14px 32px", borderRadius: 1,
              fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
              textDecoration: "none", display: "inline-block", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = WH; e.currentTarget.style.color = WH; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BDRL; e.currentTarget.style.color = G1; }}
            >
              View Our Work
            </a>
          </div>

          <div className="fade-up-5" style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 40, borderTop: `1px solid ${BDR}`, flexWrap: "wrap" }}>
            {[
              { num: 10, suf: "+", label: "Clinics Launched" },
              { num: 0, pre: "£", label: "Setup Surprises" },
              { suf: "24/7", label: "AI Assistant Coverage", raw: true },
              { suf: "100%", label: "Aesthetics Focused", raw: true },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "2.8rem", color: WH, lineHeight: 1 }}>
                  {s.raw ? s.suf : <Counter end={s.num!} prefix={s.pre} suffix={s.suf} />}
                </div>
                <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G1, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: G2, letterSpacing: "0.15em" }}>SCROLL</span>
          <div className="scroll-line" style={{ width: 1, background: R }} />
        </div>
      </section>

      {/* ── WORK / PORTFOLIO ── */}
      <section id="work" style={{ background: OBK, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", fontFamily: DISP, fontWeight: 300, fontSize: "8rem", color: WH, opacity: 0.025, top: -20, left: -8, pointerEvents: "none", lineHeight: 1 }}>02</span>
              <FadeIn>
                <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase" }}>Our Work</div>
                <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>Built for beauty.</div>
              </FadeIn>
            </div>
            <a href="#contact" className="hidden md:block" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = R}
              onMouseLeave={e => e.currentTarget.style.color = G1}
            >
              Start your project →
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {portfolioCards.map((card, i) => (
              <FadeIn key={i} delay={i * 100} style={{ gridColumn: card.full ? "1 / -1" : undefined } as any} className={card.full ? "col-span-2" : ""}>
                <div
                  className="portfolio-card"
                  style={{
                    position: "relative",
                    background: card.gradient,
                    aspectRatio: card.full ? "8/5" : "4/3",
                    cursor: "pointer",
                  }}
                  onClick={() => card.href && window.open(card.href, card.href.startsWith("http") ? "_blank" : "_self")}
                >
                  {/* Hover overlay */}
                  <div className="card-overlay" style={{ position: "absolute", inset: 0, background: "rgba(194,24,91,0.08)" }} />

                  {/* Arrow */}
                  <div className="card-arrow" style={{ position: "absolute", top: 24, right: 24, fontFamily: DISP, fontSize: "2rem", color: R }}>→</div>

                  {/* Live badge */}
                  {card.live && (
                    <div style={{ position: "absolute", top: 20, right: 20, background: R, color: WH, padding: "4px 10px", borderRadius: 20, fontFamily: BODY, fontWeight: 300, fontSize: 10 }}>
                      Live ↗
                    </div>
                  )}

                  {/* Card content */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: R, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{card.tag}</div>
                    <div style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 22, color: WH, marginBottom: 4 }}>{card.name}</div>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G1 }}>{card.services}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="#contact" style={{
              display: "inline-block", background: R, color: WH, padding: "14px 32px", borderRadius: 1,
              fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
              onMouseLeave={e => e.currentTarget.style.background = R}
            >
              Start Your Project →
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: BK, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", fontFamily: DISP, fontWeight: 300, fontSize: "8rem", color: WH, opacity: 0.025, top: -20, left: -8, pointerEvents: "none", lineHeight: 1 }}>03</span>
            <FadeIn>
              <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>What We Build</div>
              <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
                Everything your clinic needs.<br />Nothing you don't.
              </div>
            </FadeIn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: BDR, marginTop: 64 }}>
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="service-cell" style={{ background: BK, padding: "40px 36px", position: "relative", overflow: "hidden" }}>
                  <div className="service-num" style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "3.5rem", color: BDRL, lineHeight: 1, marginBottom: 20 }}>{s.n}</div>
                  <div className="service-title" style={{ fontFamily: BODY, fontWeight: 400, fontSize: 16, color: WH, letterSpacing: "0.02em", marginBottom: 12 }}>{s.title}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, lineHeight: 1.75, marginBottom: 16 }}>{s.desc}</div>
                  <div style={{ borderTop: `1px solid ${BDR}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
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
            <div style={{ padding: "60px 48px", borderTop: `1px solid ${BDR}`, textAlign: "center" }}>
              <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: G1, lineHeight: 1.5 }}>
                "Every website we build comes with a strategy,<br />not just a template."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── AI ASSISTANT ── */}
      <section id="ai" style={{ background: CH, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>AI Assistant</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
              Your best employee.<br />Never takes a day off.
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: G1, lineHeight: 1.8, marginTop: 20, maxWidth: 420 }}>
              We build and train a custom AI assistant for your clinic. It lives on your website, knows everything about your business, and handles enquiries 24 hours a day — even while you're in treatment.
            </p>
            <div style={{ marginTop: 32 }}>
              {[
                { t: "Trained on your business", s: "Treatments, prices, FAQs, aftercare — all loaded in" },
                { t: "Sounds like you", s: "Custom tone, your brand voice, your personality" },
                { t: "Captures leads while you sleep", s: "Collects name, number and enquiry automatically" },
                { t: "Answers instantly", s: "No more clients waiting hours for a reply on Instagram" },
                { t: "Works on any device", s: "Embedded directly into your website — no extra apps" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: i < 4 ? `1px solid ${BDR}` : "none" }}>
                  <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 14, color: R, flexShrink: 0 }}>—</span>
                  <div>
                    <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: WH }}>{f.t}</div>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, marginTop: 3 }}>{f.s}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="#contact" style={{
              display: "inline-block", marginTop: 32, background: R, color: WH, padding: "14px 28px", borderRadius: 1,
              fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
              onMouseLeave={e => e.currentTarget.style.background = R}
            >
              Add AI to My Website
            </a>
          </FadeIn>

          {/* Chat mock */}
          <FadeIn delay={200}>
            <div style={{ background: SRF, border: `1px solid ${BDR}`, borderRadius: 2, overflow: "hidden" }}>
              {/* Header */}
              <div style={{ background: OBK, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${BDR}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "pulse-rose 2s infinite" }} />
                <div>
                  <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: WH }}>Lumi — Dermadoll Aesthetics</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G1 }}>AI Assistant · Online now</div>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: "20px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ alignSelf: "flex-end", background: R, padding: "10px 14px", borderRadius: "2px 12px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "80%" }}>
                  Hi! How much is lip filler?
                </div>
                <div style={{ alignSelf: "flex-start", background: BDR, padding: "10px 14px", borderRadius: "12px 2px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "85%", lineHeight: 1.6 }}>
                  Hi! Lip filler starts from £100 for 0.5ml and goes up to £150 for 1ml. We also have Russian technique available!<br /><br />
                  Would you like to book in? I can check availability for you right now.
                </div>
                <div style={{ alignSelf: "flex-end", background: R, padding: "10px 14px", borderRadius: "2px 12px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "80%" }}>
                  Yes please! What dates do you have?
                </div>
                <div style={{ alignSelf: "flex-start", background: BDR, padding: "10px 14px", borderRadius: "12px 2px 12px 12px", fontFamily: BODY, fontWeight: 300, fontSize: 13, color: WH, maxWidth: "85%", lineHeight: 1.6 }}>
                  I'd love to get you booked in!<br /><br />
                  We have availability this week on:<br />
                  · Thursday 17th — 2pm, 4pm<br />
                  · Friday 18th — 10am, 12pm<br /><br />
                  Which works best for you?
                </div>
                {/* Typing dots */}
                <div style={{ alignSelf: "flex-start", background: BDR, padding: "10px 16px", borderRadius: "12px 2px 12px 12px", display: "flex", gap: 4, alignItems: "center" }}>
                  <div className="typing-dot-1" style={{ width: 6, height: 6, borderRadius: "50%", background: G1 }} />
                  <div className="typing-dot-2" style={{ width: 6, height: 6, borderRadius: "50%", background: G1 }} />
                  <div className="typing-dot-3" style={{ width: 6, height: 6, borderRadius: "50%", background: G1 }} />
                </div>
              </div>
              {/* Footer */}
              <div style={{ background: OBK, padding: "12px 14px", borderTop: `1px solid ${BDR}`, display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ flex: 1, background: SRF, border: `1px solid ${BDR}`, padding: "9px 12px", borderRadius: 2, fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G2 }}>
                  Type a message...
                </div>
                <div style={{ width: 32, height: 32, background: R, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={WH} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </div>
              </div>
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G2, fontStyle: "italic", textAlign: "center", marginTop: 12 }}>
              * AI assistant demo — based on a real client implementation
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ background: OBK, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", fontFamily: DISP, fontWeight: 300, fontSize: "8rem", color: WH, opacity: 0.025, top: -20, left: -8, pointerEvents: "none", lineHeight: 1 }}>04</span>
            <FadeIn>
              <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>How It Works</div>
              <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
                From first message to<br />live in days.
              </div>
            </FadeIn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 64, position: "relative" }}>
            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ padding: "0 32px 0 0", borderRight: i < 3 ? `1px solid ${BDR}` : "none", marginLeft: i > 0 ? 32 : 0 }}>
                  <div style={{ width: 48, height: 48, border: `1px solid ${R}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, background: OBK }}>
                    <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 20, color: R }}>{s.n}</span>
                  </div>
                  <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 14, color: WH, letterSpacing: "0.02em", marginBottom: 10 }}>{s.title}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, lineHeight: 1.7 }}>{s.desc}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.1em", marginTop: 12 }}>{s.time}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div style={{
              marginTop: 48, padding: 40, background: SRF, border: `1px solid ${BDR}`,
              borderLeft: `3px solid ${R}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap",
            }}>
              <div style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 24, color: WH }}>
                Most clients are live within one week<br />of their first message.
              </div>
              <a href="#contact" style={{
                background: R, color: WH, padding: "14px 28px", borderRadius: 1, flexShrink: 0,
                fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
                textDecoration: "none", transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
                onMouseLeave={e => e.currentTarget.style.background = R}
              >
                Start the Process →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: BK, padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", fontFamily: DISP, fontWeight: 300, fontSize: "8rem", color: WH, opacity: 0.025, top: -20, left: -8, pointerEvents: "none", lineHeight: 1 }}>05</span>
            <FadeIn>
              <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>Pricing</div>
              <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
                Transparent pricing.<br />No surprises.
              </div>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, marginTop: 16 }}>
                All prices in GBP. Payment split 50% to start, 50% on completion.
              </p>
            </FadeIn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: BDR, marginTop: 56 }}>
            {pricing.map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{
                  background: BK, padding: 40, position: "relative",
                  borderTop: p.highlight ? `3px solid ${R}` : `1px solid ${BDR}`,
                }}>
                  {p.tag && (
                    <div style={{ position: "absolute", top: p.highlight ? 16 : 12, right: 16, fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: p.highlight ? R : G2 }}>
                      {p.tag}
                    </div>
                  )}
                  <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: G1, marginBottom: 12 }}>{p.name}</div>
                  <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "3.5rem", color: WH, lineHeight: 1 }}>{p.price}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, marginTop: 4 }}>{p.sub}</div>
                  <div style={{ height: 1, background: BDR, margin: "24px 0" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: R, flexShrink: 0, fontFamily: BODY, fontWeight: 300, fontSize: 13 }}>→</span>
                        <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" style={{
                    display: "block", textAlign: "center", marginTop: 28,
                    padding: "14px 0", borderRadius: 1,
                    fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
                    textDecoration: "none", transition: "background 0.2s, color 0.2s, border-color 0.2s",
                    ...(p.highlight
                      ? { background: R, color: WH, border: "none" }
                      : { background: "transparent", color: WH, border: `1px solid ${BDRL}` }),
                  }}
                    onMouseEnter={e => { if (p.highlight) e.currentTarget.style.background = "#A01048"; }}
                    onMouseLeave={e => { if (p.highlight) e.currentTarget.style.background = R; }}
                  >
                    Get Started →
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div style={{ display: "flex", gap: 32, paddingTop: 40, borderTop: `1px solid ${BDR}`, marginTop: 40, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 240, fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, lineHeight: 1.8 }}>
                All projects include a discovery call, custom design, one round of revisions, mobile testing across iOS and Android, and handover. No hidden extras, no ongoing design fees.
              </div>
              <div style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}>
                {["50% to start, 50% on completion", "No lock-in contracts on hosting", "Domain setup guidance included", "Revisions until you're happy"].map((t, i) => (
                  <div key={i} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: G1, display: "flex", gap: 8 }}>
                    <span style={{ color: R }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: CH, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "5fr 4fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>About</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: WH, lineHeight: 1.1 }}>
              Built by someone who<br />understands your industry.
            </div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: G1, lineHeight: 1.85, marginTop: 24 }}>
              <p>Aesthetix Systems was built by Sim — a Birmingham-based developer and designer who works exclusively with aesthetics clinics and beauty businesses.</p>
              <p style={{ marginTop: 16 }}>Every website is built from scratch, to your brand, with your clients in mind. No templates. No generic layouts. No agencies that also build plumbing websites.</p>
              <p style={{ marginTop: 16 }}>Just premium digital work, for the industry that deserves it most.</p>
            </div>
            <div style={{ marginTop: 28, fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: G2, display: "flex", gap: 24, flexWrap: "wrap" }}>
              Birmingham, UK · Est. 2024 · Aesthetics Only · @aesthetix_systems
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ borderLeft: `2px solid ${R}`, paddingLeft: 28 }}>
              <p style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: WH, lineHeight: 1.4 }}>
                "I only work with aesthetics businesses. That focus is what makes the work better."
              </p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, marginTop: 12 }}>— Sim, Aesthetix Systems</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${BDR}`, marginTop: 32 }}>
              {[
                { n: "10+", l: "Clinics Launched" },
                { n: "7", l: "Days to Go Live" },
                { n: "100%", l: "Aesthetics Focused" },
                { n: "24/7", l: "AI Coverage" },
              ].map((s, i) => (
                <div key={i} style={{ padding: 20, borderRight: i % 2 === 0 ? `1px solid ${BDR}` : "none", borderBottom: i < 2 ? `1px solid ${BDR}` : "none" }}>
                  <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "2.5rem", color: R, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G1, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="proof" style={{ background: OBK, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>What Clients Say</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>Results speak.</div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: BDR, marginTop: 56 }}>
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ background: OBK, padding: 36, position: "relative" }}>
                  <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "5rem", color: R, opacity: 0.3, lineHeight: 0, display: "block", marginBottom: 16 }}>"</span>
                  <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: "1.2rem", color: WH, lineHeight: 1.65 }}>{t.quote}</p>
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${BDR}`, display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: R, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BODY, fontWeight: 400, fontSize: 13, color: WH, flexShrink: 0 }}>{t.initials}</div>
                      <div>
                        <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: WH }}>{t.name}</div>
                        <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G1 }}>{t.business}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: R, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "right" }}>{t.service}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: BK, padding: "80px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>Questions</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: WH }}>Before you reach out.</div>
          </FadeIn>

          <div style={{ marginTop: 48 }}>
            {faqs.map((f, i) => (
              <div key={i} className="faq-row">
                <div
                  style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 14, color: faqOpen === i ? R : WH, transition: "color 0.3s" }}>{f.q}</span>
                  <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 22, color: R, flexShrink: 0, marginLeft: 16 }}>{faqOpen === i ? "−" : "+"}</span>
                </div>
                <div className={`faq-answer${faqOpen === i ? " open" : ""}`}>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, lineHeight: 1.8, paddingBottom: 20 }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: R, color: WH, padding: "14px 32px", borderRadius: 1,
              fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
              onMouseLeave={e => e.currentTarget.style.background = R}
            >
              Start a Project
            </a>
            <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noreferrer" style={{
              background: "transparent", border: `1px solid ${BDRL}`, color: WH,
              padding: "14px 32px", borderRadius: 1,
              fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
              textDecoration: "none", transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = WH}
              onMouseLeave={e => e.currentTarget.style.borderColor = BDRL}
            >
              Message on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: CH, padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <FadeIn>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: R, letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>Get In Touch</div>
            <div style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: WH, lineHeight: 1.1 }}>
              Ready to elevate<br />your clinic online?
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: G1, lineHeight: 1.8, marginTop: 20 }}>
              Drop a message with your business name, what you're looking for, and we'll come back within 24 hours with next steps. No hard sell. Just a conversation.
            </p>
            <div style={{ marginTop: 32 }}>
              {[
                { label: "INSTAGRAM", val: "@aesthetix_systems →", href: "https://instagram.com/aesthetix_systems" },
                { label: "EMAIL", val: "hello@aesthetix-systems.co.uk", href: "mailto:hello@aesthetix-systems.co.uk" },
                { label: "WHATSAPP", val: "Message Sim directly →", href: WA },
                { label: "LOCATION", val: "Birmingham, UK" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${BDR}` }}>
                  <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: R, minWidth: 90 }}>{row.label}</span>
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = WH}
                      onMouseLeave={e => e.currentTarget.style.color = G1}
                    >{row.val}</a>
                  ) : (
                    <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1 }}>{row.val}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn delay={200}>
            <div style={{ background: SRF, border: `1px solid ${BDR}`, borderTop: `2px solid ${R}`, padding: 36 }}>
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={R} strokeWidth="2" style={{ margin: "0 auto 16px" }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <div style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 24, color: WH, marginBottom: 8 }}>Message received.</div>
                  <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: G1 }}>We'll be in touch within 24 hours.</div>
                  <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 16, color: R, fontFamily: BODY, fontWeight: 300, fontSize: 13, textDecoration: "none" }}>@aesthetix_systems</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { label: "Your Name", type: "text", val: formName, set: setFormName, required: true, placeholder: "Your full name" },
                    { label: "Phone Number", type: "tel", val: formPhone, set: setFormPhone, required: true, placeholder: "+44 7700 000000" },
                    { label: "Email Address", type: "email", val: formEmail, set: setFormEmail, required: true, placeholder: "hello@yourclinic.com" },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: G1, display: "block", marginBottom: 6 }}>{f.label}</label>
                      <input
                        required={f.required} type={f.type} value={f.val}
                        onChange={e => f.set(e.target.value)}
                        placeholder={f.placeholder}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = R}
                        onBlur={e => e.target.style.borderColor = BDR}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: G1, display: "block", marginBottom: 6 }}>Tell Us More</label>
                    <textarea
                      required rows={4} value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                      placeholder="Your clinic, what you need, what's not working..."
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => e.target.style.borderColor = R}
                      onBlur={e => e.target.style.borderColor = BDR}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: G1, display: "block", marginBottom: 6 }}>
                      Social Handle <span style={{ color: G2 }}>(optional)</span>
                    </label>
                    <input
                      type="text" value={formSocial}
                      onChange={e => setFormSocial(e.target.value)}
                      placeholder="@yourclinic"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = R}
                      onBlur={e => e.target.style.borderColor = BDR}
                    />
                  </div>
                  <button type="submit" style={{
                    width: "100%", height: 48, background: R, color: WH, border: "none", borderRadius: 1, cursor: "pointer",
                    fontFamily: BODY, fontWeight: 400, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#A01048"}
                    onMouseLeave={e => e.currentTarget.style.background = R}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: BK, borderTop: `1px solid ${BDR}`, padding: "48px 48px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 16, color: WH, letterSpacing: "0.18em" }}>AESTHETIX</div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: R, letterSpacing: "0.22em", marginTop: 2 }}>SYSTEMS</div>
            <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 14, color: G1, marginTop: 10, lineHeight: 1.5 }}>We build the digital presence<br />your clinic deserves.</p>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: G2, marginTop: 8 }}>Birmingham, UK</div>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: G2, marginBottom: 12 }}>Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navLinks.map(l => (
                <a key={l.label} href={l.href} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = WH}
                  onMouseLeave={e => e.currentTarget.style.color = G1}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: G2, marginBottom: 12 }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Website Design", "Booking Systems", "AI Assistant", "Hosting"].map(s => (
                <span key={s} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1 }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: G2, marginBottom: 12 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = R}
                onMouseLeave={e => e.currentTarget.style.color = G1}
              >@aesthetix_systems</a>
              <a href="mailto:hello@aesthetix-systems.co.uk" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: G1, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = WH}
                onMouseLeave={e => e.currentTarget.style.color = G1}
              >hello@aesthetix-systems.co.uk</a>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 24, borderTop: `1px solid ${BDR}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G2 }}>© 2026 Aesthetix Systems · Birmingham, UK</span>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: G2 }}>Built by Aesthetix Systems</span>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a href={WA} target="_blank" rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 150,
          width: 56, height: 56, borderRadius: "50%",
          background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.4)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
