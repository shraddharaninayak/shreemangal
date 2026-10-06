import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const VALUES = [
  {
    num: '01',
    title: 'QUALITY',
    desc: 'Every space we build is designed with the care it deserves — crafted for longevity, comfort and day-to-day living.',
  },
  {
    num: '02',
    title: 'TRUST',
    desc: 'Over 2,500 families have called a Shree Mangal home their own. That trust shapes everything we do.',
  },
  {
    num: '03',
    title: 'COMMITMENT',
    desc: 'From the first foundation to final handover, we stand by our promise — built on 25 years of consistent delivery.',
  },
]

function ValueRow({ value, delay, isLight }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <motion.div
      ref={ref}
      className="essence-value"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      <span style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(11px, 1vw, 13px)',
        fontWeight: 500,
        color: 'rgba(28,43,58,0.28)',
        letterSpacing: '0.08em',
        minWidth: 28,
        alignSelf: 'flex-start',
        paddingTop: 4,
      }}>
        {value.num}
      </span>

      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(24px, 2.4vw, 38px)',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#1C2B3A',
          lineHeight: 1.1,
          marginBottom: 12,
        }}>
          {value.title}
        </p>
        <p className="ed-body" style={{ color: 'rgba(28,43,58,0.55)', maxWidth: 520 }}>
          {value.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function EssenceSection() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, amount: 0.2 })

  return (
    <section style={{ background: '#F5F2ED' }}>
      <div className="section-pad" style={{ maxWidth: '1340px', margin: '0 auto' }}>

        {/* Chapter label */}
        <motion.p
          className="ch-label"
          style={{ color: 'rgba(28,43,58,0.3)', marginBottom: '60px' }}
          ref={headRef}
          initial={{ opacity: 0, y: 10 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          ESSENCE
        </motion.p>

        {/* Headline area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw', marginBottom: '80px' }}>
          <div>
            <h2 className="ed-h2" style={{ color: '#1C2B3A' }}>
              {['MORE THAN', 'A SPACE.'].map((line, i) => (
                <div key={i} className="line-mask">
                  <motion.span
                    style={{ display: 'block' }}
                    initial={{ y: '105%' }}
                    animate={headInView ? { y: '0%' } : {}}
                    transition={{ duration: 1.05, ease: EASE, delay: 0.12 + i * 0.13 }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h2>
          </div>

          <motion.div
            style={{ display: 'flex', alignItems: 'flex-end' }}
            initial={{ opacity: 0, y: 18 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.42 }}
          >
            <p className="ed-body" style={{ color: 'rgba(28,43,58,0.58)', maxWidth: 380 }}>
              Because the places we live in shape the way we experience everyday life.
              At Shree Mangal, we build more than structures — we build belonging.
            </p>
          </motion.div>
        </div>

        {/* Decorative divider */}
        <motion.div
          style={{ height: 1, background: 'rgba(28,43,58,0.1)', marginBottom: 0 }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={headInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
        />

        {/* Values */}
        <div>
          {VALUES.map((v, i) => (
            <ValueRow key={v.num} value={v} delay={0} />
          ))}
        </div>

      </div>
    </section>
  )
}
