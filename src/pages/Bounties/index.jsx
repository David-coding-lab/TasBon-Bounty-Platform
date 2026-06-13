import { useState } from 'react'
import Navbar from '../../Components/NavBar'
import CTASection from '../../Components/Ctasection'
import Footer from '../../Components/Footer'
import BountiesCard from '../../Components/Bounties/BountiesCard'
import Glow from './assets/glow.png'

import MobileAppImg from '../../Features/Dashboard/Pages/Home/assets/Image (Mobile App Redesign for Finance Platform).svg'
import ReactComponentImg from '../../Features/Dashboard/Pages/Home/assets/Image (Build React Component Library with TypeScript).svg'
import BrandIdentityImg from '../../Features/Dashboard/Pages/Home/assets/Image (Create Brand Identity for Tech Startup).svg'
import NexusProtocolIcon from '../../Features/Dashboard/Pages/Home/assets/Image (Nexus Protocol).svg'
import LayerOneIcon from '../../Features/Dashboard/Pages/Home/assets/Image (LayerOne).svg'
import DAOCollectiveIcon from '../../Features/Dashboard/Pages/Home/assets/Image (DAO Collective).svg'
import FAQ from '../community/components/FAQ'
import PartnersSection from '../../Components/PatnersSection'

const filters = ['All', 'Design', 'Development', 'Content', 'Others']

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

export default function Bounties() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="min-h-screen bg-[#Fff] font-sans antialiased">
      <Navbar />
      <main>
        <div className="relative container mx-auto w-full h-[60vh] overflow-hidden">
          <img
            src={Glow}
            alt=""
            className="absolute right-1/2 translate-x-250 top-75 -translate-y-1/2 w-[750px] pointer-events-none select-none"
          />
          <div className="flex flex-col items-start pl-40 pt-5">
            <h1 className="text-[80px] leading-none font-sora font-bold text-center mt-20 text-[#0E4E2F]">
              Bounties
            </h1>
            <p className="text-center text-gray-600 mt-4 text-2xl">
              Find challenges, build solutions and earn rewards.
            </p>
          </div>
          <div className="flex pl-40 mt-20 w-full">
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
                placeholder="Search..."
                className="w-full bg-white border-2 border-gray-200 rounded-full py-5 pl-16 pr-6 text-base text-black/50 placeholder:text-black/50 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center pl-40 mt-6 w-full max-w-[89vw] gap-3 flex-wrap">
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
            <button className="z-1 ml-auto flex items-center gap-2 px-5 py-2 rounded-2xl text-sm font-medium border border-black/30 bg-white text-black cursor-pointer hover:bg-gray-50 transition-colors">
              Sort by: Newest
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-10 px-4 sm:px-6 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {mockBounties.map((bounty, index) => (
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
          <div className="flex justify-center mt-10">
            <button className="px-8 py-3 rounded-xl text-sm font-medium border border-[#009966] text-[#009966] bg-white hover:bg-[#f0faf4] transition-colors cursor-pointer">
              Load More
            </button>
          </div>
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
