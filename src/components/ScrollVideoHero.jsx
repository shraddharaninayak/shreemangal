import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// ── Text content for each scroll state ───────────────────────────────────────

const TEXT_STATES = [
  {
    id: 'state-01',
    headline: ['WHERE LIFE', 'FINDS ITS PLACE'],
    description: 'Thoughtfully planned spaces, built around quality, comfort and lasting value.',
    cta: { label: 'Explore Shree Mangal', href: '/about' },
    meta: 'SHREE MANGAL GROUP · NASHIK',
  },
  {
    id: 'state-02',
    headline: ['DESIGNED FOR', 'THE WAY YOU LIVE'],
    description: 'Contemporary homes shaped around comfort, functionality and everyday living.',
    cta: { label: 'Explore Properties', href: '/properties' },
    meta: 'RESIDENTIAL · THOUGHTFULLY DESIGNED',
  },
  {
    id: 'state-03',
    headline: ['WELCOME', 'TO SOMETHING BETTER'],
    description: 'Where thoughtful design, quality construction and a sense of belonging come together.',
    cta: { label: 'Discover Your Space', href: '/contact' },
    meta: 'SHREE MANGAL GROUP · BUILDING BETTER EXPERIENCES',
  },
]

// 0–35 % → state 0 | 35–65 % → state 1 | 65–100 % → state 2
function resolveTextState(progress) {
  if (progress < 0.35) return 0
  if (progress < 0.65) return 1
  return 2
}

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
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const targetProgressRef = useRef(0)
  const durationRef = useRef(0)
  // Ref tracks the current index without triggering re-renders on every scroll
  const textStateRef = useRef(0)

  const [textStateIndex, setTextStateIndex] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    // ── Video metadata ────────────────────────────────────────────────────────
    const onLoadedMetadata = () => {
      durationRef.current = video.duration
      video.currentTime = 0
    }
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    if (video.readyState >= 1 && video.duration > 0) onLoadedMetadata()

    // ── Cached geometry — computed once, refreshed on resize ──────────────────
    // Avoids getBoundingClientRect() (forced reflow) on every scroll event.
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

    // ── RAF scrub — starts on scroll, stops when settled ──────────────────────
    // One pending RAF at most; guarded by rafScheduled flag.
    let rafScheduled = false
    let lastApplied = -1

    const tick = () => {
      rafScheduled = false
      const duration = durationRef.current
      if (duration <= 0) return

      const p = targetProgressRef.current
      const targetTime = p <= 0.001 ? 0 : p >= 0.999 ? duration : p * duration

      if (isMobile) {
        // Direct seek — iOS/Android touch inertia already provides smoothness.
        // Skip write if delta < ~1 frame at 30 fps to avoid over-thrashing the
        // video decoder with near-identical seeks.
        if (Math.abs(targetTime - lastApplied) >= 1 / 30) {
          video.currentTime = targetTime
          lastApplied = targetTime
        }
        // RAF stops here; next scroll event will restart it.
      } else {
        // Desktop: lerp for extra smoothness.
        // Use lastApplied (not video.currentTime) as the lerp reference — stable
        // regardless of when the browser reflects the async seek in currentTime.
        const current = lastApplied >= 0 ? lastApplied : 0
        const diff = targetTime - current
        if (Math.abs(diff) < 1 / 30) {
          // Within one frame of target — snap and stop.
          if (lastApplied !== targetTime) {
            video.currentTime = targetTime
            lastApplied = targetTime
          }
        } else {
          const next = current + diff * 0.5
          video.currentTime = next
          lastApplied = next
          // Still converging — keep RAF running.
          rafScheduled = true
          rafRef.current = requestAnimationFrame(tick)
        }
      }
    }

    const scheduleRaf = () => {
      if (!rafScheduled) {
        rafScheduled = true
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    // ── Scroll handler ────────────────────────────────────────────────────────
    const onScroll = () => {
      const progress = calcProgress()
      targetProgressRef.current = progress

      const newIdx = resolveTextState(progress)
      if (newIdx !== textStateRef.current) {
        textStateRef.current = newIdx
        setTextStateIndex(newIdx)
      }

      scheduleRaf()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', cacheGeometry, { passive: true })
    onScroll() // sync initial state on mount

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', cacheGeometry)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const state = TEXT_STATES[textStateIndex]

  return (
    <div ref={sectionRef} className="scroll-video-section">
      <div className="scroll-video-sticky">

        {/* ── Full-cover video ────────────────────────────────────────────── */}
        <video
          ref={videoRef}
          src="/videos/shreemangal-hero-web.mp4"
          poster="/images/hero-poster.jpg"
          muted
          playsInline
          preload="metadata"
        />

        {/* ── Gradient scrim (left-side contrast only) ────────────────────── */}
        <div aria-hidden="true" className="hero-scrim" />

        {/* ── Text overlay ────────────────────────────────────────────────── */}
        <div className="hero-text-wrap" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="hero-text-inner"
            >
              {/* Utility / metadata line */}
              <p className="hero-meta">{state.meta}</p>

              {/* Main headline — each line is a separate block span for line-break control */}
              <h1 className="hero-headline">
                {state.headline.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>

              {/* Supporting description */}
              <p className="hero-desc">{state.description}</p>

              {/* Outlined CTA */}
              <Link to={state.cta.href} className="hero-cta">
                <span>{state.cta.label}</span>
                <ArrowRight />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
