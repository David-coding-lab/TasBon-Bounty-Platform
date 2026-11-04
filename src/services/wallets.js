import { apiGet, apiPost, apiDelete } from './api'

export function getUserWallets() {
  return apiGet('/api/v1/wallets')
}

export function generateWallet(data) {
  return apiPost('/api/v1/wallets/generate', data)
}

export function deactivateWallet(id) {
  return apiDelete(`/api/v1/wallets/${id}`)
}

export function sendCoins(data) {
  return apiPost('/api/v1/wallets/send', data)
}
