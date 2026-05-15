import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from './Assets/Hero-bg.png'
import AppleIcon from './Assets/Apple.png'
import GoogleIcon from './Assets/Google.png'
import { signUpSchema } from './schema'
import './index.css'

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    try {
      signUpSchema.parse(formData)
      setIsLoading(true)

      const response = await fetch(
        'https://tasbon-api.onrender.com/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )

      const data = await response.json()

      if (response.ok) {
        console.log('Registration successful:', data)
        alert('Registration successful!')
      } else {
        alert(data.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      // Handle validation errors from Zod
      const newErrors = {}
      if (error.issues && Array.isArray(error.issues)) {
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0]
          newErrors[fieldName] = issue.message
        })
      } else {
        console.error('Error:', error.message)
      }
      setErrors(newErrors)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white flex w-screen h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 h-full hidden lg:flex">
        <img
          src={Hero}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <div className="w-full max-w-md px-12 py-8">
          {/* Header */}
          <div className="header">
            <h2 className="font-text-3xl md:text-[40px] font-bold font-sora">
              <br />
              Join The
              <br /> <span className="text-green-600">BOUNTY</span> HUNTERS
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
            <img src={GoogleIcon} className="w-5 h-5" alt="Google" />
            Sign Up With Google
          </a>

          {/* Apple Sign Up Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-4 hover:bg-gray-50 transition"
          >
            <img src={AppleIcon} className="w-5 h-5" alt="Apple" />
            Sign Up With Apple
          </a>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">Or Sign Up With</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* The sign up form */}
          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
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

            {/* Email Input */}
            <div>
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

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.password ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.confirmPassword ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold text-center hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
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
