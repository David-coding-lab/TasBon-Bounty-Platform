import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './Features/SignIn/Index'
import SignUp from './Features/SignUp/Index'
import GoogleCallback from './Features/oauth/google/callback'
import GithubCallback from './Features/oauth/github/callback'
import VerifyEmail from './Features/verify-email'
import Navbar from './Components/NavBar'
import Hero from './Components/Hero'
import StatsBar from './Components/StatsBar'
import PlatformShowcase from './Components/PlatformShowcase'
import SimplifySection from './Components/SimplifySection'
import BountiesSection from './Components/BountiesSection'
import PartnersSection from './Components/PatnersSection'
import CTASection from './Components/Ctasection'
import Footer from './Components/Footer'
import BlogSection from './Components/BlogSection'

function Home() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <PlatformShowcase />
        <SimplifySection />
        <BountiesSection />
        <BlogSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password/:token" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/auth/github/callback" element={<GithubCallback />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
