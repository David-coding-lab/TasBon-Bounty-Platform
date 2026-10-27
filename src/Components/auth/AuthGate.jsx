import { useSelector } from 'react-redux'
import { Navigate, Outlet, useSearchParams } from 'react-router-dom'

export default function AuthGate() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  if (loading) return null

  if (isAuthenticated) return <Navigate to={decodeURIComponent(redirectTo)} replace />

  return <Outlet />
}
