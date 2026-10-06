import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'

// ─── 8 Real Shree Mangal Editorial Gallery Sequences ───────────────────────────
const EXPLORE_ITEMS = [
  {
    id: 1,
    title: 'Environments that connect',
    subtitle: 'Integrated living spaces opening to natural light and calm textures.',
    src: '/images/smg_gallerry_the6.jpg',
    pos: 'center 48%',
    alt: 'Living area with double height and daylight',
  },
  {
    id: 2,
    title: 'Space to be together',
    subtitle: 'Open lounge and family gathering areas designed with quiet balance.',
    src: '/images/smg_residence_img4.jpg',
    pos: 'center 50%',
    alt: 'Expansive family living and dining room',
  },
  {
    id: 3,
    title: 'Rest & stillness',
    subtitle: 'Private bedroom retreats crafted for peaceful mornings and calm nights.',
    src: '/images/smg_residence_bedroom.jpg',
    pos: 'center 48%',
    alt: 'Master bedroom with warm woodwork and subtle lighting',
  },
  {
    id: 4,
    title: 'Architectural silhouette',
    subtitle: 'The tower profile framed against the Nashik sky with clean symmetry.',
    src: '/images/smg_swastik_mangal_clean.jpg',
    pos: 'center 40%',
    alt: 'Shree Swastik Mangal facade and balconies',
  },
  {
    id: 5,
    title: 'Under the open sky',
    subtitle: 'Elevated horizon terraces and recreation spaces designed to breathe.',
    src: '/images/smg_kyriad_hotel_hero.jpg',
    pos: 'center 42%',
    alt: 'Terrace deck with panoramic skyline',
  },
  {
    id: 6,
    title: 'A dignified arrival',
    subtitle: 'Grand entrance hall celebrating craftsmanship, volume, and stone.',
    src: '/images/smg_aadiva_bungalow_hero.jpg',
    pos: 'center 45%',
    alt: 'Villa entrance and architectural landscaping',
  },
  {
    id: 7,
    title: 'Gatherings & community',
    subtitle: 'Thoughtfully planned communal environments where neighbours connect.',
    src: '/images/smg_gallerry_the1.jpg',
    pos: 'center 50%',
    alt: 'Landscaped grounds and community spaces',
  },
  {
    id: 8,
    title: 'Light between rooms',
    subtitle: 'Transparent glass partitions allowing sunlight to travel through every corner.',
    src: '/images/smg_WhatsApp-Image-2023-11-28-at-1.14.37-PM.jpeg',
    pos: 'center 52%',
    alt: 'Modern living room with dining area connection',
  },
]

const TOTAL_COUNT = EXPLORE_ITEMS.length
const EASE = [0.16, 1, 0.3, 1]

// Smooth Hermite interpolation for smooth acceleration/deceleration
function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

export default function ExploreSection() {
  const wrapperRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [fullscreenItem, setFullscreenItem] = useState(null)
  const scrollProgress = useMotionValue(0)

  // Step size along scroll range [0, 1]
  const step = TOTAL_COUNT > 1 ? 1 / (TOTAL_COUNT - 1) : 1

  // ── Scroll progression listener ──────────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const rawProgress = -rect.top / scrollable
      const clamped = Math.max(0, Math.min(1, rawProgress))
      scrollProgress.set(clamped)

      // Active index reflects the nearest photo in the sequence
      const nearest = Math.min(Math.max(Math.round(clamped / step), 0), TOTAL_COUNT - 1)
      setActiveIdx((prev) => (prev !== nearest ? nearest : prev))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollProgress, step])

  // ── Programmatic step navigation (smooth scroll) ─────────────────────────
  const scrollToItem = useCallback(
    (targetIdx) => {
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const top = window.scrollY + rect.top
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const targetProgress = Math.min(Math.max(targetIdx * step, 0), 1)
      window.scrollTo({
        top: top + targetProgress * scrollable,
        behavior: 'smooth',
      })
    },
    [step]
  )

  const handlePrev = useCallback(() => {
    if (activeIdx > 0) scrollToItem(activeIdx - 1)
  }, [activeIdx, scrollToItem])

  const handleNext = useCallback(() => {
    if (activeIdx < TOTAL_COUNT - 1) scrollToItem(activeIdx + 1)
  }, [activeIdx, scrollToItem])

  const currentItem = EXPLORE_ITEMS[activeIdx]

  return (
    <>
      <section
        ref={wrapperRef}
        id="explore"
        className="explore-scroll-wrapper"
        aria-label="Explore architectural perspectives"
      >
        {/* Sticky 100vh Viewport Experience */}
        <div className="explore-sticky-stage">
          {/* Subtle dark overlay for crisp text readability */}
          <div className="explore-ambient-overlay" aria-hidden="true" />

          {/* Top Metadata Header */}
          <div className="explore-top-meta">
            <span className="explore-brand-badge">SHREE MANGAL / EXPERIENCE</span>
            <span className="explore-scroll-cue">
              SCROLL DOWN TO EXPLORE <span aria-hidden="true">↓</span>
            </span>
          </div>

          {/* Left Anchored Editorial Headline */}
          <div className="explore-left-editorial">
            <p className="explore-category-eyebrow">ARCHITECTURE · LIGHT · LIFE</p>
            <h2 className="section-heading is-dark-theme explore-main-heading">
              A New
              <br />
              <span className="heading-accent">Perspective</span>
            </h2>
            <p className="explore-heading-caption">
              The gaze finds
              <br />
              another way of living.
            </p>
          </div>

          {/* Cascading Diagonal Rotating Photograph Stack */}
          <div className="explore-photo-stage" aria-hidden="true">
            {EXPLORE_ITEMS.map((item, index) => (
              <CascadingPhotoCard
                key={item.id}
                item={item}
                index={index}
                total={TOTAL_COUNT}
                step={step}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>

          {/* Bottom Editorial Bar: Active Title + Progress Line + Controls */}
          <div className="explore-bottom-bar">
            {/* Left: Counter + Active Title */}
            <div className="explore-bottom-info">
              <div className="explore-title-row">
                <span className="explore-number-counter">
                  {String(activeIdx + 1).padStart(2, '0')} / {String(TOTAL_COUNT).padStart(2, '0')}
                </span>
                <AnimatePresence mode="wait">
                  <motion.h4
                    key={activeIdx}
                    className="explore-active-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {currentItem.title}
                  </motion.h4>
                </AnimatePresence>
              </div>

              {/* Smooth Continuous Scroll Progress Line */}
              <div className="explore-progress-track">
                <motion.div
                  className="explore-progress-indicator"
                  style={{
                    scaleX: scrollProgress,
                    transformOrigin: 'left center',
                  }}
                />
              </div>
            </div>

            {/* Right: Direct Controls (<, dropdown, >, Enlarge) */}
            <div className="explore-bottom-controls">
              <button
                type="button"
                className="explore-nav-btn"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous photograph"
              >
                ←
              </button>

              <div className="explore-select-wrapper">
                <select
                  className="explore-step-select"
                  value={activeIdx}
                  onChange={(e) => scrollToItem(Number(e.target.value))}
                  aria-label="Choose image from sequence"
                >
                  {EXPLORE_ITEMS.map((item, i) => (
                    <option key={item.id} value={i}>
                      {String(i + 1).padStart(2, '0')} ▾
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="explore-nav-btn"
                onClick={handleNext}
                disabled={activeIdx === TOTAL_COUNT - 1}
                aria-label="Next photograph"
              >
                →
              </button>

              <button
                type="button"
                className="explore-enlarge-btn"
                onClick={() => setFullscreenItem(currentItem)}
                aria-label={`Enlarge photograph: ${currentItem.title}`}
              >
                <span>Enlarge image</span>
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
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {fullscreenItem && (
          <motion.div
            className="explore-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFullscreenItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={fullscreenItem.title}
          >
            <button
              type="button"
              className="explore-lightbox-close"
              onClick={() => setFullscreenItem(null)}
              aria-label="Close fullscreen view"
            >
              ✕
            </button>

            <motion.div
              className="explore-lightbox-card"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenItem.src}
                alt={fullscreenItem.alt}
                className="explore-lightbox-img"
              />
              <div className="explore-lightbox-caption">
                <h3>{fullscreenItem.title}</h3>
                <p>{fullscreenItem.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * CascadingPhotoCard:
 * Handles the physical diagonal movement, overlap, rotation, and scale
 * of each photograph as the user scrolls.
 *
 * Trajectory:
 * - When entering (p from center - step to center):
 *   Moves from LOWER-RIGHT (+X, +Y) to CENTER (0, 0)
 *   Rotates from +1.8deg to 0deg
 *   Scale from 0.88 to 1.00
 *   Opacity from 0 to 1
 *   Sits on top with higher z-index so it physically passes OVER the outgoing photo
 *
 * - When active (p = center):
 *   Resting center-right at (0, 0), scale 1.0, rotate 0deg, opacity 1
 *
 * - When exiting (p from center to center + step):
 *   Moves from CENTER (0, 0) to UPPER-LEFT (-X, -Y)
 *   Rotates from 0deg to -2.0deg
 *   Scale from 1.0 to 0.92
 *   Opacity from 1 to 0
 */
function CascadingPhotoCard({ item, index, total, step, scrollProgress }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const center = index * step

    function update(p) {
      const el = cardRef.current
      if (!el) return

      const isMobile = window.innerWidth <= 768

      if (isMobile) {
        // Continuous fractional index of the current scroll: u in [0, total - 1]
        const u = step > 0 ? p / step : 0
        // Signed distance from active center for this specific card
        const d = index - u
        const absD = Math.abs(d)

        // Cards beyond the visible 3D stack window are hidden
        if (absD > 2.3) {
          el.style.opacity = '0'
          el.style.pointerEvents = 'none'
          return
        }

        // ── 3D Stack Transformation Math ──
        // 1. Vertical translation (ty):
        // Responsive vertical offset between adjacent stacked cards
        const cardGap = Math.min(220, Math.max(175, window.innerHeight * 0.23))
        const ty = d * cardGap

        // 2. Horizontal translation (tx):
        // Dynamic curved / diagonal trajectory: upper cards shift slightly left, lower cards slightly right
        const tx = d * 18

        // 3. 3D Depth (tz):
        // Active center card (d = 0) is at depth 0. Surrounding cards sink backward into depth
        const tz = -Math.min(280, Math.pow(absD, 1.1) * 135)

        // 4. 3D Rotations (rotateX, rotateY, rotateZ):
        // - rotateX: Outgoing top cards (d < 0) tilt backward at the top (+14.5deg).
        //            Incoming bottom cards (d > 0) tilt backward at the bottom (-14.5deg).
        //            Center card (d = 0) is flat at 0deg.
        const rotX = Math.min(20, Math.max(-20, -d * 14.5))
        const rotY = Math.min(10, Math.max(-10, -d * 7.5))
        const rotZ = Math.min(5, Math.max(-5, d * 3.2))

        // 5. Scale:
        // Active card is 1.0, adjacent cards are ~0.84, secondary stack cards are ~0.72
        const scale = Math.max(0.68, 1 - 0.16 * Math.min(absD, 2.3))

        // 6. Opacity:
        // Full opacity at center (1.0), visible layered stack (|d| <= 1: ~0.88), smooth fade between 1.0 and 2.3
        let opacity = 1
        if (absD <= 1) {
          opacity = 1 - 0.12 * absD
        } else {
          opacity = Math.max(0, 0.88 * (1 - (absD - 1) / 1.3))
        }

        // 7. Layering (z-index):
        // Active card (|d| < 0.5) is prominent in front (z-index 30), overlapping both top & bottom cards.
        let zIndex = 20
        if (absD < 0.5) {
          zIndex = 30
        } else {
          zIndex = Math.max(1, Math.round(24 - absD * 8))
        }

        el.style.transform = `translate(-50%, -50%) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(1)}px) scale(${scale.toFixed(4)}) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`
        el.style.opacity = opacity.toFixed(4)
        el.style.zIndex = zIndex
        el.style.pointerEvents = absD < 0.5 ? 'auto' : 'none'
        return
      }

      // ── DESKTOP: Preserved exactly as designed ──
      let tx = 0
      let ty = 0
      let scale = 1
      let rotate = 0
      let opacity = 0
      let zIndex = 1

      // ── Distance travel vectors (in responsive vw / vh units) ──
      // Outgoing moves toward upper-left: -28vw, -22vh
      // Incoming enters from lower-right: +28vw, +22vh
      const travelX = window.innerWidth * 0.28
      const travelY = window.innerHeight * 0.22

      if (p < center - step) {
        // Completely before this card's lifecycle
        tx = travelX
        ty = travelY
        scale = 0.88
        rotate = 2
        opacity = 0
        zIndex = 1
      } else if (p < center) {
        // ── Phase 1: Entering from LOWER-RIGHT toward CENTER ──
        const progress = (p - (center - step)) / step
        const eased = smoothstep(progress)

        tx = travelX * (1 - eased)
        ty = travelY * (1 - eased)
        scale = 0.88 + 0.12 * eased
        rotate = 1.8 * (1 - eased)
        opacity = Math.min(1, eased * 1.3) // fast arrival opacity
        // Incoming must be above outgoing so it overlaps cleanly
        zIndex = index + 10
      } else if (p <= center + step) {
        // ── Phase 2: Leaving from CENTER toward UPPER-LEFT ──
        const progress = (p - center) / step
        const eased = smoothstep(progress)

        tx = -travelX * eased
        ty = -travelY * eased
        scale = 1.0 - 0.08 * eased
        rotate = -2.0 * eased
        opacity = Math.max(0, 1 - eased * 1.15)
        // Outgoing sinks under incoming
        zIndex = index + 5
      } else {
        // Completely after this card's lifecycle
        tx = -travelX
        ty = -travelY
        scale = 0.92
        rotate = -2
        opacity = 0
        zIndex = 1
      }

      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0px) scale(${scale.toFixed(4)}) rotate(${rotate.toFixed(2)}deg)`
      el.style.opacity = opacity.toFixed(4)
      el.style.zIndex = zIndex
    }

    update(scrollProgress.get())
    const unsub = scrollProgress.on('change', update)

    function handleResize() {
      update(scrollProgress.get())
    }
    window.addEventListener('resize', handleResize)

    return () => {
      unsub()
      window.removeEventListener('resize', handleResize)
    }
  }, [scrollProgress, index, total, step])

  return (
    <div
      ref={cardRef}
      className="explore-photo-card"
      style={{
        opacity: index === 0 ? 1 : 0,
        zIndex: index === 0 ? 10 : 1,
      }}
    >
      {/* Light metallic architectural border frame */}
      <div className="explore-photo-frame">
        <img
          src={item.src}
          alt={item.alt}
          className="explore-photo-img"
          style={{ objectPosition: item.pos }}
          loading={index === 0 ? 'eager' : 'lazy'}
          draggable="false"
        />
        {/* Subtle photo glass surface shine */}
        <div className="explore-photo-shine" aria-hidden="true" />
      </div>
    </div>
  )
}
