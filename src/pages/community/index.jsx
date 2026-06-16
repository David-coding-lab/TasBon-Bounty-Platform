import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Founder from './components/Founder'
import Team from './components/Team'
import Events from './components/Events'
import Highlights from './components/Highlights'
import FAQ from './components/FAQ'
import Movement from './components/Movement'
import Navbar from '../../Components/NavBar'
import Footer from '../../Components/Footer'

export default function CommunityPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [hash])
  return (
    <div className="min-h-screen bg-[#F0FAF4] text-black font-sans flex flex-col">
      {/* 1. Navigation Header */}
      <Navbar />

      <main className="grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Meet the Founder Section */}
        <Founder />

        {/* 4. Team Grid Section */}
        <Team />

        {/* 5. Upcoming Events Section */}
        <Events />

        {/* 6. Community Highlights & Ecosystem Partners Section */}
        <Highlights />

        {/* 7. Accordion FAQ Section */}
        <FAQ />

        {/* 8. Dark Themed Movement Intro Section */}
        <Movement />
      </main>

      {/* 9. Comprehensive Brand Footer */}
      <Footer />
    </div>
  )
}
