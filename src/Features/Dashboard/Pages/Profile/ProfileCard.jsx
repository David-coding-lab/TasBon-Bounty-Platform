import { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import {
  BadgeCheck,
  CalendarDays,
  Link as LinkIcon,
  MapPin,
  MoreHorizontal,
  Star,
} from 'lucide-react'
import Modal from './components/Modal'
import { useClickOutside } from './hooks/useClickOutside'
import { skillTags, socialLinks } from './profileData'

const roleLabels = {
  USER: 'Member',
  BOUNTY_HUNTER: 'Builder',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super admin',
}

function getInitials(name) {
  return (
    name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'B'
  )
}

function safeExternalUrl(value) {
  if (!value) return null
  try {
    const url = new URL(
      value.match(/^https?:\/\//i) ? value : `https://${value}`,
    )
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

export default function ProfileCard({ profile, stats, onUpdateProfile }) {
  const authUser = useSelector((state) => state.auth.user)
  const [editOpen, setEditOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState({ fullName: '', bio: '' })
  const moreActionsRef = useRef(null)
  const nameInputRef = useRef(null)
  const closeEditor = useCallback(() => setEditOpen(false), [])
  const closeMoreMenu = useCallback(() => setMoreOpen(false), [])

  useClickOutside(moreActionsRef, closeMoreMenu, moreOpen)

  const displayName = profile?.fullName || authUser?.fullName || 'Builder'
  const bio =
    profile?.bio ||
    'Add a short introduction to help clients understand what you build.'
  const avatarUrl = profile?.avatarUrl || authUser?.avatarUrl
  const role = roleLabels[profile?.type || authUser?.type] || 'Builder'
  const joinedAt = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : null

  const openEditor = () => {
    setDraft({ fullName: displayName, bio: profile?.bio || '' })
    setEditOpen(true)
  }

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Profile link copied')
    } catch {
      toast.error('Could not copy profile link')
    }
    setMoreOpen(false)
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const fullName = draft.fullName.trim()
    if (!fullName) {
      toast.error('Enter your name before saving')
      return
    }

    try {
      setSaving(true)
      await onUpdateProfile({ fullName, bio: draft.bio.trim() })
      setEditOpen(false)
      toast.success('Profile updated')
    } catch (error) {
      toast.error(error.message || 'Could not update your profile')
    } finally {
      setSaving(false)
    }
  }

  const hasEmailVerification = Boolean(
    profile?.isEmailVerified ?? authUser?.isEmailVerified,
  )

  return (
    <>
      <section className="overflow-visible rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="h-24 rounded-t-2xl bg-[#006045] sm:h-28" />

        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 items-end gap-4">
              <div className="relative -mt-9 flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#ECFDF5] text-xl font-bold text-[#006045] shadow-sm sm:-mt-12 sm:h-24 sm:w-24">
                {getInitials(displayName)}
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(event) => event.currentTarget.remove()}
                  />
                )}
              </div>

              <div className="min-w-0 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-sora text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                    {displayName}
                  </h1>
                  {hasEmailVerification && (
                    <BadgeCheck
                      size={17}
                      className="fill-blue-500 text-white"
                      aria-label="Email verified"
                    />
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">{role}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                  {profile?.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} aria-hidden="true" />
                      {profile.location}
                    </span>
                  )}
                  {profile?.website && (
                    <span className="inline-flex items-center gap-1.5">
                      <LinkIcon size={13} aria-hidden="true" />
                      {profile.website}
                    </span>
                  )}
                  {joinedAt && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={13} aria-hidden="true" />
                      Joined {joinedAt}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end gap-2 sm:w-auto sm:pb-1">
              <button
                type="button"
                onClick={openEditor}
                className="h-9 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
              >
                Edit profile
              </button>
              <div className="relative" ref={moreActionsRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                  aria-label="More profile actions"
                  aria-expanded={moreOpen}
                  aria-haspopup="menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                >
                  <MoreHorizontal size={18} />
                </button>
                {moreOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-11 z-10 w-44 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={copyProfileLink}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                    >
                      Copy profile link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-6 text-slate-500">
            {bio}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {socialLinks.map(({ label, icon: Icon, field }) => {
              const href = safeExternalUrl(profile?.[field])
              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-colors hover:bg-emerald-50 hover:text-[#007A55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ) : (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    toast(`${label} link is not on this profile yet`)
                  }
                  aria-label={`${label} link not added`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-[#007A55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                >
                  <Icon size={16} aria-hidden="true" />
                </button>
              )
            })}
            {skillTags.map((skill, index) => (
              <span
                key={skill}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${
                  index === 0
                    ? 'bg-[#ECFDF5] text-[#176B4E]'
                    : 'bg-slate-50 text-slate-500'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-y-5 border-t border-slate-100 pt-5 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-slate-100 sm:border-r sm:px-4 first:sm:pl-0 last:sm:border-r-0"
              >
                <div className="flex items-center gap-1.5 font-sora text-base font-bold text-slate-800">
                  {stat.value}
                  {stat.isRating && stat.value !== '—' && (
                    <Star
                      size={13}
                      className="fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {editOpen && (
        <Modal
          title="Edit profile"
          onClose={closeEditor}
          initialFocusRef={nameInputRef}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-600">
                Display name
              </span>
              <input
                ref={nameInputRef}
                required
                maxLength={100}
                value={draft.fullName}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#009966] focus:ring-2 focus:ring-[#009966]/15"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-600">
                Bio
              </span>
              <textarea
                rows={4}
                maxLength={500}
                value={draft.bio}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    bio: event.target.value,
                  }))
                }
                className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#009966] focus:ring-2 focus:ring-[#009966]/15"
              />
              <span className="mt-1 block text-right text-xs text-slate-400">
                {draft.bio.length}/500
              </span>
            </label>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#009966] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#007A55] disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006045]"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
