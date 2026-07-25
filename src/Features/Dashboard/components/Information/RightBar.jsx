import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  ArrowRight,
  DollarSign,
  FileText,
  Target,
  MessageCircle,
  Trophy,
} from 'lucide-react'
import { getDashboardStats, getActivities } from '../../../services/profile'
import { getTopCreators } from '../../../services/bounties'
import { toast } from 'sonner'

const activityIcons = {
  'bounty.created': { icon: Target, color: 'text-[#155DFC]' },
  'bounty.applied': { icon: FileText, color: 'text-[#E17100]' },
  'bounty.completed': { icon: DollarSign, color: 'text-[#009966]' },
  'application.status': { icon: MessageCircle, color: 'text-[#9810FA]' },
}

const fallbackIcons = [
  { icon: DollarSign, color: 'text-[#009966]' },
  { icon: FileText, color: 'text-[#E17100]' },
  { icon: Target, color: 'text-[#155DFC]' },
  { icon: MessageCircle, color: 'text-[#9810FA]' },
]

const roleLabels = {
  USER: 'User',
  BOUNTY_HUNTER: 'Builder',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin',
}

const Information = () => {
  const user = useSelector((state) => state.auth.user)
  const [stats, setStats] = useState(null)
  const [creators, setCreators] = useState([])
  const [activities, setActivities] = useState([])

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data || res))
      .catch(() => {})
    getTopCreators()
      .then((res) => setCreators(res.data || []))
      .catch(() => toast.error('Failed to load top creators'))
    getActivities()
      .then((res) => setActivities(res.data || []))
      .catch(() => {})
  }, [])

  const level = stats?.level || 5
  const xp = stats?.xp || 0
  const xpNext = stats?.xpNextLevel || 2500
  const progress = xpNext > 0 ? Math.min((xp / xpNext) * 100, 100) : 0

  const getActivityIcon = (description, index) => {
    const matched = activityIcons[description]
    if (matched) return matched
    return fallbackIcons[index % fallbackIcons.length]
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full rounded-2xl bg-[#006045] flex flex-col space-y-4 p-4">
        <div className="flex flex-row space-x-3 items-center">
          <div className="w-10 h-10 rounded-full bg-[#007A55] flex items-center justify-center text-white text-sm font-semibold">
            {initials}
          </div>
          <div className="flex flex-col hover:cursor-pointer hover:underline hover:text-[#009966]">
            <span className="text-lg text-[#FFFFFF]">{user?.fullName || 'User'}</span>
            <span className="text-sm text-[#A4F4CF]">{roleLabels[user?.type] || 'User'}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex flex-row justify-between">
            <span className="text-sm text-[#FFFFFF]">Level {level}</span>
            <span className="text-sm text-[#FFFFFF]">{xp} / {xpNext} XP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#007A55]">
            <div
              className="h-full rounded-full bg-[#FFFFFF] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col border border-[#E5E7EB] rounded-2xl space-y-3 p-3">
        <div className="flex flex-row justify-between items-center">
          <span className="text-base text-[#0A0A0A] font-semibold flex items-center gap-1.5">
            <Trophy size={16} className="text-[#009966]" />
            Top bounty creators
          </span>
        </div>

        {creators.length === 0 ? (
          <div className="py-4 text-center text-xs text-[#9CA3AF]">No data yet</div>
        ) : (
          <ul className="flex flex-col space-y-3">
            {creators.slice(0, 5).map((creator, i) => (
              <li key={creator.id} className="flex flex-row space-x-2 items-center">
                <span className="text-sm text-[#4A5565] w-4 shrink-0">{i + 1}.</span>
                <div className="w-8 h-8 rounded-full bg-[#009966] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {creator.name?.charAt(0) || '?'}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-base text-[#0A0A0A] hover:cursor-pointer hover:underline hover:text-[#009966] truncate">
                    {creator.name}
                  </span>
                  <span className="text-xs text-[#4A5565]">
                    {creator.bountyCount} bounties · {creator.totalPaid} paid
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col border border-[#E5E7EB] rounded-2xl space-y-3 p-3">
        <span className="text-lg text-[#0A0A0A] font-semibold">Recent Activity</span>

        {activities.length === 0 ? (
          <div className="py-4 text-center text-xs text-[#9CA3AF]">No recent activity</div>
        ) : (
          <ul className="flex flex-col space-y-3">
            {activities.slice(0, 5).map((item, index) => {
              const { icon: Icon, color } = getActivityIcon(item.description, index)
              return (
                <li key={item.id} className="flex flex-row gap-2 justify-between items-start">
                  <div className="flex flex-row gap-2 items-start">
                    <Icon size={18} className={`${color} shrink-0 mt-0.5`} />
                    <span className="text-sm text-[#0A0A0A] hover:cursor-pointer hover:underline hover:text-[#009966]">
                      {item.description}
                    </span>
                  </div>
                  <span className="text-xs text-[#4A5565] shrink-0">{item.timestamp}</span>
                </li>
              )
            })}
          </ul>
        )}

        {activities.length > 5 && (
          <div className="flex flex-row items-center justify-center gap-1 cursor-pointer">
            <span className="text-sm text-[#009966]">View all</span>
            <ArrowRight size={14} className="text-[#009966]" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Information
