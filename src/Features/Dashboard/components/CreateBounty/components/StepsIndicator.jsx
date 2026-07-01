export default function StepsIndicator({ activeStep }) {
  const steps = [
    { number: 1, label: 'Bounty Details', subtitle: 'Tell us what you need' },
    {
      number: 2,
      label: 'Reward & logistics',
      subtitle: 'Set reward and timeline',
    },
    {
      number: 3,
      label: 'Review & Publish',
      subtitle: 'Review and publish bounty',
    },
  ]

  return (
    <div className="flex items-center justify-between px-8 pt-5 pb-4 max-sm:px-4 max-sm:pt-3 max-sm:pb-2">
      {steps.map((step, idx) => {
        const isActive = step.number === activeStep
        const isCompleted = step.number < activeStep
        return (
          <div
            key={step.number}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex items-center gap-3 shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-['Inter'] font-semibold text-base shrink-0 max-sm:w-8 max-sm:h-8 max-sm:text-sm ${
                  isActive || isCompleted
                    ? 'bg-[#34A563] text-white'
                    : 'bg-[#d9d9d9] text-white'
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-lg">
                    check
                  </span>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-['Inter'] text-sm font-semibold max-sm:text-xs ${
                    isActive || isCompleted
                      ? 'text-[#34A563]'
                      : 'text-[#0b1a33]'
                  }`}
                >
                  {step.label}
                </span>
                <span className="font-['Inter'] text-xs text-[#6b7a8f] font-normal max-sm:text-[10px]">
                  {step.subtitle}
                </span>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 max-sm:mx-2 ${
                  isCompleted ? 'bg-[#34A563]' : 'bg-[#dce1e8]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
