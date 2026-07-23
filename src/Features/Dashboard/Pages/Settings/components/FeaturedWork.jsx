import { Icon } from '@iconify/react'

const FeaturedWork = () => {
  const projects = [
    {
      title: 'DeFi Yield Optimizer',
      badge: 'DeFi',
      description: 'Autonomous protocol for optimizing yield farming on Solana.',
      isDarkHeader: true,
    },
    {
      title: 'DAO Governance Hub',
      badge: 'DAO',
      description: 'A dashboard for managing proposals and voting for DAOs.',
      isDarkHeader: false,
    },
    {
      title: 'NFT Marketplace UI',
      badge: 'NFT',
      description: 'Modern NFT marketplace UI built with React and Tailwind.',
      isDarkHeader: true,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Featured Work</h3>
        <a
          href="#"
          className="text-xs font-semibold text-[#009966] hover:underline flex items-center gap-1"
        >
          <span>View all projects</span>
          <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Card Header Illustration Box */}
            <div
              className={`h-36 p-4 flex flex-col justify-center items-center text-center ${
                project.isDarkHeader
                  ? 'bg-[#1E293B] text-white'
                  : 'bg-[#F8FAFC] text-gray-800 border-b border-gray-100'
              }`}
            >
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-1">
                PROJECT
              </span>
              <h4 className="text-base font-bold tracking-tight">
                {project.title}
              </h4>
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">
                  {project.title}
                </h4>
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 mb-3">
                  {project.badge}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedWork
