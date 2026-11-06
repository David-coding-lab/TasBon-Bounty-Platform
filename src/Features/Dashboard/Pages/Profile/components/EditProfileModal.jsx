import { useRef, useState } from 'react'
import Modal from './Modal'
import { getInitials } from '../profileUtils'

const inputClass =
  'w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/15'

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [draft, setDraft] = useState({
    fullName: profile?.fullName || '',
    bio: profile?.bio || '',
    phoneNumber: profile?.phoneNumber || '',
    avatarUrl: profile?.avatarUrl || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const nameInputRef = useRef(null)

  const handleChange = (field) => (event) => {
    setDraft((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fullName = draft.fullName.trim()

    if (!fullName) {
      setError('Please enter your display name.')
      return
    }

    const avatarUrl = draft.avatarUrl.trim()
    if (avatarUrl) {
      try {
        const parsed = new URL(avatarUrl)
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          throw new Error('Invalid protocol')
        }
      } catch {
        setError('Enter a valid image URL starting with http:// or https://.')
        return
      }
    }

    try {
      setSaving(true)
      setError(null)

      const payload = {
        fullName,
        bio: draft.bio.trim(),
        phoneNumber: draft.phoneNumber.trim(),
      }
      if (avatarUrl) payload.avatarUrl = avatarUrl

      await onSave(payload)
      onClose()
    } catch (err) {
      setError(
        err.message || 'Could not update your profile. Please try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  const previewUrl = draft.avatarUrl.trim()

  return (
    <Modal
      title="Edit profile"
      description="Update how your profile appears across TasBon."
      onClose={onClose}
      initialFocusRef={nameInputRef}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-gray-50 p-3">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#ECFDF5] text-lg font-bold text-[#006045] shadow-sm">
            {getInitials(draft.fullName || profile?.fullName)}
            {previewUrl && (
              <img
                src={previewUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>
          <label htmlFor="profile-avatar-url" className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-[#111827]">
              Profile photo URL
            </span>
            <input
              id="profile-avatar-url"
              type="url"
              value={draft.avatarUrl}
              onChange={handleChange('avatarUrl')}
              placeholder="https://example.com/photo.jpg"
              className={`mt-1 ${inputClass}`}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#111827]">
              Display name
            </span>
            <input
              ref={nameInputRef}
              required
              maxLength={100}
              value={draft.fullName}
              onChange={handleChange('fullName')}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#111827]">
              Phone number
            </span>
            <input
              type="tel"
              maxLength={30}
              value={draft.phoneNumber}
              onChange={handleChange('phoneNumber')}
              placeholder="+234 800 000 0000"
              className={inputClass}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-semibold text-[#111827]">Bio</span>
            <span className="text-[#9CA3AF]">{draft.bio.length}/500</span>
          </span>
          <textarea
            rows={4}
            maxLength={500}
            value={draft.bio}
            onChange={handleChange('bio')}
            placeholder="Tell clients what you build and the kind of work you enjoy."
            className={`${inputClass} resize-y`}
          />
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs text-[#991B1B]"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm font-semibold text-[#4B5563] transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00B87C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#009966] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006045] disabled:cursor-wait disabled:opacity-60"
          >
            {saving && (
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                aria-hidden="true"
              />
            )}
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
