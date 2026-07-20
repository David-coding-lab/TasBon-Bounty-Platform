import { apiGet, apiPut } from './api'

export function getProfile() {
  return apiGet('/api/v1/users/me/profile')
}

export function updateProfile(data) {
  return apiPut('/api/v1/users/me/profile', data)
}

export function getDashboardStats() {
  return apiGet('/api/v1/users/me/dashboard-stats')
}

export function getActivities() {
  return apiGet('/api/v1/users/me/activities')
}

export function getPublicProfile(userId) {
  return apiGet(`/api/v1/users/${userId}/public-profile`)
}
