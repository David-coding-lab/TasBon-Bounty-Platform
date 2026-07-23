const FilterTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex flex-row items-center gap-1 overflow-x-auto rounded-full bg-[#F8FAFC] p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.label
        return (
          <button
            key={tab.label}
            onClick={() => onChange(tab.label)}
            className={`flex flex-row items-center gap-1.5 px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-full transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white text-[#0A0A0A] shadow-sm ring-1 ring-[#D1FAE5]'
                : 'text-[#4A5565] hover:text-[#0A0A0A] hover:bg-white/80'
            }`}
          >
            {tab.label === 'All' && isActive ? (
              <span className="bg-[#009966] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                All {tab.count}
              </span>
            ) : (
              <>
                {tab.label}
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#D0FAE5] text-[#007A55]'
                      : 'bg-[#F3F4F6] text-[#4A5565]'
                  }`}
                >
                  {tab.count}
                </span>
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default FilterTabs
