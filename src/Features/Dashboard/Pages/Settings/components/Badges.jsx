import { Icon } from '@iconify/react'

const Badges = () => {
  const badgesList = [
    {
      title: 'Top Performer',
      icon: 'lucide:graduation-cap',
      bgClass: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Verified Builder',
      icon: 'lucide:zap',
      bgClass: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Security Expert',
      icon: 'lucide:shield-check',
      bgClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'DeFi Specialist',
      icon: 'lucide:credit-card',
      bgClass: 'bg-teal-50 text-teal-600',
    },
    {
      title: '10+ Bounties',
      icon: 'lucide:sparkles',
      bgClass: 'bg-purple-50 text-purple-600',
    },
    {
      title: '5 Star Rating',
      icon: 'lucide:play',
      bgClass: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-gray-900">Badges</h3>
        <a href="#" className="text-xs font-semibold text-gray-500 hover:text-gray-900">
          View all
        </a>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {badgesList.map((badge, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-gray-50 transition-colors text-center"
          >
            <div className={`p-3 rounded-2xl mb-2 ${badge.bgClass}`}>
              <Icon icon={badge.icon} className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-gray-600 leading-tight">
              {badge.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Badges
