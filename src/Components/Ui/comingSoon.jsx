import { useState, useEffect, useMemo, memo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const floatingIcons = [
  '🚀',
  '⚡',
  '🎯',
  '💡',
  '🔥',
  '✨',
  '🤖',
  '🎁',
  '🎖️',
  '🏆',
]

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const FloatingParticle = memo(function FloatingParticle({ delay, icon, seed }) {
  const r = useMemo(
    () => ({
      initX: seededRandom(seed) * 100 - 50,
      x1: seededRandom(seed + 10) * 60 - 30,
      x2: seededRandom(seed + 20) * 80 - 40,
      x3: seededRandom(seed + 30) * 60 - 30,
      repeatDelay: seededRandom(seed + 40) * 4 + 2,
      left: seededRandom(seed + 50) * 80 + 10,
      top: seededRandom(seed + 60) * 40 + 30,
    }),
    [seed],
  )

  return (
    <motion.div
      className="absolute text-2xl sm:text-3xl pointer-events-none select-none"
      initial={{ opacity: 0, y: 100, x: r.initX }}
      animate={{
        opacity: [0, 0.7, 0.7, 0],
        y: [100, -20, -80, -140],
        x: [r.x1, r.x2, r.x3],
        rotate: [0, 15, -10, 20],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        repeatDelay: r.repeatDelay,
        ease: 'easeOut',
      }}
      style={{
        left: `${r.left}%`,
        top: `${r.top}%`,
      }}
    >
      {icon}
    </motion.div>
  )
})

function PulseRing({ delay }) {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-emerald-400/30"
      initial={{ width: 60, height: 60, opacity: 0.6 }}
      animate={{
        width: [60, 300, 500],
        height: [60, 300, 500],
        opacity: [0.5, 0.2, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeOut',
      }}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

const letterVariants = {
  hidden: { y: 40, opacity: 0, rotateX: -90 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: 0.8 + i * 0.06,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const FloatingOrbs = memo(function FloatingOrbs() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full bg-emerald-400/40"
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + ((i * 13) % 60)}%`,
          }}
        />
      ))}
    </>
  )
})

const words = ['Coming', 'Soon']

export default function ComingSoon({ title, description }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0a1f14] via-[#0f2e1d] to-[#071a0e]">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(52,165,99,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,165,99,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <motion.div
        className="absolute w-150 h-150 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(52,165,99,0.15) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: [1, 1.05, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 50 },
          y: { type: 'spring', stiffness: 50 },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Pulse rings */}
      <PulseRing delay={0} />
      <PulseRing delay={1.5} />
      <PulseRing delay={3} />

      {/* Floating particles */}
      {floatingIcons.map((icon, i) => (
        <FloatingParticle key={i} delay={i * 1.2} icon={icon} seed={i * 100} />
      ))}

      {/* Floating orbs */}
      <FloatingOrbs />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-emerald-300 text-sm font-medium font-[Sora]">
            In Development
          </span>
        </motion.div>

        {/* Animated heading */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-x-5">
            {words.map((word, wordIdx) => (
              <div key={wordIdx} className="flex overflow-hidden">
                {word.split('').map((char, charIdx) => {
                  const globalIdx =
                    words.slice(0, wordIdx).join('').length + charIdx
                  return (
                    <motion.span
                      key={charIdx}
                      custom={globalIdx}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-5xl sm:text-7xl md:text-8xl font-bold font-[Sora] text-white inline-block"
                      style={{ perspective: 500 }}
                    >
                      {char}
                    </motion.span>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Animated underline */}
          <motion.div
            className="h-1 rounded-full bg-linear-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '60%', opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Title (feature name) */}
        {title && (
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold font-[Sora] text-emerald-300 mb-4"
          >
            {title}
          </motion.h2>
        )}

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 font-[Inter] leading-relaxed"
        >
          {description ||
            "We're building something amazing. This feature is currently under development and will be available soon."}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(52,165,99,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold font-[Sora] text-base cursor-pointer transition-colors hover:bg-[#2d9156]"
            >
              Back to Home
            </motion.button>
          </Link>

          <Link to="/bounties">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(52,165,99,0.15)',
              }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold font-[Sora] text-base cursor-pointer bg-transparent transition-colors"
            >
              Explore Bounties
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
