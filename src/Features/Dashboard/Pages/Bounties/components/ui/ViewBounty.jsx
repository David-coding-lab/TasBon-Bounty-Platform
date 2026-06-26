import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Circle,
  Clock,
  User,
  Tag,
  DollarSign,
  Award,
} from 'lucide-react'
import { toast } from 'sonner'
import { fetchBountyById } from '../../../../../../pages/Bounties/Api/bounties'

export default function ViewBounty() {
  const { bountyId } = useParams()
  const navigate = useNavigate()
  const [bounty, setBounty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bountyId) return
    setLoading(true)
    fetchBountyById(bountyId)
      .then((res) => setBounty(res.data))
      .catch((err) => toast.error(err.message || 'Failed to load bounty'))
      .finally(() => setLoading(false))
  }, [bountyId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!bounty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500 text-lg">Bounty not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-emerald-600 font-medium hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to bounties
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to bounties
      </button>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {bounty.imageUrl && (
          <img
            src={bounty.imageUrl || bounty.clientAvatar}
            alt={bounty.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {bounty.category || 'General'}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">
                {bounty.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{bounty.clientName || 'Anonymous'}</span>
                </div>
                {bounty.difficulty && (
                  <div className="flex items-center gap-1">
                    <Award size={14} />
                    <span>{bounty.difficulty}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-600">
                ${bounty.rewardAmount} {bounty.rewardToken}
              </p>
              <p className="text-sm text-gray-500 mt-1">Reward</p>
            </div>
          </div>

          {bounty.description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {bounty.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 pt-6">
            {bounty.category && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Tag size={16} className="text-gray-400" />
                <span>{bounty.category}</span>
              </div>
            )}
            {bounty.difficulty && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Circle size={16} className="text-gray-400" />
                <span>{bounty.difficulty}</span>
              </div>
            )}
            {bounty.rewardAmount && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign size={16} className="text-gray-400" />
                <span>
                  ${bounty.rewardAmount} {bounty.rewardToken}
                </span>
              </div>
            )}
            {bounty.deadline && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-gray-400" />
                <span>{new Date(bounty.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors cursor-pointer">
              Apply for this bounty
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer">
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
