import React from 'react'
import { motion } from 'framer-motion'
import PartnersSection from '../../../Components/PatnersSection'

export default function Highlights() {
  const testimonials = [
    {
      quote:
        "TASBUN helped us find the right skilled persons to build something that's now used by thousands.",
      name: 'Gregory Martins',
      role: 'CEO Novalstro',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
    },
    {
      quote:
        "TASBUN helped us find the right skilled persons to build something that's now used by thousands.",
      name: 'Gregory Martins',
      role: 'CEO Novalstro',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80',
    },
    {
      quote:
        "TASBUN helped us find the right skilled persons to build something that's now used by thousands.",
      name: 'Gregory Martins',
      role: 'CEO Novalstro',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&h=80&q=80',
    },
    {
      quote:
        "TASBUN helped us find the right skilled persons to build something that's now used by thousands.",
      name: 'Gregory Martins',
      role: 'CEO Novalstro',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80',
    },
  ]

  const partners = [
    {
      name: 'Greenpill Nigeria',
      icon: (
        <svg
          className="w-6 h-6 text-emerald-500 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      name: 'Greenpill Dev Guild',
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <rect x="5" y="6" width="14" height="12" rx="6" />
          <circle cx="10" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Localism',
      icon: (
        <svg
          className="w-6 h-6 text-green-500 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01"
          />
        </svg>
      ),
    },
    {
      name: 'M3tering Protocol',
      icon: (
        <svg
          className="w-6 h-6 text-amber-500 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      name: 'Switch Electric',
      icon: (
        <svg
          className="w-6 h-6 text-yellow-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Section Header — inside container, slide up on scroll */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-[#1f7242] text-sm font-bold tracking-wider uppercase block mb-3 font-sans">
            COMMUNITY HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black font-sans tracking-tight mb-4">
            Real stories from our community.
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans leading-relaxed">
            Builders, Creators and hunters making an impact.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Testimonials — full width, gradients touch screen edges */}
      <div className="relative w-full py-4 select-none">
        {/* Left fade — touches left screen edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade — touches right screen edge */}
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 items-stretch">
          {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
            <motion.div
              key={idx}
              className="shrink-0 w-72.5 sm:w-87.5 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 16px 40px rgba(31, 114, 66, 0.15)',
                borderColor: 'rgba(31, 114, 66, 0.3)',
                transition: { duration: 0.25 },
              }}
            >
              <div>
                <span className="text-[#1f7242] text-5xl font-mono leading-none select-none text-left block -mb-4">
                  "
                </span>
                <p className="text-base text-gray-700 font-sans text-left leading-relaxed mb-8">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-50 pt-4 text-left">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50"
                />
                <div>
                  <h4 className="text-sm font-bold text-black font-sans leading-tight">
                    {t.name}
                  </h4>
                  <span className="text-xs text-gray-400 font-sans font-medium">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partners Bar */}
      <PartnersSection partners={partners} />
    </section>
  )
}
