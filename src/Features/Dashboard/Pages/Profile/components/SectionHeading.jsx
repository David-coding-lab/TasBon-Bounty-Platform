export default function SectionHeading({ title, description, action }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-[#111827]">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs leading-5 text-[#6B7280]">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
