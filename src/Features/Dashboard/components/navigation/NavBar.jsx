import { Search, Bell, ChevronDown } from 'lucide-react'
import AlexRivera from '../../Assets/Image (Alex Rivera).svg'

/**
 * NavBar - Top navigation bar for the dashboard.
 * Contains a search input (flex-3) and a user profile section (flex-1).
 * Same white background as the sidebar.
 */
const NavBar = () => {
  return (
    <div className="bg-[#ffffff] p-4 flex flex-row justify-between items-center">
      {/* Search input section - takes up more space with flex-3 */}
      <div className="flex-3 relative">
        {/* Search icon positioned inside the input */}
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        {/* Search input with left padding for the icon */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-200 text-base text-[#364153] placeholder-gray-400 outline-none focus:border-[#009966]"
        />
      </div>

      {/* Profile and notification section - flex-1 aligned right */}
      <div className="flex-1 flex flex-row items-center justify-end space-x-4">
        {/* Bell notification icon */}
        <div className="cursor-pointer flex flex-col items-center pt-1">
          <Bell size={20} className="text-[#364153]" />
        </div>

        {/* Profile section - avatar, name, and dropdown */}
        <div className="flex flex-row items-center space-x-2 cursor-pointer">
          {/* Profile picture - rounded full to fit the avatar */}
          <img
            src={AlexRivera}
            alt="Alex Rivera"
            className="h-8 w-8 rounded-full object-cover"
          />
          {/* Profile name */}
          <span className="text-base text-[#0A0A0A]">Alex Rivera</span>
          {/* Dropdown arrow */}
          <ChevronDown size={16} className="text-[#0A0A0A]" />
        </div>
      </div>
    </div>
  )
}

export default NavBar
