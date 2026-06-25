import { config } from '../../../../lib/config'
import Cookies from 'js-cookie'

function authHeaders() {
  const token = Cookies.get('session')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function fetchRecommendedBounties() {
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/bounties/recommended`,
    { headers: authHeaders(), credentials: 'include' },
  )

  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to fetch bounties')
  return data
}

export async function fetchActiveBounties() {
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/bounties/active`,
    { headers: authHeaders(), credentials: 'include' },
  )

  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to fetch bounties')
  return data
}

export async function fetchBountyById(id) {
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/bounties/${id}`,
    { headers: authHeaders(), credentials: 'include' },
  )

  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to fetch bounty')
  return data
}
