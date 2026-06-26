import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Target,
  FileText,
  Trophy,
  DollarSign,
  Wallet,
  MessageSquare,
  Bookmark,
  Settings,
  Gift,
  ArrowRight,
} from 'lucide-react'
import Logo from '../../Assets/logo.png'

/**
 * Navigation items for the sidebar.
 * Each entry defines an icon component, label text, and route path.
 */
const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Target, label: 'Bounties', path: '/dashboard/bounties' },
  { icon: FileText, label: 'Application', path: '/application' },
  { icon: Trophy, label: 'Hackathons', path: '/hackathons' },
  { icon: DollarSign, label: 'Grant', path: '/grant' },
  { icon: Wallet, label: 'Earnings', path: '/earnings' },
]

/**
 * Secondary navigation items for the sidebar.
 * Same design as primary nav — icon + link, #364153 color.
 * Messages item includes a notification badge.
 */
const secondaryNavItems = [
  { icon: MessageSquare, label: 'Messages', path: '/messages', badge: 3 },
  { icon: Bookmark, label: 'Bookmark', path: '/bookmark' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

/**
 * NavItem - Reusable sidebar nav link with hover and active states.
 * On hover/active: bg turns #ECFDF5, icon and text turn #007A55.
 * Optionally shows a notification badge.
 */
const NavItem = ({ icon: Icon, label, path, badge, isActive }) => {
  return (
    <Link
      to={path}
      className={`group rounded-md px-3 py-2 flex flex-row items-center space-x-3 cursor-pointer transition-colors
        ${isActive ? 'bg-[#ECFDF5]' : 'hover:bg-[#ECFDF5]'}`}
    >
      {/* Nav icon - changes to #007A55 on hover/active */}
      <Icon
        size={20}
        className={`transition-colors
          ${isActive ? 'text-[#007A55]' : 'text-[#364153] group-hover:text-[#007A55]'}`}
      />
      {/* Nav link label - changes to #007A55 on hover/active */}
      <span
        className={`text-base transition-colors flex-1
          ${isActive ? 'text-[#007A55]' : 'text-[#364153] group-hover:text-[#007A55]'}`}
      >
        {label}
      </span>
      {/* Notification badge - small green pill with count */}
      {badge != null && (
        <span className="bg-[#009966] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  )
}

const SideBar = () => {
  /* Read current route to highlight the active nav item */
  const { pathname } = useLocation()

  return (
    <div className="h-full bg-[#ffffff] flex flex-col">
      {/* Header - Logo and brand name with bottom border and shadow */}

      <Link
        to="/"
        className="flex items-center gap-2 px-3 py-4 border-b border-gray-200"
      >
        <img
          src={Logo}
          alt="TASBUN Logo"
          className="h-10 w-auto object-contain"
        />
        <span className="font-inter font-bold text-[#009966] text-xl">
          TASBUN
        </span>
      </Link>

      {/* Primary navigation links section - bordered */}
      <div className="w-full px-3 flex flex-col space-y-1 border-b border-gray-200">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            isActive={
              pathname === item.path ||
              (item.path !== '/dashboard' &&
                pathname.startsWith(item.path + '/'))
            }
          />
        ))}
      </div>

      {/* Secondary navigation links section - same hover/active design */}
      <div className="w-full px-3 flex flex-col space-y-1">
        {secondaryNavItems.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            isActive={
              pathname === item.path ||
              (item.path !== '/dashboard' &&
                pathname.startsWith(item.path + '/'))
            }
          />
        ))}
      </div>

      {/* Host a Bounty promo card */}
      <div className="px-3  mt-8 mb-6">
        <div className="bg-[#006045] rounded-2xl flex flex-col space-y-2 p-4">
          {/* Gift icon container */}
          <div className="p-4 rounded-md bg-[#007A55] w-fit">
            <Gift size={20} className="text-white" />
          </div>
          {/* Card text */}
          <div className="flex flex-col space-y-1">
            <span className="text-white font-black text-base">
              Host a bounty
            </span>
            <span className="text-[#D0FAE5] text-[14px]">
              Get high-quality solutions from skilled builders.
            </span>
          </div>
          {/* CTA button */}
          <button className="bg-[#FFFFFF] text-[#006045] text-base px-3 py-1 rounded-md flex flex-row items-center space-x-2 w-fit cursor-pointer">
            <span>Get Started</span>
            <ArrowRight size={16} className="text-[#006045]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar
