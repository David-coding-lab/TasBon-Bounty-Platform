const sections = [
  { key: 'mine', label: 'My Applications' },
  { key: 'managing', label: 'Manage Applicants' },
]

const SectionToggle = ({ activeSection, onChange }) => {
  return (
    <div className="inline-flex flex-row items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#F3F4F6] p-1 shadow-inner w-fit">
      {sections.map((section) => {
        const isActive = activeSection === section.key
        return (
          <button
            key={section.key}
            onClick={() => onChange(section.key)}
            className={`min-w-[144px] px-4 py-2 text-sm font-semibold rounded-full cursor-pointer transition-all duration-200 ${
              isActive
                ? 'bg-white text-[#0A0A0A] shadow-sm ring-1 ring-[#D1FAE5]'
                : 'text-[#4A5565] hover:text-[#0A0A0A] hover:bg-white/70'
            }`}
          >
            {section.label}
          </button>
        )
      })}
    </div>
  )
}

export default SectionToggle
