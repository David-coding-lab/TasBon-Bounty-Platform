const TopSkills = () => {
  const topSkillsData = [
    { name: 'Solidity', percentage: 95 },
    { name: 'React', percentage: 81 },
    { name: 'React', percentage: 80 },
    { name: 'Web3.js', percentage: 86 },
    { name: 'DeFi', percentage: 85 },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-gray-900">Top Skills</h3>
      <div className="space-y-4">
        {topSkillsData.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-900">{item.name}</span>
              <span className="text-gray-400">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#006045] h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopSkills
