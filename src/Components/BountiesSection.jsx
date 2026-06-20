import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { fetchRecommendedBounties } from '../pages/Bounties/Api/bounties'

import '../index.css'

const CACHE_KEY = 'bounties_recommended'
const CACHE_TTL = 3 * 60 * 60 * 1000

function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function setCache(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() }),
    )
  } catch {}
}

export default function BountiesSection() {
  const [bounties, setBounties] = useState(() => getCached() || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = getCached()
    if (cached) {
      setBounties(cached)
      setLoading(false)
      return
    }
    fetchRecommendedBounties()
      .then((res) => {
        setBounties(res.data)
        setCache(res.data)
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to load bounties')
        setBounties([])
      })
      .finally(() => setLoading(false))
  }, [])

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
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-70 sm:w-[320px] md:w-90 bg-white rounded-md border border-gray-200 animate-pulse"
                >
                  <div className="flex p-2 mb-3 gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-3xl" />
                    <div className="h-4 bg-gray-200 rounded w-24 self-center" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-8 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))
            : bounties.map((b) => (
                <motion.div
                  key={b.id}
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
                  <Link to="/bounties">
                    <div className="flex p-2 mb-3">
                      <div className="gap-3 flex">
                        <div className="w-10 h-10 p-0.5 bg-[#E6F6E2] rounded-3xl">
                          <img
                            src={b.clientAvatar}
                            alt={b.clientName}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <p className="self-center font-sora font-bold text-sm">
                          {b.clientName}
                        </p>
                      </div>
                      <div className="self-center ml-auto px-3 py-1 bg-[#E6F6E2] rounded-2xl">
                        <p className="font-sora text-[10px] font-semibold m-0 p-0 text-[#24884D]">
                          {b.difficulty}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-bold font-sora w-50 text-[#101820] mb-3 leading-snug">
                        {b.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-[#E6F6E2] uppercase text-[#4B5662] font-semibold px-2 py-1 rounded-md">
                          {b.category}
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
                                strokeWidth="1.5"
                              />
                              <path
                                d="M15.7523 13.4317C15.605 13.4317 15.4637 13.3674 15.3595 13.2531C15.2553 13.1387 15.1968 12.9836 15.1968 12.8218C15.1968 12.6601 15.2553 12.5049 15.3595 12.3905C15.4637 12.2762 15.605 12.2119 15.7523 12.2119C15.8997 12.2119 16.041 12.2762 16.1452 12.3905C16.2494 12.5049 16.3079 12.6601 16.3079 12.8218C16.3079 12.9836 16.2494 13.1387 16.1452 13.2531C16.041 13.3674 15.8997 13.4317 15.7523 13.4317Z"
                                fill="#1D6638"
                                stroke="#34A563"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.4167 4.8929V3.18887C17.4166 2.81502 17.3382 2.44618 17.1876 2.11086C17.037 1.77553 16.8183 1.48269 16.5482 1.25493C16.2781 1.02718 15.964 0.870617 15.6301 0.797331C15.2961 0.724045 14.9513 0.735997 14.6222 0.832266L2.4 4.40987C1.92673 4.54833 1.50838 4.85455 1.20999 5.28095C0.911601 5.70734 0.749891 6.23001 0.75 6.7677V7.33246"
                                stroke="#1D6638"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-sora font-bold text-[#101820]">
                            ${b.rewardAmount} {b.rewardToken}
                          </span>
                        </div>
                        <button className="w-30 mt-3 text-white bg-[#34A563] cursor-pointer hover:bg-[#2a8a4f] text-xs font-semibold py-2 rounded-lg transition-colors">
                          View Bounty →
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </motion.div>

        {!loading && bounties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              No recommended bounties right now.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/bounties"
            className="text-emerald-600 font-semibold text-sm hover:underline cursor-pointer"
          >
            Explore all bounties →
          </Link>
        </div>
      </div>
    </section>
  )
}
