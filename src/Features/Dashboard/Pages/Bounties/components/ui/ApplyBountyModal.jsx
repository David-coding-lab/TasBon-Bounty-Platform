import { useState } from 'react'
import {
  FileText,
  DollarSign,
  Briefcase,
  Folder,
  Calendar,
  ShieldCheck,
  Loader2,
  Send,
} from 'lucide-react'

export default function ApplyBountyModal({
  onCancel = () => {},
  onApply = () => {},
  isApplying = false,
  bounty = null,
}) {
  const [coverLetter, setCoverLetter] = useState('')
  const [proposedAmount, setProposedAmount] = useState('')
  const [charCount, setCharCount] = useState(0)

  const validate = () => {
    if (!coverLetter.trim()) return false
    if (coverLetter.trim().length < 20) return false
    return true
  }

  const handleApply = () => {
    if (!validate()) return
    onApply({
      coverLetter: coverLetter.trim(),
      proposedAmount: proposedAmount ? Number(proposedAmount) : undefined,
    })
  }

  const rewardDisplay = bounty?.rewardAmount || bounty?.reward
    ? `$${Number(bounty?.rewardAmount || bounty?.reward).toLocaleString()} ${bounty?.rewardToken || 'USDC'}`
    : 'N/A'

  const deadlineDisplay = bounty?.applicationDeadline
    ? new Date(bounty.applicationDeadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-[Inter]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-14 h-14 rounded-full bg-[#15803D]/10 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-[#15803D]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {bounty?.title || 'Apply for Bounty'}
            </h2>
            <p className="text-[#64748B] text-sm mt-0.5">
              Submit your application below
            </p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl p-3 flex flex-wrap gap-x-6 gap-y-2 mb-6">
          <DetailRow
            icon={<DollarSign className="w-4 h-4" />}
            label="Reward"
            value={rewardDisplay}
            valueClass="text-[#15803D] font-bold"
          />
          <DetailRow
            icon={<Briefcase className="w-4 h-4" />}
            label="Level"
            value={bounty?.difficulty || bounty?.level || 'N/A'}
          />
          <DetailRow
            icon={<Folder className="w-4 h-4" />}
            label="Category"
            value={bounty?.category || 'N/A'}
          />
          <DetailRow
            icon={<Calendar className="w-4 h-4" />}
            label="Deadline"
            value={deadlineDisplay}
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-900 mb-1.5">
            Cover Letter <span className="text-red-500">*</span>
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => {
              setCoverLetter(e.target.value)
              setCharCount(e.target.value.length)
            }}
            placeholder="Tell the bounty creator why you're a good fit for this project..."
            className="w-full border border-slate-200 rounded-xl p-4 text-sm resize-none h-32 outline-none focus:ring-2 focus:ring-[#34A563]/20 focus:border-[#34A563] transition-all placeholder:text-slate-400"
            maxLength={1000}
          />
          <div className="flex justify-between mt-1">
            {!coverLetter.trim() ? (
              <span className="text-xs text-red-500">Required</span>
            ) : coverLetter.trim().length < 20 ? (
              <span className="text-xs text-amber-500">Minimum 20 characters</span>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-400">{charCount}/1000</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-1.5">
            Proposed Amount <span className="text-slate-400 text-xs font-normal">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
              $
            </span>
            <input
              type="number"
              value={proposedAmount}
              onChange={(e) => setProposedAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full border border-slate-200 rounded-xl py-3 pl-7 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#34A563]/20 focus:border-[#34A563] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="bg-[#15803D]/5 rounded-xl p-4 flex gap-3 mb-6">
          <ShieldCheck className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#15803D] text-sm mb-1">
              What happens next?
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              The bounty creator will review your application. You'll be
              notified if you're selected to work on this bounty.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isApplying}
            className="cursor-pointer flex-1 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-[15px] hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={isApplying || !coverLetter.trim() || coverLetter.trim().length < 20}
            className="cursor-pointer flex-1 py-3 rounded-xl bg-[#34A853] text-white font-bold text-[15px] hover:bg-[#2c8f47] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isApplying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Apply Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailRow({
  icon,
  label,
  value,
  valueClass = 'text-slate-900 font-medium',
}) {
  return (
    <div className="flex items-center gap-2 text-[#64748B] min-w-0">
      {icon}
      <span className="text-[13px] shrink-0">{label}:</span>
      <span className={`text-[13px] truncate ${valueClass}`}>{value}</span>
    </div>
  )
}
