import React from 'react'
import {
  ArrowRight,
  DollarSign,
  FileText,
  Target,
  MessageCircle,
} from 'lucide-react'
import profileImage from '../../Assets/Profile (Alex Rivera).svg'
import NexusProtocolIcon from '../../Assets/Image (Nexus Protocol).svg'
import LayerOneIcon from '../../Assets/Image (LayerOne).svg'
import DAOCollectiveIcon from '../../Assets/Image (DAO Collective).svg'
import Web3LabsIcon from '../../Assets/Image (Web3Labs).svg'
import ChainGuardIcon from '../../Assets/Image (ChainGuard).svg'

/* Top bounty creators data */
const topProtocols = [
  {
    rank: 1,
    name: 'Nexus Protocol',
    bounties: 24,
    paid: '$535k+',
    icon: NexusProtocolIcon,
  },
  {
    rank: 2,
    name: 'LayerOne',
    bounties: 18,
    paid: '$90k+',
    icon: LayerOneIcon,
  },
  {
    rank: 3,
    name: 'DAO Collective',
    bounties: 15,
    paid: '$60k+',
    icon: DAOCollectiveIcon,
  },
  {
    rank: 4,
    name: 'Web3Labs',
    bounties: 12,
    paid: '$385k+',
    icon: Web3LabsIcon,
  },
  {
    rank: 5,
    name: 'ChainGuard',
    bounties: 10,
    paid: '$30k+',
    icon: ChainGuardIcon,
  },
]

/* Recent activity notifications data */
const notifications = [
  {
    id: 1,
    icon: DollarSign,
    color: 'text-[#009966]',
    message: 'You earned $180 USDC from completing a bounty',
    time: '3h ago',
  },
  {
    id: 2,
    icon: FileText,
    color: 'text-[#E17100]',
    message: 'Your application for Web3 Social Grant was shortlisted',
    time: '2d ago',
  },
  {
    id: 3,
    icon: Target,
    color: 'text-[#155DFC]',
    message: 'New bounty match for your skills',
    time: '2d ago',
  },
  {
    id: 4,
    icon: MessageCircle,
    color: 'text-[#9810FA]',
    message: 'Alex from LayerOne replied to your submission',
    time: '3d ago',
  },
]

/* Information — right sidebar content with three sections */
const Information = () => {
  return (
    /* Main container: vertical stack with spacing */
    <div className="flex flex-col space-y-6">
      {/* First child — Profile card */}
      <div className="w-full rounded-2xl bg-[#006045] flex flex-col space-y-4 p-4">
        {/* Profile info: avatar, name and role */}
        <div className="flex flex-row space-x-3 items-center">
          {/* Profile image */}
          <div className="w-10 h-10 rounded-full bg-[#007A55]">
            <img src={profileImage} alt="Profile" />
          </div>
          {/* Name and role */}
          <div className="flex flex-col hover:cursor-pointer hover:underline hover:text-[#009966]">
            <span className="text-lg text-[#FFFFFF]">Alex Rivera</span>
            <span className="text-sm text-[#A4F4CF]">Builder</span>
          </div>
        </div>

        {/* Level progress section */}
        <div className="flex flex-col space-y-2">
          {/* Level label and XP count */}
          <div className="flex flex-row justify-between">
            <span className="text-sm text-[#FFFFFF]">Level 5 Builder</span>
            <span className="text-sm text-[#FFFFFF]">L250 / 2,500 XP</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[#007A55]">
            <div
              className="h-full rounded-full bg-[#FFFFFF]"
              style={{ width: '10%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Second child — Top bounty creators */}
      <div className="flex flex-col border border-[#E5E7EB] rounded-2xl space-y-3 p-3">
        {/* Header row */}
        <div className="flex flex-row justify-between items-center">
          <span className="text-base text-[#0A0A0A] font-semibold">
            Top bounty creators
          </span>
          <div className="flex flex-row items-center gap-1 cursor-pointer">
            <span className="text-sm text-[#009966]">View all</span>
            <ArrowRight size={14} className="text-[#009966]" />
          </div>
        </div>

        {/* Protocol list */}
        <ul className="flex flex-col space-y-3">
          {topProtocols.map((protocol) => (
            <li
              key={protocol.rank}
              className="flex flex-row space-x-2 items-center"
            >
              {/* Rank number */}
              <span className="text-sm text-[#4A5565] w-4">
                {protocol.rank}.
              </span>
              <img
                src={protocol.icon}
                alt={protocol.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-base text-[#0A0A0A] hover:cursor-pointer hover:underline hover:text-[#009966]">
                  {protocol.name}
                </span>
                <span className="text-xs text-[#4A5565]">
                  {protocol.bounties} bounties · {protocol.paid} paid
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Third child — Recent Activity */}
      <div className="flex flex-col border border-[#E5E7EB] rounded-2xl space-y-3 p-3">
        {/* Heading */}
        <span className="text-lg text-[#0A0A0A] font-semibold">
          Recent Activity
        </span>

        {/* Notification list */}
        <ul className="flex flex-col space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <li
                key={notification.id}
                className="flex flex-row gap-2 justify-between items-start "
              >
                {/* Icon and message */}
                <div className="flex flex-row gap-2 items-start">
                  <Icon
                    size={18}
                    className={`${notification.color} shrink-0 mt-0.5`}
                  />
                  <span className="text-sm text-[#0A0A0A] hover:cursor-pointer hover:underline hover:text-[#009966]">
                    {notification.message}
                  </span>
                </div>
                {/* Time */}
                <span className="text-xs text-[#4A5565] shrink-0">
                  {notification.time}
                </span>
              </li>
            )
          })}
        </ul>

        {/* View all link — centered */}
        <div className="flex flex-row items-center justify-center gap-1 cursor-pointer">
          <span className="text-sm text-[#009966]">View all</span>
          <ArrowRight size={14} className="text-[#009966]" />
        </div>
      </div>
    </div>
  )
}

export default Information
