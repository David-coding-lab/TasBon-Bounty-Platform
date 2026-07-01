export default function BountyFooter({ activeStep, onBack, onNext, onPublish, isPublishing }) {
  const isLastStep = activeStep === 3

  return (
    <div className="flex justify-between items-center px-8 pt-4 pb-6 border-t border-[#eef2f6] gap-3 flex-wrap max-sm:px-5 max-sm:pt-3 max-sm:pb-4 max-sm:flex-col max-sm:items-stretch">
      {activeStep > 1 && (
        <button
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-['Inter'] font-semibold text-sm border-none cursor-pointer transition-all duration-150 bg-transparent text-[#1a2a41] hover:bg-[#f0f3f7] active:scale-[0.97] max-sm:justify-center max-sm:w-full max-sm:order-1"
          onClick={onBack}
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
      )}
      {!isLastStep ? (
        <button
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-['Inter'] font-semibold text-sm border-none cursor-pointer transition-all duration-150 bg-[#34A563] text-white shadow-[0_4px_8px_rgba(52,165,99,0.2)] ml-auto hover:bg-[#2b8a52] hover:shadow-[0_6px_12px_rgba(52,165,99,0.25)] active:scale-[0.97] max-sm:justify-center max-sm:w-full max-sm:ml-0 max-sm:order-0"
          onClick={onNext}
        >
          Next: {activeStep === 1 ? 'Reward & Logistics' : 'Review & Publish'}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      ) : (
        <button
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-['Inter'] font-semibold text-sm border-none cursor-pointer transition-all duration-150 bg-[#34A563] text-white shadow-[0_4px_8px_rgba(52,165,99,0.2)] ml-auto hover:bg-[#2b8a52] hover:shadow-[0_6px_12px_rgba(52,165,99,0.25)] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed max-sm:justify-center max-sm:w-full max-sm:ml-0 max-sm:order-0"
          onClick={onPublish}
          disabled={isPublishing}
        >
          {isPublishing ? 'Publishing...' : 'Publish Bounty'}
        </button>
      )}
    </div>
  )
}
