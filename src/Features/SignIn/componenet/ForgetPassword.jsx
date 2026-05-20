import { useEffect, useState } from 'react'
import forgetPwdIcon from '../Assets/forget-Pwd.png'
import { forgetPasswordSchema } from '../schema'
import { forgotPassword } from '../Api/forget-password'

const ForgetPassword = ({ onEmailValid, onClose }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))

    return () => cancelAnimationFrame(frame)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      forgetPasswordSchema.parse({ email })

      // API call
      await forgotPassword(email)

      setSuccess('Password reset link sent successfully! Check your email.')

      if (onEmailValid) {
        onEmailValid(email)
      }
    } catch (err) {
      if (err.errors) {
        setError(err.errors[0].message)
      } else {
        setError(err.message || 'Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-[#000000ad]"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg rounded-2xl bg-[#fbf5f3] px-6 py-6 text-center shadow-2xl mx-5 sm:px-12 sm:py-8 transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="ml-auto block text-3xl text-[#222] hover:text-black"
        >
          ×
        </button>

        <div className="mx-auto mb-2 flex w-fit justify-center">
          <img
            src={forgetPwdIcon}
            alt="Forgot password"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-xl font-semibold text-black sm:text-2xl">
          Forgot Password
        </h2>

        <p className="mt-1 text-lg text-[#5d5d5d]">
          Enter the email you used to register
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="relative mx-auto w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-full bg-[#e7e5e5] py-4 pl-6 pr-20 text-black placeholder:text-[#9c9595] focus:outline-none focus:ring-2 focus:ring-[#38a866]"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-0 top-1/2 flex h-full w-16 -translate-y-1/2 items-center justify-center rounded-full bg-[#38a866] text-white hover:bg-[#2f945a] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Send'
              )}
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
