import { useState } from 'react'
import { Info } from 'lucide-react'

const EarningsOverview = () => {
  const [timeframe, setTimeframe] = useState('All time')
  const [currency, setCurrency] = useState('USD')
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const monthlyData = [
    { month: 'Jan', amount: '$3,100', x: 40, y: 195 },
    { month: 'Feb', amount: '$4,200', x: 87, y: 185 },
    { month: 'Mar', amount: '$3,800', x: 134, y: 189 },
    { month: 'Apr', amount: '$5,900', x: 181, y: 171 },
    { month: 'May', amount: '$6,800', x: 228, y: 163 },
    { month: 'Jun', amount: '$8,000', x: 275, y: 153 },
    { month: 'Jul', amount: '$9,500', x: 322, y: 140 },
    { month: 'Aug', amount: '$11,200', x: 369, y: 126 },
    { month: 'Sep', amount: '$12,800', x: 416, y: 112 },
    { month: 'Oct', amount: '$14,500', x: 463, y: 98 },
    { month: 'Nov', amount: '$16,100', x: 510, y: 84 },
    { month: 'Dec', amount: '$18,450', x: 557, y: 64 },
  ]

  // Create smooth bezier path
  const getCurvePath = () => {
    let path = `M ${monthlyData[0].x},${monthlyData[0].y}`
    for (let i = 0; i < monthlyData.length - 1; i++) {
      const p0 = monthlyData[i]
      const p1 = monthlyData[i + 1]
      const cpX1 = p0.x + (p1.x - p0.x) / 2
      const cpY1 = p0.y
      const cpX2 = p0.x + (p1.x - p0.x) / 2
      const cpY2 = p1.y
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`
    }
    return path
  }

  // Path for gradient area underneath the curve
  const getAreaPath = () => {
    const curve = getCurvePath()
    const startX = monthlyData[0].x
    const endX = monthlyData[monthlyData.length - 1].x
    return `${curve} L ${endX},220 L ${startX},220 Z`
  }

  const yTicks = [
    { label: '$20k', y: 50 },
    { label: '$15k', y: 92.5 },
    { label: '$10k', y: 135 },
    { label: '$5k', y: 177.5 },
    { label: '$0k', y: 220 },
  ]

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col flex-1 h-full">
      {/* Top Header Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 mb-5">
        <div className="flex items-center space-x-2">
          <h4 className="text-base font-semibold text-[#111827]">
            Earnings Overview
          </h4>
          <Info className="w-4 h-4 text-[#9CA3AF] cursor-help" />
        </div>

        {/* Buttons / Filters */}
        <div className="flex items-center space-x-3 bg-gray-50 p-1 rounded-xl border border-gray-100">
          <div className="flex space-x-1">
            {['All time', '6M', '3M', '1M'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  timeframe === t
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-gray-200" />

          <div className="flex space-x-1">
            {['USD', 'USDC'].map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currency === c
                    ? 'text-[#00B87C] bg-[#E6F8F2] font-bold'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Title Value */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
          Total Earned
        </p>
        <h2 className="text-3xl font-black text-[#111827] tracking-tight">
          $18,450.00
        </h2>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative flex-1 min-h-[220px]">
        <svg className="w-full h-full min-h-[220px]" viewBox="0 0 600 240">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00B87C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00B87C" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Y axis labels */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <text
                x="5"
                y={tick.y + 4}
                className="text-[11px] fill-[#9CA3AF] font-medium"
              >
                {tick.label}
              </text>
              <line
                x1="40"
                y1={tick.y}
                x2="580"
                y2={tick.y}
                stroke="#F3F4F6"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Area fill path under curve */}
          <path d={getAreaPath()} fill="url(#chartGradient)" />

          {/* Main Curve path */}
          <path
            d={getCurvePath()}
            fill="none"
            stroke="#00B87C"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Hover helper vertical lines & dots */}
          {monthlyData.map((d, index) => {
            const isHovered = hoveredIndex === index
            return (
              <g key={index}>
                {/* Hit area circle */}
                <circle
                  cx={d.x}
                  cy={d.y}
                  r="20"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Hover line */}
                {isHovered && (
                  <line
                    x1={d.x}
                    y1={50}
                    x2={d.x}
                    y2={220}
                    stroke="#00B87C"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Data point circle */}
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={isHovered ? '6' : '3.5'}
                  fill={isHovered ? '#00B87C' : '#FFFFFF'}
                  stroke="#00B87C"
                  strokeWidth={isHovered ? '2' : '2'}
                  className="transition-all duration-150 pointer-events-none"
                />
              </g>
            )
          })}

          {/* X-axis labels */}
          {monthlyData.map((d, i) => (
            <text
              key={i}
              x={d.x}
              y="238"
              textAnchor="middle"
              className="text-[11px] fill-[#9CA3AF] font-medium"
            >
              {d.month}
            </text>
          ))}
        </svg>

        {/* Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            className="absolute bg-[#111827] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-lg pointer-events-none transition-all duration-100 z-10"
            style={{
              left: `${(monthlyData[hoveredIndex].x / 600) * 100}%`,
              top: `${(monthlyData[hoveredIndex].y / 240) * 100 - 18}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="text-center font-black">
              {monthlyData[hoveredIndex].amount}
            </div>
            <div className="text-[10px] text-[#9CA3AF] font-normal">
              {monthlyData[hoveredIndex].month}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EarningsOverview
