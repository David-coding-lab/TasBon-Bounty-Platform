import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Founder from './components/Founder'
import Team from './components/Team'
import Events from './components/Events'
import Highlights from './components/Highlights'
import FAQ from './components/FAQ'
import Movement from './components/Movement'
import Footer from './components/Footer'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* 1. Navigation Header */}
      <Header />

      <main className="flex-grow">
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
