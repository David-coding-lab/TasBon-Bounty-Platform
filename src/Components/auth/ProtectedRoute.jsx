import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  if (loading) return null

  if (!isAuthenticated) return <Navigate to="/signin" replace />

  return <Outlet />
}
