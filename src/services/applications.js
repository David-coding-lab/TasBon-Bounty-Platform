import { apiGet } from './api'

export function getApplications(params = {}) {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)
  if (params.status) query.set('status', params.status)
  if (params.search) query.set('search', params.search)
  const qs = query.toString()
  return apiGet(`/api/v1/applications${qs ? `?${qs}` : ''}`)
}

export function getApplicationById(id) {
  return apiGet(`/api/v1/applications/${id}`)
}
