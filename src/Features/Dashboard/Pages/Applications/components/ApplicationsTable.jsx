// ApplicationsTable.jsx
import ApplicationRow from './ApplicationRow'

const columns = [
  'Bounty',
  'Creator',
  'Status',
  'Applied On',
  'Deadline',
  'Reward',
]

// Same fix here: header and rows must share one grid template,
// and the trailing column needs a fixed width instead of `auto`.
const GRID_COLS = 'grid-cols-[2fr_1fr_1fr_1fr_1fr_200px]'

const ApplicationsTable = ({ applications, loading }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div
        className={`grid ${GRID_COLS} items-center gap-4 border-b border-[#E5E7EB] bg-[#F8FAFC] px-5 py-2`}
      >
        {columns.map((col) => (
          <span
            key={col}
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] leading-none text-[#6B7280] ${
              col === 'Reward' ? 'text-right' : 'text-left'
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
              {Array(6)
                .fill(null)
                .map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-gray-100 rounded animate-pulse"
                  />
                ))}
            </div>
          ))
      ) : applications.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400">
          No applications found
        </div>
      ) : (
        applications.map((application) => (
          <ApplicationRow
            key={application.id}
            application={application}
            gridCols={GRID_COLS}
          />
        ))
      )}
    </div>
  )
}

export default ApplicationsTable
