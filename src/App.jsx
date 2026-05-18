import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './Features/SignIn/Index'
import SignUp from './Features/SignUp/Index'
import GoogleCallback from './Features/oauth/google/callback'
import GithubCallback from './Features/oauth/github/callback'
import VerifyEmail from './Features/verify-email'

function Home() {
  return (
    <div className="App">
      <div className="text-3xl text-center font-bold mt-10">
        This is Tasbon Bounty Platform, a platform for bounty hunters to find
        and claim bounties.
      </div>

      <div className="flex justify-center items-center gap-5 mt-5">
        <Link
          to="/signup"
          className="p-5 rounded-2xl cursor-pointer w-32 bg-red-100 text-center"
        >
          Sign Up
        </Link>
        <Link
          to="/signin"
          className="p-5 rounded-2xl cursor-pointer w-32 bg-red-100 text-center"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password/:token" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/auth/github/callback" element={<GithubCallback />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
