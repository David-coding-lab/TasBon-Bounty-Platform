import { useState } from 'react'
import {
  FileText,
  DollarSign,
  Briefcase,
  Folder,
  Calendar,
  ShieldCheck,
  Loader2,
} from 'lucide-react'

export default function ApplyBountyModal({
  onCancel = () => {},
  onApply = () => {},
  isApplying = false,
  bounty = {
    title: 'Build DeFi Analytics Dashboard',
    project: 'Nexus Protocol',
    image:
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=400&auto=format&fit=crop',
    reward: '$750 USDC',
    experience: 'Intermediate',
    category: 'Frontend',
    deadline: 'May 31, 2025',
  },
}) {
  const handleApply = () => {
    if (!validate()) return
    onApply({
      coverLetter,
      proposedAmount: proposedAmount ? Number(proposedAmount) : undefined,
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-[Inter]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 rounded-full bg-[#15803D]/10 flex items-center justify-center">
            <FileText className="w-9 h-9 text-[#15803D]" strokeWidth={1.75} />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#15803D] flex items-center justify-center text-white text-sm font-bold">
              ?
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
          Apply for this bounty?
        </h2>
        <p className="text-[#64748B] text-center text-[15px] leading-relaxed mb-6">
          You're about to submit your application for this bounty. Make sure
          your profile and portfolio are up to date.
        </p>

        <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 mb-6">
          <img
            src={bounty.image}
            alt={bounty.title}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug">
              {bounty.title}
            </h3>
            <div className="flex items-center gap-1 text-[#64748B] text-sm mt-0.5">
              <span>{bounty.project}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <DetailRow
            icon={<DollarSign className="w-[18px] h-[18px]" />}
            label="Reward"
            value={bounty.reward}
            valueClass="text-[#15803D] font-bold"
          />
          <DetailRow
            icon={<Briefcase className="w-[18px] h-[18px]" />}
            label="Experience Level"
            value={bounty.experience}
          />
          <DetailRow
            icon={<Folder className="w-[18px] h-[18px]" />}
            label="Category"
            value={bounty.category}
          />
          <DetailRow
            icon={<Calendar className="w-[18px] h-[18px]" />}
            label="Application Deadline"
            value={bounty.deadline}
          />
        </div>

        <div className="bg-[#15803D]/5 rounded-xl p-4 flex gap-3 mb-8">
          <ShieldCheck className="w-5 h-5 text-[#15803D] flex-shrink-0 mt-0.5" />
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
            disabled={isApplying}
            className="cursor-pointer flex-1 py-3 rounded-xl bg-[#34A853] text-white font-bold text-[15px] hover:bg-[#2c8f47] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isApplying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Applying...
              </>
            ) : (
              'Apply Now'
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5 text-[#64748B]">
        {icon}
        <span className="text-[15px]">{label}</span>
      </div>
      <span className={`text-[15px] ${valueClass}`}>{value}</span>
    </div>
  )
}
