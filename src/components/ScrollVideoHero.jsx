import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── Arrow icon ────────────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      className="hero-cta-arrow"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ScrollVideoHero() {
  const sectionRef = useRef(null)
  const layer1Ref = useRef(null)
  const layer2Ref = useRef(null)
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const l1 = layer1Ref.current
    const l2 = layer2Ref.current
    const t1 = text1Ref.current
    const t2 = text2Ref.current
    if (!section || !l1 || !l2 || !t1 || !t2) return

    let heroTop = 0
    let scrollable = 0

    const cacheGeometry = () => {
      heroTop = section.getBoundingClientRect().top + window.scrollY
      scrollable = section.offsetHeight - window.innerHeight
    }
    cacheGeometry()

    const calcProgress = () => {
      if (scrollable <= 0) return 0
      return Math.min(1, Math.max(0, (window.scrollY - heroTop) / scrollable))
    }

    let rafId = null

    const updateVisuals = () => {
      const p = calcProgress()

      // Transition smoothly across the scroll range
      const t = Math.min(1, Math.max(0, (p - 0.04) / 0.78))

      // ── Image 1 & 2 crossfade with subtle scale ──
      l1.style.opacity = (1 - t).toFixed(4)
      l1.style.transform = `scale(${(1.01 - 0.01 * t).toFixed(4)})`

      l2.style.opacity = t.toFixed(4)
      l2.style.transform = `scale(${(1.00 + 0.01 * t).toFixed(4)})`

      // ── State 1 Text: fades out & subtly drifts up ──
      const t1Opacity = Math.max(0, Math.min(1, 1 - t * 1.35))
      const t1Y = -t * 20
      t1.style.opacity = t1Opacity.toFixed(4)
      t1.style.transform = `translateY(${t1Y.toFixed(1)}px)`
      t1.style.pointerEvents = t < 0.5 ? 'auto' : 'none'

      // ── State 2 Text: fades in & settles into place ──
      const t2Opacity = Math.max(0, Math.min(1, (t - 0.25) * 1.35))
      const t2Y = Math.max(0, 20 * (1 - Math.min(1, Math.max(0, (t - 0.25) / 0.75))))
      t2.style.opacity = t2Opacity.toFixed(4)
      t2.style.transform = `translateY(${t2Y.toFixed(1)}px)`
      t2.style.pointerEvents = t >= 0.5 ? 'auto' : 'none'
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        updateVisuals()
        rafId = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => {
      cacheGeometry()
      onScroll()
    }, { passive: true })

    // Initialize immediate visual state on mount
    updateVisuals()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', cacheGeometry)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={sectionRef} className="scroll-video-section">
      <div className="scroll-video-sticky">

        {/* ── Image 1: Day (Initial View) ── */}
        <div
          ref={layer1Ref}
          className="hero-image-layer hero-image-day"
          style={{ opacity: 1, transform: 'scale(1.01)' }}
        >
          <img
            src="/images/smg_hero_building_day.png"
            alt="Shree Mangal architectural landmark building in daytime"
            fetchPriority="high"
            decoding="sync"
            className="hero-img-sharp"
          />
        </div>

        {/* ── Image 2: Night (Scroll Transition View) ── */}
        <div
          ref={layer2Ref}
          className="hero-image-layer hero-image-night"
          style={{ opacity: 0, transform: 'scale(1.00)' }}
        >
          <img
            src="/images/smg_hero_building_night.png"
            alt="Shree Mangal architectural landmark building illuminated at night"
            decoding="async"
            className="hero-img-sharp"
          />
        </div>

        {/* ── Gradient scrim (left-side contrast only) ── */}
        <div aria-hidden="true" className="hero-scrim" />

        {/* ── Text overlay: Dual States Synchronized with Images ── */}
        <div className="hero-text-wrap" aria-live="polite">

          {/* ── STATE 1 TEXT ── */}
          <div
            ref={text1Ref}
            className="hero-text-inner hero-text-state-1"
            style={{ opacity: 1, transform: 'translateY(0px)', pointerEvents: 'auto' }}
          >
            <p className="hero-meta">SHREE MANGAL GROUP · NASHIK</p>
            <h1 className="hero-headline">
              <span className="block">WHERE LIFE</span>
              <span className="block">FINDS ITS PLACE</span>
            </h1>
            <p className="hero-desc">
              Thoughtfully planned spaces, built around quality, comfort and lasting value.
            </p>
            <Link to="/about" className="hero-cta">
              <span>EXPLORE SHREE MANGAL</span>
              <ArrowRight />
            </Link>
          </div>

          {/* ── STATE 2 TEXT ── */}
          <div
            ref={text2Ref}
            className="hero-text-inner hero-text-state-2"
            style={{ opacity: 0, transform: 'translateY(22px)', pointerEvents: 'none' }}
          >
            <p className="hero-meta">SHREE MANGAL GROUP · NASHIK</p>
            <h1 className="hero-headline">
              <span className="block">WELCOME</span>
              <span className="block">TO SOMETHING BETTER</span>
            </h1>
            <p className="hero-desc">
              Where thoughtful design, quality construction and a sense of belonging come together.
            </p>
            <Link to="/residences" className="hero-cta">
              <span>EXPLORE RESIDENCES</span>
              <ArrowRight />
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}
