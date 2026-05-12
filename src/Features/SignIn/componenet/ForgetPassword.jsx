import React from 'react'
import { useState } from 'react'
import CheckIcon from '../Assets/check_mark.png'
import { Link } from 'react-router-dom'
import { forgetPasswordSchema } from '../schema'

const ForgetPassword = ({ onEmailValid }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    <div className="w-screen h-screen flex flex-col items-center justify-center border">
      <div className="bg-[#EFF8F2] w-120 rounded-md flex flex-col items-center justify-center space-y-12 shadow-2xl p-6">
        <div className=" flex flex-col space-y-6 items-center">
          <img src={CheckIcon} alt="CheckIcon" className="w-32 h-32" />
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Forgot Password?
            </h1>
            <p className="text-lg text-[#888F9B] text-center">
              Enter email to reset password
            </p>
          </div>
        </div>
        <form
          className="flex flex-col space-y-6 items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border border-primary p-3 focus:outline-primary w-90 rounded-4xl"
              placeholder="Enter your email"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary rounded-4xl p-3 cursor-pointer text-secondary w-90 hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Send Email'
              )}
            </button>
            <Link to="/" className="text-red-600  block text-center mt-4">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
