import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { fetchRecommendedBounties } from '../../../../../../pages/Bounties/Api/bounties'
import BountiesCard from '../../../../../../Components/Bounties/BountiesCard'
import { Link } from 'react-router-dom'

const CATEGORY_IMAGES = {
  Design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  Development:
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
  Content: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400',
  Smart_Contract:
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
  Web3: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400',
  Frontend: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
}

const CATEGORY_ICONS = {
  Design: 'https://api.dicebear.com/7.x/shapes/svg?seed=design',
  Development: 'https://api.dicebear.com/7.x/shapes/svg?seed=dev',
  Content: 'https://api.dicebear.com/7.x/shapes/svg?seed=content',
  Default: 'https://api.dicebear.com/7.x/shapes/svg?seed=bounty',
}

const getCategoryImage = (category) =>
  CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Development
const getIssuerIcon = () => CATEGORY_ICONS.Default
const Bounties = () => {
  const [bounties, setBounties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendedBounties()
      .then((res) => setBounties(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">
            Recommended for you
          </h2>
          <p className="font-[Inter] text-sm text-[#4A5565]">
            Bounties that match your skills and interests
          </p>
        </div>
        <div className="flex flex-row items-center gap-1 cursor-pointer">
          <Link to="/dashboard/bounties" className="flex items-center gap-1">
            <span className="text-base text-[#009966]">View all</span>
          </Link>
          <ArrowRight className="w-4 h-4 text-[#009966]" />
        </div>
      </div>

      <div className="flex flex-row flex-nowrap gap-4 overflow-x-auto pb-2">
        {loading
          ? Array(3)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-70 shrink-0 bg-white border border-gray-200 rounded-xl p-4 animate-pulse"
                >
                  <div className="h-32 bg-gray-100 rounded-lg mb-3" />
                  <div className="h-4 bg-gray-100 rounded w-20 mb-2" />
                  <div className="h-5 bg-gray-100 rounded w-48 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-32" />
                </div>
              ))
          : bounties.map((bounty, index) => (
              <div
                key={bounty.id || index}
                className="cursor-pointer w-70 shrink-0"
              >
                <BountiesCard
                  bountyId={bounty.id}
                  headerImg={
                    bounty.imageUrl ||
                    getCategoryImage(bounty.category || bounty.categoryName)
                  }
                  categoryName={bounty.category || bounty.categoryName}
                  title={bounty.title}
                  description={
                    bounty.description || bounty.deliverables?.join(', ')
                  }
                  issuerIcon={
                    bounty.issuer?.logo || getIssuerIcon(bounty.issuer?.name)
                  }
                  issuerName={bounty.issuer?.name || bounty.issuerName}
                  price={
                    bounty.reward
                      ? `$${bounty.reward.toLocaleString()} ${bounty.rewardType === 'milestone' ? '(milestone)' : 'USDC'}`
                      : ''
                  }
                  level={bounty.level || 'Intermediate'}
                />
              </div>
            ))}
      </div>
    </div>
  )
}

export default Bounties
