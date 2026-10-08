import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

// ── Reusable Animated Block ───────────────────────────────────────────────────

function FadeUp({ children, delay = 0, style, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function RevealImage({ src, alt, className, style, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, ease: EASE, delay }}
      style={{ overflow: 'hidden', ...style }}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        className="amenity-photo-img"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </motion.div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.25" stroke="#B99A76" strokeWidth="1.5" />
      <path d="M5.5 8.2L7.2 9.9L10.8 6.3" stroke="#B99A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11L11 3M11 3H5M11 3V9" />
    </svg>
  )
}

// ── 1. Hero Section ───────────────────────────────────────────────────────────

function AmenitiesHero() {
  return (
    <section className="amenities-hero-section">
      {/* Background image with cinematic pan-in */}
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0, ease: EASE }}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        <img
          src="/images/amenities_source_1.png"
          alt="Shree Mangal luxury residence living room and sunset terrace"
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
      </motion.div>

      {/* Gentle dark gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.36) 45%, rgba(10,10,10,0.12) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero content */}
      <div className="amenities-hero-content">
        <motion.p
          className="amenities-hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          APARTMENTS & AMENITIES
        </motion.p>

        <div className="line-mask" style={{ marginBottom: '18px' }}>
          <motion.h1
            className="amenities-hero-h1"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
          >
            Designed Around <br />
            <span style={{ color: '#B99A76' }}>Better Living</span>
          </motion.h1>
        </div>

        <motion.p
          className="amenities-hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.75 }}
        >
          Apartment amenities include features of a building that you wouldn’t expect to find everywhere.
          The more amenities a building has, the more likely it will gain a competitive edge in attracting prospective tenants.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="amenities-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          aria-hidden="true"
        >
          <div className="amenities-scroll-line" />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}

// ── 2. Editorial Introduction ─────────────────────────────────────────────────

const COMMON_EXAMPLES = [
  'Fitness Center',
  'Business Center',
  'Balconies',
  'Laundry Room',
  'Swimming Pool',
  'Childcare Center',
  'Playground',
  'Community Room',
]

function AmenitiesIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section className="amenities-intro-section" ref={ref}>
      <div className="amenities-container">
        
        {/* Eyebrow & Main Editorial Heading */}
        <div className="amenities-intro-header">
          <motion.p
            className="amenities-section-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            EDITORIAL PERSPECTIVE
          </motion.p>

          <div className="line-mask">
            <motion.h2
              className="amenities-section-heading"
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.95, ease: EASE, delay: 0.15 }}
            >
              Apartment Amenities <br />
              <span className="heading-accent">to Draw Renters</span>
            </motion.h2>
          </div>
        </div>

        {/* Asymmetric 2-column layout */}
        <div className="amenities-intro-grid">
          {/* Left Column: Renters perspective callout */}
          <motion.div
            className="amenities-intro-col-left"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
            <p className="amenities-lead-quote">
              When you are looking for an apartment, you should keep in mind which amenities are most important for your lifestyle.
              This will be your home for months and even years to come. What will make it more pleasant, and what isn’t worth any extra rental dollars?
            </p>

            <div className="amenities-quote-accent-bar" />
          </motion.div>

          {/* Right Column: Developers / investment insight & lifestyle match */}
          <motion.div
            className="amenities-intro-col-right"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          >
            <p className="amenities-body-p">
              For owners and developers, it is important to know which amenities will give the most return on their investment.
              Whether you are designing a new apartment complex or renovating an existing one, it pays to stay up on the trends.
              Some amenities, such as a pool, require not only an initial allocation of space and expense to build but significant ongoing maintenance.
              Others can be installed at little initial or ongoing cost. Some can even save a landlord money and time.
            </p>

            <p className="amenities-body-p" style={{ marginTop: '20px' }}>
              Which amenities are valued most by renters also depends on their age group and lifestyle.
              Is it a family-friendly building? Is it in a college market? Is it best for retired, empty-nest renters?
            </p>
          </motion.div>
        </div>

        {/* Common Examples Chip Bar */}
        <motion.div
          className="amenities-common-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          <span className="amenities-common-title">Common Examples:</span>
          <div className="amenities-chip-wrap">
            {COMMON_EXAMPLES.map((item) => (
              <span key={item} className="amenities-pill">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ── 3. Alternating Major Amenities Showcase ───────────────────────────────────

const MAJOR_AMENITIES = [
  {
    id: 'transportation',
    categoryNumber: '01',
    categoryName: 'Transportation / Parking Amenities',
    tag: 'MOBILITY & VEHICLE CARE',
    image: '/images/amenities_source_2.png',
    imageAlt: 'Covered and secure parking facility with dedicated spaces',
    description:
      'Convenient, sheltered parking infrastructure designed for ease of mobility, daily vehicle protection, and sustainable electric transit.',
    items: [
      'Covered parking',
      'Assigned parking spaces',
      'Bike storage lockers',
      'Shared car services',
      'Electric car charging stations',
    ],
  },
  {
    id: 'unit',
    categoryNumber: '02',
    categoryName: 'Unit Amenities',
    tag: 'IN-RESIDENCE REFINEMENT',
    image: '/images/amenities_source_3.png',
    imageAlt: 'Modern apartment interior with wood flooring and private terrace',
    description:
      'Thoughtful in-unit features that elevate daily comfort, maximize natural light and airflow, and provide generous private storage.',
    items: [
      'Air-conditioning',
      'Fireplace',
      'Patio or balcony',
      'Wood flooring',
      'Storage in unit',
    ],
  },
  {
    id: 'miscellaneous',
    categoryNumber: '03',
    categoryName: 'Miscellaneous Amenities',
    tag: 'SAFETY & CONTROLLED ACCESS',
    image: '/images/amenities_source_4.png',
    imageAlt: 'Secure residential living with private suites and 24/7 security',
    description:
      'Continuous peace of mind ensured by trained security personnel, controlled access entryways, and dedicated premises storage.',
    items: [
      'Storage',
      'Security cameras',
      'Security guard',
      'Doorman',
      'Gated access',
    ],
  },
]

function AmenityRow({ data, index }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <div
      ref={ref}
      id={data.id}
      className={`amenity-row ${isEven ? 'row-normal' : 'row-reverse'}`}
    >
      {/* Image column */}
      <div className="amenity-row-image-col">
        <RevealImage
          src={data.image}
          alt={data.imageAlt}
          className="amenity-showcase-img-wrap"
          delay={0.2}
        />
      </div>

      {/* Content column */}
      <motion.div
        className="amenity-row-text-col"
        initial={{ opacity: 0, x: isEven ? 28 : -28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.95, ease: EASE, delay: 0.35 }}
      >
        <div className="amenity-category-header">
          <span className="amenity-num-badge">{data.categoryNumber}</span>
          <span className="amenity-cat-tag">{data.tag}</span>
        </div>

        <h3 className="amenity-row-title">{data.categoryName}</h3>

        <p className="amenity-row-desc">{data.description}</p>

        <ul className="amenity-item-list">
          {data.items.map((item) => (
            <li key={item} className="amenity-list-item">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

function MajorAmenitiesShowcase() {
  return (
    <section className="amenities-showcase-section">
      <div className="amenities-container">
        
        <div className="amenities-showcase-intro">
          <p className="amenities-section-eyebrow">AMENITIES BY CATEGORY</p>
          <h2 className="amenities-section-heading">
            Curated Living <br />
            <span className="heading-accent">By Category</span>
          </h2>
        </div>

        <div className="amenity-rows-container">
          {MAJOR_AMENITIES.map((item, idx) => (
            <AmenityRow key={item.id} data={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  )
}

// ── 4. Featured Amenity (Full-Width Cinematic Showcase) ───────────────────────

function FeaturedAmenity() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="amenities-featured-section" ref={ref}>
      {/* Background full-width architectural image */}
      <div className="amenities-featured-bg-wrap">
        <img
          src="/images/smg_resident_lounge.jpg"
          alt="Shree Mangal luxury resident lounge with high-speed Wi-Fi and city views"
          className="amenities-featured-bg-img"
          style={{ objectPosition: '68% center' }}
        />
        <div className="amenities-featured-overlay" />
      </div>

      <div className="amenities-container amenities-featured-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
          className="amenities-featured-card"
        >
          <span className="amenities-featured-eyebrow">FEATURED AMENITY</span>

          <h2 className="amenities-featured-title">
            Resident Lounge <br />
            <span style={{ color: '#B99A76' }}>with High-Speed Wi-Fi</span>
          </h2>

          <p className="amenities-featured-desc">
            A central gathering place designed for both quiet focus and community social connection.
            Whether working remotely, hosting guests, or unwinding with a book, the resident lounge combines comfortable seating,
            high-speed wireless connectivity, and expansive views.
          </p>

          {/* Highlight badges from source */}
          <div className="amenities-featured-badges">
            <span className="amenities-badge-item">No Broker Fees</span>
            <span className="amenities-badge-item">Bike Storage</span>
            <span className="amenities-badge-item">Walk to Whole Foods</span>
            <span className="amenities-badge-item">Near FIT</span>
            <span className="amenities-badge-item">Resident Lounge with Wi-Fi</span>
            <span className="amenities-badge-item">Resident Social</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── 5. Community Amenities Grid ───────────────────────────────────────────────

const COMMUNITY_AMENITIES = [
  {
    name: 'Package Service',
    description: 'Dedicated parcel reception and organized package handling for contactless resident deliveries.',
    tag: 'CONVENIENCE',
  },
  {
    name: '24-hour Fitness Center',
    description: 'Round-the-clock wellness and cardio center tailored for flexible, on-demand training.',
    tag: 'WELLNESS',
  },
  {
    name: 'Valet Dry Cleaning Service',
    description: 'Effortless garment care with doorstep drop-off and pickup coordination for busy schedules.',
    tag: 'HOSPITALITY',
  },
  {
    name: 'Resident Lounge with Wi-Fi',
    description: 'Connected co-working and relaxation lounge with complimentary high-speed wireless access.',
    tag: 'COMMUNITY',
  },
  {
    name: 'Clinic / Medical',
    description: 'Immediate access to wellness consultation and essential medical facilities on-premise.',
    tag: 'HEALTHCARE',
  },
  {
    name: 'Wells Fargo Bank On-site',
    description: 'Convenient full-service banking institution and ATM facilities located right on the property.',
    tag: 'FINANCIAL',
  },
  {
    name: 'Resident Billiards',
    description: 'Dedicated recreational gaming room with tournament-grade billiards table and lounge seating.',
    tag: 'RECREATION',
  },
  {
    name: 'Walk to Whole Foods',
    description: 'Prime neighborhood walkability with immediate pedestrian proximity to organic grocers.',
    tag: 'NEIGHBORHOOD',
  },
]

function CommunityAmenitiesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="amenities-community-section" ref={ref}>
      <div className="amenities-container">
        
        <div className="amenities-community-intro">
          <p className="amenities-section-eyebrow">COMMUNITY & LIFESTYLE</p>
          <h2 className="amenities-section-heading">
            Community <br />
            <span className="heading-accent">Amenities</span>
          </h2>
          <p className="amenities-community-sub">
            Each residential development integrates neighborhood advantages and on-site facilities designed to enhance quality of life,
            streamline daily errands, and foster community belonging.
          </p>
        </div>

        <div className="amenities-cards-grid">
          {COMMUNITY_AMENITIES.map((amenity, index) => (
            <motion.div
              key={amenity.name}
              className="amenity-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: index * 0.08 }}
            >
              <div className="amenity-card-top">
                <span className="amenity-card-tag">{amenity.tag}</span>
                <span className="amenity-card-index">0{index + 1}</span>
              </div>

              <h4 className="amenity-card-title">{amenity.name}</h4>

              <p className="amenity-card-desc">{amenity.description}</p>

              <div className="amenity-card-footer">
                <span className="amenity-card-bullet" />
                <span className="amenity-card-sub">Shree Mangal Group Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Summary Bar */}
        <motion.div
          className="amenities-footer-feature-strip"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
        >
          <div className="amenities-strip-item">
            <span className="strip-check">✓</span>
            <span>No Broker Fees</span>
          </div>
          <div className="amenities-strip-item">
            <span className="strip-check">✓</span>
            <span>Bike Storage</span>
          </div>
          <div className="amenities-strip-item">
            <span className="strip-check">✓</span>
            <span>Walk to Whole Foods</span>
          </div>
          <div className="amenities-strip-item">
            <span className="strip-check">✓</span>
            <span>Near FIT</span>
          </div>
          <div className="amenities-strip-item">
            <span className="strip-check">✓</span>
            <span>Resident Lounge with Wi-Fi</span>
          </div>
          <div className="amenities-strip-item">
            <span className="strip-check">✓</span>
            <span>Resident Social</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ── Main Page Component ───────────────────────────────────────────────────────

export default function ApartmentsAmenitiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="apartments-amenities-page">
      <AmenitiesHero />
      <AmenitiesIntro />
      <MajorAmenitiesShowcase />
      <FeaturedAmenity />
      <CommunityAmenitiesGrid />
      <CTASection />
    </main>
  )
}
