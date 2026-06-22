import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  { name: 'Community', count: '07' },
  { name: 'Bounties', count: '18' },
  { name: 'Hackathons', count: '03' },
  { name: 'Grants', count: '07' },
  { name: 'Guides', count: '07' },
  { name: 'Product Updates', count: '05' },
]

export default function TopSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-8 pb-16 grid lg:grid-cols-3 gap-8">
      {/* Left - Featured Card */}
      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="border border-gray-200 rounded-xl bg-white p-6 shadow-sm">
          {/* Image with space below */}
          <div className="relative rounded-lg overflow-hidden mb-6">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                alt="Hackathon team"
                className="w-full h-72 object-cover"
              />
            </motion.div>
            <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded z-10">
              Subscribe
            </span>
          </div>

          {/* Content with padding + space */}
          <div className="px-2 md:px-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-green-600 text-xs font-semibold tracking-wide uppercase">
                HACKATHONS
              </span>
              <span className="text-gray-400 text-xs">May 05, 2025</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight hover:text-green-600 cursor-pointer">
              <a href="/blog/building-communities">
                Building more than code: how communities create lasting impact
              </a>
            </h2>

            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              Communities are the heartbeat of web3 and innovation. Here's how
              collaboration drives real-world change
            </p>

            <div className="flex justify-between items-center pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i}`}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    alt=""
                  />
                ))}
              </div>
              <a
                href="/bounties"
                className="text-green-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Explore all bounties <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right - Sidebar */}
      <div className="space-y-8">
        <div className="border border-gray-200 rounded-lg bg-white p-6 space-y-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`/${cat.name.toLowerCase()}`}
              className="flex justify-between text-sm hover:text-green-600 py-2"
            >
              <span>{cat.name}</span>
              <span className="text-gray-400">{cat.count}</span>
            </a>
          ))}
        </div>

        <div className="border border-gray-200 rounded-lg bg-[#F1F6F3] p-8">
          <h3 className="font-bold text-lg mb-3">Stay in the loop</h3>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            Get the latest stories, updates and opportunities delivered to your
            inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white border-gray-200 rounded-l-md px-4 py-2.5 text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
            />
            <button className="bg-[#34A563] text-white px-5 py-2.5 text-sm rounded-r-md hover:bg-[#2d8f58] font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
