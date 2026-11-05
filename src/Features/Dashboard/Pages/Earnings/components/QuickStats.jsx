import { useState, useEffect } from 'react'
import { CheckCircle2, Trophy, Award, Star, RefreshCw } from 'lucide-react'
import { getEarningsMetrics } from '../../../../../services/earnings'

const QuickStats = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEarningsMetrics()
      .then((res) => setMetrics(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full">
        <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h4 className="text-base font-semibold text-[#111827]">
              Quick Stats
            </h4>
            <p className="text-xs text-[#6B7280] mt-1">
              Performance overview this month
            </p>
          </div>
          <RefreshCw className="w-5 h-5 text-[#4B5563]" />
        </div>
        <div className="space-y-3">
          {Array(4)
            .fill(null)
            .map((_, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl border border-transparent hover:border-[#00B87C]/20 hover:bg-[#00B87C]/5 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 rounded-lg bg-gray-100 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] leading-tight">
                      <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                    </p>
                    <p className="text-xs text-[#6B7280] leading-tight mt-0.5">
                      <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-base font-bold text-[#111827] leading-none">
                    <div className="h-5 w-16 bg-gray-100 rounded animate-pulse" />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: 'Completed Bounties',
      value: metrics.completedBounties ?? 0,
      subLabel: `${metrics.monthlyGrowth ?? 0}% this month`,
      icon: CheckCircle2,
      iconColor: 'text-[#00B87C]',
      iconBg: 'bg-[#E6F8F2]',
    },
    {
      label: 'Hackathons Won',
      value: metrics.hackathonsWon ?? 0,
      subLabel: 'Platform completions',
      icon: Trophy,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7]',
    },
    {
      label: 'Grants Received',
      value: metrics.grantsReceived ?? 0,
      subLabel: 'Awarded platform-wide',
      icon: Award,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-[#EFF6FF]',
    },
    {
      label: 'Success Rate',
      value: `${metrics.successRate ?? 0}%`,
      subLabel: `${metrics.acceptedApplications ?? 0} of ${metrics.totalApplications ?? 0} applications`,
      icon: Star,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7]',
    },
  ]

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h4 className="text-base font-semibold text-[#111827]">
            Quick Stats
          </h4>
          <p className="text-xs text-[#6B7280] mt-1">
            Performance overview this month
          </p>
        </div>
        <RefreshCw className="w-5 h-5 text-[#4B5563]" />
      </div>

      {/* Stats List */}
      <div className="space-y-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl border border-transparent hover:border-[#00B87C]/20 hover:bg-[#00B87C]/5 transition-all duration-200"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div
                className={`p-2 rounded-lg flex items-center justify-center ${stat.iconBg}`}
              >
                <stat.icon
                  className={`w-5 h-5 ${stat.iconColor}`}
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#111827] leading-tight">
                  {stat.label}
                </p>
                <p className="text-xs text-[#6B7280] leading-tight mt-0.5">
                  {stat.subLabel}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-base font-bold text-[#111827] leading-none">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickStats
