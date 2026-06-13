import React from 'react'
import { ArrowRight } from 'lucide-react'
import BountiesCard from '../../../../../../Components/Bounties/BountiesCard'

/* Header image imports */
import MobileAppImg from '../../assets/Image (Mobile App Redesign for Finance Platform).svg'
import ReactComponentImg from '../../assets/Image (Build React Component Library with TypeScript).svg'
import BrandIdentityImg from '../../assets/Image (Create Brand Identity for Tech Startup).svg'

/* Issuer icon imports */
import NexusProtocolIcon from '../../assets/Image (Nexus Protocol).svg'
import LayerOneIcon from '../../assets/Image (LayerOne).svg'
import DAOCollectiveIcon from '../../assets/Image (DAO Collective).svg'

/* Bounty card data for the home page */
const bountyData = [
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
]

/* Bounties section — recommended bounties for the user */
const Bounties = () => {
  return (
    /* Main container: vertical stack with spacing */
    <div className="flex flex-col space-y-4">
      {/* Header row: titles on the left, "View all" on the right */}
      <div className="flex flex-row justify-between items-center">
        {/* Left side: heading and subheading */}
        <div className="flex flex-col">
          <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">
            Recommended for you
          </h2>
          <p className="font-[Inter] text-sm text-[#4A5565]">
            Bounties that match your skills and interests
          </p>
        </div>

        {/* Right side: View all link with arrow */}
        <div className="flex flex-row items-center gap-1 cursor-pointer">
          <span className="text-base text-[#009966]">View all</span>
          <ArrowRight className="w-4 h-4 text-[#009966]" />
        </div>
      </div>

      {/* Bounty cards row — mapped from bountyData */}
      <div className="flex flex-row gap-4">
        {bountyData.map((bounty, index) => (
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
  )
}

export default Bounties
