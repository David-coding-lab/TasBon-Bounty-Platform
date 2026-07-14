import { useState, useEffect } from 'react'
import NftBanner from '../../components/Information/NftBanner'
import BountiesCard from '../../../../Components/Bounties/BountiesCard'
import { listBounties } from '../../../../services/bounties'
import { toast } from 'sonner'

const CATEGORY_IMAGES = {
  Design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  Development: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
  Content: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400',
  Smart_Contract: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
  Web3: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400',
  Frontend: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
}

const CATEGORY_ICONS = {
  Design: 'https://api.dicebear.com/7.x/shapes/svg?seed=design',
  Development: 'https://api.dicebear.com/7.x/shapes/svg?seed=dev',
  Content: 'https://api.dicebear.com/7.x/shapes/svg?seed=content',
  Default: 'https://api.dicebear.com/7.x/shapes/svg?seed=bounty',
}

const DashBounties = () => {
  const filters = ['All', 'Design', 'Development', 'Content', 'Others']
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [bounties, setBounties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    listBounties()
      .then((res) => setBounties(res.data || []))
      .catch((err) => toast.error(err.message || 'Failed to load bounties'))
      .finally(() => setLoading(false))
  }, [])

  const getCategoryImage = (category) => CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Development
  const getIssuerIcon = (_issuer) => CATEGORY_ICONS.Default

  const filtered = bounties.filter((bounty) => {
    const cat = bounty.category || bounty.categoryName || ''
    const matchesCategory = activeFilter === 'All' || cat === activeFilter
    const title = (bounty.title || '').toLowerCase()
    const issuer = (bounty.issuerName || bounty.issuer?.name || '').toLowerCase()
    const q = searchQuery.toLowerCase()
    const matchesSearch = !q || title.includes(q) || issuer.includes(q) || cat.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col space-y-8 w-full">
      <NftBanner />
      <div className="flex flex-col space-y-4">
        <div className="relative w-full max-w-7xl">
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
            className="w-full bg-white border-2 border-gray-200 rounded-full py-5 pl-16 pr-6 text-base text-black placeholder:text-black/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-4 overflow-x-auto py-2">
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
        </div>

        <div className="max-w-6xl mx-auto mb-10 px-4 sm:px-6 mt-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No bounties found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((bounty, index) => (
                <BountiesCard
                  key={bounty.id || index}
                  bountyId={bounty.id}
                  headerImg={bounty.imageUrl || getCategoryImage(bounty.category || bounty.categoryName)}
                  categoryName={bounty.category || bounty.categoryName}
                  title={bounty.title}
                  description={bounty.description || bounty.deliverables?.join(', ')}
                  issuerIcon={bounty.issuer?.logo || getIssuerIcon(bounty.issuer?.name)}
                  issuerName={bounty.issuer?.name || bounty.issuerName}
                  price={bounty.reward ? `$${bounty.reward.toLocaleString()} ${bounty.rewardType === 'milestone' ? '(milestone)' : 'USDC'}` : ''}
                  level={bounty.level || 'Intermediate'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashBounties
