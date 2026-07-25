import { useState, useEffect } from 'react'
import { X, Calendar, User, DollarSign, Tag, Clock, ArrowUpRight } from 'lucide-react'
import { getApplicationById } from '../../../../services/applications'
import { toast } from 'sonner'

const rawStatusLabels = {
  pending: 'Pending Review',
  under_review: 'In Review',
  shortlisted: 'Shortlisted',
  accepted: 'In Progress',
  rejected: 'Not Selected',
}

const rawStatusStyles = {
  pending: { bg: 'bg-[#FEF3C6]', text: 'text-[#BB4D00]' },
  under_review: { bg: 'bg-[#EDE9FE]', text: 'text-[#6D28D9]' },
  shortlisted: { bg: 'bg-[#EDE9FE]', text: 'text-[#6D28D9]' },
  accepted: { bg: 'bg-[#D0FAE5]', text: 'text-[#007A55]' },
  rejected: { bg: 'bg-[#FFE2E2]', text: 'text-[#C10007]' },
}

const ApplicationDetailModal = ({ applicationId, onClose }) => {
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!applicationId) return
    setLoading(true)
    getApplicationById(applicationId)
      .then((res) => setDetail(res.data || res))
      .catch((err) => toast.error(err.message || 'Failed to load details'))
      .finally(() => setLoading(false))
  }, [applicationId])

  if (!applicationId) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#0A0A0A]">Application Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer p-1">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !detail ? (
          <div className="py-12 text-center text-gray-400 text-sm">Failed to load details</div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-xl font-bold text-[#0A0A0A]">{detail.bounty?.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${(rawStatusStyles[detail.status] || rawStatusStyles.pending).bg} ${(rawStatusStyles[detail.status] || rawStatusStyles.pending).text}`}>
                    {rawStatusLabels[detail.status] || detail.status}
                  </span>
                  {detail.bounty?.difficulty && (
                    <span className="text-xs text-[#4A5565] bg-[#F3F4F6] px-2 py-1 rounded-full">{detail.bounty.difficulty}</span>
                  )}
                  {detail.bounty?.category && (
                    <span className="text-xs text-[#4A5565] bg-[#F3F4F6] px-2 py-1 rounded-full">{detail.bounty.category}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-9 h-9 rounded-full bg-[#D0FAE5] flex items-center justify-center shrink-0">
                  <DollarSign size={16} className="text-[#009966]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Reward</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{detail.bounty?.rewardAmount} {detail.bounty?.rewardToken}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-9 h-9 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
                  <User size={16} className="text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Creator</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{detail.bounty?.creatorName || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-9 h-9 rounded-full bg-[#EDE9FE] flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-[#6D28D9]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Applied On</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{detail.createdAt ? new Date(detail.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-9 h-9 rounded-full bg-[#FEF3C6] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#BB4D00]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Proposed Amount</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{detail.proposedAmount ? `$${detail.proposedAmount}` : 'Not specified'}</p>
                </div>
              </div>
            </div>

            {detail.coverLetter && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#0A0A0A] flex items-center gap-1.5">
                  <Tag size={14} className="text-[#4A5565]" />
                  Cover Letter
                </h4>
                <p className="text-sm text-[#4A5565] leading-relaxed bg-gray-50 rounded-lg p-4">{detail.coverLetter}</p>
              </div>
            )}

            {detail.bounty?.description && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#0A0A0A]">Bounty Description</h4>
                <p className="text-sm text-[#4A5565] leading-relaxed">{detail.bounty.description}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-[#4A5565] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              {detail.bounty?.id && (
                <a
                  href={`/dashboard/bounties/${detail.bounty.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#009966] rounded-lg hover:bg-[#007A55] transition-colors"
                >
                  View Bounty
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationDetailModal
