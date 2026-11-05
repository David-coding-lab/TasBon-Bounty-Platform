import { useState, useEffect } from 'react'
import {
  DollarSign,
  Wallet,
  ArrowUpRight,
  Check,
  RefreshCw,
  Users,
  Target,
} from 'lucide-react'
import { getEarningsMetrics } from '../../../../../services/earnings'

const MetricsCards = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  // Safety: ensure no NaN values slip through to the UI
  const safeNum = (val) => (val == null || Number.isNaN(val) ? 0 : Number(val))

  useEffect(() => {
    getEarningsMetrics()
      .then((res) => setMetrics(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(6)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-[#4B5563] mb-1">...</p>
                  <h3 className="text-2xl font-bold text-[#111827]">
                    <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-gray-100">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
      </div>
    )
  }

  const cards = [
    {
      title: 'Total Earned',
      value: `$${safeNum(metrics.totalEarned).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtext: (
        <div className="flex items-center space-x-1.5 mt-2">
          <span
            className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${safeNum(metrics.monthlyGrowth) >= 0 ? 'bg-[#E6F8F2] text-[#00B87C]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}
          >
            <RefreshCw className="w-3 h-3 mr-0.5" />
            {safeNum(metrics.monthlyGrowth) >= 0 ? '+' : ''}
            {safeNum(metrics.monthlyGrowth)}%
          </span>
          <span className="text-xs text-[#6B7280]">this month</span>
        </div>
      ),
      icon: DollarSign,
      iconColor: 'text-[#00B87C]',
      iconBg: 'bg-[#E6F8F2]',
    },
    {
      title: 'Available Balance',
      value: `$${safeNum(metrics.availableBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtext: (
        <p className="text-xs text-[#6B7280] mt-2">
          +${safeNum(metrics.availableBalance).toFixed(2)} USDC
        </p>
      ),
      icon: Wallet,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-[#EFF6FF]',
    },
    {
      title: 'Active Bounties',
      value: safeNum(metrics.activeBounties),
      subtext: (
        <p className="text-xs text-[#6B7280] mt-2">bounties you created</p>
      ),
      icon: Users,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-[#EFF6FF]',
    },
    {
      title: 'Success Rate',
      value: `${safeNum(metrics.successRate)}%`,
      subtext: (
        <div className="flex items-center space-x-1.5 mt-2">
          <span
            className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${safeNum(metrics.monthlyGrowth) >= 0 ? 'bg-[#E6F8F2] text-[#00B87C]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}
          >
            <RefreshCw className="w-3 h-3 mr-0.5" />
            {safeNum(metrics.monthlyGrowth) >= 0 ? '+' : ''}
            {safeNum(metrics.monthlyGrowth)}%
          </span>
          <span className="text-xs text-[#6B7280]">this month</span>
        </div>
      ),
      icon: Target,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7]',
    },
    {
      title: 'Applications',
      value: safeNum(metrics.totalApplications),
      subtext: (
        <p className="text-xs text-[#6B7280] mt-2">bounties applied to</p>
      ),
      icon: Users,
      iconColor: 'text-[#7C3AED]',
      iconBg: 'bg-[#F5F3FF]',
    },
    {
      title: 'Total Withdrawn',
      value: `$${safeNum(metrics.totalWithdrawn).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtext: (
        <p className="text-xs text-[#6B7280] mt-2">
          +${safeNum(metrics.totalWithdrawn).toFixed(2)} USDC
        </p>
      ),
      icon: Check,
      iconColor: 'text-[#7C3AED]',
      iconBg: 'bg-[#F5F3FF]',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#4B5563] mb-1">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold text-[#111827]">
                  {card.value}
                </h3>
                {card.subtext}
              </div>
              <div className={`p-2 rounded-xl ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MetricsCards
