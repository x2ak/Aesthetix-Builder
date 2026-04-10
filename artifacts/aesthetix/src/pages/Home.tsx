import React, { useEffect, useRef, useState } from "react";
import { Instagram, MessageCircle, Menu, X } from "lucide-react";

// Intersection Observer Hook for fade-in animations
function useOnScreen(options: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(currentRef);
      }
    }, options);

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
}

// Animated Counter Component
function AnimatedCounter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useOnScreen();

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const duration = 2000;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * easeOutQuart));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, isVisible]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// FadeInSection Wrapper
function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, isVisible] = useOnScreen();
  return (
    <div ref={ref} className={`fade-in-section ${isVisible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Welcome popup — show after 3s
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Navigation scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [howRef, howIsVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-sans overflow-x-hidden">
      {/* SCARCITY BANNER */}
      <div className="fixed top-0 left-0 right-0 z-[60] overflow-hidden" style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(201,168,76,0.25)" }}>
        {/* Shimmer sweep */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.07) 50%, transparent 60%)",
          animation: "shimmer-sweep 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div className="relative flex items-center justify-center gap-3 py-2 px-4 text-center">
          {/* Pulsing dot */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#C9A84C",
              boxShadow: "0 0 6px #C9A84C",
              animation: "pulse-dot 1.8s ease-in-out infinite",
              display: "inline-block", flexShrink: 0,
            }} />
          </span>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, letterSpacing: "0.04em", fontWeight: 400 }}>
            Only{" "}
            <span style={{ color: "#C9A84C", fontWeight: 700 }}>2 spots</span>
            {" "}remaining this month
          </span>
          <span style={{ width: 1, height: 12, background: "rgba(201,168,76,0.3)", display: "inline-block" }} />
          <a
            href="#contact"
            style={{ color: "#C9A84C", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textDecoration: "none", whiteSpace: "nowrap" }}
            className="hover:opacity-70 transition-opacity uppercase tracking-widest"
          >
            Secure yours →
          </a>
        </div>
      </div>

      {/* WELCOME POPUP */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-5"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-sm overflow-hidden"
            style={{
              background: "rgba(26,26,26,0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(201,168,76,0.35)",
              borderTop: "2px solid #C9A84C",
              boxShadow: "0 0 60px rgba(201,168,76,0.12), 0 24px 64px rgba(0,0,0,0.6)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Gold shimmer bar */}
            <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-lg leading-none"
            >
              ✕
            </button>

            <div className="px-8 pt-8 pb-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase">London · Aesthetics Specialists</span>
              </div>

              {/* Heading */}
              <h2 className="font-display font-bold text-2xl text-white mb-2 leading-tight">
                Welcome to <span className="text-[#C9A84C]">Aesthetix</span>
              </h2>

              {/* Subtext */}
              <p className="text-white/55 text-sm leading-relaxed mb-2">
                Premium websites for aesthetics & beauty clinics.
              </p>
              <p className="text-[#C9A84C] text-xs leading-relaxed mb-8">
                Built fast. Designed to convert. Ready to talk?
              </p>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20%F0%9F%91%8B"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPopup(false)}
                className="flex items-center justify-center gap-3 w-full py-3.5 font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#C9A84C", color: "#0d0d0d", borderRadius: 2 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message Us on WhatsApp
              </a>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 text-white/25 hover:text-white/50 text-xs tracking-wider transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. NAV */}
      <nav 
        className={`fixed top-[37px] left-0 right-0 z-50 transition-all duration-200 ease-in-out border-b ${
          isScrolled ? "bg-[#1A1A1A] border-[#C9A84C]" : "bg-[#1A1A1A]/90 backdrop-blur-sm border-[#C9A84C]/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex flex-col items-start leading-none group" aria-label="Aesthetix Home">
            <span className="font-display font-bold text-xl tracking-[0.15em] text-white">AESTHETIX</span>
            <span className="font-sans text-[11px] tracking-[0.3em] text-[#C9A84C] font-semibold mt-1 uppercase">SYSTEMS</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium text-white/80 hover:text-[#C9A84C] transition-colors duration-200">Services</a>
            <a href="#work" className="text-sm font-medium text-white/80 hover:text-[#C9A84C] transition-colors duration-200">Work</a>
            <a href="#pricing" className="text-sm font-medium text-white/80 hover:text-[#C9A84C] transition-colors duration-200">Pricing</a>
            <a href="#contact" className="text-sm font-medium text-white/80 hover:text-[#C9A84C] transition-colors duration-200">Contact</a>
            <a 
              href="#contact" 
              className="bg-[#C9A84C] text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#C9A84C]/90 hover:scale-105 transition-all duration-200"
            >
              Get Started
            </a>
          </div>
          
          <button 
            className="md:hidden text-[#C9A84C] p-2" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center">
          <button 
            className="absolute top-6 right-6 text-[#C9A84C] p-2" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center space-y-8 text-2xl font-display font-bold text-[#C9A84C]">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-100">Services</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-200">Work</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-300">Pricing</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-500">Contact</a>
          </div>
        </div>
      )}

      {/* 2. HERO */}
      <section id="home" className="min-h-screen pt-[137px] pb-8 md:pb-20 flex flex-col justify-center relative bg-[#1A1A1A] overflow-hidden">

        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Scrolling gold grid */}
          <div className="hero-grid" />

          {/* Glowing orbs */}
          <div className="hero-orb-1" />
          <div className="hero-orb-2" />
          <div className="hero-orb-3" />

          {/* Subtle ring glows centred on headline */}
          <div className="hero-ring" />
          <div className="hero-ring-inner" />

          {/* Floating particles */}
          {[
            { left: "12%",  bottom: "8%",  dur: "7s",  delay: "0s"   },
            { left: "22%",  bottom: "15%", dur: "9s",  delay: "1.5s" },
            { left: "38%",  bottom: "5%",  dur: "11s", delay: "3s"   },
            { left: "55%",  bottom: "12%", dur: "8s",  delay: "0.8s" },
            { left: "70%",  bottom: "20%", dur: "10s", delay: "2s"   },
            { left: "82%",  bottom: "7%",  dur: "6s",  delay: "4s"   },
            { left: "91%",  bottom: "18%", dur: "13s", delay: "1s"   },
          ].map((p, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{ left: p.left, bottom: p.bottom, animationDuration: p.dur, animationDelay: p.delay }}
            />
          ))}

          {/* Floating SaaS UI cards */}
          {/* Card 1 — metric */}
          <div className="hero-card hero-card-1">
            <div style={{ fontSize: 9, color: "rgba(201,168,76,0.7)", letterSpacing: "0.12em", marginBottom: 8, textTransform: "uppercase" }}>Revenue</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 6 }}>£50k+</div>
            <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
              {[40, 55, 35, 70, 60, 80, 65].map((h, i) => (
                <div key={i} style={{ width: 8, height: h * 0.4, background: i === 6 ? "#C9A84C" : "rgba(201,168,76,0.25)", borderRadius: 2, alignSelf: "flex-end" }} />
              ))}
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Generated for clients</div>
          </div>

          {/* Card 2 — delivery */}
          <div className="hero-card hero-card-2">
            <div style={{ fontSize: 9, color: "rgba(201,168,76,0.7)", letterSpacing: "0.12em", marginBottom: 8, textTransform: "uppercase" }}>Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { label: "Design", w: "90%", done: true },
                { label: "Build",  w: "70%", done: true },
                { label: "Launch", w: "40%", done: false },
              ].map((row) => (
                <div key={row.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>
                    <span>{row.label}</span>
                    <span style={{ color: row.done ? "#C9A84C" : "rgba(255,255,255,0.3)" }}>{row.done ? "✓" : "…"}</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: row.w, background: row.done ? "#C9A84C" : "rgba(201,168,76,0.3)", borderRadius: 2, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 9, color: "rgba(255,255,255,0.3)" }}>6-day delivery</div>
          </div>

          {/* Card 3 — bookings */}
          <div className="hero-card hero-card-3">
            <div style={{ fontSize: 9, color: "rgba(201,168,76,0.7)", letterSpacing: "0.12em", marginBottom: 6, textTransform: "uppercase" }}>Bookings</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>+24 <span style={{ fontSize: 10, fontWeight: 400, color: "#C9A84C" }}>this week</span></div>
            <div style={{ display: "flex", gap: 2 }}>
              {[1,1,1,0,1,1,0,1,1,1,1,0,1,1].map((on, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: 2, background: on ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.06)" }} />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
          
          <FadeInSection className="flex items-center space-x-4 mb-8">
            <div className="h-[1px] w-8 bg-[#C9A84C]"></div>
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase">For Aesthetics & Beauty Clinics</span>
            <div className="h-[1px] w-8 bg-[#C9A84C]"></div>
          </FadeInSection>
          
          <FadeInSection>
            <h1
              className="font-display font-bold text-[42px] md:text-[72px] leading-[1.1] text-white mb-6 whitespace-pre-line"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
            >
              {"Your Business.\nAutomated."}
            </h1>
          </FadeInSection>
          
          <FadeInSection className="max-w-2xl mx-auto mb-10">
            <p className="text-white/70 text-lg md:text-xl leading-relaxed" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>
              We build <span className="text-[#C9A84C]">premium websites</span> for aesthetics and beauty clinics — so you can focus on your <span className="text-[#C9A84C]">clients</span>, not your admin.
            </p>
          </FadeInSection>
          
          <FadeInSection className="flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto">
            <a 
              href="#work" 
              className="bg-[#C9A84C] text-black font-semibold px-8 py-4 rounded hover:bg-[#C9A84C]/90 transition-all duration-200 text-center w-full sm:w-auto"
            >
              See Our Work
            </a>
            <a 
              href="#contact" 
              className="bg-transparent border border-[#C9A84C] text-[#C9A84C] font-semibold px-8 py-4 rounded hover:bg-[#C9A84C]/10 transition-all duration-200 text-center w-full sm:w-auto"
            >
              Book a Free Call
            </a>
          </FadeInSection>
          
          <FadeInSection className="w-full pt-10 border-t border-[#C9A84C]/20">
            <div className="flex flex-row items-center justify-center divide-x divide-[#C9A84C]/30 w-full">
              <div className="flex flex-col items-center justify-center px-4 md:px-10 py-0 w-1/3">
                <span
                  className="font-display font-bold text-3xl md:text-5xl mb-2"
                  style={{ animation: "stat-glow 3.2s ease-in-out infinite", animationDelay: "0s" }}
                >
                  <AnimatedCounter end={10} suffix="+" />
                </span>
                <span className="text-xs md:text-sm text-[#999999] uppercase tracking-wider font-semibold text-center">Clients</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4 md:px-10 py-0 w-1/3">
                <span
                  className="font-display font-bold text-3xl md:text-5xl mb-2"
                  style={{ animation: "stat-glow 4.5s ease-in-out infinite", animationDelay: "1.4s" }}
                >
                  <AnimatedCounter end={50} prefix="£" suffix="k+" />
                </span>
                <span className="text-xs md:text-sm text-[#999999] uppercase tracking-wider font-semibold text-center">Revenue Generated</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4 md:px-10 py-0 w-1/3">
                <span
                  className="font-display font-bold text-3xl md:text-5xl mb-2"
                  style={{ animation: "stat-glow 3.8s ease-in-out infinite", animationDelay: "2.7s" }}
                >
                  <AnimatedCounter end={6} suffix="" />
                </span>
                <span className="text-xs md:text-sm text-[#999999] uppercase tracking-wider font-semibold text-center">Day Delivery</span>
              </div>
            </div>
          </FadeInSection>
          
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* 3. SERVICES */}
      <section id="services" className="py-14 md:py-32 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">What We Build</h2>
            <p className="text-[#C9A84C] text-lg">Premium websites built specifically for aesthetics & beauty clinics.</p>
          </FadeInSection>

          <FadeInSection className="max-w-4xl mx-auto bg-[#1A1A1A] border-t-[3px] border-[#C9A84C] p-10 rounded-sm gold-glow">
            <div className="flex flex-col md:flex-row md:items-start gap-10">
              {/* Icon + heading */}
              <div className="flex-shrink-0">
                <div className="mb-5">
                  <svg viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-10 h-10">
                    <rect x="2" y="6" width="36" height="28" rx="2"/>
                    <line x1="2" y1="14" x2="38" y2="14"/>
                    <circle cx="8" cy="10" r="1.5" fill="#C9A84C" stroke="none"/>
                    <circle cx="14" cy="10" r="1.5" fill="#C9A84C" stroke="none"/>
                    <circle cx="20" cy="10" r="1.5" fill="#C9A84C" stroke="none"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2 md:whitespace-nowrap">Clinic Websites That Convert</h3>
                <p className="text-[#999999] text-sm mb-6 md:mb-0 max-w-xs">Everything a modern aesthetics clinic needs — designed, built and <span className="text-[#C9A84C]">live in days</span>.</p>
              </div>
              {/* Feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow text-[#999999] text-sm">
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Custom design tailored to your clinic's brand</span></div>
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Online booking calendar + Stripe deposits</span></div>
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Before & after treatment galleries</span></div>
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Treatment menus, pricing & video sections</span></div>
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Auto email confirmations on every booking</span></div>
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Admin portal — manage your site yourself</span></div>
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Fully mobile responsive</span></div>
                <div className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold mt-0.5">✓</span><span>Live in 3–6 days</span></div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <a href="#pricing" className="flex-1 border border-[#C9A84C] text-[#C9A84C] font-semibold px-6 py-3 rounded text-center hover:bg-[#C9A84C]/10 transition-colors duration-200">
                View Packages
              </a>
              <a href="#contact" className="flex-1 bg-[#C9A84C] text-black font-bold px-6 py-3 rounded text-center hover:bg-[#C9A84C]/90 transition-colors duration-200">
                Book a Free Call
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* 4. CASE STUDIES */}
      <section id="work" className="py-32 bg-[#222222]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Our Work</h2>
            <p className="text-[#C9A84C] text-lg">Real sites. Real businesses. Real results.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                videoSrc: "/dermadoll-web-opt.mp4",
                mobileImg: "/dermadoll-mobile.jpg",
                phoneColor: "#C9A84C",
                phoneFit: "contain" as const,
                initials: "DA",
                tag: "WEBSITE BUILD",
                name: "Dermadoll Aesthetics",
                description: <>Premium aesthetics clinic in Birmingham. <span style={{color:"#C9A84C"}}>Custom booking calendar</span>, Stripe deposit payments, <span style={{color:"#C9A84C"}}>admin portal</span> and auto email confirmations.</>,
                features: ["Booking System", "Stripe", "Admin Portal", "6 Days"],
                href: "https://dermadoll-aesthetics.co.uk",
              },
              {
                videoSrc: "/flawlessskin-web-opt.mp4",
                mobileImg: "/flawlessskin-mobile.jpg",
                phoneColor: "#7A8C6A",
                initials: "FS",
                tag: "WEBSITE BUILD",
                name: "FlawlessSkin",
                description: <>Luxury aesthetics clinic website built with a <span style={{color:"#C9A84C"}}>cream and sage design system</span>. Calendly booking and <span style={{color:"#C9A84C"}}>Stripe payment</span> integration.</>,
                features: ["Calendly", "Stripe", "Luxury Design", "Mobile First"],
                href: "https://flawless-skin.co.uk",
              },
              {
                videoSrc: "/starraesthetics-web-opt.mp4",
                mobileImg: "/starraesthetics-mobile.jpg",
                phoneColor: "#7B4F4F",
                initials: "SA",
                tag: "DEMO BUILD",
                name: "Starr Aesthetics",
                description: <>Demo aesthetics website showcasing a <span style={{color:"#C9A84C"}}>clean, modern design</span> with full <span style={{color:"#C9A84C"}}>treatment listings</span> and booking integration.</>,
                features: ["Demo", "Booking", "Treatment Menu", "Responsive"],
                href: "#contact",
                linkLabel: "Book Your Demo →",
              },
            ].map((project) => (
              <FadeInSection key={project.name}>
                <div
                  className="portfolio-card group cursor-pointer flex flex-col h-full"
                  style={{
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                    borderRadius: 12,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onClick={() => project.href !== "#" && window.open(project.href, "_blank")}
                >
                  {/* Video / Placeholder */}
                  <div style={{ position: "relative", height: 260, overflow: "hidden", flexShrink: 0, background: "#111" }}>
                    {"videoSrc" in project && project.videoSrc ? (
                      /* Auto-playing looped video background */
                      <video
                        src={(project as typeof project & { videoSrc: string }).videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                      />
                    ) : (
                      /* Initials placeholder for cards without media */
                      <div style={{
                        display: "flex",
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, #222222, #2A2A2A)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <span className="font-display font-bold text-[#C9A84C]" style={{ fontSize: 32 }}>{project.initials}</span>
                      </div>
                    )}
                    {/* Mobile phone overlay — only when mobileImg is provided */}
                    {"mobileImg" in project && project.mobileImg && (() => {
                      const pc = (project as typeof project & { phoneColor?: string; phoneFit?: string }).phoneColor ?? "#C9A84C";
                      const fit = (project as typeof project & { phoneFit?: string }).phoneFit ?? "cover";
                      return (
                        <>
                          {/* Subtle dark gradient so phone pops */}
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
                          {/* Phone mockup */}
                          <div style={{
                            position: "absolute",
                            bottom: 14,
                            right: 16,
                            width: 76,
                            height: 156,
                            borderRadius: 18,
                            border: `1.5px solid ${pc}`,
                            boxShadow: `0 0 0 3px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)`,
                            overflow: "hidden",
                            background: "#000",
                            flexShrink: 0,
                          }}>
                            {/* Screen content */}
                            <img
                              src={(project as typeof project & { mobileImg: string }).mobileImg}
                              alt={`${project.name} mobile`}
                              style={{ width: "100%", height: "100%", objectFit: fit as "cover" | "contain", objectPosition: "top", display: "block", background: "#000" }}
                            />
                            {/* Dynamic Island pill */}
                            <div style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 22, height: 6, background: "#000", borderRadius: 6, zIndex: 3 }} />
                            {/* Home indicator */}
                            <div style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", width: 24, height: 3, background: "rgba(255,255,255,0.35)", borderRadius: 4, zIndex: 3 }} />
                          </div>
                          {/* "Web + Mobile" label */}
                          <div style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: `${pc}26`,
                            border: `1px solid ${pc}66`,
                            color: pc,
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            padding: "3px 8px",
                            borderRadius: 20,
                            textTransform: "uppercase" as const,
                            backdropFilter: "blur(4px)",
                          }}>
                            Web + Mobile
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Card content */}
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                    {/* Gold tag pill */}
                    <div style={{ display: "inline-block", alignSelf: "flex-start", border: "1px solid #C9A84C", color: "#C9A84C", background: "transparent", borderRadius: 20, fontSize: 11, padding: "4px 12px", marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                      {project.tag}
                    </div>

                    {/* Project name */}
                    <div className="font-display font-bold text-white" style={{ fontSize: 20, marginBottom: 8 }}>{project.name}</div>

                    {/* Description */}
                    <p style={{ color: "#999999", fontSize: 14, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{project.description}</p>

                    {/* Feature tags */}
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 0 }}>
                      {project.features.map((f) => (
                        <span key={f} style={{ background: "#2A2A2A", color: "#777777", fontSize: 11, borderRadius: 20, padding: "3px 10px" }}>{f}</span>
                      ))}
                    </div>

                    {/* View site link */}
                    <a
                      href={project.href}
                      target={project.href.startsWith("#") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: "inline-block", color: "#C9A84C", fontSize: 13, marginTop: 16, textDecoration: "none" }}
                      className="hover:underline"
                    >
                      {"linkLabel" in project ? (project as typeof project & { linkLabel: string }).linkLabel : "View Site →"}
                    </a>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center mt-14" style={{ color: "#C9A84C", fontSize: 13, fontStyle: "italic" }}>
            All sites built and delivered within 6 days.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* 5. HOW IT WORKS */}
      <section id="how" className="py-14 md:py-20 bg-[#1A1A1A] overflow-hidden relative">

        {/* ── Animated background (mirrors hero) ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-orb-1" style={{ opacity: 0.5 }} />
          <div className="hero-orb-2" style={{ opacity: 0.4 }} />
          {[
            { left: "8%",  bottom: "10%", dur: "9s",  delay: "0.5s" },
            { left: "28%", bottom: "20%", dur: "11s", delay: "2s"   },
            { left: "52%", bottom: "8%",  dur: "7s",  delay: "1s"   },
            { left: "74%", bottom: "15%", dur: "13s", delay: "3s"   },
            { left: "90%", bottom: "22%", dur: "8s",  delay: "0s"   },
          ].map((p, i) => (
            <div key={i} className="hero-particle" style={{ left: p.left, bottom: p.bottom, animationDuration: p.dur, animationDelay: p.delay }} />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <FadeInSection className="text-center mb-8 md:mb-12">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">How It Works</h2>
            <p className="text-[#C9A84C] text-base md:text-lg">Simple process. Fast results.</p>
          </FadeInSection>
          
          <div className="relative" ref={howRef}>
            {/* Connector Line */}
            <div className="absolute top-[32px] left-[18%] right-[18%] h-[2px] z-0">
              <div className={`h-full w-full bg-[linear-gradient(to_right,#C9A84C_50%,transparent_50%)] bg-[length:12px_2px] bg-repeat-x transition-all duration-[1.5s] ease-out origin-left ${howIsVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 md:gap-8 relative z-10">
              {[
                { n: "1", title: "Discovery", desc: <>We learn about your <span className="text-[#C9A84C]">clinic</span>, treatments and what's holding you back.</> },
                { n: "2", title: "Build",     desc: <>We design and build your site — <span className="text-[#C9A84C]">tailored to your brand</span>. Delivered in days.</> },
                { n: "3", title: "Launch",    desc: <>You go <span className="text-[#C9A84C]">live</span>, take bookings and run on <span className="text-[#C9A84C]">autopilot</span>.</> },
              ].map(({ n, title, desc }) => (
                <FadeInSection key={n} className="flex flex-col items-center text-center px-1 md:px-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-5">
                    <span className="font-display font-bold text-4xl md:text-5xl text-[#C9A84C]">{n}</span>
                  </div>
                  <h3 className="font-display font-bold text-xs md:text-lg text-white mb-2 tracking-wide uppercase">{title}</h3>
                  <p className="text-[#999999] text-xs md:text-sm leading-relaxed">{desc}</p>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* 6. PRICING */}
      <section id="pricing" className="py-24 md:py-32 bg-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection className="text-center mb-6">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 tracking-tight">
              EVERY PROJECT IS DIFFERENT
            </h2>
            <p className="text-[#C9A84C] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We tailor every website to your business — the features, the design, the functionality. No off the shelf packages. No hidden costs. Just exactly what you need.
            </p>
          </FadeInSection>

          {/* Feature card detail popup */}
          {expandedCard && (() => {
            const G = ({ children }: { children: React.ReactNode }) => (
              <span style={{ color: "#C9A84C" }}>{children}</span>
            );
            const cards = [
              {
                title: "BUILT AROUND YOU",
                detail: [
                  <><G>Discovery call first</G> — no templates, no copy-paste. We learn before we build.</>,
                  <>We learn your <G>treatments</G>, your <G>clients</G>, your vibe. Then we build something that actually fits your business.</>,
                  <>Aesthetics clinic, beauty salon, barber, PT — every site we build is <G>completely unique</G> to you.</>,
                ],
              },
              {
                title: "48HR DELIVERY",
                detail: [
                  <>Once you've signed off the brief, <G>we move fast.</G></>,
                  <>Most projects are <G>designed, built and handed over within 48 hours</G> — no long waits, no chasing.</>,
                  <>You'll have a <G>live site in days</G>, not weeks.</>,
                ],
              },
              {
                title: "TRANSPARENT PRICING",
                detail: [
                  <><G>No mystery packages.</G> No surprise invoices. What you see is what you pay.</>,
                  <>You tell us what you need, we give you a <G>straight price</G>. Simple.</>,
                  <>DM us on WhatsApp with your requirements and we'll come back with a <G>clear, honest quote</G>.</>,
                ],
              },
            ];
            const active = cards.find(c => c.title === expandedCard);
            if (!active) return null;
            return (
              <div
                className="fixed inset-0 z-[200] flex items-center justify-center px-5"
                style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
                onClick={() => setExpandedCard(null)}
              >
                <div
                  className="relative w-full max-w-sm rounded-sm overflow-hidden"
                  style={{
                    background: "rgba(26,26,26,0.88)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(201,168,76,0.35)",
                    borderTop: "2px solid #C9A84C",
                    boxShadow: "0 0 60px rgba(201,168,76,0.12), 0 24px 64px rgba(0,0,0,0.6)",
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-lg leading-none"
                  >✕</button>
                  <div className="px-8 pt-8 pb-10">
                    <h3 className="font-display font-bold text-white text-lg tracking-wider mb-6 pr-6">{active.title}</h3>
                    <div className="space-y-4">
                      {active.detail.map((para, i) => (
                        <p key={i} className="text-white/70 text-sm leading-relaxed border-l-2 border-[#C9A84C]/30 pl-4">{para}</p>
                      ))}
                    </div>
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="mt-8 text-white/30 hover:text-white/60 text-xs tracking-wider transition-colors"
                    >Close</button>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-3 gap-2 md:gap-5 mb-10 mt-14">
            {[
              {
                title: "BUILT AROUND YOU",
                detail: [
                  "We start every project with a discovery call — no templates, no copy-paste.",
                  "We learn your treatments, your clients, your vibe. Then we build something that actually fits your business.",
                  "Aesthetics clinic, beauty salon, barber, PT — every site we build is completely unique to you.",
                ],
              },
              {
                title: "48HR DELIVERY",
                detail: [
                  "Once you've signed off the brief, we move fast.",
                  "Most projects are designed, built and handed over within 48 hours — no long waits, no chasing.",
                  "You'll have a live site in days, not weeks.",
                ],
              },
              {
                title: "TRANSPARENT PRICING",
                detail: [
                  "No mystery packages. No surprise invoices.",
                  "You tell us what you need, we give you a straight price. Simple.",
                  "DM us on WhatsApp with your requirements and we'll come back to you with a clear, honest quote.",
                ],
              },
            ].map(({ title }) => (
              <FadeInSection key={title} className="h-full">
                <div
                  className="h-full px-3 py-4 md:px-7 md:py-8 flex flex-col items-center text-center"
                  style={{
                    background: "#1e1e1e",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderTop: "3px solid #C9A84C",
                    borderRadius: 4,
                  }}
                >
                  <h3 className="font-display font-bold text-white text-[10px] md:text-lg mb-2 md:mb-4 tracking-wider leading-tight">{title}</h3>
                  <button
                    onClick={() => setExpandedCard(title)}
                    className="mt-auto text-[#C9A84C] text-[8px] md:text-xs font-semibold tracking-wider uppercase hover:text-[#C9A84C]/70 transition-colors"
                  >
                    VIEW MORE ↓
                  </button>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center">
            <a
              href="https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20%F0%9F%91%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#C9A84C] text-black font-bold text-sm md:text-base px-10 py-4 tracking-[0.12em] uppercase hover:bg-[#C9A84C]/90 hover:scale-105 transition-all duration-200"
              style={{ borderRadius: 2, letterSpacing: "0.1em" }}
            >
              GET A CUSTOM QUOTE →
            </a>
          </FadeInSection>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* 7. CONTACT */}
      <section id="contact" className="py-32 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Ready to Start?</h2>
            <p className="text-[#C9A84C] text-lg">Book a free 20-minute discovery call or drop us a message.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left - Form */}
            <FadeInSection>
              {formSubmitted ? (
                <div className="bg-[#1A1A1A] p-10 rounded border border-[#C9A84C] text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-[#C9A84C] text-2xl">✓</span>
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">Message received</h3>
                  <p className="text-[#C9A84C]">We'll be in touch within the same day.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                  className="space-y-6 bg-[#1A1A1A] p-8 rounded-sm"
                >
                  <div className="space-y-2">
                    <label className="text-sm text-white/80 font-medium block">Name</label>
                    <input required type="text" className="w-full bg-[#222222] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/80 font-medium block">Business Name</label>
                    <input required type="text" className="w-full bg-[#222222] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/80 font-medium block">Email</label>
                    <input required type="email" className="w-full bg-[#222222] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/80 font-medium block">What do you need?</label>
                    <select className="w-full bg-[#222222] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] transition-all appearance-none">
                      <option>Standard Website (£599.99)</option>
                      <option>Pro Website (£999.99)</option>
                      <option>Not Sure — Let's Talk</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/80 font-medium block">Message</label>
                    <textarea required rows={4} className="w-full bg-[#222222] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] transition-all resize-none"></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-[#C9A84C] text-black font-bold px-6 py-4 rounded text-center hover:bg-[#C9A84C]/90 transition-colors duration-200">
                    Send Message
                  </button>
                </form>
              )}
            </FadeInSection>

            {/* Right - Direct Contact */}
            <FadeInSection className="flex flex-col justify-center">
              <div className="bg-[#1A1A1A] p-10 rounded-sm space-y-10">
                
                <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-[#C9A84C] transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#222222] flex items-center justify-center group-hover:bg-[#C9A84C]/10 transition-colors">
                    <Instagram size={24} />
                  </div>
                  <span className="font-display text-xl font-medium">@aesthetix_systems</span>
                </a>
                
                <a href="https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20%F0%9F%91%8B" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-[#C9A84C] transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#222222] flex items-center justify-center group-hover:bg-[#C9A84C]/10 transition-colors">
                    <MessageCircle size={24} />
                  </div>
                  <span className="font-display text-xl font-medium">Message on WhatsApp</span>
                </a>
                
                <div className="pt-4">
                  <div className="text-[#C9A84C] text-xs font-bold tracking-[0.15em] uppercase mb-4">TYPICAL RESPONSE TIME: SAME DAY</div>
                  <div className="h-[1px] w-full bg-[#C9A84C]/20 mb-8"></div>
                  
                  <a href="#" className="w-full block border border-[#C9A84C] text-[#C9A84C] font-bold px-6 py-4 rounded text-center hover:bg-[#C9A84C]/10 transition-colors duration-200">
                    Book a Free Call
                  </a>
                </div>
                
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* 8. FOOTER */}
      <footer className="bg-[#111111] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <a href="#home" className="flex flex-col items-center leading-none mb-6">
            <span className="font-display font-bold text-3xl tracking-[0.15em] text-white">AESTHETIX</span>
            <span className="font-sans text-xs tracking-[0.3em] text-[#C9A84C] font-semibold mt-2 uppercase">SYSTEMS</span>
          </a>
          
          <p className="text-[#C9A84C] italic font-sans mb-12">The digital partner for aesthetics & beauty clinics.</p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16">
            <a href="#services" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Services</a>
            <a href="#work" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Work</a>
            <a href="#pricing" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Pricing</a>
            <a href="#contact" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Contact</a>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-[#999999] text-xs gap-4 pt-8 border-t border-white/5">
            <p style={{ color: "#C9A84C" }}>© 2026 Aesthetix. All rights reserved.</p>
            <p style={{ color: "#C9A84C" }}>Based in London, UK</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
