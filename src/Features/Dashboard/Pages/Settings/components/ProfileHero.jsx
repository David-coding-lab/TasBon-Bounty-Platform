import { useState } from 'react'
import { Icon } from '@iconify/react'
import AlexRivera from '../../../Assets/Image (Alex Rivera).svg'

const ProfileHero = () => {
  const [isEditing, setIsEditing] = useState(false)

  const stats = [
    { label: 'Bounties Completed', value: '24' },
    { label: 'Total Earned', value: '$18,450' },
    {
      label: 'Average Rating',
      value: (
        <span className="flex items-center gap-1">
          4.9 <Icon icon="lucide:star" className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
        </span>
      ),
    },
    { label: 'Success Rate', value: '97%' },
    { label: 'Reviews', value: '18' },
    { label: 'Repeat Clients', value: '13' },
  ]

  const techTags = [
    { name: 'Solidity', isPrimary: true },
    { name: 'Smart Contract', isPrimary: false },
    { name: 'React', isPrimary: false },
    { name: 'TypeScript', isPrimary: false },
    { name: 'Web3.js', isPrimary: false },
    { name: 'DeFi', isPrimary: false },
    { name: 'UI/UX', isPrimary: false },
    { name: '+3', isPrimary: false },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
      {/* Hero Banner */}
      <div className="h-36 sm:h-44 bg-gradient-to-r from-[#006045] to-[#007A55] relative" />

      {/* Main Profile Info Container */}
      <div className="px-6 sm:px-8 pb-6 relative">
        {/* Avatar & Header Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 sm:-mt-20 mb-6 gap-4">
          <div className="relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
              <img
                src={AlexRivera}
                alt="Alex Rivera"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-[#009966] text-white p-1 rounded-full border-2 border-white">
              <Icon icon="lucide:check" className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Icon icon="lucide:edit-3" className="w-4 h-4 text-gray-500" />
              <span>edit profile</span>
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
              <Icon icon="lucide:more-horizontal" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Alex Rivera
            </h1>
            <Icon
              icon="solar:verified-check-bold"
              className="w-6 h-6 text-blue-500"
            />
          </div>
          <p className="text-sm font-medium text-gray-500 mt-0.5">Builder</p>
        </div>

        {/* Metadata items */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mb-5">
          <div className="flex items-center gap-1.5">
            <Icon icon="lucide:map-pin" className="w-4 h-4 text-gray-400" />
            <span>Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon icon="lucide:link" className="w-4 h-4 text-gray-400" />
            <a href="#" className="hover:text-[#009966] transition-colors">
              alex.web3.dev
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon icon="lucide:calendar" className="w-4 h-4 text-gray-400" />
            <span>Joined Jan 2024</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 leading-relaxed max-w-4xl mb-6">
          Web3 builder focused on smart contract security and DeFi protocols.
          Passionate about building robust dApps and participating in hackathons to
          innovate task and bounty ecosystems. I bring 3+ years of experience in
          Solidity and React development.
        </p>

        {/* Social Links & Tech Stack Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2 pb-6 border-t border-gray-100">
          {/* Social Icons */}
          <div className="flex items-center space-x-2 pr-3">
            <a
              href="#"
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Icon icon="akar-icons:github-fill" className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Icon icon="ri:twitter-x-fill" className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Icon icon="ri:linkedin-fill" className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Icon icon="tb:world" className="w-4 h-4" />
            </a>
          </div>

          <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {techTags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                  tag.isPrimary
                    ? 'bg-[#ECFDF5] text-[#007A55] flex items-center gap-1.5'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag.isPrimary && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007A55]" />
                )}
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid Bar (6 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-gray-100 pt-6 gap-4 sm:gap-0">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                idx !== 0 ? 'sm:border-l sm:border-gray-100 sm:pl-6' : ''
              }`}
            >
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileHero
