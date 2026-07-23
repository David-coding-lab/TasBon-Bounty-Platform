import Navbar from '../../Components/NavBar'
import ComingSoon from '../../Components/Ui/comingSoon'

export default function BookmarkPage() {
  return (
    <div>
      <Navbar />
      <ComingSoon
        title="Bookmarks are coming soon!"
        description="We're building a place to save and revisit your favorite opportunities. Stay tuned for updates!"
        key="bookmark-coming-soon"
      />
    </div>
  )
}
