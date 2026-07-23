import './App.css'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import { useDispatch, useSelector } from 'react-redux'
import { hydrateSession, loginSuccess, logout } from './store/slices/authSlice'
import { loginWithPrivy } from './Features/SignIn/Api/privy'
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
import DashBounties from './Features/Dashboard/Pages/Bounties'
import ViewBounty from './Features/Dashboard/Pages/Bounties/components/ui/ViewBounty'
import Applications from './Features/Dashboard/Pages/Applications'
import Earnings from './Features/Dashboard/Pages/Earnings'
import Settings from './Features/Dashboard/Pages/Settings'
import Layout from './Features/Dashboard/Layout'
import Bounties from './pages/Bounties'
import Blogs from './pages/Blogs'
import BlogSlug from './pages/Blogs/Slug'
import Hackathons from './pages/Hackathons/Index'
import Grants from './pages/Grants'
import NotFound from './pages/NotFound'
import ErrorBoundary from './Components/Ui/ErrorBoundary'
import ProtectedRoute from './Components/auth/ProtectedRoute'
import AuthGate from './Components/auth/AuthGate'

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

function AppRoutes() {
  const dispatch = useDispatch()
  const { loading, isAuthenticated } = useSelector((state) => state.auth)
  const { ready, authenticated, getAccessToken } = usePrivy()

  useEffect(() => {
    dispatch(hydrateSession())
  }, [dispatch])

  useEffect(() => {
    const handleSessionExpired = () => {
      dispatch(logout())
    }
    window.addEventListener('session-expired', handleSessionExpired)
    return () => window.removeEventListener('session-expired', handleSessionExpired)
  }, [dispatch])

  // Sync Privy's restored session into Redux
  useEffect(() => {
    if (!ready || !authenticated || isAuthenticated) return

    const syncPrivySession = async () => {
      try {
        const privyToken = await getAccessToken()
        const data = await loginWithPrivy(privyToken)
        dispatch(loginSuccess({ user: data.user, token: data.accessToken }))
      } catch {
        // Privy session exists but backend rejected it — no action needed
      }
    }

    syncPrivySession()
  }, [ready, authenticated, isAuthenticated, getAccessToken, dispatch])

  if (loading || (ready && authenticated && !isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0FAF4]">
        <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/bounties" element={<Bounties />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogSlug />} />
      <Route path="/hackathons" element={<Hackathons />} />
      <Route path="/grants" element={<Grants />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password/:token" element={<SignUp />} />

      {/* Auth pages — redirect to dashboard if already logged in */}
      <Route element={<AuthGate />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Protected — require auth */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bounties" element={<DashBounties />} />
          <Route path="bounties/:bountyId" element={<ViewBounty />} />
          <Route path="applications" element={<Applications />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
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
    <ErrorBoundary>
      <Toaster position="top-right" richColors />
      <PrivyProvider
        appId={PRIVY_APP_ID}
        config={{
          loginMethods: ['email'],
          appearance: {
            theme: 'light',
            accentColor: '#16a34a',
          },
        }}
      >
        <AppRoutes />
      </PrivyProvider>
    </ErrorBoundary>
  )
}

export default App
