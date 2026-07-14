import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { fetchBountyById, submitBountyWork, applyForBounty } from '../../../../../../pages/Bounties/Api/bounties'
import {
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
import TaskDetails from './TaskDetails'
import AboutCreator from './AboutCreator'
import GroupPhoto from '../../../../Assets/bountyIconLarge.png'
import ApplyBountyModal from './ApplyBountyModal'
import ApplicationPendingModal from './ApplicationPendingModal'
import SubmissionReceivedModal from './SubmissionReceivedModal'

// ViewBounty page loads a single bounty by ID and displays details,
// timeline, attachments, creator info, and related bounty cards.
export default function ViewBounty() {
  const { bountyId } = useParams()
  const navigate = useNavigate()
  const [reviewStatus, setReviewStatus] = useState(null) // State to track if the application is under review
  const [bounty, setBounty] = useState(null)
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmissionReceivedOpen, setIsSubmissionReceivedOpen] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)

  const handleOpen = (state) => state(true)
  const handleClose = (state) => state(false)

  const handleApply = async (data) => {
    setIsApplying(true)
    try {
      const res = await applyForBounty(bountyId, data)
      handleClose(setIsModalOpen)
      if (res.data?.applicationStatus) {
        setReviewStatus(res.data.applicationStatus)
      } else {
        setReviewStatus('pending')
      }
      if (res.data) {
        setBounty((prev) => ({ ...prev, ...res.data }))
      }
      setIsPendingModalOpen(true)
    } catch (error) {
      toast.error(error.message || 'Failed to apply')
    } finally {
      setIsApplying(false)
    }
  }

  const handleViewApplication = () => {
    handleClose(setIsPendingModalOpen)
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
      const res = await submitBountyWork(bountyId, { message: submissionMessage })
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
    fetchBountyById(bountyId)
      .then((res) => {
        setBounty(res.data)
        if (res.data?.applicationStatus) {
          setReviewStatus(res.data.applicationStatus)
        }
      })
      .catch((err) => toast.error(err.message || 'Failed to load bounty'))
      .finally(() => setLoading(false))
  }, [bountyId])

  // Format the due date for display in the bounty detail card
  const formattedDueDate = bounty?.dueDate
    ? new Date(bounty.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  // Format the due time specifically as HH:MM (UTC)
  const formattedDueDateTime = bounty?.dueDate
    ? `${new Date(bounty.dueDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      })} (UTC)`
    : ''

  const taskDetails = [
    {
      icon: 'Info',
      title: 'About the project',
      description: bounty?.description || 'No description provided.',
    },
    {
      icon: 'CheckSquare',
      title: 'Deliverables',
      description:
        bounty?.deliverables?.length
          ? bounty.deliverables.map((d) => `• ${d}`).join('\n')
          : 'No deliverables listed.',
    },
    {
      icon: 'ClipboardList',
      title: 'Requirements',
      description:
        bounty?.skills?.length
          ? `Required skills: ${bounty.skills.join(', ')}`
          : 'No specific requirements listed.',
    },
  ]

  const bountyMeta = {
    applications: `${bounty?.applicationsCount || bounty?.applications?.length || 0} Applications`,
    experience_level: bounty?.level || 'Intermediate',
    category: bounty?.category || bounty?.categoryName || 'General',
    posted: bounty?.createdAt
      ? new Date(bounty.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Recently',
    bounty_id: bounty?.bountyId || bounty?.id ? `#TAS-${String(bounty.id).slice(-4).toUpperCase()}` : '',
  }

  const metaLabels = {
    applications: 'Applications',
    experience_level: 'Experience Level',
    category: 'Category',
    posted: 'Posted',
    bounty_id: 'Bounty ID',
  }

  const similarBounties = bounty?.similarBounties || []

  // show a loading spinner until bounty data is fetched from the API
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // handle cases where the bounty ID is invalid or the API returned no data
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

  // Render the bounty detail page once the API payload is loaded
  return (
    <main className="w-full h-min-screen mx-auto flex flex-col  px-8 pt-12 pb-6 bg-[#ffffff]  ">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 pt-10 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} color="#34A563" /> Back to bounties
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => handleClose(setIsModalOpen)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ApplyBountyModal
              onCancel={() => handleClose(setIsModalOpen)}
              onApply={handleApply}
              isApplying={isApplying}
            />
          </div>
        </div>
      )}

      {isPendingModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => handleClose(setIsPendingModalOpen)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ApplicationPendingModal
              bounty={bounty}
              onContinueExploring={() => handleClose(setIsPendingModalOpen)}
              onViewApplication={handleViewApplication}
            />
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => !isSubmitting && handleClose(setIsSubmitModalOpen)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-2">Submit Your Work</h2>
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
              onChange={(e) => { setSubmissionMessage(e.target.value); setSubmitError('') }}
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => handleClose(setIsSubmissionReceivedOpen)}
        >
          <div onClick={(e) => e.stopPropagation()}>
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
      {/* Main bounty content: overview, timeline, attachments, creator info, and sidebar */}
      {/* The main body */}
      <div className="w-full flex flex-col space-y-8">
        {/* The first child which is the hero section */}
        <div className="flex flex-col space-y-3">
          <div className="flex flex-row space-x-6 items-center">
            {/* api data  */}
            <h1 className="text-[#101820] text-4xl pr-15 font-bold">
              {bounty.title}
            </h1>

            <Bookmark cursor={'pointer'} width={20} />

            <div className="flex flex-row space-x-2">
              <Share2 width={20} cursor={'pointer'} />
              <p className="text-lg font-bold">share</p>
            </div>
          </div>

          <div className="flex flex-row space-x-6 items-center">
            <div className="p-1 px-4 bg-[#E6F6E2] border border-[#E5E7EB] text-[#34A563] rounded-xl">
              {bounty?.category || bounty?.categoryName || 'General'}
            </div>
            <div className="p-1 px-4 bg-[#E6F6E2] border border-[#E5E7EB] text-[#34A563] rounded-xl">
              <span className="text-[#383838]">{bounty?.level || 'Intermediate'}</span>
            </div>
            <div className="p-1 px-4 bg-[#E6F6E2] border border-[#E5E7EB] text-[#34A563] rounded-xl">
              <span className="text-[#383838]">{bounty?.workDuration || '14 Days'}</span>
            </div>
          </div>
        </div>

        {/* The second child that is the two cols that resemble a sidebar */}
        <div className="flex flex-row space-x-8 w-full max-w-7xl">
          {/* left panel: task details, timeline, attachments, creator info */}
          <div className="flex-2 flex flex-col space-y-8 pr-15">
            <div className="flex flex-col space-y-6">
              {/* Task detail cards rendered from the static taskDetails array */}
              {taskDetails.map((taskDetail, index) => (
                <TaskDetails
                  key={index}
                  icon={taskDetail.icon}
                  title={taskDetail.title}
                  description={taskDetail.description}
                />
              ))}
            </div>

            {/* timeline */}
            <div className="flex flex-row space-x-8 items-start">
              <div className="pt-2">
                <Calendar color="#34A563" />
              </div>
              <div className="flex flex-col space-y-4">
                <h1 className="text-[#000000] text-xl font-bold">Timeline</h1>

                <div className="flex flex-row space-x-8">
                  <div className="border p-3 border-[#E5E7EB] flex flex-col space-y-2 rounded-xl">
                    <p className="text-md font-semibold text-[#616161] ">
                      Application Deadline
                    </p>
                    <p className="text-xl font-semibold text-[#000000]">
                      {bounty?.applicationDeadline
                        ? new Date(bounty.applicationDeadline).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : formattedDueDate || 'N/A'}
                    </p>
                    <p className="text-md font-medium text-[#616161]">
                      {bounty?.applicationDeadline
                        ? `${new Date(bounty.applicationDeadline).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZone: 'UTC',
                          })} (UTC)`
                        : formattedDueDateTime}
                    </p>
                  </div>
                  <div className="border p-3 border-[#E5E7EB] flex flex-col space-y-2 rounded-xl">
                    <p className="text-lg text-[#616161] ">Work duration</p>
                    <p className="text-lg font-medium text-[#000000]">
                      {bounty?.workDuration || '14 Days'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Attachments placeholder content; replace with API files when available */}
            <div className="flex flex-row space-x-8 items-start">
              <div className="pt-2">
                <Paperclip color="#34A563" />
              </div>
              <div className="flex flex-col space-y-6">
                <h1 className="text-[#000000] font-bold font-inter text-xl">
                  Attachments
                </h1>

                <div className="flex flex-row space-x-8">
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-row items-center space-x-2">
                      <FileMinus width={20} height={20} color="#616161" />
                      <div className="flex flex-col space-y-1">
                        <p className="text-[#616161] text-base">
                          Brand Guideline.pdf
                        </p>
                        <p className="text-[#616161] text-base">12.5MB</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                      <FileMinus width={20} height={20} color="#616161" />
                      <div className="flex flex-col space-y-1">
                        <p className="text-[#616161] text-base">
                          Data Schema.pdf
                        </p>
                        <p className="text-[#616161] text-base">12.5MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-row items-center space-x-2">
                      <FileMinus width={20} height={20} color="#616161" />
                      <div className="flex flex-col space-y-1">
                        <p className="text-[#616161] text-base">
                          Design Mockups.pdf
                        </p>
                        <p className="text-[#616161] text-base">12.5MB</p>
                      </div>
                    </div>
                    <button className="flex flex-row space-x-2 items-center p-3">
                      <Download width={20} height={20} color="#34A563" />
                      <p className="text-[#34A563] text-base cursor-pointer">
                        Download all
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Creator info card component */}
            <AboutCreator />
          </div>

          {/* right panel: reward summary, bounty metadata, and related bounties */}
          <div className="flex-1 border border-gray-100 rounded-2xl flex flex-col space-y-8 p-6">
            {/* 1st chiild  */}
            <div className="flex flex-col space-y-4">
              <p className="text-xl font-semibold text-[#353535]">
                Total Reward
              </p>
              <h1 className="text-[#34A563] text-3xl font-bold">
                {bounty?.reward
                  ? `$${Number(bounty.reward).toLocaleString()} ${bounty.rewardType === 'milestone' ? '' : 'USDC'}`
                  : 'N/A'}
              </h1>
              <p className="text-[#34A563] text-md w-fit bg-[#E6F6E2] rounded-sm p-1">
                {bounty?.rewardType === 'milestone' ? 'Milestone' : 'Fixed Price'}
              </p>

              <div className="w-full mt-5 h-px bg-gray-200" />
            </div>

            <div className="flex flex-col">
              {Object.entries(bountyMeta).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-row justify-between items-start py-3"
                >
                  <p className="text-[#616161] text-lg">{metaLabels[key]}</p>
                  <p className="text-[#616161] text-lg text-right">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-8">
              {!reviewStatus && (
                <>
                  <div className="flex flex-col space-y-3">
                    <h2 className="text-[#000000] text-lg font-bold">
                      About the reward
                    </h2>
                    <p className="text-[#616161] text-lg">
                      {bounty?.rewardDescription || `The reward will be paid in USDC once the work is approved.`}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <h2 className="text-[#000000] text-lg font-bold">
                      Who can apply
                    </h2>
                    <p className="text-[#616161] text-lg">
                      {bounty?.eligibility || 'Anyone with the required skills and experience can apply.'}
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
                      You’ve been selected to work on this bounty.
                    </p>
                  </div>

                  <div className="flex h-40 bg-[#F0F0F0] flex-col space-y-2 border border-gray-200 rounded-2xl p-4">
                    <p className="text-[#616161] text-sm">Work Duration</p>
                    <h3 className="text-[#000000] pb-2 text-md font-bold">
                      14 Days
                    </h3>

                    <p className="text-[#616161] text-sm">Started on</p>
                    <h3 className="text-[#000000] text-md font-bold">
                      May 18, 2026
                    </h3>
                  </div>
                </>
              )}

              <button
                onClick={() => reviewStatus === 'selected' ? handleOpen(setIsSubmitModalOpen) : handleOpen(setIsModalOpen)}
                disabled={reviewStatus === 'pending' || isSubmitting}
                className={`flex flex-row ${reviewStatus === 'pending' || isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'} items-center justify-center space-x-3 ${reviewStatus === 'pending' ? 'bg-[#C5C9C7]' : 'bg-[#34A563]'} rounded-2xl py-4 w-full`}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ArrowRight color="#FFFFFF" />
                )}
                <span className="text-white text-md font-inter font-bold">
                  {reviewStatus === 'pending'
                    ? 'Application Pending'
                    : reviewStatus === 'selected'
                      ? isSubmitting ? 'Submitting...' : 'Submit Bounty'
                      : 'Apply for Bounty'}
                </span>
              </button>

              {bounty?.applicationDeadline && (() => {
                const now = new Date()
                const deadline = new Date(bounty.applicationDeadline)
                const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
                return (
                  <div className="flex flex-row space-x-4 items-center border border-gray-200 rounded-2xl p-4">
                    <Clock color="#34A563" className="h-12 w-12" />
                    <div className="flex flex-col space-y-2">
                      <p className="text-[#000000] text-md font-bold">
                        {daysLeft > 0 ? `${daysLeft} day${daysLeft > 1 ? 's' : ''} left to apply` : 'Application closed'}
                      </p>
                      <p className="text-[#616161] text-base">
                        Application closes on {deadline.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })} at {deadline.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                          timeZone: 'UTC',
                        })} (UTC)
                      </p>
                    </div>
                  </div>
                )
              })()}
            </div>

            <div className="flex flex-col space-y-4 border border-gray-200 rounded-2xl p-4">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-[#000000] text-lg font-bold">
                  Similar bounties
                </h2>
                <button className="flex flex-row items-center space-x-1">
                  <span className="text-[#34A563] cursor-pointer text-base font-medium">
                    View all
                  </span>
                  <ChevronRight color="#34A563" className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col divide-y gap-2 divide-gray-100">
                {/* Related bounty cards rendered from static similarBounties data */}
                {similarBounties.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4">No similar bounties found</p>
                ) : similarBounties.map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer flex-row items-center justify-between py-3"
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <img
                        src={item.image || item.imageUrl || GroupPhoto}
                        alt={item.title}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="flex flex-col space-y-1">
                        <p className="text-[#000000] text-md font-medium">
                          {item.title}
                        </p>
                        <div className="flex flex-row items-center space-x-2">
                          <span className="text-[#616161] text-sm font-bold">
                            {item.reward ? `$${Number(item.reward).toLocaleString()} USDC` : item.price}
                          </span>
                          <span className="text-[#9CA3AF] text-base">
                            {item.category || item.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight color="#9CA3AF" className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
