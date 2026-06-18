import Navbar from '../../Components/NavBar'

export default function Blogs() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0FAF4] text-black font-sans">
        <h1 className="text-4xl font-bold mb-4">Blogs are coming soon!</h1>
        <p className="text-lg text-gray-700">
          We're working hard to bring you an amazing blog experience. Stay tuned
          for updates!
        </p>
      </div>
    </div>
  )
}
