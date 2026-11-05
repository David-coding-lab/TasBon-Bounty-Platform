import { useCallback, useEffect, useState } from 'react'
import {
  getDashboardStats,
  getProfile,
  updateProfile,
} from '../../../../services/profile'
import ProfileCard from './ProfileCard'
import OverviewContent from './OverviewContent'
import { profileStatsFallback } from './profileData'

function formatEarnings(value) {
  if (value == null) return '—'
  const amount = Number(value)
  if (!Number.isFinite(amount)) return '—'
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
}

function buildProfileStats(data) {
  if (!data) return profileStatsFallback

  return profileStatsFallback.map((stat) => {
    switch (stat.key) {
      case 'activeBountiesCount':
        return { ...stat, value: data.activeBountiesCount ?? '—' }
      case 'totalEarnings':
        return { ...stat, value: formatEarnings(data.totalEarnings) }
      case 'applicationsCount':
        return { ...stat, value: data.applicationsCount ?? '—' }
      case 'successRate':
        return {
          ...stat,
          value: data.successRate == null ? '—' : `${data.successRate}%`,
        }
      case 'level':
        return { ...stat, value: data.level ?? '—' }
      case 'xp':
        return {
          ...stat,
          label: 'XP this level',
          value:
            data.xp == null || data.xpNextLevel == null
              ? '—'
              : `${data.xp} / ${data.xpNextLevel}`,
        }
      default:
        return stat
    }
  })
}

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState(null)
  const [activeTab, setActiveTab] = useState('Overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      const [profileResult, statsResult] = await Promise.allSettled([
        getProfile(),
        getDashboardStats(),
      ])

      if (!mounted) return

      if (profileResult.status === 'fulfilled') {
        setProfile(profileResult.value?.data ?? profileResult.value ?? null)
      }
      if (statsResult.status === 'fulfilled') {
        setStats(statsResult.value?.data ?? statsResult.value ?? null)
      }
      setLoading(false)
    }

    loadProfile()
    return () => {
      mounted = false
    }
  }, [])

  const handleUpdateProfile = useCallback(async (data) => {
    const result = await updateProfile(data)
    const updatedProfile = result?.data ?? result
    setProfile((current) => ({ ...current, ...updatedProfile }))
  }, [])

  if (loading && !profile) {
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50 p-6">
        <div
          className="h-8 w-8 animate-spin rounded-full border-3 border-[#009966] border-t-transparent"
          role="status"
          aria-label="Loading profile"
        />
      </div>
    )
  }

  return (
    <div className="profile-page flex min-h-full flex-col gap-1 bg-gray-50 p-3 sm:p-6">
      <ProfileCard
        profile={profile}
        stats={buildProfileStats(stats)}
        onUpdateProfile={handleUpdateProfile}
      />
      <OverviewContent activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
