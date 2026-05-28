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

interface CityData {
  slug: string;
  name: string;
  region: string;
  heroHeadline: string;
  heroItalic: string;
  intro: string;
  marketPoints: string[];
  neighbourhoods: string[];
  faqExtra: Array<{ q: string; a: string }>;
}

const CITIES: CityData[] = [
  {
    slug: "london",
    name: "London",
    region: "Greater London",
    heroHeadline: "Bespoke Clinic Websites for",
    heroItalic: "London's Aesthetics Industry",
    intro:
      "London's aesthetics market is one of the most competitive in the world. From Harley Street to Mayfair, Chelsea to Shoreditch — clinics here need a digital presence that commands trust before a patient ever picks up the phone.",
    marketPoints: [
      "Over 4,000 registered aesthetics clinics compete for the same London patient base",
      "London patients research online for an average of 3 weeks before booking a consultation",
      "A premium website is the single biggest trust signal for high-value treatments like Morpheus8, HIFU, and lip filler",
    ],
    neighbourhoods: ["Mayfair", "Chelsea", "Harley Street", "Kensington", "Canary Wharf", "Islington", "Shoreditch", "Fulham"],
    faqExtra: [
      {
        q: "Do you work with London clinics specifically?",
        a: "Absolutely — London is our home market. We've built sites for clinics across Mayfair, Chelsea, Islington and beyond. We know what London patients expect.",
      },
      {
        q: "Can you help us rank in specific London areas like Mayfair or Harley Street?",
        a: "Yes. Every site we build includes location-specific SEO targeting your borough and neighbourhood, so you show up when local patients search.",
      },
    ],
  },
  {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester",
    heroHeadline: "Premium Clinic Websites for",
    heroItalic: "Manchester's Aesthetics Scene",
    intro:
      "Manchester's aesthetics industry has exploded over the past five years. From Spinningfields to Altrincham and Didsbury, clinics across Greater Manchester are investing seriously in their brand — and their websites are leading the charge.",
    marketPoints: [
      "Greater Manchester is one of the UK's fastest-growing aesthetics markets outside London",
      "Manchester patients increasingly book online rather than via phone — your website is your front desk",
      "Clinics in Altrincham and Didsbury command premium prices with the right brand positioning",
    ],
    neighbourhoods: ["Spinningfields", "Altrincham", "Didsbury", "Hale", "Sale", "Prestwich", "Deansgate", "Wilmslow"],
    faqExtra: [
      {
        q: "Do you work with Manchester-based clinics?",
        a: "Yes — we work with clinics across Greater Manchester and the wider North West. Distance isn't a barrier; everything is handled remotely with video calls and fast turnarounds.",
      },
      {
        q: "Will my Manchester clinic rank well on Google?",
        a: "Every website we build includes local SEO foundations — structured data, location pages, and Google Business Profile guidance — so you're visible to patients searching in your area.",
      },
    ],
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    heroHeadline: "Stunning Clinic Websites for",
    heroItalic: "Birmingham Aesthetics Clinics",
    intro:
      "Birmingham is the UK's second city — and its aesthetics market is growing to match. Clinics in Solihull, Edgbaston, and the city centre are raising the bar on patient experience, and it starts with a website that reflects the quality of your treatments.",
    marketPoints: [
      "Birmingham and the West Midlands is home to a rapidly growing private aesthetics sector",
      "City centre and suburban clinics in Solihull and Edgbaston attract discerning, high-value patients",
      "A professionally designed website directly impacts how much patients are willing to spend on premium treatments",
    ],
    neighbourhoods: ["Solihull", "Edgbaston", "Harborne", "Sutton Coldfield", "Moseley", "Four Oaks", "Jewellery Quarter", "Digbeth"],
    faqExtra: [
      {
        q: "Do you work with Birmingham and West Midlands clinics?",
        a: "Yes — we've worked with clinics across the Midlands. Everything is handled remotely, and we're always on WhatsApp or a video call when you need us.",
      },
    ],
  },
  {
    slug: "leeds",
    name: "Leeds",
    region: "West Yorkshire",
    heroHeadline: "Bespoke Websites for",
    heroItalic: "Leeds Aesthetics Clinics",
    intro:
      "Leeds has quietly become one of the North's most sophisticated aesthetics markets. Clinics in Roundhay, Horsforth, and the city centre are seeing high demand for premium treatments — and patients are choosing providers based on their online presence first.",
    marketPoints: [
      "Leeds is one of the fastest-growing cities in the UK with a strong private healthcare culture",
      "Roundhay, Horsforth, and Alwoodley attract some of Yorkshire's highest-spending aesthetics patients",
      "Clinic websites in Leeds that look premium convert significantly better than basic template sites",
    ],
    neighbourhoods: ["Roundhay", "Horsforth", "Alwoodley", "Chapel Allerton", "Headingley", "Wetherby", "Harrogate", "City Centre"],
    faqExtra: [
      {
        q: "Do you work with Leeds and Yorkshire clinics?",
        a: "Absolutely. We work remotely with clinics across Yorkshire and the North — same quality, same speed, same results.",
      },
    ],
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    region: "Merseyside",
    heroHeadline: "Premium Websites for",
    heroItalic: "Liverpool Aesthetics Clinics",
    intro:
      "Liverpool's aesthetics culture is vibrant and growing fast. With a patient base that takes their appearance seriously — and isn't afraid to invest in premium treatments — clinics here need a brand and website that can match that energy.",
    marketPoints: [
      "Liverpool and Merseyside has a thriving aesthetics community with loyal, high-value patients",
      "Liverpool patients are highly active on social media — your website needs to look as good as your Instagram",
      "Clinics on the Wirral and in the city centre are expanding their treatment menus and need sites that reflect that",
    ],
    neighbourhoods: ["Wirral", "Formby", "Woolton", "Allerton", "West Derby", "City Centre", "Crosby", "Southport"],
    faqExtra: [
      {
        q: "Do you serve Liverpool and Merseyside clinics?",
        a: "Yes — we work with clinics all across Merseyside and the North West. All projects are managed remotely with rapid communication.",
      },
    ],
  },
  {
    slug: "bristol",
    name: "Bristol",
    region: "South West England",
    heroHeadline: "Beautiful Websites for",
    heroItalic: "Bristol Aesthetics Clinics",
    intro:
      "Bristol's aesthetic scene is creative, independent, and growing. Patients in Clifton, Redland, and the wider South West are sophisticated — they know good branding, and they expect it from clinics they trust with their face.",
    marketPoints: [
      "Bristol has one of the UK's most design-aware patient bases — aesthetics goes hand in hand with a premium brand",
      "Clifton and Redland clinics attract high-value patients who expect a flawless online experience",
      "The South West's growing population means increasing demand for quality aesthetics providers",
    ],
    neighbourhoods: ["Clifton", "Redland", "Cotham", "Westbury Park", "Henleaze", "Stoke Bishop", "City Centre", "Bath"],
    faqExtra: [
      {
        q: "Do you work with Bristol and South West clinics?",
        a: "Yes — we work remotely with clinics across the South West, including Bath, Cheltenham, and Exeter. Same results, wherever you are.",
      },
    ],
  },
  {
    slug: "edinburgh",
    name: "Edinburgh",
    region: "Scotland",
    heroHeadline: "Bespoke Clinic Websites for",
    heroItalic: "Edinburgh's Aesthetics Market",
    intro:
      "Edinburgh's aesthetics market punches above its weight. The city's affluent patient base — especially in the New Town and Morningside — demands clinical excellence and a brand that communicates it clearly, starting with your website.",
    marketPoints: [
      "Edinburgh has one of Scotland's most established private aesthetics markets with discerning, high-spending patients",
      "New Town and Morningside clinics attract patients who research thoroughly and expect premium presentation",
      "Scotland's growing aesthetics sector means clinics investing in their brand now will lead the market for years",
    ],
    neighbourhoods: ["New Town", "Morningside", "Bruntsfield", "Stockbridge", "Marchmont", "Leith", "Corstorphine", "Glasgow"],
    faqExtra: [
      {
        q: "Do you work with Scottish clinics?",
        a: "Yes — we work with clinics across Scotland, including Edinburgh, Glasgow, Aberdeen, and Inverness. Everything is managed remotely with no compromise on quality.",
      },
    ],
  },
];

const SERVICES = [
  {
    title: "Bespoke Website Design",
    desc: "A hand-crafted site built around your clinic's identity — not a template. Fast, mobile-first, and built to convert.",
    points: ["Custom design, zero templates", "Mobile-first, lightning fast", "Built to convert browsers to bookings"],
  },
  {
    title: "Online Booking Systems",
    desc: "Patients want to book at midnight. We integrate seamlessly with Fresha, Ovatu, Timely, and custom solutions.",
    points: ["Works with Fresha, Ovatu, Timely", "24/7 patient self-booking", "Reduces admin by up to 70%"],
  },
  {
    title: "AI Receptionist",
    desc: "Never miss an enquiry. Your AI receptionist answers questions, collects leads, and books consultations — around the clock.",
    points: ["Available 24/7, never off sick", "Captures enquiries you'd otherwise lose", "Trained on your services and pricing"],
  },
  {
    title: "Ongoing Support & Updates",
    desc: "Your website is a living asset. We offer monthly maintenance plans so it stays fast, secure, and up to date.",
    points: ["Monthly content & image updates", "Security patches & performance", "Priority WhatsApp support"],
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
    a: "Most bespoke clinic websites take 2–4 weeks from brief to launch, depending on the scope. We move fast without cutting corners.",
  },
  {
    q: "What does a website cost?",
    a: "Our bespoke websites start from £999 as a one-time fee, with optional monthly maintenance from £19.99/month. No hidden costs, no recurring platform fees.",
  },
  {
    q: "Do I own my website?",
    a: "Completely. Everything we build is yours — the code, the domain, the hosting. We don't lock you into proprietary platforms.",
  },
  {
    q: "Do you help with Google rankings?",
    a: "Every website we build has SEO foundations built in — proper structure, fast loading, local schema data, and location targeting. We also offer ongoing SEO as an add-on.",
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

export default function CityLanding({ citySlug }: { citySlug: string }) {
  const city = CITIES.find((c) => c.slug === citySlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [citySlug]);

  useSEO({
    title: city
      ? `Aesthetics Clinic Website Design in ${city.name} | Aesthetix Systems`
      : "Aesthetics Clinic Website Design | Aesthetix Systems",
    description: city
      ? `Bespoke websites, booking systems & AI receptionists for aesthetics clinics in ${city.name}. Premium design from £999. Trusted by UK clinics — message us today.`
      : "Bespoke websites and booking systems for aesthetics clinics across the UK.",
    canonical: city ? `/aesthetics-websites/${city.slug}` : "/",
  });

  if (!city) {
    return (
      <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: BODY, color: inkSoft }}>Page not found.</p>
      </div>
    );
  }

  const faq = [...FAQ_BASE, ...city.faqExtra];

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
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
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
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontFamily: BODY,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: gold,
              marginBottom: 20,
            }}
          >
            {city.region} · Aesthetics Clinics
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
            {city.heroHeadline}{" "}
            <em style={{ fontStyle: "italic", color: gold }}>{city.heroItalic}</em>
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
            {city.intro}
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

      {/* Market Context */}
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
              Why {city.name} clinics are investing in better websites
            </h2>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {city.marketPoints.map((point, i) => (
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
                  <p
                    style={{
                      fontFamily: BODY,
                      fontWeight: 300,
                      fontSize: 14,
                      color: "rgba(247,244,238,0.85)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {point}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section style={{ padding: "64px 24px", background: cream }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p
              style={{
                fontFamily: BODY,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: gold,
                marginBottom: 12,
              }}
            >
              Areas We Serve
            </p>
            <h2
              style={{
                fontFamily: DISP,
                fontSize: "clamp(22px, 4vw, 34px)",
                fontWeight: 400,
                color: charcoal,
                marginBottom: 32,
                letterSpacing: "-0.01em",
              }}
            >
              Clinics across {city.name} & beyond
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
              }}
            >
              {city.neighbourhoods.map((n) => (
                <span
                  key={n}
                  style={{
                    fontFamily: BODY,
                    fontSize: 13,
                    fontWeight: 400,
                    color: inkSoft,
                    background: goldTint,
                    border: `1px solid ${line}`,
                    borderRadius: 2,
                    padding: "8px 16px",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "64px 24px", background: "#FDFAF5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontFamily: BODY,
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: gold,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              What We Build
            </p>
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
              Everything your {city.name} clinic needs online
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div
                  style={{
                    background: cream,
                    border: `1px solid ${line}`,
                    borderRadius: 4,
                    padding: "28px 24px",
                    height: "100%",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: DISP,
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: 20,
                      color: charcoal,
                      marginBottom: 10,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: BODY,
                      fontWeight: 300,
                      fontSize: 13,
                      color: inkSoft,
                      lineHeight: 1.65,
                      marginBottom: 18,
                    }}
                  >
                    {s.desc}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.points.map((pt) => (
                      <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Check size={13} color={gold} style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 400, color: inkSoft, lineHeight: 1.5 }}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Strip */}
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
              Transparent pricing for {city.name} clinics
            </h2>
            <p
              style={{
                fontFamily: BODY,
                fontWeight: 300,
                fontSize: 15,
                color: inkSoft,
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              No retainers. No surprise invoices. One clear price for a website that works.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { label: "Essential", price: "from £999", note: "One-time fee · You own it" },
              { label: "Premium", price: "from £1,999", note: "One-time fee · Full feature set" },
              { label: "Premium Plus", price: "from £3,499", note: "One-time fee · AI Receptionist included" },
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
                  <p
                    style={{
                      fontFamily: BODY,
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: i === 2 ? gold : inkMute,
                      marginBottom: 12,
                    }}
                  >
                    {tier.label}
                  </p>
                  <p
                    style={{
                      fontFamily: DISP,
                      fontStyle: "italic",
                      fontSize: 32,
                      color: i === 2 ? gold : charcoal,
                      margin: "0 0 8px",
                    }}
                  >
                    {tier.price}
                  </p>
                  <p
                    style={{
                      fontFamily: BODY,
                      fontWeight: 300,
                      fontSize: 11,
                      color: i === 2 ? "rgba(247,244,238,0.5)" : inkMute,
                    }}
                  >
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
                <div
                  style={{
                    background: cream,
                    border: `1px solid ${line}`,
                    borderRadius: 4,
                    padding: "28px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: DISP,
                      fontStyle: "italic",
                      fontSize: 16,
                      color: charcoal,
                      lineHeight: 1.65,
                      marginBottom: 20,
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 12, color: charcoal, marginBottom: 2 }}>
                    {t.name}
                  </p>
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
              Questions about working with us
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
                  <h3
                    style={{
                      fontFamily: BODY,
                      fontWeight: 500,
                      fontSize: 15,
                      color: charcoal,
                      marginBottom: 10,
                    }}
                  >
                    {item.q}
                  </h3>
                  <p
                    style={{
                      fontFamily: BODY,
                      fontWeight: 300,
                      fontSize: 14,
                      color: inkSoft,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "80px 24px", background: charcoal, textAlign: "center" }}>
        <FadeIn>
          <p
            style={{
              fontFamily: BODY,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: gold,
              marginBottom: 20,
            }}
          >
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
            Let's build your {city.name} clinic's{" "}
            <em style={{ fontStyle: "italic", color: gold }}>digital home.</em>
          </h2>
          <p
            style={{
              fontFamily: BODY,
              fontWeight: 300,
              fontSize: 15,
              color: "rgba(247,244,238,0.65)",
              marginBottom: 40,
            }}
          >
            Message Sim directly on WhatsApp — most projects start within a week.
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
      <footer
        style={{
          background: cream,
          borderTop: `1px solid ${line}`,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginBottom: 8 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: BODY,
              fontWeight: 300,
              fontSize: 11,
              color: inkMute,
            }}
          >
            Home
          </button>
          <a href="/terms" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: "none" }}>
            Terms
          </a>
          <a
            href="/privacy-policy"
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, textDecoration: "none" }}
          >
            Privacy
          </a>
        </div>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, margin: 0 }}>
          © {new Date().getFullYear()} Aesthetix Systems · London, UK
        </p>
      </footer>
    </div>
  );
}
