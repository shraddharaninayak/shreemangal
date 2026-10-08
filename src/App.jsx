import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollVideoHero from './components/ScrollVideoHero'
import AboutSection from './sections/AboutSection'
import ProjectSection from './sections/ProjectSection'
import PerspectiveSection from './sections/PerspectiveSection'
import ExploreSection from './sections/ExploreSection'
import CTASection from './sections/CTASection'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ResidencePage from './pages/ResidencePage'
import ApartmentsAmenitiesPage from './pages/ApartmentsAmenitiesPage'
import AvailabilityPage from './pages/AvailabilityPage'
import NeighborhoodPage from './pages/NeighborhoodPage'
import OurStoryPage from './pages/OurStoryPage'
import OurServicesPage from './pages/OurServicesPage'
import GalleryPage from './pages/GalleryPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'

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
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/about/story" element={<OurStoryPage />} />
        <Route path="/our-team" element={<OurStoryPage />} />
        <Route path="/our-team/*" element={<OurStoryPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/residences" element={<ResidencePage />} />
        <Route path="/apartment-amenities" element={<ApartmentsAmenitiesPage />} />
        <Route path="/properties/apartments" element={<ApartmentsAmenitiesPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/properties/availability" element={<AvailabilityPage />} />
        <Route path="/neighborhood" element={<NeighborhoodPage />} />
        <Route path="/neighborhood/*" element={<NeighborhoodPage />} />
        <Route path="/properties/neighborhood" element={<NeighborhoodPage />} />
        <Route path="/properties/neighborhood/*" element={<NeighborhoodPage />} />
        <Route path="/our-services" element={<OurServicesPage />} />
        <Route path="/our-services/*" element={<OurServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/*" element={<GalleryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/insights/blog" element={<BlogPage />} />
        <Route path="/insights/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact/*" element={<ContactPage />} />
        <Route path="/properties" element={<NeighborhoodPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
