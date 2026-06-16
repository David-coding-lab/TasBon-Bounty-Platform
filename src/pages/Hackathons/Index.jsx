import Navbar from '../../Components/NavBar'
import ComingSoon from '../../Components/Ui/comingSoon'

export default function Hackathons() {
  return (
    <div>
      <Navbar />
      <ComingSoon
        title="Hackathons are coming soon!"
        description="We're working hard to bring you an amazing hackathon experience. Stay tuned for updates!"
      />
    </div>
  )
}
