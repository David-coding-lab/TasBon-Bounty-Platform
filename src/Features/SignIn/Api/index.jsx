import { config } from '../../../../lib/config'

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${config.VITE_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
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
