import { z } from 'zod'

export const loginSchema = z.object({
  userEmail: z.string().email('Please enter a valid email'),

  password: z.string().min(6, 'Password must be at least 6 characters'),
})
