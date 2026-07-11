import { apiGet, apiPost, apiDelete } from './api'

export function getBookmarks(page = 1, limit = 20) {
  return apiGet(`/api/v1/bookmarks?page=${page}&limit=${limit}`)
}

export function createBookmark(data) {
  return apiPost('/api/v1/bookmarks', data)
}

export function deleteBookmark(id) {
  return apiDelete(`/api/v1/bookmarks/${id}`)
}
