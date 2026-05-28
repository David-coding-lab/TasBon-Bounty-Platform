import BountyCard from '../Assets/reward.png'
import { GoCheckbox } from 'react-icons/go'

const features = [
  {
    title: 'Complete & Earn',
    desc: 'Find tasks, submit work, and earn rewards.',
  },
  {
    title: 'Join Challenges',
    desc: 'Participate in weekly contests to boost your skills and win prizes.',
  },
  {
    title: 'Track Progress',
    desc: 'Monitor your achievements and unlock new opportunities.',
  },
]

export default function SimplifySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Simplify your Bounty Experience
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Whether you're completing tasks for rewards or launching bounties
            for your project, TASBUN makes the experience simple, transparent,
            and rewarding.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Feature list */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Earn or Offer Bounties Effortlessly
            </h3>
            <div className="flex flex-col gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    <GoCheckbox />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {f.title}
                    </div>
                    <div className="text-gray-500 text-sm">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bounty Card Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={BountyCard}
              alt="Bounty Card"
              className="w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
