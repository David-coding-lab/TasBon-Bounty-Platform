import { motion } from 'framer-motion'
import ProfileOne from '../Assets/profile-one.png'
import ProfileThree from '../Assets/profile-two.png'
import ProfileTwo from '../Assets/logo.png'
import ProfileFour from '../Assets/profile-three.png'

import '../index.css'

const bounties = [
  {
    title: 'Build a DeFi Analytics Dashboard',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod....',
    creator: 'Mason Crypto',
    reward: '$500 USDC',
    tag: 'DeFi',
    verified: true,
    image: ProfileOne,
  },

  {
    title: 'Build a DeFi Analytics Dashboard',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod....',
    creator: 'TASHUB',
    reward: '$800 USDC',
    tag: 'Analytics',
    verified: true,
    image: ProfileTwo,
  },

  {
    title: 'Build a DeFi Analytics Dashboard',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod....',
    creator: 'Shawn James',
    reward: '$600 USDC',
    tag: 'Frontend',
    verified: false,
    image: ProfileThree,
  },

  {
    title: 'Build a DeFi Analytics Dashboard',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod....',
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
          className="flex flex-nowrap gap-5 mb-10 overflow-x-auto pb-4 custom-scrollbar"
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
              className="shrink-0 w-70 sm:w-[320px] md:w-90 bg-white rounded-md border border-gray-200"
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
              {/*Card Header */}
              <div className="flex p-2 mb-3">
                <div className="gap-3 flex">
                  <div className="w-10 h-10 p-0.5 bg-[#E6F6E2] rounded-3xl">
                    <img
                      src={b.image}
                      alt={b.creator}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="self-center font-sora font-bold text-sm">
                    {b.creator}
                  </p>
                  {b.verified && (
                    <svg
                      className="w-3 h-3 self-center text-emerald-500 ml-auto"
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

                <div className="self-center ml-auto px-3 py-1 bg-[#E6F6E2] rounded-2xl">
                  <p className="font-sora text-[10px] font-semibold m-0 p-0 text-[#24884D]">
                    Open
                  </p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold font-sora w-50 text-[#101820] mb-3 leading-snug">
                  {b.title}
                </h3>

                <p className="text-[#101820] font-sora w-80 text-[13px] mb-3">
                  {b.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-[#E6F6E2] uppercase text-[#4B5662] font-semibold px-2 py-1 rounded-md">
                    {b.tag}
                  </span>
                </div>

                <div className="w-full h-0.5 bg-[#8a8a8a46] mt-3 mb-3" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-8 h-8 rounded-full bg-[#E6F6E2] flex items-center justify-center">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5278 20.7502H2.97222C2.38285 20.7502 1.81762 20.4931 1.40087 20.0356C0.984126 19.5781 0.75 18.9576 0.75 18.3106V7.33262C0.75 6.68561 0.984126 6.0651 1.40087 5.6076C1.81762 5.15009 2.38285 4.89307 2.97222 4.89307H18.5278C19.1171 4.89307 19.6824 5.15009 20.0991 5.6076C20.5159 6.0651 20.75 6.68561 20.75 7.33262V18.3106C20.75 18.9576 20.5159 19.5781 20.0991 20.0356C19.6824 20.4931 19.1171 20.7502 18.5278 20.7502Z"
                          stroke="#1D6638"
                          stroke-width="1.5"
                        />
                        <path
                          d="M15.7523 13.4317C15.605 13.4317 15.4637 13.3674 15.3595 13.2531C15.2553 13.1387 15.1968 12.9836 15.1968 12.8218C15.1968 12.6601 15.2553 12.5049 15.3595 12.3905C15.4637 12.2762 15.605 12.2119 15.7523 12.2119C15.8997 12.2119 16.041 12.2762 16.1452 12.3905C16.2494 12.5049 16.3079 12.6601 16.3079 12.8218C16.3079 12.9836 16.2494 13.1387 16.1452 13.2531C16.041 13.3674 15.8997 13.4317 15.7523 13.4317Z"
                          fill="#1D6638"
                          stroke="#34A563"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.4167 4.8929V3.18887C17.4166 2.81502 17.3382 2.44618 17.1876 2.11086C17.037 1.77553 16.8183 1.48269 16.5482 1.25493C16.2781 1.02718 15.964 0.870617 15.6301 0.797331C15.2961 0.724045 14.9513 0.735997 14.6222 0.832266L2.4 4.40987C1.92673 4.54833 1.50838 4.85455 1.20999 5.28095C0.911601 5.70734 0.749891 6.23001 0.75 6.7677V7.33246"
                          stroke="#1D6638"
                          stroke-width="1.5"
                        />
                      </svg>
                    </div>

                    <span className="text-sm font-sora font-bold text-[#101820]">
                      {b.reward}
                    </span>
                  </div>
                  <button className="w-30 mt-3 text-white bg-[#34A563] cursor-pointer hover:bg-[#2a8a4f] text-xs font-semibold py-2 rounded-lg transition-colors">
                    View Bounty →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <button className="text-emerald-600 font-semibold text-sm hover:underline cursor-pointer">
            Explore all bounties →
          </button>
        </div>
      </div>
    </section>
  )
}
