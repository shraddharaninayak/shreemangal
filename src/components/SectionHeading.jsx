import React from 'react'

/**
 * Reusable Major Section Heading Component
 * Matches the editorial typography specification:
 * - Font: Plus Jakarta Sans
 * - Sizes: clamp(2.8rem, 4.5vw, 5rem)
 * - Weight: 550 (refined medium-bold)
 * - Tight Line-height: 0.94 - 0.98
 * - Primary Color: #292929 (charcoal) / #F5F3EF (dark theme)
 * - Accent Color: #B99A76 (warm beige / muted gold)
 */
export default function SectionHeading({
  as: Tag = 'h2',
  className = '',
  dark = false,
  centered = false,
  children,
  ...props
}) {
  const classes = [
    'section-heading',
    dark ? 'is-dark-theme' : '',
    centered ? 'is-centered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
