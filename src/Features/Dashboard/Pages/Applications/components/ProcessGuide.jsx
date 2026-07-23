import { ArrowRight } from 'lucide-react'

const processSteps = [
  {
    icon: '📋',
    step: '1. Apply for bounty',
    desc: 'Submit your application with your profile & portfolio',
  },
  {
    icon: '✔',
    step: '2. Get selected',
    desc: 'Bounty creator reviews and selects builders',
  },
  {
    icon: '📅',
    step: '3. Start working',
    desc: "Once selected, you'll get access to the bounty",
  },
  {
    icon: '📄',
    step: '4. Submit & earn',
    desc: 'Submit your work for review and get paid',
  },
]

const ProcessGuide = () => {
  return (
    <div className="border border-[#E5E7EB] rounded-lg p-5">
      <div className="flex flex-row items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-[#D0FAE5] flex items-center justify-center text-lg">
          📋
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-sm font-semibold text-[#0A0A0A]">
            How the process works
          </h3>
          <div className="flex flex-row gap-2 items-start flex-wrap">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col gap-1 flex-1 min-w-[120px]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#6B7280]">{step.icon}</span>
                  <span className="text-xs font-semibold text-[#0A0A0A]">
                    {step.step}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button className="text-sm text-[#009966] font-medium flex items-center gap-1 hover:underline cursor-pointer shrink-0">
          Learn more <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

export default ProcessGuide
