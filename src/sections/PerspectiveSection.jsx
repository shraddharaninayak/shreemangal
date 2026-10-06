import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'

const PERSPECTIVE_SCENES = [
  {
    id: 1,
    title: 'Light between rooms',
    titlePrimary: 'Light between',
    titleAccent: 'rooms',
    category: 'Artistic perspective',
    description: 'Interiors framed by balanced natural illumination, connecting private retreats and shared living.',
    src: '/images/smg_gallerry_the6.jpg',
    alt: 'Shree Mangal expansive interior living spaces with abundant daylight',
    pos: 'center 48%',
  },
  {
    id: 2,
    title: 'Architectural silhouette',
    titlePrimary: 'Architectural',
    titleAccent: 'silhouette',
    category: 'Exterior perspective',
    description: 'A contemporary skyline profile shaped by disciplined lines, spacious balconies, and enduring materials.',
    src: '/images/smg_swastik_mangal_clean.jpg',
    alt: 'Shree Swastik Mangal residential tower facade',
    pos: 'center 38%',
  },
  {
    id: 3,
    title: 'The elevated terrace',
    titlePrimary: 'The elevated',
    titleAccent: 'terrace',
    category: 'Rooftop & landscape',
    description: 'Panoramic open horizons meet serene recreational decks designed for tranquil Nashik evenings.',
    src: '/images/smg_kyriad_hotel_hero.jpg',
    alt: 'Elevated lifestyle terrace and leisure open horizon',
    pos: 'center 42%',
  },
  {
    id: 4,
    title: 'Space for stillness',
    titlePrimary: 'Space for',
    titleAccent: 'stillness',
    category: 'Private quarters',
    description: 'Restful master sanctuaries crafted with soothing textures and tactile warmth for genuine calm.',
    src: '/images/smg_residence_bedroom.jpg',
    alt: 'Shree Mangal master bedroom and tranquil retreat',
    pos: 'center 50%',
  },
  {
    id: 5,
    title: 'Grand entrance hall',
    titlePrimary: 'Grand entrance',
    titleAccent: 'hall',
    category: 'Arrival & lobby',
    description: 'A dignified sense of arrival with double-height volume, bespoke stonework, and curated lighting.',
    src: '/images/smg_aadiva_bungalow_hero.jpg',
    alt: 'Shree Mangal luxury residence entrance and facade architecture',
    pos: 'center 45%',
  },
]

const EASE = [0.25, 1, 0.5, 1]

export default function PerspectiveSection() {
  const wrapperRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [fullscreenImage, setFullscreenImage] = useState(null)

  const count = PERSPECTIVE_SCENES.length

  // Single MotionValue shared with all SceneImageLayer children.
  // Updated directly from the window scroll event — bypasses Framer Motion's
  // useScroll entirely to guarantee reliable progress tracking.
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      // progress = 0 when section top hits viewport top
      // progress = 1 when section bottom hits viewport bottom
      const p = Math.max(0, Math.min(1, -rect.top / scrollable))

      // DEBUG — open browser console to verify progress is moving:
      console.log('[Perspective] scroll progress:', p.toFixed(4))

      scrollProgress.set(p)

      // Update caption/counter at the midpoint of each wipe transition
      const numTransitions = count - 1
      const step = numTransitions > 0 ? 1 / numTransitions : 1
      const rawIdx = Math.round(p / step)
      const idx = Math.min(Math.max(rawIdx, 0), count - 1)
      setActiveIdx((prev) => (prev !== idx ? idx : prev))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Set correct state on mount (handles page reload mid-scroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollProgress, count])

  // Jump to a specific scene by scrolling the wrapper to that progress point
  const scrollToScene = useCallback((targetIdx) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const containerTop = window.scrollY + rect.top
    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) return

    const numTransitions = count - 1
    const step = numTransitions > 0 ? 1 / numTransitions : 1
    const targetProgress = Math.min(targetIdx * step, 1)
    window.scrollTo({ top: containerTop + targetProgress * scrollable, behavior: 'smooth' })
  }, [count])

  const handlePrev = useCallback(() => {
    if (activeIdx > 0) scrollToScene(activeIdx - 1)
  }, [activeIdx, scrollToScene])

  const handleNext = useCallback(() => {
    if (activeIdx < count - 1) scrollToScene(activeIdx + 1)
  }, [activeIdx, count, scrollToScene])

  const scrollToNextSection = useCallback((e) => {
    e.preventDefault()
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    window.scrollTo({ top: window.scrollY + rect.bottom, behavior: 'smooth' })
  }, [])

  return (
    <>
      <section
        ref={wrapperRef}
        id="perspective"
        className="perspective-journey-wrapper"
        aria-label="Perspective architectural presentation"
      >
        {/* Sticky 100vh Viewport */}
        <div className="perspective-sticky-stage">

          {/* Top Editorial Sub-bar */}
          <header className="perspective-header">
            <span className="perspective-tag">PERSPECTIVE</span>
            <a
              href="#explore"
              onClick={scrollToNextSection}
              className="perspective-next-link"
              aria-label="Scroll to next chapter"
            >
              <span>Next chapter</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 2v10M2 7l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </header>

          {/* Cinematic Image Frame */}
          <div className="perspective-media-viewport">
            {PERSPECTIVE_SCENES.map((scene, i) => (
              <SceneImageLayer
                key={scene.id}
                scene={scene}
                index={i}
                total={count}
                scrollProgress={scrollProgress}
              />
            ))}

            <div className="perspective-viewport-border" aria-hidden="true" />

            <button
              type="button"
              className="perspective-full-image-btn"
              onClick={() => setFullscreenImage(PERSPECTIVE_SCENES[activeIdx])}
              aria-label={`View full image: ${PERSPECTIVE_SCENES[activeIdx].title}`}
            >
              <span>Full Image</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Editorial Caption Bar */}
          <footer className="perspective-caption-container">
            <div className="perspective-caption-left">

              <div className="perspective-headline-mask">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeIdx}
                    className="section-heading perspective-headline"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {PERSPECTIVE_SCENES[activeIdx].titlePrimary}{' '}
                    <span className="heading-accent">
                      {PERSPECTIVE_SCENES[activeIdx].titleAccent}
                    </span>
                  </motion.h3>
                </AnimatePresence>
              </div>

              <div className="perspective-meta-row">
                <span className="perspective-counter">
                  {String(activeIdx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <span className="perspective-category">
                  {PERSPECTIVE_SCENES[activeIdx].category}
                </span>
              </div>

              <div
                className="perspective-progress-dashes"
                role="progressbar"
                aria-valuenow={activeIdx + 1}
                aria-valuemin={1}
                aria-valuemax={count}
              >
                {PERSPECTIVE_SCENES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`perspective-dash-item ${i === activeIdx ? 'is-active' : ''}`}
                    onClick={() => scrollToScene(i)}
                    aria-label={`Go to perspective image ${i + 1}`}
                  >
                    <span className="perspective-dash-fill" />
                  </button>
                ))}
              </div>

              <p className="perspective-scroll-hint">
                SCROLL TO DISCOVER THE NEXT IMAGE
              </p>
            </div>

            <div className="perspective-controls-right">
              <button
                type="button"
                className="perspective-arrow-btn"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous perspective image"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M11.5 3.5L5.5 9L11.5 14.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="perspective-arrow-btn"
                onClick={handleNext}
                disabled={activeIdx === count - 1}
                aria-label="Next perspective image"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M6.5 3.5L12.5 9L6.5 14.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </footer>
        </div>
      </section>

      {/* Fullscreen Modal Lightbox */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="perspective-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFullscreenImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={fullscreenImage.title}
          >
            <button
              type="button"
              className="perspective-modal-close"
              onClick={() => setFullscreenImage(null)}
              aria-label="Close fullscreen view"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <motion.div
              className="perspective-modal-content"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenImage.src}
                alt={fullscreenImage.alt}
                className="perspective-modal-img"
              />
              <div className="perspective-modal-info">
                <h4>{fullscreenImage.title}</h4>
                <p>{fullscreenImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * One image panel in the horizontal wipe stack.
 *
 * - Image 0 is the base; it never moves (always at translateX(0%)).
 * - Images 1–N each start off-screen to the right (translateX(100%)) and
 *   slide left to translateX(0%) during their dedicated scroll segment.
 * - Higher z-index means the incoming panel always renders on top, so the
 *   left edge of the incoming panel acts as the wipe line.
 *
 * Transform is applied via direct DOM ref — no Framer Motion transform API —
 * which guarantees the MotionValue drives the pixel update every scroll frame
 * without any React re-render overhead or property-name ambiguity.
 */
function SceneImageLayer({ scene, index, total, scrollProgress }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const numTransitions = total - 1
    const step = numTransitions > 0 ? 1 / numTransitions : 1
    // This image's wipe-in segment within [0, 1]
    const segmentStart = index === 0 ? 0 : (index - 1) * step
    const segmentEnd   = index === 0 ? 1 : index * step

    function applyTransform(p) {
      const el = layerRef.current
      if (!el) return
      let xPct
      if (index === 0) {
        xPct = 0
      } else {
        // Clamp local t to [0, 1] so clamping is explicit and reversible
        const t = Math.max(0, Math.min(1, (p - segmentStart) / (segmentEnd - segmentStart)))
        xPct = 100 * (1 - t)
      }
      el.style.transform = `translateX(${xPct}%)`
    }

    // Apply immediately (handles mount, page-reload mid-scroll, forward nav)
    applyTransform(scrollProgress.get())

    // Subscribe — fires on every scroll frame outside React render cycle
    const unsubscribe = scrollProgress.on('change', applyTransform)
    return unsubscribe
  }, [scrollProgress, index, total])

  return (
    <div
      ref={layerRef}
      className="perspective-slide-layer"
      style={{
        zIndex: index + 1,
        // Initial off-screen position; effect overrides this immediately after mount.
        // React's reconciliation never touches this attribute again (the style prop
        // value stays the same between re-renders), so direct DOM writes in the
        // effect persist across React re-renders without being overwritten.
        transform: index === 0 ? 'translateX(0%)' : 'translateX(100%)',
      }}
      aria-hidden={index !== 0}
    >
      <img
        src={scene.src}
        alt={scene.alt}
        className="perspective-slide-img"
        style={{ objectPosition: scene.pos }}
        loading="eager"
      />
    </div>
  )
}
