import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import Navbar from '../../Components/NavBar'
import CTASection from '../../Components/Ctasection'
import Footer from '../../Components/Footer'
import BountiesCard from '../../Components/Bounties/BountiesCard'
import Glow from './assets/glow.png'
import { fetchActiveBounties } from './Api/bounties'

const filters = ['All', 'Design', 'Development', 'Content', 'Others']

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Highest Price', value: 'price-desc' },
  { label: 'Lowest Price', value: 'price-asc' },
]

function sortBounties(bounties, sortValue) {
  const sorted = [...bounties]
  switch (sortValue) {
    case 'price-desc':
      return sorted.sort((a, b) => b.rewardAmount - a.rewardAmount)
    case 'price-asc':
      return sorted.sort((a, b) => a.rewardAmount - b.rewardAmount)
    default:
      return sorted
  }
}

export default function Bounties() {
  const [searchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [bounties, setBounties] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [activeSort, setActiveSort] = useState('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const category = searchParams.get('category')
    if (category && filters.includes(category)) {
      setActiveFilter(category)
    }
  }, [searchParams])

  useEffect(() => {
    fetchActiveBounties()
      .then((res) => setBounties(res.data))
      .catch((err) => {
        toast.error(err.message || 'Failed to load bounties')
        setBounties([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredBounties = sortBounties(
    bounties.filter((bounty) => {
      const category = bounty.category || ''
      const matchesCategory =
        activeFilter === 'All' || category === activeFilter
      const matchesSearch =
        !searchQuery ||
        bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bounty.clientName || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    }),
    activeSort,
  )

  const activeSortLabel = sortOptions.find((o) => o.value === activeSort)?.label

  return (
    <div className="min-h-screen bg-[#Fff] font-sans antialiased">
      <Navbar />
      <main>
        <div className="relative container m-auto w-full min-h-[30vh] lg:min-h-[40vh] overflow-hidden pb-5">
          <img
            src={Glow}
            alt=""
            className="hidden sm:block absolute right-1/2 translate-x-250 top-75 -translate-y-1/2 w-187.5 pointer-events-none select-none h-150"
          />
          <div className="flex flex-col max-w-7xl mx-auto pl-5 lg:pl-10 pt-5 lg:pt-20">
            <h2 className="lg:text-4xl text-2xl md:text-3xl leading-none font-sora font-bold pt-4 md:mt-4 lg:mt-5 text-[#0E4E2F]">
              Bounties
            </h2>
            <p className="text-gray-600 my-5 lg:text-2xl max-w-3xl">
              Find challenges, build solutions and earn rewards.
            </p>
          </div>
          <div className="mt-4 lg:mt-8 w-full max-w-4xl mx-auto">
            <div className="relative w-full">
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
                placeholder="Search bounties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-gray-200 rounded-full py-2 pl-16 pr-6 text-base text-black placeholder:text-black/50 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>
          <div className="mt-8 w-full max-w-4xl mx-auto flex flex-wrap gap-3 justify-center sm:justify-end items-center">
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
            <div className="relative z-50" ref={sortRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-5 py-2 rounded-2xl text-sm font-medium border border-black/30 bg-white text-black cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Sort by: {activeSortLabel}
                <svg
                  className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
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
              {sortOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setActiveSort(option.value)
                        setSortOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        activeSort === option.value
                          ? 'bg-[#E6F6E2] text-[#0E4E2F] font-semibold'
                          : 'text-black/80 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-10 px-4 sm:px-6 mt-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 border border-[#E5E7EB] rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-200" />
                  <div className="p-3 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-10 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {filteredBounties.map((bounty) => (
                  <BountiesCard
                    key={bounty.id}
                    bountyId={bounty.id}
                    headerImg={bounty.clientAvatar}
                    categoryName={bounty.category || ''}
                    title={bounty.title}
                    description={bounty.description}
                    issuerIcon={bounty.clientAvatar}
                    issuerName={bounty.clientName}
                    price={`$${bounty.rewardAmount} ${bounty.rewardToken}`}
                    level={bounty.difficulty || ''}
                  />
                ))}
              </div>
              {filteredBounties.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg font-sora">
                    No bounties found
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </>
          )}
          <div className="flex justify-center mt-10">
            <button className="px-8 py-3 rounded-xl text-sm font-medium border border-[#009966] text-[#009966] bg-white hover:bg-[#f0faf4] transition-colors cursor-pointer">
              Load More
            </button>
          </div>
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
