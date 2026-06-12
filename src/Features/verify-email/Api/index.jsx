import { config } from '../../../../lib/config'

export async function verifyEmailToken(token) {
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/auth/verify-email?token=${token}`,
    {
      method: 'GET',
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Verification failed')
  }

  return data
}
