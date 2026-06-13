import { Outlet } from 'react-router-dom'
import SideBar from './components/navigation/SideBar'
import NavBar from './components/navigation/NavBar'

/**
 * Dashboard Layout - Main layout wrapper for all dashboard pages.
 *
 * Structure:
 * ┌──────────┬────────────────────────────────┐
 * │          │           Navbar               │
 * │  Left    ├─────────────────────┬──────────┤
 * │ Sidebar  │                     │  Right   │
 * │ (full    │      Outlet         │ Sidebar  │
 * │ height)  │   (page content)    │          │
 * │          │                     │          │
 * └──────────┴─────────────────────┴──────────┘
 */
const Layout = () => {
  return (
    // Outer container - full screen height, horizontal flex layout
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - spans full height from top to bottom */}
      <aside className="w-62.5 shrink-0">
        <SideBar />
      </aside>

      {/* Right section - contains navbar on top, then content + right sidebar below */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar - stretches from left sidebar edge to the right end of the screen */}
        <nav className="shrink-0 border-b border-gray-200">
          <NavBar />
        </nav>

        {/* Content area - holds the main outlet and right sidebar side by side */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main content - renders the matched nested route via Outlet */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <Outlet />
          </main>

          {/* Right Sidebar - sits under the navbar, on the right side */}
          <aside className="w-70 shrink-0 bg-white border-l border-gray-200 flex items-center justify-center overflow-y-auto">
            Right Sidebar
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Layout
