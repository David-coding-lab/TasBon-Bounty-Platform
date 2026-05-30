import { motion } from 'framer-motion'
import DashboardVideo from '../Assets/videos/dashBoard.mp4'

export default function PlatformShowcase() {
  return (
    <section className="py-20 bg-[#F0FAF4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
            The complete Platform for builders
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            The modern bounty platform built for builders and rewards
          </h2>
          <p className="text-gray-500 text-base">
            Launch, discover, and complete high-value bounties on a platform
            built to connect ambitious builders with real rewards.
          </p>
        </motion.div>

        {/* Dashboard Image */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="flex justify-center">
            <video
              src={DashboardVideo}
              className="w-[110%] min-w-[110%] rounded-2xl shadow-lg h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
