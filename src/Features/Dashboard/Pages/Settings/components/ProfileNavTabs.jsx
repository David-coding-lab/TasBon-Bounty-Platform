import { useState } from 'react'
import { Icon } from '@iconify/react'

const ProfileNavTabs = ({ activeTab: initialTab = 'Overview', onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab)

  const tabs = [
    { name: 'Overview', icon: 'lucide:eye' },
    { name: 'Bounties', icon: 'lucide:target' },
    { name: 'Hackathons', icon: 'lucide:trophy' },
    { name: 'Grants', icon: 'lucide:coins' },
    { name: 'Activity', icon: 'lucide:clock' },
    { name: 'Reviews', icon: 'lucide:message-square' },
  ]

  const handleSelect = (name) => {
    setActiveTab(name)
    if (onTabChange) onTabChange(name)
  }

  return (
    <div className="border-b border-gray-200 bg-white px-2 rounded-2xl shadow-sm">
      <nav className="flex space-x-6 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name
          return (
            <button
              key={tab.name}
              onClick={() => handleSelect(tab.name)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'border-[#009966] text-[#009966]'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Icon
                icon={tab.icon}
                className={`w-4 h-4 ${
                  isActive ? 'text-[#009966]' : 'text-gray-400'
                }`}
              />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default ProfileNavTabs
