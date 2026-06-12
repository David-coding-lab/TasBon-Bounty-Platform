import { config } from '../../../../lib/config'
import Cookies from 'js-cookie'

/**
 * Exchange a Privy access token for a Tasbon session.
 */
export async function loginWithPrivy(privyToken) {
  const endpoint = '/api/v1/auth/privy'

  const response = await fetch(`${config.VITE_API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // needed for the refreshToken HttpOnly cookie
    body: JSON.stringify({ token: privyToken }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Privy login failed')
  }

  // Persist Tasbon access token (15 min JWT)
  Cookies.set('session', data.data.accessToken, {
    expires: 1 / 96, // 15 minutes
    secure: true,
    sameSite: 'Strict',
  })

  return data.data // { user, accessToken }
}
