import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  ArrowLeft,
  Clock,
  Copy,
  Check,
  RefreshCw,
  Users,
  Image,
  FileArchive,
  Music,
  Link as LinkIcon,
  Bookmark,
  Share2,
  Calendar,
  Paperclip,
  FileMinus,
  Download,
  ArrowRight,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  fetchBountyById,
  submitBountyWork,
  applyForBounty,
  getSimilarBounties,
  listBounties,
} from '../../../../../../pages/Bounties/Api/bounties'
import {
  getDashboardStats,
  getPublicProfile,
} from '../../../../../../services/profile'
import {
  getBookmarks,
  createBookmark,
  deleteBookmark,
} from '../../../../../../services/bookmarks'

const LEVEL_TITLES = {
  1: 'Builder',
  2: 'Builder',
  3: 'Skilled Builder',
  4: 'Skilled Builder',
  5: 'Expert Builder',
  6: 'Expert Builder',
  7: 'Master Builder',
  8: 'Master Builder',
  9: 'Elite Builder',
  10: 'Elite Builder',
}

const getLevelTitle = (level) => LEVEL_TITLES[level] || 'Builder'
import TaskDetails from './TaskDetails'
import AboutCreator from './AboutCreator'
import GroupPhoto from '../../../../Assets/bountyIconLarge.png'
import ApplyBountyModal from './ApplyBountyModal'
import ApplicationPendingModal from './ApplicationPendingModal'
import SubmissionReceivedModal from './SubmissionReceivedModal'
import ShareBountyModal from './ShareBountyModal'

export default function ViewBounty() {
  const { bountyId } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const [reviewStatus, setReviewStatus] = useState(null)
  const [bounty, setBounty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [similarBounties, setSimilarBounties] = useState([])
  const [creatorProfile, setCreatorProfile] = useState(null)
  const [creatorRecentBounties, setCreatorRecentBounties] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmissionReceivedOpen, setIsSubmissionReceivedOpen] =
    useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [inviteCode, setInviteCode] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkId, setBookmarkId] = useState(null)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [userLevel, setUserLevel] = useState(null)

  const userLevelTitle = userLevel
    ? `Level ${userLevel} - ${getLevelTitle(userLevel)}`
    : ''

  const handleOpen = (state) => state(true)
  const handleClose = (state) => state(false)

  const handleApply = async (data) => {
    if (user?.id === bounty?.creatorId) {
      toast.error('You cannot apply to your own bounty')
      return
    }
    setIsApplying(true)
    try {
      const res = await applyForBounty(bountyId, data)
      handleClose(setIsModalOpen)
      const appStatus =
        res.data?.status || res.data?.applicationStatus || 'pending'
      setReviewStatus(appStatus)
      setBounty((prev) => {
        const serverCount = res.data?.applicationsCount
        return {
          ...prev,
          ...(res.data || {}),
          applicationsCount: serverCount ?? (prev?.applicationsCount || 0) + 1,
        }
      })
      setIsPendingModalOpen(true)
    } catch (error) {
      toast.error(error.message || 'Failed to apply')
    } finally {
      setIsApplying(false)
    }
  }

  const handleSubmitBounty = async () => {
    if (!submissionMessage.trim()) {
      setSubmitError('Please describe the work you have completed')
      return
    }
    if (submissionMessage.trim().length < 10) {
      setSubmitError('Description must be at least 10 characters')
      return
    }
    setSubmitError('')
    setIsSubmitting(true)
    try {
      const res = await submitBountyWork(bountyId, {
        message: submissionMessage,
      })
      handleClose(setIsSubmitModalOpen)
      setSubmissionMessage('')
      setSubmissionResult(res.data || res)
      setIsSubmissionReceivedOpen(true)
    } catch (error) {
      toast.error(error.message || 'Failed to submit work')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!bountyId) return
    setLoading(true)
    Promise.all([
      fetchBountyById(bountyId),
      getSimilarBounties(bountyId),
      getDashboardStats(),
    ])
      .then(([bountyRes, similarRes, statsRes]) => {
        setUserLevel(statsRes.data?.level || null)
        const bountyData = bountyRes.data
        setBounty(bountyData)
        setInviteCode(bountyData.inviteCode || null)
        setSimilarBounties(similarRes.data || [])
        if (bountyData?.applicationStatus) {
          setReviewStatus(bountyData.applicationStatus)
        }
        if (bountyData?.creatorId) {
          getPublicProfile(bountyData.creatorId)
            .then((profileRes) => setCreatorProfile(profileRes.data))
            .catch(() => {})
          listBounties({
            creatorId: bountyData.creatorId,
            status: 'completed',
            limit: 3,
          })
            .then((res) => setCreatorRecentBounties(res.bounties || []))
            .catch(() => {})
        }
      })
      .catch((err) => toast.error(err.message || 'Failed to load bounty'))
      .finally(() => setLoading(false))
  }, [bountyId])

  useEffect(() => {
    if (!user || !bountyId) return
    getBookmarks(1, 100)
      .then((res) => {
        const items = res.bookmarks || []
        const found = items.find(
          (b) => b.entityType === 'bounty' && b.entityId === bountyId,
        )
        if (found) {
          setIsBookmarked(true)
          setBookmarkId(found.id)
        }
      })
      .catch(() => {})
  }, [user, bountyId])

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast.error('Please sign in to bookmark')
      return
    }
    setBookmarkLoading(true)
    try {
      if (isBookmarked && bookmarkId) {
        await deleteBookmark(bookmarkId)
        setIsBookmarked(false)
        setBookmarkId(null)
        toast.success('Bookmark removed')
      } else {
        const res = await createBookmark({
          entityType: 'bounty',
          entityId: bountyId,
        })
        const data = res.data?.data || res.data
        setIsBookmarked(true)
        setBookmarkId(data.id)
        toast.success('Bounty bookmarked')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update bookmark')
    } finally {
      setBookmarkLoading(false)
    }
  }

  const formattedDueDate = bounty?.dueDate
    ? new Date(bounty.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const formattedDueDateTime = bounty?.dueDate
    ? `${new Date(bounty.dueDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      })} (UTC)`
    : ''

  const workDurationDays =
    bounty?.dueDate && bounty?.applicationDeadline
      ? Math.ceil(
          (new Date(bounty.dueDate) - new Date(bounty.applicationDeadline)) /
            (1000 * 60 * 60 * 24),
        )
      : null

  const isBountyDeadlinePassed = bounty?.dueDate
    ? new Date(bounty.dueDate) < new Date()
    : false
  const isApplyDeadlinePassed = bounty?.applicationDeadline
    ? new Date(bounty.applicationDeadline) < new Date()
    : false
  const isOwnBounty = user?.id === bounty?.creatorId

  const parseDeliverable = (item) => {
    try {
      return JSON.parse(item)
    } catch {
      return { type: 'link', description: item }
    }
  }

  const deliverableTypeIcon = (type) => {
    switch (type) {
      case 'image':
        return <Image size={18} className="text-[#34A563] shrink-0" />
      case 'zip':
        return <FileArchive size={18} className="text-[#E17100] shrink-0" />
      case 'audio':
        return <Music size={18} className="text-[#6D28D9] shrink-0" />
      case 'link':
        return <LinkIcon size={18} className="text-[#155DFC] shrink-0" />
      default:
        return <LinkIcon size={18} className="text-[#155DFC] shrink-0" />
    }
  }

  const taskDetails = [
    {
      icon: 'Info',
      title: 'About the project',
      description: bounty?.description || 'No description provided.',
    },
    {
      icon: 'CheckSquare',
      title: 'Deliverables',
      component: bounty?.deliverables?.length ? (
        <div className="flex flex-col gap-2">
          {bounty.deliverables.map((item, idx) => {
            const del = parseDeliverable(item)
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-[#f8fafc] rounded-lg border border-[#e8ecf1]"
              >
                {deliverableTypeIcon(del.type)}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-[#34A563] uppercase tracking-wide">
                    {del.type}
                  </span>
                  <p className="text-sm text-[#1a2a41] mt-0.5">
                    {del.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-sm text-[#4A5565]">No deliverables listed.</p>
      ),
    },
    {
      icon: 'ClipboardList',
      title: 'Requirements',
      description: bounty?.skills?.length
        ? `Required skills: ${bounty.skills.join(', ')}`
        : 'No specific requirements listed.',
    },
  ]

  const bountyMeta = {
    applications: `${bounty?.applicationsCount || bounty?.applications?.length || 0} Applications`,
    experience_level: bounty?.difficulty || bounty?.level || 'Intermediate',
    category: bounty?.category || bounty?.categoryName || 'General',
    posted: bounty?.createdAt
      ? new Date(bounty.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Recently',
    bounty_id: bountyId ? `#${bountyId.slice(-8).toUpperCase()}` : '',
  }

  const metaLabels = {
    applications: 'Applications',
    experience_level: 'Experience Level',
    category: 'Category',
    posted: 'Posted',
    bounty_id: 'Bounty ID',
  }

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
    <main className="mx-auto flex min-h-screen w-full min-w-0 flex-col overflow-x-clip bg-[#ffffff] px-5 pb-10 pt-2 sm:px-8 sm:pt-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-lg px-1 py-2 text-sm text-gray-500 transition-colors cursor-pointer hover:text-emerald-600 sm:mb-6 sm:pt-10"
      >
        <ArrowLeft size={16} color="#34A563" /> Back to bounties
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6"
          onClick={() => handleClose(setIsModalOpen)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-md"
          >
            <ApplyBountyModal
              bounty={bounty}
              userLevelTitle={userLevelTitle}
              onCancel={() => handleClose(setIsModalOpen)}
              onApply={handleApply}
              isApplying={isApplying}
            />
          </div>
        </div>
      )}

      {isPendingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6"
          onClick={() => handleClose(setIsPendingModalOpen)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-md"
          >
            <ApplicationPendingModal
              bounty={bounty}
              onContinueExploring={() => handleClose(setIsPendingModalOpen)}
            />
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6"
          onClick={() => !isSubmitting && handleClose(setIsSubmitModalOpen)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Submit Your Work
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Add a message describing what you've completed.
            </p>
            <textarea
              className={`w-full border rounded-xl p-4 text-sm resize-none h-32 outline-none focus:ring-1 ${
                submitError
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500'
              }`}
              placeholder="Describe the work you've done, any notes for the reviewer..."
              value={submissionMessage}
              onChange={(e) => {
                setSubmissionMessage(e.target.value)
                setSubmitError('')
              }}
              disabled={isSubmitting}
            />
            {submitError && (
              <p className="text-red-500 text-xs mt-1">{submitError}</p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleClose(setIsSubmitModalOpen)}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitBounty}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Work'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmissionReceivedOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6"
          onClick={() => handleClose(setIsSubmissionReceivedOpen)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-md"
          >
            <SubmissionReceivedModal
              bounty={bounty}
              submission={submissionResult}
              onContinueExploring={() => {
                handleClose(setIsSubmissionReceivedOpen)
                navigate(-1)
              }}
              onViewApplication={() => handleClose(setIsSubmissionReceivedOpen)}
            />
          </div>
        </div>
      )}
      <div className="flex w-full min-w-0 flex-col space-y-8">
        <div className="flex min-w-0 flex-col space-y-3">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <h1 className="min-w-0 w-full flex-1 text-xl font-bold break-words text-[#101820] sm:min-w-[200px] sm:text-3xl lg:text-4xl">
              {bounty.title}
            </h1>

            <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
              <button
                onClick={handleBookmarkToggle}
                disabled={bookmarkLoading}
                aria-label="Bookmark bounty"
                className="cursor-pointer rounded-lg p-2 disabled:opacity-50 hover:bg-gray-100"
              >
                <Bookmark
                  width={20}
                  fill={isBookmarked ? '#34A563' : 'none'}
                  stroke={isBookmarked ? '#34A563' : 'currentColor'}
                />
              </button>

              <div
                className="flex cursor-pointer flex-row items-center gap-1.5 rounded-lg px-2 py-2 hover:bg-gray-100"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 width={18} />
                <p className="text-sm font-bold sm:text-lg">share</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3">
            <div className="whitespace-nowrap rounded-xl border border-[#E5E7EB] bg-[#E6F6E2] p-1 px-3 text-xs text-[#34A563] sm:px-4 sm:text-base">
              {bounty?.category || bounty?.categoryName || 'General'}
            </div>
            <div className="whitespace-nowrap rounded-xl border border-[#E5E7EB] bg-[#E6F6E2] p-1 px-3 text-xs text-[#34A563] sm:px-4 sm:text-base">
              <span className="text-[#383838]">
                {bounty?.difficulty || bounty?.level || 'Intermediate'}
              </span>
            </div>
            <div className="whitespace-nowrap rounded-xl border border-[#E5E7EB] bg-[#E6F6E2] p-1 px-3 text-xs text-[#34A563] sm:px-4 sm:text-base">
              <span className="text-[#383838]">
                {workDurationDays
                  ? `${workDurationDays} Days`
                  : bounty?.workDuration || 'Flexible'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full min-w-0 max-w-7xl flex-col gap-8 lg:flex-row lg:gap-0 lg:space-x-8">
          <div className="flex min-w-0 flex-1 flex-col space-y-8 lg:pr-8 xl:pr-15">
            <div className="flex flex-col space-y-6">
              {taskDetails.map((taskDetail, index) => (
                <TaskDetails
                  key={index}
                  icon={taskDetail.icon}
                  title={taskDetail.title}
                  description={taskDetail.description}
                  component={taskDetail.component}
                />
              ))}
            </div>

            <div className="flex min-w-0 flex-row items-start gap-3 sm:gap-4">
              <div className="pt-1 shrink-0 sm:pt-2">
                <Calendar color="#34A563" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col space-y-4">
                <h1 className="text-lg font-bold text-[#000000] sm:text-xl">
                  Timeline
                </h1>

                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <div className="flex min-w-0 flex-1 flex-col space-y-2 rounded-xl border border-[#E5E7EB] p-3">
                    <p className="text-sm font-semibold text-[#616161]">
                      {reviewStatus === 'selected'
                        ? 'Deadline to Submit'
                        : 'Application Deadline'}
                    </p>
                    <p className="break-words text-base font-semibold text-[#000000] sm:text-xl">
                      {reviewStatus === 'selected'
                        ? formattedDueDate
                        : bounty?.applicationDeadline
                          ? new Date(
                              bounty.applicationDeadline,
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'N/A'}
                    </p>
                    <p className="text-sm font-medium break-words text-[#616161]">
                      {reviewStatus === 'selected'
                        ? formattedDueDateTime
                        : bounty?.applicationDeadline
                          ? `${new Date(
                              bounty.applicationDeadline,
                            ).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                              timeZone: 'UTC',
                            })} (UTC)`
                          : ''}
                    </p>
                  </div>
                  {reviewStatus !== 'selected' && (
                    <div className="flex min-w-0 flex-1 flex-col space-y-2 rounded-xl border border-[#E5E7EB] p-3">
                      <p className="text-sm font-semibold text-[#616161]">
                        Bounty Deadline
                      </p>
                      <p className="break-words text-base font-semibold text-[#000000] sm:text-xl">
                        {formattedDueDate || 'N/A'}
                      </p>
                      <p className="text-sm font-medium break-words text-[#616161]">
                        {formattedDueDateTime}
                      </p>
                    </div>
                  )}
                </div>

                {workDurationDays && (
                  <p className="text-sm text-[#616161]">
                    Estimated work period:{' '}
                    <strong>{workDurationDays} days</strong> (from application
                    deadline to bounty deadline)
                  </p>
                )}
              </div>
            </div>

            {bounty?.attachments?.length > 0 && (
              <div className="flex min-w-0 flex-row items-start gap-3 sm:gap-4">
                <div className="shrink-0 self-start pt-1 sm:pt-2">
                  <Paperclip color="#34A563" size={20} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col space-y-4 sm:space-y-6">
                  <h1 className="font-inter text-lg font-bold text-[#000000] sm:text-xl">
                    Attachments
                  </h1>

                  <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-6">
                    {bounty.attachments.map((url, index) => {
                      const fileName =
                        url.split('/').pop() || `Attachment ${index + 1}`
                      const ext = fileName.includes('.')
                        ? fileName.split('.').pop().toUpperCase()
                        : 'FILE'
                      return (
                        <div key={index} className="flex flex-col space-y-1">
                          <div className="flex flex-row items-center space-x-2">
                            <FileMinus width={18} height={18} color="#616161" />
                            <div className="flex flex-col space-y-1 min-w-0">
                              <p className="text-[#616161] text-sm sm:text-base truncate max-w-[140px] sm:max-w-[200px]">
                                {fileName}
                              </p>
                              <p className="text-[#616161] text-xs">{ext}</p>
                            </div>
                          </div>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row space-x-2 items-center text-[#34A563] text-sm hover:underline"
                          >
                            <Download width={14} height={14} />
                            <span>Download</span>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            <AboutCreator
              creatorName={bounty.clientName}
              creatorAvatar={bounty.clientAvatar}
              creatorId={bounty.creatorId}
              creatorProfile={creatorProfile}
              recentBounties={creatorRecentBounties}
            />
          </div>

          <div className="flex w-full min-w-0 flex-1 flex-col space-y-6 rounded-2xl border border-gray-100 p-4 sm:space-y-8 sm:p-6">
            <div className="flex min-w-0 flex-col space-y-4">
              <p className="text-lg font-semibold text-[#353535] sm:text-xl">
                Total Reward
              </p>
              <h1 className="break-words text-2xl font-bold text-[#34A563] sm:text-3xl">
                {bounty?.rewardAmount || bounty?.reward
                  ? `$${Number(bounty?.rewardAmount || bounty?.reward).toLocaleString()} ${bounty.rewardToken || 'USDC'}`
                  : 'N/A'}
              </h1>
              <p className="text-[#34A563] text-md w-fit bg-[#E6F6E2] rounded-sm p-1">
                {bounty?.rewardType === 'milestone'
                  ? 'Milestone'
                  : 'Fixed Price'}
              </p>

              <div className="w-full mt-5 h-px bg-gray-200" />
            </div>

            <div className="flex min-w-0 flex-col divide-y divide-gray-100">
              {Object.entries(bountyMeta).map(([key, value]) => (
                <div
                  key={key}
                  className="flex min-w-0 flex-row items-start justify-between gap-3 py-3"
                >
                  <p className="shrink-0 text-sm text-[#616161] sm:text-base">
                    {metaLabels[key]}
                  </p>
                  <p className="min-w-0 break-words text-right text-sm text-[#616161] sm:text-base">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {inviteCode && (
              <div className="flex flex-col space-y-3 p-4 bg-[#f0faf5] border border-[#34A563]/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#34A563]" />
                  <span className="text-sm font-semibold text-[#0A0A0A]">
                    Invite-only bounty
                  </span>
                </div>
                <p className="text-xs text-[#4A5565]">
                  Share this invite link to grant access:
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-[#dce1e8] rounded-lg text-sm text-[#1a2a41] font-mono truncate">
                    <span className="truncate">{`${window.location.origin}/dashboard/bounties/invite/${inviteCode}`}</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/dashboard/bounties/invite/${inviteCode}`,
                      )
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-[#34A563] text-white text-xs font-medium rounded-lg hover:bg-[#007A55] transition-colors cursor-pointer shrink-0"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={async () => {
                      setRegenerating(true)
                      try {
                        const { apiPost } =
                          await import('../../../../../../services/api')
                        const res = await apiPost(
                          `/api/v1/bounties/${bounty.id}/regenerate-invite`,
                        )
                        setInviteCode(res.data.inviteCode)
                        toast.success('New invite link generated')
                      } catch {
                        toast.error('Failed to regenerate invite link')
                      } finally {
                        setRegenerating(false)
                      }
                    }}
                    disabled={regenerating}
                    className="flex items-center gap-1 px-3 py-2 border border-[#dce1e8] text-[#4A5565] text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
                  >
                    <RefreshCw
                      size={14}
                      className={regenerating ? 'animate-spin' : ''}
                    />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-8">
              {!reviewStatus && (
                <>
                  <div className="flex flex-col space-y-3">
                    <h2 className="text-[#000000] text-lg font-bold">
                      About the reward
                    </h2>
                    <p className="text-[#616161] text-sm sm:text-lg">
                      {bounty?.rewardDescription ||
                        `The reward will be paid in ${bounty.rewardToken || 'USDC'} once the work is approved.`}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <h2 className="text-[#000000] text-lg font-bold">
                      Who can apply
                    </h2>
                    <p className="text-[#616161] text-sm sm:text-lg">
                      {bounty?.eligibility ||
                        'Anyone with the required skills and experience can apply.'}
                    </p>
                  </div>
                </>
              )}
              {reviewStatus === 'pending' && (
                <div className="flex flex-col space-y-3">
                  <h2 className="text-[#000000] text-lg font-bold">
                    Your Status
                  </h2>

                  <h3 className="text-[#F4C430] text-md font-medium">
                    Application Pending
                  </h3>
                  <p className="text-[#616161] text-sm">
                    Your application is currently under review. You will be
                    notified once a decision has been made.
                  </p>
                </div>
              )}

              {reviewStatus === 'selected' && (
                <>
                  <div className="flex flex-col space-y-3">
                    <h2 className="text-[#000000] text-lg font-bold">
                      Your Status
                    </h2>

                    <h2 className="text-[#34A563] text-md font-medium">
                      Selected
                    </h2>
                    <p className="text-[#616161] text-sm">
                      You've been selected to work on this bounty.
                    </p>
                  </div>

                  <div className="flex h-40 bg-[#F0F0F0] flex-col space-y-2 border border-gray-200 rounded-2xl p-4">
                    <p className="text-[#616161] text-sm">Work Duration</p>
                    <h3 className="text-[#000000] pb-2 text-md font-bold">
                      {workDurationDays
                        ? `${workDurationDays} Days`
                        : '14 Days'}
                    </h3>

                    <p className="text-[#616161] text-sm">Started on</p>
                    <h3 className="text-[#000000] text-md font-bold">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </h3>
                  </div>
                </>
              )}

              <button
                onClick={() =>
                  reviewStatus === 'selected'
                    ? handleOpen(setIsSubmitModalOpen)
                    : handleOpen(setIsModalOpen)
                }
                disabled={
                  reviewStatus === 'pending' ||
                  isSubmitting ||
                  isOwnBounty ||
                  (reviewStatus === 'selected'
                    ? isBountyDeadlinePassed
                    : isApplyDeadlinePassed)
                }
                className={`flex flex-row ${
                  reviewStatus === 'pending' ||
                  isSubmitting ||
                  isOwnBounty ||
                  (reviewStatus === 'selected'
                    ? isBountyDeadlinePassed
                    : isApplyDeadlinePassed)
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                } items-center justify-center space-x-3 ${
                  reviewStatus === 'selected' && !isBountyDeadlinePassed
                    ? 'bg-[#EAB308]'
                    : reviewStatus === 'pending' ||
                        isOwnBounty ||
                        (reviewStatus === 'selected'
                          ? isBountyDeadlinePassed
                          : isApplyDeadlinePassed)
                      ? 'bg-[#C5C9C7]'
                      : 'bg-[#34A563]'
                } rounded-2xl py-4 w-full`}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ArrowRight
                    color={
                      reviewStatus === 'selected' && !isBountyDeadlinePassed
                        ? '#1A1A1A'
                        : '#FFFFFF'
                    }
                  />
                )}
                <span className="font-inter text-base font-bold text-white">
                  {isOwnBounty
                    ? 'Your bounty'
                    : reviewStatus === 'pending'
                      ? 'Application Pending'
                      : reviewStatus === 'selected'
                        ? isSubmitting
                          ? 'Submitting...'
                          : 'Submit Bounty'
                        : isApplyDeadlinePassed
                          ? 'Deadline Passed'
                          : 'Apply for Bounty'}
                </span>
              </button>

              {reviewStatus === 'selected'
                ? bounty?.dueDate &&
                  (() => {
                    const now = new Date()
                    const deadline = new Date(bounty.dueDate)
                    const daysLeft = Math.ceil(
                      (deadline - now) / (1000 * 60 * 60 * 24),
                    )
                    return (
                      <div className="flex flex-row items-start gap-3 rounded-2xl border border-gray-200 p-3 sm:items-center sm:gap-4 sm:p-4">
                        <Clock
                          color="#EAB308"
                          className="h-8 w-8 shrink-0 sm:h-12 sm:w-12"
                        />
                        <div className="flex min-w-0 flex-col space-y-1 sm:space-y-2">
                          <p className="text-sm font-bold text-[#000000] sm:text-base">
                            {daysLeft > 0
                              ? `${daysLeft} day${daysLeft > 1 ? 's' : ''} left to submit`
                              : 'Submission closed'}
                          </p>
                          <p className="break-words text-sm text-[#616161] sm:text-base">
                            Submission closes on{' '}
                            {deadline.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}{' '}
                            at{' '}
                            {deadline.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                              timeZone: 'UTC',
                            })}{' '}
                            (UTC)
                          </p>
                        </div>
                      </div>
                    )
                  })()
                : bounty?.applicationDeadline &&
                  (() => {
                    const now = new Date()
                    const deadline = new Date(bounty.applicationDeadline)
                    const daysLeft = Math.ceil(
                      (deadline - now) / (1000 * 60 * 60 * 24),
                    )
                    return (
                      <div className="flex flex-row items-start gap-3 rounded-2xl border border-gray-200 p-3 sm:items-center sm:gap-4 sm:p-4">
                        <Clock
                          color="#34A563"
                          className="h-8 w-8 shrink-0 sm:h-12 sm:w-12"
                        />
                        <div className="flex min-w-0 flex-col space-y-1 sm:space-y-2">
                          <p className="text-sm font-bold text-[#000000] sm:text-base">
                            {daysLeft > 0
                              ? `${daysLeft} day${daysLeft > 1 ? 's' : ''} left to apply`
                              : 'Application closed'}
                          </p>
                          <p className="break-words text-sm text-[#616161] sm:text-base">
                            Application closes on{' '}
                            {deadline.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}{' '}
                            at{' '}
                            {deadline.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                              timeZone: 'UTC',
                            })}{' '}
                            (UTC)
                          </p>
                        </div>
                      </div>
                    )
                  })()}
            </div>

            {similarBounties.length > 0 && (
              <div className="flex flex-col space-y-4 border border-gray-200 rounded-2xl p-4">
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-[#000000] text-lg font-bold">
                    Similar bounties
                  </h2>
                  <button className="flex flex-row items-center space-x-1">
                    <Link
                      to="/dashboard/bounties"
                      className="text-primary cursor-pointer text-base font-medium"
                    >
                      <span className="text-primary cursor-pointer text-base font-medium">
                        View all
                      </span>
                    </Link>
                    <ChevronRight color="#34A563" className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-col divide-y gap-2 divide-gray-100">
                  {similarBounties.map((item, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer flex-row items-center justify-between py-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => navigate(`/dashboard/bounties/${item.id}`)}
                    >
                      <div className="flex flex-row items-center space-x-3 min-w-0">
                        <img
                          src={item.imageUrl || GroupPhoto}
                          alt={item.title}
                          className="h-12 w-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex flex-col space-y-1 min-w-0">
                          <p className="text-[#000000] text-md font-medium truncate">
                            {item.title}
                          </p>
                          <div className="flex flex-row items-center gap-2">
                            <span className="text-[#616161] text-sm font-bold whitespace-nowrap">
                              {item.rewardAmount
                                ? `$${Number(item.rewardAmount).toLocaleString()} ${item.rewardToken || 'USDC'}`
                                : item.price}
                            </span>
                            <span className="text-[#9CA3AF] text-sm truncate">
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        color="#9CA3AF"
                        className="h-5 w-5 shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <ShareBountyModal
          bounty={bounty}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </main>
  )
}
