import { apiGet } from './api'

export function listHackathons(params = {}) {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)
  if (params.status) query.set('status', params.status)
  const qs = query.toString()
  return apiGet(`/api/v1/hackathons${qs ? `?${qs}` : ''}`)
}

export function getHackathonById(id) {
  return apiGet(`/api/v1/hackathons/${id}`)
}
