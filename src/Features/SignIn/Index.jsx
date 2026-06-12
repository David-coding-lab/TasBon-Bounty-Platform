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
import { usePrivy } from '@privy-io/react-auth'

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

function SignIn() {
  const navigate = useNavigate()
  const { getAccessToken } = usePrivy()

  const [showPassword, setShowPassword] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [password, setPassword] = useState('')
  const [showForgetPwd, setShowForgetPwd] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)
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
      await openPrivyModal({ loginMethods: ['email'] })
      const privyToken = await getAccessToken()
      await loginWithPrivy(privyToken)
      toast.success('Logged in successfully')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Privy login failed')
    } finally {
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
        <img src={HeroBg} alt="Hero Background" className="w-full h-full object-cover" />
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
            <button type="button" className="hover:underline" onClick={() => setShowForgetPwd(true)}>
              Forgot Password?
            </button>
          </div>

          {/* Signup link */}
          <div className="text-center text-sm text-gray-500">
            Not A Bounty Hunter?
            <Link to="/signup" className="text-green-600 hover:underline font-medium ml-1">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
