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
import Layout from './Features/Dashboard/Layout'

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

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID

function App() {
  if (!PRIVY_APP_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0FAF4] p-6">
        <div className="max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Configuration missing
          </h1>
          <p className="text-base text-gray-600">
            The environment variable{' '}
            <code className="font-mono">VITE_PRIVY_APP_ID</code> is not set.
            Please add it to your <code className="font-mono">.env</code> file
            and restart the app.
          </p>
        </div>
      </div>
    )
  }

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
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
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
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
