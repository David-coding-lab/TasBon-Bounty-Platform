import Navbar from '../../Components/NavBar'
import ComingSoon from '../../Components/Ui/comingSoon'

export default function MessagesPage() {
  return (
    <div>
      <Navbar />
      <ComingSoon
        title="Messages are coming soon!"
        description="We're building a messaging system to help you connect with bounty sponsors and collaborators. Stay tuned for updates!"
        key="messages-coming-soon"
      />
    </div>
  )
}
