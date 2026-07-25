import { useSelector } from 'react-redux'
import { Search, Bell, ChevronDown } from 'lucide-react'

const NavBar = () => {
  const user = useSelector((state) => state.auth.user)

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className="bg-[#ffffff] p-4 flex flex-row justify-between items-center">
      <div className="flex-3 relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-200 text-base text-[#364153] placeholder-gray-400 outline-none focus:border-[#009966]"
        />
      </div>

      <div className="flex-1 flex flex-row items-center justify-end space-x-4">
        <div className="cursor-pointer flex flex-col items-center pt-1">
          <Bell size={20} className="text-[#364153]" />
        </div>

        <div className="flex flex-row items-center space-x-2 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-[#009966] flex items-center justify-center text-white text-sm font-semibold">
            {initials}
          </div>
          <span className="text-base text-[#0A0A0A]">{user?.fullName || 'User'}</span>
          <ChevronDown size={16} className="text-[#0A0A0A]" />
        </div>
      </div>
    </div>
  )
}

export default NavBar
