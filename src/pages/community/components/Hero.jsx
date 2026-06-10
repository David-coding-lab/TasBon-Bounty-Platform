import React from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import heroGroupImg from '../assets/hero_group.png'

export default function Hero() {
  const stats = [
    { value: '9k+', label: 'Community Members' },
    { value: '50+', label: 'Countries' },
    { value: '200+', label: 'Active Teams' },
    { value: '100+', label: 'Events Hosted' },
  ]

  const headlineWords = [
    'A',
    'global',
    'community',
    'of',
    'builders,',
    'hunters',
    'and',
    'problem',
    'solvers.',
  ]

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-[#F0FAF4]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-2xl">
            {/* Pill Badge */}
            <motion.span
              className="inline-flex items-center px-6 py-2 rounded-full border border-[#34A563]/20 bg-[#bg-[#F0FAF4]] text-[#34A563] text-sm font-semibold tracking-wide uppercase mb-8"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              Community
            </motion.span>

            {/* Main Headline — word-by-word slide-in from left */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-black leading-[1.1] tracking-tight mb-6">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={`inline-block mr-[0.3em] ${
                    word === 'builders,' || word === 'problem'
                      ? 'text-[#34A563]'
                      : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.45,
                    ease: 'easeOut',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle with typewriter */}
            <p className="text-lg sm:text-xl text-gray-500 font-sans leading-relaxed mb-4">
              <TypeAnimation
                sequence={[
                  600,
                  'Connect, collaborate, learn and grow with thousands of builders around the world.',
                ]}
                speed={75}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            </p>
          </div>

          {/* Right Image/Graphics Column */}
          <motion.div
            className="lg:col-span-6 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          >
            <div className="w-full max-w-135 md:max-w-150 hover:scale-[1.02] transition-transform duration-500 ease-out">
              <img
                src={heroGroupImg}
                alt="TASBUN global community working together"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section — scroll-triggered staggered cards */}
        <motion.div
          className="mt-20 lg:mt-28 border-t border-gray-100 pt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: 'easeOut' },
                  },
                }}
              >
                <span className="text-4xl md:text-5xl font-bold font-mono text-[#34A563] tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-sm md:text-base font-semibold text-gray-800 font-sans">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
