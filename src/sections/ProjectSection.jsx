import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SHREE_MANGAL_PROJECTS } from '../data/projectsData'

const EASE = [0.16, 1, 0.3, 1]

export default function ProjectSection() {
  const scrollWrapperRef = useRef(null)
  const trackRef = useRef(null)
  const [maxScrollX, setMaxScrollX] = useState(0)

  // Measure the exact horizontal distance the track needs to travel so the final card docks cleanly
  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth
        const viewportWidth = window.innerWidth
        // Maximum leftward travel needed: total track width minus visible viewport width
        // Add a safety buffer to ensure the 7th project is fully revealed and aligned
        const distance = Math.max(0, trackWidth - viewportWidth + 60)
        setMaxScrollX(distance)
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Hook scroll progression specifically to the outer tall wrapper
  const { scrollYProgress } = useScroll({
    target: scrollWrapperRef,
    offset: ['start start', 'end end'],
  })

  // Map vertical scroll progress [0, 1] directly to horizontal travel [0, -maxScrollX]
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollX])

  return (
    <>
      {/* ── 1. Tall Pinned Scroll Wrapper for Horizontal Projects Showcase ── */}
      <section
        ref={scrollWrapperRef}
        id="projects"
        className="projects-scroll-wrapper"
        aria-label="Our Projects — Shree Mangal Group"
      >
        {/* Pinned 100vh Viewport */}
        <div className="projects-sticky-viewport">
          <div className="projects-pinned-content">
            {/* Top Editorial Intro Block */}
            <div className="projects-header-block">
              <div className="projects-eyebrow-pill">
                <span className="eyebrow-dot" aria-hidden="true" />
                <span>OUR PROJECTS</span>
              </div>

              <div className="projects-heading-row">
                <h2 className="section-heading projects-main-title">
                  Projects <span className="accent-title heading-accent">That Define</span>
                  <br />
                  Shree Mangal
                </h2>

                <p className="projects-supporting-desc">
                  Explore a collection of residential and commercial developments shaped by
                  thoughtful planning, quality construction and a focus on everyday living in Nashik.
                </p>
              </div>
            </div>

            {/* Continuous Horizontal Project Track */}
            <div className="projects-track-viewport">
              <motion.div
                ref={trackRef}
                className="projects-horizontal-track"
                style={{ x }}
              >
                {SHREE_MANGAL_PROJECTS.map((project, index) => (
                  <div key={project.slug} className="project-card-item">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="project-card-link"
                      aria-label={`View details for ${project.name}`}
                    >
                      {/* Visual Card Image Box with Rounded Corners */}
                      <div className="project-card-media">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="project-card-img"
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />

                        {/* Badges on Top of Card */}
                        <div className="project-card-badges">
                          <span className="card-badge">{project.badge}</span>
                          <span className="card-badge secondary">{project.subBadge}</span>
                        </div>

                        {/* Hover Floating "View" Circle Action */}
                        <div className="project-card-hover-action" aria-hidden="true">
                          <span className="action-circle">
                            <span>View</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Card Editorial Footer Details */}
                      <div className="project-card-info">
                        <h3 className="project-card-name">{project.name}</h3>
                        <div className="project-card-meta">
                          <span className="project-meta-loc">{project.location}</span>
                          <span className="project-meta-status">{project.year}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Building Showcase Section (Separate normal-flow section immediately after Projects) ── */}
      <section className="building-showcase-section" aria-label="Shree Mangal Architectural Showcase">
        <div className="building-showcase-container">
          {/* Subtle Faint Editorial Watermark Behind */}
          <div className="building-watermark" aria-hidden="true">
            Architecture
          </div>

          <motion.div
            className="building-image-frame"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <img
              src="/images/smg_building_isolated.png"
              alt="Shree Mangal architectural modern building design and reflection"
              className="building-showcase-img"
              width="1200"
              height="900"
              loading="lazy"
            />
          </motion.div>

          {/* 2 Buttons below the building */}
          <motion.div
            className="building-actions-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
          >
            <Link to="/apartment-amenities" className="building-action-btn">
              Apartment & Amenities
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>

            <Link to="/availability" className="building-action-btn">
              Availability
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
