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
    <main className="font-sora gap-10 bg-secondary flex h-screen">
      <div className="w-[45vw] h-full">
        <img src={Hero} alt="woman drinking coffee" className="w-full h-full" />
      </div>

      <section className="w-[45vw] pt-8 flex flex-col h-screen justify-center ml-10 items-start gap-4 ">
        <div className="flex flex-col text-start">
          <h1 className="text-4xl font-bold mb-2">
            <span className="block">Join The</span>
            <span>
              <span className="text-primary">BOUNTY</span> HUNTERS
            </span>
          </h1>
          <p className="text-base">
            Discover Opportunities And Get Rewarded For Your Skills.
          </p>
        </div>

        <form className=" flex flex-col pt-8 space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4 w-lg">
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="FullName"
                disabled={isLoading}
                className={`p-3 bg-white outline-0 rounded-sm h-14 w-full disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.fullName ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                disabled={isLoading}
                className={`p-3 bg-white outline-0 rounded-sm h-14 w-full disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="passWord"
                className={`p-3 bg-white outline-0 rounded-sm h-14 flex disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.password ? 'border-2 border-red-500' : ''
                }`}
              >
                <input
                  type="password"
                  name="password"
                  id="passWord"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  disabled={isLoading}
                  className="h-full w-full bg-white py-3 outline-0 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#888988' }}
                >
                  visibility
                </span>
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassWord"
                className={`p-3 bg-white outline-0 rounded-sm h-14 flex disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.confirmPassword ? 'border-2 border-red-500' : ''
                }`}
              >
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassWord"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  disabled={isLoading}
                  className="h-full w-full bg-white py-3 outline-0 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#888988' }}
                >
                  visibility
                </span>
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-signUp mt-10 cursor-pointer text-white w-full h-16 text-center bg-primary rounded-md py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
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

        <div className="flex flex-col w-lg items-center space-y-4 mt-6 justify-center">
          <div className="flex flex-row items-center w-[90%]">
            <div className="flex-1 h-px bg-gray-400" />
            <span className="mx-4 text-sm text-gray-800">Or Sign Up With</span>
            <div className="flex-1 h-px bg-gray-400" />
          </div>

          <div className="flex items-center space-x-3 w-[90%]">
            <button className="OAuth-btns flex-1 border border-[#888988] cursor-pointer flex items-center justify-center rounded-md p-3 gap-2">
              <img src={GoogleIcon} alt="" />
              <span className="text-md text-[#888988]">Google</span>
            </button>
            <button className="OAuth-btns flex-1 border border-[#888988] cursor-pointer flex items-center justify-center rounded-md p-3 gap-2">
              <img src={AppleIcon} alt="" />
              <span className="text-md text-[#888988]">Apple</span>
            </button>
          </div>

          <p className="text-[#888988] text-center mb-10">
            Already a Bounty Hunter?{' '}
            <Link to="/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default SignUp
