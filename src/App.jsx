import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import SignIn from './Features/SignIn/Index'
import SignUp from './Features/SignUp/Index'
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
import CommunityPage from './pages/community/index'
import Dashboard from './Features/Dashboard/Pages/Home'

function Home() {
  return (
    <div className="min-h-screen bg-[#F0FAF4] font-sans antialiased">
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
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'light',
          accentColor: '#16a34a', // green-600 — matches TASBUN brand
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password/:token" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PrivyProvider>
  )
}

export default App
