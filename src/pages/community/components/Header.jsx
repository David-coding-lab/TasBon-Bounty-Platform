import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Hackathons', href: '#' },
    { name: 'Bounties', href: '#' },
    { name: 'Grants', href: '#' },
    { name: 'Community', href: '#', active: true },
    { name: 'Blog', href: '#' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-black font-sans hover:opacity-80 transition-opacity"
          >
            TASBUN
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-base font-medium transition-colors hover:text-[#1f7242] ${
                link.active ? 'text-[#1f7242]' : 'text-gray-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <button className="px-6 py-2.5 rounded-full bg-[#1f7242] hover:bg-[#15512e] text-white text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm shadow-primary/20 cursor-pointer">
            Login
          </button>
          <a
            href="#"
            className="text-[#1f7242] hover:text-[#15512e] text-base font-semibold transition-colors"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-black transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white absolute top-20 left-0 w-full px-6 py-8 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-lg font-medium py-2 border-b border-gray-50 ${
                  link.active ? 'text-[#1f7242] font-semibold' : 'text-gray-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-4 pt-4">
            <button className="w-full py-3 rounded-full bg-[#1f7242] text-white font-semibold text-center transition-colors hover:bg-[#15512e]">
              Login
            </button>
            <a
              href="#"
              className="w-full py-3 text-[#1f7242] text-center font-semibold border border-primary-border rounded-full hover:bg-primary-muted transition-colors"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
