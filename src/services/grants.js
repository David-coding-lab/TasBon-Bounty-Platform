import { apiGet } from './api'

export function listGrants(params = {}) {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)
  if (params.status) query.set('status', params.status)
  if (params.category) query.set('category', params.category)
  const qs = query.toString()
  return apiGet(`/api/v1/grants${qs ? `?${qs}` : ''}`)
}

export function getGrantById(id) {
  return apiGet(`/api/v1/grants/${id}`)
}
