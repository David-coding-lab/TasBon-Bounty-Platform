import React from 'react'
import { Trophy, Gift, Search } from 'lucide-react'
import PromoCard from './PromoCard'

/* Opportunity card data */
const opportunityCards = [
  {
    id: 1,
    title: 'Join a Hackathon',
    description: 'Build, compete and win exciting prizes.',
    icon: Trophy,
    linkText: 'Explore hackathons',
    linkUrl: '/hackathons',
    color: 'text-[#009966]',
  },
  {
    id: 2,
    title: 'Apply for Grants',
    description: 'Get funding to build your ideas and projects.',
    icon: Gift,
    linkText: 'Explore grants',
    linkUrl: '/grants',
    color: 'text-[#E17100]',
  },
  {
    id: 3,
    title: 'Browse All Bounties',
    description: 'Find more bounties that match your skills.',
    icon: Search,
    linkText: 'Browse bounties',
    linkUrl: '/dashboard/bounties',
    color: 'text-[#155DFC]',
  },
]

/* Opportunities section — explore more ways to build, learn and earn */
const Oppurtunites = () => {
  return (
    /* Main container: vertical stack with spacing */
    <div className="flex flex-col space-y-4 pb-24">
      {/* Header: heading and subheading only (no "View all") */}
      <div className="flex flex-col">
        <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">
          Explore opportunities
        </h2>
        <p className="font-[Inter] text-sm text-[#4A5565]">
          More ways to build, learn and earn.
        </p>
      </div>

      {/* Opportunity cards row */}
      <div className="flex flex-row w-full gap-4">
        {opportunityCards.map((card) => (
          <PromoCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            linkText={card.linkText}
            linkUrl={card.linkUrl}
            color={card.color}
          />
        ))}
      </div>
    </div>
  )
}

export default Oppurtunites
