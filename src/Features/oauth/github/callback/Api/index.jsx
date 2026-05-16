import { config } from '../../../../../../lib/config'

export async function githubOAuthCallback({ code, state }) {
  try {
    const params = new URLSearchParams({
      code,
      state: state || '',
    })

    const response = await fetch(
      `${config.VITE_API_URL}/api/v1/auth/github/callback?${params.toString()}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'GitHub authentication failed')
    }

    return result.data
  } catch (error) {
    console.error('GitHub callback error:', error)
    throw error
  }
}
