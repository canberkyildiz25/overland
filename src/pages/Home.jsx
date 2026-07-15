import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const IMG = {
  hero: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=2000&q=80&fit=crop',
  night: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=1200&q=80&fit=crop',
  fire: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=80&fit=crop',
  dawn: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=1200&q=80&fit=crop',
}

const FEATURES = [
  {
    n: '01',
    title: 'Hand-picked rigs',
    text: 'Every van and 4x4 in the fleet is inspected, kitted, and road-tested before it ever reaches you. No surprises on the trail.',
  },
  {
    n: '02',
    title: 'Off-grid ready',
    text: 'Solar, dual batteries, water tanks and recovery gear as standard. Go where the tarmac ends and stay for as long as you like.',
  },
  {
    n: '03',
    title: 'Book in minutes',
    text: 'Pick your rig, choose your dates, hit the road. Transparent pricing, no hidden fees, cancel up to 48 hours before pickup.',
  },
]

/* lightweight scroll-reveal without extra deps */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els?.length) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.15 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

export default function Home() {
  const navigate = useNavigate()
  const ref = useReveal()

  return (
    <main id="home" ref={ref}>
      {/* HERO */}
      <section className="hero">
        <img className="hero-img" src={IMG.hero} alt="Campervan parked at golden hour" />
        <div className="hero-veil" />
        <div className="hero-content">
          <span className="eyebrow">Est. 2019 — Overland Expeditions</span>
          <h1 className="hero-title">
            THE ROAD<br />IS <em>calling.</em>
          </h1>
          <p className="hero-sub">
            Premium campervans and expedition 4x4s for people who chase the horizon.
            Pick your rig, pack light, and disappear for a while.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/catalog')}>
              Explore the Fleet
            </button>
            <a className="btn-ghost" href="#why">Why Overland</a>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span><i /></div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              Iceland<i>◆</i> Patagonia<i>◆</i> The Alps<i>◆</i> Morocco<i>◆</i>
              Scottish Highlands<i>◆</i> Norway<i>◆</i> The Dolomites<i>◆</i>
            </span>
          ))}
        </div>
      </div>

      {/* WHY / FEATURES */}
      <section className="why" id="why">
        <div className="section-head reveal">
          <span className="eyebrow">Why Overland</span>
          <h2 className="section-title">Not a rental.<br /><em>an expedition.</em></h2>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <div className={`feature reveal`} style={{ transitionDelay: `${i * 0.08}s` }} key={f.n}>
              <span className="feature-n">{f.n}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NIGHT SPLIT */}
      <section className="split">
        <div className="split-media reveal">
          <img src={IMG.night} alt="Campervan under a starry sky" />
        </div>
        <div className="split-text">
          <span className="eyebrow reveal">Sleep under the stars</span>
          <h2 className="section-title reveal">Your bed<br /><em>moves with you.</em></h2>
          <p className="reveal">
            Wake up to a different view every morning. Pop the roof, brew a coffee, and
            watch the sun climb over a landscape you chose the night before. Every rig is a
            home that follows the road.
          </p>
          <div className="stats reveal">
            <div><strong>120+</strong><span>Rigs in the fleet</span></div>
            <div><strong>40</strong><span>Countries covered</span></div>
            <div><strong>4.9</strong><span>Avg. traveller rating</span></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <img className="home-cta-img" src={IMG.fire} alt="Campfire at night" />
        <div className="home-cta-veil" />
        <div className="home-cta-inner reveal">
          <h2>THE HORIZON<br /><em>won't wait.</em></h2>
          <p>Your rig is fuelled, kitted and ready. All that's missing is you.</p>
          <button className="btn-primary" onClick={() => navigate('/catalog')}>
            Find Your Rig
          </button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <span className="footer-logo">OVER<span className="logo-accent">LAND</span></span>
          <p>Premium campervan &amp; expedition hire. Built for people who don't do package holidays.</p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Overland Expeditions Ltd.</span>
          <span>Reykjavík · Chamonix · Queenstown</span>
        </div>
      </footer>
    </main>
  )
}
