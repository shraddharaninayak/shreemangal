import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

// ── Shared Animation Wrappers ─────────────────────────────────────────────────

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
        className="neighborhood-img-hover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </motion.div>
  )
}

// ── 1. Hero Section ───────────────────────────────────────────────────────────

function NeighborhoodHero() {
  return (
    <section className="neighborhood-hero-section">
      {/* Background panoramic architectural image */}
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0, ease: EASE }}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        <img
          src="/images/smg_09-SHREE-SWASTIK-MANGAL-VIEW-4-1-1.png"
          alt="Shree Mangal neighborhood skyline and surroundings"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
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
          background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.38) 45%, rgba(10,10,10,0.12) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="neighborhood-hero-content">
        <motion.p
          className="neighborhood-hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          NEIGHBORHOOD
        </motion.p>

        <div className="line-mask" style={{ marginBottom: '18px' }}>
          <motion.h1
            className="neighborhood-hero-h1"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
          >
            Connected to <br />
            <span style={{ color: '#B99A76' }}>What Matters</span>
          </motion.h1>
        </div>

        <motion.p
          className="neighborhood-hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.75 }}
        >
          Enjoy the unique blend of restaurants, bars and cultural attractions plus the convenience of 7 subway lines steps away, a quick ride to mid-Manhattan and Brooklyn.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="neighborhood-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          aria-hidden="true"
        >
          <div className="neighborhood-scroll-line" />
          <span>Explore Location</span>
        </motion.div>
      </div>
    </section>
  )
}

// ── 2. Editorial Introduction ─────────────────────────────────────────────────

function NeighborhoodIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="neighborhood-intro-section" ref={ref}>
      <div className="neighborhood-container">
        <div className="neighborhood-intro-header">
          <motion.p
            className="neighborhood-section-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            THE NEIGHBORHOOD
          </motion.p>

          <div className="line-mask">
            <motion.h2
              className="neighborhood-section-heading"
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.95, ease: EASE, delay: 0.15 }}
            >
              Life Around <br />
              <span className="heading-accent">Your Home</span>
            </motion.h2>
          </div>
        </div>

        <div className="neighborhood-intro-grid">
          <motion.div
            className="neighborhood-intro-col-left"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
            <p className="neighborhood-lead-quote">
              A vibrant setting combining acclaimed dining, celebrated galleries, lush riverside parklands, and comprehensive transit lines.
            </p>
            <div className="neighborhood-quote-accent-bar" />
          </motion.div>

          <motion.div
            className="neighborhood-intro-col-right"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          >
            <p className="neighborhood-body-p">
              Star Tower places you right where cultural energy meets everyday tranquility.
              With seven rapid subway lines within steps, you are only one quick stop away from Midtown Manhattan, Williamsburg, and Greenpoint Brooklyn.
            </p>
            <p className="neighborhood-body-p" style={{ marginTop: '18px' }}>
              From Michelin-starred dining on local avenues to weekend strolls along park riverfronts, every dimension of urban ease is effortlessly within reach.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── 3. Transit & Connectivity Section ─────────────────────────────────────────

const TRANSIT_HUBS = [
  {
    station: 'Court Square',
    lines: ['7', 'E', 'G', 'M'],
    type: 'Subway Interchange',
    note: 'Rapid multi-line hub connecting Midtown & Queens',
  },
  {
    station: 'Queensboro Plaza',
    lines: ['7', 'N', 'Q', 'W'],
    type: 'Express Cross-Platform',
    note: 'Direct connectivity to Broadway & uptown routes',
  },
  {
    station: 'Vernon Blvd.',
    lines: ['7'],
    type: 'Subway Station',
    note: 'One stop to Grand Central & Midtown Manhattan',
  },
  {
    station: 'NYC Ferry',
    lines: ['Ferry'],
    type: '49th Ave. & 21st St.',
    note: 'Scenic waterfront ferry to 34th St, Wall St & Brooklyn',
  },
  {
    station: '23rd & Ely',
    lines: ['E', 'M'],
    type: 'Subway Station',
    note: 'Fast access to 8th Avenue and Queens Boulevard',
  },
  {
    station: '21st St.',
    lines: ['G'],
    type: 'Subway Station',
    note: 'Direct route across Greenpoint, Williamsburg & Brooklyn',
  },
]

const REGIONAL_LINKS = [
  'LaGuardia Airport',
  'Kennedy Airport (JFK)',
  'LIRR (Long Island Rail Road)',
  'Queensboro Bridge',
  'Triboro Bridge',
  'Midtown Tunnel',
  '12+ City Bus Routes',
]

function NeighborhoodTransit() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section className="neighborhood-transit-section" ref={ref}>
      <div className="neighborhood-container">
        
        <div className="neighborhood-transit-header">
          <p className="neighborhood-section-eyebrow">CONNECTIVITY & TRANSIT</p>
          <h2 className="neighborhood-section-heading">
            Metropolitan <br />
            <span className="heading-accent">Transit Lines</span>
          </h2>
          <p className="neighborhood-transit-desc">
            Star Tower is just one stop and a few minutes from midtown Manhattan or Williamsburg and Greenpoint Brooklyn.
            There is quick, easy access to LaGuardia and Kennedy Airports, the LIRR, the NYC Ferry, a dozen bus routes,
            highways, Queensboro and Triboro Bridges and the Midtown Tunnel.
          </p>
        </div>

        {/* Transit Hubs Grid */}
        <div className="neighborhood-transit-grid">
          {TRANSIT_HUBS.map((hub, index) => (
            <motion.div
              key={hub.station}
              className="transit-card"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: index * 0.08 }}
            >
              <div className="transit-card-top">
                <span className="transit-type-label">{hub.type}</span>
                <div className="transit-badge-group">
                  {hub.lines.map((l) => (
                    <span
                      key={l}
                      className={`transit-line-badge ${l === 'Ferry' ? 'badge-ferry' : ''}`}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <h4 className="transit-station-name">{hub.station}</h4>
              <p className="transit-station-note">{hub.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Regional Connections Strip */}
        <motion.div
          className="transit-regional-strip"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          <span className="regional-strip-title">Direct Regional Access:</span>
          <div className="regional-chips-wrap">
            {REGIONAL_LINKS.map((item) => (
              <span key={item} className="regional-chip">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ── 4. Alternating Editorial Showcases ─────────────────────────────────────────

function EditorialShowcases() {
  return (
    <section className="neighborhood-showcase-section">
      <div className="neighborhood-container">

        {/* ── Feature 1: Dining & Nightlife (Text Left, Image Right) ── */}
        <div className="neighborhood-row row-normal">
          <div className="neighborhood-row-text-col">
            <span className="neighborhood-feature-tag">LOCAL SCENE</span>
            <h3 className="neighborhood-row-title">
              Dining & <br />
              <span className="heading-accent">Nightlife</span>
            </h3>
            <p className="neighborhood-row-desc">
              Long Island City has added a thriving bar and restaurant scene to its many attractions, such as Dutch Kills for drinks and Casa Enrique, New York City’s sole Michelin-starred Mexican restaurant and the acclaimed M. Wells Dinette for great meals.
            </p>

            <div className="neighborhood-feature-places-box">
              <div className="feature-place-item">
                <span className="place-dot" />
                <div>
                  <strong>Casa Enrique</strong> — Michelin-starred Mexican cuisine
                </div>
              </div>
              <div className="feature-place-item">
                <span className="place-dot" />
                <div>
                  <strong>Dutch Kills</strong> — Renowned bespoke cocktail lounge
                </div>
              </div>
              <div className="feature-place-item">
                <span className="place-dot" />
                <div>
                  <strong>M. Wells Dinette</strong> — Acclaimed culinary destination
                </div>
              </div>
            </div>
          </div>

          <div className="neighborhood-row-img-col">
            <RevealImage
              src="/images/smg_gallerry_the4.png"
              alt="Dining and vibrant neighborhood lifestyle"
              className="neighborhood-showcase-frame"
            />
          </div>
        </div>

        {/* ── Feature 2: Cultural Institutions (Image Left, Text Right) ── */}
        <div className="neighborhood-row row-reverse">
          <div className="neighborhood-row-img-col">
            <RevealImage
              src="/images/smg_neighborhood_landmarks.jpg"
              alt="World-class cultural landmarks and architectural high-rise tower"
              className="neighborhood-showcase-frame frame-portrait"
            />
          </div>

          <div className="neighborhood-row-text-col">
            <span className="neighborhood-feature-tag">ARTS & HERITAGE</span>
            <h3 className="neighborhood-row-title">
              World-Class <br />
              <span className="heading-accent">Cultural Landmarks</span>
            </h3>
            <p className="neighborhood-row-desc">
              Surrounded by celebrated museums, premier performance centers, and prestigious auction houses, residents enjoy an inspiring blend of world-renowned art and performing institutions just across the avenue.
            </p>

            <div className="neighborhood-feature-places-box">
              <div className="feature-place-item">
                <span className="place-dot" />
                <div>
                  <strong>Guggenheim Museum & Hubert Gallery</strong>
                </div>
              </div>
              <div className="feature-place-item">
                <span className="place-dot" />
                <div>
                  <strong>Lincoln Center & Metropolitan Opera House</strong>
                </div>
              </div>
              <div className="feature-place-item">
                <span className="place-dot" />
                <div>
                  <strong>New York Philharmonic & The Juilliard School</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── 5. Places Directory (Structured by Authentic Categories) ──────────────────

const DIRECTORY_DATA = {
  Cultural: [
    { name: 'Guggenheim Museum', tag: 'Fine Art & Modern Exhibits' },
    { name: 'Hubert Gallery', tag: 'Contemporary Art Collection' },
    { name: 'Jewish Museum', tag: 'Historic & Cultural Exhibitions' },
    { name: 'Neue Galerie', tag: 'Early 20th-Century German & Austrian Art' },
    { name: 'Sotheby’s', tag: 'World-Renowned Fine Art & Auctions' },
    { name: 'Metropolitan Opera House', tag: 'Iconic Performing Arts at Lincoln Center' },
    { name: 'New York Philharmonic', tag: 'Premier Symphonic Performances' },
    { name: 'The Juilliard School', tag: 'World Leader in Performing Arts Education' },
  ],
  'Food & Drink': [
    { name: 'Casa Enrique', tag: 'Michelin-Starred Authentic Mexican' },
    { name: 'Dutch Kills', tag: 'Celebrated Speakeasy & Craft Cocktails' },
    { name: 'M. Wells Dinette', tag: 'Critically Acclaimed Dining' },
    { name: '2 Little Red Hens', tag: 'Renowned Neighborhood Artisan Bakery' },
    { name: 'Alice’s Tea Cup III', tag: 'Boutique Tea Room & Fresh Pastries' },
    { name: 'Cafe D’Alsace', tag: 'Classic French Brasserie Dining' },
    { name: 'Café Jax', tag: 'Cozy Neighborhood Specialty Coffee' },
    { name: 'C-Town Market', tag: 'Everyday Groceries & Fresh Produce' },
  ],
  'Recreation & Parks': [
    { name: 'Carl Schurz Park', tag: 'Scenic Waterfront Promenades & Green Lawns' },
    { name: 'Central Park', tag: 'New York’s Crown Jewel Urban Sanctuary' },
    { name: '86th St. Cinemas', tag: 'Cinema Screening First-Run Releases' },
    { name: 'Art Farm in the City', tag: 'Family & Children’s Creative Education' },
    { name: 'Asphalt Green', tag: 'Comprehensive Sports, Fitness & Aquatics' },
    { name: 'Chocolate Works', tag: 'Confectionery Workshops & Family Fun' },
  ],
  'Retail & Services': [
    { name: 'Bonpoint', tag: 'Luxury Children’s Apparel & Boutiques' },
    { name: 'California Closets', tag: 'Bespoke Interior Systems & Cabinetry' },
    { name: 'Drybar', tag: 'Premier Styling & Hair Care Salon' },
    { name: 'Haute Hippie', tag: 'Designer Apparel & Fashion House' },
    { name: 'Infinity', tag: 'Contemporary Designer Accessories' },
    { name: 'Shopping Centers & Malls', tag: 'Premier Retail Destinations' },
    { name: 'Hospital & Healthcare', tag: 'Immediate Medical Consultation & Care' },
  ],
}

function NeighborhoodDirectory() {
  const [activeTab, setActiveTab] = useState('Cultural')
  const categories = Object.keys(DIRECTORY_DATA)

  return (
    <section className="neighborhood-directory-section">
      <div className="neighborhood-container">
        
        <div className="neighborhood-directory-intro">
          <p className="neighborhood-section-eyebrow">DIRECTORY</p>
          <h2 className="neighborhood-section-heading">
            Everything Within <br />
            <span className="heading-accent">Your Reach</span>
          </h2>
          <p className="neighborhood-directory-sub">
            A comprehensive guide to nearby cultural venues, gourmet culinary destinations, parks, and essential services surrounding your home.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="neighborhood-tab-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`neighborhood-tab-btn ${activeTab === cat ? 'is-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Directory Cards Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="neighborhood-directory-grid"
        >
          {DIRECTORY_DATA[activeTab].map((item, index) => (
            <div key={item.name} className="directory-item-card">
              <div className="directory-card-top">
                <span className="directory-num">0{index + 1}</span>
                <span className="directory-badge">{activeTab}</span>
              </div>
              <h4 className="directory-place-name">{item.name}</h4>
              <p className="directory-place-tag">{item.tag}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ── 6. Full-Width Architectural Breather ───────────────────────────────────────

function NeighborhoodBreather() {
  return (
    <section className="neighborhood-breather-section">
      <div className="neighborhood-breather-bg">
        <img
          src="/images/smg_experience_bg.png"
          alt="Shree Mangal architectural neighborhood environment"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="neighborhood-breather-overlay" />
      </div>

      <div className="neighborhood-container neighborhood-breather-content">
        <div className="neighborhood-breather-card">
          <span className="neighborhood-section-eyebrow" style={{ color: '#B99A76' }}>
            LOCATION ADVANTAGE
          </span>
          <h3 className="neighborhood-breather-title">
            Prime Proximity, <br />
            Unmatched Serenity
          </h3>
          <p className="neighborhood-breather-desc">
            Positioned seamlessly between lively cultural streets and peaceful residential privacy.
            Step into the energetic rhythm of the city or return home to tranquil comfort.
          </p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/availability" className="neighborhood-action-link">
              View Available Residences
            </Link>
            <Link to="/apartment-amenities" className="neighborhood-action-link link-secondary">
              Explore Amenities
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main Page Component ───────────────────────────────────────────────────────

export default function NeighborhoodPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="neighborhood-page">
      <NeighborhoodHero />
      <NeighborhoodIntro />
      <NeighborhoodTransit />
      <EditorialShowcases />
      <NeighborhoodDirectory />
      <NeighborhoodBreather />
      <CTASection />
    </main>
  )
}
