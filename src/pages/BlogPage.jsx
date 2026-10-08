import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BLOG_POSTS } from '../data/blogData'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [navHidden, setNavHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleScroll = () => {
      const y = window.scrollY
      setNavHidden(y > lastY.current && y > 140)
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Unique categories
  const categories = useMemo(() => {
    const cats = ['All']
    BLOG_POSTS.forEach((post) => {
      if (!cats.includes(post.category)) {
        cats.push(post.category)
      }
    })
    return cats
  }, [])

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return BLOG_POSTS
    return BLOG_POSTS.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  const featuredPost = filteredPosts[0] || BLOG_POSTS[0]
  const regularPosts = filteredPosts.slice(1)

  return (
    <main style={{ background: '#FAF8F5', color: '#262825', minHeight: '100vh' }}>
      
      {/* ── BLOG HERO ── */}
      <section
        style={{
          position: 'relative',
          background: '#0F100E',
          color: '#ECEBE8',
          paddingTop: 'clamp(158px, calc(78px + 11vw), 208px)',
          paddingBottom: 'clamp(60px, 9vw, 96px)',
          paddingLeft: '24px',
          paddingRight: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Background architectural image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/images/smg_blog_hero_bg.jpg"
            alt="Shree Mangal Group architectural perspective"
            loading="eager"
            fetchPriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              display: 'block',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,16,14,0.92) 0%, rgba(15,16,14,0.65) 50%, rgba(15,16,14,0.78) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}
          >
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#B99A76' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', color: '#B99A76', textTransform: 'uppercase' }}>
              BLOG
            </span>
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#B99A76' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', serif",
              fontSize: 'clamp(2.3rem, 5vw, 4.2rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#FAF9F6',
              letterSpacing: '-0.01em',
              margin: '0 auto 20px',
              maxWidth: '960px',
            }}
          >
            Perspectives on Property, Architecture <br className="hidden md:inline" />
            <span style={{ color: '#C8A882', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>&amp; Living</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(14px, 1.15vw, 17px)',
              lineHeight: 1.75,
              color: 'rgba(236, 235, 232, 0.72)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Official publications, thought leadership, construction philosophy, and insights into building lasting communities across Nashik.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORY PILLS ── */}
      <section
        className="blog-sticky-filter-bar"
        style={{
          top: navHidden ? '0px' : '78px',
          transition: 'top 0.32s cubic-bezier(0.25, 0, 0.25, 1)',
        }}
      >
        <div className="filter-bar-scroll-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: isActive ? '1px solid #1C1D1A' : '1px solid rgba(38, 40, 37, 0.12)',
                  background: isActive ? '#1C1D1A' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#4A4D45',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* ── ARTICLES FEED ── */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(48px, 8vw, 84px) 20px clamp(80px, 12vw, 120px)' }}>
        
        {/* Featured Post Card */}
        {featuredPost && (
          <div style={{ marginBottom: '60px' }}>
            <p style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', color: '#8C8E88', textTransform: 'uppercase', marginBottom: '16px' }}>
              FEATURED PUBLICATION
            </p>

            <Link
              to={`/blog/${featuredPost.slug}`}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                background: '#FFFFFF',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(38, 40, 37, 0.1)',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 18px 48px rgba(0, 0, 0, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ minHeight: '360px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div style={{ padding: 'clamp(32px, 5vw, 54px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', color: '#B99A76', textTransform: 'uppercase' }}>
                    {featuredPost.category}
                  </span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#B99A76' }} />
                  <span style={{ fontSize: '12px', color: '#7E8178' }}>
                    {featuredPost.date}
                  </span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#7E8178' }} />
                  <span style={{ fontSize: '12px', color: '#7E8178' }}>
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    lineHeight: 1.25,
                    color: '#1C1D1A',
                    fontWeight: 500,
                    margin: '0 0 16px',
                  }}
                >
                  {featuredPost.title}
                </h2>

                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#555850',
                    margin: '0 0 24px',
                  }}
                >
                  {featuredPost.excerpt}
                </p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#B99A76', fontWeight: 600, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <span>Read Article</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Remaining Posts Grid */}
        {regularPosts.length > 0 && (
          <div>
            <p style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', color: '#8C8E88', textTransform: 'uppercase', marginBottom: '24px' }}>
              MORE PERSPECTIVES &amp; ARTICLES
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid rgba(38, 40, 37, 0.08)',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.07)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ height: '230px', overflow: 'hidden' }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    />
                  </div>

                  <div style={{ padding: '26px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: '#B99A76', textTransform: 'uppercase' }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8C8E88' }}>
                        {post.date}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '18px',
                        lineHeight: 1.35,
                        color: '#1C1D1A',
                        fontWeight: 600,
                        margin: '0 0 12px',
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '13.5px',
                        lineHeight: 1.68,
                        color: '#555850',
                        margin: '0 0 20px',
                        flex: 1,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#B99A76', fontWeight: 600, fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      <span>Read Full Story</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* ── CTA SECTION ── */}
      <CTASection />
    </main>
  )
}
