import { useState } from 'react'

export default function Step2RewardLogistics({
  formData,
  updateFormData,
  removeSkill,
  errors = {},
}) {
  const [skillInput, setSkillInput] = useState('')

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = e.target.value.trim()
      if (value && !formData.skills.includes(value)) {
        updateFormData('skills', [...formData.skills, value])
      }
      setSkillInput('')
    }
  }

  const clearAllSkills = () => {
    updateFormData('skills', [])
  }

  return (
    <div className="flex flex-col font-sans text-[#1a2a41]">
      {/* Reward Section */}
      <div className="py-6">
        <h2 className="font-bold text-base text-[#1a2a41] mb-0.5">Reward</h2>
        <p className="text-sm text-[#6b7a8f] mb-5">
          Set the compensation and reward structure for this bounty.
        </p>

        {/* Reward Amount + Reward Type side by side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Reward Amount */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1 font-bold text-sm text-[#1a2a41]">
              Reward Amount
              <span className="text-[#e74c3c]">*</span>
            </label>
            <div className="flex gap-2">
              {/* Token selector */}
              <div className="relative group">
                <select
                  value={formData.rewardToken}
                  onChange={(e) => updateFormData('rewardToken', e.target.value)}
                  className="appearance-none flex items-center gap-1 px-3 border border-[#dce1e8] rounded-xl bg-white h-12 font-semibold text-sm text-[#1a2a41] cursor-pointer hover:border-[#b0c4d8] transition-colors min-w-[90px] pr-8 outline-none"
                >
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="ETH">ETH</option>
                  <option value="SOL">SOL</option>
                  <option value="DAI">DAI</option>
                  <option value="BTC">BTC</option>
                  <option value="MATIC">MATIC</option>
                </select>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6b7a8f]">
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Amount input */}
              <div className={`flex-1 flex items-center border rounded-xl bg-white px-4 h-12 focus-within:ring-2 ${
                errors.rewardAmount
                  ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20'
                  : 'border-[#dce1e8] focus-within:ring-[#34A563] focus-within:border-[#34A563]'
              }`}>
                <input
                  type="number"
                  className="w-full border-0 outline-none font-semibold text-[#1a2a41] bg-transparent text-sm"
                  value={formData.rewardAmount}
                  onChange={(e) =>
                    updateFormData('rewardAmount', Number(e.target.value))
                  }
                  min={0}
                />
                <span className="text-sm font-medium text-[#a0b0c4] ml-2 shrink-0">
                  {formData.rewardToken || 'USDC'}
                </span>
              </div>
            </div>
            {errors.rewardAmount && (
              <p className="text-red-500 text-xs mt-1 col-span-2">{errors.rewardAmount}</p>
            )}
          </div>

          {/* Reward Type */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-[#1a2a41]">
              Reward Type
            </label>
            <div className="flex gap-2 h-12">
              <button
                className={`flex-1 px-3 border rounded-xl bg-white text-left transition-colors hover:border-[#b0c4d8] ${
                  formData.rewardType === 'fixed'
                    ? 'border-[#34A563] bg-[#f0faf5] shadow-[0_0_0_1px_#34A563]'
                    : 'border-[#dce1e8]'
                }`}
                onClick={() => updateFormData('rewardType', 'fixed')}
              >
                <span
                  className={`font-semibold text-sm block ${formData.rewardType === 'fixed' ? 'text-[#34A563]' : 'text-[#1a2a41]'}`}
                >
                  Fixed Price
                </span>
                <span className="block text-xs text-[#6b7a8f]">
                  One-time Payment
                </span>
              </button>
              <button
                className={`flex-1 px-3 border rounded-xl bg-white text-left transition-colors hover:border-[#b0c4d8] ${
                  formData.rewardType === 'milestone'
                    ? 'border-[#34A563] bg-[#f0faf5] shadow-[0_0_0_1px_#34A563]'
                    : 'border-[#dce1e8]'
                }`}
                onClick={() => updateFormData('rewardType', 'milestone')}
              >
                <span
                  className={`font-semibold text-sm block ${formData.rewardType === 'milestone' ? 'text-[#34A563]' : 'text-[#1a2a41]'}`}
                >
                  Milestone
                </span>
                <span className="block text-xs text-[#6b7a8f]">
                  Pay in stages
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-[#edf0f4]" />

      {/* Timeline Section */}
      <div className="py-6">
        <h2 className="font-bold text-base text-[#1a2a41] mb-0.5">Timeline</h2>
        <p className="text-sm text-[#6b7a8f] mb-5">
          Define the important date for applications and delivery.
        </p>

        <div className="grid grid-cols-2 gap-6">
          {/* Application Deadline */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-[#1a2a41]">
              Application Deadline
            </label>
            <div className="flex border border-[#dce1e8] rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#34A563] focus-within:border-[#34A563] h-12">
              <div className="flex items-center gap-2 px-3 flex-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 text-[#6b7a8f]"
                >
                  <rect
                    x="1.5"
                    y="2.5"
                    width="13"
                    height="12"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1.5 6.5h13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5 1v3M11 1v3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="date"
                  className="border-0 outline-none bg-transparent text-sm text-[#1a2a41] font-medium w-full"
                  value={formData.applicationDeadline?.split('T')[0] || ''}
                    onChange={(e) => {
                    const time =
                      formData.applicationDeadline?.split('T')[1]?.slice(0, 5) || '23:59'
                    updateFormData(
                      'applicationDeadline',
                      `${e.target.value}T${time}:00.000Z`,
                    )
                  }}
                />
              </div>
              <div className="flex items-center border-l border-[#dce1e8] px-3 gap-2">
                <input
                  type="time"
                  className="border-0 outline-none bg-transparent text-sm text-[#1a2a41] font-medium"
                  value={
                    formData.applicationDeadline?.split('T')[1]?.slice(0, 5) ||
                    '23:59'
                  }
                   onChange={(e) => {
                    const date =
                      formData.applicationDeadline?.split('T')[0] || ''
                    updateFormData(
                      'applicationDeadline',
                      `${date}T${e.target.value}:00.000Z`,
                    )
                  }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[#6b7a8f] shrink-0"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 5v3.5l2 2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bounty Deadline */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-[#1a2a41]">
              Bounty Deadline
            </label>
            <div className={`flex border rounded-xl overflow-hidden bg-white focus-within:ring-2 h-12 ${
              errors.bountyDeadline
                ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20'
                : 'border-[#dce1e8] focus-within:ring-[#34A563] focus-within:border-[#34A563]'
            }`}>
              <div className="flex items-center gap-2 px-3 flex-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 text-[#6b7a8f]"
                >
                  <rect
                    x="1.5"
                    y="2.5"
                    width="13"
                    height="12"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1.5 6.5h13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5 1v3M11 1v3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="date"
                  className="border-0 outline-none bg-transparent text-sm text-[#1a2a41] font-medium w-full"
                  value={formData.bountyDeadline?.split('T')[0] || ''}
                  onChange={(e) => {
                    const time =
                      formData.bountyDeadline?.split('T')[1]?.slice(0, 5) || '23:59'
                    updateFormData(
                      'bountyDeadline',
                      `${e.target.value}T${time}:00.000Z`,
                    )
                  }}
                />
              </div>
              <div className="flex items-center border-l border-[#dce1e8] px-3 gap-2">
                <input
                  type="time"
                  className="border-0 outline-none bg-transparent text-sm text-[#1a2a41] font-medium"
                  value={
                    formData.bountyDeadline?.split('T')[1]?.slice(0, 5) ||
                    '23:59'
                  }
                    onChange={(e) => {
                    const time = formData.bountyDeadline?.split('T')[1]?.slice(0, 5) || '23:59'
                    updateFormData(
                      'bountyDeadline',
                      `${e.target.value}T${time}:00.000Z`,
                    )
                  }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[#6b7a8f] shrink-0"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 5v3.5l2 2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            {errors.bountyDeadline && (
              <p className="text-red-500 text-xs mt-1">{errors.bountyDeadline}</p>
            )}
          </div>
        </div>
      </div>

      <hr className="border-[#edf0f4]" />

      {/* Required Skills Section */}
      <div className="py-6">
        <h2 className="font-bold text-base text-[#1a2a41] mb-0.5">
          Required Skills
        </h2>
        <p className="text-sm text-[#6b7a8f] mb-5">
          Add relevant skills or tags to attract the right builders.
        </p>

        <div className="flex items-center gap-2 px-3 border border-[#dce1e8] rounded-xl bg-white min-h-12 focus-within:ring-2 focus-within:ring-[#34A563] focus-within:border-[#34A563]">
          {/* Tags + Input */}
          <div className="flex flex-wrap items-center gap-2 flex-1 py-2">
            {formData.skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-1 bg-white border border-[#dce1e8] py-1 px-3 rounded-full text-sm text-[#1a2a41]"
              >
                <span>{skill}</span>
                {/* <button
                  onClick={() => removeSkill(skill)}
                  className="bg-transparent border-0 cursor-pointer flex items-center justify-center ml-1 text-[#6b7a8f] hover:text-[#e74c3c] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button> */}
              </div>
            ))}
            <input
              type="text"
              className="border-0 outline-none bg-transparent text-sm text-[#1a2a41] flex-1 min-w-[100px] placeholder:text-[#a0b0c4]"
              placeholder={formData.skills.length === 0 ? 'Add a skill...' : ''}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
            />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-[#dce1e8] self-stretch">
            <button
              onClick={clearAllSkills}
              className="flex items-center justify-center text-[#6b7a8f] hover:text-[#1a2a41] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 3l12 12M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <hr className="border-[#edf0f4]" />

      {/* Additional Settings Section */}
      <div className="py-6">
        <h2 className="font-bold text-base text-[#1a2a41] mb-0.5">
          Additional Settings
        </h2>
        <p className="text-sm text-[#6b7a8f] mb-5">
          More options to customize this bounty
        </p>

        <button
          className={`flex items-center gap-4 px-4 py-3.5 border rounded-xl bg-white text-left transition-all w-full max-w-sm hover:border-[#b0c4d8] ${
            formData.isPrivate ? 'border-[#34A563]' : 'border-[#dce1e8]'
          }`}
          onClick={() => updateFormData('isPrivate', !formData.isPrivate)}
        >
          {/* Checkbox icon */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0`}
          >
            {formData.isPrivate ? (
              <span className="material-symbols-outlined text-[#34A563] text">
                public
              </span>
            ) : (
              <span className="material-symbols-outlined">lock</span>
            )}
          </div>
          <div>
            <span
              className={`font-semibold text-sm block
              ${formData.isPrivate ? 'text-[#34A563]' : 'text-[#1a2a41]'}
            `}
            >
              Make bounty private
            </span>
            <span className="text-xs text-[#6b7a8f]">
              Only invited builders can view this bounty
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}
