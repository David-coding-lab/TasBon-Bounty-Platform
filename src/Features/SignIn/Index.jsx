import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import HeroBg from './Assets/Hero-bg.png'
import ForgetPassword from './componenet/ForgetPassword'
import ErrorUi from './componenet/ErrorUi'
import { loginUser } from './Api'
import { loginWithPrivy } from './Api/privy'
import { toast } from 'sonner'
import { loginSchema } from './schema'
import { usePrivy, useLoginWithOAuth } from '@privy-io/react-auth'

function PrivyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#6D4AFF" />
      <path
        d="M12 5.5C9.515 5.5 7.5 7.515 7.5 10c0 1.38.593 2.62 1.54 3.49L12 16l2.96-2.51A4.49 4.49 0 0 0 16.5 10c0-2.485-2.015-4.5-4.5-4.5Z"
        fill="#fff"
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="w-5 h-5">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19.5C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.4 4 24 4c-7.9 0-14.7 4.5-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.1-2 13.7-5.2l-6.3-5.2C29.4 35.2 26.8 36 24 36c-5.4 0-9.7-3.1-11.7-7.5l-6.5 5C8.7 39.7 15.7 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-2.9 4.9-5.3 6.4l.1-.1 6.3 5.2C36.9 36.4 44 31 44 24c0-1.3-.1-2.2-.4-3.5z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.6 2.9 8.5 6.9 9.9.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.3-1.2-1.7-1.2-1.7-.9-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.6.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.6 0 3.9-2.3 4.7-4.5 5 .4.4.8 1 .8 2v2.9c0 .3.2.6.7.5 4-1.4 6.9-5.3 6.9-9.9C22 6.6 17.5 2 12 2z" />
    </svg>
  )
}

function SignIn() {
  const navigate = useNavigate()
  const { getAccessToken } = usePrivy()

  const [showPassword, setShowPassword] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [password, setPassword] = useState('')
  const [showForgetPwd, setShowForgetPwd] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null) // 'google' | 'github' | 'privy'
  const [errors, setErrors] = useState({})
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const togglePasswordVisibility = () => {
    const next = !showPassword
    setShowPassword(next)
    setPasswordType(next ? 'text' : 'password')
  }

  const handleEmailValid = (email) => {
    setUserEmail(email)
    setShowForgetPwd(false)
  }

  const handleRetry = () => {
    setShowError(false)
    handleLogin({ preventDefault: () => {} })
  }

  // ── Standard email/password login ──────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      loginSchema.parse({ userEmail, password })
      const result = await loginUser(userEmail, password)

      if (result.success) {
        toast.success('Logged in successfully')
        navigate('/dashboard')
      } else {
        toast.error(result?.message || 'Login unsuccessful')
        setErrorMessage(result?.message || 'Login unsuccessful')
        setShowError(true)
      }
    } catch (error) {
      const newErrors = {}
      if (error.issues) {
        error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message
        })
      } else {
        setErrorMessage(error.message || 'Login unsuccessful')
        setShowError(true)
      }
      setErrors(newErrors)
    } finally {
      setLoading(false)
    }
  }

  // ── Privy wallet / email / passkey login ───────────────────────────────
  const { login: openPrivyModal } = usePrivy()

  const handlePrivyLogin = async () => {
    setOauthLoading('privy')
    try {
      await openPrivyModal()
      const privyToken = await getAccessToken()
      await loginWithPrivy(privyToken, 'privy')
      toast.success('Logged in successfully')
      navigate('/dashboard')
    } catch (err) {
      setErrorMessage(err.message || 'Privy login failed')
      setShowError(true)
    } finally {
      setOauthLoading(null)
    }
  }

  // ── Google via Privy ───────────────────────────────────────────────────
  const { initOAuth: initGoogle } = useLoginWithOAuth({
    onComplete: async () => {
      try {
        const privyToken = await getAccessToken()
        await loginWithPrivy(privyToken, 'google')
        toast.success('Logged in with Google')
        navigate('/dashboard')
      } catch (err) {
        toast.error(err.message || 'Google login failed')
      } finally {
        setOauthLoading(null)
      }
    },
    onError: (err) => {
      setErrorMessage(err?.message || 'Google login failed')
      setShowError(true)
      setOauthLoading(null)
    },
  })

  const handleGoogleLogin = async () => {
    setOauthLoading('google')
    try {
      await initGoogle({ provider: 'google' })
    } catch (err) {
      setErrorMessage(err?.message || 'Google login failed')
      setShowError(true)
      setOauthLoading(null)
    }
  }

  // ── GitHub via Privy ───────────────────────────────────────────────────
  const { initOAuth: initGithub } = useLoginWithOAuth({
    onComplete: async () => {
      try {
        const privyToken = await getAccessToken()
        await loginWithPrivy(privyToken, 'github')
        toast.success('Logged in with GitHub')
        navigate('/dashboard')
      } catch (err) {
        toast.error(err.message || 'GitHub login failed')
      } finally {
        setOauthLoading(null)
      }
    },
    onError: (err) => {
      setErrorMessage(err?.message || 'GitHub login failed')
      setShowError(true)
      setOauthLoading(null)
    },
  })

  const handleGithubLogin = async () => {
    setOauthLoading('github')
    try {
      await initGithub({ provider: 'github' })
    } catch (err) {
      setErrorMessage(err?.message || 'GitHub login failed')
      setShowError(true)
      setOauthLoading(null)
    }
  }

  const socialLoading = oauthLoading !== null

  return (
    <div className="bg-white flex w-full min-h-screen overflow-x-hidden">
      {showError && (
        <ErrorUi
          message={errorMessage}
          onClose={() => setShowError(false)}
          onRetry={handleRetry}
        />
      )}

      {showForgetPwd && (
        <div className="fixed inset-0 bg-[#00000163] z-50 flex items-center justify-center px-4">
          <ForgetPassword
            onEmailValid={handleEmailValid}
            onClose={() => setShowForgetPwd(false)}
          />
        </div>
      )}

      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen">
        <img
          src={HeroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-lg px-6 sm:px-8 md:px-12 py-8">
          <div className="header">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold font-sora leading-tight">
              Welcome Back <br />
              To <span className="text-green-600">The Hunt</span>
            </h2>
          </div>

          <div className="para">
            <p className="text-black mt-3 text-sm sm:text-base">
              Pick Up Where You Left Off And Keep Earning With New Bounties
            </p>
          </div>

          {/* ── Privy (wallet / email / passkey) ── */}
          <button
            onClick={handlePrivyLogin}
            disabled={socialLoading}
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-2 mt-6 hover:bg-gray-50 transition disabled:opacity-60"
          >
            {oauthLoading === 'privy' ? (
              <span className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <PrivyIcon />
            )}
            Sign In With Privy
          </button>

          {/* ── Google via Privy ── */}
          <button
            onClick={handleGoogleLogin}
            disabled={socialLoading}
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-2 hover:bg-gray-50 transition disabled:opacity-60"
          >
            {oauthLoading === 'google' ? (
              <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Sign In With Google
          </button>

          {/* ── GitHub via Privy ── */}
          <button
            onClick={handleGithubLogin}
            disabled={socialLoading}
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-4 hover:bg-gray-50 transition disabled:opacity-60"
          >
            {oauthLoading === 'github' ? (
              <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <GitHubIcon />
            )}
            Sign In With GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">Or Sign In With</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
              if (e.target.value.length >= 3) setShowPasswordField(true)
            }}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg mb-3"
          />

          {/* Password */}
          {showPasswordField && (
            <div className="relative mb-4 signup-field-reveal">
              <input
                value={password}
                type={passwordType}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                👁
              </button>
            </div>
          )}

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Forgot password */}
          <div className="text-right text-sm pt-3 pb-7 text-green-600">
            <button
              type="button"
              className="hover:underline"
              onClick={() => setShowForgetPwd(true)}
            >
              Forgot Password?
            </button>
          </div>

          {/* Signup link */}
          <div className="text-center text-sm text-gray-500">
            Not A Bounty Hunter?
            <Link
              to="/signup"
              className="text-green-600 hover:underline font-medium ml-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
