import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const location = useLocation()
  const [count, setCount] = useState(15)

  useEffect(() => {
    if (count <= 0) return
    const timer = setTimeout(() => setCount(count - 1), 1000)
    return () => clearTimeout(timer)
  }, [count])

  useEffect(() => {
    if (count === 0) {
      window.location.href = '/'
    }
  }, [count])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1f14] via-[#0f2e1d] to-[#071a0e] px-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(52,165,99,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,165,99,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(52,165,99,0.12) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* Large 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6"
        >
          <h1 className="text-[140px] sm:text-[180px] font-bold font-[Sora] leading-none text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-400/10 select-none">
            404
          </h1>
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold font-[Sora] text-white mb-4"
        >
          Page not found
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-gray-400 text-base sm:text-lg font-[Inter] mb-3 leading-relaxed"
        >
          The page{' '}
          <span className="text-emerald-400/70 font-mono text-sm bg-white/5 px-2 py-0.5 rounded">
            {location.pathname}
          </span>{' '}
          doesn't exist or has been moved.
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="text-gray-500 text-sm font-[Inter] mb-8"
        >
          Redirecting to home in{' '}
          <span className="text-emerald-400 font-semibold tabular-nums">
            {count}s
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(52,165,99,0.3)',
              }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl bg-[#34a563] text-white font-semibold font-[Sora] text-base cursor-pointer transition-colors hover:bg-[#2d9156]"
            >
              Go Home
            </motion.button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3.5 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold font-[Sora] text-base cursor-pointer bg-transparent transition-colors hover:bg-emerald-500/10"
          >
            Go Back
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12"
        >
          <p className="text-gray-500 text-xs font-[Inter] mb-3 uppercase tracking-wider">
            Quick links
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'Bounties', path: '/bounties' },
              { name: 'Hackathons', path: '/hackathons' },
              { name: 'Community', path: '/community' },
              { name: 'Blogs', path: '/blogs' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-emerald-400/60 hover:text-emerald-300 font-[Inter] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Bottom dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
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
        </div>
      </div>
    </div>
  )
}
