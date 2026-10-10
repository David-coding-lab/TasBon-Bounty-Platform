export default function BountyHeader({ onClose }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#eef2f6] px-5 pt-4 pb-3 sm:px-8 sm:pt-6 sm:pb-3">
      <h2 className="truncate font-['Sora'] text-lg font-bold tracking-tight text-[#0b1a33] m-0 sm:text-[22px]">
        Create a new bounty
      </h2>
      <button
        className="flex shrink-0 items-center justify-center rounded-lg border-none bg-transparent p-2 text-[#6b7a8f] transition-colors duration-150 cursor-pointer hover:bg-[#f0f3f7] hover:text-[#1a2a41]"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>
    </div>
  )
}
