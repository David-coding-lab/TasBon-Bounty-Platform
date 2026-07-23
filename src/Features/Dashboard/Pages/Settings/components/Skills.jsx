const Skills = () => {
  const skillsList = [
    'Solidity',
    'Smart Contract',
    'React',
    'TypeScript',
    'Web3.js',
    'Next.js',
    'Ethers.js',
    'Hardhat',
    'Tailwind CSS',
    'IPFS',
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skillsList.map((skill, idx) => (
          <span
            key={idx}
            className="text-xs font-semibold px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 transition-colors shadow-2xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Skills
