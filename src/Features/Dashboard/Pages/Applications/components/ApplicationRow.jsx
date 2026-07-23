// ApplicationRow.jsx
import { MoreVertical } from 'lucide-react'
import StatusBadge from './StatusBadge'

const ApplicationRow = ({ application, gridCols }) => {
  return (
    <div
      className={`grid ${gridCols} items-center gap-4 border-b border-[#E5E7EB] px-5 py-3.5 last:border-b-0 hover:bg-[#FAFAFA] transition-colors`}
    >
      <div className="flex min-w-0 flex-row items-center gap-3">
        <img
          src={application.thumbnail}
          alt={application.title}
          className="w-14 h-14 rounded-lg object-cover shrink-0"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-sm font-semibold text-[#0A0A0A] leading-snug">
            {application.title}
          </span>
          <div className="flex flex-row flex-wrap gap-1">
            {(application.tags || []).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#4A5565] bg-[#F3F4F6] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
          {application.issuerName?.charAt(0)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm text-[#0A0A0A] font-medium truncate">
            {application.issuerName}
          </span>
          {application.verified && (
            <span className="text-xs text-[#4A5565]">Verified ✓</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <StatusBadge status={application.status} />
      </div>

      <div className="text-sm text-[#4A5565]">{application.appliedOn}</div>

      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-[#4A5565]">{application.deadline}</span>
        <span
          className={`text-xs font-medium ${
            application.daysLeft === 'Completed'
              ? 'text-[#4A5565]'
              : 'text-[#E17100]'
          }`}
        >
          {application.daysLeft}
        </span>
      </div>

      <div className="flex flex-row items-center justify-end gap-3">
        <span className="text-sm font-bold text-[#009966] whitespace-nowrap">
          {application.reward}
        </span>
        <button className="text-sm text-[#0A0A0A] font-medium hover:text-[#009966] cursor-pointer whitespace-nowrap">
          View details
        </button>
        <button className="text-[#9CA3AF] hover:text-[#4A5565] cursor-pointer">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  )
}

export default ApplicationRow
