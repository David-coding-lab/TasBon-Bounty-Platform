export default function SectionHeading({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-sora text-sm font-bold text-slate-800">{title}</h2>
      {action}
    </div>
  )
}
