import { useSelector } from 'react-redux'
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  PencilLine,
  Phone,
  Sparkles,
  Target,
} from 'lucide-react'
import { roleLabels } from './profileData'
import { formatJoined, getInitials, toNumber } from './profileUtils'

export default function ProfileCard({ profile, completeness, onEdit }) {
  const authUser = useSelector((state) => state.auth.user)
  const displayName =
    profile?.fullName || authUser?.fullName || 'TasBon Builder'
  const email = profile?.email || authUser?.email
  const phone = profile?.phoneNumber
  const avatarUrl = profile?.avatarUrl || authUser?.avatarUrl
  const role = roleLabels[profile?.type || authUser?.type] || 'Builder'
  const username = profile?.userName || authUser?.userName
  const joinedAt = formatJoined(profile?.createdAt || authUser?.createdAt)
  const isVerified = Boolean(
    authUser?.isEmailVerified ?? profile?.isEmailVerified,
  )
  const bio = profile?.bio?.trim()
  const bountyCount = toNumber(profile?.bountyCount)
  const strength = completeness?.percent ?? 0
  const completed = completeness?.completed ?? 0
  const total = completeness?.total ?? 0
  const nextStep = completeness?.nextStep

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="relative h-28 overflow-hidden bg-[#006045] sm:h-36">
        <div className="absolute inset-0 bg-gradient-to-r from-[#006045] via-[#007A55] to-[#00B87C]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:flex">
          <Sparkles size={13} aria-hidden="true" />
          {role} profile
        </div>
      </div>

      <div className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-end gap-4">
            <div className="relative -mt-12 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#ECFDF5] text-2xl font-bold text-[#006045] shadow-md sm:-mt-14 sm:h-28 sm:w-28">
              {getInitials(displayName)}
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={`${displayName} profile`}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              )}
            </div>

            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
                  {displayName}
                </h2>
                {isVerified && (
                  <BadgeCheck
                    size={19}
                    className="shrink-0 fill-[#00B87C] text-white"
                    aria-label="Verified email"
                  />
                )}
                <span className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-semibold text-[#007A55]">
                  {role}
                </span>
              </div>

              <p className="mt-1 text-sm text-[#6B7280]">
                {username ? `@${username}` : 'TasBon builder'}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6B7280]">
                {email && (
                  <span className="inline-flex min-w-0 max-w-full items-center gap-1.5">
                    <Mail size={14} className="shrink-0" aria-hidden="true" />
                    <span className="truncate">{email}</span>
                  </span>
                )}
                {phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone size={14} className="shrink-0" aria-hidden="true" />
                    {phone}
                  </span>
                )}
                {joinedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays
                      size={14}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    Joined {joinedAt}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Target size={14} className="shrink-0" aria-hidden="true" />
                  {bountyCount} {bountyCount === 1 ? 'bounty' : 'bounties'}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl border border-[#E5E7EB] bg-gray-50 p-4 lg:max-w-[17rem]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold tracking-wide text-[#6B7280] uppercase">
                Profile strength
              </p>
              <span className="text-sm font-bold text-[#111827]">
                {strength}%
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-[#E5E7EB]"
              role="progressbar"
              aria-label="Profile completeness"
              aria-valuenow={strength}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#00B87C] transition-all duration-500"
                style={{ width: `${strength}%` }}
              />
            </div>
            <p className="mt-2 text-xs leading-5 text-[#6B7280]">
              {strength === 100
                ? 'Your profile is complete — nice work.'
                : nextStep
                  ? `${nextStep} to stand out to clients.`
                  : 'Complete your profile to stand out.'}
            </p>
            <p className="mt-1 text-[11px] font-medium text-[#9CA3AF]">
              {completed} of {total} steps completed
            </p>
          </div>
        </div>

        {bio ? (
          <p className="mt-5 max-w-4xl text-sm leading-7 text-[#4B5563]">
            {bio}
          </p>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="mt-5 flex w-full items-start gap-3 rounded-xl border border-dashed border-[#E5E7EB] bg-gray-50 p-4 text-left transition-colors hover:border-[#00B87C]/40 hover:bg-[#ECFDF5]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#007A55] shadow-sm">
              <PencilLine size={16} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#111827]">
                Add a short bio
              </span>
              <span className="mt-0.5 block text-xs text-[#6B7280]">
                Tell clients what you build and the kind of work you enjoy.
              </span>
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
