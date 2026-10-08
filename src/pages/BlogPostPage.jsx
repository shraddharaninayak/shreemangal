import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BLOG_POSTS } from '../data/blogData'
import CTASection from '../sections/CTASection'

const EASE = [0.16, 1, 0.3, 1]

export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const post = currentIndex !== -1 ? BLOG_POSTS[currentIndex] : null

  if (!post) {
    return (
      <main style={{ background: '#FAF8F5', minHeight: '80vh', paddingTop: '140px', paddingBottom: '100px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
          <p style={{ color: '#B99A76', fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ARTICLE NOT FOUND
          </p>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: '32px', margin: '16px 0 24px', color: '#1C1D1A' }}>
            The article you are looking for does not exist.
          </h1>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: '#1C1D1A',
              color: '#FFFFFF',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  const prevPost = BLOG_POSTS[(currentIndex - 1 + BLOG_POSTS.length) % BLOG_POSTS.length]
  const nextPost = BLOG_POSTS[(currentIndex + 1) % BLOG_POSTS.length]

  return (
    <main style={{ background: '#FAF8F5', color: '#262825', minHeight: '100vh' }}>
      
      {/* ── ARTICLE HEADER ── */}
      <section style={{ background: '#0F100E', color: '#ECEBE8', paddingTop: 'clamp(138px, calc(78px + 7vw), 178px)', paddingBottom: 'clamp(50px, 7vw, 80px)', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Back button */}
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#B99A76',
              textDecoration: 'none',
              fontSize: '12.5px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '32px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>All Articles</span>
          </Link>

          {/* Meta Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#B99A76',
                textTransform: 'uppercase',
                background: 'rgba(185, 154, 118, 0.15)',
                padding: '4px 12px',
                borderRadius: '4px',
                border: '1px solid rgba(185, 154, 118, 0.28)',
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(236, 235, 232, 0.65)' }}>
              {post.date}
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(236, 235, 232, 0.4)' }} />
            <span style={{ fontSize: '13px', color: 'rgba(236, 235, 232, 0.65)' }}>
              By {post.author}
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(236, 235, 232, 0.4)' }} />
            <span style={{ fontSize: '13px', color: 'rgba(236, 235, 232, 0.65)' }}>
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.2,
              fontWeight: 400,
              color: '#FAF9F6',
              margin: '0 0 24px',
              letterSpacing: '-0.01em',
            }}
          >
            {post.title}
          </motion.h1>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.7,
              color: 'rgba(236, 235, 232, 0.75)',
              margin: 0,
            }}
          >
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(48px, 8vw, 84px) 24px clamp(70px, 10vw, 110px)' }}>
        
        {/* Featured Image */}
        <div
          style={{
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '48px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(38, 40, 37, 0.08)',
            maxHeight: '520px',
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Content Paragraphs */}
        <div style={{ maxWidth: '820px', margin: '0 auto', fontSize: '16.5px', lineHeight: 1.85, color: '#3A3D36' }}>
          {post.content.map((paragraph, idx) => {
            // Check if paragraph is a subheader
            const isSubheading = paragraph.length < 50 && (paragraph.startsWith('We Need') || paragraph.startsWith('Dreams') || paragraph.startsWith('Architecture'));
            if (isSubheading) {
              return (
                <h3
                  key={idx}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#1C1D1A',
                    marginTop: '36px',
                    marginBottom: '16px',
                  }}
                >
                  {paragraph}
                </h3>
              )
            }

            // Check if quote
            const isQuote = paragraph.includes('Diana Scharf Hunt said') || paragraph.includes('Goals are dreams with deadlines');
            if (isQuote) {
              return (
                <blockquote
                  key={idx}
                  style={{
                    margin: '32px 0',
                    padding: '24px 28px',
                    borderLeft: '3px solid #B99A76',
                    background: '#F3EFEA',
                    borderRadius: '0 4px 4px 0',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '18px',
                    fontStyle: 'italic',
                    color: '#262825',
                    lineHeight: 1.7,
                  }}
                >
                  {paragraph}
                </blockquote>
              )
            }

            return (
              <p key={idx} style={{ marginBottom: '24px' }}>
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* ── COMMENTS SECTION (If available) ── */}
        {post.comments && post.comments.length > 0 && (
          <div style={{ maxWidth: '820px', margin: '60px auto 0', paddingTop: '40px', borderTop: '1px solid rgba(38, 40, 37, 0.12)' }}>
            <h4
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '20px',
                fontWeight: 600,
                color: '#1C1D1A',
                marginBottom: '24px',
              }}
            >
              Comments ({post.comments.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {post.comments.map((comment, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    background: '#FFFFFF',
                    padding: '24px',
                    borderRadius: '6px',
                    border: '1px solid rgba(38, 40, 37, 0.08)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: '#1C1D1A' }}>
                      {comment.author}
                    </span>
                    <span style={{ fontSize: '12px', color: '#8C8E88' }}>
                      {comment.date}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#555850' }}>
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PREV / NEXT NAVIGATION ── */}
        <div
          style={{
            maxWidth: '820px',
            margin: '64px auto 0',
            paddingTop: '36px',
            borderTop: '1px solid rgba(38, 40, 37, 0.12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Previous Post */}
          <Link
            to={`/blog/${prevPost.slug}`}
            style={{
              padding: '20px',
              borderRadius: '6px',
              background: '#FFFFFF',
              border: '1px solid rgba(38, 40, 37, 0.08)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#B99A76'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(38, 40, 37, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#B99A76', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              ← Previous Story
            </span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '15px', fontWeight: 600, color: '#1C1D1A', lineHeight: 1.35 }}>
              {prevPost.title}
            </span>
          </Link>

          {/* Next Post */}
          <Link
            to={`/blog/${nextPost.slug}`}
            style={{
              padding: '20px',
              borderRadius: '6px',
              background: '#FFFFFF',
              border: '1px solid rgba(38, 40, 37, 0.08)',
              textDecoration: 'none',
              color: 'inherit',
              textAlign: 'right',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#B99A76'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(38, 40, 37, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#B99A76', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              Next Story →
            </span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '15px', fontWeight: 600, color: '#1C1D1A', lineHeight: 1.35 }}>
              {nextPost.title}
            </span>
          </Link>
        </div>

      </section>

      {/* ── CTA SECTION ── */}
      <CTASection />
    </main>
  )
}
