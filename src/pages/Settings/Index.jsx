import Navbar from '../../Components/NavBar'
import ComingSoon from '../../Components/Ui/comingSoon'

export default function SettingsPage() {
  return (
    <div>
      <Navbar />
      <ComingSoon
        title="Settings are coming soon!"
        description="We're building the account, preferences, and security settings area. Stay tuned for updates!"
        key="settings-coming-soon"
      />
    </div>
  )
}
