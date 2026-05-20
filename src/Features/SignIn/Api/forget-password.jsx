import { config } from '../../../../lib/config'

export async function forgotPassword(email) {
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/auth/forgot-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send reset email')
  }

  return data
}
