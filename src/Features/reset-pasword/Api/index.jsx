import { config } from '../../../../lib/config'

export async function resetPassword(token, password) {
  const response = await fetch(
    `${config.VITE_API_URL}/api/v1/auth/reset-password/${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Password reset failed')
  }

  return data
}
