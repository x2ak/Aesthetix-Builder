import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ─── Design Tokens ─── */
const cream = '#F7F4EE';
const surface = '#FFFFFF';
const charcoal = '#1A1A1C';
const charcoalSoft = '#2E2E32';
const inkSoft = '#4A4A4E';
const inkMute = '#8A8A8E';
const line = '#E5DFD3';
const gold = '#C4A882';
const goldHover = '#A88C6A';
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
/* ─── Dynamic slot-month label ───
   Returns "Mid-[Month]" for most of the month.
   In the last week (day ≥ 24) it flips to the NEXT month so urgency stays fresh. */
function getSlotMonth(): string {
  const now = new Date();
  const day = now.getDate();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const idx = day >= 24 ? (now.getMonth() + 1) % 12 : now.getMonth();
  return `Mid-${months[idx]}`;
}

function Overline({ children, centered = false, glow = false }: { children: React.ReactNode; centered?: boolean; glow?: boolean }) {
  return (
    <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: gold, marginBottom: 16, textAlign: centered ? 'center' : 'left', textShadow: glow ? `0 0 12px rgba(196,168,130,0.9), 0 0 28px rgba(196,168,130,0.55), 0 0 54px rgba(196,168,130,0.3)` : 'none' }}>
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

function SectionDivider() {
  return (
    <div style={{ background: cream, padding: '0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flex: 1, height: 1, background: line }} />
        <span style={{ fontFamily: BODY, fontSize: 7, color: gold, opacity: 0.55, letterSpacing: '0.3em' }}>◆</span>
        <div style={{ flex: 1, height: 1, background: line }} />
      </div>
    </div>
  );
}

/* ─── Phone Lead Quiz ─── */
const QUIZ_TOTAL = 7;
const QUIZ_BG = '#18181A';
const QUIZ_CARD = '#222226';
const QUIZ_BORDER = 'rgba(255,255,255,0.09)';
const QUIZ_TEXT = '#F7F4EE';
const QUIZ_MUTE = 'rgba(247,244,238,0.42)';

function PhoneLeadQuiz() {
  const isMobile = useIsMobile();
  const PW = isMobile ? 190 : 264;
  const PH = isMobile ? 382 : 530;
  const PR = isMobile ? 30 : 40;
  const PP = isMobile ? 9 : 12;

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [handle, setHandle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const goBack = () => setStep(s => Math.max(1, s - 1));
  const goNext = () => setStep(s => Math.min(QUIZ_TOTAL, s + 1));

  const pick = (stepNum: number, value: string) => {
    setAnswers(a => ({ ...a, [stepNum]: value }));
    setTimeout(goNext, 160);
  };

  const toggleCheck = (item: string) =>
    setChecked(c => c.includes(item) ? c.filter(x => x !== item) : [...c, item]);

  const progressPct = ((step - 1) / (QUIZ_TOTAL - 1)) * 100;

  const optBase: React.CSSProperties = {
    width: '100%',
    background: QUIZ_CARD,
    border: `1px solid ${QUIZ_BORDER}`,
    borderRadius: isMobile ? 7 : 9,
    padding: isMobile ? '5px 8px' : '8px 12px',
    marginBottom: isMobile ? 3 : 4,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.15s',
  };

  const qStyle: React.CSSProperties = {
    fontFamily: DISP,
    fontStyle: 'italic',
    fontSize: isMobile ? 13 : 18,
    color: QUIZ_TEXT,
    margin: `0 0 ${isMobile ? 7 : 10}px`,
    lineHeight: 1.2,
  };

  const labelRow = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? 10 : 13 }}>
      <span style={{ fontFamily: BODY, fontSize: isMobile ? 7 : 8.5, letterSpacing: '0.18em', color: gold, textTransform: 'uppercase' as const }}>
        Step {step} of {QUIZ_TOTAL}
      </span>
      {step > 1 && !submitted && (
        <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: BODY, fontSize: isMobile ? 7 : 8.5, color: gold, padding: 0 }}>
          ← Back
        </button>
      )}
    </div>
  );

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', width: isMobile ? 260 : 340, height: isMobile ? 260 : 340, background: 'radial-gradient(ellipse at center, rgba(201,169,97,0.13) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: PW, height: PH, background: charcoal, borderRadius: PR, padding: PP, boxShadow: `0 0 0 1.5px rgba(201,169,97,0.28), 0 36px 72px rgba(26,26,28,0.28)`, position: 'relative' }}
      >
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: isMobile ? 60 : 80, height: isMobile ? 20 : 26, background: charcoal, borderRadius: '0 0 14px 14px', zIndex: 10 }} />

        {/* Screen */}
        <div style={{ width: '100%', height: '100%', background: QUIZ_BG, borderRadius: 30, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>

          {/* Gold progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', flexShrink: 0 }}>
            <motion.div animate={{ width: `${progressPct}%` }} transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ height: '100%', background: gold, borderRadius: 2 }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div key={submitted ? 'done' : step}
                initial={{ x: 28, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -28, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', inset: 0, padding: isMobile ? '8px 9px 4px' : '12px 14px 6px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
              >
                {/* Label row always pinned at top */}
                {!submitted && labelRow}

                {submitted ? (
                  /* ── Success ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 0 }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                      style={{ width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? 10 : 14 }}>
                      <Check size={isMobile ? 20 : 26} color={charcoal} strokeWidth={2.5} />
                    </motion.div>
                    <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: isMobile ? 15 : 20, color: QUIZ_TEXT, margin: `0 0 ${isMobile ? 6 : 8}px`, lineHeight: 1.2 }}>We'll be in touch!</p>
                    <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 8 : 10, color: QUIZ_MUTE, margin: 0, lineHeight: 1.55 }}>
                      Check your WhatsApp —<br />Sim will reach out shortly.
                    </p>
                  </div>

                ) : step === 1 ? (
                  /* ── Step 1: Business type (2-col grid) ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: isMobile ? 8 : 14 }}>
                    <p style={qStyle}>What kind of business do you run?</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 5 : 6 }}>
                      {['Aesthetics', 'Lash & Brow', 'Skin/Facials', 'Hair', 'Nails', 'Other'].map(opt => (
                        <motion.button key={opt} whileTap={{ scale: 0.94 }} onClick={() => pick(1, opt)}
                          className={`quiz-opt${answers[1] === opt ? ' quiz-opt--selected' : ''}`}
                          style={{ ...optBase, justifyContent: 'center', padding: isMobile ? '9px 5px' : '12px 8px', marginBottom: 0 }}>
                          <span className="quiz-opt-label" style={{ fontFamily: BODY, fontSize: isMobile ? 8 : 10, color: QUIZ_TEXT, fontWeight: 300, textAlign: 'center' as const }}>{opt}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                ) : step === 2 ? (
                  /* ── Step 2: Current booking method ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: isMobile ? 8 : 14 }}>
                    <p style={qStyle}>How are clients booking right now?</p>
                    {['Instagram DMs', 'WhatsApp', 'Fresha / Booksy', 'Phone & walk-ins', 'Nothing yet'].map(opt => (
                      <motion.button key={opt} whileTap={{ scale: 0.97 }} onClick={() => pick(2, opt)}
                        className={`quiz-opt${answers[2] === opt ? ' quiz-opt--selected' : ''}`}
                        style={optBase}>
                        <span className="quiz-opt-label" style={{ fontFamily: BODY, fontSize: isMobile ? 8 : 11, color: QUIZ_TEXT, fontWeight: 300 }}>{opt}</span>
                      </motion.button>
                    ))}
                  </div>

                ) : step === 3 ? (
                  /* ── Step 3: Bookings per month ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: isMobile ? 8 : 14 }}>
                    <p style={qStyle}>Roughly how many bookings a month?</p>
                    {['0 – 20', '20 – 50', '50 – 100', '100+'].map(opt => (
                      <motion.button key={opt} whileTap={{ scale: 0.97 }} onClick={() => pick(3, opt)}
                        className={`quiz-opt${answers[3] === opt ? ' quiz-opt--selected' : ''}`}
                        style={optBase}>
                        <span className="quiz-opt-label" style={{ fontFamily: BODY, fontSize: isMobile ? 8 : 11, color: QUIZ_TEXT, fontWeight: 300 }}>{opt}</span>
                      </motion.button>
                    ))}
                  </div>

                ) : step === 4 ? (
                  /* ── Step 4: Pain points (multi-select) ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={qStyle}>What's holding you back?</p>
                    <p style={{ fontFamily: BODY, fontSize: isMobile ? 6.5 : 8, letterSpacing: '0.15em', color: gold, textTransform: 'uppercase', margin: `0 0 ${isMobile ? 5 : 7}px` }}>Select all that apply</p>
                    {["No-shows", "Time wasted in DMs", "Looks unprofessional", "No deposits taken", "Can't be found on Google", "Juggling multiple locations"].map(opt => {
                      const sel = checked.includes(opt);
                      return (
                        <motion.button key={opt} whileTap={{ scale: 0.97 }} onClick={() => toggleCheck(opt)}
                          className={`quiz-opt${sel ? ' quiz-opt--selected' : ''}`}
                          style={{ ...optBase, justifyContent: 'space-between', border: `1px solid ${sel ? gold : QUIZ_BORDER}` }}>
                          <span className="quiz-opt-label" style={{ fontFamily: BODY, fontSize: isMobile ? 7.5 : 10, color: sel ? gold : QUIZ_TEXT, fontWeight: 300, textAlign: 'left' as const }}>{opt}</span>
                          <div style={{ width: isMobile ? 12 : 15, height: isMobile ? 12 : 15, borderRadius: 3, border: `1.5px solid ${sel ? gold : QUIZ_MUTE}`, background: sel ? gold : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                            {sel && <Check size={isMobile ? 7 : 9} color={charcoal} strokeWidth={2.5} />}
                          </div>
                        </motion.button>
                      );
                    })}
                    <motion.button whileTap={{ scale: 0.97 }} onClick={goNext}
                      style={{ width: '100%', background: gold, borderRadius: isMobile ? 8 : 10, padding: isMobile ? '6px' : '8px', border: 'none', cursor: 'pointer', marginTop: isMobile ? 4 : 5 }}>
                      <span style={{ fontFamily: BODY, fontSize: isMobile ? 9 : 11, fontWeight: 600, color: charcoal }}>Continue →</span>
                    </motion.button>
                  </div>

                ) : step === 5 ? (
                  /* ── Step 5: Pick your look ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: isMobile ? 8 : 14 }}>
                    <p style={qStyle}>Pick your look</p>
                    {[
                      { name: 'Warm Luxe',      colors: ['#F5F0E8', '#C4A882', '#1A1A1C'] },
                      { name: 'Clean Clinical', colors: ['#FFFFFF', '#D0DCE8', '#2E4A6A'] },
                      { name: 'Bold Editorial', colors: ['#111111', '#C4A882', '#C0392B'] },
                      { name: 'Custom',         colors: [], badge: 'BESPOKE' },
                    ].map(opt => (
                      <motion.button key={opt.name} whileTap={{ scale: 0.97 }} onClick={() => pick(5, opt.name)}
                        className={`quiz-opt${answers[5] === opt.name ? ' quiz-opt--selected' : ''}`}
                        style={{ ...optBase, justifyContent: 'space-between' }}>
                        <span className="quiz-opt-label" style={{ fontFamily: BODY, fontSize: isMobile ? 8 : 11, color: QUIZ_TEXT, fontWeight: 300 }}>{opt.name}</span>
                        {opt.badge ? (
                          <span style={{ fontFamily: BODY, fontSize: isMobile ? 6 : 7.5, letterSpacing: '0.12em', color: QUIZ_MUTE, border: `1px solid ${QUIZ_BORDER}`, borderRadius: 999, padding: isMobile ? '2px 5px' : '3px 8px' }}>{opt.badge}</span>
                        ) : (
                          <div style={{ display: 'flex', gap: 3 }}>
                            {opt.colors.map((c, ci) => (
                              <div key={ci} style={{ width: isMobile ? 10 : 13, height: isMobile ? 10 : 13, borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.12)' }} />
                            ))}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                ) : step === 6 ? (
                  /* ── Step 6: Package ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: isMobile ? 8 : 14 }}>
                    <p style={qStyle}>Which package feels right?</p>
                    {[
                      { name: 'Core',    desc: 'Clean, fast & ready to book', price: '£999' },
                      { name: 'Premium', desc: 'Custom design + booking system', price: '£1,499' },
                      { name: 'Custom',  desc: 'Full bespoke build', price: "Let's talk" },
                    ].map(opt => (
                      <motion.button key={opt.name} whileTap={{ scale: 0.97 }} onClick={() => pick(6, opt.name)}
                        className={`quiz-opt${answers[6] === opt.name ? ' quiz-opt--selected' : ''}`}
                        style={{ ...optBase, justifyContent: 'space-between' }}>
                        <div>
                          <span className="quiz-opt-label" style={{ fontFamily: BODY, fontSize: isMobile ? 8 : 11, color: QUIZ_TEXT, fontWeight: 500, display: 'block' }}>{opt.name}</span>
                          <span style={{ fontFamily: BODY, fontSize: isMobile ? 6.5 : 8.5, color: QUIZ_MUTE }}>{opt.desc}</span>
                        </div>
                        <span style={{ fontFamily: BODY, fontSize: isMobile ? 7 : 9.5, color: gold, fontWeight: 500, flexShrink: 0, marginLeft: 6 }}>{opt.price}</span>
                      </motion.button>
                    ))}
                  </div>

                ) : (
                  /* ── Step 7: Contact details ── */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={qStyle}>Almost there —<br />how do we reach you?</p>
                    {[
                      { label: 'Your name',        value: name,   set: setName,   ph: 'e.g. Jade' },
                      { label: 'Phone number',     value: phone,  set: setPhone,  ph: '+44 7700 000000' },
                      { label: 'IG / TikTok handle', value: handle, set: setHandle, ph: '@yourhandle' },
                    ].map(f => (
                      <div key={f.label} style={{ marginBottom: isMobile ? 7 : 9 }}>
                        <label style={{ fontFamily: BODY, fontSize: isMobile ? 6.5 : 8, color: QUIZ_MUTE, letterSpacing: '0.1em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 4 }}>{f.label}</label>
                        <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                          style={{ width: '100%', background: QUIZ_CARD, border: `1px solid ${QUIZ_BORDER}`, borderRadius: isMobile ? 6 : 8, padding: isMobile ? '7px 10px' : '9px 12px', fontFamily: BODY, fontSize: isMobile ? 9 : 11, color: QUIZ_TEXT, outline: 'none', boxSizing: 'border-box' as const, caretColor: gold }} />
                      </div>
                    ))}
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => { if (name && phone) setSubmitted(true); }}
                      style={{ width: '100%', background: name && phone ? gold : 'rgba(196,168,130,0.25)', borderRadius: isMobile ? 8 : 10, padding: isMobile ? '6px' : '8px', border: 'none', cursor: name && phone ? 'pointer' : 'not-allowed', marginTop: isMobile ? 4 : 5, transition: 'background 0.25s' }}>
                      <span style={{ fontFamily: BODY, fontSize: isMobile ? 9 : 11, fontWeight: 600, color: charcoal }}>Get my free quote →</span>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom tag */}
          {!submitted && (
            <div style={{ padding: isMobile ? '4px 0 6px' : '6px 0 8px', textAlign: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: BODY, fontSize: isMobile ? 5.5 : 7, letterSpacing: '0.2em', color: gold, textTransform: 'uppercase' }}>
                60 seconds · no obligation
              </span>
            </div>
          )}
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
    <div style={{ width: '100%' }}>
      <div style={{ border: `1px solid ${line}`, borderRadius: 14, overflow: 'hidden', background: surface }}>
        <div style={{ background: '#F2F2F2', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${line}` }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#FF5F57', '#FFBD2E', '#28C840'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ flex: 1, background: '#E8E8E8', borderRadius: 5, padding: '5px 14px', marginLeft: 8 }}>
            <span style={{ fontFamily: BODY, fontSize: 11, color: inkMute }}>yourclinic.co.uk</span>
          </div>
        </div>
        <div style={{ padding: '24px 28px 28px' }}>
          <motion.div animate={{ opacity: f > 0 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ width: '60%', height: 9, background: charcoal, borderRadius: 3, marginBottom: 12 }} />
          <motion.div animate={{ opacity: f > 1 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ width: '85%', height: 6, background: line, borderRadius: 3, marginBottom: 7 }} />
          <motion.div animate={{ opacity: f > 1 ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.1 }} style={{ width: '70%', height: 6, background: line, borderRadius: 3, marginBottom: 22 }} />
          <motion.div animate={{ opacity: f > 2 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ width: 100, height: 36, background: gold, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: BODY, fontSize: 12, color: charcoal, fontWeight: 600 }}>BOOK NOW</span>
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
    <div style={{ width: '100%' }}>
      <div style={{ border: `1px solid ${line}`, borderRadius: 14, padding: '20px 22px 24px', background: surface, position: 'relative', overflow: 'hidden' }}>
        <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: charcoal, margin: '0 0 14px' }}>May 2025</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
          {Array.from({ length: 21 }, (_, i) => {
            const d = i + 1;
            const gi = goldDays.indexOf(d);
            const isG = gi !== -1 && gi < filled;
            return (
              <motion.div key={d} animate={{ background: isG ? gold : goldTint }} transition={{ duration: 0.3 }}
                style={{ aspectRatio: '1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: BODY, fontSize: 10, color: isG ? charcoal : inkMute }}>{d}</span>
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence>
          {full && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: charcoal, color: cream, borderRadius: 10, padding: '10px 20px', fontFamily: BODY, fontSize: 14, fontWeight: 500 }}>
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
    <div style={{ width: '100%' }}>
      <div style={{ border: `1px solid ${line}`, borderRadius: 14, background: surface, overflow: 'hidden' }}>
        {/* Email app header */}
        <div style={{ background: '#F5F5F5', padding: '10px 16px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Mail size={14} color={gold} />
          <span style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: charcoal }}>Inbox</span>
          <span style={{ marginLeft: 'auto', background: gold, color: charcoal, borderRadius: 10, padding: '2px 8px', fontFamily: BODY, fontSize: 11, fontWeight: 600 }}>{visible.length}</span>
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
                style={{ padding: '12px 16px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 12, background: idx === visible[visible.length - 1] ? goldTint : surface }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: charcoal }}>F</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: charcoal, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{INBOX[idx].subj}</p>
                  <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 300, color: inkMute, margin: 0 }}>{INBOX[idx].from}</p>
                </div>
                <span style={{ fontFamily: BODY, fontSize: 11, color: inkMute, flexShrink: 0 }}>{INBOX[idx].time}</span>
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
function HeroTicker() {
  const items = ['BESPOKE SITES', 'BUILT-IN BOOKING', 'NO 3RD PARTY APPS', 'NO COMMISSION FEES', 'CUSTOM BRANDING', 'UK BASED AGENCY'];
  const allItems = [...items, ...items];
  return (
    <div style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`, overflow: 'hidden', padding: '9px 0', marginBottom: 0 }}>
      <div className="hero-marquee-track">
        {allItems.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18, paddingRight: 18, whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, letterSpacing: '0.22em', color: inkSoft }}>{item}</span>
            <span style={{ color: gold, fontSize: 7, lineHeight: 1 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const isMobile = useIsMobile();

  const CIRCLE_BG = [
    { size: 420, top: '-100px', right: '-100px', y: [0,-22,0], dur: 9,   delay: 0,   fill: false, spin: 'orb-spin-cw'  },
    { size: 240, top: '30%',   right: '-40px',  y: [0,-14,0], dur: 12,  delay: 1.8, fill: false, spin: 'orb-spin-ccw' },
    { size: 150, bottom: '8%', left: '5%',      y: [0,-18,0], dur: 10,  delay: 0.6, fill: true,  spin: ''             },
    { size: 90,  top: '15%',   left: '42%',     y: [0,-12,0], dur: 7.5, delay: 2.2, fill: false, spin: 'orb-spin-cw'  },
    { size: 56,  top: '55%',   right: '28%',    y: [0,-10,0], dur: 8.5, delay: 1.2, fill: true,  spin: 'orb-pulse'    },
    { size: 32,  top: '25%',   left: '18%',     y: [0,-8,0],  dur: 6.5, delay: 3,   fill: true,  spin: ''             },
  ];

  const MOBILE_ORBS = [
    { size: 320, top: '-90px',  right: '-110px', y: [0,-20,0], dur: 10,  delay: 0,   fill: false, spin: 'orb-spin-cw'  },
    { size: 190, bottom: '12%', left: '-70px',   y: [0,-14,0], dur: 13,  delay: 2,   fill: false, spin: 'orb-spin-ccw' },
    { size: 110, top: '32%',    right: '-28px',  y: [0,-16,0], dur: 9,   delay: 0.8, fill: true,  spin: ''             },
    { size: 70,  top: '18%',    left: '12%',     y: [0,-10,0], dur: 7.5, delay: 1.5, fill: false, spin: 'orb-spin-cw'  },
    { size: 44,  top: '58%',    right: '22%',    y: [0,-8,0],  dur: 8,   delay: 2.5, fill: true,  spin: 'orb-pulse'    },
  ];

  /* ── MOBILE layout — two scroll segments ── */
  if (isMobile) {
    return (
      <section style={{ background: 'linear-gradient(180deg, #FAF6EE 0%, #F7F4EE 60%)', position: 'relative' }}>
        {/* ── Segment 1: copy — full viewport height ── */}
        <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {/* Animated orbs */}
          {MOBILE_ORBS.map((c, i) => (
            <motion.div key={`mo-${i}`}
              className={c.spin}
              animate={{ y: c.y }}
              transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
                border: c.fill ? 'none' : '1.5px solid rgba(201,169,97,0.28)',
                background: c.fill ? 'radial-gradient(circle,rgba(201,169,97,0.11) 0%,transparent 72%)' : 'transparent',
                top: (c as any).top, right: (c as any).right, bottom: (c as any).bottom, left: (c as any).left,
                pointerEvents: 'none', zIndex: 0,
              }}
            />
          ))}
          {/* Warm gold glow */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 340, height: 340, background: 'radial-gradient(ellipse, rgba(196,168,130,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

          {/* Main copy — grows to fill space */}
          <div style={{ flex: 1, padding: '44px 28px 0', textAlign: 'center', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.24em', color: gold, marginBottom: 28 }}>
              Aesthetics · Lash · Beauty
            </p>
            <h1 style={{ fontFamily: BODY, fontWeight: 800, fontSize: 'clamp(2.8rem, 11vw, 3.5rem)', lineHeight: 1.02, color: charcoal, marginBottom: 32, letterSpacing: '-0.02em' }}>
              Turn followers<br />
              <span style={{ color: 'rgba(26,26,28,0.22)', fontWeight: 700 }}>into</span><br />
              <em className="hero-gold-italic" style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold, lineHeight: 1.08 }}>bookings.</em>
            </h1>
            <HeroTicker />
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 15, color: inkSoft, lineHeight: 1.85, marginBottom: 36, marginTop: 28 }}>
              Premium websites with built-in booking for UK aesthetics clinics. Look luxury. Book 24/7. Stop chasing DMs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 40 }}>
              <WaBtn large />
              <a href="#work" className="gold-underline" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: gold, textDecoration: 'none', letterSpacing: '0.02em' }}>
                See recent work →
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: gold, fontSize: 13, letterSpacing: 3, lineHeight: 1, textShadow: '0 0 12px rgba(196,168,130,0.6)' }}>★★★★★</span>
                <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: charcoal }}>5.0</span>
              </div>
              <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: inkMute }}>Trusted by clinics across the UK</span>
            </div>
          </div>

          {/* Bottom fade into Segment 2 */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: `linear-gradient(to bottom, transparent, ${cream})`, pointerEvents: 'none', zIndex: 2 }} />

          {/* Scroll teaser pinned to bottom */}
          <div style={{ padding: '16px 28px 52px', textAlign: 'center', position: 'relative', zIndex: 3 }}>
            <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 10, color: gold, letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>
              Get your free quote in 60 seconds
            </p>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M4 11l6 6 6-6" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* ── Segment 2: phone quiz — appears on scroll ── */}
        <div style={{ padding: '48px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Ambient orbs behind the quiz */}
          {[
            { size: 380, top: '-80px',  right: '-180px', y: [0,-18,0] as number[], dur: 11,  delay: 0,   fill: false, spin: 'orb-spin-cw'  },
            { size: 220, bottom: '-60px', left: '-100px',y: [0,-14,0] as number[], dur: 14,  delay: 1.5, fill: false, spin: 'orb-spin-ccw' },
            { size: 120, top: '22%',    left: '-50px',   y: [0,-16,0] as number[], dur: 9.5, delay: 0.7, fill: true,  spin: ''             },
            { size: 60,  top: '55%',    right: '-30px',  y: [0,-10,0] as number[], dur: 8,   delay: 2,   fill: true,  spin: 'orb-pulse'    },
          ].map((c, i) => (
            <motion.div key={`sq2-${i}`}
              className={c.spin}
              animate={{ y: c.y }}
              transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
                border: c.fill ? 'none' : '1.5px solid rgba(201,169,97,0.25)',
                background: c.fill ? 'radial-gradient(circle,rgba(201,169,97,0.10) 0%,transparent 72%)' : 'transparent',
                top: (c as any).top, right: (c as any).right, bottom: (c as any).bottom, left: (c as any).left,
                pointerEvents: 'none', zIndex: 0,
              }}
            />
          ))}
          {/* Central warm glow */}
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 420, height: 420, background: 'radial-gradient(ellipse, rgba(196,168,130,0.13) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <PhoneLeadQuiz />
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP layout — two-column grid with floating circles ── */
  return (
    <section style={{
      background: cream,
      padding: '96px 0 72px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {CIRCLE_BG.map((c, i) => (
        <motion.div key={`hc-${i}`}
          className={c.spin}
          animate={{ y: [...c.y] }}
          transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
            border: c.fill ? 'none' : `1.5px solid rgba(201,169,97,0.35)`,
            background: c.fill ? `radial-gradient(circle,rgba(201,169,97,0.13) 0%,transparent 72%)` : 'transparent',
            top: (c as any).top, right: (c as any).right, bottom: (c as any).bottom, left: (c as any).left,
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      ))}
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 48px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
        alignItems: 'center', position: 'relative', zIndex: 1,
      }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', minWidth: 0 }}>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.22em', color: gold, marginBottom: 24 }}>
            Aesthetics · Lash · Beauty
          </p>
          <h1 style={{ fontFamily: BODY, fontWeight: 700, fontSize: 'clamp(2.8rem,5vw,4.4rem)', lineHeight: 1.06, color: charcoal, marginBottom: 24 }}>
            Turn followers<br />
            <span style={{ color: 'rgba(26,26,28,0.28)' }}>into</span><br />
            <em style={{ fontFamily: DISP, fontStyle: 'italic', color: gold, lineHeight: 1.08 }}>bookings.</em>
          </h1>
          <div style={{ width: '100%', marginBottom: 24 }}><HeroTicker /></div>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 16, color: inkSoft, lineHeight: 1.75, maxWidth: 460, marginBottom: 20 }}>
            Premium websites with built-in booking for UK aesthetics clinics.<br />Look luxury. Book 24/7. Stop chasing DMs.
          </p>
          {/* Trust pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {['✓ Live in 14 days', '✓ No 3rd party apps', '✓ UK based team'].map(pill => (
              <span key={pill} style={{ fontFamily: BODY, fontWeight: 400, fontSize: 11, color: charcoal, background: goldTint, border: `1px solid rgba(196,168,130,0.35)`, borderRadius: 999, padding: '5px 12px', letterSpacing: '0.03em', whiteSpace: 'nowrap' as const }}>
                {pill}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', marginBottom: 24 }}>
            <WaBtn large />
            <a href="#work" className="gold-underline" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: gold, textDecoration: 'none', letterSpacing: '0.02em' }}>
              See recent work →
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: gold, fontSize: 14, letterSpacing: 2, lineHeight: 1 }}>★★★★★</span>
            <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: charcoal }}>5.0</span>
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkMute }}>· Trusted by clinics across the UK</span>
          </div>
        </div>

        {/* Right column — phone quiz, always visible */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {/* Background ambient orbs */}
          {[
            { size: 260, top: '8%',  left: '-60px',  y: [0,-16,0], dur: 10, delay: 0.3, fill: false },
            { size: 160, top: '58%', left: '-40px',  y: [0,-11,0], dur: 8,  delay: 1.6, fill: true  },
          ].map((c, i) => (
            <motion.div key={`ph-${i}`}
              animate={{ y: [...c.y] }}
              transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
                border: c.fill ? 'none' : `1.5px solid rgba(201,169,97,0.28)`,
                background: c.fill ? `radial-gradient(circle,rgba(201,169,97,0.12) 0%,transparent 70%)` : 'transparent',
                top: (c as any).top, left: (c as any).left,
                pointerEvents: 'none', zIndex: 0,
              }}
            />
          ))}
          <p style={{ fontFamily: BODY, fontWeight: 700, fontSize: 11, color: gold, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 14, position: 'relative', zIndex: 1 }}>
            Get your free quote in 60 seconds
          </p>
          <div style={{ position: 'relative', zIndex: 1 }}><PhoneLeadQuiz /></div>
        </div>
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
    <section style={{
      background: 'linear-gradient(135deg, #0D0D0E 0%, #1A1A1C 55%, #0F0F10 100%)',
      padding: isMobile ? '28px 0' : '40px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Gold glow blob */}
      <div style={{ position: 'absolute', top: '-80%', left: '25%', width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(196,168,130,0.14) 0%, transparent 68%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-60%', right: '5%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(196,168,130,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px', position: 'relative', zIndex: 1,
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : '1fr 1fr 1fr',
        gap: 0,
      }}>
        {stats.map((st, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: isMobile ? 'baseline' : 'flex-start',
              gap: isMobile ? 14 : 0,
              padding: isMobile ? '16px 0' : '0 44px',
              borderBottom: isMobile && i < 2 ? '1px solid rgba(201,169,97,0.12)' : 'none',
              borderRight: !isMobile && i < 2 ? '1px solid rgba(201,169,97,0.12)' : 'none',
            }}>
              <p style={{
                fontFamily: DISP, fontStyle: 'italic',
                fontSize: isMobile ? '2rem' : '3.4rem',
                color: gold, lineHeight: 1, margin: isMobile ? 0 : `0 0 12px`,
                textShadow: '0 0 32px rgba(196,168,130,0.7), 0 0 72px rgba(196,168,130,0.35)',
                flexShrink: 0,
              }}>{st.n}</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 12 : 13, color: 'rgba(247,244,238,0.52)', lineHeight: 1.65, margin: 0 }}>{st.s}</p>
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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const INTERVAL = 4200;

  const cards = [
    { n: '01', title: 'We design your site', body: 'A bespoke, luxury website built around your brand. No templates. No compromises. Designed to convert visitors into bookings.', Illust: BrowserIllust },
    { n: '02', title: 'We build your calendar in', body: 'Your own booking calendar — live on your site. No Fresha. No Booksy. No third-party fees. Just your brand, your clients, your bookings.', Illust: CalIllust },
    { n: '03', title: 'You get bookings 24/7', body: 'Clients book while you sleep. You wake up to a full calendar. No chasing. No confusion. Just pure, automated revenue.', Illust: NotifIllust },
  ];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % cards.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused, active]);

  return (
    <section id="services" style={{
      background: 'linear-gradient(180deg, #FAF8F3 0%, #F7F4EE 100%)',
      padding: isMobile ? '64px 0' : '100px 0',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>
        <FadeIn><Overline>How It Works</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ marginBottom: isMobile ? 40 : 56 }}>
          <SectionHead regular="From DMs to" italic="dashboards" />
        </FadeIn>

        {/* Tab row — NOT inside FadeIn so AnimatePresence works properly */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: `1px solid ${line}`, marginBottom: 0 }}>
          {cards.map((c, i) => (
            <button key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: isMobile ? '16px 8px 0' : '22px 24px 0', textAlign: 'center', position: 'relative', outline: 'none', transition: 'background 0.2s' }}
            >
              <span style={{
                fontFamily: DISP, fontStyle: 'italic',
                fontSize: isMobile ? '1.8rem' : '2.2rem',
                color: i === active ? gold : `rgba(196,168,130,0.28)`,
                lineHeight: 1, display: 'block', marginBottom: 6,
                transition: 'color 0.3s, text-shadow 0.3s',
                textShadow: i === active ? '0 0 28px rgba(196,168,130,0.55)' : 'none',
              }}>{c.n}</span>
              {!isMobile && (
                <span style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: i === active ? charcoal : inkMute, display: 'block', marginBottom: 16, transition: 'color 0.3s' }}>
                  {c.title}
                </span>
              )}
              {/* Progress bar */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: line }}>
                {i === active && (
                  <motion.div
                    key={`bar-${active}-${paused}`}
                    initial={{ width: '0%' }} animate={{ width: '100%' }}
                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                    style={{ height: '100%', background: gold }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Content card */}
        <div style={{
          background: surface, border: `1px solid ${line}`, borderTop: 'none',
          borderRadius: '0 0 20px 20px', overflow: 'hidden',
          minHeight: isMobile ? 380 : 320,
          boxShadow: '0 12px 56px rgba(196,168,130,0.14), 0 2px 16px rgba(26,26,28,0.06)',
        }}>
          <AnimatePresence mode="wait">
            {cards.map((card, i) => i === active && (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.36, ease: [0.25, 0.1, 0.25, 1] }}
                style={isMobile ? { display: 'flex', flexDirection: 'column' } : { display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}
              >
                {/* Illustration — warm gradient bg */}
                <div style={{
                  padding: isMobile ? '36px 28px 24px' : '48px 36px 48px 48px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #FAF7F2 0%, #EEE4D4 100%)',
                  borderRight: isMobile ? 'none' : `1px solid rgba(196,168,130,0.2)`,
                  borderBottom: isMobile ? `1px solid rgba(196,168,130,0.15)` : 'none',
                  minHeight: isMobile ? 200 : 'auto',
                }}>
                  <card.Illust />
                </div>
                {/* Copy */}
                <div style={{ padding: isMobile ? '28px 28px 36px' : '48px 48px 48px 44px' }}>
                  <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: '3.8rem', color: gold, opacity: 0.16, lineHeight: 1, margin: '0 0 18px' }}>{card.n}</p>
                  <h3 style={{ fontFamily: BODY, fontWeight: 700, fontSize: isMobile ? 20 : 24, color: charcoal, margin: '0 0 14px', lineHeight: 1.2 }}>{card.title}</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 14 : 15, color: inkSoft, lineHeight: 1.78, margin: 0 }}>{card.body}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio ─── */
function Portfolio() {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const userPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAutoScrollingRef = useRef(false);

  // Auto-scroll setup with scroll-event detection for user interaction
  useEffect(() => {
    const el = scrollRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.25 }
    );
    observer.observe(section);

    // Detect user-initiated scroll (touch swipe or trackpad) and pause immediately
    const onScroll = () => {
      if (isAutoScrollingRef.current) return; // ignore our own auto-scroll events
      userPausedRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => { userPausedRef.current = false; }, 3000);
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    autoTimerRef.current = setInterval(() => {
      if (!el || !visible || userPausedRef.current) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      isAutoScrollingRef.current = true;
      if (el.scrollLeft >= maxScroll - 8) {
        el.scrollTo({ left: 0, behavior: 'auto' }); // instant wrap-around
      } else {
        const firstCard = el.firstElementChild as HTMLElement | null;
        const step = firstCard ? firstCard.offsetWidth + 20 : el.clientWidth * 0.9;
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
      // Auto-scroll animation takes ~600ms; clear flag after that
      setTimeout(() => { isAutoScrollingRef.current = false; }, 700);
    }, 3500);

    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', onScroll);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const cancelSmoothScroll = () => {
    // Setting scrollLeft = scrollLeft cancels any running CSS smooth-scroll animation
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollLeft;
    isAutoScrollingRef.current = false;
  };

  const pauseAuto = () => {
    cancelSmoothScroll();
    userPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const scheduleResume = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => { userPausedRef.current = false; }, 3000);
  };

  const clients = [
    {
      name: 'Hira Aesthetics',
      loc: 'Thornaby, North East',
      buildTime: '2 weeks',
      url: 'https://hiraaesthetics.co.uk',
      preview: '/hira-hero.png',
      grad: `linear-gradient(135deg, #1A1612, #2E2318)`,
      caseStudy: '/portfolio/hiraaesthetics',
      tag: 'CUSTOM PLATFORM BUILD',
      result: 'Clinic site, skincare store, CPD academy and admin portal — one complete platform.',
    },
    {
      name: 'Dermadoll Aesthetics',
      loc: 'Birmingham',
      buildTime: '5 days',
      url: 'https://dermadoll-aesthetics.co.uk',
      preview: '/dermadoll-preview.png',
      grad: `linear-gradient(135deg, ${goldTint}, #e8e0d8)`,
      caseStudy: '/portfolio/dermadoll',
      tag: 'FULL PLATFORM BUILD',
      result: '100% of bookings automated. Zero admin time per booking.',
    },
    {
      name: 'Starr Beautyy',
      loc: 'Hornchurch & Marylebone',
      buildTime: '10 days',
      url: 'https://starrbeautyy.co.uk',
      preview: '/starraesthetics-preview.png',
      grad: `linear-gradient(135deg, ${blush}, ${goldTint})`,
      caseStudy: '/portfolio/starr',
      tag: 'MULTI-LOCATION',
      result: 'Two locations, one system — every booking syncs to calendar instantly.',
    },
    {
      name: 'FlawlessSkin',
      loc: 'Hall Green, Birmingham',
      buildTime: '7 days',
      url: 'https://flawless-skin.co.uk',
      preview: '/flawlessskin-preview.png',
      grad: `linear-gradient(135deg, ${goldTint}, ${blush})`,
      caseStudy: '/portfolio/flawlessskin',
      tag: 'CORE BUILD',
      result: 'Booking enquiries doubled in the first month. Clients actually book now instead of just following.',
    },
  ];

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    pauseAuto();
    isDraggingRef.current = true;
    setIsDragging(true);
    startX.current = e.pageX;
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;

    // Disable snap so manual scroll isn't fought by the browser
    if (scrollRef.current) scrollRef.current.style.scrollSnapType = 'none';

    const handleMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current || !scrollRef.current) return;
      ev.preventDefault();
      scrollRef.current.scrollLeft = scrollLeftRef.current - (ev.pageX - startX.current);
    };

    const handleUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      // Re-enable snap after a tick so the browser can settle
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.style.scrollSnapType = 'x mandatory';
      });
      scheduleResume();
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  const onTouchStart = () => { pauseAuto(); };
  const onTouchEnd = () => { scheduleResume(); };

  const cardW = isMobile ? 'min(82vw, 340px)' : '440px';
  const padLeft = isMobile ? '24px' : 'max(24px, calc((100vw - 1200px) / 2 + 32px))';

  return (
    <section id="work" ref={sectionRef as React.RefObject<HTMLDivElement>} style={{ background: cream, padding: isMobile ? '64px 0 52px' : '100px 0 72px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 24px' : '0 32px', marginBottom: 48 }}>
        <FadeIn><Overline>Recent Builds</Overline></FadeIn>
        <FadeIn delay={0.1}><SectionHead regular="Websites that" italic="book themselves" /></FadeIn>
      </div>

      {/* Desktop: 3-col grid | Mobile: drag carousel */}
      {isMobile ? (
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch' as any,
          cursor: isDragging ? 'grabbing' : 'grab',
          paddingLeft: padLeft,
          paddingRight: padLeft,
          paddingBottom: 4,
          scrollbarWidth: 'none' as any,
          userSelect: 'none',
        }}
      >
        {clients.map((c, i) => (
          <div
            key={i}
            onClick={() => !isDragging && navigate(c.caseStudy)}
            style={{
              flexShrink: 0,
              width: cardW,
              scrollSnapAlign: 'start',
              background: surface,
              border: `1px solid ${line}`,
              borderRadius: 18,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'box-shadow 0.25s, transform 0.25s',
              position: 'relative',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(196,168,130,0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            {/* Browser chrome */}
            <div style={{ background: '#F0EDE7', borderBottom: `1px solid ${line}`, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5816A', display: 'inline-block' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F0C05A', display: 'inline-block' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#72B87A', display: 'inline-block' }} />
              <span style={{ flex: 1, background: 'rgba(26,26,28,0.06)', borderRadius: 4, height: 18, marginLeft: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: BODY, fontSize: 8, color: inkMute, letterSpacing: '0.02em' }}>{c.url.replace('https://', '')}</span>
              </span>
            </div>
            {/* Screenshot */}
            <div style={{ aspectRatio: '16/10', background: c.grad, overflow: 'hidden' }}>
              {c.preview ? (
                <img src={c.preview} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', pointerEvents: 'none' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: 'rgba(26,26,28,0.18)' }}>{c.name}</span>
                </div>
              )}
            </div>
            {/* Info panel */}
            <div style={{ padding: '22px 24px 26px' }}>
              <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: gold, border: `1px solid rgba(196,168,130,0.4)`, borderRadius: 20, padding: '4px 10px', display: 'inline-block', marginBottom: 14 }}>{c.tag}</span>
              <h3 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 26, color: charcoal, margin: '0 0 4px', lineHeight: 1.1 }}>{c.name}</h3>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: gold, margin: '0 0 14px' }}>{c.loc} · {c.buildTime}</p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.65, margin: '0 0 20px' }}>{c.result}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: `1px solid ${line}`, paddingTop: 18 }}>
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: charcoal, textDecoration: 'none' }}>
                  View site →
                </a>
                <a href={c.caseStudy}
                  onClick={e => { e.preventDefault(); e.stopPropagation(); navigate(c.caseStudy); }}
                  style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: gold, textDecoration: 'none' }}>
                  Case study →
                </a>
              </div>
            </div>
            <span style={{ position: 'absolute', bottom: 16, right: 20, fontFamily: DISP, fontStyle: 'italic', fontSize: 72, color: gold, opacity: 0.11, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
      ) : (
      /* Desktop 3-column grid */
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {clients.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                onClick={() => navigate(c.caseStudy)}
                style={{
                  background: surface,
                  border: `1px solid ${line}`,
                  borderRadius: 18,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s, transform 0.25s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(196,168,130,0.2)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Browser chrome */}
                <div style={{ background: '#F0EDE7', borderBottom: `1px solid ${line}`, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5816A', display: 'inline-block' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F0C05A', display: 'inline-block' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#72B87A', display: 'inline-block' }} />
                  <span style={{ flex: 1, background: 'rgba(26,26,28,0.06)', borderRadius: 4, height: 18, marginLeft: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: BODY, fontSize: 8, color: inkMute, letterSpacing: '0.02em' }}>{c.url.replace('https://', '')}</span>
                  </span>
                </div>
                {/* Screenshot */}
                <div style={{ aspectRatio: '16/10', background: c.grad, overflow: 'hidden' }}>
                  {c.preview ? (
                    <img src={c.preview} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', pointerEvents: 'none' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 22, color: 'rgba(26,26,28,0.18)' }}>{c.name}</span>
                    </div>
                  )}
                </div>
                {/* Info panel */}
                <div style={{ padding: '20px 22px 24px' }}>
                  <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: gold, border: `1px solid rgba(196,168,130,0.4)`, borderRadius: 20, padding: '4px 10px', display: 'inline-block', marginBottom: 12 }}>{c.tag}</span>
                  <h3 style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 24, color: charcoal, margin: '0 0 4px', lineHeight: 1.1 }}>{c.name}</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: gold, margin: '0 0 12px' }}>{c.loc} · {c.buildTime}</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.65, margin: '0 0 18px', minHeight: '40px' }}>{c.result}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: `1px solid ${line}`, paddingTop: 16 }}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: charcoal, textDecoration: 'none' }}>
                      View site →
                    </a>
                    <a href={c.caseStudy}
                      onClick={e => { e.preventDefault(); e.stopPropagation(); navigate(c.caseStudy); }}
                      style={{ fontFamily: BODY, fontWeight: 400, fontSize: 13, color: gold, textDecoration: 'none' }}>
                      Case study →
                    </a>
                  </div>
                </div>
                <span style={{ position: 'absolute', bottom: 16, right: 20, fontFamily: DISP, fontStyle: 'italic', fontSize: 72, color: gold, opacity: 0.11, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      )}

    </section>
  );
}

/* ─── Bento Grid ─── */
function Bento() {
  const isMobile = useIsMobile();

  const card4 = (
    <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: isMobile ? 20 : 28, height: '100%' }}>
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
      <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: gold, lineHeight: 1.68, margin: 0 }}>Answers treatment questions and converts enquiries into bookings. 24/7. Automatically.</p>
    </div>
  );

  return (
    <section style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, padding: isMobile ? '48px 16px' : '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px' }}>
        <FadeIn><Overline>What's Included</Overline></FadeIn>
        <FadeIn delay={0.1} style={{ marginBottom: 36 }}><SectionHead regular="Everything your clinic" italic="actually needs" /></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1.4fr 1fr', gap: isMobile ? 10 : 16 }}>
          {/* Card 1 — Calendar */}
          <FadeIn delay={0.1}>
            <div style={{ background: cream, border: `1px solid rgba(201,169,97,0.28)`, borderLeft: `3px solid ${gold}`, borderRadius: 14, padding: isMobile ? 16 : 36, height: '100%' }}>
              <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: isMobile ? 13 : 20, color: charcoal, lineHeight: 1.3, margin: isMobile ? '0 0 6px' : '0 0 14px' }}>
                {isMobile ? 'Your own booking system.' : <>Your own booking system.<br />Your brand. Zero middlemen.</>}
              </h3>
              {!isMobile && (
                <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, lineHeight: 1.78, margin: 0 }}>
                  No Fresha. No Booksy. No monthly fees to third-party platforms eating into your revenue. Your clients book directly on your site — your calendar, your rules.
                </p>
              )}
              <CalBento />
            </div>
          </FadeIn>
          {/* Right column — Cards 2 + 3 (+ Card 4 on desktop) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 16 }}>
            {/* Card 2 — Instagram & TikTok */}
            <FadeIn delay={0.15}>
              <div style={{ background: surface, border: `1px solid ${line}`, borderRadius: 14, padding: isMobile ? 14 : 28, display: 'flex', gap: isMobile ? 10 : 16, alignItems: 'flex-start' }}>
                <div style={{ width: isMobile ? 32 : 48, height: isMobile ? 52 : 80, background: charcoal, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width={isMobile ? 14 : 20} height={isMobile ? 14 : 20} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: isMobile ? 15 : 16, color: charcoal, margin: isMobile ? '0 0 4px' : '0 0 8px', lineHeight: 1.3 }}>Instagram<br />&amp; TikTok<br />Ready!</h3>
                  {!isMobile && <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.68, margin: 0 }}>Optimised for mobile where your clients actually find you. Loads in under 2 seconds.</p>}
                  
                </div>
              </div>
            </FadeIn>
            {/* Card 3 — SMS */}
            <FadeIn delay={0.2}>
              <div style={{ background: blush, borderRadius: 14, padding: isMobile ? 14 : 28 }}>
                <div style={{ background: charcoal, borderRadius: '10px 10px 10px 3px', padding: isMobile ? '8px 10px' : '12px 14px', marginBottom: 8 }}>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 9 : 11, color: cream, margin: 0, lineHeight: 1.55 }}>
                    {isMobile ? 'Hi Sarah 💋 Confirmed for Fri 16 May at 2pm! — FlawlessSkin' : 'Hi Sarah 💋 Your Russian Lips appointment is confirmed for Fri 16 May at 2pm. See you then! — FlawlessSkin'}
                  </p>
                </div>
                {!isMobile && (
                  <div style={{ background: surface, borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 0 }}>
                    <Mail size={12} color={inkMute} />
                    <div>
                      <p style={{ fontFamily: BODY, fontSize: 10, fontWeight: 500, color: charcoal, margin: 0 }}>Your booking — confirmed ✓</p>
                      <p style={{ fontFamily: BODY, fontSize: 9, fontWeight: 300, color: inkMute, margin: 0 }}>Hi Sarah, we look forward to...</p>
                    </div>
                    <span style={{ marginLeft: 'auto', background: sage, color: surface, borderRadius: 4, padding: '2px 6px', fontFamily: BODY, fontSize: 8, fontWeight: 500 }}>Delivered</span>
                  </div>
                )}
                <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: isMobile ? 12 : 15, color: gold, margin: isMobile ? '8px 0 0' : '14px 0 6px', lineHeight: 1.3 }}>
                  {isMobile ? 'Auto SMS + email' : 'Automatic SMS + email confirmations'}
                </h3>
                {!isMobile && <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: inkSoft, lineHeight: 1.68, margin: 0 }}>Every booking triggers instant confirmations. Zero admin. Zero no-shows chasing.</p>}
              </div>
            </FadeIn>
            {/* Card 4 — desktop only in right column */}
            {!isMobile && (
              <FadeIn delay={0.25}>{card4}</FadeIn>
            )}
          </div>
          {/* Cards 4 + 5 — mobile: side-by-side in their own 2-col sub-grid | desktop: separate */}
          {isMobile ? (
            <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignItems: 'stretch' }}>
              <FadeIn delay={0.25} style={{ height: '100%' }}>{card4}</FadeIn>
              <FadeIn delay={0.3} style={{ height: '100%' }}>
              <div style={{ background: charcoal, borderRadius: 14, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' }}>
                <div>
                  <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: cream, margin: '0 0 8px', lineHeight: 1.35 }}>Deposits &amp; no-show protection</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: gold, lineHeight: 1.6, margin: 0 }}>Set a fixed fee or % — collected automatically. No more no-shows.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['No more last-minute cancellations', 'Custom fixed fee or % per treatment', 'Refund policy enforced automatically', 'Bank-grade Stripe security'].map(pt => (
                    <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: gold, flexShrink: 0 }} />
                      <span style={{ fontFamily: BODY, fontSize: 9.5, fontWeight: 300, color: 'rgba(247,244,238,0.65)', lineHeight: 1.4 }}>{pt}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: charcoalSoft, borderRadius: 10, padding: '12px 10px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 8, right: 8 }}>
                    <span style={{ background: sage, color: surface, fontFamily: BODY, fontSize: 7, fontWeight: 500, borderRadius: 3, padding: '2px 5px' }}>SECURED</span>
                  </div>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: 'rgba(247,244,238,0.45)', letterSpacing: '0.12em', margin: '14px 0 4px' }}>•••• •••• 4242</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span style={{ fontFamily: BODY, fontSize: 9, color: gold }}>Stripe-secured</span>
                  </div>
                </div>
              </div>
              </FadeIn>
            </div>
          ) : (
            <FadeIn delay={0.3} style={{ gridColumn: '1 / -1' }}>
              <div style={{ background: charcoal, borderRadius: 14, padding: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: BODY, fontWeight: 500, fontSize: 20, color: cream, margin: '0 0 14px', lineHeight: 1.35 }}>Deposits & no-show protection</h3>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: 'rgba(247,244,238,0.6)', lineHeight: 1.78, margin: 0, maxWidth: 380 }}>
                    Set a fixed fee or percentage deposit per treatment — customisable in your portal. Collected automatically at booking. No more cancellations, no more lost revenue.
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
const PRICING_PLANS = [
  {
    name: 'Core',
    build: '£1,499',
    monthly: 'from £19.99/mo',
    desc: 'The complete clinic system. No third-party platforms.',
    features: [
      'Full bespoke multi-page website',
      'YOUR OWN branded booking platform',
      '50% Stripe deposits',
      'Automated SMS + email confirmations',
      'Private admin portal',
      'Mobile-first, loads in under 2s',
      'Custom domain + hosting included',
    ],
    cta: 'Book a Call',
    hero: true,
    light: true,
  },
  {
    name: 'Premium',
    build: '£2,499',
    monthly: 'from £59.99/mo',
    desc: 'Everything in Core, plus AI that books clients for you.',
    features: [
      'Everything in Core',
      'AI trained on your treatments',
      'Books enquiries 24/7 automatically',
      'Multi-practitioner management',
      'Analytics & insights dashboard',
      'Priority support & updates',
    ],
    cta: 'Enquire Now',
    hero: false,
    light: false,
  },
];

const CUSTOM_FEATURES = [
  ['Everything in Core & Premium', 'Loyalty schemes & memberships'],
  ['Training academies & courses', 'Multi-location & franchise setups'],
  ['Online stores & e-commerce', 'Any feature or integration you need'],
];

/* ─── Book Slot Modal ─── */
function BookSlotModal({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile();
  const goToPay = () => {
    onClose();
    window.history.pushState({}, '', '/pay');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  const terms = [
    { label: '£99 deposit today', sub: 'Deducted from your package price' },
    { label: '50% on kickoff', sub: 'Once we start building your site' },
    { label: '50% on completion', sub: 'When your site goes live' },
  ];
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,28,0.72)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: surface, borderRadius: 20, border: `1px solid ${line}`, padding: isMobile ? '28px 24px' : '40px 44px', maxWidth: 460, width: '100%', position: 'relative' }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: inkMute, fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
        {/* Header */}
        <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: gold, margin: '0 0 10px' }}>Build Queue</p>
        <h2 style={{ fontFamily: BODY, fontWeight: 700, fontSize: isMobile ? 22 : 26, color: charcoal, margin: '0 0 8px', lineHeight: 1.2 }}>Secure your build slot</h2>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 14, color: inkSoft, lineHeight: 1.7, margin: '0 0 28px' }}>
          We take a <strong style={{ color: charcoal, fontWeight: 600 }}>£99 deposit</strong> to hold your place in our build queue. This comes straight off the cost of your package.
        </p>
        {/* Payment schedule */}
        <div style={{ background: cream, borderRadius: 12, padding: '20px 20px', marginBottom: 28 }}>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: inkMute, margin: '0 0 16px' }}>Payment Schedule</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {terms.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 10, color: cream }}>{i + 1}</span>
                </span>
                <div>
                  <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: charcoal, margin: 0 }}>{t.label}</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: inkMute, margin: 0 }}>{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Primary CTA */}
        <button
          onClick={goToPay}
          style={{ width: '100%', background: charcoal, color: cream, border: 'none', borderRadius: 999, padding: '14px 24px', fontFamily: BODY, fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 12, letterSpacing: '0.01em' }}>
          Pay £99 Deposit Now →
        </button>
        {/* Secondary */}
        <div style={{ textAlign: 'center' }}>
          <a href="https://wa.me/447495963388" target="_blank" rel="noreferrer" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: gold, textDecoration: 'none', letterSpacing: '0.02em' }}>
            Have questions? Message us on WhatsApp →
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function PricingCard({ plan, open, onToggle, onBookSlot }: { plan: typeof PRICING_PLANS[0]; open: boolean; onToggle: () => void; onBookSlot: () => void }) {
  const isMobile = useIsMobile();
  const divider = plan.hero ? 'rgba(201,169,97,0.2)' : line;
  const textCol = plan.hero ? 'rgba(247,244,238,0.75)' : inkSoft;
  const labelCol = plan.hero ? cream : charcoal;

  return (
    <div className="pricing-card" style={{
      background: plan.hero ? charcoal : surface,
      border: plan.hero ? `2px solid ${gold}` : `1px solid ${line}`,
      borderRadius: 16,
      padding: isMobile ? '20px 16px' : 32,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
    }}>
      {plan.hero && (
        <div style={{ position: 'absolute', top: -13, left: isMobile ? 16 : '50%', transform: isMobile ? 'none' : 'translateX(-50%)', background: goldTint, color: goldHover, fontFamily: BODY, fontWeight: 600, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '4px 12px', borderRadius: 999, whiteSpace: 'nowrap', border: `1px solid ${gold}` }}>
          Most Popular
        </div>
      )}
      {/* Name + price — flex:1 so this section grows, pinning CTAs to the bottom */}
      <div style={{ paddingTop: plan.hero ? 8 : 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: isMobile ? 18 : 22, color: labelCol, margin: '0 0 6px' }}>{plan.name}</p>
        <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 11 : 13, color: gold, lineHeight: 1.55, margin: '0 0 16px', minHeight: isMobile ? '51px' : '61px' }}>{plan.desc}</p>
        <p style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, fontSize: isMobile ? '1.5rem' : '2rem', color: labelCol, margin: '0 0 2px', lineHeight: 1.1 }}>
          {plan.build} <span style={{ fontFamily: BODY, fontStyle: 'normal', fontWeight: 300, fontSize: isMobile ? 10 : 12, color: textCol }}>build</span>
        </p>
        <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: isMobile ? 11 : 13, color: gold, margin: '0 0 4px' }}>+ {plan.monthly}</p>
        <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: isMobile ? 9 : 10, color: 'rgba(196,168,130,0.6)', margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>90 Days Free</p>
      </div>
      {/* Divider */}
      <div style={{ height: 1, background: divider, margin: '20px 0 16px' }} />
      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <button
          onClick={onBookSlot}
          style={{ width: '100%', boxSizing: 'border-box', background: plan.hero ? cream : charcoal, color: plan.hero ? charcoal : cream, border: 'none', borderRadius: 8, padding: '10px 16px', fontFamily: BODY, fontWeight: 600, fontSize: 13, lineHeight: 1, cursor: 'pointer', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
          Book Build Slot
        </button>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          style={{ boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, border: plan.hero ? '1px solid rgba(196,168,130,0.3)' : '1px solid rgba(26,26,28,0.14)', background: 'transparent', color: plan.hero ? 'rgba(247,244,238,0.75)' : charcoal, fontFamily: BODY, fontWeight: 500, fontSize: 13, lineHeight: 1, cursor: 'pointer', textDecoration: 'none', letterSpacing: '0.01em' }}>
          <FaWhatsapp size={12} color={gold} />
          Book a Call
        </a>
      </div>
      {/* Feature toggle */}
      <button
        onClick={onToggle}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: open ? 14 : 0 }}>
        <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: textCol }}>{open ? 'Hide Features' : "What's Included"}</span>
        <ChevronDown size={12} color={gold} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
      </button>
      {open && (
        <div>
          {plan.features.map(t => (
            <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 9 }}>
              <span style={{ color: gold, fontSize: 9, marginTop: 3, flexShrink: 0 }}>◆</span>
              <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 11 : 13, color: textCol, lineHeight: 1.55 }}>{t}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const ROI_STATS = [
  { pct: '94%',  label: 'of clinics fully recoup their build fee within 60 days of going live' },
  { pct: '£2.4k', label: 'average extra monthly revenue generated within the first 3 months' },
  { pct: '3.2×', label: 'average return on investment in year one — tracked in real bookings' },
];

function Pricing() {
  const isMobile = useIsMobile();
  const [featOpen, setFeatOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="pricing" style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, padding: isMobile ? '72px 16px' : '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient gold glow */}
      <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(196,168,130,0.16) 0%, transparent 68%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 0 : '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Giant heartbeat INVESTMENT */}
        <FadeIn style={{ textAlign: 'center', marginBottom: isMobile ? 6 : 8 }}>
          <span className="investment-heartbeat" style={{
            fontFamily: BODY, fontWeight: 800,
            fontSize: isMobile ? 'clamp(3.2rem,13vw,4.4rem)' : 'clamp(5rem,9vw,8.5rem)',
            letterSpacing: '-0.03em', color: gold,
            display: 'inline-block', lineHeight: 0.95,
          }}>
            INVESTMENT
          </span>
        </FadeIn>
        <FadeIn delay={0.1} style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
          <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: isMobile ? '1.1rem' : '1.6rem', color: charcoal, margin: 0, opacity: 0.65, letterSpacing: '0.01em' }}>
            not a cost — a revenue engine
          </p>
        </FadeIn>

        {/* ROI Stats block */}
        <FadeIn delay={0.18}>
          <div style={{
            background: charcoal,
            borderRadius: 16,
            padding: isMobile ? '20px 16px' : '36px 48px',
            border: `1px solid rgba(196,168,130,0.22)`,
            boxShadow: '0 8px 40px rgba(26,26,28,0.18), 0 0 0 1px rgba(196,168,130,0.06)',
            marginBottom: isMobile ? 24 : 40,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: 480, height: 260, background: 'radial-gradient(ellipse, rgba(196,168,130,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 7, textTransform: 'uppercase' as const, letterSpacing: '0.32em', color: 'rgba(196,168,130,0.45)', textAlign: 'center', margin: `0 0 ${isMobile ? 16 : 24}px` }}>
              Real results · Real clinics · Real money
            </p>
            {/* 3-col grid on all breakpoints */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, position: 'relative', zIndex: 1 }}>
              {ROI_STATS.map((s, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: isMobile ? '0 8px' : '0 32px',
                  borderRight: i < 2 ? '1px solid rgba(196,168,130,0.1)' : 'none',
                }}>
                  <p style={{
                    fontFamily: DISP, fontStyle: 'italic',
                    fontSize: isMobile ? '1.75rem' : '3.2rem',
                    color: gold, lineHeight: 1, margin: `0 0 ${isMobile ? 6 : 10}px`,
                    textShadow: '0 0 28px rgba(196,168,130,0.6)',
                  }}>{s.pct}</p>
                  <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 9 : 12, color: 'rgba(247,244,238,0.45)', lineHeight: 1.5, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(196,168,130,0.08)', marginTop: isMobile ? 16 : 24, paddingTop: isMobile ? 14 : 18, textAlign: 'center' }}>
              <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: isMobile ? 10 : 12, color: 'rgba(196,168,130,0.65)', margin: 0, lineHeight: 1.65 }}>
                8–12 extra bookings in the first 30 days. At £80–£150 per treatment — <em style={{ fontFamily: DISP, fontStyle: 'italic' }}>that's your build fee back, twice over.</em>
              </p>
              <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 9, color: 'rgba(196,168,130,0.28)', margin: '8px 0 0', letterSpacing: '0.04em' }}>
                Results may vary depending on clinic size, marketing &amp; content.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Plans grid — 2-col on both mobile and desktop */}
        <FadeIn delay={0.22}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 10 : 24, alignItems: 'stretch' }}>
            {PRICING_PLANS.map((plan) => (
              <div key={plan.name} style={{ paddingTop: 13, display: 'flex', flexDirection: 'column' }}>
                <PricingCard plan={plan} open={featOpen} onToggle={() => setFeatOpen(o => !o)} onBookSlot={() => setShowModal(true)} />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Custom Builds */}
        <FadeIn delay={0.25}>
          <div style={{ background: charcoal, borderRadius: 16, padding: isMobile ? '28px 20px' : '40px 48px', marginTop: isMobile ? 16 : 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: isMobile ? 22 : 28, color: cream, margin: 0 }}>Custom Builds</h3>
              <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.18em', color: gold, border: `1px solid ${gold}`, borderRadius: 999, padding: '4px 10px' }}>Tailored</span>
            </div>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 13 : 15, color: gold, margin: '0 0 28px' }}>Built from scratch to your exact spec.</p>
            <p style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, fontSize: isMobile ? '2rem' : '2.6rem', color: cream, margin: '0 0 4px', lineHeight: 1 }}>from £3,000+</p>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 11 : 13, color: gold, margin: '0 0 28px' }}>Quoted based on requirements</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '12px 16px' : '16px 32px', marginBottom: 28 }}>
              {CUSTOM_FEATURES.flat().map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: gold, fontSize: 9, marginTop: 3, flexShrink: 0 }}>◆</span>
                  <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 11 : 13, color: 'rgba(247,244,238,0.8)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'rgba(201,169,97,0.2)', marginBottom: 24 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 32px', borderRadius: 8, border: 'none', background: cream, color: charcoal, fontFamily: BODY, fontWeight: 600, fontSize: 13, lineHeight: 1, cursor: 'pointer', textDecoration: 'none', letterSpacing: '0.02em' }}>
                <FaWhatsapp size={12} color={charcoal} />
                Book a Call
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: gold, textAlign: 'center', marginTop: 20 }}>
            All builds include hosting, ongoing support &amp; security. Every quote is bespoke.
          </p>
        </FadeIn>
      </div>
      <AnimatePresence>{showModal && <BookSlotModal onClose={() => setShowModal(false)} />}</AnimatePresence>
    </section>
  );
}

/* ─── Flexible Payment ─── */
function FlexiblePayment() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: surface, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`, padding: isMobile ? '24px 20px' : '28px 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? 0 : '0 32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? 16 : 0 }}>
        <FadeIn style={{ flex: '0 0 auto' }}>
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '0.28em', color: gold, margin: '0 0 4px' }}>Flexible Payment</p>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 13 : 14, color: inkSoft, margin: 0, lineHeight: 1.4 }}>
              Spread the cost — 0% interest options available.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1} style={{ flex: '0 0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 24 }}>
            {/* Klarna pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFB3C7', borderRadius: 8, padding: '5px 12px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.5 2.5C5.5 2.5 5.5 9 2.5 13.5H5C5 13.5 6.5 10.5 6.5 7V2.5H5.5Z" fill="#17120F"/>
                <path d="M11 2.5C11 2.5 11 6.5 8.5 8.5L11 13.5H13.5L11 8.5C12.5 7 13.5 5 13.5 2.5H11Z" fill="#17120F"/>
                <circle cx="12.25" cy="12.25" r="1.25" fill="#17120F"/>
              </svg>
              <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12, color: '#17120F', letterSpacing: '-0.01em' }}>Klarna</span>
            </div>
            {/* Clearpay pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#B2FCE4', borderRadius: 8, padding: '5px 12px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect width="16" height="16" rx="4" fill="#B2FCE4"/>
                <path d="M4 8.5L6.5 11L12 5.5" stroke="#00796B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12, color: '#00796B', letterSpacing: '-0.01em' }}>Clearpay</span>
            </div>
            {/* PayPal pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EEF3FB', borderRadius: 8, padding: '5px 12px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4.5 2h5.2a3.3 3.3 0 0 1 3.3 3.7C12.6 7.6 11 9 9.2 9H7.5l-.8 4.5H4.2L4.5 2z" fill="#009CDE"/>
                <path d="M5.5 4.5h3.8a2 2 0 0 1 2 2.2C11 7.9 10 9 8.5 9H7l-.6 3.5H4.5l1-8z" fill="#003087"/>
              </svg>
              <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12, color: '#003087', letterSpacing: '-0.01em' }}>PayPal</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Maintenance Plans ─── */
const MAINT_PLANS = [
  {
    tag: 'CORE',
    from: true,
    price: '£19.99',
    period: '/mo',
    features: ['Hosting, SSL & database', 'Security maintenance', 'Changes billed separately'],
    waMsg: "Hi Sim, I'm interested in the Core maintenance plan for my clinic!",
  },
  {
    tag: 'CORE + CHANGES',
    from: false,
    price: '£34.99',
    period: '/mo',
    features: ['Everything in Core', '4 hrs of site changes per month', 'Copy, prices & tweaks'],
    highlight: true,
    waMsg: "Hi Sim, I'm interested in the Core + Changes maintenance plan for my clinic!",
  },
  {
    tag: 'PREMIUM PLUS',
    from: true,
    price: '£59.99',
    period: '/mo',
    features: ['Branded SMS sender ID', 'AI receptionist — always on', '£10p/m SMS campaign credit'],
    waMsg: "Hi Sim, I'm interested in the Premium Plus maintenance plan for my clinic!",
  },
  {
    tag: 'CUSTOM BUILD',
    from: true,
    price: '£59.99',
    period: '/mo',
    features: ['All Premium Plus features', 'Bespoke feature set', 'Fee confirmed per project'],
    waMsg: "Hi Sim, I'm interested in the Custom Build maintenance plan for my clinic!",
  },
];

function MaintCard({ p, size }: { p: typeof MAINT_PLANS[0]; size: 'mobile' | 'desktop' }) {
  const mob = size === 'mobile';
  return (
    <div style={{
      background: p.highlight ? 'rgba(196,168,130,0.10)' : 'rgba(255,255,255,0.03)',
      border: p.highlight ? `1.5px solid rgba(196,168,130,0.55)` : `1px solid rgba(255,255,255,0.09)`,
      borderRadius: 20,
      padding: mob ? '32px 28px' : '28px 24px',
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100%',
      boxSizing: 'border-box' as const,
      position: 'relative' as const,
      overflow: 'hidden' as const,
    }}>
      {/* Subtle corner glow on highlighted card */}
      {p.highlight && (
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      )}

      {/* Tag + optional "most popular" badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: mob ? 24 : 18 }}>
        <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: gold, margin: 0, opacity: p.highlight ? 1 : 0.75 }}>
          {p.tag}
        </p>
        {p.highlight && (
          <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: charcoal, background: gold, borderRadius: 999, padding: '3px 10px' }}>
            Popular
          </span>
        )}
      </div>

      {/* Price */}
      <div style={{ marginBottom: mob ? 28 : 20 }}>
        {p.from && (
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: 'rgba(247,244,238,0.35)', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>from</span>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: mob ? 52 : 38, color: p.highlight ? gold : cream, lineHeight: 1 }}>
            {p.price}
          </span>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 13, color: 'rgba(247,244,238,0.35)' }}>{p.period}</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: p.highlight ? 'rgba(196,168,130,0.2)' : 'rgba(255,255,255,0.07)', marginBottom: mob ? 24 : 18 }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', margin: '0 0 auto', padding: 0, display: 'flex', flexDirection: 'column', gap: mob ? 12 : 10 }}>
        {p.features.map((f, fi) => (
          <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ color: gold, fontSize: 12, lineHeight: '1.5', flexShrink: 0, opacity: p.highlight ? 1 : 0.7 }}>—</span>
            <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: mob ? 14 : 12.5, color: p.highlight ? 'rgba(247,244,238,0.85)' : 'rgba(247,244,238,0.5)', lineHeight: 1.55 }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`https://wa.me/447495963388?text=${encodeURIComponent(p.waMsg ?? '')}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block', marginTop: mob ? 28 : 22 }}
      >
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: BODY, fontWeight: 500, fontSize: mob ? 12 : 11, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: p.highlight ? gold : 'rgba(196,168,130,0.65)',
          borderTop: `1px solid ${p.highlight ? 'rgba(196,168,130,0.28)' : 'rgba(255,255,255,0.07)'}`,
          paddingTop: mob ? 18 : 14,
        }}>
          Get started
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M7.5 3.5l4 3.5-4 3.5" stroke={gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </a>
    </div>
  );
}

function MaintenancePlans() {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      kids.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIdx(closest);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{ background: charcoal, padding: isMobile ? '60px 0' : '88px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.08) 0%, transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-4%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.06) 0%, transparent 68%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ padding: isMobile ? '0 24px' : '0 32px' }}>
          <FadeIn style={{ marginBottom: 6 }}>
            <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: gold, margin: '0 0 12px' }}>
              After launch
            </p>
            <h2 style={{ fontFamily: BODY, fontWeight: 700, fontSize: isMobile ? 'clamp(2rem,8vw,2.8rem)' : 'clamp(2.4rem,3.8vw,3.2rem)', color: cream, margin: 0, lineHeight: 1.04, letterSpacing: '-0.02em' }}>
              MAINTENANCE{' '}
              <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold }}>& Support</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.08} style={{ marginBottom: isMobile ? 36 : 48 }}>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 13.5 : 15, color: 'rgba(247,244,238,0.5)', margin: 0, maxWidth: 440, lineHeight: 1.7 }}>
              Every build includes a 12-month plan. Keep your platform secure and running — upgrade anytime.
            </p>
          </FadeIn>
        </div>

        {isMobile ? (
          <>
            {/* Mobile: snap-scroll carousel */}
            <div
              ref={scrollRef}
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                gap: 14,
                paddingLeft: 24,
                paddingRight: 24,
                paddingBottom: 4,
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
              }}
              className="reviews-carousel"
            >
              {MAINT_PLANS.map((p) => (
                <div key={p.tag} style={{ flexShrink: 0, width: 'calc(100vw - 64px)', scrollSnapAlign: 'center' }}>
                  <MaintCard p={p} size="mobile" />
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
              {MAINT_PLANS.map((p, i) => (
                <button
                  key={p.tag}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (!el) return;
                    const card = el.children[i] as HTMLElement;
                    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
                  }}
                  style={{
                    width: i === activeIdx ? 20 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: i === activeIdx ? gold : 'rgba(196,168,130,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s, background 0.3s',
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          /* Desktop: 4-col grid */
          <div style={{ padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {MAINT_PLANS.map((p, i) => (
              <motion.div key={p.tag}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ height: '100%' }}
              >
                <MaintCard p={p} size="desktop" />
              </motion.div>
            ))}
          </div>
        )}

        {/* T&Cs link */}
        <FadeIn delay={0.2} style={{ textAlign: 'center', marginTop: isMobile ? 32 : 44, padding: isMobile ? '0 24px' : '0 32px' }}>
          <a href="/terms" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: BODY, fontWeight: 300, fontSize: 12, color: 'rgba(247,244,238,0.35)', letterSpacing: '0.04em' }}>
            See T&amp;Cs for more information
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M7.5 3.5l4 3.5-4 3.5" stroke={gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </FadeIn>

      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const REVIEWS = [
  { q: 'Booking enquiries doubled in the first month. Clients actually book now instead of just following.', name: 'FlawlessSkin', biz: 'Birmingham', init: 'F', dark: false },
  { q: 'The site looks more premium than clinics charging double what I do. Clients comment on it every single week.', name: 'Dermadoll', biz: 'Birmingham', init: 'D', dark: true },
  { q: 'From enquiry to deposit — fully automated. I woke up to three confirmed bookings on the first night it went live.', name: 'Starr Beautyy', biz: 'London', init: 'S', dark: false },
];

function Testimonials() {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      kids.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIdx(closest);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  const cardW = 'calc(100vw - 56px)';

  const ReviewCard = ({ r, i }: { r: typeof REVIEWS[0]; i: number }) => (
    <div
      key={i}
      style={{
        background: r.dark ? charcoal : surface,
        border: r.dark ? `1px solid rgba(201,169,97,0.3)` : `1px solid ${line}`,
        borderRadius: 16,
        padding: isMobile ? '28px 24px' : '36px 36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 24,
        boxSizing: 'border-box' as const,
        height: '100%',
      }}
    >
      <div>
        <span style={{ fontFamily: BODY, fontSize: 14, color: gold, letterSpacing: '0.04em', display: 'block', marginBottom: 18 }}>★★★★★</span>
        <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: isMobile ? '1.1rem' : '1.2rem', color: r.dark ? cream : charcoal, lineHeight: 1.72, margin: 0 }}>{r.q}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 22, borderTop: `1px solid ${r.dark ? 'rgba(201,169,97,0.18)' : line}` }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.dark ? 'rgba(201,169,97,0.18)' : goldTint, border: `1px solid ${r.dark ? 'rgba(201,169,97,0.4)' : 'rgba(201,169,97,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: gold }}>{r.init}</span>
        </div>
        <div>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: r.dark ? cream : charcoal, margin: 0 }}>{r.name}</p>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: r.dark ? 'rgba(247,244,238,0.45)' : inkMute, margin: 0 }}>{r.biz}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="results" style={{ background: cream, padding: isMobile ? '64px 0' : '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0' : '0 32px' }}>
        <div style={{ padding: isMobile ? '0 28px' : 0 }}>
          <FadeIn><Overline>Results</Overline></FadeIn>
          <FadeIn delay={0.1} style={{ marginBottom: 48 }}>
            <SectionHead regular="What happens when your site" italic="actually works" size="clamp(2rem,4vw,3rem)" />
          </FadeIn>
        </div>

        {isMobile ? (
          <>
            <div
              ref={scrollRef}
              className="reviews-carousel"
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                gap: 16,
                paddingLeft: 28,
                paddingRight: 28,
                paddingBottom: 4,
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {REVIEWS.map((r, i) => (
                <div key={i} style={{ flexShrink: 0, width: cardW, scrollSnapAlign: 'center' }}>
                  <ReviewCard r={r} i={i} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: activeIdx === i ? 22 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: activeIdx === i ? gold : line,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'stretch' }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <ReviewCard r={r} i={i} />
              </FadeIn>
            ))}
          </div>
        )}
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
    { q: 'Do I still need Fresha or Booksy?', a: 'No — and that\'s the whole point. Our Core and Premium packages include your own fully custom booking system, built directly into your website. Your clients book on YOUR site, in YOUR brand, with no redirects to third-party platforms. No monthly Fresha fees. No Booksy branding. Just your clinic, end to end.' },
    { q: 'Can you integrate my existing Calendly or Fresha?', a: 'Yes — on the Starter package we embed your existing booking tool cleanly into your new site. But most clients switch to our built-in system once they see how much better the experience is for their clients.' },
    { q: 'Does the AI assistant actually book clients?', a: 'Yes. It\'s trained on your specific treatments, prices and availability. It answers questions, qualifies leads and books clients straight into your calendar — automatically, 24/7. Not just a chatbot that says "DM us for more info."' },
    { q: 'Do you offer ongoing support?', a: 'Yes — monthly support plans start at £25/mo and include hosting, security updates, minor content changes and priority support. No long-term contracts. Cancel anytime.' },
  ];
  return (
    <section style={{ background: `linear-gradient(160deg, ${blush} 0%, ${goldTint} 100%)`, padding: isMobile ? '64px 20px' : '100px 0' }}>
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
    <section style={{ background: 'linear-gradient(160deg, #0D0D0E 0%, #1A1A1C 100%)', padding: isMobile ? '52px 24px' : '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Dramatic gold glow — centre */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, background: 'radial-gradient(ellipse at center, rgba(196,168,130,0.18) 0%, transparent 62%)', pointerEvents: 'none' }} />
      {/* Decorative rings */}
      <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: 380, height: 380, borderRadius: '50%', border: '1.5px solid rgba(196,168,130,0.1)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: 280, height: 280, borderRadius: '50%', border: '1.5px solid rgba(196,168,130,0.08)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? 0 : '0 32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.26em', color: gold, marginBottom: 24, opacity: 0.85 }}>
            Limited Summer Slots
          </p>
          <h2 style={{ fontFamily: BODY, fontWeight: 800, fontSize: isMobile ? 'clamp(2.6rem,11vw,3.4rem)' : 'clamp(3rem,5vw,5rem)', color: cream, lineHeight: 1.0, margin: '0', letterSpacing: '-0.02em' }}>
            Stop chasing DMs.<br />
            <em style={{ fontFamily: DISP, fontStyle: 'italic', fontWeight: 400, color: gold, lineHeight: 1.2, textShadow: '0 0 48px rgba(196,168,130,0.5), 0 0 96px rgba(196,168,130,0.2)' }}>
              Start waking up to bookings.
            </em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: isMobile ? 15 : 17, color: 'rgba(247,244,238,0.52)', lineHeight: 1.75, maxWidth: 480, margin: isMobile ? '20px auto 0' : '24px auto 0' }}>
            {getSlotMonth()} slots are filling up. Get your site live and start taking bookings automatically.
          </p>
        </FadeIn>
        <FadeIn delay={0.28}>
          <div style={{ marginTop: 42, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <WaBtn large light label="Message on WhatsApp" />
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 11, color: 'rgba(196,168,130,0.7)', margin: 0, letterSpacing: '0.04em' }}>
              Reply in under 2 hours · Mon–Sat
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: cream, borderTop: `1px solid ${line}` }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '44px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginBottom: 14 }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke={gold} strokeWidth="1.5" />
            <path d="M14 7 L20.5 21 M14 7 L7.5 21 M10.5 16.5 L17.5 16.5" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 12, color: charcoal, letterSpacing: '0.16em', margin: 0, lineHeight: 1 }}>AESTHETIX</p>
            <p style={{ fontFamily: BODY, fontWeight: 300, fontSize: 7.5, color: gold, letterSpacing: '0.24em', margin: 0, lineHeight: 1.6 }}>SYSTEMS</p>
          </div>
        </div>

        {/* Tagline */}
        <p style={{ fontFamily: DISP, fontStyle: 'italic', fontSize: 15, color: gold, margin: '0 0 28px', lineHeight: 1.5, opacity: 0.9 }}>
          We build the digital presence your clinic deserves.
        </p>

        {/* Nav links */}
        <div style={{ textAlign: 'center', marginBottom: 20, lineHeight: 2.4 }}>
          {['Bespoke Websites', 'Booking Systems', 'AI Assistant', 'Ongoing Support'].map((label, i, arr) => (
            <span key={label}>
              <a href="#" style={{ fontFamily: BODY, fontWeight: 300, fontSize: 12, color: inkSoft, textDecoration: 'none', letterSpacing: '0.02em' }}>
                {label}
              </a>
              {i < arr.length - 1 && (
                <span style={{ color: line, margin: '0 12px', fontSize: 10 }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Contact links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 12, color: gold, textDecoration: 'none', letterSpacing: '0.03em' }}>
            WhatsApp →
          </a>
          <a href="https://instagram.com/aesthetix_systems" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 400, fontSize: 12, color: gold, textDecoration: 'none', letterSpacing: '0.03em' }}>
            @aesthetix_systems
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: line, marginBottom: 20, width: '100%' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 20px' }}>
          <span style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, letterSpacing: '0.03em' }}>
            © {new Date().getFullYear()} Aesthetix Systems · London, UK
          </span>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, textDecoration: 'none', letterSpacing: '0.03em' }}>
            Privacy Policy
          </a>
          <a href="/terms" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: BODY, fontWeight: 300, fontSize: 10, color: inkMute, textDecoration: 'none', letterSpacing: '0.03em' }}>
            Terms of Service
          </a>
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
function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', alignItems: 'flex-end', gap: 12, pointerEvents: 'none' }}
        >
          {/* Tooltip label */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                style={{
                  background: charcoal, color: cream, borderRadius: 10,
                  padding: '8px 14px', pointerEvents: 'none', whiteSpace: 'nowrap' as const,
                  fontFamily: BODY, fontWeight: 400, fontSize: 12, letterSpacing: '0.02em',
                  boxShadow: '0 4px 20px rgba(26,26,28,0.22)',
                  marginBottom: 6,
                }}
              >
                Chat with us on WhatsApp
                <span style={{ position: 'absolute', right: -6, bottom: 12, width: 0, height: 0,
                  borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
                  borderLeft: `6px solid ${charcoal}` }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bubble button */}
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              width: 58, height: 58, borderRadius: '50%',
              background: cream,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: hovered
                ? `0 8px 32px rgba(196,168,130,0.45), 0 2px 12px rgba(26,26,28,0.18)`
                : `0 4px 20px rgba(196,168,130,0.28), 0 2px 8px rgba(26,26,28,0.12)`,
              transition: 'box-shadow 0.25s, transform 0.2s',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              pointerEvents: 'auto',
              flexShrink: 0,
              textDecoration: 'none',
              border: `1.5px solid rgba(196,168,130,0.35)`,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M16 2C8.268 2 2 8.268 2 16c0 2.478.668 4.797 1.832 6.789L2 30l7.43-1.8A13.938 13.938 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.54 11.54 0 01-5.88-1.608l-.42-.252-4.41 1.068 1.092-4.302-.276-.444A11.56 11.56 0 014.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.36-8.652c-.348-.174-2.064-1.02-2.382-1.134-.318-.12-.552-.174-.78.174-.234.348-.894 1.134-1.098 1.368-.204.228-.402.258-.75.084-.348-.174-1.47-.543-2.8-1.728-1.032-.924-1.73-2.064-1.932-2.412-.204-.348-.024-.534.15-.708.156-.156.348-.402.522-.6.174-.204.228-.348.348-.582.12-.234.06-.438-.03-.612-.09-.174-.78-1.884-1.074-2.58-.282-.678-.57-.582-.78-.594-.204-.012-.432-.012-.66-.012-.234 0-.612.084-.93.432-.318.348-1.218 1.188-1.218 2.898 0 1.71 1.248 3.36 1.422 3.594.174.234 2.46 3.756 5.958 5.268.834.36 1.482.576 1.992.738.834.264 1.596.228 2.196.138.672-.102 2.064-.846 2.358-1.662.294-.816.294-1.518.204-1.662-.084-.15-.318-.234-.666-.408z"
                fill={gold}
              />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <div style={{ background: cream, minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <Bento />
      <Portfolio />
      <FlexiblePayment />
      <Pricing />
      <MaintenancePlans />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
