import { useState, useEffect } from 'react'
import { TrendingUp, MoreHorizontal } from 'lucide-react'
import { getDashboardStats } from '../../../../../../services/profile'

const Hero = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="font-[Inter] text-3xl font-semibold text-[#0A0A0A]">
          Welcome back, <span className="text-[#009966]">Alex</span>
        </h1>
        <p className="text-base text-[#4A5565]">
          Discover opportunities, build solutions, and earn rewards
        </p>
      </div>

      <div className="flex flex-row gap-4">
        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Total Earnings</span>
            <TrendingUp className="w-5 h-5 text-[#4A5565]" />
          </div>
          <div className="text-[#0A0A0A] text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
            ) : (
              `$${(stats?.totalEarnings || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            )}
          </div>
          <p className="text-sm text-[#009966]">
            +{stats?.earningsChangePercent || 0}% this month
          </p>
        </div>

        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Active Bounties</span>
            <MoreHorizontal className="w-5 h-5 text-[#4A5565]" />
          </div>
          <div className="text-[#0A0A0A] text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-12 bg-gray-100 rounded animate-pulse" />
            ) : (
              stats?.activeBountiesCount || 0
            )}
          </div>
          <p className="text-sm text-[#4A5565]">In progress</p>
        </div>

        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Applications</span>
          </div>
          <div className="text-[#0A0A0A] text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-12 bg-gray-100 rounded animate-pulse" />
            ) : (
              stats?.applicationsCount || 0
            )}
          </div>
          <p className="text-sm text-[#E17100]">
            {stats?.newApplicationsUpdates || 0} new updates
          </p>
        </div>

        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Success Rate</span>
          </div>
          <div className="text-[#0A0A0A] text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
            ) : (
              `${stats?.successRate || 0}%`
            )}
          </div>
          <p className="text-sm text-[#009966]">
            +{stats?.successRateChangePercent || 0}% this month
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
