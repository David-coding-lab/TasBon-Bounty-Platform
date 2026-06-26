import { useState } from 'react'

export default function Step2RewardLogistics({
  formData,
  updateFormData,
  removeSkill,
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

  return (
    <div className="flex flex-col gap-6 font-sans text-[#1a2a41]">
      {/* Reward Amount */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1 font-semibold text-sm text-[#1a2a41]">
          Reward Amount
          <span className="text-[#e74c3c]">*</span>
        </label>
        <div className="flex items-center border border-[#dce1e8] rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#34A563] focus-within:border-[#34A563]">
          <div className="flex items-center gap-1 px-3 bg-[#f8fafc] border-r border-[#dce1e8] h-12 font-medium text-sm text-[#1a2a41]">
            <span>USDC</span>
            <span className="material-symbols-outlined text-[#6b7a8f]">
              expand_all
            </span>
          </div>
          <input
            type="number"
            className="w-full px-4 py-3 border-0 outline-none font-medium text-[#1a2a41] bg-transparent"
            value={formData.rewardAmount}
            onChange={(e) =>
              updateFormData('rewardAmount', Number(e.target.value))
            }
            min={0}
          />
        </div>
      </div>

      {/* Reward Type */}
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-[#1a2a41]">
          Reward Type
        </label>
        <div className="flex gap-3 flex-wrap">
          <button
            className={`flex-1 min-w-30 p-3 border border-[#dce1e8] rounded-xl bg-white text-left transition-colors hover:border-[#b0c4d8] ${
              formData.rewardType === 'fixed'
                ? 'border-[#34A563] bg-[#f0f7ff] shadow-[0_0_0_2px_rgba(52,165,99,0.15)]'
                : ''
            }`}
            onClick={() => updateFormData('rewardType', 'fixed')}
          >
            <span className="font-semibold text-sm text-[#1a2a41]">
              Fixed Price
            </span>
            <span className="block text-xs text-[#6b7a8f]">
              One-time Payment
            </span>
          </button>
          <button
            className={`flex-1 min-w-30 p-3 border border-[#dce1e8] rounded-xl bg-white text-left transition-colors hover:border-[#b0c4d8] ${
              formData.rewardType === 'milestone'
                ? 'border-[#34A563] bg-[#f0f7ff] shadow-[0_0_0_2px_rgba(52,165,99,0.15)]'
                : ''
            }`}
            onClick={() => updateFormData('rewardType', 'milestone')}
          >
            <span className="font-semibold text-sm text-[#1a2a41]">
              Milestone
            </span>
            <span className="block text-xs text-[#6b7a8f]">Pay in stages</span>
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-[#1a2a41]">Timeline</label>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-45 flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1a2a41]">
              Application Deadline
            </label>
            <input
              type="datetime-local"
              className="w-full px-4 py-3 border border-[#dce1e8] rounded-xl bg-white outline-none focus:ring-2 focus:ring-[#34A563] focus:border-[#34A563] text-sm text-[#1a2a41]"
              value={formData.applicationDeadline}
              onChange={(e) =>
                updateFormData('applicationDeadline', e.target.value)
              }
            />
          </div>
          <div className="flex-1 min-w-45 flex flex-col gap-1">
            <label className="text-sm font-medium text-[#1a2a41]">
              Bounty Deadline
            </label>
            <input
              type="datetime-local"
              className="w-full px-4 py-3 border border-[#dce1e8] rounded-xl bg-white outline-none focus:ring-2 focus:ring-[#34A563] focus:border-[#34A563] text-sm text-[#1a2a41]"
              value={formData.bountyDeadline}
              onChange={(e) => updateFormData('bountyDeadline', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-[#1a2a41]">
          Required Skills
        </label>
        <div className="flex flex-wrap items-center gap-2 p-2 border border-[#dce1e8] rounded-xl bg-white min-h-12 focus-within:ring-2 focus-within:ring-[#34A563] focus-within:border-[#34A563]">
          {formData.skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-1 bg-[#eef2f6] py-1 px-3 rounded-full text-sm text-[#1a2a41]"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="bg-transparent border-0 cursor-pointer flex items-center justify-center p-0.5 text-[#6b7a8f] rounded-full hover:text-[#e74c3c] hover:bg-[#fee] transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))}
          <input
            type="text"
            className="border-0 outline-none bg-transparent font-sans text-sm text-[#1a2a41] flex-1 min-w-30 py-1.5 placeholder:text-[#a0b0c4]"
            placeholder="Add a skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
          />
        </div>
      </div>

      {/* Additional Settings */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm text-[#1a2a41]">
          Additional Settings
        </label>
        <div className="flex flex-col gap-1">
          <button
            className={`flex items-center gap-2 px-4 py-2.5 border border-[#dce1e8] rounded-xl bg-white font-medium text-sm text-[#1a2a41] transition-colors hover:border-[#b0c4d8] w-fit ${
              formData.isPrivate ? 'border-[#34A563] bg-[#f0f7ff]' : ''
            }`}
            onClick={() => updateFormData('isPrivate', !formData.isPrivate)}
          >
            {formData.isPrivate ? (
              <span className="material-symbols-outlined text-[#6b7a8f]">
                lock
              </span>
            ) : (
              <span className="material-symbols-outlined text-[#6b7a8f]">
                public
              </span>
            )}
            <span>Make bounty private</span>
          </button>
          <span className="text-sm text-[#6b7a8f] ml-1">
            {formData.isPrivate
              ? 'Only invited builders can view this bounty'
              : 'Only invited builders can view this bounty'}
          </span>
        </div>
      </div>
    </div>
  )
}
