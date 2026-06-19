import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { TrendingUp, MoreHorizontal } from 'lucide-react'

/* Hero section — welcome greeting, subtitle, and stat cards */
const Hero = () => {
  return (
    /* Hero container: vertical stack with spacing */
    <div className="flex flex-col space-y-4">
      {/* Header: greeting and description */}
      <div className="flex flex-col space-y-2">
        {/* Welcome heading with waving hand icon */}
        <h1 className="font-[Inter] text-3xl font-semibold text-[#0A0A0A]">
          Welcome back, <span className="text-[#009966]">Alex</span>{' '}
        </h1>

        {/* Subtitle description */}
        <p className="text-base text-[#4A5565]">
          Discover opportunities, build solutions, and earn rewards
        </p>
      </div>

      {/* Stat cards row */}
      <div className="flex flex-row gap-4">
        {/* Card 1 — Total Earnings */}
        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          {/* Label and icon */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Total Earnings</span>
            <TrendingUp className="w-5 h-5 text-[#4A5565]" />
          </div>
          {/* Value */}
          <p className="text-[#0A0A0A] text-2xl font-bold">
            <TypeAnimation
              sequence={['$0.00', 1000, '$2,450.00', 1000]}
              speed={50}
              cursor={false}
              repeat={0}
            />
          </p>
          {/* Change indicator */}
          <p className="text-sm text-[#009966]">+9.5% this month</p>
        </div>

        {/* Card 2 — Active Bounties */}
        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          {/* Label and icon */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Active Bounties</span>
            <MoreHorizontal className="w-5 h-5 text-[#4A5565]" />
          </div>
          {/* Value */}
          <p className="text-[#0A0A0A] text-2xl font-bold">4</p>
          {/* Status */}
          <p className="text-sm text-[#4A5565]">In progress</p>
        </div>

        {/* Card 3 — Applications */}
        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          {/* Label (no icon) */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Applications</span>
          </div>
          {/* Value */}
          <p className="text-[#0A0A0A] text-2xl font-bold">12</p>
          {/* Update count */}
          <p className="text-sm text-[#E17100]">5 new updates</p>
        </div>

        {/* Card 4 — Success Rate */}
        <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col flex-1 space-y-2">
          {/* Label (no icon) */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-[#4A5565]">Success Rate</span>
          </div>
          {/* Value */}
          <p className="text-[#0A0A0A] text-2xl font-bold">
            <TypeAnimation
              sequence={['0%', 1500, '78%', 1500]}
              speed={50}
              repeat={0}
              cursor={false}
            />
          </p>
          {/* Change indicator */}
          <p className="text-sm text-[#009966]">+5% this month</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
