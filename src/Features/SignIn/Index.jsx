import { Link } from 'react-router-dom'

function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl p-8 shadow-md border">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-sm text-gray-600 mb-6">Welcome back to TasBon.</p>

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
          <button className="w-full bg-red-100 rounded-lg py-2 font-medium">
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
