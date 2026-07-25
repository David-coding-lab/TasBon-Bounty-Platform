import { apiGet } from './api'

let bannersCache = null
let bannersPromise = null

export function listBanners() {
  if (bannersCache) return Promise.resolve(bannersCache)
  if (bannersPromise) return bannersPromise
  bannersPromise = apiGet('/api/v1/banners')
    .then((res) => {
      bannersCache = res.banners || res.data || []
      return bannersCache
    })
    .catch((err) => {
      bannersPromise = null
      throw err
    })
  return bannersPromise
}
