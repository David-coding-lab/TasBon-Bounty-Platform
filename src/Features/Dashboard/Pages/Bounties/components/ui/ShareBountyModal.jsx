import { useState } from 'react'
import { X, Check, Copy, Link2 } from 'lucide-react'
import { toast } from 'sonner'

const socials = [
  {
    name: 'Twitter',
    color: 'bg-[#1DA1F2]',
    hover: 'hover:bg-[#1a8cd8]',
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    color: 'bg-[#1877F2]',
    hover: 'hover:bg-[#166fe5]',
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    color: 'bg-[#0A66C2]',
    hover: 'hover:bg-[#095aa8]',
    getUrl: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'WhatsApp',
    color: 'bg-[#25D366]',
    hover: 'hover:bg-[#20bd5a]',
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  },
  {
    name: 'Telegram',
    color: 'bg-[#0088cc]',
    hover: 'hover:bg-[#0077b3]',
    getUrl: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: 'Email',
    color: 'bg-[#EA4335]',
    hover: 'hover:bg-[#d53b2e]',
    getUrl: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
]

export default function ShareBountyModal({ bounty, onClose }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${window.location.origin}/dashboard/bounties/${bounty.id}`
  const shareTitle = `Check out this bounty: ${bounty.title}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl mx-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Share Bounty</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.getUrl(shareUrl, shareTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} ${social.hover} text-white rounded-xl p-4 flex flex-col items-center gap-2 transition-colors cursor-pointer`}
            >
              <span className="text-sm font-semibold">{social.name}</span>
            </a>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 mb-2 font-medium">Page link</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 truncate">
              <Link2 size={16} className="text-gray-400 shrink-0" />
              <span className="truncate">{shareUrl}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#34A563] text-white text-sm font-medium rounded-lg hover:bg-[#007A55] transition-colors cursor-pointer shrink-0"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
