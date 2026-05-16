import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url({
    message: 'VITE_API_URL must be a valid URL',
  }),

  VITE_APP_NAME: z.string().min(1, {
    message: 'VITE_APP_NAME is required',
  }),

  VITE_CLIENT_URL: z.string().url({
    message: 'VITE_CLIENT_URL must be a valid URL',
  }),
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:\n')

  parsedEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`)
  })

  throw new Error('Missing or invalid environment variables')
}

export const config = parsedEnv.data
