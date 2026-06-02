import React from 'react'

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
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#1f7242] text-sm font-bold tracking-wider uppercase block mb-3 font-sans">
            COMMUNITY HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black font-sans tracking-tight mb-4">
            Real stories from our community.
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans leading-relaxed">
            Builders, Creators and hunters making an impact.
          </p>
        </div>

        {/* Horizontal Testimonials Row */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 -mx-6 md:-mx-0 md:px-0 scrollbar-none snap-x snap-mandatory scroll-smooth">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[290px] sm:w-[350px] bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#1f7242]/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[#1f7242] text-5xl font-mono leading-none select-none text-left block -mb-4">
                  “
                </span>
                <p className="text-base text-gray-700 font-sans text-left leading-relaxed mb-8">
                  {t.quote}
                </p>
              </div>

              {/* User Identity info */}
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
            </div>
          ))}
        </div>

        {/* Partners Bar with Endless Marquee Ticker */}
        <div className="mt-24 border-t border-gray-100 pt-16 text-center">
          <h3 className="text-[#1f7242] text-base font-bold font-sans tracking-wider uppercase mb-8">
            Trusted by ecosystem partners
          </h3>

          {/* Fading Marquee Container */}
          <div className="relative w-full overflow-hidden py-4 select-none">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div className="animate-marquee gap-8 md:gap-12 lg:gap-16 items-center flex">
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-default shrink-0"
                >
                  {partner.icon}
                  <span className="text-base font-bold text-gray-700 font-sans tracking-tight whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
