import { config } from '../../../../../../lib/config'

export async function googleOAuthCallback({ code, state, scope }) {
  try {
    const params = new URLSearchParams({
      code,
      state: state || '',
      scope: scope || '',
    })

    const response = await fetch(
      `${config.VITE_API_URL}/api/v1/auth/google/callback?${params.toString()}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Google authentication failed')
    }

    return result.data
  } catch (error) {
    console.error('Google callback error:', error)
    throw error
  }
}
