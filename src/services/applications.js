import { apiGet, apiPut } from './api'

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

export function updateApplicationStatus(applicationId, status) {
  return apiPut(`/api/v1/applications/${applicationId}/status`, { status })
}

export function getReceivedApplications(params = {}) {
  const query = new URLSearchParams()
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)
  const qs = query.toString()
  return apiGet(`/api/v1/applications/received${qs ? `?${qs}` : ''}`)
}
