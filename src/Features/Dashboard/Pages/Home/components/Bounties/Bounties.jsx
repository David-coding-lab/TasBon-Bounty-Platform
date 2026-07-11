import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { fetchRecommendedBounties } from '../../../../../../pages/Bounties/Api/bounties'

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
          <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">Recommended for you</h2>
          <p className="font-[Inter] text-sm text-[#4A5565]">Bounties that match your skills and interests</p>
        </div>
        <div className="flex flex-row items-center gap-1 cursor-pointer">
          <span className="text-base text-[#009966]">View all</span>
          <ArrowRight className="w-4 h-4 text-[#009966]" />
        </div>
      </div>

      <div className="flex flex-row gap-4 overflow-x-auto pb-2">
        {loading
          ? Array(3).fill(null).map((_, i) => (
              <div key={i} className="min-w-[280px] bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="h-32 bg-gray-100 rounded-lg mb-3" />
                <div className="h-4 bg-gray-100 rounded w-20 mb-2" />
                <div className="h-5 bg-gray-100 rounded w-48 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-32" />
              </div>
            ))
          : bounties.map((bounty, index) => (
              <div key={bounty.id || index} className="min-w-[280px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-br from-[#009966]/10 to-[#00B87C]/10 flex items-center justify-center">
                  <span className="text-4xl opacity-30">📋</span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-[#009966] bg-[#E6F8F2] px-2 py-0.5 rounded-full">{bounty.category}</span>
                  <h3 className="text-sm font-bold text-[#0A0A0A] mt-2 line-clamp-2">{bounty.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">
                      {bounty.clientName?.charAt(0)}
                    </div>
                    <span className="text-xs text-[#4A5565]">{bounty.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-[#009966]">{bounty.rewardAmount} {bounty.rewardToken}</span>
                    <span className="text-xs text-[#4A5565] bg-gray-100 px-2 py-0.5 rounded-full">{bounty.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Bounties
