import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import HeroBg from './Assets/Hero-bg.png'
import { toast } from 'sonner'
import { resetPasswordSchema } from './schema'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      resetPasswordSchema.parse({
        password,
        confirmPassword,
      })

      await resetPassword(token, password)

      toast.success('Password reset successful')

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
      const newErrors = {}

      if (error.issues) {
        error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message
        })
      } else {
        toast.error(error.message || 'Reset failed')
      }

      setErrors(newErrors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white flex w-screen h-screen">
      {/* Left Hero Section */}
      <div className="hidden lg:flex w-1/2 h-full">
        <img src={HeroBg} alt="Hero" className="w-full h-full object-cover" />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto flex items-center justify-center">
        <div className="w-full max-w-md px-8 md:px-12 py-8 animate-[fadeInUp_0.4s_ease-out]">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold font-sora leading-tight">
            Reset Your <br />
            <span className="text-green-600">Password</span>
          </h1>

          <p className="mt-3 text-base text-black">
            Create a new secure password to continue your bounty journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="text-center text-sm text-gray-500 mt-6">
            Remember your password?
            <Link
              to="/login"
              className="text-green-600 hover:underline font-medium ml-1"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Inline animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default ResetPassword
