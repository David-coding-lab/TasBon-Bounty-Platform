import { useState } from 'react'
import { Link } from 'react-router-dom'
import ForgetPassword from './componenet/ForgetPassword'
import VerifyPassword from './componenet/VerifyPassword'

function SignIn() {
  const [showForgetPwd, setShowForgetPwd] = useState(false)
  const [showVerifyPwd, setShowVerifyPwd] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleEmailValid = (email) => {
    setUserEmail(email)
    setShowForgetPwd(false)
    setShowVerifyPwd(true)
  }
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="w-full max-w-md rounded-2xl p-8 shadow-md border">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-sm text-gray-600 mb-6">Welcome back to TasBon.</p>
        {showForgetPwd && (
          <div className="w-screen h-screen bg-[#00000163] absolute top-0 left-0 ">
            <ForgetPassword onEmailValid={handleEmailValid} />
          </div>
        )}
        {showVerifyPwd && (
          <div className="w-screen h-screen bg-[#00000163] absolute top-0 left-0 ">
            <VerifyPassword userEmail={userEmail} />
          </div>
        )}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2"
          />
          <button
            type="button"
            className="w-full bg-red-100 rounded-lg py-2 font-medium cursor-pointer"
            onClick={() => setShowForgetPwd(true)}
          >
            Sign In
          </button>
        </form>

        <p className="text-sm mt-4">
          No account?{' '}
          <Link to="/signup" className="underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
