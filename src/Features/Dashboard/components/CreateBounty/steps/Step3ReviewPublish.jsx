export default function Step3ReviewPublish({ formData }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set'
    const d = new Date(dateStr)
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Icons
  const TitleIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#f0faf5" />
      <rect x="9" y="10" width="14" height="2" rx="1" fill="#34A563" />
      <rect x="9" y="14" width="10" height="2" rx="1" fill="#34A563" />
      <rect x="9" y="18" width="12" height="2" rx="1" fill="#34A563" />
    </svg>
  )

  const DescriptionIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#f0faf5" />
      <path
        d="M12 11h8M12 15h8M12 19h5"
        stroke="#34A563"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 17l2 2-2 2"
        stroke="#34A563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const AttachmentsIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#f0faf5" />
      <path
        d="M20 16l-5 5a3 3 0 01-4.243-4.243l5-5a1.5 1.5 0 012.121 2.121l-5 5a.75.75 0 01-1.06-1.06l5-5"
        stroke="#34A563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const TashubIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#34A563" />
      <path
        d="M9 14l3.5 3.5L19 11"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const VerifiedIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="#34A563" />
      <path
        d="M5 8l2.5 2.5L11 5.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const CircleCheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="#34A563" strokeWidth="1.5" />
      <path
        d="M5.5 9l2.5 2.5L12.5 6"
        stroke="#34A563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div className="flex flex-col gap-5 font-sans text-[#1a2a41]">
      {/* Page header */}
      <div>
        <h3 className="text-xl font-bold text-[#0b1a33]">Review your bounty</h3>
        <p className="text-sm text-[#6b7a8f] mt-0.5">
          Please review all details before publishing. You can go back and edit
          if needed.
        </p>
      </div>

      {/* Top preview card */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left: badge + title + org + description + skills */}
          <div className="flex-1 min-w-0">
            <span className="inline-block rounded-md bg-[#e6f5ed] px-2.5 py-0.5 text-xs font-semibold text-[#34A563]">
              Smart Contracts
            </span>
            <h4 className="mt-2 text-lg font-bold text-[#0b1a33]">
              {formData.title || 'Audit DeFi Protocol Smart Contracts'}
            </h4>

            {/* TASHUB row */}
            <div className="mt-3 flex items-center gap-2">
              <TashubIcon />
              <span className="font-bold text-sm text-[#1a2a41] tracking-wide">
                TASHUB
              </span>
              <VerifiedIcon />
            </div>

            {/* Description */}
            <p className="mt-2 text-sm leading-relaxed text-[#4a5568]">
              {formData.description ||
                'We need a comprehensive security audit of our DeFi protocol smart contracts. The audit should cover all core contracts including staking, governance, and reward distribution mechanisms.'}
            </p>

            {/* Skill pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {(formData.skills?.length > 0
                ? formData.skills
                : ['Solidity', 'Smart Contract', 'DeFi', 'Security']
              ).map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[#dce1e8] bg-white px-4 py-1.5 text-sm font-medium text-[#1a2a41]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: reward box */}
          <div className="shrink-0 rounded-xl border border-[#dce1e8] bg-white px-5 py-3 text-right min-w-[130px]">
            <div className="text-lg font-bold text-[#0b1a33]">
              ${formData.rewardAmount || '1200'} USDC
            </div>
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34A563] shrink-0" />
              <span className="text-sm font-medium text-[#1a2a41]">
                {formData.rewardType === 'milestone'
                  ? 'Milestone'
                  : 'Fixed price'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom two cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left card: Bounty Details (content fields) */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 flex flex-col gap-5">
          <h5 className="font-bold text-base text-[#0b1a33]">Bounty Details</h5>

          {/* Title */}
          <div className="flex items-start gap-3">
            <TitleIcon />
            <div className="pb-3">
              <p className="text-sm font-bold text-[#1a2a41]">Title</p>
              <p className="text-sm text-[#4a5568] mt-0.5">
                {formData.title || 'Audit DeFi Protocol Smart Contracts'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <DescriptionIcon />
            <div className="pb-3">
              <p className="text-sm font-bold text-[#1a2a41]">Description</p>
              <p className="text-sm text-[#4a5568] mt-0.5 leading-relaxed">
                {formData.description
                  ? formData.description.slice(0, 120) +
                    (formData.description.length > 120 ? '…' : '')
                  : 'Comprehensive Security audit of all core protocol contracts including staking, governance, and reward distribution.'}
              </p>
            </div>
          </div>

          {/* Attachments */}
          <div className="flex items-start gap-3">
            <AttachmentsIcon />
            <div className="pb-3">
              <p className="text-sm font-bold text-[#1a2a41]">Attachments</p>
              <p className="text-sm text-[#4a5568] mt-0.5">
                {formData.attachments?.length > 0
                  ? `${formData.attachments.length} files uploaded`
                  : '2 files uploaded'}
              </p>
            </div>
          </div>
        </div>

        {/* Right card: Bounty Details (reward/logistics) */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 flex flex-col gap-0">
          <h5 className="font-bold text-base text-[#0b1a33] mb-4">
            Bounty Details
          </h5>

          {/* Rows */}
          {[
            {
              label: 'Reward',
              value: `$${formData.rewardAmount || '1200'} USDC`,
            },
            {
              label: 'Reward Type',
              value:
                formData.rewardType === 'milestone'
                  ? 'Milestone'
                  : 'Fixed Price',
            },
            {
              label: 'Application Deadline',
              value:
                formatDate(formData.applicationDeadline) !== 'Not set'
                  ? formatDate(formData.applicationDeadline)
                  : 'May 31, 2026, 11:59 PM',
            },
            {
              label: 'Bounty  Deadline',
              value:
                formatDate(formData.bountyDeadline) !== 'Not set'
                  ? formatDate(formData.bountyDeadline)
                  : 'June 31, 2026, 11:59 PM',
            },
            {
              label: 'Required Skills',
              value:
                formData.skills?.length > 0
                  ? formData.skills.join(', ')
                  : 'Solidity, Smart Contract, DeFi, Security',
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-start justify-between py-2.5 border-b border-[#f0f4f8] last:border-0"
            >
              <span className="text-sm text-[#1a2a41] shrink-0 mr-4">
                {label}
              </span>
              <span className="text-sm text-[#1a2a41] font-medium text-right">
                {value}
              </span>
            </div>
          ))}

          {/* Allow Partial Submissions */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#f0f4f8]">
            <span className="text-sm text-[#1a2a41]">
              Allow Partial Submissions
            </span>
            <div className="flex items-center gap-1.5">
              <CircleCheckIcon />
              <span className="text-sm font-medium text-[#1a2a41]">No</span>
            </div>
          </div>

          {/* Make Bounty Private */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-[#1a2a41]">Make Bounty Private</span>
            <div className="flex items-center gap-1.5">
              <CircleCheckIcon />
              <span className="text-sm font-medium text-[#1a2a41]">
                {formData.isPrivate ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
