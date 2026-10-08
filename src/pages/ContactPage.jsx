import { useEffect } from 'react'
import CTASection from '../sections/CTASection'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main style={{ background: '#050505', minHeight: '100vh', paddingTop: '78px' }}>
      <CTASection />
    </main>
  )
}
