import { apiGet, apiPost } from './api'

export function listBounties(params = {}) {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)
  if (params.status) query.set('status', params.status)
  if (params.category) query.set('category', params.category)
  if (params.search) query.set('search', params.search)
  const qs = query.toString()
  return apiGet(`/api/v1/bounties${qs ? `?${qs}` : ''}`)
}

export function getMyBounties() {
  return apiGet('/api/v1/bounties/mine')
}

export function applyForBounty(bountyId, data) {
  return apiPost(`/api/v1/bounties/${bountyId}/apply`, data)
}

export function submitBountyWork(bountyId, data) {
  return apiPost(`/api/v1/bounties/${bountyId}/submit`, data)
}

export function getSimilarBounties(bountyId) {
  return apiGet(`/api/v1/bounties/${bountyId}/similar`)
}
