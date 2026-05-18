import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import { verifyEmailToken } from './Api'

// import your api function
// import { verifyEmailToken } from '../services/auth'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState(
    'Please wait while we verify your email address.',
  )

  useEffect(() => {
    async function handleEmailVerification() {
      try {
        const token = searchParams.get('token')

        if (!token) {
          setStatus('error')
          setMessage('Verification token is missing.')
          return
        }

        // API call
        await verifyEmailToken(token)

        setStatus('success')
        setMessage('Email verified successfully. Redirecting to login...')

        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 1500)
      } catch (error) {
        console.error(error)
        setStatus('error')
        setMessage(error.message || 'Email verification failed.')
      }
    }

    handleEmailVerification()
  }, [navigate, searchParams])

  return (
    <main className="min-h-screen flex items-center justify-center bg-white font-inter">
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl font-sora">TV</span>
          </div>
        </div>

        {status === 'loading' && (
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-5" />
        )}

        {status === 'success' && (
          <CheckCircle2 className="w-8 h-8 text-green-600 mb-5" />
        )}

        {status === 'error' && (
          <AlertCircle className="w-8 h-8 text-red-500 mb-5" />
        )}

        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 font-sora">
          {status === 'loading' && 'Verifying Email'}
          {status === 'success' && 'Email Verified'}
          {status === 'error' && 'Verification Failed'}
        </h1>

        <p className="text-sm md:text-base text-gray-500 mt-2">{message}</p>

        {status === 'loading' && (
          <div className="flex gap-1 mt-5">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
        )}

        {status === 'error' && (
          <button
            onClick={() => navigate('/signup', { replace: true })}
            className="mt-6 flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            <ArrowLeft size={18} />
            Back to Sign Up
          </button>
        )}
      </div>
    </main>
  )
}
