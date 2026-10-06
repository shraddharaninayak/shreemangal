import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Pure typography statement lines (NO IMAGES INSIDE)
const STATEMENT_LINES = [
  [
    { text: 'ESTABLISHED IN ', accent: true },
    { text: '1996, ', accent: true },
    { text: 'SHREE MANGAL GROUP HAS GROWN', accent: false },
  ],
  [
    { text: 'WITH A FOCUS ON ', accent: false },
    { text: 'RESIDENTIAL', accent: false },
    { text: ' AND ', accent: false },
    { text: 'COMMERCIAL', accent: false },
  ],
  [
    { text: 'DEVELOPMENTS, CREATING SPACES DESIGNED AROUND', accent: false },
  ],
  [
    { text: 'QUALITY, ', accent: true },
    { text: 'COMFORT', accent: true },
    { text: ' AND ', accent: false },
    { text: 'TRUST.', accent: true },
  ],
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="editorial-about-section"
      aria-label="About Shree Mangal Group"
    >
      <div className="editorial-about-inner">
        {/* ── 1. Oversized "about us" Header with Brand Asterisk & Subtitles ── */}
        <div className="about-header-block">
          <div className="about-title-row">
            <motion.h2
              className="section-heading about-oversized-title"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, ease: EASE }}
            >
              About <span className="heading-accent">Shree Mangal</span>
              <br />
              Group
            </motion.h2>

            {/* Architectural Asterisk / Emblem */}
            <motion.div
              className="about-asterisk"
              aria-hidden="true"
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={inView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            className="about-subtitles-row"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <span className="about-sub-label label-dev">development</span>
            <span className="about-sub-label label-prem">premium</span>
          </motion.div>
        </div>

        {/* ── 2. Main Editorial Statement (CLEAN TYPOGRAPHY ONLY — NO IMAGES) ── */}
        <div className="about-statement-wrapper">
          <div
            className="about-editorial-statement"
            aria-label="Shree Mangal Group editorial statement"
          >
            {STATEMENT_LINES.map((line, lineIdx) => (
              <div key={lineIdx} className="line-mask">
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '105%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 1.05, ease: EASE, delay: 0.35 + lineIdx * 0.1 }}
                >
                  {line.map((chunk, i) => (
                    <span
                      key={i}
                      className={chunk.accent ? 'accent-word' : 'dark-word'}
                    >
                      {chunk.text}
                    </span>
                  ))}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Bottom Composition: TWO ARCHITECTURAL IMAGES + SUPPORTING TEXT ── */}
        <div className="about-bottom-composition">
          {/* Two Landscape Images Placed Below Statement */}
          <div className="about-image-pair">
            <motion.div
              className="about-photo-wrap photo-one"
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
            >
              <img
                src="/images/smg_aadiva_bungalow_hero.jpg"
                alt="Shree Mangal architectural villa facade"
                className="about-photo-img"
              />
            </motion.div>

            <motion.div
              className="about-photo-wrap photo-two"
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
            >
              <img
                src="/images/smg_swastik_mangal_clean.jpg"
                alt="Shree Swastik Mangal glazed modern residential tower"
                className="about-photo-img"
              />
            </motion.div>
          </div>

          {/* Dual Small Supporting Text Blocks Toward Lower Right */}
          <div className="about-notes-pair">
            <motion.p
              className="about-note-text"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: 0.85 }}
            >
              Built around thoughtful planning, quality construction and comfortable
              everyday living for families across Nashik.
            </motion.p>

            <motion.p
              className="about-note-text"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: 0.95 }}
            >
              Creating residential and commercial spaces with a steadfast focus on
              lasting architectural value, craftsmanship and trust.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
