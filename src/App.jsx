import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollVideoHero from './components/ScrollVideoHero'
import AboutSection from './sections/AboutSection'
import ProjectSection from './sections/ProjectSection'
import PerspectiveSection from './sections/PerspectiveSection'
import ExploreSection from './sections/ExploreSection'
import CTASection from './sections/CTASection'
import ProjectDetailPage from './pages/ProjectDetailPage'

function HomePage() {
  return (
    <>
      <ScrollVideoHero />
      <AboutSection />
      <ProjectSection />
      <PerspectiveSection />
      <ExploreSection />
      <CTASection />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
