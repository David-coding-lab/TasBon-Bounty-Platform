import React from 'react'
import heroGroupImg from '../assets/hero_group.png'

export default function Hero() {
  const stats = [
    { value: '9k+', label: 'Community Members' },
    { value: '50+', label: 'Countries' },
    { value: '200+', label: 'Active Teams' },
    { value: '100+', label: 'Events Hosted' },
  ]

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-2xl">
            {/* Pill Badge */}
            <span className="inline-flex items-center px-6 py-2 rounded-full border border-[#1f7242]/20 bg-[#1f7242]/5 text-[#1f7242] text-sm font-semibold tracking-wide uppercase mb-8">
              Community
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-black leading-[1.1] tracking-tight mb-6">
              A global community <br />
              of <span className="text-[#1f7242]">builders,</span> hunters{' '}
              <br />
              and <span className="text-[#1f7242]">problem solvers.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-500 font-sans leading-relaxed mb-4">
              Connect, collaborate, learn and grow with thousands of builders
              around the world.
            </p>
          </div>

          {/* Right Image/Graphics Column */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="w-full max-w-[540px] md:max-w-[600px] hover:scale-[1.02] transition-transform duration-500 ease-out">
              <img
                src={heroGroupImg}
                alt="TASBUN global community working together"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 lg:mt-28 border-t border-gray-100 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold font-mono text-[#1f7242] tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-sm md:text-base font-semibold text-gray-800 font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
