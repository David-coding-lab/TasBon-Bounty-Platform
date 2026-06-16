import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Illustration from '../Assets/Illustration.png'
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-[#F0FAF4] py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.span
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Earn by Building
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              {['Join', 'the', 'Hunt', 'Built'].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {['for'].map((word, i) => (
                <motion.span
                  key="for"
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (4 + i) * 0.08,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                Modern{' '}
              </motion.span>
              <motion.span
                className="inline-block text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6 * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                Creators
              </motion.span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg max-w-md mb-8 mx-auto md:mx-0">
              <TypeAnimation
                sequence={[
                  550,
                  'Discover missions, complete bounties, and earn rewards with a thriving hunter community.',
                ]}
                speed={80}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <motion.button
                className="bg-primary cursor-pointer hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-3xl transition-colors text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/sign-up">Join the Hunt</Link>
              </motion.button>
              <motion.button
                className="border border-gray-200 cursor-pointer hover:border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-3xl transition-colors text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/bounties">See Bounties</Link>
              </motion.button>
            </div>
          </div>

          {/* Right Illustration */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeIn', duration: 0.8, delay: 0.3 }}
          >
            <img
              src={Illustration}
              alt="Hero Illustration"
              className="w-full max-w-md md:max-w-lg object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
