import { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import HeroBg from './Assets/Hero-bg.png'
import GoogleIcon from './Assets/Google.png'
import AppleIcon from './Assets/Apple.png'
import ForgetPassword from './componenet/ForgetPassword'
import VerifyPassword from './componenet/VerifyPassword'
import { loginUser } from './Api'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { loginSchema } from './schema'
import { loginWithGithub, loginWithGoogle } from './Api/oauth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [password, setPassword] = useState('')
  const [showForgetPwd, setShowForgetPwd] = useState(false)
  const [showVerifyPwd, setShowVerifyPwd] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
    setPasswordType(showPassword ? 'password' : 'text')
  }

  const handleEmailValid = (email) => {
    setUserEmail(email)
    setShowForgetPwd(false)
    setShowVerifyPwd(true)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      loginSchema.parse({
        userEmail,
        password,
      })

      const result = await loginUser(userEmail, password)

      if (result.success) {
        console.log('Logged in:', result.data)

        Cookies.set('session', result.data.accessToken, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        })

        toast.success('User Logged In Successfully')
      } else {
        toast.error(result?.message || 'Login unsuccessful')
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
      setLoading(false)
    }
  }

  return (
    <div className="bg-white flex w-screen h-screen">
      {showForgetPwd && (
        <div className="w-screen h-screen bg-[#00000163] absolute top-0 left-0 z-10">
          <ForgetPassword onEmailValid={handleEmailValid} />
        </div>
      )}
      {showVerifyPwd && (
        <div className="w-screen h-screen bg-[#00000163] absolute top-0 left-0 z-10">
          <VerifyPassword userEmail={userEmail} />
        </div>
      )}

      {/* Left Image Section */}
      <div className="w-1/2 h-full hidden lg:flex">
        <img
          src={HeroBg}
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
              Welcome
              <br /> Back To <span className="text-green-600">The Hunt</span>
            </h2>
          </div>

          {/* Paragraph */}
          <div className="para">
            <p className="text-black mt-3 text-base">
              Pick Up Where You Left Off And Keep Earning With New Bounties
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-2 mt-6 hover:bg-gray-50 transition"
          >
            <img src={GoogleIcon} className="w-5 h-5" alt="Google" />
            Sign In With Google
          </button>

          {/* Apple Sign In Button */}
          <button
            onClick={loginWithGithub}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 mb-4 hover:bg-gray-50 transition"
          >
            <img src={AppleIcon} className="w-5 h-5" alt="Apple" />
            Sign In With Apple
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">Or Sign In With</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg mb-3"
          />

          {/* Password Input with Toggle */}
          <div className="relative mb-4">
            <input
              value={password}
              type={passwordType}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Eye Icon Toggle Button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {/* Eye Open SVG */}
              {!showPassword && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

              {/* Eye Closed SVG */}
              {showPassword && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242m0-5.656a4 4 0 00-5.656 0l1.414-1.414"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg block mt-4 font-semibold text-center hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>

          {/* Forgot Password Link */}
          <div className="text-right text-sm text-green-600 mb-4 mt-1">
            <button
              type="button"
              className="hover:underline cursor-pointer"
              onClick={() => setShowForgetPwd(true)}
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Not A Bounty Hunter?
            <Link
              to="/signup"
              className="text-green-600 hover:underline font-medium ms-1"
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
