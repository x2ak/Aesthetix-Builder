import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, MessageCircle, Menu, X, ChevronDown, Smartphone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ─── Design Tokens ─── */
const cream = '#F7F4EE';
const surface = '#FFFFFF';
const charcoal = '#1A1A1C';
const charcoalSoft = '#2E2E32';
const inkSoft = '#4A4A4E';
const inkMute = '#8A8A8E';
const line = '#E5DFD3';
const gold = '#C9A961';
const goldHover = '#A8894A';
const goldTint = '#F5EDD9';
const sage = '#6B8E5A';
const blush = '#E8D5D2';
const DISP = "'Instrument Serif', Georgia, serif";
const BODY = "'Inter Tight', system-ui, sans-serif";
const WA = "https://wa.me/447495963388?text=Hi%20Sim%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20clinic!";

/* ─── Fade In on Scroll ─── */
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

/* ─── WhatsApp Button ─── */
function WaBtn({ large = false, outlined = false, light = false, label = "Message on WhatsApp" }: {
  large?: boolean; outlined?: boolean; light?: boolean; label?: string;
}) {
  const cls = outlined ? 'wa-btn wa-outlined' : light ? 'wa-btn wa-light' : 'wa-btn wa-default';
  return (
    <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
      <a href={WA} target="_blank" rel="noopener noreferrer" className={`${cls}${large ? ' wa-large' : ''}`}>
        <FaWhatsapp size={large ? 16 : 14} color={gold} />
        {label}
      </a>
    </motion.span>
  );
}

/* ─── Overline Label ─── */
function Overline({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: gold, marginBottom: 16, textAlign: centered ? 'center' : 'left' }}>
      {children}
    </p>
  );
}

/* ─── Section Headline ─── */
function SectionHead({ regular, italic, size = 'clamp(2.5rem,5vw,4rem)', light = false, centered = false }: {
  regular: string; italic: string; size?: string; light?: boolean; centered?: boolean;
}) {
  return (
    <h2 style={{ fontFamily: BODY, fontWeight: 600, fontSize: size, lineHeight: 1.05, color: light ? cream : charcoal, margin: 0, textAlign: centered ? 'center' : 'left' }}>
      {regular}{' '}
      <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold, display: 'block', lineHeight: 1.1 }}>{italic}</em>
    </h2>
  );
}

/* ─── Phone Booking Animation ─── */
const STEP_DUR = [2200, 2000, 2600, 2000, 1600];

const PHONE_URLS: Record<number, string> = {
  0: 'lumina-aesthetics.co.uk',
  1: 'lumina-aesthetics.co.uk/book',
  2: 'lumina-aesthetics.co.uk/book',
  3: 'lumina-aesthetics.co.uk/confirmed',
  4: 'lumina-aesthetics.co.uk/confirmed',
};

function PhoneBrowserBar({ url }: { url: string }) {
  return (
    <div style={{ background: '#EFEBE3', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: `1px solid ${line}` }}>
      <svg width="7" height="9" viewBox="0 0 7 9" fill="none" style={{ flexShrink: 0 }}>
        <rect x="0.5" y="2.5" width="6" height="6" rx="1.2" stroke={inkMute} strokeWidth="0.8" fill="none" />
        <path d="M1.8 2.5V1.8a1.7 1.7 0 0 1 3.4 0v.7" stroke={inkMute} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      </svg>
      <div style={{ flex: 1, background: '#F7F4EE', borderRadius: 50, padding: '2.5px 8px', border: `1px solid ${line}` }}>
        <span style={{ fontFamily: BODY, fontSize: 7, color: inkMute, letterSpacing: 0 }}>{url}</span>
      </div>
    </div>
  );
}

function PhoneAnimation() {
  const isMobile = useIsMobile();
  const PW = isMobile ? 190 : 264;
  const PH = isMobile ? 382 : 530;
  const PR = isMobile ? 30 : 40;
  const PP = isMobile ? 9 : 12;
  const [step, setStep] = useState(0);
  const [svcSel, setSvcSel] = useState(false);
  const [calDate, setCalDate] = useState(-1);
  const [calTime, setCalTime] = useState(-1);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const advance = (cur: number) => {
      if (cur === 1) { setSvcSel(false); setTimeout(() => setSvcSel(true), 1000); }
      if (cur === 2) { setCalDate(-1); setCalTime(-1); setTimeout(() => setCalDate(16), 900); setTimeout(() => setCalTime(1), 1900); }
      t = setTimeout(() => { const nx = (cur + 1) % 5; setStep(nx); advance(nx); }, STEP_DUR[cur]);
    };
    advance(0);
    return () => clearTimeout(t);
  }, []);

  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const avail = [3, 7, 9, 12, 14, 16, 18, 21, 23];

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Gold glow */}
      <div style={{ position: 'absolute', width: isMobile ? 260 : 340, height: isMobile ? 260 : 340, background: 'radial-gradient(ellipse at center, rgba(201,169,97,0.13) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: PW, height: PH, background: charcoal, borderRadius: PR, padding: PP, boxShadow: `0 0 0 1.5px rgba(201,169,97,0.28), 0 36px 72px rgba(26,26,28,0.28)`, position: 'relative' }}
      >
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: isMobile ? 60 : 80, height: isMobile ? 20 : 26, background: charcoal, borderRadius: '0 0 14px 14px', zIndex: 10 }} />

        {/* Screen */}
        <div style={{ width: '100%', height: '100%', background: cream, borderRadius: 30, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>

          {/* Browser URL bar — always visible, URL changes per step */}
          <PhoneBrowserBar url={PHONE_URLS[step]} />

          {/* Page content */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">

              {/* ── Step 0: Clinic website hero ── */}
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', inset: 0, background: cream, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                  {/* Top nav */}
                  <div style={{ height: 28, padding: '0 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${line}`, flexShrink: 0 }}>
                    <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 8, letterSpacing: '0.15em', color: charcoal }}>LUMINA</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                      {['a','b','c'].map(k => <div key={k} style={{ width: 11, height: 1, background: charcoal, borderRadius: 1 }} />)}
                    </div>
                  </div>

                  {/* Hero image area */}
                  <div style={{ height: 84, position: 'relative', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg, #2A1F18 0%, #1A1A1C 50%, #3A2820 100%)' }}>
                    {/* Botanical SVG */}
                    <svg width="60" height="50" viewBox="0 0 60 50" fill="none" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.4, pointerEvents: 'none' }}>
                      <path d="M55 2 C40 8, 30 20, 45 35" stroke={gold} strokeWidth="0.5" fill="none" />
                      <path d="M60 10 C50 15, 45 25, 55 38" stroke={gold} strokeWidth="0.4" fill="none" />
                      <path d="M50 0 C35 12, 38 28, 48 40" stroke={gold} strokeWidth="0.3" fill="none" />
                      <circle cx="45" cy="35" r="1" fill={gold} opacity="0.5" />
                      <circle cx="55" cy="38" r="0.8" fill={gold} opacity="0.4" />
                    </svg>
                    {/* Text over image */}
                    <div style={{ padding: '10px 12px' }}>
                      <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 6, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,244,238,0.6)', margin: '0 0 4px' }}>Lumina Aesthetics</p>
                      <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 18, color: cream, margin: 0, lineHeight: 1.0 }}>Your Skin.</p>
                      <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 18, color: gold, margin: 0, lineHeight: 1.0 }}>Flawless.</p>
                    </div>
                  </div>

                  {/* Body section */}
                  <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Subtext */}
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 8, color: inkMute, lineHeight: 1.4, margin: '0 0 10px' }}>
                      Advanced aesthetics clinic<br />Mayfair, London
                    </p>

                    {/* BOOK NOW button */}
                    <motion.div
                      animate={{ scale: [1, 1, 0.95, 1] }}
                      transition={{ delay: 1.2, duration: 0.25, times: [0, 0.5, 0.7, 1] }}
                      style={{ width: '100%', background: gold, borderRadius: 4, padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 9, color: charcoal, letterSpacing: '0.15em', textTransform: 'uppercase' }}>BOOK NOW</span>
                    </motion.div>

                    {/* Trust pills */}
                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                      {['★ 4.9 rated', 'Mayfair, W1'].map(label => (
                        <div key={label} style={{ background: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.2)', borderRadius: 999, padding: '2px 7px' }}>
                          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7, color: inkMute }}>{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: line, margin: '8px 0' }} />

                    {/* Treatments row */}
                    <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 6, letterSpacing: '0.15em', textTransform: 'uppercase', color: inkMute, margin: '0 0 5px' }}>Treatments</p>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {['Russian Lips', 'Lip Filler', 'Anti-Wrinkle'].map(t => (
                        <div key={t} style={{ background: surface, border: `1px solid ${line}`, borderRadius: 4, padding: '4px 7px' }}>
                          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7, color: charcoal }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animated cursor */}
                  <motion.div
                    initial={{ x: 190, y: 320, opacity: 0 }}
                    animate={{ x: [190, 120, 120], y: [320, 218, 218], opacity: [0, 1, 1, 0] }}
                    transition={{ delay: 0.4, duration: 1.0, times: [0, 0.35, 0.82, 1] }}
                    style={{ position: 'absolute', pointerEvents: 'none', zIndex: 20 }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12">
                      <polygon points="1,1 1,10 4,7.5 6,11 7.5,10.3 5.5,6.8 9,6.5" fill={charcoal} stroke={surface} strokeWidth="0.5" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* ── Step 1: Treatment picker ── */}
              {step === 1 && (
                <motion.div key="s1" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.35 }}
                  style={{ position: 'absolute', inset: 0, background: cream, padding: '14px 14px 14px' }}>

                  <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 16, color: charcoal, margin: '0 0 12px', lineHeight: 1.2 }}>Choose Your Treatment</p>

                  {[
                    { name: 'Russian Lips', price: '£95' },
                    { name: 'Lip Filler', price: '£75' },
                    { name: 'Microneedling', price: '£110' },
                    { name: 'Tear Trough', price: '£130' },
                  ].map((s, i) => (
                    <motion.div key={s.name} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      style={{ padding: '9px 10px', marginBottom: 6, borderRadius: 7, border: `1px solid ${i === 0 && svcSel ? gold : line}`, background: i === 0 && svcSel ? goldTint : surface, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }}>
                      <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 10.5, color: i === 0 && svcSel ? goldHover : inkSoft, fontWeight: 400 }}>{s.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: BODY, fontSize: 9, color: gold, fontWeight: 500 }}>{s.price}</span>
                        {i === 0 && svcSel && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                            style={{ width: 13, height: 13, background: gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={7} color={charcoal} />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* ── Step 2: Calendar ── */}
              {step === 2 && (
                <motion.div key="s2" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.35 }}
                  style={{ position: 'absolute', inset: 0, background: cream, padding: '14px 14px 14px' }}>

                  <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 16, color: charcoal, margin: '0 0 2px', lineHeight: 1.2 }}>Pick a Date</p>

                  {/* Month header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontFamily: BODY, fontSize: 8, color: inkMute }}>‹</span>
                    <span style={{ fontFamily: BODY, fontSize: 9, color: charcoal, fontWeight: 500 }}>May 2025</span>
                    <span style={{ fontFamily: BODY, fontSize: 8, color: inkMute }}>›</span>
                  </div>

                  {/* Day headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 3 }}>
                    {DAYS.map((d, i) => <div key={i} style={{ textAlign: 'center', fontFamily: BODY, fontSize: 7, color: gold, fontWeight: 500 }}>{d}</div>)}
                  </div>

                  {/* Date grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
                    {[null, null].map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: 25 }, (_, i) => i + 1).map(d => {
                      const isSel = calDate === d;
                      const isAv = avail.includes(d);
                      return (
                        <motion.div key={d} animate={isSel ? { scale: [1, 0.82, 1] } : {}} transition={{ duration: 0.22 }}
                          style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: isSel ? gold : isAv ? goldTint : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: BODY, fontSize: 7, color: isSel ? charcoal : isAv ? goldHover : inkMute, fontWeight: isSel ? 600 : 300 }}>{d}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Time slots */}
                  <AnimatePresence>
                    {calDate > 0 && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 10 }}>
                        <p style={{ fontFamily: BODY, fontSize: 8, color: inkMute, margin: '0 0 5px' }}>Available times</p>
                        <div style={{ display: 'flex', gap: 5 }}>
                          {['10:00', '13:00', '15:30'].map((t, i) => {
                            const sel = calTime === 1 && i === 1;
                            return (
                              <motion.div key={t} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                style={{ padding: '5px 8px', borderRadius: 6, border: `1px solid ${sel ? gold : line}`, background: sel ? gold : surface, fontFamily: BODY, fontSize: 9, color: sel ? charcoal : inkSoft, fontWeight: sel ? 600 : 300, transition: 'all 0.3s' }}>
                                {t}
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ── Step 3: Confirmation page ── */}
              {step === 3 && (
                <motion.div key="s3" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', inset: 0, background: cream, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>

                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15, stiffness: 260, damping: 20 }}
                    style={{ width: 48, height: 48, background: sage, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Check size={22} color={surface} strokeWidth={2.5} />
                  </motion.div>

                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 16, color: charcoal, textAlign: 'center', margin: '0 0 14px', lineHeight: 1.2 }}>
                    Booking Confirmed!
                  </motion.p>

                  {/* Details card */}
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    style={{ width: '100%', background: surface, borderRadius: 10, padding: '12px 14px', border: `1px solid ${line}` }}>
                    {[
                      { t: 'Sarah M', w: 500, s: 11, c: charcoal, mb: 4 },
                      { t: 'Russian Lips', w: 300, s: 10, c: gold, mb: 6 },
                      { t: 'Friday 16 May · 1:00 PM', w: 300, s: 9, c: inkMute, mb: 3 },
                      { t: 'Lumina Aesthetics · London', w: 300, s: 8.5, c: inkMute, mb: 0 },
                    ].map((row, i) => (
                      <motion.p key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                        style={{ fontFamily: BODY, fontWeight: row.w, fontSize: row.s, color: row.c, marginBottom: row.mb, margin: `0 0 ${row.mb}px` }}>
                        {row.t}
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* ── Step 4: Notification toast ── */}
              {step === 4 && (
                <motion.div key="s4" style={{ position: 'absolute', inset: 0, background: cream }}>
                  {/* Faded confirmation behind */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, opacity: 0.22 }}>
                    <div style={{ width: 48, height: 48, background: sage, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                      <Check size={22} color={surface} strokeWidth={2.5} />
                    </div>
                    <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 16, color: charcoal, textAlign: 'center', margin: 0 }}>Booking Confirmed!</p>
                  </div>

                  {/* Toast sliding down */}
                  <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 12, opacity: 1 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'absolute', top: 0, left: 10, right: 10, background: surface, borderRadius: 14, padding: '11px 14px', boxShadow: '0 6px 28px rgba(26,26,28,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                      <MessageCircle size={13} color={gold} />
                      <Mail size={13} color={gold} />
                    </div>
                    <div>
                      <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, color: charcoal, margin: '0 0 1px' }}>Booking confirmed ✓</p>
                      <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: inkMute, margin: 0 }}>SMS + Email sent to Sarah</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Browser Illustration ─── */
function BrowserIllust() {
  const [f, setF] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % 4; setF(i); }, 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ width: '100%', maxWidth: 210, height: 112, margin: '0 auto' }}>
      <div style={{ border: `1px solid ${line}`, borderRadius: 8, overflow: 'hidden', height: '100%', background: surface }}>
        <div style={{ background: '#F2F2F2', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4, borderBottom: `1px solid ${line}` }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {['#FF5F57', '#FFBD2E', '#28C840'].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ flex: 1, background: '#E8E8E8', borderRadius: 3, padding: '2px 8px', marginLeft: 4 }}>
            <span style={{ fontFamily: BODY, fontSize: 7, color: inkMute }}>yourclinic.co.uk</span>
          </div>
        </div>
        <div style={{ padding: 12 }}>
          <motion.div animate={{ opacity: f > 0 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ width: '60%', height: 5, background: charcoal, borderRadius: 2, marginBottom: 7 }} />
          <motion.div animate={{ opacity: f > 1 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ width: '85%', height: 3, background: line, borderRadius: 2, marginBottom: 4 }} />
          <motion.div animate={{ opacity: f > 1 ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.1 }} style={{ width: '70%', height: 3, background: line, borderRadius: 2, marginBottom: 12 }} />
          <motion.div animate={{ opacity: f > 2 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ width: 52, height: 20, background: gold, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: BODY, fontSize: 7, color: charcoal, fontWeight: 600 }}>BOOK NOW</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Calendar Illustration ─── */
function CalIllust() {
  const [filled, setFilled] = useState(0);
  const [full, setFull] = useState(false);
  const goldDays = [4, 7, 11, 15];
  useEffect(() => {
    const go = () => {
      let i = 0;
      const fill = () => {
        if (i < goldDays.length) { i++; setFilled(i); setTimeout(fill, 650); }
        else { setFull(true); setTimeout(() => { setFull(false); setFilled(0); i = 0; setTimeout(fill, 400); }, 1200); }
      };
      fill();
    };
    const t = setTimeout(go, 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ width: '100%', maxWidth: 210, height: 112, margin: '0 auto' }}>
      <div style={{ border: `1px solid ${line}`, borderRadius: 8, padding: 10, height: '100%', background: surface, position: 'relative' }}>
        <p style={{ fontFamily: BODY, fontSize: 8, fontWeight: 500, color: charcoal, margin: '0 0 7px' }}>May 2025</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
          {Array.from({ length: 21 }, (_, i) => {
            const d = i + 1;
            const gi = goldDays.indexOf(d);
            const isG = gi !== -1 && gi < filled;
            return (
              <motion.div key={d} animate={{ background: isG ? gold : goldTint }} transition={{ duration: 0.3 }}
                style={{ aspectRatio: '1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: BODY, fontSize: 6, color: isG ? charcoal : inkMute }}>{d}</span>
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence>
          {full && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: charcoal, color: cream, borderRadius: 6, padding: '4px 10px', fontFamily: BODY, fontSize: 9, fontWeight: 500 }}>
              CALENDAR FULL ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Email Notification Illustration ─── */
const INBOX = [
  { from: 'FlawlessSkin Bookings', subj: 'New booking: Sarah M', time: '2:14 PM' },
  { from: 'FlawlessSkin Bookings', subj: 'New booking: Jade T', time: '3:02 PM' },
  { from: 'FlawlessSkin Bookings', subj: 'New booking: Amy R', time: '4:47 PM' },
];
function NotifIllust() {
  const [visible, setVisible] = useState<number[]>([]);
  useEffect(() => {
    let i = 0;
    const add = () => {
      if (i < INBOX.length) { setVisible(v => [...v, i]); i++; setTimeout(add, 1000); }
      else { setTimeout(() => { setVisible([]); i = 0; setTimeout(add, 600); }, 1400); }
    };
    const t = setTimeout(add, 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ width: '100%', maxWidth: 210, height: 112, margin: '0 auto' }}>
      <div style={{ border: `1px solid ${line}`, borderRadius: 8, height: '100%', background: surface, overflow: 'hidden' }}>
        {/* Email app header */}
        <div style={{ background: '#F5F5F5', padding: '5px 10px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Mail size={9} color={gold} />
          <span style={{ fontFamily: BODY, fontSize: 7.5, fontWeight: 500, color: charcoal }}>Inbox</span>
          <span style={{ marginLeft: 'auto', background: gold, color: charcoal, borderRadius: 8, padding: '1px 5px', fontFamily: BODY, fontSize: 6.5, fontWeight: 600 }}>{visible.length}</span>
        </div>
        {/* Email rows */}
        <div style={{ overflow: 'hidden' }}>
          <AnimatePresence>
            {visible.filter(idx => idx < INBOX.length).map(idx => (
              <motion.div key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ padding: '6px 10px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 7, background: idx === visible[visible.length - 1] ? goldTint : surface }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: BODY, fontSize: 7, fontWeight: 600, color: charcoal }}>F</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: BODY, fontSize: 7.5, fontWeight: 500, color: charcoal, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{INBOX[idx].subj}</p>
                  <p style={{ fontFamily: BODY, fontSize: 6.5, fontWeight: 300, color: inkMute, margin: 0 }}>{INBOX[idx].from}</p>
                </div>
                <span style={{ fontFamily: BODY, fontSize: 6.5, color: inkMute, flexShrink: 0 }}>{INBOX[idx].time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Calendar Bento Animation ─── */
function CalBento() {
  const [booked, setBooked] = useState(0);
  const goldDates = [5, 9, 14, 18];
  const dates = Array.from({ length: 21 }, (_, i) => i + 2);
  useEffect(() => {
    const t = setInterval(() => setBooked(b => b >= goldDates.length ? 0 : b + 1), 850);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ marginTop: 20 }}>
      <p style={{ fontFamily: BODY, fontSize: 9, color: inkMute, margin: '0 0 8px', letterSpacing: '0.1em' }}>JUNE 2025</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
        {dates.map(d => {
          const gi = goldDates.indexOf(d);
          const isB = gi !== -1 && gi < booked;
          return (
            <motion.div key={d} animate={{ background: isB ? gold : goldTint }} transition={{ duration: 0.35 }}
              style={{ aspectRatio: '1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: BODY, fontSize: 8, color: isB ? charcoal : inkMute }}>{d}</span>
            </motion.div>
          );
        })}
      </div>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
        <motion.span key={booked} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: charcoal }}>
          {booked} slot{booked !== 1 ? 's' : ''} booked
        </motion.span>
        <span style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>this week</span>
      </div>
    </div>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [{ l: 'Work', h: '#work' }, { l: 'Services', h: '#services' }, { l: 'Pricing', h: '#pricing' }, { l: 'Results', h: '#results' }];
  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: scrolled ? 'rgba(247,244,238,0.92)' : 'rgba(247,244,238,0.75)', backdropFilter: `blur(${scrolled ? 18 : 8}px)`, borderBottom: `1px solid ${scrolled ? line : 'transparent'}`, transition: 'all 0.3s ease' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
              <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M20.5 21 Q24 17 22.5 13" stroke={gold} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
            </svg>
            <div>
              <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 14, color: charcoal, letterSpacing: '0.15em', margin: 0, lineHeight: 1 }}>AESTHETIX</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: gold, letterSpacing: '0.22em', margin: 0, lineHeight: 1.5 }}>SYSTEMS</p>
            </div>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
            {links.map(l => (
              <a key={l.l} href={l.h} className="nav-gold-link" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, letterSpacing: '0.05em', textDecoration: 'none', transition: 'color 0.2s' }}>{l.l}</a>
            ))}
            <WaBtn />
          </div>
          <button onClick={() => setOpen(true)} className="show-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Menu size={22} color={charcoal} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: charcoal, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 22, right: 24, background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color={cream} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              {links.map((l, i) => (
                <motion.a key={l.l} href={l.h} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ fontFamily: BODY, fontWeight: 300, fontSize: 30, color: cream, letterSpacing: '0.08em', textDecoration: 'none' }}>
                  {l.l}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
                <WaBtn large />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero ─── */
function Hero() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: cream, padding: isMobile ? '40px 24px 48px' : '120px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
        {/* Left — Copy */}
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 0, background: goldTint, border: `1px solid rgba(201,169,97,0.3)`, borderRadius: 999, padding: isMobile ? '5px 12px' : '6px 14px', marginBottom: isMobile ? 22 : 28 }}>
            <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: isMobile ? 9 : 10, textTransform: 'uppercase', letterSpacing: isMobile ? '0.12em' : '0.18em', color: gold }}>
              {isMobile ? 'Websites & Booking Systems · UK' : 'Websites & Booking Systems · For UK Aesthetics Clinics'}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ fontFamily: BODY, fontWeight: 600, fontSize: isMobile ? 'clamp(2.2rem, 8vw, 2.8rem)' : 'clamp(3rem,6vw,5rem)', lineHeight: 1.08, color: charcoal, margin: isMobile ? '0 0 20px' : '0 0 20px' }}>
            Turn followers into{' '}
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold, display: isMobile ? 'inline' : 'block', lineHeight: 1.1 }}>bookings</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.55 }}
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 15 : 17, color: inkSoft, lineHeight: 1.78, maxWidth: 480, margin: isMobile ? '0 0 28px' : '0 0 32px' }}>
            We build premium websites with built-in booking systems for aesthetics clinics, lash techs, and beauty specialists. Look luxury. Book clients 24/7. Stop chasing DMs.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.72 }}
            style={{ display: 'flex', gap: isMobile ? 12 : 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: isMobile ? 24 : 28 }}>
            <WaBtn large />
            <a href="#work" className="gold-underline" style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 13 : 13, color: charcoal, textDecoration: 'none', letterSpacing: '0.02em' }}>
              See recent work →
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65, delay: 0.9 }}
            style={{ paddingTop: isMobile ? 20 : 20, borderTop: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 10, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 11 : 11, color: inkMute }}>Trusted by</span>
            {['FlawlessSkin', 'Hira Aesthetics', 'Permadoll'].map(n => (
              <span key={n} style={{ background: goldTint, padding: isMobile ? '3px 10px' : '3px 10px', borderRadius: 999, fontFamily: BODY, fontWeight: 400, fontSize: isMobile ? 11 : 11, color: goldHover }}>{n}</span>
            ))}
            {!isMobile && <span style={{ width: 1, height: 14, background: line, margin: '0 2px' }} />}
            {!isMobile && <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute }}>Based in London, UK</span>}
          </motion.div>
        </div>
        {/* Right — Phone */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneAnimation />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Problem Strip ─── */
function ProblemStrip() {
  const isMobile = useIsMobile();
  const stats = [
    { n: '73%', s: 'of beauty clients book outside 9–5. Your DMs aren\'t open at midnight.' },
    { n: '4+ hrs', s: 'lost every week by the average clinic managing bookings manually.' },
    { n: 'Gone.', s: 'Clients who can\'t book instantly go to a competitor who lets them.' },
  ];
  return (
    <section style={{ background: charcoal, padding: '52px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 0 : 0 }}>
        {stats.map((st, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div style={{ textAlign: 'center', padding: isMobile ? '28px 0' : '0 40px', borderBottom: isMobile && i < 2 ? `1px solid rgba(201,169,97,0.15)` : 'none', borderRight: !isMobile && i < 2 ? `1px solid rgba(201,169,97,0.18)` : 'none' }}>
              <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: '2.8rem', color: gold, lineHeight: 1, margin: 0 }}>{st.n}</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: 'rgba(247,244,238,0.65)', lineHeight: 1.65, marginTop: 10, maxWidth: 220, marginLeft: 'auto', marginRight: 'auto' }}>{st.s}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const isMobile = useIsMobile();
  const cards = [
    { n: '01', title: 'We design your site', body: 'A bespoke, luxury website built around your brand. No templates. No compromises. Designed to convert visitors into bookings.', Illust: BrowserIllust },
    { n: '02', title: 'We build your calendar in', body: 'Your own booking calendar — live on your site. No Fresha. No Booksy. No third-party fees. Just your brand, your clients, your bookings.', Illust: CalIllust },
    { n: '03', title: 'You get bookings 24/7', body: 'Clients book while you sleep. You wake up to a full calendar. No chasing. No confusion. Just pure, automated revenue.', Illust: NotifIllust },
  ];
  return (
    <section id="services" style={{ background: cream, padding: isMobile ? '64px 20px' : '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px' }}>
        <FadeIn><Overline>How It Works</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ marginBottom: 56 }}><SectionHead regular="From DMs to" italic="dashboards" /></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 24 }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="hiw-card" style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: 32, height: '100%' }}>
                <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: '3.5rem', color: gold, opacity: 0.38, lineHeight: 1, margin: 0 }}>{c.n}</p>
                <div style={{ margin: '16px 0' }}><c.Illust /></div>
                <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 17, color: charcoal, margin: '0 0 10px' }}>{c.title}</h3>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, lineHeight: 1.72, margin: 0 }}>{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio ─── */
function Portfolio() {
  const isMobile = useIsMobile();
  const clients = [
    { name: 'FlawlessSkin', loc: 'Hall Green, Birmingham', url: 'https://flawless-skin.co.uk', grad: `linear-gradient(135deg, ${goldTint}, ${blush})` },
    { name: 'Hira Aesthetics', loc: 'Bury, Manchester', url: 'https://hiraaesthetics.com', grad: `linear-gradient(135deg, ${blush}, ${goldTint})` },
    { name: 'Permadoll Aesthetics', loc: 'Birmingham', url: 'https://permadoll-aesthetics.co.uk', grad: `linear-gradient(135deg, ${goldTint}, #e8e0d8)` },
  ];
  return (
    <section id="work" style={{ background: cream, padding: isMobile ? '64px 20px' : '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px' }}>
        <FadeIn><Overline>Recent Builds</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ marginBottom: 56 }}><SectionHead regular="Websites that" italic="book themselves" /></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 24 }}>
          {clients.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="portfolio-card" style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ aspectRatio: '16/10', background: c.grad, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="portfolio-img" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 18, color: 'rgba(26,26,28,0.2)' }}>{c.name}</span>
                  </div>
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <h3 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 21, color: charcoal, margin: '0 0 5px' }}>{c.name}</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: gold, margin: '0 0 14px' }}>{c.loc}</p>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="gold-underline portfolio-arrow"
                    style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: charcoal, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    View site →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bento Grid ─── */
function Bento() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: cream, padding: isMobile ? '64px 20px' : '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px' }}>
        <FadeIn><Overline>What's Included</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ marginBottom: 48 }}><SectionHead regular="Everything your clinic" italic="actually needs" /></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 16 }}>
          {/* Card 1 — Large, spans 2 rows */}
          <FadeIn delay={0.1}>
            <div style={{ background: cream, border: `1px solid rgba(201,169,97,0.28)`, borderLeft: `3px solid ${gold}`, borderRadius: 14, padding: 36, gridRow: isMobile ? 'auto' : 'span 2', height: '100%' }}>
              <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 20, color: charcoal, lineHeight: 1.35, margin: '0 0 14px' }}>Your own booking system.<br />Your brand. Zero middlemen.</h3>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, lineHeight: 1.78, margin: 0 }}>
                No Fresha. No Booksy. No monthly fees to third-party platforms eating into your revenue. Your clients book directly on your site — your calendar, your rules.
              </p>
              <CalBento />
            </div>
          </FadeIn>
          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Card 2 */}
            <FadeIn delay={0.15}>
              <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: 28, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 80, background: charcoal, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={20} color={gold} />
                </div>
                <div>
                  <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 16, color: charcoal, margin: '0 0 8px' }}>Instagram & TikTok ready</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.68, margin: 0 }}>Optimised for mobile where your clients actually find you. Loads in under 2 seconds.</p>
                </div>
              </div>
            </FadeIn>
            {/* Card 3 */}
            <FadeIn delay={0.2}>
              <div style={{ background: blush, borderRadius: 14, padding: 28 }}>
                <div style={{ background: charcoal, borderRadius: '12px 12px 12px 4px', padding: '12px 14px', marginBottom: 10 }}>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: cream, margin: 0, lineHeight: 1.6 }}>Hi Sarah 💋 Your Russian Lips appointment is confirmed for Fri 16 May at 2pm. See you then! — FlawlessSkin</p>
                </div>
                <div style={{ background: surface, borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={12} color={inkMute} />
                  <div>
                    <p style={{ fontFamily: BODY, fontSize: 10, fontWeight: 500, color: charcoal, margin: 0 }}>Your booking — confirmed ✓</p>
                    <p style={{ fontFamily: BODY, fontSize: 9, fontWeight: 300, color: inkMute, margin: 0 }}>Hi Sarah, we look forward to...</p>
                  </div>
                  <span style={{ marginLeft: 'auto', background: sage, color: surface, borderRadius: 4, padding: '2px 6px', fontFamily: BODY, fontSize: 8, fontWeight: 500 }}>Delivered</span>
                </div>
                <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 15, color: charcoal, margin: '14px 0 6px' }}>Automatic SMS + email confirmations</h3>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.68, margin: 0 }}>Every booking triggers instant confirmations. Zero admin. Zero no-shows chasing.</p>
              </div>
            </FadeIn>
            {/* Card 4 */}
            <FadeIn delay={0.25}>
              <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: 28 }}>
                <div style={{ marginBottom: 14 }}>
                  {[
                    { t: 'Hi! How much is Russian Lips?', from: 'client' },
                    { t: 'Hi! Russian Lips is £95 for 1ml 💋 Want to book?', from: 'clinic' },
                    { t: 'Yes please!', from: 'client' },
                  ].map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'clinic' ? 'flex-end' : 'flex-start', marginBottom: 5 }}>
                      <div style={{ background: msg.from === 'clinic' ? gold : goldTint, borderRadius: msg.from === 'clinic' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', padding: '7px 10px', maxWidth: '80%' }}>
                        <p style={{ fontFamily: BODY, fontSize: 10, color: msg.from === 'clinic' ? charcoal : inkSoft, margin: 0, fontWeight: 300 }}>{msg.t}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 15, color: charcoal, margin: '0 0 6px' }}>AI assistant that actually books</h3>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.68, margin: 0 }}>Answers treatment questions and converts enquiries into bookings. 24/7. Automatically.</p>
              </div>
            </FadeIn>
          </div>
          {/* Card 5 — Full width */}
          <FadeIn delay={0.3} style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
            <div style={{ background: charcoal, borderRadius: 14, padding: 36, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32, alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 20, color: cream, margin: '0 0 14px', lineHeight: 1.35 }}>Deposits & no-show protection</h3>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: 'rgba(247,244,238,0.6)', lineHeight: 1.78, margin: 0, maxWidth: 380 }}>
                  Collect a 50% deposit at booking, automatically. No more last-minute cancellations. No more lost revenue. Stripe-powered, bank-grade secure.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
                <div style={{ background: charcoalSoft, borderRadius: 14, padding: '20px 28px', minWidth: 200, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, right: 14, display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span style={{ background: sage, color: surface, fontFamily: BODY, fontSize: 8, fontWeight: 500, borderRadius: 4, padding: '2px 7px' }}>DEPOSIT SECURED</span>
                  </div>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: 'rgba(247,244,238,0.5)', letterSpacing: '0.15em', margin: '24px 0 6px' }}>•••• •••• •••• 4242</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span style={{ fontFamily: BODY, fontSize: 11, color: gold }}>Stripe-secured</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  const isMobile = useIsMobile();
  const checkRow = (text: string, light = false) => (
    <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
      <Check size={14} color={gold} style={{ marginTop: 2, flexShrink: 0 }} />
      <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: light ? 'rgba(247,244,238,0.8)' : inkSoft, lineHeight: 1.55 }}>{text}</span>
    </div>
  );

  const PLANS = [
    {
      name: 'Starter',
      price: '£29.99',
      sub: 'per month · all-in',
      desc: 'Perfect for solo practitioners getting online for the first time.',
      features: ['Premium one-page website', 'Mobile-optimised & fast loading', 'Calendly or Fresha booking embedded', 'Instagram & WhatsApp links', 'Basic SEO setup', 'Hosting, security & support'],
      hero: false,
      light: false,
    },
    {
      name: 'Growth',
      price: '£49.99',
      sub: 'per month · all-in',
      desc: 'The complete digital presence. Your own booking system — no Fresha, no Booksy, no third-party fees.',
      features: ['Full multi-page bespoke website', 'YOUR OWN booking calendar', 'Clients book on YOUR site & brand', '50% deposit collection via Stripe', 'Automatic SMS + email confirmations', 'Admin portal — manage all bookings'],
      hero: true,
      light: true,
    },
    {
      name: 'Premium',
      price: '£79.99',
      sub: 'per month · all-in',
      desc: 'Everything in Growth, plus AI that books clients for you — 24/7, from first enquiry to confirmed appointment.',
      features: ['Everything in Growth', 'AI assistant trained on your services', 'AI answers questions & books 24/7', 'Team management (multi-practitioner)', 'Analytics dashboard & reporting', 'No-show recovery automations'],
      hero: false,
      light: false,
    },
  ];

  return (
    <section id="pricing" style={{ background: cream, padding: isMobile ? '64px 20px' : '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px' }}>
        <FadeIn style={{ textAlign: 'center' }}><Overline centered>Investment</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ textAlign: 'center', marginBottom: 56 }}><SectionHead regular="Three ways to start" italic="booking" centered /></FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 24, alignItems: 'stretch' }}>
          {PLANS.map((plan, idx) => (
            <FadeIn key={plan.name} delay={0.1 + idx * 0.08}>
              <div className="pricing-card" style={{
                background: plan.hero ? charcoal : surface,
                border: plan.hero ? `2px solid ${gold}` : `1px solid ${line}`,
                borderRadius: 14,
                padding: 32,
                position: 'relative',
                marginTop: plan.hero && isMobile ? 28 : 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {plan.hero && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: gold, color: charcoal, fontFamily: BODY, fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '5px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    Most Popular
                  </div>
                )}
                <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: plan.hero ? 'rgba(247,244,238,0.55)' : gold, margin: '0 0 16px' }}>{plan.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' }}>
                  <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: '3.2rem', color: plan.hero ? cream : charcoal, lineHeight: 1, margin: 0 }}>{plan.price}</p>
                  <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: plan.hero ? 'rgba(247,244,238,0.45)' : inkMute }}>/mo</span>
                </div>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: plan.hero ? 'rgba(247,244,238,0.38)' : inkMute, margin: '3px 0 20px', letterSpacing: '0.02em' }}>{plan.sub}</p>
                <div style={{ height: 1, background: plan.hero ? 'rgba(201,169,97,0.2)' : line, margin: '0 0 20px' }} />
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: plan.hero ? 'rgba(247,244,238,0.6)' : inkSoft, lineHeight: 1.7, margin: '0 0 20px' }}>{plan.desc}</p>
                <div style={{ flex: 1 }}>
                  {plan.features.map(t => checkRow(t, plan.light))}
                </div>
                <div style={{ marginTop: 24 }}>
                  <WaBtn large={true} outlined={plan.hero} label="Message on WhatsApp" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: inkMute, textAlign: 'center', marginTop: 28 }}>
            All plans include hosting, security updates and priority support. No setup fees. Cancel anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const isMobile = useIsMobile();
  const reviews = [
    { q: 'Booking enquiries doubled in the first month. Clients actually book now instead of just following.', name: 'FlawlessSkin', biz: 'Birmingham', init: 'F' },
    { q: 'I used to spend hours a week on Instagram DMs. Now the site handles all of it. I just show up and do treatments.', name: 'Hira Aesthetics', biz: 'Manchester', init: 'H' },
    { q: 'The site looks more premium than clinics charging double what I do. Clients comment on it every single week.', name: 'Permadoll', biz: 'Birmingham', init: 'P' },
    { q: 'Sim turned it around in under a week. The deposit system alone has saved me hundreds in no-shows.', name: 'FlawlessSkin', biz: 'Birmingham', init: 'F' },
  ];
  return (
    <section id="results" style={{ background: cream, padding: isMobile ? '64px 20px' : '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px' }}>
        <FadeIn><Overline>Results</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ marginBottom: 48 }}>
          <SectionHead regular="What happens when your site" italic="actually works" size="clamp(2rem,4vw,3rem)" />
        </FadeIn>
        <div className={isMobile ? '' : 'testimonial-scroll'} style={isMobile ? { display: 'flex', flexDirection: 'column', gap: 20 } : {}}>
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.1} style={{ minWidth: isMobile ? undefined : 340, flexShrink: 0 }}>
              <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: 28, boxShadow: '0 4px 20px rgba(26,26,28,0.06)', height: '100%' }}>
                <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: '4rem', color: gold, opacity: 0.28, lineHeight: 0, display: 'block', marginBottom: 18 }}>"</span>
                <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: '1.12rem', color: charcoal, lineHeight: 1.67, margin: '0 0 20px' }}>{r.q}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, color: charcoal }}>{r.init}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 12, color: charcoal, margin: 0 }}>{r.name}</p>
                      <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: inkMute, margin: 0 }}>{r.biz}</p>
                    </div>
                  </div>
                  <span style={{ fontFamily: BODY, fontSize: 12, color: gold }}>★★★★★</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'How long does a build take?', a: 'Most websites are live within 5–10 days of our first conversation. We move fast — we know you can\'t wait weeks to start taking bookings.' },
    { q: 'Do I own my website?', a: 'Yes — completely. You own the code, the domain, the content and all your client data. We host it for you as part of the monthly support plan, which you can cancel anytime with 30 days notice.' },
    { q: 'Do I still need Fresha or Booksy?', a: 'No — and that\'s the whole point. Our Growth and Premium packages include your own fully custom booking system, built directly into your website. Your clients book on YOUR site, in YOUR brand, with no redirects to third-party platforms. No monthly Fresha fees. No Booksy branding. Just your clinic, end to end.' },
    { q: 'Can you integrate my existing Calendly or Fresha?', a: 'Yes — on the Starter package we embed your existing booking tool cleanly into your new site. But most clients switch to our built-in system once they see how much better the experience is for their clients.' },
    { q: 'Does the AI assistant actually book clients?', a: 'Yes. It\'s trained on your specific treatments, prices and availability. It answers questions, qualifies leads and books clients straight into your calendar — automatically, 24/7. Not just a chatbot that says "DM us for more info."' },
    { q: 'Do you offer ongoing support?', a: 'Yes — monthly support plans start at £25/mo and include hosting, security updates, minor content changes and priority support. No long-term contracts. Cancel anytime.' },
  ];
  return (
    <section style={{ background: cream, padding: isMobile ? '64px 20px' : '100px 0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? 0 : '0 32px' }}>
        <FadeIn><Overline centered>FAQ</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 'clamp(2rem,4vw,3rem)', color: charcoal, margin: 0, lineHeight: 1.1 }}>
            Questions we get{' '}
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>every time</em>
          </h2>
        </FadeIn>
        {faqs.map((f, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className="faq-row" style={{ borderBottom: `1px solid ${line}` }} onClick={() => setOpen(open === i ? null : i)}>
              <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 15, color: charcoal, margin: 0, paddingRight: 16 }}>{f.q}</h3>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
                  <ChevronDown size={18} color={gold} />
                </motion.div>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, lineHeight: 1.82, paddingBottom: 20, margin: 0 }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: charcoal, padding: isMobile ? '80px 20px' : '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse at center, rgba(201,169,97,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: isMobile ? 0 : '0 32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <h2 style={{ fontFamily: BODY, fontWeight: 600, fontSize: 'clamp(2.8rem,5vw,4.5rem)', color: cream, lineHeight: 1.0, margin: '0 0 0' }}>
            Ready for a site that actually{' '}
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold, display: 'block', lineHeight: 1.15 }}>books clients?</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: 'rgba(247,244,238,0.58)', lineHeight: 1.72, maxWidth: 460, margin: '22px auto 0' }}>
            Mid-May slots are filling up. If you want your site live before summer, now is the time.
          </p>
        </FadeIn>
        <FadeIn delay={0.28}>
          <div style={{ marginTop: 38, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <WaBtn large light label="Message on WhatsApp" />
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: 'rgba(247,244,238,0.35)', margin: 0 }}>Reply in under 2 hours, Mon–Sat.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: charcoal, borderTop: `1px solid rgba(201,169,97,0.14)`, padding: '48px 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: isMobile ? '28px 20px' : 32 }}>
          {/* Col 1 Brand */}
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
                <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div>
                <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: cream, letterSpacing: '0.15em', margin: 0, lineHeight: 1 }}>AESTHETIX</p>
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 8, color: gold, letterSpacing: '0.22em', margin: 0, lineHeight: 1.5 }}>SYSTEMS</p>
              </div>
            </div>
            <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 13, color: 'rgba(247,244,238,0.42)', margin: '12px 0 4px', lineHeight: 1.6 }}>We build the digital presence your clinic deserves.</p>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: 'rgba(247,244,238,0.28)', margin: 0 }}>London, UK</p>
          </div>
          {/* Col 2 Work */}
          <div>
            <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: gold, margin: '0 0 14px' }}>Work</p>
            {['FlawlessSkin', 'Hira Aesthetics', 'Permadoll'].map(n => (
              <p key={n} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: 'rgba(247,244,238,0.45)', margin: '0 0 9px', cursor: 'pointer' }}>{n}</p>
            ))}
          </div>
          {/* Col 3 Services */}
          <div>
            <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: gold, margin: '0 0 14px' }}>Services</p>
            {['Websites', 'Booking Systems', 'AI Assistant', 'Monthly Hosting'].map(n => (
              <p key={n} style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: 'rgba(247,244,238,0.45)', margin: '0 0 9px' }}>{n}</p>
            ))}
          </div>
          {/* Col 4 Contact */}
          <div>
            <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: gold, margin: '0 0 14px' }}>Contact</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="gold-underline" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: gold, textDecoration: 'none', display: 'block', marginBottom: 9 }}>Message on WhatsApp →</a>
            <a href="https://instagram.com/aesthetixsystems" target="_blank" rel="noopener noreferrer" className="gold-underline" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: 'rgba(247,244,238,0.45)', textDecoration: 'none', display: 'block' }}>@aesthetixsystems</a>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(201,169,97,0.14)', margin: '32px 0 24px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: 'rgba(247,244,238,0.22)' }}>Aesthetix Systems · London, UK · © 2026</span>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: 'rgba(247,244,238,0.22)' }}>Built by Aesthetix Systems</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Mobile Hook ─── */
function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 769);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 769);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

/* ─── Home ─── */
export default function Home() {
  return (
    <div style={{ background: cream, minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <Portfolio />
      <Bento />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
