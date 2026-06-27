export default function StepsIndicator({ activeStep }) {
  const steps = [
    { number: 1, label: 'Bounty Details' },
    { number: 2, label: 'Reward & logistics' },
    { number: 3, label: 'Review & Publish' },
  ]

  return (
    <div className="flex items-start justify-between px-8 pt-5 pb-4 gap-2 flex-wrap max-sm:px-4 max-sm:pt-3 max-sm:pb-2">
      {steps.map((step, idx) => {
        const isActive = step.number === activeStep
        const isCompleted = step.number < activeStep
        return (
          <div
            key={step.number}
            className="flex flex-col items-center flex-1 min-w-[60px]"
          >
            <div className="flex items-center w-full relative">
              {idx > 0 && (
                <div
                  className={`flex-1 h-0.5 transition-colors duration-300 ${
                    isCompleted ? 'bg-[#34A563]' : 'bg-[#dce1e8]'
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-['Inter'] font-semibold text-sm shrink-0 border-2 transition-all duration-300 max-sm:w-7 max-sm:h-7 max-sm:text-xs ${
                  isActive || isCompleted
                    ? 'bg-[#34A563] text-white border-[#34A563]'
                    : 'bg-[#f0f3f7] text-[#6b7a8f] border-transparent'
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-lg">
                    check_small
                  </span>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 transition-colors duration-300 ${
                    isCompleted ? 'bg-[#34A563]' : 'bg-[#dce1e8]'
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-2 font-['Inter'] text-xs text-center whitespace-nowrap transition-colors duration-300 max-sm:text-[10px] ${
                isActive
                  ? 'text-[#0b1a33] font-semibold'
                  : 'text-[#6b7a8f] font-medium'
              }`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
