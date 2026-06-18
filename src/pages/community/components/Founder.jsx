import { motion } from 'framer-motion'
import founderImg from '../assets/founder.png'

export default function Founder() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-left">
        {/* Section Header — slide in from left on scroll */}
        <motion.div
          className="mb-12"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-[#34A563] text-sm font-bold tracking-wider uppercase block mb-3 font-sans">
            Meet the
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black font-sans tracking-tight">
            Director Of Operations
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Profile Detail Card — slide in from left */}
          <motion.div
            className="lg:col-span-8 bg-transparent flex flex-col md:flex-row gap-8 items-center md:items-stretch"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="w-full h-full md:w-70 shrink-0">
              <img
                src={founderImg}
                alt="Amio Anthony - Director of Operations at Tashub"
                className="w-full h-full object-cover rounded-2xl border border-gray-100 shadow-sm"
              />
            </div>

            <div className="flex flex-col justify-between py-2 text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black font-sans mb-1">
                  Amio Anthony
                </h3>
                <span className="text-[#34A563] text-base font-bold font-sans block mb-6">
                  Web3 Educator & Software Developer
                </span>
                <p className="text-base sm:text-lg text-gray-600 font-sans leading-relaxed">
                  An educator, community builder, and software developer
                  committed to inspiring growth, bringing people together,and
                  building impactful technology that makes a difference.
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                  aria-label="X Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                  aria-label="Website"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Quote card — come up from below */}
          <motion.div
            className="lg:col-span-4 flex items-center"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          >
            <div className="w-full bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 flex flex-col justify-start relative hover:shadow-xl transition-all">
              <span className="text-[#34A563] text-6xl font-mono leading-none select-none text-left block -mb-2">
                "
              </span>
              <p className="text-base sm:text-lg text-gray-700 font-sans italic leading-relaxed text-left">
                We built TASBUN to break barriers between talent and
                opportunity. Our mission is simple - enable builders to build,
                earn and make an impact together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
