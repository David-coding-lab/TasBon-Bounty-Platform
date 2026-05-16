import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import { googleOAuthCallback } from './Api'

export default function GoogleCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [status, setStatus] = useState('loading')

  const [message, setMessage] = useState(
    'Please wait while we securely verify your Google account.',
  )

  useEffect(() => {
    async function handleGoogleAuth() {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const scope = searchParams.get('scope')
        const error = searchParams.get('error')

        if (error) {
          setStatus('error')
          setMessage(`Google authentication failed: ${error}`)
          return
        }

        if (!code) {
          setStatus('error')
          setMessage('Authentication code missing.')
          return
        }

        const data = await googleOAuthCallback({
          code,
          state,
          scope,
        })

        // Save token in cookie
        Cookies.set('accessToken', data.accessToken, {
          expires: 7,
          secure: false, // change to true in production
          sameSite: 'strict',
        })

        setStatus('success')
        setMessage('Verification successful. Redirecting to dashboard...')

        setTimeout(() => {
          navigate('/dashboard', { replace: true })
        }, 1500)
      } catch (error) {
        console.error(error)
        setStatus('error')
        setMessage(error.message || 'Something went wrong.')
      }
    }

    handleGoogleAuth()
  }, [navigate, searchParams])

  return (
    <main className="min-h-screen flex items-center justify-center bg-white font-inter">
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl font-sora">G</span>
          </div>
        </div>

        {/* Status Icons */}
        {status === 'loading' && (
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-5" />
        )}

        {status === 'success' && (
          <CheckCircle2 className="w-8 h-8 text-green-600 mb-5" />
        )}

        {status === 'error' && (
          <AlertCircle className="w-8 h-8 text-red-500 mb-5" />
        )}

        {/* Heading */}
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 font-sora">
          {status === 'loading' && 'Verifying'}
          {status === 'success' && 'Success'}
          {status === 'error' && 'Verification Failed'}
        </h1>

        {/* Message */}
        <p className="text-sm md:text-base text-gray-500 mt-2">{message}</p>

        {/* Loading dots */}
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

        {/* Error action */}
        {status === 'error' && (
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="mt-6 flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            <ArrowLeft size={18} />
            Back to Login
          </button>
        )}
      </div>
    </main>
  )
}
