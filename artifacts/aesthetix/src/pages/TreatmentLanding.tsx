import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

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
    a: "Bespoke clinic websites start from £999 as a one-time fee, with optional monthly maintenance from £19.99/month. No hidden costs.",
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
      ? `Bespoke website design for ${treatment.name.toLowerCase()} across the UK. Showcase your ${treatment.shortName} treatments, integrate online booking, and rank on Google. From £999.`
      : "Bespoke websites and booking systems for aesthetics clinics across the UK.",
    canonical: treatment ? `/aesthetics-websites/${treatment.slug}` : "/",
  });

  if (!treatment) {
    return (
      <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: BODY, color: inkSoft }}>Page not found.</p>
      </div>
    );
  }

  const faq = [...FAQ_BASE, ...treatment.faqExtra];

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
          <span style={{ fontFamily: DISP, fontStyle: "italic", fontSize: 18, color: charcoal, letterSpacing: "-0.01em" }}>
            Aesthetix<span style={{ color: gold }}> Systems</span>
          </span>
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
              { label: "Essential", price: "from £999", note: "One-time · You own it" },
              { label: "Premium", price: "from £1,999", note: "One-time · Full feature set" },
              { label: "Premium Plus", price: "from £3,499", note: "One-time · AI Receptionist included" },
            ].map((tier, i) => (
              <FadeIn key={tier.label} delay={i * 0.1}>
                <div
                  style={{
                    background: i === 2 ? charcoal : "#FDFAF5",
                    border: `1px solid ${i === 2 ? "transparent" : line}`,
                    borderRadius: 4,
                    padding: "28px 20px",
                    textAlign: "center",
                  }}
                >
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
      <footer style={{ background: cream, borderTop: `1px solid ${line}`, padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginBottom: 8 }}>
          <button
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute }}
          >
            Home
          </button>
          <a href="/terms" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: "none" }}>Terms</a>
          <a href="/privacy-policy" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: "none" }}>Privacy</a>
        </div>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, margin: 0 }}>
          © {new Date().getFullYear()} Aesthetix Systems · London, UK
        </p>
      </footer>
    </div>
  );
}
