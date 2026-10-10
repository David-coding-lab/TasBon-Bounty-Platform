export default function BountyFooter({
  activeStep,
  onBack,
  onNext,
  onPublish,
  isPublishing,
}) {
  const isLastStep = activeStep === 3

  return (
    <div className="flex shrink-0 flex-col items-stretch gap-2.5 border-t border-[#eef2f6] px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-8 sm:pt-4 sm:pb-6">
      {activeStep > 1 && (
        <button
          className="order-1 flex w-full items-center justify-center gap-1.5 rounded-full border-none bg-transparent px-5 py-3 font-['Inter'] text-sm font-semibold text-[#1a2a41] transition-all duration-150 cursor-pointer hover:bg-[#f0f3f7] active:scale-[0.97] sm:order-none sm:w-auto sm:py-2.5"
          onClick={onBack}
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
      )}
      {!isLastStep ? (
        <button
          className="order-0 flex w-full items-center justify-center gap-1.5 rounded-full border-none bg-[#34A563] px-5 py-3 font-['Inter'] text-sm font-semibold text-white shadow-[0_4px_8px_rgba(52,165,99,0.2)] transition-all duration-150 cursor-pointer hover:bg-[#2b8a52] hover:shadow-[0_6px_12px_rgba(52,165,99,0.25)] active:scale-[0.97] sm:order-none sm:ml-auto sm:w-auto sm:py-2.5"
          onClick={onNext}
        >
          <span className="truncate">
            Next: {activeStep === 1 ? 'Reward & Logistics' : 'Review & Publish'}
          </span>
          <span className="material-symbols-outlined shrink-0">
            arrow_forward
          </span>
        </button>
      ) : (
        <button
          className="order-0 flex w-full items-center justify-center gap-1.5 rounded-full border-none bg-[#34A563] px-5 py-3 font-['Inter'] text-sm font-semibold text-white shadow-[0_4px_8px_rgba(52,165,99,0.2)] transition-all duration-150 cursor-pointer hover:bg-[#2b8a52] hover:shadow-[0_6px_12px_rgba(52,165,99,0.25)] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed sm:order-none sm:ml-auto sm:w-auto sm:py-2.5"
          onClick={onPublish}
          disabled={isPublishing}
        >
          {isPublishing ? 'Publishing...' : 'Publish Bounty'}
        </button>
      )}
    </div>
  )
}
