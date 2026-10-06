import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SHREE_MANGAL_PROJECTS } from '../data/projectsData'

const EASE = [0.16, 1, 0.3, 1]

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = SHREE_MANGAL_PROJECTS.find((p) => p.slug === slug) || SHREE_MANGAL_PROJECTS[0]

  return (
    <article className="project-detail-container" style={{ background: '#FAF8F5', minHeight: '100vh', color: '#262825', paddingTop: '110px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 72px) 120px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <Link
            to="/"
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#827B6B',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            ← BACK TO HOME
          </Link>
          <span style={{ color: '#C0B7A6' }}>/</span>
          <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#262825', fontWeight: 600 }}>
            {project.name}
          </span>
        </div>

        {/* Hero Title & Classification */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '36px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 12px', background: 'rgba(38,40,37,0.06)', borderRadius: '999px', color: '#555852', fontWeight: 600 }}>
                {project.badge}
              </span>
              <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 12px', background: 'rgba(184,151,114,0.12)', borderRadius: '999px', color: '#9E7E56', fontWeight: 600 }}>
                {project.subBadge}
              </span>
            </div>
            <motion.h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                fontWeight: 600,
                lineHeight: 1.05,
                color: '#262825',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {project.name}
            </motion.h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '13px', color: '#827B6B', margin: '0 0 4px', letterSpacing: '0.04em' }}>{project.location}</p>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#B89772', margin: 0, letterSpacing: '0.04em' }}>{project.status}</p>
          </div>
        </div>

        {/* Cinematic Main Project Image */}
        <motion.div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(360px, 50vw, 680px)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '60px',
            boxShadow: '0 24px 56px -12px rgba(0,0,0,0.12)',
            background: '#EAE6DE',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
        >
          <img
            src={project.image}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        {/* Narrative & Specifications Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B89772', marginBottom: '20px', fontWeight: 600 }}>
              ABOUT THE DEVELOPMENT
            </h2>
            <p style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.65, color: '#3A3D38', margin: '0 0 24px', fontWeight: 400 }}>
              {project.description}
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#71736D', margin: 0 }}>
              Designed and executed under the principles of Shree Mangal Group, ensuring architectural longevity, environmental consideration, and supreme resident satisfaction.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: 'clamp(32px, 4vw, 48px)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B89772', marginBottom: '24px', fontWeight: 600 }}>
              DEVELOPMENT HIGHLIGHTS
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.highlights.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '14px', color: '#3A3D38' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B89772', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <Link
                to="/#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '16px 24px',
                  background: '#262825',
                  color: '#FAF8F5',
                  borderRadius: '12px',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.25s ease',
                }}
              >
                INQUIRE ABOUT THIS PROPERTY
              </Link>
            </div>
          </div>
        </div>

      </div>
    </article>
  )
}
