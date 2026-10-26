import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { initSmoothScroll } from './lib/smoothScroll'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Loader from './components/Loader'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import TeamPage from './pages/TeamPage'
import BarberPage from './pages/BarberPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import LocationPage from './pages/LocationPage'

// Keyed on the path so every page change replays the fade-in
function Pages() {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-in">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:slug" element={<BarberPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Outside the routes, so the intro plays once per visit, not on every page change */}
      <Loader />
      <ScrollManager />
      <Navbar />
      <Pages />
      <Footer />
      <Chatbot />
    </BrowserRouter>
  )
}
