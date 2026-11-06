export default function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 2xl:grid-cols-6">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.label}
            className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-[#6B7280] sm:text-sm">
                {stat.label}
              </p>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 truncate text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
              {stat.value}
            </p>
            <div className="mt-1 min-h-4 text-xs text-[#6B7280]">
              {stat.subtext}
            </div>
          </div>
        )
      })}
    </div>
  )
}
