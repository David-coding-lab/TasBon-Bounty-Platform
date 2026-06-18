import React from 'react'
import { Zap, Users, ArrowRight } from 'lucide-react'
import movementGraphicImg from '../assets/movement_graphic.png'
import { Link } from 'react-router-dom'

export default function Movement() {
  return (
    <section className="py-20 bg-[#1e1e1e] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Movement Info */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight mb-4">
              More than a platform. <br />
              <span className="text-[#34A563]">We're a movement.</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed mb-10 max-w-xl">
              The best products come from collaboration, creativity, and
              execution. TASBUN helps connect talented people with opportunities
              that bring great ideas to life.
            </p>

            {/* Info Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-6 w-full mb-10">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-[#34A563]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#34A563]/10 border border-[#34A563]/20 flex items-center justify-center text-[#34A563] mb-5">
                  <Zap className="w-5 h-5 fill-[#34A563]/10" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans mb-2">
                  Talent in Action
                </h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">
                  Put your skills to work. Discover projects that need what you
                  bring.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-[#34A563]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#34A563]/10 border border-[#34A563]/20 flex items-center justify-center text-[#34A563] mb-5">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans mb-2">
                  Peer Rewards
                </h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">
                  Created to help talented people connect, contribute, and be
                  rewarded for their work.
                </p>
              </div>
            </div>

            {/* CTA Button - Black text on green background */}
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#34A563] hover:bg-[#15512e] text-black text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm shadow-primary/20 cursor-pointer border-0">
              <Link to="/signup">
                <span>Sign up now</span>
              </Link>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Abstract Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-105 lg:max-w-none hover:scale-105 transition-transform duration-500 ease-out">
              <img
                src={movementGraphicImg}
                alt="TASBUN three-people abstract community graphic"
                className="w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
