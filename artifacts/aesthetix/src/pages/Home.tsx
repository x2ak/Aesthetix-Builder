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
  const [standardExpanded, setStandardExpanded] = useState(false);
  const [proExpanded, setProExpanded] = useState(false);
  
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
      {/* 1. NAV */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out border-b ${
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
      <section id="home" className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
          
          <FadeInSection className="flex items-center space-x-4 mb-8">
            <div className="h-[1px] w-8 bg-[#C9A84C]"></div>
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase">Web Builds & Business Systems</span>
            <div className="h-[1px] w-8 bg-[#C9A84C]"></div>
          </FadeInSection>
          
          <FadeInSection>
            <h1 className="font-display font-bold text-[42px] md:text-[72px] leading-[1.1] text-white mb-6 whitespace-pre-line">
              {"Your Business.\nAutomated."}
            </h1>
          </FadeInSection>
          
          <FadeInSection className="max-w-2xl mx-auto mb-10">
            <p className="text-[#999999] text-lg md:text-xl leading-relaxed">
              We build premium websites and intelligent systems that handle your bookings, enquiries and operations — so you don't have to.
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
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#C9A84C]/30 w-full">
              <div className="flex flex-col items-center justify-center px-10 py-4 md:py-0 w-full md:w-1/3">
                <span className="font-display font-bold text-4xl md:text-5xl text-white mb-2"><AnimatedCounter end={10} suffix="+" /></span>
                <span className="text-sm text-[#999999] uppercase tracking-wider font-semibold">Clients</span>
              </div>
              <div className="flex flex-col items-center justify-center px-10 py-4 md:py-0 w-full md:w-1/3">
                <span className="font-display font-bold text-4xl md:text-5xl text-white mb-2"><AnimatedCounter end={50} prefix="£" suffix="k+" /></span>
                <span className="text-sm text-[#999999] uppercase tracking-wider font-semibold">Revenue Generated</span>
              </div>
              <div className="flex flex-col items-center justify-center px-10 py-4 md:py-0 w-full md:w-1/3">
                <span className="font-display font-bold text-4xl md:text-5xl text-white mb-2"><AnimatedCounter end={6} suffix="" /></span>
                <span className="text-sm text-[#999999] uppercase tracking-wider font-semibold">Day Delivery</span>
              </div>
            </div>
          </FadeInSection>
          
        </div>
      </section>

      {/* 3. SERVICES */}
      <section id="services" className="py-32 bg-[#222222]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">What We Build</h2>
            <p className="text-[#999999] text-lg">Two core offerings. One agency.</p>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <FadeInSection className="bg-[#1A1A1A] border-t-[3px] border-[#C9A84C] p-10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 gold-glow rounded-sm">
              <div className="mb-6">
                <svg viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-10 h-10">
                  <rect x="2" y="6" width="36" height="28" rx="2"/>
                  <line x1="2" y1="14" x2="38" y2="14"/>
                  <circle cx="8" cy="10" r="1.5" fill="#C9A84C" stroke="none"/>
                  <circle cx="14" cy="10" r="1.5" fill="#C9A84C" stroke="none"/>
                  <circle cx="20" cy="10" r="1.5" fill="#C9A84C" stroke="none"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-4">Premium Website Builds</h3>
              <ul className="space-y-4 mb-10 flex-grow text-[#999999]">
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Custom design & build</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Booking calendar + Stripe payments</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Admin portal</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Auto email confirmations</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Before & after galleries, video sections</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> 6-day delivery</li>
              </ul>
              <a href="#pricing" className="border border-[#C9A84C] text-[#C9A84C] font-semibold px-6 py-3 rounded text-center hover:bg-[#C9A84C]/10 transition-colors duration-200 mt-auto">
                View Packages
              </a>
            </FadeInSection>
            
            {/* Card 2 */}
            <FadeInSection className="bg-[#1A1A1A] border-t-[3px] border-[#C9A84C] p-10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 gold-glow rounded-sm">
              <div className="mb-6">
                <svg viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-10 h-10">
                  <circle cx="8" cy="20" r="3"/>
                  <circle cx="20" cy="8" r="3"/>
                  <circle cx="32" cy="20" r="3"/>
                  <circle cx="20" cy="32" r="3"/>
                  <line x1="11" y1="20" x2="17" y2="20"/>
                  <line x1="23" y1="20" x2="29" y2="20"/>
                  <line x1="20" y1="11" x2="20" y2="17"/>
                  <line x1="20" y1="23" x2="20" y2="29"/>
                  <circle cx="20" cy="20" r="4"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-4">Business Automation Systems</h3>
              <ul className="space-y-4 mb-10 flex-grow text-[#999999]">
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> AI email reply bot</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> WhatsApp booking notifications</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Missed enquiry follow-up automation</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Content repurposing pipeline</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Telegram approval flows</li>
                <li className="flex items-start gap-3"><span className="text-[#C9A84C] font-bold">✓</span> Full workflow handover</li>
              </ul>
              <a href="#pricing" className="border border-[#C9A84C] text-[#C9A84C] font-semibold px-6 py-3 rounded text-center hover:bg-[#C9A84C]/10 transition-colors duration-200 mt-auto">
                View Packages
              </a>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how" className="py-32 bg-[#1A1A1A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection className="text-center mb-20">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">How It Works</h2>
            <p className="text-[#999999] text-lg">Simple process. Fast results.</p>
          </FadeInSection>
          
          <div className="relative" ref={howRef}>
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] z-0">
              <div className={`h-full w-full bg-[linear-gradient(to_right,#C9A84C_50%,transparent_50%)] bg-[length:15px_2px] bg-repeat-x transition-all duration-[1.5s] ease-out origin-left ${howIsVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
              {/* Step 1 */}
              <FadeInSection className="flex flex-col items-center text-center bg-[#1A1A1A]">
                <div className="w-20 h-20 bg-[#1A1A1A] flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-6xl text-[#C9A84C]">1</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-4 tracking-wide uppercase">Discovery</h3>
                <p className="text-[#999999] max-w-xs">We learn your business, your goals and exactly what's slowing you down.</p>
              </FadeInSection>
              
              {/* Step 2 */}
              <FadeInSection className="flex flex-col items-center text-center bg-[#1A1A1A]">
                <div className="w-20 h-20 bg-[#1A1A1A] flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-6xl text-[#C9A84C]">2</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-4 tracking-wide uppercase">Build</h3>
                <p className="text-[#999999] max-w-xs">We design and build your site or system — fully tailored, delivered in days not months.</p>
              </FadeInSection>
              
              {/* Step 3 */}
              <FadeInSection className="flex flex-col items-center text-center bg-[#1A1A1A]">
                <div className="w-20 h-20 bg-[#1A1A1A] flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-6xl text-[#C9A84C]">3</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-4 tracking-wide uppercase">Launch</h3>
                <p className="text-[#999999] max-w-xs">You go live, take bookings and run your business on autopilot from day one.</p>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES */}
      <section id="work" className="py-32 bg-[#222222]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Real Results</h2>
            <p className="text-[#999999] text-lg">Built for real businesses. Delivering real outcomes.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1 */}
            <FadeInSection className="bg-[#1A1A1A] border border-[#C9A84C]/30 p-8 rounded-sm transition-all duration-300 hover:-translate-y-2 gold-glow flex flex-col">
              <div className="self-start bg-[#C9A84C] text-black text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wide">
                WEBSITE BUILD
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">DERMADOLL AESTHETICS</h3>
              <p className="text-white/90 text-lg mb-6 font-medium">Premium aesthetics clinic — fully booked from launch</p>
              <ul className="space-y-3 text-[#999999] mb-8 flex-grow">
                <li>— Full custom website with booking calendar & Stripe payments</li>
                <li>— 50% deposit taken automatically</li>
                <li>— Admin portal to manage bookings, media and content</li>
                <li>— Before & after gallery, video sections, reviews carousel</li>
                <li>— Auto email confirmations</li>
                <li>— FAQ, training courses section, full mobile responsive</li>
              </ul>
              <div className="bg-[#C9A84C] text-black font-bold px-4 py-3 text-center rounded-sm mt-auto w-full">
                Delivered in 6 days
              </div>
            </FadeInSection>

            {/* Case 2 */}
            <FadeInSection className="bg-[#1A1A1A] border border-[#C9A84C]/30 p-8 rounded-sm transition-all duration-300 hover:-translate-y-2 gold-glow flex flex-col">
              <div className="self-start bg-[#C9A84C] text-black text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wide">
                WEBSITE BUILD
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">FLAWLESSSKIN</h3>
              <p className="text-white/90 text-lg mb-6 font-medium">Aesthetics clinic live and taking bookings within a week</p>
              <ul className="space-y-3 text-[#999999] mb-8 flex-grow">
                <li>— Premium single-page website built to a cream & sage design system</li>
                <li>— Calendly booking integration embedded seamlessly</li>
                <li>— Stripe payment setup for deposits</li>
                <li>— Mobile-first design with luxury feel</li>
                <li>— Fully handed over with no ongoing maintenance needed</li>
              </ul>
              <div className="bg-[#C9A84C] text-black font-bold px-4 py-3 text-center rounded-sm mt-auto w-full">
                Built & live in under 7 days
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 6. PRICING */}
      <section id="pricing" className="py-32 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Transparent Pricing</h2>
            <p className="text-[#999999] text-lg">No hidden fees. No surprises. No lock-in.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Standard */}
            <FadeInSection className="bg-[#222222] p-8 rounded-sm transition-all duration-200 hover:scale-[1.02] border border-transparent h-full flex flex-col">
              <h3 className="font-display font-bold text-2xl text-white mb-1">STANDARD</h3>
              <div className="text-[#C9A84C] font-display font-bold text-4xl mb-2">£599.99</div>
              <p className="text-[#999999] text-sm mb-8 font-medium">Get online fast</p>
              
              <ul className="space-y-4 text-white/80 mb-8 flex-grow text-sm">
                <li>✓ Single page custom website</li>
                <li>✓ Mobile responsive design</li>
                <li>✓ Contact & booking form</li>
                <li>✓ 1 round of revisions</li>
                <li>✓ Delivered in 3 days</li>
              </ul>

              {/* Expandable detail */}
              <div style={{ maxHeight: standardExpanded ? "600px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <div className="border-t border-white/10 pt-6 mb-6 space-y-4 text-sm text-white/70">
                  <p className="text-[#C9A84C] font-semibold uppercase tracking-wider text-xs mb-3">What's included in detail</p>
                  <p>Your website is designed and built from scratch, fully tailored to your brand, colours and tone of voice.</p>
                  <p>Single page covering all your key sections — hero, services, about, contact — laid out cleanly and professionally.</p>
                  <p>Fully optimised for mobile, tablet and desktop. Your clients will have a seamless experience on any device.</p>
                  <p>Contact form sends enquiries straight to your inbox. Built-in booking form lets clients schedule with you instantly.</p>
                  <p>1 round of amends after the first draft is delivered — any tweaks, copy changes or layout adjustments included.</p>
                  <p>Handed over in 3 working days from project kick-off. Full walkthrough call so you know how to manage everything yourself.</p>
                  <p className="text-[#C9A84C]">Ideal for: service businesses, consultants, sole traders and anyone who needs a clean, professional online presence fast.</p>
                </div>
              </div>

              <button
                onClick={() => setStandardExpanded(!standardExpanded)}
                className="w-full text-sm text-[#C9A84C] border border-[#C9A84C]/30 rounded py-2 mb-4 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {standardExpanded ? "View Less ↑" : "View More ↓"}
              </button>
              
              <div className="border-t border-white/10 pt-6 mb-8 text-sm text-[#999999]">
                Hosting add-on: £45/mo or £360/yr <span className="text-[#C9A84C]">(2 months free)</span>
              </div>
              
              <a href="#contact" className="w-full block border border-[#C9A84C] text-[#C9A84C] font-semibold px-6 py-3 rounded text-center hover:bg-[#C9A84C]/10 transition-colors duration-200 mt-auto">
                Get Started
              </a>
            </FadeInSection>

            {/* Pro */}
            <FadeInSection className="bg-[#222222] p-10 rounded-sm border border-[#C9A84C] scale-100 md:scale-[1.03] hover:scale-[1.03] md:hover:scale-[1.05] transition-all duration-200 relative h-full flex flex-col z-10 shadow-2xl shadow-[#C9A84C]/10">
              <div className="absolute top-0 right-0 bg-[#C9A84C] text-black text-xs font-bold px-3 py-1 m-4 rounded-full">
                ★ Most Popular
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-1">PRO</h3>
              <div className="text-[#C9A84C] font-display font-bold text-4xl mb-2">£999.99</div>
              <p className="text-[#999999] text-sm mb-8 font-medium">Your full digital presence</p>
              
              <ul className="space-y-4 text-white/80 mb-8 flex-grow text-sm">
                <li>✓ Full multi-section website</li>
                <li>✓ Custom booking calendar</li>
                <li>✓ Stripe deposit + payment system</li>
                <li>✓ Admin portal</li>
                <li>✓ Auto email confirmations</li>
                <li>✓ Before & after gallery</li>
                <li>✓ Video sections</li>
                <li>✓ 1 round of revisions</li>
                <li>✓ Delivered in 6 days</li>
              </ul>

              {/* Expandable detail */}
              <div style={{ maxHeight: proExpanded ? "700px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <div className="border-t border-white/10 pt-6 mb-6 space-y-4 text-sm text-white/70">
                  <p className="text-[#C9A84C] font-semibold uppercase tracking-wider text-xs mb-3">What's included in detail</p>
                  <p>A full, multi-section website built completely from scratch — hero, services, about, gallery, FAQ, contact and any additional sections your business needs.</p>
                  <p>Custom booking calendar integrated directly into your site. Clients pick a date and time, pay their deposit, and you're confirmed — no back and forth.</p>
                  <p>Stripe payment integration handles deposits or full payments automatically at the point of booking. You receive funds directly to your Stripe account.</p>
                  <p>Admin portal so you can manage your own bookings, update your content, upload images and view enquiries — no developer needed after handover.</p>
                  <p>Auto email confirmations sent to both you and your client the moment a booking is made. Professional, branded, and completely hands-off.</p>
                  <p>Before & after gallery with a lightbox — perfect for aesthetics clinics, hair studios, tattoo artists and any visual service business.</p>
                  <p>Embedded video sections so you can showcase treatments, walkthroughs or testimonials directly on your site.</p>
                  <p>1 round of amends after the first draft. Full handover call and video walkthrough so you can manage everything yourself from day one.</p>
                  <p className="text-[#C9A84C]">Ideal for: aesthetics clinics, beauty studios, hair salons, fitness coaches and any service business ready to take bookings and payments online.</p>
                </div>
              </div>

              <button
                onClick={() => setProExpanded(!proExpanded)}
                className="w-full text-sm text-black bg-[#C9A84C]/20 border border-[#C9A84C]/50 rounded py-2 mb-4 hover:bg-[#C9A84C]/30 hover:border-[#C9A84C] transition-all duration-200 text-[#C9A84C] flex items-center justify-center gap-2 font-semibold"
              >
                {proExpanded ? "View Less ↑" : "View More ↓"}
              </button>
              
              <div className="border-t border-white/10 pt-6 mb-8 text-sm text-[#999999]">
                Hosting add-on: £65/mo or £520/yr <span className="text-[#C9A84C]">(2 months free)</span>
              </div>
              
              <a href="#contact" className="w-full block bg-[#C9A84C] text-black font-bold px-6 py-4 rounded text-center hover:bg-[#C9A84C]/90 transition-colors duration-200 mt-auto">
                Get Started
              </a>
            </FadeInSection>

          </div>
          
          <FadeInSection className="mt-12 text-center">
            <p className="text-sm text-[#999999] italic">All projects require a 50% deposit upfront, 50% on delivery.</p>
          </FadeInSection>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact" className="py-32 bg-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Ready to Start?</h2>
            <p className="text-[#999999] text-lg">Book a free 20-minute discovery call or drop us a message.</p>
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
                      <option>Website Build</option>
                      <option>Automation System</option>
                      <option>Both</option>
                      <option>Not Sure</option>
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
                
                <a href="https://wa.me/447495963388" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-[#C9A84C] transition-colors group">
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

      {/* 8. FOOTER */}
      <footer className="bg-[#111111] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <a href="#home" className="flex flex-col items-center leading-none mb-6">
            <span className="font-display font-bold text-3xl tracking-[0.15em] text-white">AESTHETIX</span>
            <span className="font-sans text-xs tracking-[0.3em] text-[#C9A84C] font-semibold mt-2 uppercase">SYSTEMS</span>
          </a>
          
          <p className="text-[#999999] italic font-sans mb-12">Built to convert. Built to last.</p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16">
            <a href="#services" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Services</a>
            <a href="#work" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Work</a>
            <a href="#pricing" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Pricing</a>
            <a href="#contact" className="text-white/70 hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider font-semibold">Contact</a>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-[#999999] text-xs gap-4 pt-8 border-t border-white/5">
            <p>© 2026 Aesthetix. All rights reserved.</p>
            <p>Based in London, UK</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
