import React from 'react'
import NftBanner from '../../components/Information/NftBanner'
import { useState } from 'react'

import MobileAppImg from '../../../../pages/Bounties/assets/mobile-app.svg'
import ReactComponentImg from '../../../../pages/Bounties/assets/react-component.svg'
import BrandIdentityImg from '../../../../pages/Bounties/assets/brand-identity.svg'
import NexusProtocolIcon from '../../../../pages/Bounties/assets/nexus-protocol.svg'
import LayerOneIcon from '../../../../pages/Bounties/assets/layer-one.svg'
import DAOCollectiveIcon from '../../../../pages/Bounties/assets/dao-collective.svg'
import BountiesCard from '../../../../Components/Bounties/BountiesCard'

const DashBounties = () => {
  const filters = ['All', 'Design', 'Development', 'Content', 'Others']
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const mockBounties = [
    {
      id: 1,
      headerImg: MobileAppImg,
      categoryName: 'Smart Contract',
      title: 'Audit DeFi Protocol Smart Contracts',
      description: 'Comprehensive security audit of DeFi smart contracts to identify vulnerabilities and ensure protocol safety.',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$1,200 USDC',
      level: 'Intermediate',
    },
    {
      id: 2,
      headerImg: ReactComponentImg,
      categoryName: 'Frontend',
      title: 'Build Analytics Dashboard for DAO',
      description: 'Create a real-time analytics dashboard with charts and metrics for DAO treasury management.',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$750 USDC',
      level: 'Intermediate',
    },
    {
      id: 3,
      headerImg: BrandIdentityImg,
      categoryName: 'Web3',
      title: 'Integrate Wallet Connect for Web App',
      description: 'Implement Wallet Connect integration to enable seamless dApp connectivity with multiple wallets.',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$600 USDC',
      level: 'Beginner',
    },
    {
      id: 4,
      headerImg: MobileAppImg,
      categoryName: 'Design',
      title: 'Redesign NFT Marketplace Landing Page',
      description: 'Redesign the landing page to improve user engagement and showcase NFT collections effectively.',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$900 USDC',
      level: 'Advanced',
    },
    {
      id: 5,
      headerImg: ReactComponentImg,
      categoryName: 'Development',
      title: 'Build Token Staking Interface',
      description: 'Develop a token staking interface with APY tracking, unstaking, and reward distribution features.',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$1,500 USDC',
      level: 'Advanced',
    },
    {
      id: 6,
      headerImg: BrandIdentityImg,
      categoryName: 'Content',
      title: 'Write Technical Documentation for SDK',
      description: 'Create comprehensive technical documentation including API references and integration guides.',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$400 USDC',
      level: 'Beginner',
    },
    {
      id: 7,
      headerImg: MobileAppImg,
      categoryName: 'Smart Contract',
      title: 'Develop Multi-Sig Wallet Contract',
      description: 'Build a secure multi-signature wallet contract with customizable approval thresholds.',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$2,000 USDC',
      level: 'Advanced',
    },
    {
      id: 8,
      headerImg: ReactComponentImg,
      categoryName: 'Frontend',
      title: 'Create Interactive Data Visualization',
      description: 'Build interactive charts and graphs for on-chain data analysis with filtering capabilities.',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$850 USDC',
      level: 'Intermediate',
    },
    {
      id: 9,
      headerImg: BrandIdentityImg,
      categoryName: 'Design',
      title: 'Design Mobile App UI for DeFi Wallet',
      description: 'Design a clean and intuitive mobile interface for a DeFi wallet with transaction tracking.',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$1,100 USDC',
      level: 'Intermediate',
    },
    {
      id: 10,
      headerImg: MobileAppImg,
      categoryName: 'Web3',
      title: 'Build Cross-Chain Bridge Interface',
      description: 'Develop a cross-chain bridge UI supporting multiple networks with real-time status updates.',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$1,800 USDC',
      level: 'Advanced',
    },
    {
      id: 11,
      headerImg: ReactComponentImg,
      categoryName: 'Content',
      title: 'Create Video Tutorials for Protocol',
      description: 'Produce step-by-step video tutorials explaining protocol features and integration workflows.',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$500 USDC',
      level: 'Beginner',
    },
    {
      id: 12,
      headerImg: BrandIdentityImg,
      categoryName: 'Development',
      title: 'Implement Governance Voting System',
      description: 'Build an on-chain governance voting system with proposal creation and delegation features.',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$1,400 USDC',
      level: 'Advanced',
    },
    {
      id: 13,
      headerImg: MobileAppImg,
      categoryName: 'Frontend',
      title: 'Build Portfolio Tracker Dashboard',
      description: 'Create a portfolio tracker that aggregates and displays token balances across multiple chains.',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$950 USDC',
      level: 'Intermediate',
    },
    {
      id: 14,
      headerImg: ReactComponentImg,
      categoryName: 'Smart Contract',
      title: 'Create ERC-721 Minting Contract',
      description: 'Develop an ERC-721 NFT minting contract with metadata storage and mint limits.',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$1,300 USDC',
      level: 'Intermediate',
    },
    {
      id: 15,
      headerImg: BrandIdentityImg,
      categoryName: 'Design',
      title: 'Design Email Templates for Platform',
      description: 'Design responsive email templates for notifications, alerts, and platform communications.',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$350 USDC',
      level: 'Beginner',
    },
    {
      id: 16,
      headerImg: MobileAppImg,
      categoryName: 'Web3',
      title: 'Integrate IPFS Storage for dApp',
      description: 'Integrate IPFS for decentralized file storage with upload and retrieval functionality.',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$700 USDC',
      level: 'Intermediate',
    },
    {
      id: 17,
      headerImg: ReactComponentImg,
      categoryName: 'Development',
      title: 'Build Real-Time Notification Service',
      description: 'Develop a real-time notification system for on-chain events using WebSockets.',
      issuerIcon: LayerOneIcon,
      issuerName: 'LayerOne',
      price: '$1,000 USDC',
      level: 'Intermediate',
    },
    {
      id: 18,
      headerImg: BrandIdentityImg,
      categoryName: 'Content',
      title: 'Write Whitepaper for New Protocol',
      description: 'Write a comprehensive whitepaper covering protocol architecture, tokenomics, and roadmap.',
      issuerIcon: DAOCollectiveIcon,
      issuerName: 'DAO Collective',
      price: '$800 USDC',
      level: 'Advanced',
    },
    {
      id: 19,
      headerImg: MobileAppImg,
      categoryName: 'Frontend',
      title: 'Create Responsive Admin Panel',
      description: 'Build a responsive admin dashboard with user management, analytics, and configuration tools.',
      issuerIcon: NexusProtocolIcon,
      issuerName: 'Nexus Protocol',
      price: '$1,100 USDC',
      level: 'Intermediate',
    },
    {
      id: 20,
      headerImg: ReactComponentImg,
      categoryName: 'Smart Contract',
      title: 'Develop Yield Farming Contract',
      description: 'Build a yield farming contract with multiple pools, reward distribution, and compounding logic.',
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
                bountyId={bounty.id || index}
                headerImg={bounty.headerImg}
                categoryName={bounty.categoryName}
                title={bounty.title}
                description={bounty.description}
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
