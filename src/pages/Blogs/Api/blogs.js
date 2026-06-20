import { config } from '../../../../lib/config'

export async function fetchBlogs({ page = 1, limit = 4, category } = {}) {
  const params = new URLSearchParams({ page, limit })
  if (category) params.set('category', category)

  const response = await fetch(`${config.VITE_API_URL}/api/v1/blogs?${params}`)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch blogs')
  }

  return data
}
