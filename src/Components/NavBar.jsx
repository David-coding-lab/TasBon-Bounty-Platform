import { useState } from 'react'
import Logo from '../Assets/logo.png'

const navLinks = [
  { name: 'Hackathons', url: '/hackathons' },
  { name: 'Bounties', url: '/bounties' },
  { name: 'Grants', url: '/grants' },
  { name: 'Community', url: '/community' },
  { name: 'Blog', url: '/blog' },
]
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-[#F0FAF4] pt-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={Logo}
              alt="TASBUN Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href="#"
                className="text-gray-600 hover:text-gray-900 text-md font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/signin"
              className="text-md text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Login
            </a>

            <a
              href="/signup"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-md font-semibold px-6 py-2 rounded-2xl transition-colors"
            >
              Register
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
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
                <a
                  key={item.name}
                  href="#"
                  className="px-2 py-2 text-gray-600 hover:text-gray-900 text-md font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex gap-3 pt-3 px-2">
                <a href="/signin" className="text-md text-gray-600 font-medium">
                  Login
                </a>

                <a
                  href="/signup"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-md font-semibold px-4 py-2 transition-colors"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
