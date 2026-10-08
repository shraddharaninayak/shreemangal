import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

// ── Shared Animation Components ───────────────────────────────────────────────

function RevealImage({ src, alt, className, style, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, ease: EASE, delay }}
      style={{ overflow: 'hidden', ...style }}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        className="services-img-hover"
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

// ── Check Icon ────────────────────────────────────────────────────────────────

function CheckDot() {
  return (
    <span
      className="services-check-dot"
      aria-hidden="true"
    />
  )
}

// ── 1. Hero Section ───────────────────────────────────────────────────────────

function ServicesHero() {
  return (
    <section className="services-hero-section">
      {/* Background architectural image */}
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0, ease: EASE }}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        <img
          src="/images/smg_kyriad_hotel_hero.png"
          alt="Shree Mangal Group hospitality and services"
          loading="eager"
          fetchPriority="high"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 38%',
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
          background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.42) 50%, rgba(10,10,10,0.15) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="services-hero-content">
        <motion.p
          className="services-hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          OUR SERVICES
        </motion.p>

        <div className="line-mask" style={{ marginBottom: '18px' }}>
          <motion.h1
            className="services-hero-h1"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
          >
            Hospitality, Spaces & <br />
            <span style={{ color: '#B99A76' }}>Specialized Production</span>
          </motion.h1>
        </div>

        <motion.p
          className="services-hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.75 }}
        >
          We design and service the next generation building – combining contemporary spaces, dedicated planning teams, onsite cuisine, and human-centered design.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="services-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          aria-hidden="true"
        >
          <div className="services-scroll-line" />
          <span>Explore Capabilities</span>
        </motion.div>
      </div>
    </section>
  )
}

// ── 2. Editorial Introduction ─────────────────────────────────────────────────

function ServicesIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="services-intro-section" ref={ref}>
      <div className="services-container">
        <div className="services-intro-header">
          <motion.p
            className="services-section-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            THE SHREE MANGAL STANDARD
          </motion.p>

          <div className="line-mask">
            <motion.h2
              className="services-section-heading"
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.95, ease: EASE, delay: 0.15 }}
            >
              We’re Here To <br />
              <span className="heading-accent">Make You Successful</span>
            </motion.h2>
          </div>
        </div>

        <div className="services-intro-grid">
          <motion.div
            className="services-intro-col-left"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
            <p className="services-lead-quote">
              “For each space we design, each technology item we carry, every meal we prepare, and every line item in the production schedule.”
            </p>
            <div className="services-quote-accent-bar" />
          </motion.div>

          <motion.div
            className="services-intro-col-right"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          >
            <p className="services-body-p">
              We are a team of 300 people who specialize in hospitality, technology, design, and production.
              From lifestyle hospitality to modern commercial hubs, we develop and service properties that deliver enduring comfort and performance.
            </p>
            <p className="services-body-p" style={{ marginTop: '18px' }}>
              Our design philosophy and continuous improvement methodology aims to enhance the experience of every user of our spaces, creating seamless harmony between architecture, hospitality, and daily functionality.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── 3. Four Core Editorial Services ───────────────────────────────────────────

function ServicesShowcase() {
  return (
    <section className="services-showcase-section">
      <div className="services-container">

        {/* ── Service 1: Flexible, Contemporary Spaces (Text Left, Image Right) ── */}
        <div className="services-row row-normal">
          <div className="services-row-text-col">
            <span className="services-feature-tag">WORKSPACE & HOSPITALITY</span>
            <h3 className="services-row-title">
              Flexible, <br />
              <span className="heading-accent">Contemporary Spaces</span>
            </h3>
            <p className="services-row-desc">
              We design and service the next generation office building – one that feels more like a full-service, lifestyle hotel.
            </p>

            <div className="services-feature-list">
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>24-hour reception</strong> for around-the-clock assistance</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Check-in possible after 15.00</strong></div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Latest check-out by 12.00</strong></div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Breakfast buffet</strong> prepared daily</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Lunch from 11.00</strong> & <strong>Dinner from 17.30</strong></div>
              </div>
            </div>
          </div>

          <div className="services-row-img-col">
            <RevealImage
              src="/images/smg_mangal_business_hub.jpg"
              alt="Flexible contemporary spaces at Mangal Business Hub"
              className="services-showcase-frame"
            />
          </div>
        </div>

        {/* ── Service 2: Dedicated Production And Planning Teams (Image Left, Text Right) ── */}
        <div className="services-row row-reverse">
          <div className="services-row-img-col">
            <RevealImage
              src="/images/smg_resident_lounge.jpg"
              alt="Dedicated production and planning team environments"
              className="services-showcase-frame"
            />
          </div>

          <div className="services-row-text-col">
            <span className="services-feature-tag">OPERATIONAL EXPERTISE</span>
            <h3 className="services-row-title">
              Dedicated Production <br />
              <span className="heading-accent">And Planning Teams</span>
            </h3>
            <p className="services-row-desc">
              We are a team of 300 people who specialize in hospitality, technology, design, and production.
            </p>

            <div className="services-feature-list">
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Room service</strong> available with responsive execution</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Allergy friendly rooms</strong> designed for ultimate comfort</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Rooms with connecting doors</strong> for flexible stays</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Air conditioning</strong> climate control across all rooms</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Coffee and tea facilities</strong> in all rooms</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Free Wi-Fi</strong> in all rooms for seamless connectivity</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Service 3: Premium, Fresh Cuisine Made Onsite (Text Left, Image Right) ── */}
        <div className="services-row row-normal">
          <div className="services-row-text-col">
            <span className="services-feature-tag">DINING & CONFERENCES</span>
            <h3 className="services-row-title">
              Premium, Fresh <br />
              <span className="heading-accent">Cuisine Made Onsite</span>
            </h3>
            <p className="services-row-desc">
              By studying the science of catering to large groups of people, particularly in a business context.
            </p>

            <div className="services-feature-list">
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Fitness Center</strong> equipped for wellness & active living</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Lounge with open fire</strong> for cozy gatherings & relaxation</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Business lounge</strong> with high-speed free Wi-Fi</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Six conference rooms</strong> tailored for meetings & seminars</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Free WiFi</strong> across meeting rooms, lobby and restaurants</div>
              </div>
            </div>
          </div>

          <div className="services-row-img-col">
            <RevealImage
              src="/images/smg_gallerry_the4.png"
              alt="Premium fresh cuisine dining and lounge spaces"
              className="services-showcase-frame"
            />
          </div>
        </div>

        {/* ── Service 4: Human-Centered Design Friendly Spaces (Image Left, Text Right) ── */}
        <div className="services-row row-reverse">
          <div className="services-row-img-col">
            <RevealImage
              src="/images/smg_kyriad_hotel_hero.png"
              alt="Human-centered design friendly hospitality spaces"
              className="services-showcase-frame"
            />
          </div>

          <div className="services-row-text-col">
            <span className="services-feature-tag">USER EXPERIENCE</span>
            <h3 className="services-row-title">
              Human-Centered Design <br />
              <span className="heading-accent">Friendly Spaces</span>
            </h3>
            <p className="services-row-desc">
              Our design philosophy and continuous improvement methodology aims to enhance the experience of every user of our spaces.
            </p>

            <div className="services-feature-list">
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Wake-up call</strong> on-demand personalized service</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Sightseeing</strong> recommendations & destination guidance</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Car hire, Bicycle hire</strong> convenience for local mobility</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Laundry and dry cleaning</strong> professional garment care</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Option to borrow a fridge</strong> for the room</div>
              </div>
              <div className="services-feature-item">
                <CheckDot />
                <div><strong>Own parking space</strong> dedicated on-premise vehicle parking</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── 4. Strategic Capabilities Pillars ─────────────────────────────────────────

function StrategicPillars() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const PILLARS = [
    {
      num: '01',
      title: 'Cutting-Edge Technology',
      body: 'Our meeting and conference technology is completely integrated within all of our conference centers and meeting spaces.',
      tag: 'DIGITAL INFRASTRUCTURE',
    },
    {
      num: '02',
      title: 'We’re Here To Make You Successful',
      body: 'For each space we design, each technology item we carry, every meal we prepare, and every line item in the production schedule.',
      tag: 'COMMITMENT TO EXCELLENCE',
    },
    {
      num: '03',
      title: 'Human-Centered Design',
      body: 'Our design philosophy and continuous improvement methodology aims to enhance the experience of every user of our spaces.',
      tag: 'PURPOSEFUL SPACES',
    },
  ]

  return (
    <section className="services-pillars-section" ref={ref}>
      <div className="services-container">
        
        <div className="services-pillars-intro">
          <p className="services-section-eyebrow">CAPABILITY HIGHLIGHTS</p>
          <h2 className="services-section-heading">
            Integrated Precision <br />
            <span className="heading-accent">Across Every Detail</span>
          </h2>
        </div>

        <div className="services-pillars-grid">
          {PILLARS.map((p, idx) => (
            <motion.div
              key={p.num}
              className="pillar-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: idx * 0.12 }}
            >
              <div className="pillar-top">
                <span className="pillar-num">{p.num}</span>
                <span className="pillar-tag">{p.tag}</span>
              </div>
              <h4 className="pillar-title">{p.title}</h4>
              <p className="pillar-body">{p.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── 5. Architectural Breather ──────────────────────────────────────────────────

function ServicesBreather() {
  return (
    <section className="services-breather-section">
      <div className="services-breather-bg">
        <img
          src="/images/smg_experience_bg.png"
          alt="Shree Mangal Group architectural development"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="services-breather-overlay" />
      </div>

      <div className="services-container services-breather-content">
        <div className="services-breather-card">
          <span className="services-section-eyebrow" style={{ color: '#B99A76' }}>
            TRUSTED REAL ESTATE PARTNER
          </span>
          <h3 className="services-breather-title">
            Built Around Quality, <br />
            Comfort & Value
          </h3>
          <p className="services-breather-desc">
            With decades of experience across Nashik, Shree Mangal Group crafts spaces where thoughtfulness meets lasting construction value.
          </p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/residences" className="services-action-link">
              Explore Residences
            </Link>
            <Link to="/contact" className="services-action-link link-secondary">
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main Page Component ───────────────────────────────────────────────────────

export default function OurServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="services-page">
      <ServicesHero />
      <ServicesIntro />
      <ServicesShowcase />
      <StrategicPillars />
      <ServicesBreather />
      <CTASection />
    </main>
  )
}
