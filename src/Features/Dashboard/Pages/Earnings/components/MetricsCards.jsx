import { useState, useEffect } from 'react'
import { DollarSign, Wallet, ArrowUpRight, Check } from 'lucide-react'
import { getEarningsMetrics } from '../../../../../services/earnings'

const MetricsCards = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEarningsMetrics()
      .then((res) => setMetrics(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const cards = metrics
    ? [
        {
          title: 'Total Earned',
          value: `$${metrics.totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          icon: DollarSign,
          iconColor: 'text-[#00B87C]',
          iconBg: 'bg-[#E6F8F2]',
          subtext: (
            <div className="flex items-center space-x-1.5 mt-2">
              <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E6F8F2] text-[#00B87C]">
                <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +14.6%
              </span>
              <span className="text-xs text-[#6B7280]">in last 90 days</span>
            </div>
          ),
        },
        {
          title: 'Available Balance',
          value: `$${metrics.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          icon: Wallet,
          iconColor: 'text-[#3B82F6]',
          iconBg: 'bg-[#EFF6FF]',
          subtext: <p className="text-xs text-[#6B7280] mt-2">+{metrics.availableBalance.toFixed(2)} USDC</p>,
        },
        {
          title: 'Pending Review',
          value: `$${metrics.pendingReview.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          icon: ArrowUpRight,
          iconColor: 'text-[#F59E0B]',
          iconBg: 'bg-[#FEF3C7]',
          subtext: <p className="text-xs text-[#6B7280] mt-2">+{metrics.pendingReview.toFixed(2)} USDC</p>,
        },
        {
          title: 'Total Withdrawn',
          value: `$${metrics.totalWithdrawn.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          icon: Check,
          iconColor: 'text-[#7C3AED]',
          iconBg: 'bg-[#F5F3FF]',
          subtext: <p className="text-xs text-[#6B7280] mt-2">+{metrics.totalWithdrawn.toFixed(2)} USDC</p>,
        },
      ]
    : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(loading ? Array(4).fill(null) : cards).map((card, idx) => {
        const Icon = card?.icon || DollarSign
        return (
          <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#4B5563] mb-1">{loading ? '...' : card.title}</p>
                <h3 className="text-2xl font-bold text-[#111827]">
                  {loading ? <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" /> : card.value}
                </h3>
              </div>
              {!loading && (
                <div className={`p-2 rounded-xl ${card.iconBg}`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              )}
            </div>
            {!loading && card.subtext}
          </div>
        )
      })}
    </div>
  )
}

export default MetricsCards
