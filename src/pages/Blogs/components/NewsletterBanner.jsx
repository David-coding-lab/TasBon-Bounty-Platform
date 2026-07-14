import { useState } from 'react'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { config } from '../../../../lib/config'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateEmail(email)
    if (err) { setError(err); return }
    setError('')

    setLoading(true)
    try {
      const res = await fetch(
        `${config.VITE_API_URL}/api/v1/newsletter/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      )
      const data = await res.json()
      if (data.success) {
        toast.success(data.message || 'Subscribed successfully!')
        setEmail('')
      } else {
        toast.error(data.message || 'Subscription failed')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full bg-[#1a4d2e] text-white overflow-hidden">
      <div className="max-w-[3000px] mx-auto grid md:grid-cols-2 min-h-[220px]">
        <div className="flex items-center gap-6 px-8 py-16 md:border-r md:border-white/20">
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Mail size={80} strokeWidth={1.5} />
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              Never miss an update
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-gray-200 leading-relaxed"
            >
              Subscribe to get the latest articles, opportunities and platform
              update from TASBUN
            </motion.p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center px-8 py-16"
        >
          <div className="flex flex-col w-full max-w-lg">
            <form
              onSubmit={handleSubmit}
              className="flex bg-white rounded-lg overflow-hidden h-[52px]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 text-black outline-none text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3 text-[#34A563] font-semibold text-base hover:bg-gray-50 transition disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
