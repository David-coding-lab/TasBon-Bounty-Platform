import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Alexicon from './Assets/alex-icon.png'
import Bellicon from './Assets/bell-icon.png'
import Bluebountyicon from './Assets/bluebounty-icon.png'
import Bluesearchicon from './Assets/bluesearch-icon.png'
import Bookmarkicon from './Assets/bookmark-icon.png'
import Bountiesicon from './Assets/bounties-icon.png'
import Chainguardicon from './Assets/chainguard-icon.png'
import Daoicon from './Assets/dao-icon.png'
import Dollaricon from './Assets/dollar-icon.png'
import Earningsicon from './Assets/earnings-icon.png'
import Gifticon from './Assets/gift-icon.png'
import Granticon from './Assets/grant-icon.png'
import Greengifticon from './Assets/greengift-icon.png'
import Messageicon from './Assets/message-icon.png'
import nexusicon from './Assets/nexus-icon.png'
import Searchicon from './Assets/search-icon.png'
import Layericon from './Assets/layer-icon.png'
import Settingsicon from './Assets/settings-icon.png'
import Smsicon from './Assets/sms-icon.png'
import Tasbunicon from './Assets/tasbun-icon.png'
import Web3icon from './Assets/web3-icon.png'

// Your imported PNG icons only
// import AlexIcon from './Assets/alex-icon.png'
// import BellIcon from './Assets/bell-icon.png'
// import BluebountyIcon from './Assets/bluebounty-icon.png'
// import BookmarkIcon from './Assets/bookmark-icon.png'
// import BountiesIcon from './Assets/bounties-icon.png'
// import DollarIcon from './Assets/dollar-icon.png'
// import GiftIcon from './Assets/gift-icon.png'
// import LayerIcon from './Assets/layer-icon.png'
// import MessageIcon from './Assets/message-icon.png'
// import SearchIcon from './Assets/search-icon.png'
// import SettingsIcon from './Assets/settings-icon.png'
// import TasbunIcon from './Assets/tasbun-icon.png'
// import Web3Icon from './Assets/web3-icon.png'

export default function Dashboard() {
  const location = useLocation()

  const stats = [
    {
      label: 'Total Earnings',
      value: '$2,450.00',
      change: '+12%',
      changeText: 'vs last month',
      color: 'text-green-600',
    },
    {
      label: 'Active Bounties',
      value: '4',
      change: '+2',
      changeText: 'new this week',
      color: 'text-blue-600',
    },
    {
      label: 'Success Rate',
      value: '87%',
      change: '+5%',
      changeText: 'improvement',
      color: 'text-green-600',
    },
    {
      label: 'Total Submissions',
      value: '28',
      change: '+8',
      changeText: 'this month',
      color: 'text-purple-600',
    },
  ]

  const bounties = [
    {
      name: 'Build a DeFi Analytics Dashboard',
      client: 'Nexus Protocol',
      reward: '$500 USDC',
      deadline: 'Jun 15, 2025',
    },
    {
      name: 'Smart Contract Audit Tool',
      client: 'ChainGuard',
      reward: '$1,200 USDC',
      deadline: 'Jun 20, 2025',
    },
    {
      name: 'Community Moderation Bot',
      client: 'TASBUN DAO',
      reward: '$300 USDC',
      deadline: 'Jun 18, 2025',
    },
    {
      name: 'NFT Marketplace UI',
      client: 'ArtChain',
      reward: '$800 USDC',
      deadline: 'Jun 25, 2025',
    },
  ]

  const applications = [
    {
      opportunity: 'TASBUN July Hackathon',
      type: 'Hackathon',
      organizer: 'TASBUN',
      status: 'Under Review',
      date: 'May 20, 2025',
    },
    {
      opportunity: 'Web3 Social Grant',
      type: 'Grant',
      organizer: 'Web3 Foundation',
      status: 'Shortlisted',
      date: 'May 18, 2025',
    },
    {
      opportunity: 'Build with LayerOne',
      type: 'Bounty',
      organizer: 'LayerOne',
      status: 'In Progress',
      date: 'May 15, 2025',
    },
    {
      opportunity: 'DeFi Innovation Grant',
      type: 'Grant',
      organizer: 'Nexus Protocol',
      status: 'Not Selected',
      date: 'May 10, 2025',
    },
    {
      opportunity: 'Smart Contract Security',
      type: 'Bounty',
      organizer: 'ChainGuard',
      status: 'In Progress',
      date: 'May 08, 2025',
    },
  ]

  const getStatusColor = (status) => {
    if (status === 'Under Review') return 'bg-yellow-100 text-yellow-700'
    if (status === 'Shortlisted') return 'bg-green-100 text-green-700'
    if (status === 'In Progress') return 'bg-blue-100 text-blue-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here’s what’s happening with your bounties.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className={`text-xs ${stat.color}`}>
              {stat.change} {stat.changeText}
            </p>
          </div>
        ))}
      </div>

      {/* Active Bounties */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Bounties</h2>
          <Link
            to="/coming-soon"
            className="text-green-600 text-sm font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">BOUNTY</th>
              <th className="pb-3">CLIENT</th>
              <th className="pb-3">REWARD</th>
              <th className="pb-3">DEADLINE</th>
              <th className="pb-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {bounties.map((bounty, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 font-medium">{bounty.name}</td>
                <td className="py-3 text-gray-600">{bounty.client}</td>
                <td className="py-3 font-medium text-green-600">
                  {bounty.reward}
                </td>
                <td className="py-3 text-gray-600">{bounty.deadline}</td>
                <td className="py-3">
                  {/* CHANGED TO LINK */}
                  <Link
                    to="/coming-soon"
                    className="bg-emerald-600 text-white px-4 py-1 rounded-lg text-xs hover:bg-emerald-700 inline-block"
                  >
                    Submit Work
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* APPLICATIONS SECTION */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-1">Applications</h2>
        <p className="text-sm text-gray-500 mb-4">
          Track your applications for bounties, grants and hackathons.
        </p>

        {/* Tabs - NOW USING LINK */}
        <div className="flex gap-4 border-b mb-4">
          <Link
            to="/coming-soon"
            className="pb-2 border-b-2 border-green-600 text-green-600 font-medium"
          >
            All (12)
          </Link>
          <Link
            to="/coming-soon"
            className="pb-2 text-gray-500 hover:text-gray-700"
          >
            Bounties (9)
          </Link>
          <Link
            to="/coming-soon"
            className="pb-2 text-gray-500 hover:text-gray-700"
          >
            Hackathons (4)
          </Link>
          <Link
            to="/coming-soon"
            className="pb-2 text-gray-500 hover:text-gray-700"
          >
            Grants (2)
          </Link>
        </div>

        {/* Applications Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">OPPORTUNITY</th>
              <th className="pb-3">TYPE</th>
              <th className="pb-3">ORGANIZER</th>
              <th className="pb-3">STATUS</th>
              <th className="pb-3">APPLIED ON</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 font-medium">{app.opportunity}</td>
                <td className="py-3 text-gray-600">{app.type}</td>
                <td className="py-3 text-gray-600">{app.organizer}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-3 text-gray-500">{app.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EXPLORE OPPORTUNITIES SECTION */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-1">Explore opportunities</h2>
        <p className="text-sm text-gray-500 mb-4">
          More ways to build, learn and earn.
        </p>

        <div className="grid grid-cols-3 gap-4">
          <Link
            to="/coming-soon"
            className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-semibold mb-1">Join a Hackathon</h3>
            <p className="text-xs text-gray-500 mb-3">
              Build, compete and win exciting prizes.
            </p>
            <span className="text-green-600 text-sm font-medium">
              Explore hackathons →
            </span>
          </Link>

          <Link
            to="/coming-soon"
            className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-semibold mb-1">Apply for Grants</h3>
            <p className="text-xs text-gray-500 mb-3">
              Get funding to build your ideas and projects.
            </p>
            <span className="text-green-600 text-sm font-medium">
              Explore grants →
            </span>
          </Link>

          <Link
            to="/coming-soon"
            className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="font-semibold mb-1">Browse All Bounties</h3>
            <p className="text-xs text-gray-500 mb-3">
              Find more bounties that match your skills.
            </p>
            <span className="text-green-600 text-sm font-medium">
              Browse bounties →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
