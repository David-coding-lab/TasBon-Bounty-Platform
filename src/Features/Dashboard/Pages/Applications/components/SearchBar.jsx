import { Search } from 'lucide-react'

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative shrink-0 w-full sm:w-72 xl:ml-4 xl:w-80">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-[#E5E7EB] bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-sm text-[#364153] placeholder-gray-400 outline-none transition-colors focus:border-[#009966] focus:bg-white"
      />
    </div>
  )
}

export default SearchBar
