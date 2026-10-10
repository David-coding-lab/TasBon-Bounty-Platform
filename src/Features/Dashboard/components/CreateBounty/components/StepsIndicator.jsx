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

  const active = steps.find((s) => s.number === activeStep)
  const progress = (activeStep / steps.length) * 100

  return (
    <>
      {/* Mobile: compact stepper — avoids squeezing 3 labels into 360px */}
      <div className="px-5 pt-3 pb-2 sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#34A563] font-['Inter'] text-sm font-semibold text-white">
              {activeStep}
            </div>
            <div className="min-w-0">
              <p className="truncate font-['Inter'] text-[13px] font-semibold text-[#0b1a33]">
                {active?.label}
              </p>
              <p className="truncate font-['Inter'] text-[11px] font-normal text-[#6b7a8f]">
                Step {activeStep} of {steps.length} — {active?.subtitle}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {steps.map((step) => (
              <span
                key={step.number}
                className={`h-1.5 rounded-full transition-all ${
                  step.number < activeStep
                    ? 'w-4 bg-[#34A563]'
                    : step.number === activeStep
                      ? 'w-6 bg-[#34A563]'
                      : 'w-1.5 bg-[#dce1e8]'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-[#edf0f4]">
          <div
            className="h-full rounded-full bg-[#34A563] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Desktop / tablet: full 3-step indicator */}
      <div className="hidden items-center justify-between px-8 pt-5 pb-4 sm:flex">
        {steps.map((step, idx) => {
          const isActive = step.number === activeStep
          const isCompleted = step.number < activeStep
          return (
            <div
              key={step.number}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex shrink-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-['Inter'] text-base font-semibold ${
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
                    className={`font-['Inter'] text-sm font-semibold whitespace-nowrap ${
                      isActive || isCompleted
                        ? 'text-[#34A563]'
                        : 'text-[#0b1a33]'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="font-['Inter'] text-xs font-normal whitespace-nowrap text-[#6b7a8f]">
                    {step.subtitle}
                  </span>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 flex-1 ${
                    isCompleted ? 'bg-[#34A563]' : 'bg-[#dce1e8]'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
