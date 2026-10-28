import { config } from '../../../../lib/config'

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${config.VITE_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      credentials: 'include',
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

export async function verify2FA(challengeToken, code) {
  try {
    const response = await fetch(`${config.VITE_API_URL}/api/v1/auth/verify-2fa`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ challengeToken, code }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '2FA verification failed')
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
