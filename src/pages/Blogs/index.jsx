import Footer from '../../Components/Footer'
import Navbar from '../../Components/NavBar'

import TopSection from './components/TopSection'
import MiddleSection from './components/MiddleSection'

export default function Blogs() {
  return (
    <div>
      <Navbar />

      <div className=" bg-white text-black"></div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFEFF] text-black font-sans">
        <TopSection />
        <MiddleSection />
      </div>
      <Footer />
    </div>
  )
}
