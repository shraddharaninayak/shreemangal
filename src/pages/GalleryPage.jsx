import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/galleryData'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)
  const [navHidden, setNavHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleScroll = () => {
      const y = window.scrollY
      setNavHidden(y > lastY.current && y > 140)
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filtered items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const categoryCounts = useMemo(() => {
    const counts = { All: GALLERY_ITEMS.length }
    GALLERY_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return counts
  }, [])

  // Lightbox handlers
  const openLightbox = (index) => {
    setSelectedItemIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setSelectedItemIndex(null)
  }, [])

  const nextImage = useCallback(() => {
    setSelectedItemIndex((prev) => {
      if (prev === null) return null
      return (prev + 1) % filteredItems.length
    })
  }, [filteredItems.length])

  const prevImage = useCallback(() => {
    setSelectedItemIndex((prev) => {
      if (prev === null) return null
      return (prev - 1 + filteredItems.length) % filteredItems.length
    })
  }, [filteredItems.length])

  // Keyboard navigation & scroll lock for Lightbox
  useEffect(() => {
    if (selectedItemIndex === null) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedItemIndex, closeLightbox, nextImage, prevImage])

  const activeLightboxItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null

  return (
    <main className="gallery-page-wrapper" style={{ background: '#080808', color: '#ECEBE8', minHeight: '100vh' }}>
      
      {/* ── HERO SECTION ── */}
      <section className="gallery-hero-section" style={{ position: 'relative', paddingTop: 'clamp(148px, calc(78px + 10vw), 200px)', paddingBottom: 'clamp(50px, 8vw, 90px)', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        {/* Background panoramic image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/images/smg_gallery_hero_bg.png"
            alt="Gallery architectural perspective background"
            loading="eager"
            fetchPriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,0.78) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}
          >
            <span style={{ display: 'block', width: '20px', height: '1px', background: '#B99A76' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', color: '#B99A76', textTransform: 'uppercase' }}>
              GALLERY
            </span>
            <span style={{ display: 'block', width: '20px', height: '1px', background: '#B99A76' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#FBFBFA',
              letterSpacing: '-0.01em',
              margin: '0 auto 24px',
              maxWidth: '920px',
            }}
          >
            Spaces, Places & <span style={{ color: '#C8A882', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Perspectives</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.75,
              color: 'rgba(236, 235, 232, 0.72)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            A visual documentation of architectural craft, construction milestones, panoramic horizons, and living environments across Shree Mangal Group landmarks.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORY FILTER BAR ── */}
      <section
        className="gallery-sticky-filter-bar"
        style={{
          top: navHidden ? '0px' : '78px',
          transition: 'top 0.32s cubic-bezier(0.25, 0, 0.25, 1)',
        }}
      >
        <div className="filter-bar-scroll-container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat)
                  setSelectedItemIndex(null)
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '100px',
                  border: isActive ? '1px solid #B99A76' : '1px solid rgba(255,255,255,0.12)',
                  background: isActive ? 'rgba(185, 154, 118, 0.16)' : 'rgba(255,255,255,0.02)',
                  color: isActive ? '#EBD8C1' : 'rgba(236, 235, 232, 0.65)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 7px',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(185, 154, 118, 0.3)' : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#FFF' : 'rgba(255,255,255,0.45)',
                    fontWeight: 600,
                  }}
                >
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── GALLERY MASONRY / EDITORIAL GRID ── */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: 'clamp(40px, 6vw, 70px) 20px clamp(70px, 10vw, 110px)' }}>
        <motion.div
          layout
          className="gallery-editorial-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const isWide = item.aspect === 'wide' && (idx % 4 === 0)
              const isPortrait = item.aspect === 'portrait'

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, ease: EASE, delay: Math.min(idx * 0.03, 0.3) }}
                  onClick={() => openLightbox(idx)}
                  className={`gallery-card-item ${isWide ? 'gallery-card-wide' : ''} ${isPortrait ? 'gallery-card-tall' : ''}`}
                  style={{
                    position: 'relative',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#121212',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    cursor: 'pointer',
                    minHeight: isPortrait ? '440px' : isWide ? '340px' : '290px',
                    gridColumn: isWide ? 'span 2' : 'span 1',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading={idx < 6 ? 'eager' : 'lazy'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="gallery-img-hover"
                  />

                  {/* Gradient Overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.05) 100%)',
                      opacity: 0.85,
                      transition: 'opacity 0.35s ease',
                    }}
                    className="gallery-overlay"
                  />

                  {/* Hover icon badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#E5D5C2',
                      fontSize: '15px',
                      transition: 'all 0.3s ease',
                    }}
                    className="gallery-expand-badge"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>

                  {/* Bottom Captions */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '24px 22px',
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        color: '#B99A76',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      {item.category}
                    </span>

                    <h3
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '17px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        lineHeight: 1.35,
                        margin: '0 0 4px',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '12px',
                        color: 'rgba(236, 235, 232, 0.65)',
                        margin: 0,
                      }}
                    >
                      {item.location}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── FULLSCREEN LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(5, 5, 5, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 24px',
              userSelect: 'none',
            }}
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '1440px',
                margin: '0 auto',
                paddingBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: '#B99A76',
                    textTransform: 'uppercase',
                    background: 'rgba(185, 154, 118, 0.14)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid rgba(185, 154, 118, 0.3)',
                  }}
                >
                  {activeLightboxItem.category}
                </span>

                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', fontFamily: "'Plus Jakarta Sans', monospace" }}>
                  {selectedItemIndex + 1} / {filteredItems.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Central Stage with Next/Prev and Image */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                margin: '10px 0',
              }}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                aria-label="Previous Image"
                style={{
                  position: 'absolute',
                  left: '12px',
                  zIndex: 10,
                  background: 'rgba(20, 20, 20, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#B99A76'
                  e.currentTarget.style.borderColor = '#B99A76'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(20, 20, 20, 0.75)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Main Image */}
              <motion.div
                key={activeLightboxItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '92vw',
                  maxHeight: '78vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '78vh',
                    objectFit: 'contain',
                    borderRadius: '3px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
                    display: 'block',
                  }}
                />
              </motion.div>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                aria-label="Next Image"
                style={{
                  position: 'absolute',
                  right: '12px',
                  zIndex: 10,
                  background: 'rgba(20, 20, 20, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#B99A76'
                  e.currentTarget.style.borderColor = '#B99A76'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(20, 20, 20, 0.75)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '1440px',
                margin: '0 auto',
                textAlign: 'center',
                paddingTop: '8px',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(17px, 2vw, 22px)',
                  color: '#FFFFFF',
                  margin: '0 0 4px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                {activeLightboxItem.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(236, 235, 232, 0.6)',
                  margin: 0,
                }}
              >
                {activeLightboxItem.location} &bull; Use arrow keys or click arrows to browse
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CALL TO ACTION SECTION ── */}
      <CTASection />
    </main>
  )
}
