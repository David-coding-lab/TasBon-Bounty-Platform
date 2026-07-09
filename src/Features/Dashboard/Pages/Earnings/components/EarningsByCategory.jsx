import { Info, ArrowRight } from 'lucide-react'

const EarningsByCategory = () => {
  const categories = [
    {
      name: 'Bounties',
      amount: '$12,550',
      percentage: '73%',
      color: '#00B87C', // Dark Green
      bgClass: 'bg-[#00B87C]',
      dashLength: 165.1,
      dashOffset: 0,
    },
    {
      name: 'Hackathons',
      amount: '$3,000',
      percentage: '16%',
      color: '#84CC16', // Lime Green
      bgClass: 'bg-[#84CC16]',
      dashLength: 36.2,
      dashOffset: -165.1,
    },
    {
      name: 'Grants',
      amount: '$1,650',
      percentage: '9%',
      color: '#34D399', // Mint Green
      bgClass: 'bg-[#34D399]',
      dashLength: 20.4,
      dashOffset: -201.3,
    },
    {
      name: 'Tips & Bonuses',
      amount: '$450',
      percentage: '2%',
      color: '#D1FAE5', // Light Green
      bgClass: 'bg-[#D1FAE5]',
      dashLength: 4.5,
      dashOffset: -221.7,
    },
  ]

  const circumference = 226.2

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <h4 className="text-base font-semibold text-[#111827]">
            Earnings by Category
          </h4>
          <Info className="w-4 h-4 text-[#9CA3AF] cursor-help" />
        </div>
      </div>

      {/* Donut and Legend Wrapper */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
        {/* SVG Donut Chart */}
        <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="transparent"
              stroke="#F3F4F6"
              strokeWidth="10"
            />
            {/* Colored segments */}
            {categories.map((c, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke={c.color}
                strokeWidth="10"
                strokeDasharray={`${c.dashLength} ${circumference}`}
                strokeDashoffset={c.dashOffset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-black text-[#111827] leading-none">
              $18,450
            </span>
            <span className="text-xs text-[#9CA3AF] font-medium mt-1">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-3.5">
          {categories.map((c, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${c.bgClass}`} />
                <span className="text-sm font-semibold text-[#4B5563]">
                  {c.name}
                </span>
              </div>
              <div className="text-sm text-right">
                <span className="font-bold text-[#111827] mr-1">{c.amount}</span>
                <span className="text-xs text-[#9CA3AF] font-medium">
                  {c.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 border-t border-gray-100 pt-4 flex justify-end">
        <a
          href="#"
          className="inline-flex items-center text-xs font-semibold text-[#00B87C] hover:text-[#009966] transition-colors gap-1.5 cursor-pointer"
        >
          <span>View full breakdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}

export default EarningsByCategory
