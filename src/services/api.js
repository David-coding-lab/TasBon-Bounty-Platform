import { config } from '../../lib/config'
import Cookies from 'js-cookie'

function authHeaders() {
  const token = Cookies.get('session')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

async function doFetch(url, options = {}, customToken) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders(),
    ...options.headers,
  }
  if (customToken) headers.Authorization = `Bearer ${customToken}`

  return fetch(`${config.VITE_API_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  })
}

async function handleResponse(response, url, options) {
  if (response.status === 401 && !url.includes('/auth/refresh-token') && !url.includes('/auth/login')) {
    if (!isRefreshing) {
      isRefreshing = true

      try {
        const refreshResp = await fetch(
          `${config.VITE_API_URL}/api/v1/auth/refresh-token`,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          },
        )

        if (!refreshResp.ok) {
          const err = new Error('Session expired')
          processQueue(err)
          Cookies.remove('session')
          throw err
        }

        const refreshData = await refreshResp.json()
        const newToken = refreshData.data.accessToken

        Cookies.set('session', newToken, {
          expires: 1 / 96,
          secure: true,
          sameSite: 'Strict',
        })

        processQueue(null, newToken)
        const retryResp = await doFetch(url, options, newToken)
        return handleResponse(retryResp, url, options)
      } catch (err) {
        if (err.message === 'Session expired') throw err
        Cookies.remove('session')
        throw err
      } finally {
        isRefreshing = false
      }
    }

    const newToken = await new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
    const retryResp = await doFetch(url, options, newToken)
    return handleResponse(retryResp, url, options)
  }

  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Request failed')
  return data
}

async function request(url, options = {}) {
  const response = await doFetch(url, options)
  return handleResponse(response, url, options)
}

export function apiGet(path) {
  return request(path, { method: 'GET' })
}

export function apiPost(path, body) {
  return request(path, { method: 'POST', body: JSON.stringify(body) })
}

export function apiPut(path, body) {
  return request(path, { method: 'PUT', body: JSON.stringify(body) })
}

export function apiDelete(path) {
  return request(path, { method: 'DELETE' })
}

export async function uploadFile(file) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(`${config.VITE_API_URL}/api/v1/upload`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
    credentials: 'include',
    body: formData,
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Upload failed')
  return data
}
