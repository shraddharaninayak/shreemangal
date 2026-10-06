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

    const onLoadedMetadata = () => {
      durationRef.current = video.duration
      video.currentTime = 0
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    if (video.readyState >= 1 && video.duration > 0) {
      onLoadedMetadata()
    }

    const calcProgress = () => {
      const heroTop = section.getBoundingClientRect().top + window.scrollY
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return 0
      const raw = (window.scrollY - heroTop) / scrollable
      return Math.min(1, Math.max(0, raw))
    }

    const onScroll = () => {
      const progress = calcProgress()

      // ── Video seek target (unchanged) ──────────────────────────────────────
      targetProgressRef.current = progress

      // ── Text state (only triggers re-render when state boundary is crossed) ─
      const newIdx = resolveTextState(progress)
      if (newIdx !== textStateRef.current) {
        textStateRef.current = newIdx
        setTextStateIndex(newIdx)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // ── rAF video-scrub loop (unchanged) ──────────────────────────────────────
    let lastTime = -1

    const tick = () => {
      const duration = durationRef.current
      if (duration > 0) {
        const progress = targetProgressRef.current
        let targetTime

        if (progress <= 0.001) {
          targetTime = 0
        } else if (progress >= 0.999) {
          targetTime = duration
        } else {
          targetTime = progress * duration
        }

        const diff = targetTime - video.currentTime

        if (Math.abs(diff) < 0.001) {
          if (video.currentTime !== targetTime) {
            video.currentTime = targetTime
          }
        } else {
          const next = video.currentTime + diff * 0.5
          if (Math.abs(next - lastTime) > 0.01) {
            video.currentTime = next
            lastTime = next
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      window.removeEventListener('scroll', onScroll)
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
          src="/videos/shreemangal-hero-scrub.mp4"
          muted
          playsInline
          preload="auto"
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
