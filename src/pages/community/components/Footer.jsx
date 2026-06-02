import React, { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const opportunitiesLinks = [
    { name: 'Bounties', href: '#' },
    { name: 'Hackathons', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Grants', href: '#' },
  ]

  const categoriesLinks = [
    { name: 'Contents', href: '#' },
    { name: 'Design', href: '#' },
    { name: 'Development', href: '#' },
    { name: 'Others', href: '#' },
  ]

  const aboutLinks = [
    { name: 'FAQ', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Changelog', href: '#' },
    { name: 'Contact Us', href: '#' },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      alert(`Subscribed successfully with email: ${email}`)
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#f1f6f3] py-16 border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: Newsletter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-gray-200/60">
          <div className="text-left max-w-md">
            <h3 className="text-lg font-bold text-black font-sans mb-1">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-500 font-sans">
              Stay up-to-date with the recent happenings in the ecosystem.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto items-center max-w-md gap-3 bg-transparent shrink-0"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full md:w-72 px-4 py-2.5 rounded-full bg-white border border-gray-200 focus:outline-none focus:border-[#1f7242] text-sm font-sans"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1f7242] hover:bg-[#15512e] text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm shadow-primary/10 cursor-pointer border-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Middle: Brand Column & Detailed Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16 text-left">
          {/* Brand Info (col-span 5) */}
          <div className="md:col-span-5 flex flex-col items-start max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              {/* Green circular logo block */}
              <div className="w-9 h-9 rounded-full bg-[#1f7242] flex items-center justify-center text-white font-bold text-lg font-sans">
                T
              </div>
              <span className="text-xl font-bold tracking-tight text-black font-sans">
                TASBUN
              </span>
            </div>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              Discover high paying crypto bounties, participate in hackathons
              and get grants from companies in one place and apply to them using
              a single profile.
            </p>
          </div>

          {/* Links Column 1: Opportunities (col-span 2) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-black font-sans tracking-wide uppercase">
              Opportunities
            </h4>
            <nav className="flex flex-col gap-3">
              {opportunitiesLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-[#1f7242] transition-colors font-sans font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Links Column 2: Categories (col-span 2) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-black font-sans tracking-wide uppercase">
              Categories
            </h4>
            <nav className="flex flex-col gap-3">
              {categoriesLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-[#1f7242] transition-colors font-sans font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Links Column 3: About (col-span 3) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-black font-sans tracking-wide uppercase">
              About
            </h4>
            <nav className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-[#1f7242] transition-colors font-sans font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Row: Copyright & Socials */}
        <div className="pt-8 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-gray-400 font-sans">
            2026 TASBUN. All rights reserved.
          </span>
          <div className="flex gap-4">
            {/* X Logo */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-150 flex items-center justify-center text-[#1f7242] hover:bg-[#1f7242] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="X Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Discord Logo */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-150 flex items-center justify-center text-[#1f7242] hover:bg-[#1f7242] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="Discord"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
              </svg>
            </a>
            {/* LinkedIn Logo */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-150 flex items-center justify-center text-[#1f7242] hover:bg-[#1f7242] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
