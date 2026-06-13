import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from './Assets/Hero-bg.png'
import { signUpSchema } from './schema'
import './index.css'
import { toast } from 'sonner'
import CheckEmail from './Components/CheckEmail'
import ErrorUi from './Components/ErrorUi'
import { registerUser } from './Api'
import { loginWithPrivy } from '../SignIn/Api/privy'
import { usePrivy } from '@privy-io/react-auth'

function PrivyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#6D4AFF" />
      <path
        d="M12 5.5C9.515 5.5 7.5 7.515 7.5 10c0 1.38.593 2.62 1.54 3.49L12 16l2.96-2.51A4.49 4.49 0 0 0 16.5 10c0-2.485-2.015-4.5-4.5-4.5Z"
        fill="#fff"
      />
    </svg>
  )
}

function SignUp() {
  const navigate = useNavigate()
  const { getAccessToken, ready, authenticated, login: openPrivyModal } = usePrivy()

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [waitingForPrivyAuth, setWaitingForPrivyAuth] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)
  const [showCheckEmail, setShowCheckEmail] = useState(false)
  const [showEmailField, setShowEmailField] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [showConfirmPasswordField, setShowConfirmPasswordField] = useState(false)
  const [showPasswordVisible, setShowPasswordVisible] = useState(false)
  const [showConfirmPasswordVisible, setShowConfirmPasswordVisible] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (!waitingForPrivyAuth || !ready || !authenticated) return

    const doPrivySignUp = async () => {
      setWaitingForPrivyAuth(false)
      try {
        const privyToken = await getAccessToken()
        await loginWithPrivy(privyToken)
        if (!mountedRef.current) return
        toast.success('Account created successfully')
        navigate('/dashboard')
      } catch (err) {
        if (!mountedRef.current) return
        toast.error(err.message || 'Privy sign-up failed')
      } finally {
        if (mountedRef.current) setOauthLoading(null)
      }
    }

    doPrivySignUp()
  }, [waitingForPrivyAuth, ready, authenticated, getAccessToken, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'fullName' && value.length >= 3) setShowEmailField(true)
    if (name === 'email' && value.length >= 3) setShowPasswordField(true)
    if (name === 'password' && value.length >= 3) setShowConfirmPasswordField(true)
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleRetry = () => {
    setShowError(false)
    handleSubmit({ preventDefault: () => {} })
  }

  // ── Standard registration ──────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
      signUpSchema.parse(formData)
      const result = await registerUser({
        userName: formData.userName,
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
      })

      if (result.success) {
        toast.success('Registration successful')
        setShowCheckEmail(true)
      } else {
        toast.error(result.message)
        setErrorMessage(result.message || 'Registration failed')
        setShowError(true)
      }
    } catch (error) {
      const newErrors = {}
      if (error.issues) {
        error.issues.forEach((issue) => { newErrors[issue.path[0]] = issue.message })
      } else {
        console.error(error.message)
      }
      setErrors(newErrors)
    } finally {
      setIsLoading(false)
    }
  }

  // ── Privy wallet / email / passkey sign-up ─────────────────────────────
  const handlePrivySignUp = async () => {
    setOauthLoading('privy')
    try {
      await openPrivyModal({ loginMethods: ['email'] })
      setWaitingForPrivyAuth(true)
    } catch (err) {
      setOauthLoading(null)
      toast.error(err.message || 'Privy sign-up failed')
    }
  }

  const socialLoading = oauthLoading !== null

  const EyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )

  const EyeOff = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
    </svg>
  )

  return (
    <div className="bg-white flex w-screen h-screen">
      {showCheckEmail && (
        <CheckEmail
          email={formData.email}
          onClose={() => setShowCheckEmail(false)}
          onGoToInbox={() => window.open('https://mail.google.com/', '_blank', 'noopener,noreferrer')}
        />
      )}

      {/* Left Image */}
      <div className="w-[50vw] h-screen hidden lg:flex">
        <img src={Hero} alt="Hero Background" className="w-full h-full object-cover" />
      </div>

      {/* Right Form */}
      <div className="w-screen overflow-y-auto overflow-x-hidden lg:w-[50vw] h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-12 py-8">
          {showError && (
            <ErrorUi
              message={errorMessage}
              onClose={() => setShowError(false)}
              onRetry={handleRetry}
            />
          )}

          <div className="header">
            <h2 className="font-text-3xl md:text-[40px] text-4xl md:text-md font-bold font-sora">
              <br />
              Join The
              <br />{' '}
              <span className="text-green-600 flex w-xl text-3xl md:text-md md:w-2xl">
                BOUNTY HUNTERS
              </span>
            </h2>
          </div>

          <div className="para">
            <p className="text-black mt-3 text-base">
              Discover Opportunities And Get Rewarded For Your Skills.
            </p>
          </div>

          {/* ── Privy ── */}
          <button
            onClick={handlePrivySignUp}
            disabled={socialLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-2 mt-6 hover:bg-gray-50 transition cursor-pointer disabled:opacity-60"
          >
            {oauthLoading === 'privy' ? (
              <span className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <PrivyIcon />
            )}
            Sign Up With Privy
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">Or Sign Up With</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Email/password form */}
          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${errors.userName ? 'border-2 border-red-500' : ''}`}
              />
              {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
            </div>

            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${errors.fullName ? 'border-2 border-red-500' : ''}`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {showEmailField && (
              <div className="signup-field-reveal">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled={isLoading}
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? 'border-2 border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            )}

            {showPasswordField && (
              <div className="signup-field-reveal">
                <div className="relative">
                  <input
                    type={showPasswordVisible ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    disabled={isLoading}
                    className={`w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${errors.password ? 'border-2 border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordVisible((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswordVisible ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            )}

            {showConfirmPasswordField && (
              <div className="signup-field-reveal relative">
                <input
                  type={showConfirmPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  disabled={isLoading}
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${errors.confirmPassword ? 'border-2 border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPasswordVisible((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPasswordVisible ? <EyeOff /> : <EyeOpen />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold text-center hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>
                    progress_activity
                  </span>
                  Loading...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            Already a Bounty Hunter?
            <Link to="/signin" className="text-green-600 hover:underline font-medium ms-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
