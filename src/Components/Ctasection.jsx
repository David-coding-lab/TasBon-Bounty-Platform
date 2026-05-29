export default function CTASection() {
  return (
    <section className="py-20 bg-[#154E2C]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready to join the HUNT?
        </h2>
        <p className="text-white text-md mb-8">
          Join 50,000+ builders and community leaders <br /> who run on TASBUN.
        </p>
        <button className="bg-[#F6C430] hover:bg-orange-400 cursor-pointer text-black font-bold px-8 py-4 rounded-xl transition-colors text-base inline-flex items-center gap-2">
          Explore Hackathons
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
