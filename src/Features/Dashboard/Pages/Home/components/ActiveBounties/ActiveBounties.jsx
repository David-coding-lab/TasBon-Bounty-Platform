import React from 'react'
import { ArrowRight } from 'lucide-react'

/* Active bounties table data */
const activeBountiesData = [
  {
    project: 'Build a DeFi Analytics Dashboard',
    protocol: 'Nexus Protocol',
    bounty: '$500 USDC',
    deadline: 'Jun 15, 2025',
  },
  {
    project: 'Smart Contract Audit Tool',
    protocol: 'LayerOne',
    bounty: '$1,200 USDC',
    deadline: 'Jun 22, 2025',
  },
  {
    project: 'Community Voting DApp',
    protocol: 'DAO Collective',
    bounty: '$300 USDC',
    deadline: 'Jun 30, 2025',
  },
  {
    project: 'Wallet Integration for dApp',
    protocol: 'Web3Labs',
    bounty: '$450 USDC',
    deadline: 'Jul 06, 2025',
  },
]

/* Active Bounties section — bounties the user is currently working on */
const ActiveBounties = () => {
  return (
    /* Main container: vertical stack with spacing */
    <div className="flex flex-col space-y-4">
      {/* Header row: titles on the left, "View all" on the right */}
      <div className="flex flex-row justify-between items-center">
        {/* Left side: heading and subheading */}
        <div className="flex flex-col">
          <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">
            Active Bounties
          </h2>
          <p className="font-[Inter] text-sm text-[#4A5565]">
            Bounties you are currently working on
          </p>
        </div>

        {/* Right side: View all link with arrow */}
        <div className="flex flex-row items-center gap-1 cursor-pointer">
          <span className="text-base text-[#009966]">View all</span>
          <ArrowRight className="w-4 h-4 text-[#009966]" />
        </div>
      </div>

      {/* Active bounties table */}
      <table className="w-full border border-[#E5E7EB]">
        {/* Table header */}
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">
              BOUNTY
            </th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">
              CLIENT
            </th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">
              REWARD
            </th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">
              DUE DATE
            </th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">
              ACTION
            </th>
          </tr>
        </thead>

        {/* Table body — mapped from data */}
        <tbody>
          {activeBountiesData.map((item, index) => (
            <tr key={index} className="border-b border-[#E5E7EB]">
              {/* Bounty name */}
              <td className="text-base text-[#0A0A0A] p-3">{item.project}</td>
              {/* Client name */}
              <td className="text-base text-[#4A5565] p-3">{item.protocol}</td>
              {/* Reward amount */}
              <td className="text-base text-[#0A0A0A] p-3">{item.bounty}</td>
              {/* Due date */}
              <td className="text-base text-[#4A5565] p-3">{item.deadline}</td>
              {/* Submit action button */}
              <td className="p-3">
                <button className="py-2 px-4 rounded-2xl bg-[#009966] text-[#FFFFFF] text-base cursor-pointer">
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ActiveBounties
