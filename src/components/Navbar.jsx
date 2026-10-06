import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ── Navigation config ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'about',
    label: 'About',
    scrollTo: 'about', // clicking the label scrolls to #about on homepage
    children: [
      { label: 'Our Story', href: '/our-story' },
      { label: 'Residence', href: '/residences' },
    ],
  },
  {
    id: 'properties',
    label: 'Properties',
    href: '/properties',
    children: [
      { label: 'Apartments & Amenities', href: '/apartment-amenities' },
      { label: 'Availability', href: '/availability' },
      { label: 'Neighborhood', href: '/neighborhood' },
    ],
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    href: '/hospitality',
    children: [
      { label: 'Hotels', href: '/hospitality/hotels' },
      { label: 'Service Apartments', href: '/hospitality/service-apartments' },
      { label: 'Hospitality Experience', href: '/hospitality/experience' },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    href: '/insights',
    children: [
      { label: 'Blog', href: '/insights/blog' },
      { label: 'News', href: '/insights/news' },
      { label: 'Updates', href: '/insights/updates' },
    ],
  },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
]

// ── Scroll hook ───────────────────────────────────────────────────────────────

function useNavScroll() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      setHidden(y > lastY.current && y > 140)
      lastY.current = y
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return { hidden, scrolled }
}

// ── Logo ──────────────────────────────────────────────────────────────────────

function Logo({ scrolled }) {
  return (
    <Link
      to="/"
      aria-label="Shree Mangal Group — Home"
      className="flex-shrink-0 smg-navbar-logo-link"
      style={{ lineHeight: 0, overflow: 'visible', marginLeft: '12px' }}
    >
      <img
        src="/images/smg_logo_white_pure.png"
        alt="Shree Mangal Group"
        className="smg-navbar-logo-img"
        style={{
          width: '202px',
          height: '78px',
          objectFit: 'contain',
          objectPosition: 'left center',
          display: 'block',
          overflow: 'visible',
          filter: scrolled
            ? 'brightness(0) saturate(100%)'
            : 'drop-shadow(0 1px 6px rgba(0,0,0,0.45))',
          transition: 'filter 0.35s ease',
        }}
      />
    </Link>
  )
}

// ── Chevron icon ──────────────────────────────────────────────────────────────

function ChevronIcon({ isOpen }) {
  return (
    <motion.svg
      width="9" height="6" viewBox="0 0 9 6" fill="none"
      stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.22, ease: [0.25, 0, 0.25, 1] }}
      aria-hidden="true"
      className="flex-shrink-0 opacity-80"
    >
      <path d="M1 1l3.5 3.5L8 1" />
    </motion.svg>
  )
}

// ── Hamburger icon ────────────────────────────────────────────────────────────

function HamburgerIcon({ isOpen, scrolled }) {
  return (
    <div
      className="flex flex-col justify-center gap-[5px] w-[22px] h-[18px]"
      aria-hidden="true"
      style={{
        color: scrolled ? '#1C2B3A' : '#FFFFFF',
        filter: scrolled ? 'none' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
        transition: 'color 0.35s ease',
      }}
    >
      <motion.span
        className="block h-[1.5px] bg-current rounded-full origin-center"
        animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0, 0.25, 1] }}
      />
      <motion.span
        className="block h-[1.5px] bg-current rounded-full"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        className="block h-[1.5px] bg-current rounded-full origin-center"
        animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0, 0.25, 1] }}
      />
    </div>
  )
}

// ── Desktop dropdown ──────────────────────────────────────────────────────────

function DesktopDropdown({ item, onClose }) {
  return (
    <motion.div
      role="menu"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 min-w-[240px] z-50 overflow-hidden"
      style={{
        background: 'rgba(16, 22, 30, 0.86)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: '12px',
        boxShadow: '0 12px 48px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Section label */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">
          {item.label}
        </span>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-1 h-px bg-white/[0.09]" />

      {/* Items */}
      <ul className="py-2">
        {item.children.map((child) => (
          <li key={child.href} role="none">
            <Link
              to={child.href}
              role="menuitem"
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-[10px] text-[13.5px] font-normal text-white/72 whitespace-nowrap
                         transition-colors duration-150
                         hover:text-white hover:bg-white/[0.07]
                         focus-visible:outline-none focus-visible:text-white focus-visible:bg-white/[0.07]"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="h-1.5" />
    </motion.div>
  )
}

// ── Desktop nav item ──────────────────────────────────────────────────────────

function DesktopNavItem({ item, activeId, setActiveId, scrolled, onScrollToSection }) {
  const wrapRef = useRef(null)
  const closeTimer = useRef(null)
  const hasChildren = Boolean(item.children?.length)
  const isOpen = activeId === item.id

  const openMenu = () => {
    clearTimeout(closeTimer.current)
    if (hasChildren) setActiveId(item.id)
  }

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveId(null), 120)
  }

  const handleBlur = (e) => {
    if (!wrapRef.current?.contains(e.relatedTarget)) setActiveId(null)
  }

  const handleClick = () => {
    if (item.scrollTo) {
      // Scroll to section instead of opening dropdown
      onScrollToSection?.(item.scrollTo)
    } else if (hasChildren) {
      setActiveId(isOpen ? null : item.id)
    }
  }

  // Text styling: white over hero, dark when scrolled. Active (open) = gold.
  const baseColor = scrolled ? '#1C2B3A' : 'rgba(255,255,255,0.90)'
  const activeColor = '#C4922A'
  const color = isOpen ? activeColor : baseColor
  const textShadow = scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.4)'

  const sharedStyle = {
    color,
    textShadow,
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
  }

  const sharedClass =
    'flex items-center gap-1.5 py-2 px-0.5 text-[13.5px] font-medium tracking-[0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4922A] rounded'

  return (
    <li
      ref={wrapRef}
      className="relative list-none"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={handleBlur}
    >
      {hasChildren ? (
        <button
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={handleClick}
          className={sharedClass}
          style={sharedStyle}
        >
          {item.label}
          <ChevronIcon isOpen={isOpen} />
        </button>
      ) : (
        <Link
          to={item.href}
          className={sharedClass}
          style={sharedStyle}
        >
          {item.label}
        </Link>
      )}

      <AnimatePresence>
        {isOpen && hasChildren && (
          <DesktopDropdown item={item} onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </li>
  )
}

// ── Mobile accordion item ─────────────────────────────────────────────────────

function MobileAccordionItem({ item, onClose, onScrollToSection }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = Boolean(item.children?.length)
  const isHome = item.id === 'home'

  const labelStyle = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(20px, 5.4vw, 24px)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontWeight: 500,
    textShadow: '0 1px 6px rgba(0,0,0,0.22)',
  }

  return (
    <li className="list-none w-full border-b border-white/[0.22]">
      {hasChildren ? (
        <>
          {/* Split row: label area + chevron button */}
          <div className="flex items-center w-full">
            {/* Label — scrolls if scrollTo, else expands accordion */}
            <button
              type="button"
              onClick={() => {
                if (item.scrollTo) {
                  onScrollToSection?.(item.scrollTo)
                  onClose()
                } else {
                  setExpanded((v) => !v)
                }
              }}
              className="flex-1 flex items-center justify-center py-5 text-center transition-all duration-200 focus-visible:outline-none"
              style={labelStyle}
            >
              <span>{item.label}</span>
            </button>

            {/* Chevron — always toggles accordion */}
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`mobile-sub-${item.id}`}
              onClick={() => setExpanded((v) => !v)}
              className="px-5 py-5 flex items-center justify-center focus-visible:outline-none"
              aria-label={expanded ? `Collapse ${item.label} submenu` : `Expand ${item.label} submenu`}
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <ChevronIcon isOpen={expanded} />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                id={`mobile-sub-${item.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0, 0.25, 1] }}
                className="overflow-hidden pb-3 pt-1 space-y-1.5"
              >
                {item.children.map((child) => (
                  <li key={child.href} className="list-none text-center">
                    <Link
                      to={child.href}
                      onClick={onClose}
                      className="inline-block py-2 text-[14px] font-medium tracking-[0.08em] uppercase text-white/90 hover:text-white transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          to={item.href}
          onClick={onClose}
          className="flex items-center justify-center w-full py-5 text-center transition-all duration-200 focus-visible:outline-none"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(20px, 5.4vw, 24px)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: isHome ? '#2E1F14' : '#FFFFFF',
            fontWeight: isHome ? 600 : 500,
            textShadow: isHome ? 'none' : '0 1px 6px rgba(0,0,0,0.22)',
          }}
        >
          {item.label}
        </Link>
      )}
    </li>
  )
}

// ── Main Navbar ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [pendingScroll, setPendingScroll] = useState(null)
  const { hidden, scrolled } = useNavScroll()
  const navigate = useNavigate()
  const location = useLocation()

  // When we navigate to '/' with a pending scroll target, execute the scroll
  useEffect(() => {
    if (pendingScroll && location.pathname === '/') {
      const timer = setTimeout(() => {
        const el = document.getElementById(pendingScroll)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setPendingScroll(null)
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [pendingScroll, location.pathname])

  const handleScrollToSection = useCallback((id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setPendingScroll(id)
    }
    setActiveDropdown(null)
    setMobileOpen(false)
  }, [location.pathname, navigate])

  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setActiveDropdown(null)
      }
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.32, ease: [0.25, 0, 0.25, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        {/* ── Gradient: always-on for logo/text readability over hero ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* ── Nav content ── */}
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-10">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between h-[78px]"
          >
            <Logo scrolled={false} />

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-7 xl:gap-8" role="list">
              {NAV_ITEMS.map((item) => (
                <DesktopNavItem
                  key={item.id}
                  item={item}
                  activeId={activeDropdown}
                  setActiveId={setActiveDropdown}
                  scrolled={false}
                  onScrollToSection={handleScrollToSection}
                />
              ))}
            </ul>

            {/* Mobile trigger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-panel"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 -mr-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4922A] rounded"
            >
              <HamburgerIcon isOpen={mobileOpen} scrolled={false} />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-fullscreen-menu"
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
            style={{
              background: 'rgba(185, 154, 118, 0.78)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {/* Top Bar: Logo on left, Close [ X ] on right */}
            <div className="flex items-center justify-between px-6 sm:px-8 h-[78px] flex-shrink-0">
              <Logo scrolled={false} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-white hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                <svg
                  width="22" height="22" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation List centered visually in the upper portion */}
            <nav
              className="flex-1 flex flex-col justify-start pt-4 sm:pt-8 px-7 sm:px-10 max-w-[480px] mx-auto w-full"
              aria-label="Mobile navigation"
            >
              <ul className="w-full flex flex-col border-t border-white/[0.22]">
                {NAV_ITEMS.map((item) => (
                  <MobileAccordionItem
                    key={item.id}
                    item={item}
                    onClose={() => setMobileOpen(false)}
                    onScrollToSection={handleScrollToSection}
                  />
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
