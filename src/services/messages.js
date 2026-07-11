import { apiGet, apiPost, apiPut } from './api'

export function getMessages(page = 1, limit = 20) {
  return apiGet(`/api/v1/messages?page=${page}&limit=${limit}`)
}

export function sendMessage(data) {
  return apiPost('/api/v1/messages', data)
}

export function getConversation(otherUserId) {
  return apiGet(`/api/v1/messages/conversation/${otherUserId}`)
}

export function markMessageAsRead(id) {
  return apiPut(`/api/v1/messages/${id}/read`, {})
}
