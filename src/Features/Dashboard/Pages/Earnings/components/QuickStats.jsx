import { CheckCircle2, Trophy, Award, Star } from 'lucide-react'

const QuickStats = () => {
  const stats = [
    {
      label: 'Completed Bounties',
      value: '24',
      icon: CheckCircle2,
      iconColor: 'text-[#00B87C]',
      iconBg: 'bg-[#E6F8F2]',
    },
    {
      label: 'Hackathons Won',
      value: '5',
      icon: Trophy,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7]',
    },
    {
      label: 'Grants Received',
      value: '3',
      icon: Award,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-[#EFF6FF]',
    },
    {
      label: 'Average Rating',
      value: (
        <div className="flex items-center space-x-1">
          <span>4.9</span>
          <Star className="w-4 h-4 fill-[#F59E0B] stroke-none" />
        </div>
      ),
      icon: Star,
      iconColor: 'text-[#7C3AED]',
      iconBg: 'bg-[#F5F3FF]',
    },
  ]

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h4 className="text-base font-semibold text-[#111827]">
            Quick Stats
          </h4>
        </div>

        {/* Stats List */}
        <div className="space-y-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-none"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                    <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm font-semibold text-[#4B5563]">
                    {stat.label}
                  </span>
                </div>
                <div className="text-sm font-black text-[#111827]">
                  {stat.value}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuickStats
