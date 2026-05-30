import { motion } from 'framer-motion'
import ProfileOne from '../Assets/profile-one.png'
import ProfileThree from '../Assets/profile-two.png'
import ProfileTwo from '../Assets/logo.png'
import ProfileFour from '../Assets/profile-three.png'

const bounties = [
  {
    title: 'Build a DeFi Analytics Dashboard',
    creator: 'Mason Crypto',
    reward: '$500 USDC',
    tag: 'DeFi',
    verified: true,
    image: ProfileOne,
  },

  {
    title: 'Build a DeFi Analytics Dashboard',
    creator: 'TASHUB',
    reward: '$800 USDC',
    tag: 'Analytics',
    verified: true,
    image: ProfileTwo,
  },

  {
    title: 'Build a DeFi Analytics Dashboard',
    creator: 'Shawn James',
    reward: '$600 USDC',
    tag: 'Frontend',
    verified: false,
    image: ProfileThree,
  },

  {
    title: 'Build a DeFi Analytics Dashboard',
    creator: 'Alex Rivera',
    reward: '$400 USDC',
    tag: 'Web3',
    verified: true,
    image: ProfileFour,
  },
]

export default function BountiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Find Challenges • Build solutions • Earn rewards
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            High-impact bounties from protocols, and companies looking for
            hunter and builders like you.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          {bounties.map((b, i) => (
            <motion.div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              {/* Bounty Image */}
              <div className="w-full h-32 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.creator}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center text-xs">
                    {b.creator[0]}
                  </div>
                  <span className="text-xs text-gray-500">{b.creator}</span>
                  {b.verified && (
                    <svg
                      className="w-3 h-3 text-emerald-500 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug">
                  {b.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded-md">
                    {b.tag}
                  </span>
                  <span className="text-sm font-extrabold text-gray-900">
                    {b.reward}
                  </span>
                </div>

                <button className="w-full mt-3 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-semibold py-2 rounded-lg transition-colors">
                  View Bounty →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <button className="text-emerald-600 font-semibold text-sm hover:underline">
            Explore all bounties →
          </button>
        </div>
      </div>
    </section>
  )
}
