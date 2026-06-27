import { useState } from 'react'
import Hero from './components/Hero/Hero'
import Bounties from './components/Bounties/Bounties'
import ActiveBounties from './components/ActiveBounties/ActiveBounties'
import Aplication from './components/Aplication/Aplication'
import Oppurtunites from './components/Oppurtunites/Oppurtunites'
import CreateBountyModal from '../../components/CreateBounty/CreateBountyModal'

/* Home page — main dashboard landing page */
const Home = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    /* Page layout: full height, white background, vertical stack with spacing */
    <div className="flex flex-col space-y-6 h-full bg-[#FFFFFF] p-6 ">
      <CreateBountyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {/* Hero section */}
      <Hero />
      {/* Recommended bounties section */}
      <Bounties />
      {/* Active bounties section */}
      <ActiveBounties />
      {/* Applications section */}
      <Aplication />
      {/* Opportunities section */}
      <Oppurtunites />
    </div>
  )
}

export default Home
