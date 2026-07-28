import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import Cookies from 'js-cookie'
import { Search, Bell, ChevronDown, LogOut, Menu } from 'lucide-react'
import { logout } from '../../../../store/slices/authSlice'
import { config } from '../../../../../lib/config'

const NavBar = ({ onMenuToggle }) => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { logout: privyLogout } = usePrivy()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setDropdownOpen(false)
    try {
      await fetch(`${config.VITE_API_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch {}
    Cookies.remove('session')
    try {
      await privyLogout()
    } catch {}
    dispatch(logout())
    navigate('/signin')
  }

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className="bg-[#ffffff] px-3 sm:px-4 py-3 sm:py-4 flex flex-row justify-between items-center gap-2">
      <button
        onClick={onMenuToggle}
        className="xl:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <Menu size={22} className="text-[#364153]" />
      </button>

      <div className="hidden sm:block flex-1 relative max-w-md">
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

      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Toggle search"
      >
        <Search size={20} className="text-[#364153]" />
      </button>

      {searchOpen && (
        <div className="absolute left-0 right-0 top-full bg-white border-b border-gray-200 p-3 z-40 sm:hidden shadow-lg">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-base text-[#364153] placeholder-gray-400 outline-none focus:border-[#009966]"
            />
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-end space-x-2 sm:space-x-4 shrink-0">
        <div className="cursor-pointer flex flex-col items-center pt-1">
          <Bell size={20} className="text-[#364153]" />
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex flex-row items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-[#009966] flex items-center justify-center text-white text-sm font-semibold">
              {initials}
            </div>
            <span className="text-base text-[#0A0A0A]">{user?.fullName || 'User'}</span>
            <ChevronDown size={16} className="text-[#0A0A0A]" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.fullName || 'User'}
                </p>
                {user?.email && (
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                )}
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
