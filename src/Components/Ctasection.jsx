import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function CTASection() {
  const { isAuthenticated: isLoggedIn } = useSelector((state) => state.auth)
  return (
    <section className="py-20 bg-[#154E2C]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-white mb-4"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Ready to join the HUNT?
        </motion.h2>
        <motion.p
          className="text-white text-md mb-8"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          Join 50,000+ builders and community leaders <br /> who run on TASBUN.
        </motion.p>
        <Link to={isLoggedIn ? '/dashboard' : '/signup'}>
          <motion.button
            className="bg-[#F6C430] hover:bg-[#d3a92a] cursor-pointer text-black font-bold px-8 py-4 rounded-xl transition-colors text-base inline-flex items-center gap-2"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Sign up now'}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.button>
        </Link>
      </div>
    </section>
  )
}
