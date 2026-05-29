const stats = [
  { value: '₦50M+', label: 'Rewards Distributed' },
  { value: '120+', label: 'Active Bounties' },
  { value: '50+', label: 'Active Hackathons' },
  { value: '50+', label: 'Countries' },
]
export default function StatsBar() {
  return (
    <section className="bg-white  py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-sora md:text-3xl font-extrabold text-primary">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
