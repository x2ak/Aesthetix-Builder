import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSEO, useBreadcrumb } from "@/hooks/useSEO";

const cream = "#F7F4EE";
const charcoal = "#1A1A1C";
const inkSoft = "#4A4A4E";
const inkMute = "#8A8A8E";
const gold = "#C4A882";
const goldTint = "#F5EDD9";
const line = "#E5DFD3";
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20clinic!";

interface TreatmentData {
  slug: string;
  name: string;
  shortName: string;
  heroHeadline: string;
  heroItalic: string;
  intro: string;
  whyMatters: string[];
  treatments: string[];
  faqExtra: Array<{ q: string; a: string }>;
}

const TREATMENTS: TreatmentData[] = [
  {
    slug: "botox-clinics",
    name: "Botox & Anti-Wrinkle Clinics",
    shortName: "Botox",
    heroHeadline: "Websites Built for",
    heroItalic: "Botox & Anti-Wrinkle Clinics",
    intro:
      "Anti-wrinkle injections are the UK's most searched aesthetic treatment. When a patient Googles 'Botox near me', your website is your first impression — and in this market, first impressions are everything.",
    whyMatters: [
      "Botox is the UK's most performed non-surgical treatment with millions of searches every month — you need to be visible and credible",
      "Patients choosing between botox clinics make their decision based almost entirely on how professional the website looks and how clearly it communicates safety and results",
      "A premium website positions your clinic as a medical-grade provider rather than a budget option, letting you charge what you're worth",
    ],
    treatments: [
      "Anti-Wrinkle Injections",
      "Brow Lift",
      "Crow's Feet",
      "Forehead Lines",
      "Bunny Lines",
      "Jawline Slimming",
      "Hyperhidrosis Treatment",
      "Gummy Smile Correction",
      "Lip Flip",
      "Neck Bands",
      "Nefertiti Lift",
      "Baby Botox",
    ],
    faqExtra: [
      {
        q: "Can you showcase before and after results on a Botox clinic website?",
        a: "Absolutely — and it's one of the most powerful conversion tools. We build compliant before/after galleries that showcase your results without breaching JCCP or ASA guidelines.",
      },
      {
        q: "How do we stay compliant with ASA rules on Botox advertising?",
        a: "Every website we build for injectable clinics follows current ASA and JCCP advertising guidelines. We advise on compliant copywriting throughout the project.",
      },
    ],
  },
  {
    slug: "lip-filler-clinics",
    name: "Lip Filler & Dermal Filler Clinics",
    shortName: "Lip Filler",
    heroHeadline: "Premium Websites for",
    heroItalic: "Lip Filler & Dermal Filler Clinics",
    intro:
      "Lip filler is one of the most searched aesthetics treatments in the UK — and patients are incredibly selective about who they trust. A premium, professional website is what separates clinics that are fully booked from those that aren't.",
    whyMatters: [
      "Lip filler searches in the UK have grown over 400% in the last five years — the demand is there, the question is whether patients find you first",
      "Filler patients spend significant time researching before booking — your website needs to answer every question and build complete trust before they even pick up the phone",
      "Showcasing your technique, training credentials, and before/after results effectively can double your conversion rate from visitor to booking",
    ],
    treatments: [
      "Lip Filler",
      "Cheek Filler",
      "Nasolabial Fold Filler",
      "Marionette Lines",
      "Chin Filler",
      "Jawline Filler",
      "Tear Trough Filler",
      "Nose-to-Mouth Lines",
      "Temple Filler",
      "Hand Rejuvenation",
      "Dissolving (Hyaluronidase)",
      "Russian Lip Technique",
    ],
    faqExtra: [
      {
        q: "Can you add a treatment menu with pricing for our filler services?",
        a: "Yes — we build clear, well-designed treatment menus that present your services and pricing in a way that builds confidence and reduces pre-booking friction.",
      },
      {
        q: "We offer multiple filler techniques — can the website explain each one?",
        a: "Absolutely. We can build dedicated treatment pages for each technique, optimised individually for search so patients can find exactly what they're looking for.",
      },
    ],
  },
  {
    slug: "medical-aesthetics-clinics",
    name: "Medical Aesthetics Clinics",
    shortName: "Medical Aesthetics",
    heroHeadline: "Bespoke Websites for",
    heroItalic: "Medical Aesthetics Clinics",
    intro:
      "Medical aesthetics sits at the intersection of medicine and beauty — and your website needs to reflect that duality. Clinical authority, premium presentation, and seamless booking. We build all three.",
    whyMatters: [
      "Medical aesthetics patients expect a higher standard of clinic — and they judge that standard before they ever book by looking at your website",
      "Clinics that clearly communicate their medical credentials, qualifications, and safety protocols convert at significantly higher rates",
      "A well-built website can be your most powerful compliance and trust tool — showcasing your training, insurance, and patient care philosophy",
    ],
    treatments: [
      "Profhilo",
      "Polynucleotides (PDRN)",
      "Skin Boosters",
      "Morpheus8",
      "HIFU",
      "Microneedling RF",
      "PRP (Platelet-Rich Plasma)",
      "IV Therapy",
      "Weight Loss Injections",
      "Collagen Stimulators",
      "Fat Dissolving Injections",
      "Aqualyx",
    ],
    faqExtra: [
      {
        q: "We're a medically-led clinic — can the website communicate that clearly?",
        a: "That's exactly what we specialise in. We help clinics communicate their clinical authority, qualifications, and safety standards in a way that builds genuine patient confidence.",
      },
      {
        q: "Can you help with CQC registration or clinical compliance pages?",
        a: "Yes — we build compliant pages covering your qualifications, insurance, consent processes, and clinical governance, tailored to your regulatory environment.",
      },
    ],
  },
  {
    slug: "beauty-clinics",
    name: "Beauty & Aesthetic Clinics",
    shortName: "Beauty Clinics",
    heroHeadline: "Beautiful Websites for",
    heroItalic: "Beauty & Aesthetic Clinics",
    intro:
      "Whether you're a beauty salon expanding into aesthetics or an established clinic refreshing your brand — your website should feel as premium as the treatments you offer. We build beautiful, conversion-focused websites for beauty businesses across the UK.",
    whyMatters: [
      "Beauty clinic patients make booking decisions in under 30 seconds on your website — first impressions are everything",
      "A premium website allows you to charge premium prices — clients associate the quality of your digital presence with the quality of your treatments",
      "The UK beauty industry is worth over £4 billion — clinics with professional digital presences capture a disproportionate share of the market",
    ],
    treatments: [
      "Facials & Skin Treatments",
      "Lash & Brow Services",
      "Semi-Permanent Makeup",
      "Spray Tan & Body Treatments",
      "Waxing & Hair Removal",
      "Laser Hair Removal",
      "LED Therapy",
      "Chemical Peels",
      "Hydrafacial",
      "Cryotherapy",
      "Meso Therapy",
      "Body Contouring",
    ],
    faqExtra: [
      {
        q: "We offer both beauty and aesthetic treatments — can the website cover both?",
        a: "Absolutely — we regularly build websites for clinics that bridge both worlds. We'll structure your services clearly so patients can navigate to exactly what they're looking for.",
      },
    ],
  },
  {
    slug: "skin-clinics",
    name: "Skin & Laser Clinics",
    shortName: "Skin Clinics",
    heroHeadline: "High-Performance Websites for",
    heroItalic: "Skin & Laser Clinics",
    intro:
      "Skin clinics offering laser, advanced facials, and skin health programmes need websites that communicate clinical expertise without losing the luxury feel. We specialise in exactly that balance.",
    whyMatters: [
      "Skin clinic patients are among the most research-driven in aesthetics — they expect detailed treatment information and clinical credibility before booking",
      "Laser and advanced skin treatment searches are growing rapidly in the UK as patients seek clinical alternatives to surgical procedures",
      "Clinics that invest in educational, well-structured websites see significantly higher organic traffic and lower cost-per-booking than those relying on social media alone",
    ],
    treatments: [
      "Laser Resurfacing",
      "Laser Hair Removal",
      "IPL Photofacial",
      "AcneStar / Blue Light",
      "Carbon Laser Peel",
      "Fractional Laser",
      "Chemical Peels",
      "Hydrafacial",
      "Dermaplaning",
      "Microdermabrasion",
      "Skin Analysis & Consultations",
      "Prescription Skincare",
    ],
    faqExtra: [
      {
        q: "Can you build individual pages for each of our laser treatments?",
        a: "Yes — dedicated treatment pages are one of the best things you can do for SEO. We build them with proper keyword targeting so each treatment gets found independently.",
      },
      {
        q: "We sell skincare products too — can the website include an online shop?",
        a: "Absolutely. We can integrate a lightweight e-commerce section or connect to your existing Shopify/WooCommerce store, whichever suits you best.",
      },
    ],
  },
];

const CORE_SERVICES = [
  {
    title: "Bespoke Website Design",
    desc: "Custom-designed, no templates. Built around your clinic's identity and treatments.",
    points: ["Hand-crafted design, zero templates", "Treatment-specific page structure", "Mobile-first, fast-loading"],
  },
  {
    title: "Online Booking Integration",
    desc: "Seamless booking for every treatment type. Works with Fresha, Ovatu, Timely, and more.",
    points: ["24/7 patient self-booking", "Treatment-specific booking flows", "Reduces admin by up to 70%"],
  },
  {
    title: "AI Receptionist",
    desc: "Answers treatment questions, captures enquiries, and books consultations — around the clock.",
    points: ["Trained on your treatment menu", "Captures leads you'd otherwise lose", "Available 24/7, never off sick"],
  },
];

const TESTIMONIALS = [
  {
    quote: "Sim built us something that genuinely reflects the standard of our clinic. Patients comment on the website constantly.",
    name: "Dr Sarah Mitchell",
    clinic: "Lumière Aesthetics, London",
  },
  {
    quote: "We went from 12 bookings a month to over 40 within six weeks of launching our new site. The ROI is undeniable.",
    name: "Jess Whitmore",
    clinic: "Pure Glow Clinic",
  },
  {
    quote: "The AI receptionist alone has paid for the website ten times over. It captures leads we used to lose completely.",
    name: "Priya Sharma",
    clinic: "Nova Skin Studio",
  },
];

const FAQ_BASE = [
  {
    q: "How long does a website take to build?",
    a: "Most clinic websites take 2–4 weeks from brief to launch. We move fast without cutting corners.",
  },
  {
    q: "What does a website cost?",
    a: "Bespoke clinic websites start from £1,499 as a one-time fee, with optional monthly maintenance from £19.99/month. No hidden costs.",
  },
  {
    q: "Do I own my website?",
    a: "Completely — the code, the domain, the hosting. We don't lock you into any proprietary platform.",
  },
  {
    q: "Can you build individual pages for each of our treatments?",
    a: "Yes, and we strongly recommend it. Dedicated treatment pages are the single best thing you can do for SEO — each page can rank independently for its own search terms.",
  },
  {
    q: "Do you understand aesthetics clinic regulations?",
    a: "Yes. Every site we build follows ASA advertising standards for aesthetics, and we advise on compliant copywriting for injectable and prescription treatments throughout the project.",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function TreatmentLanding({ treatmentSlug }: { treatmentSlug: string }) {
  const treatment = TREATMENTS.find((t) => t.slug === treatmentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [treatmentSlug]);

  useSEO({
    title: treatment
      ? `${treatment.name} Website Design | Aesthetix Systems`
      : "Aesthetics Clinic Website Design | Aesthetix Systems",
    description: treatment
      ? `Bespoke website design for ${treatment.name.toLowerCase()} across the UK. Showcase your ${treatment.shortName} treatments, integrate online booking, and rank on Google. From £1,499.`
      : "Bespoke websites and booking systems for aesthetics clinics across the UK.",
    canonical: treatment ? `/aesthetics-websites/${treatment.slug}` : "/",
  });
  useBreadcrumb(treatment ? [
    { name: "Home", url: "/" },
    { name: "Aesthetics Websites", url: "/aesthetics-websites/london" },
    { name: treatment.name, url: `/aesthetics-websites/${treatment.slug}` },
  ] : [{ name: "Home", url: "/" }]);

  if (!treatment) {
    return (
      <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: BODY, color: inkSoft }}>Page not found.</p>
      </div>
    );
  }

  const faq = [...FAQ_BASE, ...treatment.faqExtra];

  useEffect(() => {
    const id = "page-ld-json";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    });
    return () => { document.getElementById(id)?.remove(); };
  }, [treatmentSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ background: cream, minHeight: "100vh", fontFamily: BODY }}>
      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(247,244,238,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 60,
        }}
      >
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
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: BODY,
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: charcoal,
            background: gold,
            padding: "10px 20px",
            borderRadius: 2,
            textDecoration: "none",
          }}
        >
          Get a Quote
        </a>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>
            Specialist Clinic Web Design · UK
          </p>
          <h1
            style={{
              fontFamily: DISP,
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 400,
              color: charcoal,
              lineHeight: 1.15,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
            }}
          >
            {treatment.heroHeadline}{" "}
            <em style={{ fontStyle: "italic", color: gold }}>{treatment.heroItalic}</em>
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontWeight: 300,
              fontSize: "clamp(15px, 2.5vw, 18px)",
              color: inkSoft,
              lineHeight: 1.7,
              margin: "0 auto 40px",
              maxWidth: 600,
            }}
          >
            {treatment.intro}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: BODY,
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: charcoal,
                background: gold,
                padding: "16px 32px",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Start Your Project
            </a>
            <button
              onClick={() => navigate("/")}
              style={{
                fontFamily: BODY,
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: inkSoft,
                background: "transparent",
                border: `1.5px solid ${line}`,
                padding: "16px 32px",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              View Our Work
            </button>
          </div>
        </FadeIn>
      </section>

      {/* Why It Matters */}
      <section style={{ background: charcoal, padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: DISP,
                fontStyle: "italic",
                fontSize: "clamp(22px, 4vw, 32px)",
                color: gold,
                fontWeight: 400,
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              Why your {treatment.shortName} clinic's website matters more than ever
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {treatment.whyMatters.map((point, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(196,168,130,0.2)",
                    borderRadius: 4,
                    padding: "28px 24px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `1.5px solid ${gold}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Check size={11} color={gold} />
                  </span>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: "rgba(247,244,238,0.85)", lineHeight: 1.65, margin: 0 }}>
                    {point}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Grid */}
      <section style={{ padding: "64px 24px", background: cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>
              Treatments We Feature
            </p>
            <h2
              style={{
                fontFamily: DISP,
                fontSize: "clamp(22px, 4vw, 34px)",
                fontWeight: 400,
                color: charcoal,
                marginBottom: 12,
                letterSpacing: "-0.01em",
              }}
            >
              We build websites for every {treatment.shortName} treatment
            </h2>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
              Each treatment gets its own dedicated page — keyword-optimised, beautifully designed, and built to rank.
            </p>
          </FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {treatment.treatments.map((t, i) => (
              <FadeIn key={t} delay={i * 0.04}>
                <span
                  style={{
                    fontFamily: BODY,
                    fontSize: 13,
                    fontWeight: 400,
                    color: inkSoft,
                    background: goldTint,
                    border: `1px solid ${line}`,
                    borderRadius: 2,
                    padding: "8px 16px",
                    display: "inline-block",
                  }}
                >
                  {t}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "64px 24px", background: "#FDFAF5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: DISP,
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 400,
                color: charcoal,
                textAlign: "center",
                marginBottom: 48,
                letterSpacing: "-0.01em",
              }}
            >
              Everything your {treatment.shortName} clinic needs online
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {CORE_SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div style={{ background: cream, border: `1px solid ${line}`, borderRadius: 4, padding: "28px 24px" }}>
                  <h3 style={{ fontFamily: DISP, fontStyle: "italic", fontWeight: 400, fontSize: 20, color: charcoal, marginBottom: 10 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.65, marginBottom: 18 }}>
                    {s.desc}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.points.map((pt) => (
                      <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Check size={13} color={gold} style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 400, color: inkSoft, lineHeight: 1.5 }}>{pt}</span>
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
      <section style={{ padding: "64px 24px", background: cream }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: DISP,
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 400,
                color: charcoal,
                marginBottom: 16,
                letterSpacing: "-0.01em",
              }}
            >
              Clear pricing, no surprises
            </h2>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.7, marginBottom: 40 }}>
              One-time fee. You own it. No retainers, no platform lock-in.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { label: "Core", price: "£1,499", note: "One-time · from £19.99/mo", popular: false },
              { label: "Premium", price: "£2,499", note: "One-time · from £59.99/mo", popular: true },
              { label: "Custom", price: "£3,000+", note: "One-time · tailored to you", popular: false },
            ].map((tier, i) => (
              <FadeIn key={tier.label} delay={i * 0.1}>
                <div
                  style={{
                    background: i === 2 ? charcoal : "#FDFAF5",
                    border: `1.5px solid ${i === 1 ? gold : i === 2 ? "transparent" : line}`,
                    borderRadius: 4,
                    padding: "28px 20px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  {tier.popular && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: gold, color: charcoal, fontFamily: "Inter Tight, system-ui, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>Most Popular</div>
                  )}
                  <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: i === 2 ? gold : inkMute, marginBottom: 12 }}>
                    {tier.label}
                  </p>
                  <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 32, color: i === 2 ? gold : charcoal, margin: "0 0 8px" }}>
                    {tier.price}
                  </p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: i === 2 ? "rgba(247,244,238,0.5)" : inkMute }}>
                    {tier.note}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 32,
                fontFamily: BODY,
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: charcoal,
                background: gold,
                padding: "16px 36px",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Get a Free Quote
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "64px 24px", background: "#FDFAF5" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: DISP,
                fontStyle: "italic",
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: 400,
                color: charcoal,
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              What clinic owners say
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: cream, border: `1px solid ${line}`, borderRadius: 4, padding: "28px 24px" }}>
                  <p style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 16, color: charcoal, lineHeight: 1.65, marginBottom: 20 }}>
                    "{t.quote}"
                  </p>
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, color: charcoal, marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute }}>{t.clinic}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "64px 24px", background: cream }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: DISP,
                fontSize: "clamp(24px, 4vw, 34px)",
                fontWeight: 400,
                color: charcoal,
                textAlign: "center",
                marginBottom: 40,
                letterSpacing: "-0.01em",
              }}
            >
              Questions about your {treatment.shortName} clinic website
            </h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faq.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div
                  style={{
                    borderTop: `1px solid ${line}`,
                    padding: "24px 0",
                    ...(i === faq.length - 1 ? { borderBottom: `1px solid ${line}` } : {}),
                  }}
                >
                  <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 15, color: charcoal, marginBottom: 10 }}>{item.q}</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: charcoal, textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>
            Ready to get started?
          </p>
          <h2
            style={{
              fontFamily: DISP,
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 400,
              color: cream,
              lineHeight: 1.2,
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Let's build your {treatment.shortName} clinic's{" "}
            <em style={{ fontStyle: "italic", color: gold }}>perfect website.</em>
          </h2>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: "rgba(247,244,238,0.65)", marginBottom: 40 }}>
            Message Sim directly — most projects start within a week.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: BODY,
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: charcoal,
              background: gold,
              padding: "18px 40px",
              borderRadius: 2,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Message on WhatsApp
          </a>
        </FadeIn>
      </section>

      {/* Footer */}
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
