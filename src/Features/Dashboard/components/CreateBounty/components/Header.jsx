export default function BountyHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-8 pt-6 pb-3 border-b border-[#eef2f6] max-sm:px-5 max-sm:pt-4 max-sm:pb-2">
      <h2 className="font-['Sora'] font-bold text-[22px] text-[#0b1a33] tracking-tight m-0 max-sm:text-lg">
        Create a new bounty
      </h2>
      <button
        className="bg-transparent border-none cursor-pointer text-[#6b7a8f] p-1.5 rounded-lg flex items-center justify-center transition-colors duration-150 hover:bg-[#f0f3f7] hover:text-[#1a2a41]"
        onClick={onClose}
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>
    </div>
  )
}
