import { apiGet, apiPost, apiDelete } from './api'

export function getEarningsMetrics() {
  return apiGet('/api/v1/earnings/metrics')
}

export function getEarningsOverview(timeframe) {
  const params = timeframe ? `?timeframe=${timeframe}` : ''
  return apiGet(`/api/v1/earnings/overview${params}`)
}

export function getEarningsByCategory() {
  return apiGet('/api/v1/earnings/by-category')
}

export function getTransactions(page = 1, limit = 10) {
  return apiGet(`/api/v1/earnings/transactions?page=${page}&limit=${limit}`)
}

export function withdrawFunds(data) {
  return apiPost('/api/v1/earnings/withdraw', data)
}

export function getPayoutMethods() {
  return apiGet('/api/v1/earnings/payout-methods')
}

export function createPayoutMethod(data) {
  return apiPost('/api/v1/earnings/payout-methods', data)
}

export function deletePayoutMethod(id) {
  return apiDelete(`/api/v1/earnings/payout-methods/${id}`)
}
