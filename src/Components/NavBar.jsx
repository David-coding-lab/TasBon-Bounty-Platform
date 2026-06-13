import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Assets/logo.png'

const navLinks = [
  { name: 'Hackathons', url: '/hackathons' },
  { name: 'Bounties', url: '/bounties' },
  { name: 'Grants', url: '/grants' },
  { name: 'Community', url: '/community' },
  { name: 'Blogs', url: '/blog' },
]
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="bg-transparent backdrop-blur-md pt-2 sticky top-0 z-50">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link to="/" className="ml-2 text-xl  font-bold text-primary">
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
                  className={`px-2 py-2 text-md font-medium rounded-md transition-colors ${
                    pathname === item.url
                      ? 'text-emerald-600 font-semibold bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-3 px-2">
                <div className="flex gap-2 pt-3 px-2 items-center">
                  <Link
                    to="/signin"
                    className="text-md text-gray-600 font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-md font-semibold px-4 py-2 rounded-2xl transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
