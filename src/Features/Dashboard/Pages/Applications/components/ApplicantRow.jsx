// ApplicantRow.jsx
import StatusBadge from './StatusBadge'

const ApplicantRow = ({ applicant, onSelect, onRemove, gridCols }) => {
  const isPending = applicant.status === 'Pending Review'
  const isSelected = applicant.status === 'Selected'

  return (
    <div
      className={`grid ${gridCols} items-center gap-4 border-b border-[#E5E7EB] px-5 py-3.5 last:border-b-0 hover:bg-[#FAFAFA] transition-colors`}
    >
      <div className="flex flex-row gap-3 items-center min-w-0">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 overflow-hidden">
          {applicant.avatar ? (
            <img
              src={applicant.avatar}
              alt={applicant.applicantName}
              className="w-full h-full object-cover"
            />
          ) : (
            applicant.applicantName?.charAt(0)
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-[#0A0A0A] truncate">
            {applicant.applicantName}
          </span>
          <span className="text-xs text-[#4A5565] truncate">
            {applicant.applicantHeadline}
          </span>
        </div>
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-sm text-[#0A0A0A] font-medium truncate">
          {applicant.bountyTitle}
        </span>
        <span className="text-xs text-[#4A5565]">{applicant.reward}</span>
      </div>

      <div className="flex flex-col gap-1">
        <StatusBadge status={applicant.status} />
      </div>

      <div className="text-sm text-[#4A5565]">{applicant.appliedOn}</div>

      <div className="flex flex-row items-center justify-end gap-2.5">
        <button className="text-sm text-[#0A0A0A] font-medium hover:text-[#009966] cursor-pointer whitespace-nowrap">
          View profile
        </button>

        {isPending && (
          <>
            <button
              onClick={() => onSelect(applicant)}
              className="text-sm text-white bg-[#009966] hover:bg-[#007A55] px-3 py-1.5 rounded-lg font-medium cursor-pointer whitespace-nowrap"
            >
              Select
            </button>
            <button
              onClick={() => onRemove(applicant)}
              className="text-sm text-[#C10007] hover:bg-[#FFE2E2] px-3 py-1.5 rounded-lg font-medium cursor-pointer whitespace-nowrap"
            >
              Remove
            </button>
          </>
        )}

        {isSelected && (
          <button
            onClick={() => onRemove(applicant)}
            className="text-sm text-[#C10007] hover:bg-[#FFE2E2] px-3 py-1.5 rounded-lg font-medium cursor-pointer whitespace-nowrap"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default ApplicantRow
