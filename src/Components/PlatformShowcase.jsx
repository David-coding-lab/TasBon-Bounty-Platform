import Dashboard from '../Assets/dashboard.png'

export default function PlatformShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
            The complete Platform for builders
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            The modern bounty platform built for builders and rewards
          </h2>
          <p className="text-gray-500 text-base">
            Launch, discover, and complete high-value bounties on a platform
            built to connect ambitious builders with real rewards.
          </p>
        </div>

        {/* Dashboard Image */}
        <div className="rounded-2xl border border-gray-200 shadow-xl overflow-hidden bg-white">
          <img
            src={Dashboard}
            alt="TASBUN Dashboard"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
