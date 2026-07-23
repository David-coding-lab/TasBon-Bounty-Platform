import { Icon } from '@iconify/react'

const SettingsSections = () => {
  const settingsList = [
    {
      title: 'Account & Security',
      description: 'Manage your account password and account security.',
      icon: 'lucide:home',
    },
    {
      title: 'Preference',
      description: 'Manage your account password and account security.',
      icon: 'lucide:home',
    },
    {
      title: 'Privacy & Security',
      description: 'Manage your account password and account security.',
      icon: 'lucide:home',
    },
    {
      title: 'Help & Support',
      description: 'Manage your account password and account security.',
      icon: 'lucide:home',
    },
    {
      title: 'Notifications',
      description: 'Manage your account password and account security.',
      icon: 'lucide:home',
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Settings</h2>

      <div className="bg-white border border-gray-200 rounded-3xl p-2 sm:p-4 shadow-sm divide-y divide-gray-100">
        {settingsList.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50/60 transition-colors rounded-2xl group"
          >
            {/* Left Icon & Text */}
            <div className="flex items-center space-x-4">
              <div className="p-2.5 rounded-xl text-[#009966] group-hover:scale-105 transition-transform">
                <Icon icon={item.icon} className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 group-hover:text-[#009966] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Right Manage Button */}
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0 ml-2">
              <span>Manage</span>
              <Icon icon="lucide:chevron-right" className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingsSections
