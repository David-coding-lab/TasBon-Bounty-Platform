import { useState } from 'react'
import Navbar from '../../Components/NavBar'
import CTASection from '../../Components/Ctasection'
import Footer from '../../Components/Footer'
import Glow from './assets/glow.png'

const filters = ['All', 'Design', 'Development', 'Content', 'Others']

export default function Bounties() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="min-h-screen bg-[#Fff] font-sans antialiased">
      <Navbar />
      <main>
        <div className="relative container mx-auto w-full h-[70vh] overflow-hidden">
          <img
            src={Glow}
            alt=""
            className="absolute right-1/2 translate-x-[1000px] top-[300px] -translate-y-1/2 w-[750px] pointer-events-none select-none"
          />
          <div className="flex flex-col items-start pl-40 pt-20">
            <h1 className="text-6xl font-bold text-center mt-20 text-[#0E4E2F]">
              Bounties
            </h1>
            <p className="text-center text-gray-600 mt-4 text-lg">
              Find challenges, build solutions and earn rewards.
            </p>
          </div>
          <div className="flex pl-40 mt-30 w-full">
            <div className="relative w-full max-w-6xl">
              <svg
                className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M16.5 16.5L21 21" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white border-2 border-gray-200 rounded-full py-4 pl-16 pr-6 text-base text-black/50 placeholder:text-black/50 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center pl-40 mt-6 w-full max-w-[82vw] gap-3 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-2xl text-sm font-medium border transition-colors cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#34A563] border-[#009966] text-white'
                    : 'bg-white border-gray-400 text-black/80 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
            <button className="z-1 ml-auto flex items-center gap-2 px-5 py-2 rounded-2xl text-sm font-medium border border-black/30 bg-white text-black cursor-pointer hover:bg-gray-50 transition-colors">
              Sort by: Newest
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="container max-w-6xl bg-white justify-self-center bg-[#F5F5] h-[50vh] mx-auto px-6 mt-12"></div>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
