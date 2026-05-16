import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from './Assets/Hero-bg.png'
import { signUpSchema } from './schema'
import './index.css'
import { toast } from 'sonner'
import CheckEmail from './Components/CheckEmail'
import ErrorUi from './Components/ErrorUi'
import { registerUser } from './Api'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
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
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.6 2.9 8.5 6.9 9.9.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.3-1.2-1.7-1.2-1.7-.9-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.6.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.6 0 3.9-2.3 4.7-4.5 5 .4.4.8 1 .8 2v2.9c0 .3.2.6.7.5 4-1.4 6.9-5.3 6.9-9.9C22 6.6 17.5 2 12 2z" />
    </svg>
  )
}

function SignUp() {
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showCheckEmail, setShowCheckEmail] = useState(false)
  const [showEmailField, setShowEmailField] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [showConfirmPasswordField, setShowConfirmPasswordField] =
    useState(false)
  const [showPasswordVisible, setShowPasswordVisible] = useState(false)
  const [showConfirmPasswordVisible, setShowConfirmPasswordVisible] =
    useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === 'fullName' && value.length >= 3) {
      setShowEmailField(true)
    }

    if (name === 'email' && value.length >= 3) {
      setShowPasswordField(true)
    }

    if (name === 'password' && value.length >= 3) {
      setShowConfirmPasswordField(true)
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleRetry = () => {
    setShowError(false)
    handleSubmit({ preventDefault: () => {} })
  }

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
        error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message
        })
      } else {
        console.error(error.message)
      }

      setErrors(newErrors)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white flex w-screen h-screen">
      {showCheckEmail && (
        <CheckEmail
          email={formData.email}
          onClose={() => setShowCheckEmail(false)}
          onGoToInbox={() =>
            window.open(
              'https://mail.google.com/',
              '_blank',
              'noopener,noreferrer',
            )
          }
        />
      )}

      {/* Left Image Section */}
      <div className="w-[50vw] h-screen hidden lg:flex">
        <img
          src={Hero}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-screen overflow-y-auto overflow-x-hidden lg:w-[50vw] h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-12 py-8">
          {showError && (
            <ErrorUi
              message={errorMessage}
              onClose={() => setShowError(false)}
              onRetry={handleRetry}
            />
          )}
          {/* Header */}
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

          {/* Paragraph */}
          <div className="para">
            <p className="text-black mt-3 text-base">
              Discover Opportunities And Get Rewarded For Your Skills.
            </p>
          </div>

          {/* Google Sign Up Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-2 mt-6 hover:bg-gray-50 transition"
          >
            <GoogleIcon />
            Sign Up With Google
          </a>

          {/* GitHub Sign Up Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-4 hover:bg-gray-50 transition"
          >
            <GitHubIcon />
            Sign Up With GitHub
          </a>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">Or Sign Up With</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* The sign up form */}
          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
            {/* userName Input */}
            <div>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.userName ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.fullName ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
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
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email ? 'border-2 border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            )}

            {showPasswordField && (
              <div className="signup-field-reveal relative">
                <input
                  type={showPasswordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  disabled={isLoading}
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password ? 'border-2 border-red-500' : ''
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPasswordVisible((s) => !s)}
                  aria-label={
                    showPasswordVisible ? 'Hide password' : 'Show password'
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
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
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.confirmPassword ? 'border-2 border-red-500' : ''
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPasswordVisible((s) => !s)}
                  aria-label={
                    showConfirmPasswordVisible
                      ? 'Hide password'
                      : 'Show password'
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold text-center hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined animate-spin"
                    style={{ fontSize: '20px' }}
                  >
                    progress_activity
                  </span>
                  Loading...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Already a Bounty Hunter?
            <Link
              to="/signin"
              className="text-green-600 hover:underline font-medium ms-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
