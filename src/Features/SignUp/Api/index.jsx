import { config } from '../../../../lib/config'

export async function registerUser({ userName, email, fullName, password }) {
  try {
    const response = await fetch(
      `${config.VITE_API_URL}/api/v1/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email,
          fullName,
          password,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}
