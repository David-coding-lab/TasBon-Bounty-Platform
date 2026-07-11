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

export async function createBounty(bountyData) {
  const response = await fetch(`${config.VITE_API_URL}/api/v1/bounties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    credentials: 'include',
    body: JSON.stringify(bountyData),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to create bounty')
  return data
}

export async function fetchBountyById(id) {
  const response = await fetch(`${config.VITE_API_URL}/api/v1/bounties/${id}`, {
    headers: authHeaders(),
    credentials: 'include',
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to fetch bounty')
  return data
}

export async function listBounties(params = {}) {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)
  if (params.status) query.set('status', params.status)
  if (params.category) query.set('category', params.category)
  if (params.search) query.set('search', params.search)
  const qs = query.toString()
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/bounties${qs ? `?${qs}` : ''}`,
    { headers: authHeaders(), credentials: 'include' },
  )
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to fetch bounties')
  return data
}

export async function getMyBounties() {
  const response = await fetch(`${config.VITE_API_URL}/api/v1/bounties/mine`, {
    headers: authHeaders(),
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to fetch my bounties')
  return data
}

export async function applyForBounty(bountyId, applicationData) {
  const response = await fetch(`${config.VITE_API_URL}/api/v1/bounties/${bountyId}/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    credentials: 'include',
    body: JSON.stringify(applicationData),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to apply')
  return data
}

export async function submitBountyWork(bountyId, submissionData) {
  const response = await fetch(`${config.VITE_API_URL}/api/v1/bounties/${bountyId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    credentials: 'include',
    body: JSON.stringify(submissionData),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to submit')
  return data
}

export async function getSimilarBounties(bountyId) {
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/bounties/${bountyId}/similar`,
    { headers: authHeaders(), credentials: 'include' },
  )
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Failed to fetch similar bounties')
  return data
}
