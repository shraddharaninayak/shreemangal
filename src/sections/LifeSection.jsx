import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const MOMENTS = [
  {
    key: 'morning',
    caption: 'MORNING LIGHT',
    src: '/images/smg_gallery-6.jpg',
    alt: 'Sunlit open-plan living room with panoramic city view at golden hour',
    pos: 'center center',
  },
  {
    key: 'community',
    caption: 'COMMUNITY',
    src: '/images/smg_gallery-12.jpg',
    alt: 'Luxury community lounge and social gathering space',
    pos: 'center center',
  },
  {
    key: 'garden',
    caption: 'OPEN SPACES',
    src: '/images/smg_09-SHREE-SWASTIK-MANGAL-VIEW-4-1-1.png',
    alt: 'Aerial view of Shree Swastik Mangal rooftop gardens and open terraces',
    pos: 'center center',
  },
  {
    key: 'evening',
    caption: 'EVENING GLOW',
    src: '/images/smg_kyriad_hotel_hero.png',
    alt: 'Rooftop pool with city skyline at sunset',
    pos: 'center top',
  },
]

function MomentCard({ moment, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <motion.div
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
      initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.04 }}
      animate={inView ? { clipPath: 'inset(0 0 0% 0)', scale: 1 } : {}}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <img
        src={moment.src}
        alt={moment.alt}
        width="1200"
        height="380"
        style={{
          width: '100%',
          height: 'clamp(220px, 28vw, 380px)',
          objectFit: 'cover',
          objectPosition: moment.pos,
          display: 'block',
        }}
        loading="lazy"
      />
      <motion.p
        style={{
          position: 'absolute', bottom: 18, left: 18, zIndex: 3,
          fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: delay + 0.7 }}
      >
        {moment.caption}
      </motion.p>
    </motion.div>
  )
}

export default function LifeSection() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, amount: 0.2 })

  return (
    <section style={{ background: '#F5F0E8' }}>
      <div className="section-pad" style={{ maxWidth: '1340px', margin: '0 auto' }}>

        {/* Chapter label */}
        <motion.p
          className="ch-label"
          style={{ color: 'rgba(28,43,58,0.3)', marginBottom: '60px' }}
          ref={headRef}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          LIFE AT SHREE MANGAL
        </motion.p>

        {/* Headline split */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6vw', marginBottom: '72px', alignItems: 'end',
        }}
          className="life-head-grid"
        >
          <div>
            <h2 className="ed-h2" style={{ color: '#1C2B3A' }}>
              {['LIFE,', 'IN THE', 'DETAILS.'].map((line, i) => (
                <div key={i} className="line-mask">
                  <motion.span
                    style={{ display: 'block' }}
                    initial={{ y: '105%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 1.05, ease: EASE, delay: 0.1 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.45 }}
          >
            <p className="ed-body" style={{ color: 'rgba(28,43,58,0.55)', maxWidth: 400 }}>
              A Shree Mangal home is shaped around the texture of everyday life — the mornings,
              the quiet evenings, the shared moments with neighbours and family.
            </p>
            <p className="ed-body" style={{ color: 'rgba(28,43,58,0.55)', maxWidth: 400, marginTop: 16 }}>
              Every detail — from natural light to open green spaces — is considered with
              the people who will live here in mind.
            </p>
          </motion.div>
        </div>

        {/* Moments grid */}
        <div className="life-moments-grid">
          {MOMENTS.map((moment, i) => (
            <MomentCard key={moment.key} moment={moment} delay={i * 0.1} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .life-head-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
