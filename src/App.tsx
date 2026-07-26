import { useState, useEffect, useRef } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────
const Ico = {
  home: (<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>),
  grid: (<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>),
  layers: (<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 12 15 2 8.5"/><polyline points="2 15.5 12 22 22 15.5"/><polyline points="2 12 12 18.5 22 12"/></svg>),
  user: (<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>),
  mail: (<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 4 12 13 22 4"/></svg>),
  arrow: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>),
  check: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
  cross: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  wa: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>),
  pin: (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  shield: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
  cart: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>),
  image: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>),
  clock: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  trending: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>),
  star: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
}

// ── Ticker data ────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'Risc zero', 'Comissió per vendes', 'Sense quota fixa', 'Soci de resultats',
  'Risc zero', 'Comissió per vendes', 'Sense quota fixa', 'Soci de resultats',
  'Risc zero', 'Comissió per vendes', 'Sense quota fixa', 'Soci de resultats',
  'Risc zero', 'Comissió per vendes', 'Sense quota fixa', 'Soci de resultats',
]

const HERO_VIDEO_URL = '/video.mp4'
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRrSO93lV4deJT9kc2aatOwaQuCe86q-u3PxiDc1cm6dK69dIf25GvmwX0f-kCPURibg/exec'
const WHATSAPP_URL = 'https://wa.me/34644318333'

// ── Problems we solve ──────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: Ico.cart,
    stat: '70%',
    problem: 'dels teus visitants abandonen el carretó.',
    fix: 'Recuperem vendes perdudes amb seqüències automàtiques i millores de checkout. En 30 dies, ja nota la diferència.',
  },
  {
    icon: Ico.image,
    stat: '—',
    problem: 'Les teves fitxes de producte no venen.',
    fix: 'Optimitzem títols, descripcions, imatges i SEO. El producte no canvia. La conversió, sí.',
  },
  {
    icon: Ico.clock,
    stat: '3x',
    problem: 'massa temps operatiu que no escala.',
    fix: 'Automatitzem comandes, estoc, facturació i atenció al client. Tu recuperes hores per créixer.',
  },
  {
    icon: Ico.trending,
    stat: '0€',
    problem: 'invertits en dades per prendre decisions.',
    fix: 'Dashboard en temps real amb KPIs rellevants. Mai tornaràs a decidir per intuïció.',
  },
  {
    icon: Ico.shield,
    stat: '—',
    problem: 'Pagues a l\'agència tant si vens com si no.',
    fix: 'Nosaltres cobrem un % de les teves vendes. Si no creixem, no cobrem. Punt.',
  },
  {
    icon: Ico.star,
    stat: '+30%',
    problem: 'vendes que et deixes sobre la taula.',
    fix: 'Upsell, cross-sell, fidelització i reactivació. Els teus clients actuals valen molt més del que creus.',
  },
]

// ── Steps ──────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'Diagnosi gratuïta — 1 hora',
    desc: 'Analitzem el teu ecommerce en profunditat: tràfic, conversió, operativa i oportunitats. Surts amb un diagnòstic real i accionable. Sense cost, sense compromís.',
    result: 'Resultat: saps exactament on perds diners.',
  },
  {
    num: '02',
    title: 'Pla d\'acció — sprints setmanals',
    desc: 'Et donem un full de ruta prioritzat. Saps el que farem cada setmana, el que mesurem i quins resultats esperem. Sense caixetes negres, sense sorpreses.',
    result: 'Resultat: un pla clar amb dates i KPIs.',
  },
  {
    num: '03',
    title: 'Execució — resultats en 30 dies',
    desc: 'Implementem els canvis. Tu tens visibilitat total via dashboard en temps real. En 30 dies ja veus els primers resultats. Ens comprometem a aquesta velocitat.',
    result: 'Resultat: millores visibles en el primer mes.',
  },
  {
    num: '04',
    title: 'Escalat — cobrem quan tu guanyes',
    desc: 'Multipliquem les teves vendes i cobrem un % del que generem. El nostre incentiu és el teu creixement. No hi ha conflicte d\'interessos.',
    result: 'Resultat: un soci alineat amb el teu negoci.',
  },
]

// ── Commission tiers ───────────────────────────────────────────────────────
const TIERS = [
  { range: 'Fins a 1.000€/mes', pct: '12%', note: 'Inici sense risc' },
  { range: '1.000 – 10.000€/mes', pct: '10%', note: 'Creixement actiu' },
  { range: '10.000 – 40.000€/mes', pct: '8%', note: 'Escala accelerada' },
  { range: 'Més de 40.000€/mes', pct: '7%', note: 'Soci estratègic', highlight: true },
]

// ── Why us ─────────────────────────────────────────────────────────────────
const WHY = [
  {
    them: 'Les agències cobren per hores.',
    us: 'Nosaltres cobrem per vendes generades. El nostre incentiu és el teu creixement.',
  },
  {
    them: 'Les agències triguen 2 setmanes a moure\'s.',
    us: 'Nosaltres actuem en 48h. Cada dia que no optimitzem és un dia que perds diners.',
  },
  {
    them: 'Les agències et passen d\'account en account.',
    us: 'Treballes sempre amb Oriol. Un interlocutor, una responsabilitat, zero intermediaris.',
  },
  {
    them: 'Les agències t\'envien reportings opacs.',
    us: 'Dashboard en temps real. Saps en tot moment on ets i per on anem.',
  },
]

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'hero',     label: 'inici',    icon: Ico.home },
  { id: 'serveis',  label: 'serveis',  icon: Ico.grid },
  { id: 'model',    label: 'model',    icon: Ico.layers },
  { id: 'sobre',    label: 'sobre',    icon: Ico.user },
  { id: 'contacte', label: 'contacte', icon: Ico.wa },
]

// ── Counter ────────────────────────────────────────────────────────────────
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let cur = 0
      const step = end / 50
      const t = setInterval(() => {
        cur += step
        if (cur >= end) { setVal(end); clearInterval(t) }
        else setVal(Math.floor(cur))
      }, 28)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('hero')
  const [form, setForm] = useState({ nom: '', email: '', negoci: '', vendes: '' })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const ids = ['hero', 'serveis', 'proces', 'model', 'sobre', 'contacte']
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.2, rootMargin: '-60px 0px 0px 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const params = new URLSearchParams({
        nom: form.nom,
        nombre: form.nom,
        email: form.email,
        negoci: form.negoci,
        vendes: form.vendes,
        telefono: '',
        mensaje: `Botiga: ${form.negoci} | Facturació: ${form.vendes}`,
      })

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })

      if (!response.ok) {
        throw new Error('No s’ha pogut enviar el formulari')
      }

      setSent(true)
    } catch {
      setError('No s’ha pogut enviar el formulari. Torna-ho a provar o escriu-me per WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const navActive = (id: string) => {
    if (id === 'serveis') return active === 'serveis' || active === 'proces'
    if (id === 'model') return active === 'model'
    return active === id
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingBottom: 80 }}>

      {/* ── TOP NAV ── */}
      <header className="top-nav">
        <a href="#" onClick={e => { e.preventDefault(); go('hero') }} className="top-nav-logo">
          Sprint<span style={{ color: '#FF6600' }}>Ops</span>
        </a>
        <ul className="top-nav-links">
          {[['serveis', 'Com funciona'], ['model', 'Model comissió'], ['sobre', 'Qui soc']].map(([id, lbl]) => (
            <li key={id}><a href="#" onClick={e => { e.preventDefault(); go(id) }}>{lbl}</a></li>
          ))}
        </ul>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="nav-cta nav-cta-whatsapp">
          {Ico.wa} PARLEM-NE
        </a>
      </header>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 64, paddingBottom: 160, position: 'relative', overflow: 'hidden' }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <video
            className="hero-video"
            src={HERO_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="hero-video-overlay" />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '55vw', height: '80vh', background: 'radial-gradient(ellipse, rgba(255,102,0,0.1) 0%, transparent 65%)', filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: '40vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(255,102,0,0.05) 0%, transparent 70%)', filter: 'blur(90px)' }} />
        </div>

        <div className="section-wrap" style={{ position: 'relative', zIndex: 2 }}>

          {/* Badge */}
          <div className="proof-badge fade-up d100" style={{ marginTop: 32, marginBottom: 40, display: 'inline-flex' }}>
            <span className="proof-dot" />
            <span>Model de comissió — no pagues fins que venguis</span>
          </div>

          {/* Headline */}
          <h1 className="fade-up d200" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.97, marginBottom: 32, maxWidth: 900 }}>
            El teu ecommerce—<br />
            <span style={{ color: '#FF6600' }}>risc zero.</span><br />
            Cobrem un %<br />
            de les teves vendes.
          </h1>

          <p className="fade-up d350" style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 520, marginBottom: 48 }}>
            No som una agència. Som el teu soci de risc compartit. Si el teu ecommerce no creix, nosaltres no cobrem. Tan senzill com això.
          </p>

          <div className="hero-button-group fade-up d500" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '72px', justifyContent: 'center', alignItems: 'center' }}>
            <button className="btn-primary" style={{ flex: '1 1 0%', minWidth: 0 }} onClick={() => go('contacte')}>
              Explica'ns el teu cas {Ico.arrow}
            </button>
            <button className="btn-ghost" style={{ flex: '1 1 0%', minWidth: 0 }} onClick={() => go('model')}>
              Veure model de negoci
            </button>
          </div>
          {/* Stats — contextualitzats */}
          <div className="fade-up d650" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px 48px', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)', maxWidth: 800 }}>
            {[
              { num: '2,4M€', label: 'en vendes gestionades per als nostres clients' },
              { num: '47+', label: 'projectes completats des de Girona fins Múrcia' },
              { num: '94%', label: 'de clients renoven — perquè veuen resultats' },
              { num: '48h', label: 'és el temps màxim que tardem en posar-nos en marxa' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6, lineHeight: 1.5 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #FF6600, transparent)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <div key={i} className="ticker-item">
              {item}<span className="ticker-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEMES ── */}
      <section id="serveis" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div className="section-wrap">
          <div style={{ marginBottom: 52 }}>
            <span className="section-num">01 — Problemes que resolem</span>
            <h2 className="section-headline" style={{ maxWidth: 700 }}>
              El teu client és al web.<br />
              Però <span style={{ color: '#FF6600' }}>no compra.</span>
            </h2>
            <p className="section-sub" style={{ marginTop: 20 }}>
              No compres un servei. Soluciones un problema concret. Aquí tens els que resolem cada dia.
            </p>
          </div>

          <div className="problems-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                className="service-card-dark"
                style={{
                  borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ color: '#FF6600' }}>{p.icon}</div>
                  {p.stat !== '—' && (
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#FF6600', letterSpacing: '-0.03em' }}>{p.stat}</span>
                  )}
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.45, marginBottom: 12 }}>{p.problem}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{p.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── PROCÉS ── */}
      <section id="proces" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div className="section-wrap">
          <div style={{ marginBottom: 52 }}>
            <span className="section-num">02 — El procés</span>
            <h2 className="section-headline">Del primer contacte—<br />a les primeres vendes.</h2>
          </div>

          <div>
            {STEPS.map((step, i) => (
              <div key={i} className="step-line" style={{ display: 'flex', alignItems: 'flex-start', gap: 32, padding: '36px 0', borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#FF6600', letterSpacing: '-0.04em', lineHeight: 1, minWidth: 70, flexShrink: 0 }}>{step.num}</div>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.78, marginBottom: 14, maxWidth: 600 }}>{step.desc}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#FF6600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    <span style={{ color: '#FF6600' }}>{Ico.check}</span>
                    {step.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODEL COMISSIÓ ── */}
      <section id="model" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: '#0d0d0d' }}>
        <div className="section-wrap">
          <div className="model-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'start' }}>
            <div>
              <span className="section-num">03 — Model de preus</span>
              <h2 className="section-headline" style={{ marginBottom: 20 }}>
                No pagues res<br />fins que<br /><span style={{ color: '#FF6600' }}>comencis a vendre.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
                Cobrem un percentatge de les vendes que generem per a tu. Com més vens, millor per a tots dos. No hi ha cap conflicte d&apos;interessos.
              </p>
              <div style={{ padding: '20px 24px', background: 'rgba(255,102,0,0.08)', borderLeft: '3px solid #FF6600', marginBottom: 32 }}>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                  "Només cobrem quan tu vens. Si el teu ecommerce no creix, nosaltres no cobrem. Ho posem per escrit."
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '10px 0 0 0' }}>— Oriol Martínez, fundador SprintOps</p>
              </div>
              <button className="btn-primary" onClick={() => go('contacte')}>
                Parlem sense compromís {Ico.arrow}
              </button>
            </div>

            {/* Tiers table */}
            <div>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                  Tarifes escalonades — com més vens, menys %
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {TIERS.map((tier, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '20px 24px',
                      background: tier.highlight ? 'rgba(255,102,0,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${tier.highlight ? 'rgba(255,102,0,0.35)' : 'rgba(255,255,255,0.07)'}`,
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{tier.range}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>{tier.note}</div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: tier.highlight ? '#FF6600' : '#fff', letterSpacing: '-0.03em', flexShrink: 0 }}>
                      {tier.pct}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 16, lineHeight: 1.6 }}>
                * Calculat sobre les vendes netes mensuals generades. Mínim de 3 mesos de col·laboració. Sense cost d&apos;entrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PER QUÈ NOSALTRES ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div className="section-wrap">
          <div style={{ marginBottom: 52 }}>
            <span className="section-num">04 — Per què SprintOps</span>
            <h2 className="section-headline" style={{ maxWidth: 720 }}>
              Agències cares. Freelances poc fiables.<br />
              <span style={{ color: '#FF6600' }}>O un soci que cobra per resultats.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {WHY.map((w, i) => (
              <div
                key={i}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: 2,
                }}
              >
                <div style={{ padding: '24px 28px', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{Ico.cross}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{w.them}</span>
                </div>
                <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#FF6600', flexShrink: 0 }}>{Ico.check}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, fontWeight: 500 }}>{w.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── SOBRE ── */}
      <section id="sobre" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div className="section-wrap">
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 'clamp(220px, 28vw, 340px)', height: 'clamp(280px, 36vw, 440px)', overflow: 'hidden', background: '#1a1a1a' }}>
                  <img
                    src="/oriolmartinezpa.jpeg"
                    alt="Oriol Martínez"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ position: 'absolute', bottom: -1, left: -1, right: -1, background: '#FF6600', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.01em' }}>Oriol Martínez</div>
                    <div style={{ fontSize: 11, opacity: 0.8, marginTop: 1 }}>Fundador · SprintOps · Maçanet de la Selva</div>
                  </div>
                  {Ico.arrow}
                </div>
              </div>
            </div>

            <div>
              <span className="section-num">05 — Qui soc</span>
              <h2 className="section-headline" style={{ marginBottom: 24 }}>
                L&apos;Oriol està al darrera.<br />
                <span style={{ color: '#FF6600' }}>Potenciem les teves vendes.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 16 }}>
                Més de 8 anys gestionant ecommerces de totes les mides ens han ensenyat una cosa: el problema mai és el producte, sinó l&apos;execució.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 16 }}>
                A SprintOps ens obsessiona convertir visites en vendes. Ho fem amb estratègia, dades i molta mà al foc. No som una agència tradicional, ni ho volem ser. Som un equip petit, àgil i directe, que s&apos;implica en cada projecte com si fos el nostre.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 16 }}>
                Treballem amb negocis d&apos;arreu, parlant en català o castellà, i sempre amb un objectiu clar: fer créixer els teus números.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 16 }}>
                Si ens truques, respondrem nosaltres. Sense assistents, sense passos intermedis.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 36 }}>
                {Ico.pin}
                <span>Maçanet de la Selva, Girona — treballem per a tota Espanya</span>
              </div>

              <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {[
                  { n: <Counter end={47} suffix="+" />, l: 'Projectes' },
                  { n: '€2,4M', l: 'Revenue generat' },
                  { n: <Counter end={94} suffix="%" />, l: 'Renovació' },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#FF6600', letterSpacing: '-0.02em' }}>{n}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: '0.06em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── CONTACTE ── */}
      <section id="contacte" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
        <div className="section-wrap">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 8vw, 100px)' }}>
            <div>
              <span className="section-num">06 — Comença</span>
              <h2 className="section-headline" style={{ marginBottom: 20 }}>
                Explica&apos;ns el teu cas.<br /><span style={{ color: '#FF6600' }}>Potenciem les teves vendes.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 44 }}>
                Comparteix què passa amb el teu ecommerce: tràfic, conversió, operativa, marge o objectius. Si hi ha potencial, et proposem un pla clar per fer créixer les vendes.
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '18px 24px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', transition: 'border-color 0.2s', background: 'rgba(255,255,255,0.03)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#25D366')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              >
                <span style={{ color: '#25D366' }}>{Ico.wa}</span>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>WhatsApp directe</div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>+34 644 318 333</div>
                </div>
              </a>

              <div style={{ marginTop: 36, padding: '20px 24px', background: 'rgba(255,102,0,0.07)', borderLeft: '3px solid #FF6600' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FF6600', marginBottom: 6 }}>Places limitades</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                  Treballem amb un màxim de 3 nous clients per mes. Això garanteix que cada client tingui l&apos;atenció que mereix.
                </div>
              </div>
            </div>

            <div>
              {sent ? (
                <div style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ color: '#FF6600' }}>{Ico.check}</div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>Missatge enviat.</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Et respondré jo personalment en menys de 24 hores. — Oriol</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  <div className="field">
                    <label className="field-label">Nom i cognom</label>
                    <input className="field-input" type="text" name="nom" placeholder="Martí Puig" value={form.nom} onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} required />
                  </div>
                  <div className="field">
                    <label className="field-label">Correu electrònic</label>
                    <input className="field-input" type="email" name="email" placeholder="hola@botiga.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                  </div>
                  <div className="field">
                    <label className="field-label">URL de la teva botiga</label>
                    <input className="field-input" type="text" name="negoci" placeholder="labotiga.com o https://labotiga.com" value={form.negoci} onChange={e => setForm(p => ({ ...p, negoci: e.target.value }))} />
                  </div>
                  <div className="field">
                    <label className="field-label">El teu cas</label>
                    <input className="field-input" type="text" name="vendes" placeholder="Explica'ns què vols millorar o què et passa..." value={form.vendes} onChange={e => setForm(p => ({ ...p, vendes: e.target.value }))} required />
                  </div>
                  {error ? <div style={{ color: '#ff8a65', fontSize: 13 }}>{error}</div> : null}
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Enviant…' : <>Explica&apos;ns el teu cas {Ico.arrow}</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px clamp(20px, 4vw, 60px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontWeight: 800, letterSpacing: '-0.01em', fontSize: 15 }}>Sprint<span style={{ color: '#FF6600' }}>Ops</span></span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Som de Maçanet de la Selva · Treballem per a tota Espanya · © 2025</span>
      </footer>

      {/* ── BOTTOM NAV ── */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map(item => {
          if (item.id === 'contacte') {
            return (
              <a
                key={item.id}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn nav-btn-wa"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            )
          }

          return (
            <button
              key={item.id}
              className={`nav-btn${navActive(item.id) ? ' active' : ''}`}
              onClick={() => go(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}