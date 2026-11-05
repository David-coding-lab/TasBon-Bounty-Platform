import { CheckCircle2, Trophy, Award, Star, RefreshCw } from 'lucide-react'

const QuickStats = () => {
  const stats = [
    {
      label: 'Completed Bounties',
      value: '24',
      subLabel: '+9.5% this month',
      icon: CheckCircle2,
      iconColor: 'text-[#00B87C]',
      iconBg: 'bg-[#E6F8F2]',
    },
    {
      label: 'Hackathons Won',
      value: '5',
      subLabel: '+2 this month',
      icon: Trophy,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7]',
    },
    {
      label: 'Grants Received',
      value: '3',
      subLabel: '+1 this month',
      icon: Award,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-[#EFF6FF]',
    },
    {
      label: 'Average Rating',
      value: '4.9',
      subLabel: '+0.2 this month',
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
