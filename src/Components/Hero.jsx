import Illustration from '../Assets/Illustration.png'

export default function Hero() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Earn by Building
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Join the Hunt Built
              <br />
              for <span className="text-emerald-500">Modern Creators</span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg max-w-md mb-8 mx-auto md:mx-0">
              Discover missions, complete bounties, and earn rewards with a
              thriving hunter community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                Join the Hunt
              </button>
              <button className="border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                See Hackathons
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <img
              src={Illustration}
              alt="Hero Illustration"
              className="w-full max-w-md md:max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
