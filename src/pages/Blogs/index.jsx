import Footer from '../../Components/Footer'
import Navbar from '../../Components/NavBar'

import TopSection from './components/TopSection'
import MiddleSection from './components/middlesection'
import NewsletterBanner from './components/NewsletterBanner'
export default function Blogs() {
  return (
    <div>
      <Navbar />

      <div className=" bg-white text-black"></div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFEFF] text-black font-sans">
        <TopSection />
        <MiddleSection />
        <NewsletterBanner />
      </div>
      <Footer />
    </div>
  )
}
