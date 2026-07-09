import { DollarSign, Wallet, ArrowUpRight, Check } from 'lucide-react'

const MetricsCards = () => {
  const cards = [
    {
      title: 'Total Earned',
      value: '$18,450.00',
      icon: DollarSign,
      iconColor: 'text-[#00B87C]',
      iconBg: 'bg-[#E6F8F2]',
      subtext: (
        <div className="flex items-center space-x-1.5 mt-2">
          <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E6F8F2] text-[#00B87C]">
            <svg
              className="w-3 h-3 mr-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            +14.6%
          </span>
          <span className="text-xs text-[#6B7280]">in last 90 days</span>
        </div>
      ),
    },
    {
      title: 'Available Balance',
      value: '$2,450.00',
      icon: Wallet,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-[#EFF6FF]',
      subtext: <p className="text-xs text-[#6B7280] mt-2">+1,425 USDC</p>,
    },
    {
      title: 'Pending Review',
      value: '$3,200.00',
      icon: ArrowUpRight,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7]',
      subtext: <p className="text-xs text-[#6B7280] mt-2">+3,200 USDC</p>,
    },
    {
      title: 'Total Withdrawn',
      value: '$12,800.00',
      icon: Check,
      iconColor: 'text-[#7C3AED]',
      iconBg: 'bg-[#F5F3FF]',
      subtext: <p className="text-xs text-[#6B7280] mt-2">+12,800 USDC</p>,
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
              </div>
              <div className={`p-2 rounded-xl ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            {card.subtext}
          </div>
        )
      })}
    </div>
  )
}

export default MetricsCards
