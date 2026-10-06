import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

const UNITS = [
  {
    id: 'ph1512-1',
    tower: 'TOWER PH1512',
    unitType: 'Penthouse Residence',
    specs: '3 Bedrooms · 3,450 Sq Ft · Panoramic Views',
    image: '/images/smg_img-06.jpg',
    status: 'Available',
  },
  {
    id: 'ph1512-2',
    tower: 'TOWER PH1512',
    unitType: 'Sky Villa Suite',
    specs: '3 Bedrooms · 3,200 Sq Ft · City Skyline Terrace',
    image: '/images/smg_img-07.jpg',
    status: 'Available',
  },
  {
    id: 'ph1514-1',
    tower: 'TOWER PH1514',
    unitType: 'Grand Corner Residence',
    specs: '2 Bedrooms · 2,680 Sq Ft · Dual Aspect Glass',
    image: '/images/smg_img-08.jpg',
    status: 'Available',
  },
  {
    id: 'ph1514-2',
    tower: 'TOWER PH1514',
    unitType: 'Executive Residence',
    specs: '2 Bedrooms · 2,420 Sq Ft · Sunset Balcony',
    image: '/images/smg_img-09.jpg',
    status: 'Available',
  },
  {
    id: 'ph1514-3',
    tower: 'TOWER PH1514',
    unitType: 'Deluxe Suite',
    specs: '1 Bedroom · 1,850 Sq Ft · Designer Interior',
    image: '/images/smg_residence_bedroom.jpg',
    status: 'Available',
  },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

export default function AvailabilityPage() {
  const introRef = useRef(null)
  const isIntroInView = useInView(introRef, { once: true, amount: 0.15 })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main style={{ background: '#FAF8F5', minHeight: '100vh', color: '#262825', overflowX: 'hidden' }}>
      
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="res-hero-section">
        <motion.div
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        >
          <img
            src="/images/smg_swastik_mangal_clean.jpg"
            alt="Shree Mangal luxury residence availability"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }}
          />
        </motion.div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.32) 42%, rgba(10,10,10,0.12) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div className="res-hero-content">
          <motion.p
            className="res-hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            style={{ color: '#B99A76' }}
          >
            CURRENT PROPERTIES
          </motion.p>

          <div className="line-mask" style={{ marginBottom: '18px' }}>
            <motion.h1
              className="res-hero-h1"
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
            >
              Availability
            </motion.h1>
          </div>

          <motion.p
            className="res-hero-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.75 }}
          >
            Explore available residential towers and signature penthouse suites across Shree Mangal Group developments.
          </motion.p>
        </div>
      </section>

      {/* ── 2. Editorial Lead ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#FAF8F5', paddingTop: 'clamp(80px, 10vh, 130px)', paddingBottom: 'clamp(40px, 6vh, 80px)' }}>
        <div ref={introRef} className="amenities-container">
          <div style={{ maxWidth: 760 }}>
            <motion.p
              className="amenities-section-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              RESERVE YOUR SPACE
            </motion.p>

            <motion.h2
              className="amenities-section-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            >
              Go On, Unpack <br />
              <span className="heading-accent">Your Life Here</span>
            </motion.h2>

            <motion.p
              className="amenities-body-p"
              style={{ marginTop: '24px' }}
              initial={{ opacity: 0, y: 16 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
            >
              Each residence combines expansive floorplans, floor-to-ceiling windows, private terraces, and premium finishes.
              Select from available units below or schedule a private presentation with our leasing team.
            </motion.p>
          </div>

          {/* ── 3. Units Listing Grid ──────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '64px' }}>
            {UNITS.map((unit, index) => (
              <motion.div
                key={unit.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(38,40,37,0.08)',
                  boxShadow: '0 16px 36px -12px rgba(28,43,58,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: EASE, delay: index * 0.08 }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={unit.image}
                    alt={unit.tower}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(14, 18, 24, 0.8)',
                      backdropFilter: 'blur(8px)',
                      color: '#B99A76',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    {unit.status}
                  </span>
                </div>

                <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B99A76' }}>
                      {unit.tower}
                    </span>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 600, color: '#1C2B3A', margin: '8px 0 10px' }}>
                      {unit.unitType}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6E706B', lineHeight: 1.6, margin: 0 }}>
                      {unit.specs}
                    </p>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(38,40,37,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link
                      to="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#1C2B3A',
                        textDecoration: 'none',
                      }}
                    >
                      Schedule Appointment <ArrowRight />
                    </Link>

                    <Link
                      to="/apartment-amenities"
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 500,
                        color: '#B99A76',
                        textDecoration: 'none',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      View Amenities
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. CTA ─────────────────────────────────────────────── */}
      <CTASection />
    </main>
  )
}
