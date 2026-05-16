import { config } from '../../../../lib/config'

export async function loginWithGoogle() {
  const res = await fetch(`${config.VITE_API_URL}/api/v1/auth/oauth/google`)
  const { data } = await res.json()
  window.location.href = data.url
}

export async function loginWithGithub() {
  const res = await fetch(`${config.VITE_API_URL}/api/v1/auth/oauth/github`)
  const { data } = await res.json()
  window.location.href = data.url
}
