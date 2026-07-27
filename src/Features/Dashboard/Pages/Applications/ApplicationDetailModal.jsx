import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Calendar, User, DollarSign, Tag, ArrowUpRight, Briefcase, Award, Image, ExternalLink } from 'lucide-react'
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
  const navigate = useNavigate()
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

  const applicant = detail?.applicant

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#0A0A0A]">Applicant Profile</h2>
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

            {/* Applicant Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#34A563] flex items-center justify-center text-white text-lg font-bold shrink-0 overflow-hidden">
                {applicant?.avatarUrl ? (
                  <img src={applicant.avatarUrl} alt={applicant.fullName} className="w-full h-full object-cover" />
                ) : (
                  applicant?.fullName?.charAt(0) || '?'
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[#0A0A0A] truncate">{applicant?.fullName || 'Unknown'}</h3>
                {applicant?.userName && (
                  <p className="text-sm text-[#4A5565]">@{applicant.userName}</p>
                )}
                {applicant?.bio && (
                  <p className="text-sm text-[#4A5565] mt-1 leading-relaxed">{applicant.bio}</p>
                )}
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${(rawStatusStyles[detail.status] || rawStatusStyles.pending).bg} ${(rawStatusStyles[detail.status] || rawStatusStyles.pending).text}`}>
                {rawStatusLabels[detail.status] || detail.status}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg">
                <Briefcase size={16} className="text-[#4A5565] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#6B7280]">Experience</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{detail.bounty?.difficulty || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg">
                <Award size={16} className="text-[#4A5565] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#6B7280]">Completed</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{applicant?.completedBounties || 0} bounty{(applicant?.completedBounties || 0) !== 1 ? 'ies' : 'y'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg">
                <Calendar size={16} className="text-[#4A5565] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#6B7280]">Joined</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{applicant?.joinedAt ? new Date(applicant.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Bounty Info */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D0FAE5] flex items-center justify-center shrink-0">
                  <DollarSign size={18} className="text-[#009966]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A0A0A]">{detail.bounty?.title}</p>
                  <p className="text-xs text-[#4A5565]">
                    {detail.bounty?.rewardAmount} {detail.bounty?.rewardToken} &middot; {detail.bounty?.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            {detail.coverLetter && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#0A0A0A] flex items-center gap-1.5">
                  <Tag size={14} className="text-[#4A5565]" />
                  Cover Letter
                </h4>
                <p className="text-sm text-[#4A5565] leading-relaxed bg-gray-50 rounded-lg p-4">{detail.coverLetter}</p>
              </div>
            )}

            {/* Past Bounties / Proof of Work */}
            {applicant?.submissions?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#0A0A0A] flex items-center gap-1.5">
                  <Award size={14} className="text-[#4A5565]" />
                  Past Work ({applicant.submissions.length})
                </h4>
                <div className="space-y-2">
                  {applicant.submissions.map((sub) => (
                    <div key={sub.id} className="border border-gray-200 rounded-xl p-3">
                      <p className="text-sm font-medium text-[#0A0A0A]">{sub.bountyTitle}</p>
                      {sub.message && (
                        <p className="text-xs text-[#4A5565] mt-1 line-clamp-2">{sub.message}</p>
                      )}
                      {sub.attachments?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {sub.attachments.map((url, i) => (
                            url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) ? (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={url}
                                  alt={`Proof of work ${i + 1}`}
                                  className="w-16 h-16 rounded-lg object-cover border border-gray-200 hover:opacity-80 transition-opacity"
                                />
                              </a>
                            ) : (
                              <a
                                key={i}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[#009966] bg-[#D0FAE5] px-2 py-1 rounded-md hover:underline"
                              >
                                <Image size={12} />
                                File {i + 1}
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!applicant?.submissions || applicant.submissions.length === 0) && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#0A0A0A] flex items-center gap-1.5">
                  <Award size={14} className="text-[#4A5565]" />
                  Past Work
                </h4>
                <p className="text-sm text-[#4A5565] bg-gray-50 rounded-lg p-4">No past completed work to show.</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-[#4A5565] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              {applicant?.id && (
                <button
                  onClick={() => {
                    onClose()
                    navigate(`/profile/${applicant.id}`)
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#009966] rounded-lg hover:bg-[#007A55] transition-colors cursor-pointer"
                >
                  View Profile
                  <ExternalLink size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationDetailModal
