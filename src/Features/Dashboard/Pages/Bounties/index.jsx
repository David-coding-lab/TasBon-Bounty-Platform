import React from 'react'
import NftBanner from '../../components/Information/NftBanner'
import { useState } from 'react'

import MobileAppImg from '../../../../Pages/Bounties/assets/mobile-app.svg'
import ReactComponentImg from '../../../../Pages/Bounties/assets/react-component.svg'
import BrandIdentityImg from '../../../../Pages/Bounties/assets/brand-identity.svg'
import NexusProtocolIcon from '../../../../Pages/Bounties/assets/nexus-protocol.svg'
import LayerOneIcon from '../../../../Pages/Bounties/assets/layer-one.svg'
import DAOCollectiveIcon from '../../../../Pages/Bounties/assets/dao-collective.svg'
import BountiesCard from '../../../../Components/Bounties/BountiesCard'

const DashBounties = () => {
  const filters = ['All', 'Design', 'Development', 'Content', 'Others']
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const mockBounties = [
    {
      headerImg: MobileAppImg,
      categoryName: 'Smart Contract',
      title: 'Audit DeFi Protocol Smart Contracts',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$1,200 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: ReactComponentImg,
      categoryName: 'Frontend',
      title: 'Build Analytics Dashboard for DAO',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$750 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: BrandIdentityImg,
      categoryName: 'Web3',
      title: 'Integrate Wallet Connect for Web App',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$600 USDC',
      level: 'Beginner',
    },
    {
      headerImg: MobileAppImg,
      categoryName: 'Design',
      title: 'Redesign NFT Marketplace Landing Page',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$900 USDC',
      level: 'Advanced',
    },
    {
      headerImg: ReactComponentImg,
      categoryName: 'Development',
      title: 'Build Token Staking Interface',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$1,500 USDC',
      level: 'Advanced',
    },
    {
      headerImg: BrandIdentityImg,
      categoryName: 'Content',
      title: 'Write Technical Documentation for SDK',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$400 USDC',
      level: 'Beginner',
    },
    {
      headerImg: MobileAppImg,
      categoryName: 'Smart Contract',
      title: 'Develop Multi-Sig Wallet Contract',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$2,000 USDC',
      level: 'Advanced',
    },
    {
      headerImg: ReactComponentImg,
      categoryName: 'Frontend',
      title: 'Create Interactive Data Visualization',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$850 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: BrandIdentityImg,
      categoryName: 'Design',
      title: 'Design Mobile App UI for DeFi Wallet',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$1,100 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: MobileAppImg,
      categoryName: 'Web3',
      title: 'Build Cross-Chain Bridge Interface',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$1,800 USDC',
      level: 'Advanced',
    },
    {
      headerImg: ReactComponentImg,
      categoryName: 'Content',
      title: 'Create Video Tutorials for Protocol',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$500 USDC',
      level: 'Beginner',
    },
    {
      headerImg: BrandIdentityImg,
      categoryName: 'Development',
      title: 'Implement Governance Voting System',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$1,400 USDC',
      level: 'Advanced',
    },
    {
      headerImg: MobileAppImg,
      categoryName: 'Frontend',
      title: 'Build Portfolio Tracker Dashboard',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$950 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: ReactComponentImg,
      categoryName: 'Smart Contract',
      title: 'Create ERC-721 Minting Contract',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$1,300 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: BrandIdentityImg,
      categoryName: 'Design',
      title: 'Design Email Templates for Platform',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$350 USDC',
      level: 'Beginner',
    },
    {
      headerImg: MobileAppImg,
      categoryName: 'Web3',
      title: 'Integrate IPFS Storage for dApp',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$700 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: ReactComponentImg,
      categoryName: 'Development',
      title: 'Build Real-Time Notification Service',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$1,000 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: BrandIdentityImg,
      categoryName: 'Content',
      title: 'Write Whitepaper for New Protocol',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$800 USDC',
      level: 'Advanced',
    },
    {
      headerImg: MobileAppImg,
      categoryName: 'Frontend',
      title: 'Create Responsive Admin Panel',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$1,100 USDC',
      level: 'Intermediate',
    },
    {
      headerImg: ReactComponentImg,
      categoryName: 'Smart Contract',
      title: 'Develop Yield Farming Contract',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$2,500 USDC',
      level: 'Advanced',
    },
  ]

  const fliterBounties = mockBounties.filter((bounty) => {
    const matchesCategory =
      activeFilter === 'All' || bounty.categoryName === activeFilter
    const matchesSearch =
      !searchQuery ||
      bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.issuerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col space-y-8 w-full">
      <NftBanner />
      <div className="flex flex-col space-y-4  ">
        <div className="relative w-full max-w-7xl">
          <svg
            className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5L21 21" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search bounties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-gray-200 rounded-full py-5 pl-16 pr-6 text-base text-black placeholder:text-black/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-4 overflow-x-auto py-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-2xl text-sm font-medium border transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#34A563] border-[#009966] text-white'
                  : 'bg-white border-gray-400 text-black/80 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mb-10 px-4 sm:px-6 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {fliterBounties.map((bounty, index) => (
              <BountiesCard
                key={index}
                headerImg={bounty.headerImg}
                categoryName={bounty.categoryName}
                title={bounty.title}
                issuerIcon={bounty.issuerIcon}
                issuerName={bounty.issuerName}
                price={bounty.price}
                level={bounty.level}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBounties
