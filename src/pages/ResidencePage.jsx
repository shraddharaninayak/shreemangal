import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

// ── Shared animation helpers ──────────────────────────────────────────────────

function FadeUp({ children, delay = 0, style, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function RevealImage({ src, alt, style, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, ease: EASE, delay }}
      style={{ overflow: 'hidden', height: '100%', ...style }}
    >
      <img
        src={src}
        alt={alt}
        className="res-hover-img"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ROOMS = [
  {
    tag: 'KITCHEN',
    heading: 'Chef Inspired Kitchen',
    body: 'Quartz countertops, modern cabinetry, and BOSCH appliances  a kitchen crafted for those who appreciate both form and function in equal measure.',
    image: '/images/smg_residence_kitchen.jpg',
    alt: 'Chef-inspired kitchen with modern cabinetry',
  },
  {
    tag: 'BEDROOM',
    heading: 'Supremely Comfortable Bedroom',
    body: 'A private sanctuary, thoughtfully proportioned with generous natural light and views that connect you to the life of the city beyond.',
    image: '/images/smg_residence_bedroom.jpg',
    alt: 'Residence bedroom interior',
  },
  {
    tag: 'LIVING ROOM',
    heading: 'Spacious Living Room',
    body: '8-foot floor-to-ceiling windows frame views of streets, parks, and city life. Bringing the outside world into your everyday living space.',
    image: '/images/smg_residence_img6.jpg',
    alt: 'Spacious residence living room with expansive windows',
  },
]

const SPECS = [
  { label: 'Floors', value: '39' },
  { label: 'Total Residences', value: '98 Unique Units' },
  { label: 'Unit Types', value: '1 & 2 Bedroom Homes' },
  { label: 'Windows', value: '8-Foot Floor-to-Ceiling' },
  { label: 'Kitchen Countertops', value: 'Quartz' },
  { label: 'Appliances', value: 'BOSCH Range, Microwave & Dishwasher' },
  { label: 'Cabinetry', value: 'Modern Contemporary' },
]

// ── Hero ──────────────────────────────────────────────────────────────────────

function ResHero() {
  return (
    <section className="res-hero-section">
      {/* Background image with cinematic pan-in */}
      <motion.div
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        <img
          src="/images/smg_residence_hero.png"
          alt="Shree Mangal Group luxury residence interior"
          loading="eager"
          fetchpriority="high"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Elegant contrast gradient - subtle to preserve HD clarity while keeping text readable */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.76) 0%, rgba(10,10,10,0.28) 40%, rgba(10,10,10,0.04) 70%, rgba(10,10,10,0.15) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="res-hero-content">
        <motion.p
          className="res-hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
        >
          Residences
        </motion.p>

        <div className="line-mask" style={{ marginBottom: '20px' }}>
          <motion.h1
            className="res-hero-h1"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
          >
            Residences
          </motion.h1>
        </div>

        <motion.p
          className="res-hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.85 }}
        >
          39 floors. 98 unique residences. Each individually designed, surrounded by views of streets, parks, and the life of the city.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="res-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          aria-hidden="true"
        >
          <div className="res-scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

// ── Introduction ──────────────────────────────────────────────────────────────

function ResIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <section className="res-intro-section">
      <div ref={ref} className="res-intro-grid">

        {/* Left: large image */}
        <motion.div
          className="res-intro-img-wrap"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img
            src="/images/smg_residence_img7.png"
            alt="Shree Mangal residence interior and skyline views"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '80% center',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Right: editorial text */}
        <div className="res-intro-text">
          <motion.p
            className="res-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Introduction
          </motion.p>

          <div className="line-mask">
            <motion.h2
              className="res-intro-heading"
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.0, ease: EASE, delay: 0.22 }}
            >
              Inside, outside.{' '}
              <span style={{ color: '#B99A76' }}>An elegant giant focused on details.</span>
            </motion.h2>
          </div>

          <motion.p
            className="res-intro-body"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.38 }}
          >
            Maisonco features 39 floors with 98 unique residences, surrounded by views of streets, parks, and city life. Each residence is individually designed a home that responds to its surroundings with intention and care.
          </motion.p>

          <motion.p
            className="res-intro-body"
            style={{ marginTop: '16px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.5 }}
          >
            From chef-inspired kitchens with BOSCH appliances to supremely comfortable bedrooms with generous natural light, every detail has been considered with lasting quality in mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
          >
          </motion.div>
        </div>

      </div>
    </section>
  )
}

// ── Room Showcase ─────────────────────────────────────────────────────────────

function RoomRow({ room, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className={`res-room-row ${isEven ? '' : 'res-room-row-reverse'}`}>

      {/* Image block */}
      <motion.div
        className="res-room-img-wrap"
        initial={{ opacity: 0, x: isEven ? -20 : 20, scale: 0.97 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <img
          src={room.image}
          alt={room.alt}
          className="res-hover-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>

      {/* Text block */}
      <div className="res-room-text">
        <motion.p
          className="res-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          {room.tag}
        </motion.p>

        <div className="line-mask">
          <motion.h3
            className="res-room-heading"
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.95, ease: EASE, delay: 0.22 }}
          >
            {room.heading}
          </motion.h3>
        </div>

        <motion.p
          className="res-room-body"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE, delay: 0.35 }}
        >
          {room.body}
        </motion.p>
      </div>

    </div>
  )
}

function ResRooms() {
  return (
    <section className="res-rooms-section">
      <div style={{ maxWidth: '1340px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: 'clamp(48px, 7vh, 84px)' }}>
          <p className="res-eyebrow">Inside Every Home</p>
          <h2 className="section-heading" style={{ maxWidth: '680px', marginTop: '12px' }}>
            Designed around<br />
            <span className="heading-accent">comfort & craft</span>
          </h2>
        </FadeUp>

        {ROOMS.map((room, i) => (
          <RoomRow key={room.tag} room={room} index={i} />
        ))}

      </div>
    </section>
  )
}

// ── Specifications ────────────────────────────────────────────────────────────

function ResSpecs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <section className="res-specs-section">
      {/* Background Image Container */}
      <div className="res-specs-bg">
        <img
          src="/images/smg_residence_specs_bg.jpg"
          alt="Shree Mangal luxury residence interior specifications"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            display: 'block',
          }}
        />
        <div className="res-specs-overlay" />
      </div>

      <div ref={ref} style={{ maxWidth: '1340px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
          style={{ marginBottom: 'clamp(48px, 6vh, 72px)' }}
        >
          <p className="res-eyebrow" style={{ color: '#B89772' }}>Property Details</p>
          <h2 className="section-heading is-dark-theme" style={{ marginTop: '12px' }}>
            Residence<br />
            <span className="heading-accent">Specifications</span>
          </h2>
        </motion.div>

        <div className="res-specs-grid">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="res-spec-item"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            >
              <p className="res-spec-label">{spec.label}</p>
              <p className="res-spec-value">{spec.value}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResidencePage() {
  return (
    <main style={{ background: '#FAF8F5', minHeight: '100vh', color: '#262825', overflowX: 'hidden' }}>
      <ResHero />
      <ResIntro />
      <ResRooms />
      <ResSpecs />
      <CTASection />
    </main>
  )
}
