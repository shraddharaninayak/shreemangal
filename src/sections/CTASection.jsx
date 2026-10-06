import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const EASE = [0.16, 1, 0.3, 1]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>

      {/* Background: cinematic architectural image with dark overlay */}
      <img
        src="/images/smg_gallerry-the3.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center center',
          opacity: 0.18,
        }}
        loading="lazy"
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(196,146,42,0.05) 0%, transparent 70%)',
        }}
      />

      <div
        ref={ref}
        className="section-pad"
        style={{
          maxWidth: 900, margin: '0 auto',
          textAlign: 'center', position: 'relative', zIndex: 1,
          paddingTop: '140px', paddingBottom: '140px',
        }}
      >

        {/* Chapter label */}
        <motion.p
          className="ch-label"
          style={{ color: 'rgba(255,255,255,0.22)', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          FIND YOUR PLACE
        </motion.p>

        {/* Headline */}
        <h2 className="section-heading is-dark-theme is-centered cta-main-heading">
          <div className="line-mask">
            <motion.span
              style={{ display: 'block' }}
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.05, ease: EASE, delay: 0.1 }}
            >
              Find Your
            </motion.span>
          </div>
          <div className="line-mask">
            <motion.span
              style={{ display: 'block' }}
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.05, ease: EASE, delay: 0.23 }}
            >
              <span className="heading-accent">Place</span>
            </motion.span>
          </div>
        </h2>

        {/* Divider */}
        <motion.div
          style={{
            width: 48, height: 1, background: '#C4922A',
            margin: '0 auto 32px',
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
        />

        {/* Body */}
        <motion.p
          className="ed-body"
          style={{
            color: 'rgba(255,255,255,0.42)', maxWidth: 500,
            margin: '0 auto 52px', lineHeight: 1.9,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE, delay: 0.46 }}
        >
          Explore Shree Mangal Group and discover spaces designed for living,
          working and belonging — built with care in Nashik since 1996.
        </motion.p>

        {/* Buttons */}
        <motion.div
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.58 }}
        >
          <Link to="/properties" className="cta-btn cta-btn-primary">
            EXPLORE PROPERTIES <ArrowRight />
          </Link>
          <Link to="/contact" className="cta-btn cta-btn-outline">
            CONTACT US <ArrowRight />
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          style={{
            marginTop: '80px',
            fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.16)',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
        >
          SHREE MANGAL GROUP · NASHIK, MAHARASHTRA · SINCE 1996
        </motion.p>

      </div>
    </section>
  )
}
