import { config } from '../../lib/config'
import Cookies from 'js-cookie'

export async function clearSession() {
  try {
    await fetch(`${config.VITE_API_URL}/api/v1/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch {}

  Cookies.remove('session')

  window.dispatchEvent(new CustomEvent('session-expired'))
}
