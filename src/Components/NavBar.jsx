import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { usePrivy } from '@privy-io/react-auth'
import Cookies from 'js-cookie'
import { logout } from '../store/slices/authSlice'
import { config } from '../../lib/config'
import Logo from '../Assets/logo.png'

const navLinks = [
  { name: 'Hackathons', url: '/hackathons' },
  { name: 'Bounties', url: '/bounties' },
  { name: 'Grants', url: '/grants' },
  { name: 'Community', url: '/community' },
  { name: 'Blogs', url: '/blogs' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { logout: privyLogout } = usePrivy()
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setProfileOpen(false)
    setMenuOpen(false)
    try {
      await fetch(`${config.VITE_API_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch {}
    Cookies.remove('session')
    try {
      await privyLogout()
    } catch {}
    dispatch(logout())
    navigate('/signin')
  }

  const userInitial = user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'
  const userName = user?.fullName || user?.userName || 'User'
  const userEmail = user?.email || ''

  return (
    <nav className="bg-transparent backdrop-blur-md pt-2 sticky top-0 z-50">
      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={Logo}
                alt="TASBUN Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <Link to="/" className="ml-2 text-xl font-bold text-primary">
              TASBUN
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={`text-md font-medium transition-colors ${
                  pathname === item.url
                    ? 'text-emerald-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm uppercase cursor-pointer ring-2 ring-transparent hover:ring-emerald-200 transition-all"
                >
                  {userInitial}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {userName}
                      </p>
                      {userEmail && (
                        <p className="text-xs text-gray-400 truncate">
                          {userEmail}
                        </p>
                      )}
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                          />
                        </svg>
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-md text-gray-600 font-medium hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-md font-semibold px-6 py-2 rounded-2xl transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-1">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`px-3 py-2.5 text-md font-medium rounded-lg transition-colors ${
                    pathname === item.url
                      ? 'text-emerald-600 font-semibold bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px bg-gray-100 my-2" />

              {isAuthenticated ? (
                <>
                  {/* User card */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm uppercase shrink-0">
                      {userInitial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {userName}
                      </p>
                      {userEmail && (
                        <p className="text-xs text-gray-400 truncate">
                          {userEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-md font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                      />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-md font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 text-md font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer w-full text-left"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-3 pt-1">
                  <Link
                    to="/signin"
                    className="flex-1 text-center text-md text-gray-600 font-medium py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-white text-md font-semibold py-2.5 rounded-xl transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
