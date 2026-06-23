import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewsletterBanner() {
  return (
    <section className="w-full bg-[#1a4d2e] text-white overflow-hidden">
      <div className="max-w-[3000px] mx-auto grid md:grid-cols-2 min-h-[220px]">
        {/* Left Column - increased padding + gap */}
        <div className="flex items-center gap-6 px-8 py-16 md:border-r md:border-white/20">
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Mail size={80} strokeWidth={1.5} />{' '}
            {/* Bigger: 56 instead of 44 */}
          </motion.div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-3" /* Bigger text */
            >
              Never miss an update
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-gray-200 leading-relaxed" /* Bigger + better line height */
            >
              Subscribe to get the latest articles, opportunities and platform
              update from TASBUN
            </motion.p>
          </div>
        </div>

        {/* Right Column - taller form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center px-8 py-16"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex bg-white rounded-lg overflow-hidden w-full max-w-lg h-[52px]" /* Taller: h-[52px] */
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 text-black outline-none text-base" /* Bigger text + padding */
            />
            <button className="px-7 py-3 text-[#34A563] font-semibold text-base hover:bg-gray-50 transition">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
