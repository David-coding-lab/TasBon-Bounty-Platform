import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './components/navigation/SideBar'
import NavBar from './components/navigation/NavBar'
import RightBar from './components/Information/RightBar'
import CreateBountyModal from './components/CreateBounty/CreateBountyModal'

const Layout = () => {
  const location = useLocation()
  const hideSidebar = location.pathname === '/dashboard/bounties'

  return (
    <div className="flex h-screen overflow-hidden">
      <CreateBountyModal />

      <aside className="w-62.5 shrink-0">
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <nav className="shrink-0 border-b border-gray-200">
          <NavBar />
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <Outlet />
          </main>

          {hideSidebar && (
            <aside className="w-70 shrink-0 bg-white border-l border-gray-200 overflow-y-auto p-4">
              <RightBar />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

export default Layout
