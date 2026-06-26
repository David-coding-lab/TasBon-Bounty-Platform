export default function Step3ReviewPublish({ formData }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set'
    const d = new Date(dateStr)
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex flex-col gap-6 font-sans text-[#1a2a41]">
      {/* Header */}
      <div className="mb-1">
        <h3 className="font-sora text-2xl font-bold text-[#0b1a33]">
          Review your bounty
        </h3>
        <p className="text-sm text-[#6b7a8f]">
          Please review all details before publishing. You can go back and edit
          if needed.
        </p>
      </div>

      {/* Card with bounty summary */}
      <div className="rounded-2xl border border-[#eef2f6] bg-[#f8fafc] p-5 md:p-6">
        <span className="inline-block rounded-full bg-[#dce8f5] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#1a4b7a]">
          Smart Contracts
        </span>
        <h4 className="font-sora mt-2 text-xl font-semibold text-[#0b1a33]">
          Audit DeFi Protocol Smart Contracts
        </h4>
        <p className="mt-1.5 text-sm leading-relaxed text-[#1a2a41]">
          <strong>TASHUB</strong> — We need a comprehensive security audit of
          our DeFi protocol smart contracts. The audit should cover all core
          contracts including staking, governance, and reward distribution
          mechanisms.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[#eef2f6] px-3 py-0.5 text-xs font-medium text-[#1a2a41]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#eef2f6] bg-[#fafbfc] p-4 md:grid-cols-2 md:gap-x-6 md:p-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Reward
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            ${formData.rewardAmount} USDC
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Reward Type
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            {formData.rewardType === 'fixed' ? 'Fixed Price' : 'Milestone'}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Application Deadline
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            {formatDate(formData.applicationDeadline)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Bounty Deadline
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            {formatDate(formData.bountyDeadline)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Required Skills
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            {formData.skills.join(', ')}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Allow Partial Submissions
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">No</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Make Bounty Private
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            {formData.isPrivate ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Attachments
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            {formData.attachments.length > 0
              ? `${formData.attachments.length} files uploaded`
              : 'None'}
          </span>
        </div>
        <div className="col-span-1 flex flex-col gap-0.5 md:col-span-2">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6b7a8f]">
            Deliverables
          </span>
          <span className="text-sm font-medium text-[#1a2a41]">
            {formData.deliverables.length > 0
              ? formData.deliverables.join('; ')
              : 'None listed'}
          </span>
        </div>
      </div>
    </div>
  )
}
