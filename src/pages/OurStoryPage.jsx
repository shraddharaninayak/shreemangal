import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

// ── Shared Animation Helpers ──────────────────────────────────────────────────

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

// ── Data from Official Sources ────────────────────────────────────────────────

const SERVICES_DATA = [
  {
    num: '01',
    title: 'Flexible, Contemporary Spaces',
    description:
      'We design and service the next generation office building — one that feels more like a full-service, lifestyle hotel.',
    badge: 'Architecture & Design',
    highlight: 'Next-Gen Built Environment',
  },
  {
    num: '02',
    title: 'Dedicated Production And Planning Teams',
    description:
      'We are a team of 300 people who specialize in hospitality, technology, design, and production.',
    badge: 'Multi-Disciplinary Team',
    highlight: '300 Specialist Workforce',
  },
  {
    num: '03',
    title: 'Premium, Fresh Cuisine Made Onsite',
    description:
      'By studying the science of catering to large groups of people, particularly in a business context.',
    badge: 'Hospitality & Dining',
    highlight: 'Culinary Excellence',
  },
  {
    num: '04',
    title: "We're Here To Make You Successful",
    description:
      'For each space we design, each technology item we carry, every meal we prepare, and every line item in the production schedule.',
    badge: 'Client Commitment',
    highlight: 'End-to-End Execution',
  },
  {
    num: '05',
    title: 'Human-Centered Design Friendly Spaces',
    description:
      'Our design philosophy and continuous improvement methodology aims to enhance the experience of every user of our spaces.',
    badge: 'User Experience',
    highlight: 'Human-Centric Standards',
  },
  {
    num: '06',
    title: 'Cutting-Edge Technology',
    description:
      'Our meeting and conference technology is completely integrated within all of our conference centers and meeting spaces.',
    badge: 'Smart Integration',
    highlight: 'Seamless Connectivity',
  },
]

const TEAM_MEMBERS = [
  {
    name: 'Connor Flores',
    role: 'JV Property Management',
    image: '/images/smg_team_1.jpg',
    quote:
      'You may be a skillful, effective employer but if you don’t trust your personnel and the opposite, then the chances of success are limited.',
  },
  {
    name: 'Caroline Vaughn',
    role: 'Project Manager',
    image: '/images/smg_team_3.jpg',
    quote:
      'You may be a skillful, effective employer but if you don’t trust your personnel and the opposite, then the chances of success are limited.',
  },
  {
    name: 'Willie Todd',
    role: 'Senior Architect',
    image: '/images/smg_team_2.jpg',
    quote:
      'You may be a skillful, effective employer but if you don’t trust your personnel and the opposite, then the chances of success are limited.',
  },
  {
    name: 'Josie Maxwell',
    role: 'Project Coordinator',
    image: '/images/smg_team_4.jpg',
    quote:
      'You may be a skillful, effective employer but if you don’t trust your personnel and the opposite, then the chances of success are limited.',
  },
]

const PILLARS_DATA = [
  {
    num: '01',
    title: 'Collaborative Synergy',
    desc: 'Bringing together 300 specialized professionals in design, engineering, hospitality, and tech to deliver seamless environments.',
  },
  {
    num: '02',
    title: 'Human-Centered Philosophy',
    desc: 'Every layout, finish, and spatial volume is shaped around the everyday ergonomics and well-being of the people who inhabit it.',
  },
  {
    num: '03',
    title: 'Uncompromising Execution',
    desc: 'From initial architectural blueprints to day-to-day property management, our standards ensure enduring quality for generations.',
  },
]

// ── 1. Hero Section ───────────────────────────────────────────────────────────

function StoryHero() {
  return (
    <section className="story-hero-section">
      {/* Background architectural image */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        <img
          src="/images/smg_aadiva_bungalow_hero.png"
          alt="Shree Mangal Group architectural excellence"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Subtle refined dark gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(14, 18, 24, 0.88) 0%, rgba(14, 18, 24, 0.42) 50%, rgba(14, 18, 24, 0.22) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero content */}
      <div className="story-hero-content">
        <motion.p
          className="story-hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          OUR STORY
        </motion.p>

        <div className="line-mask" style={{ marginBottom: '18px' }}>
          <motion.h1
            className="story-hero-h1"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.45 }}
          >
            Building More <br />
            <span style={{ color: '#B99A76' }}>Than Spaces</span>
          </motion.h1>
        </div>

        <motion.p
          className="story-hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.7 }}
        >
          A unified journey of architectural vision, human-centered design, and
          dedicated craftsmanship shaping landmark residential, commercial, and
          hospitality destinations.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="story-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
          aria-hidden="true"
        >
          <div className="story-scroll-line" />
          <span>Discover Our Story</span>
        </motion.div>
      </div>
    </section>
  )
}

// ── 2. Who We Are (Company Introduction) ──────────────────────────────────────

function StoryIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="story-intro-section" ref={ref}>
      <div className="story-container">
        <div className="story-intro-grid">
          {/* Left Column: Mission statement */}
          <div>
            <motion.p
              className="story-section-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              WHO WE ARE
            </motion.p>
            <motion.h2
              className="story-intro-h2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            >
              Rooted in Vision, <br />
              <span style={{ color: '#B99A76' }}>Driven by Purpose.</span>
            </motion.h2>

            <motion.div
              className="story-intro-quote-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              <div className="story-quote-border" />
              <p className="story-intro-quote-text">
                “We believe that modern spaces should inspire living and empower
                endeavor—combining timeless aesthetics with intuitive everyday
                functionality.”
              </p>
            </motion.div>
          </div>

          {/* Right Column: Editorial narrative & Key Metrics */}
          <motion.div
            className="story-intro-right"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
          >
            <p className="story-body-lead">
              Shree Mangal Group stands at the intersection of progressive
              architecture and community living. What began as an ambition to
              redefine property development has evolved into an integrated
              ecosystem of residential sanctuaries, dynamic corporate spaces,
              and boutique hospitality ventures.
            </p>
            <p className="story-body-p">
              We design and service the next generation of environments—spaces
              that feel more like full-service, lifestyle hotels, powered by
              integrated technology, thoughtful amenities, and dedicated
              operational management. Every project reflects our continuous
              pursuit of human-centered design and lasting client relationships.
            </p>

            <div className="story-metrics-row">
              <div className="story-metric-item">
                <span className="story-metric-num">300+</span>
                <span className="story-metric-label">Specialist Team Members</span>
              </div>
              <div className="story-metric-item">
                <span className="story-metric-num">100%</span>
                <span className="story-metric-label">Human-Centered Design</span>
              </div>
              <div className="story-metric-item">
                <span className="story-metric-num">Full</span>
                <span className="story-metric-label">Integrated Services</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── 3. Our Services Section ───────────────────────────────────────────────────

function StoryServices() {
  return (
    <section className="story-services-section">
      <div className="story-container">
        <FadeUp>
          <div className="story-section-header-center">
            <p className="story-section-eyebrow">OUR SERVICES</p>
            <h2 className="story-section-h2">
              Comprehensive Capabilities,{' '}
              <span style={{ color: '#B99A76' }}>Seamless Execution</span>
            </h2>
            <p className="story-section-sub">
              From contemporary spatial planning and integrated technology to
              dedicated management and hospitality, we deliver an end-to-end
              standard of living and working.
            </p>
          </div>
        </FadeUp>

        <div className="story-services-grid">
          {SERVICES_DATA.map((srv, idx) => (
            <FadeUp key={srv.num} delay={0.1 * (idx % 3)}>
              <div className="story-service-card">
                <div className="story-service-card-top">
                  <span className="story-service-num">{srv.num}</span>
                  <span className="story-service-badge">{srv.badge}</span>
                </div>
                <h3 className="story-service-title">{srv.title}</h3>
                <p className="story-service-desc">{srv.description}</p>
                <div className="story-service-card-footer">
                  <span className="story-service-highlight">
                    <span className="story-service-dot" />
                    {srv.highlight}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 4. Architectural Visual Break ─────────────────────────────────────────────

function StoryVisualBreak() {
  return (
    <section className="story-break-section">
      <div className="story-break-bg">
        <img
          src="/images/smg_story_philosophy_bg.png"
          alt="Shree Mangal architectural landmark and illuminated rooftop living"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 50%',
            display: 'block',
          }}
        />
      </div>
      <div className="story-break-overlay" />
      <div className="story-container" style={{ position: 'relative', zIndex: 2 }}>
        <FadeUp>
          <div className="story-break-content">
            <span className="story-break-eyebrow">ARCHITECTURAL PHILOSOPHY</span>
            <h2 className="story-break-h2">
              “Every space we craft is an enduring commitment to the lives that
              unfold within it.”
            </h2>
            <p className="story-break-desc">
              Integrating continuous improvement methodologies and cutting-edge
              infrastructure to elevate each inhabitant’s daily experience.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── 5. Our Team / The People Behind Shree Mangal ──────────────────────────────

function StoryTeam() {
  return (
    <section className="story-team-section">
      <div className="story-container">
        {/* Section Header */}
        <FadeUp>
          <div className="story-section-header-center">
            <p className="story-section-eyebrow">THE PEOPLE BEHIND SHREE MANGAL</p>
            <h2 className="story-section-h2">
              Our Leadership & <span style={{ color: '#B99A76' }}>Expertise</span>
            </h2>
            <p className="story-section-sub">
              A passionate, multi-disciplinary team ensuring every milestone,
              design detail, and property management service is delivered with
              unwavering trust.
            </p>
          </div>
        </FadeUp>

        {/* Thought Leadership Editorial Quote */}
        <FadeUp delay={0.15}>
          <div className="story-team-editorial-banner">
            <div className="story-team-editorial-inner">
              <div className="story-team-editorial-badge">INDUSTRY PERSPECTIVE</div>
              <p className="story-team-editorial-quote">
                “We recognise that the ongoing support of an engaged community
                is integral to the future of B2B media, meaning that we’re
                focused on delivering an audience inspired approach to knowledge
                generation and intelligence provision. Through the Building
                family of products and services, our community reach now extends
                across digital, print and live platforms, and as a result we’re
                more than just a media provider; we’re an influential hub for
                world-class thought leadership and innovation.”
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Team Grid */}
        <div className="story-team-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <FadeUp key={member.name + idx} delay={0.1 * idx}>
              <div className="story-team-card">
                <div className="story-team-img-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="story-team-img"
                  />
                  <div className="story-team-img-overlay" />
                </div>
                <div className="story-team-info">
                  <div className="story-team-role">{member.role}</div>
                  <h3 className="story-team-name">{member.name}</h3>
                  <p className="story-team-quote">“{member.quote}”</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 6. People · Places · Purpose (Unifying Bridge) ────────────────────────────

function StoryPillars() {
  return (
    <section className="story-pillars-section">
      <div className="story-container">
        <div className="story-pillars-grid">
          {/* Left Title Box */}
          <div>
            <FadeUp>
              <p className="story-section-eyebrow">OUR APPROACH</p>
              <h2 className="story-pillars-h2">
                People · Places ·{' '}
                <span style={{ color: '#B99A76' }}>Purpose</span>
              </h2>
              <p className="story-pillars-lead">
                The confluence of architectural ingenuity, human talent, and
                continuous client focus creates spaces that stand the test of time.
              </p>
              <div style={{ marginTop: '32px' }}>
                <Link to="/availability" className="story-action-btn">
                  Explore Availability
                </Link>
                <Link
                  to="/apartment-amenities"
                  className="story-action-btn btn-secondary"
                  style={{ marginLeft: '14px' }}
                >
                  View Amenities
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Right Cards */}
          <div className="story-pillars-cards-col">
            {PILLARS_DATA.map((pillar, idx) => (
              <FadeUp key={pillar.num} delay={0.12 * idx}>
                <div className="story-pillar-card">
                  <span className="story-pillar-num">{pillar.num}</span>
                  <div className="story-pillar-body">
                    <h3 className="story-pillar-title">{pillar.title}</h3>
                    <p className="story-pillar-desc">{pillar.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main Page Component ───────────────────────────────────────────────────────

export default function OurStoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Our Story | Shree Mangal Group'
  }, [])

  return (
    <main className="story-page-wrapper">
      <StoryHero />
      <StoryIntro />
      <StoryServices />
      <StoryVisualBreak />
      <StoryTeam />
      <StoryPillars />
      <CTASection />
    </main>
  )
}
