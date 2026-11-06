import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  DollarSign,
  Edit3,
  FileText,
  Medal,
  Share2,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import {
  getActivities,
  getDashboardStats,
  getProfile,
  updateProfile,
} from '../../../../services/profile'
import { getMyBounties } from '../../../../services/bounties'
import ProfileCard from './ProfileCard'
import OverviewContent from './OverviewContent'
import StatCards from './components/StatCards'
import EditProfileModal from './components/EditProfileModal'
import {
  formatCurrency,
  getProfileCompleteness,
  toNumber,
} from './profileUtils'

function buildMetricCards(stats) {
  const earningsGrowth = toNumber(stats?.earningsChangePercent)
  const successGrowth = toNumber(stats?.successRateChangePercent)
  const level = Math.max(1, toNumber(stats?.level))
  const xp = toNumber(stats?.xp)
  const xpNext = toNumber(stats?.xpNextLevel)

  const growthContent = (value) => (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        value >= 0 ? 'text-[#00B87C]' : 'text-[#EF4444]'
      }`}
    >
      <TrendingUp
        size={12}
        className={value >= 0 ? '' : 'rotate-180'}
        aria-hidden="true"
      />
      {value >= 0 ? '+' : ''}
      {value}% this month
    </span>
  )

  return [
    {
      label: 'Active bounties',
      value: toNumber(stats?.activeBountiesCount),
      subtext: 'In progress',
      icon: Target,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#3B82F6]',
    },
    {
      label: 'Total earned',
      value: formatCurrency(stats?.totalEarnings),
      subtext: growthContent(earningsGrowth),
      icon: DollarSign,
      iconBg: 'bg-[#E6F8F2]',
      iconColor: 'text-[#00B87C]',
    },
    {
      label: 'Applications',
      value: toNumber(stats?.applicationsCount),
      subtext: 'Total submitted',
      icon: FileText,
      iconBg: 'bg-[#F5F3FF]',
      iconColor: 'text-[#7C3AED]',
    },
    {
      label: 'Success rate',
      value: `${toNumber(stats?.successRate)}%`,
      subtext: growthContent(successGrowth),
      icon: TrendingUp,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#F59E0B]',
    },
    {
      label: 'Builder level',
      value: level,
      subtext: 'Your current rank',
      icon: Medal,
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#007A55]',
    },
    {
      label: 'XP this level',
      value: xp,
      subtext: xpNext > 0 ? `of ${xpNext} XP` : 'Earn XP by completing work',
      icon: Zap,
      iconBg: 'bg-[#FFF7ED]',
      iconColor: 'text-[#EA580C]',
    },
  ]
}

function ProfileSkeleton() {
  return (
    <div
      className="flex min-h-full flex-col gap-6 bg-gray-50 p-3 sm:p-6"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-gray-200 md:w-36" />
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-gray-200 md:w-32" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="h-28 animate-pulse bg-gray-200 sm:h-36" />
        <div className="px-4 pb-6 sm:px-6">
          <div className="-mt-12 h-24 w-24 animate-pulse rounded-full border-4 border-white bg-gray-300 sm:-mt-14 sm:h-28 sm:w-28" />
          <div className="mt-4 h-5 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
          <div className="mt-5 h-16 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
          >
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 h-7 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="h-14 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm" />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="h-64 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm" />
        <div className="h-64 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm" />
      </div>
    </div>
  )
}

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState(null)
  const [activities, setActivities] = useState([])
  const [bounties, setBounties] = useState({ created: [], assigned: [] })
  const [activeTab, setActiveTab] = useState('Overview')
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [sharing, setSharing] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      const [profileResult, statsResult, activitiesResult, bountiesResult] =
        await Promise.allSettled([
          getProfile(),
          getDashboardStats(),
          getActivities(),
          getMyBounties(),
        ])

      if (!mounted) return

      if (profileResult.status === 'fulfilled') {
        setProfile(profileResult.value?.data ?? profileResult.value ?? null)
      }
      if (statsResult.status === 'fulfilled') {
        setStats(statsResult.value?.data ?? statsResult.value ?? null)
      }
      if (activitiesResult.status === 'fulfilled') {
        const data = activitiesResult.value?.data ?? activitiesResult.value
        setActivities(Array.isArray(data) ? data : [])
      }
      if (bountiesResult.status === 'fulfilled') {
        const data = bountiesResult.value?.data ?? bountiesResult.value
        setBounties({
          created: data?.created || [],
          assigned: data?.assigned || [],
        })
      }

      setLoading(false)
    }

    loadProfile()
    return () => {
      mounted = false
    }
  }, [])

  const handleSaveProfile = useCallback(async (data) => {
    const result = await updateProfile(data)
    const updatedProfile = result?.data ?? result
    setProfile((current) => ({ ...current, ...updatedProfile }))
    toast.success('Profile updated successfully')
  }, [])

  const handleShare = useCallback(async () => {
    try {
      setSharing(true)
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Profile link copied to clipboard')
    } catch {
      toast.error('Could not copy profile link')
    } finally {
      setSharing(false)
    }
  }, [])

  const completeness = useMemo(() => getProfileCompleteness(profile), [profile])
  const metricCards = useMemo(() => buildMetricCards(stats), [stats])

  if (loading && !profile) {
    return <ProfileSkeleton />
  }

  return (
    <div className="profile-page flex min-h-full flex-col gap-6 bg-gray-50 p-3 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#111827]">
            Profile
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Manage your public profile and account details
          </p>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <button
            type="button"
            onClick={handleShare}
            disabled={sharing}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#4B5563] shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009966] disabled:cursor-wait disabled:opacity-60 md:flex-none"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            {sharing ? 'Copying…' : 'Share profile'}
          </button>
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00B87C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#009966] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006045] md:flex-none"
          >
            <Edit3 className="h-4 w-4" aria-hidden="true" />
            Edit profile
          </button>
        </div>
      </div>

      <ProfileCard
        profile={profile}
        completeness={completeness}
        onEdit={() => setEditOpen(true)}
      />

      <StatCards stats={metricCards} />

      <OverviewContent
        activeTab={activeTab}
        onTabChange={setActiveTab}
        profile={profile}
        stats={stats}
        bounties={bounties}
        activities={activities}
        onEdit={() => setEditOpen(true)}
      />

      {editOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}
