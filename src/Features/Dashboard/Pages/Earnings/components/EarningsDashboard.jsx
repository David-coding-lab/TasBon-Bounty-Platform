import { useState } from 'react'
import { Info, ArrowRight } from 'lucide-react'

const defaultMockData = {
  currency: 'USD',
  timeframe: 'all_time',
  total_earned: 18450.0,
  earnings_overview: [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 2100 },
    { month: 'Mar', amount: 1800 },
    { month: 'Apr', amount: 3400 },
    { month: 'May', amount: 4200 },
    { month: 'Jun', amount: 5500 },
    { month: 'Jul', amount: 7100 },
    { month: 'Aug', amount: 8900 },
    { month: 'Sep', amount: 10500 },
    { month: 'Oct', amount: 12200 },
    { month: 'Nov', amount: 14800 },
    { month: 'Dec', amount: 18450 },
  ],
  earnings_by_category: [
    {
      category: 'Bounties',
      amount: 12550.0,
      percentage: 73,
      color: '#00A854',
    },
    {
      category: 'Hackathons',
      amount: 3000.0,
      percentage: 16,
      color: '#8CE000',
    },
    {
      category: 'Grants',
      amount: 1650.0,
      percentage: 9,
      color: '#52C41A',
    },
    {
      category: 'Tips & Bonuses',
      amount: 450.0,
      percentage: 2,
      color: '#B7EB8F',
    },
  ],
}

const EarningsDashboard = ({ data = defaultMockData }) => {
  const [timeframe, setTimeframe] = useState('All time')
  const [currency, setCurrency] = useState('USD')
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Map amount values to Y-axis coordinates (viewBox height is 240)
  // Max expected value for graph height is 20000, Y-range from 50 to 220
  const points = data.earnings_overview.map((d, index) => {
    const totalPoints = data.earnings_overview.length
    const x = 40 + (index * 520) / (totalPoints - 1)
    const y = 220 - (d.amount / 20000) * 170
    return { ...d, x, y }
  })

  // Generate smooth bezier curve path for SVG
  const getCurvePath = () => {
    if (points.length === 0) return ''
    let path = `M ${points[0].x},${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const cpX1 = p0.x + (p1.x - p0.x) / 2
      const cpY1 = p0.y
      const cpX2 = p0.x + (p1.x - p0.x) / 2
      const cpY2 = p1.y
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`
    }
    return path
  }

  const getAreaPath = () => {
    const curve = getCurvePath()
    if (!curve) return ''
    const startX = points[0].x
    const endX = points[points.length - 1].x
    return `${curve} L ${endX},220 L ${startX},220 Z`
  }

  // Circular calculations for Donut Chart (Radius = 36, Circumference = 2 * PI * 36 = 226.2)
  const circumference = 226.195
  let currentOffset = 0

  const donutCategories = data.earnings_by_category.map((c) => {
    const dashLength = (c.percentage / 100) * circumference
    const dashOffset = currentOffset
    currentOffset -= dashLength
    return { ...c, dashLength, dashOffset }
  })

  const yTicks = [
    { label: '$20k', y: 50 },
    { label: '$15k', y: 92.5 },
    { label: '$10k', y: 135 },
    { label: '$5k', y: 177.5 },
    { label: '$0k', y: 220 },
  ]

  // Formatter for currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel: Earnings Overview */}
      <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 mb-5">
          <div className="flex items-center space-x-2">
            <h4 className="text-base font-semibold text-[#111827]">
              Earnings Overview
            </h4>
            <Info className="w-4 h-4 text-[#9CA3AF] cursor-help" />
          </div>

          {/* Timeframe & Currency Filters */}
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

        {/* Total Metric */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
            Total Earned
          </p>
          <h2 className="text-3xl font-black text-[#111827] tracking-tight">
            {formatCurrency(data.total_earned)}
          </h2>
        </div>

        {/* SVG Chart */}
        <div className="relative flex-1 min-h-[220px]">
          <svg className="w-full h-full min-h-[220px]" viewBox="0 0 600 240">
            <defs>
              <linearGradient
                id="dashboardChartGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#00A854" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00A854" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
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
                  x1="45"
                  y1={tick.y}
                  x2="580"
                  y2={tick.y}
                  stroke="#F3F4F6"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Gradient fill */}
            <path d={getAreaPath()} fill="url(#dashboardChartGradient)" />

            {/* Main line path */}
            <path
              d={getCurvePath()}
              fill="none"
              stroke="#00A854"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Interaction points */}
            {points.map((p, index) => {
              const isHovered = hoveredIndex === index
              return (
                <g key={index}>
                  {/* Invisible wide hover area */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="20"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />

                  {/* Vertical dotted line */}
                  {isHovered && (
                    <line
                      x1={p.x}
                      y1={50}
                      x2={p.x}
                      y2={220}
                      stroke="#00A854"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* Dot */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? '6' : '3.5'}
                    fill={isHovered ? '#00A854' : '#FFFFFF'}
                    stroke="#00A854"
                    strokeWidth="2"
                    className="transition-all duration-150 pointer-events-none"
                  />
                </g>
              )
            })}

            {/* X-Axis Month labels */}
            {points.map((p, i) => (
              <text
                key={i}
                x={p.x}
                y="238"
                textAnchor="middle"
                className="text-[11px] fill-[#9CA3AF] font-medium"
              >
                {p.month}
              </text>
            ))}
          </svg>

          {/* Interactive Tooltip */}
          {hoveredIndex !== null && (
            <div
              className="absolute bg-[#111827] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-lg pointer-events-none transition-all duration-100 z-10"
              style={{
                left: `${(points[hoveredIndex].x / 600) * 100}%`,
                top: `${(points[hoveredIndex].y / 240) * 100 - 18}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="text-center font-black">
                {formatCurrency(points[hoveredIndex].amount)}
              </div>
              <div className="text-[10px] text-[#9CA3AF] font-normal">
                {points[hoveredIndex].month}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Earnings by Category */}
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

        {/* Content Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
          {/* Donut Chart */}
          <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Gray Base Background ring */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#FFFFFF"
                strokeWidth="9"
              />
              {/* Segments */}
              {donutCategories.map((c, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="36"
                  fill="transparent"
                  stroke={c.color}
                  strokeWidth="9"
                  strokeDasharray={`${c.dashLength - 1.5} ${circumference}`}
                  strokeDashoffset={c.dashOffset - 0.75}
                  className="transition-all duration-300"
                />
              ))}
            </svg>

            {/* Inner labels */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-[#111827] leading-none">
                {formatCurrency(data.total_earned).replace('.00', '')}
              </span>
              <span className="text-xs text-[#9CA3AF] font-medium mt-1">
                Total
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="flex-1 w-full space-y-3.5">
            {donutCategories.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-sm font-semibold text-[#4B5563]">
                    {c.category}
                  </span>
                </div>
                <div className="text-sm text-right">
                  <span className="font-bold text-[#111827] mr-1">
                    {formatCurrency(c.amount)}
                  </span>
                  <span className="text-xs text-[#9CA3AF] font-medium">
                    {c.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer breakdown link */}
        <div className="mt-6 border-t border-gray-100 pt-4 flex justify-end">
          <a
            href="#"
            className="inline-flex items-center text-xs font-semibold text-[#00B87C] hover:text-[#009966] transition-opacity duration-200 gap-1.5 cursor-pointer hover:opacity-80"
          >
            <span>View full breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default EarningsDashboard
