// ApplicantsTable.jsx
import ApplicantRow from './ApplicantRow'

const columns = ['Applicant', 'Bounty', 'Status', 'Applied On', 'Actions']

// Single source of truth for column widths — shared by header + every row
// so grid columns can never drift apart between rows.
const GRID_COLS = 'grid-cols-[2fr_1.5fr_1fr_1fr_220px]'

const ApplicantsTable = ({ applicants, loading, onSelect, onRemove }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div
        className={`grid ${GRID_COLS} items-center gap-4 border-b border-[#E5E7EB] bg-[#F8FAFC] px-5 py-2`}
      >
        {columns.map((col, i) => (
          <span
            key={col || i}
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] leading-none text-[#6B7280] ${
              col === 'Actions' ? 'text-right' : 'text-left'
            }`}
          >
            {col}
          </span>
        ))}
      </div>

      {loading ? (
        Array(5)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className={`grid ${GRID_COLS} items-center gap-4 border-b border-[#E5E7EB] px-5 py-3.5`}
            >
              {Array(5)
                .fill(null)
                .map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-gray-100 rounded animate-pulse"
                  />
                ))}
            </div>
          ))
      ) : applicants.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400">
          No one has applied to your bounties yet
        </div>
      ) : (
        applicants.map((applicant) => (
          <ApplicantRow
            key={applicant.id}
            applicant={applicant}
            onSelect={onSelect}
            onRemove={onRemove}
            gridCols={GRID_COLS}
          />
        ))
      )}
    </div>
  )
}

export default ApplicantsTable
