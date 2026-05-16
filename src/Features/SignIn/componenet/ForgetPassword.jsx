import { useEffect, useState } from 'react'
import forgetPwdIcon from '../Assets/forget-Pwd.png'
import { forgetPasswordSchema } from '../schema'

const ForgetPassword = ({ onEmailValid, onClose }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))

    return () => cancelAnimationFrame(frame)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      forgetPasswordSchema.parse({ email })

      // Simulate API call (replace with your actual email sending logic)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // 2 second delay

      // Validation passed, notify parent component
      if (onEmailValid) {
        onEmailValid(email)
      }
    } catch (err) {
      if (err.errors) {
        setError(err.errors[0].message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-[#000000ad]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forget-password-title"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg max-h-[50vh] rounded-2xl bg-[#fbf5f3] px-6 py-6 text-center shadow-2xl mx-5 sm:px-12 sm:py-8 box-border transform transition-all duration-300 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-auto md:ml-[100%] md:-mt-4 -mt-1 block cursor-pointer text-3xl leading-none text-[#222] transition hover:text-black"
        >
          ×
        </button>

        <div className="mx-auto mb-2 flex w-fit items-center justify-center">
          <img
            src={forgetPwdIcon}
            alt="Forgot password"
            className="w-20 h-20 sm:w-25 sm:h-25 lg:w-30 lg:h-30 object-contain md:w-28 md:h-28"
          />
        </div>

        <h2
          id="forget-password-title"
          className="text-xl font-semibold text-black sm:text-2xl md:text-2xl"
        >
          Forget password
        </h2>

        <p className="mx-auto mt-1 max-w-2xl text-lg text-[#5d5d5d] sm:text-lg">
          Enter the email that you used to register
        </p>

        <form className="mt-8 w-full" onSubmit={handleSubmit}>
          <div className="relative mx-auto w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-full bg-[#e7e5e5] py-4 pl-6 pr-20 md:text-lg text-black placeholder:text-[#9c9595] focus:outline-none focus:ring-2 focus:ring-[#38a866]"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-0 top-1/2 flex h-full w-16 -translate-y-1/2 items-center justify-center rounded-full bg-[#38a866] text-white shadow-lg transition hover:bg-[#2f945a] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send email"
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 -rotate-12"
                  fill="currentColor"
                >
                  <path d="M2 21 23 12 2 3l4.5 7L17 12l-10.5 2L2 21z" />
                </svg>
              )}
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
