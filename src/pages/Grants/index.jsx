import Navbar from '../../Components/NavBar'
import ComingSoon from '../../Components/Ui/comingSoon'

export default function Grants() {
  return (
    <div>
      <Navbar />
      <ComingSoon
        description={
          'Grants are currently unavailable. Please check back later.'
        }
        title={'Grants are coming soon!'}
        key={'grants-coming-soon'}
      />
    </div>
  )
}
