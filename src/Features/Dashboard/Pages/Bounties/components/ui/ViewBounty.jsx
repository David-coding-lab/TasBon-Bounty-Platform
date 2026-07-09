import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { fetchBountyById } from '../../../../../../pages/Bounties/Api/bounties'
import {
  Bookmark,
  Share2,
  Calendar,
  Paperclip,
  FileMinus,
  Download,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import TaskDetails from './TaskDetails'
import AboutCreator from './AboutCreator'
import GroupPhoto from '../../../../Assets/bountyIconLarge.png'
import ApplyBountyModal from './ApplyBountyModal'
import ApplicationPendingModal from './ApplicationPendingModal'

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

  const handleOpen = (state) => state(true)
  const handleClose = (state) => state(false)

  const handleApply = () => {
    handleClose(setIsModalOpen)

    setIsPendingModalOpen(true)
  }

  const handleViewApplication = () => {
    handleClose(setIsPendingModalOpen)
  }

  useEffect(() => {
    if (!bountyId) return
    setLoading(true)
    fetchBountyById(bountyId)
      .then((res) => setBounty(res.data))
      .catch((err) => toast.error(err.message || 'Failed to load bounty'))
      .finally(() => setLoading(false))
  }, [bountyId])

  // temporary debug logging for bounty payload during development
  useEffect(() => {
    console.log(bounty)
  }, [bounty])

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

  // Static task detail blocks shown in the left section; can be replaced with API-driven content later.
  const taskDetails = [
    {
      icon: 'Info',
      title: 'About the project',
      description:
        "We're looking for a talented frontend developer to build a modern and responsive analytics dashboard for our DAO. The dashboard will provide real-time insights into treasury, proposals, user activity, and DeFi protocol performance. The goal is to create a clean, intuitive and data-rich interface that helps our community make better decisions.",
    },
    {
      icon: 'CheckSquare',
      title: 'Deliverables',
      description:
        'Responsive analytics dashboard (Desktop & Mobile)\nWallet connection and user authentication\nReal-time data visualization and charts\nSource code with documentation\nDeployed live demo',
    },
    {
      icon: 'ClipboardList',
      title: 'Requirements',
      description:
        'Strong knowledge of web3 and DeFi ecosystems\nExperience with charting libraries (e.g. Recharts, Chart.js)\nClean UI/UX implementation\nPortfolio or previous work is required',
    },
  ]

  const bountyMeta = {
    applications: '124 Applications',
    experience_level: 'Intermediate',
    category: 'Frontend',
    posted: 'June 31, 2026, 11:59 PM',
    bounty_id: '#TAS-2048',
  }

  const metaLabels = {
    applications: 'Applications',
    experience_level: 'Experience Level',
    category: 'Category',
    posted: 'Posted',
    bounty_id: 'Bounty ID',
  }

  // Placeholder similar bounties for related recommendations section.
  const similarBounties = [
    {
      title: 'Build Wallet Connect DApp',
      price: '1500 USDC',
      tag: 'Web3',
      image: GroupPhoto, // imported image
    },
    {
      title: 'Build Wallet Connect DApp',
      price: '1500 USDC',
      tag: 'Web3',
      image: GroupPhoto,
    },
    {
      title: 'Build Wallet Connect DApp',
      price: '1500 USDC',
      tag: 'Web3',
      image: GroupPhoto,
    },
  ]

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
              onContinueExploring={() => handleClose(setIsPendingModalOpen)}
              onViewApplication={handleViewApplication}
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
              Frontend
            </div>
            <div className="p-1 px-4 bg-[#E6F6E2] border border-[#E5E7EB] text-[#34A563] rounded-xl">
              <span className="text-[#383838]">Intermediate</span>
            </div>
            <div className="p-1 px-4 bg-[#E6F6E2] border border-[#E5E7EB] text-[#34A563] rounded-xl">
              <span className="text-[#383838]">30 Days</span>
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
                    {/* real data */}
                    <p className="text-xl font-semibold text-[#000000]">
                      {formattedDueDate}
                    </p>
                    <p className="text-md font-medium text-[#616161]">
                      {formattedDueDateTime}
                    </p>
                  </div>
                  <div className="border p-3 border-[#E5E7EB] flex flex-col space-y-2 rounded-xl">
                    <p className="text-lg text-[#616161] ">Work duration</p>
                    {/* real data */}
                    <p className="text-lg font-medium text-[#000000]">
                      14 Days
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
              <h1 className="text-[#34A563] text-3xl font-bold">$750 USDC</h1>
              <p className="text-[#34A563] text-md w-fit bg-[#E6F6E2] rounded-sm p-1">
                Fixed Price
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
                      The reward will be paid in USDC once the work is approved
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <h2 className="text-[#000000] text-lg font-bold">
                      Who can apply
                    </h2>
                    <p className="text-[#616161] text-lg">
                      Anyone with the required skills and experience can apply.
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
                onClick={() => handleOpen(setIsModalOpen)}
                disabled={reviewStatus === 'pending'}
                className={`flex flex-row ${reviewStatus === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'} items-center justify-center space-x-3 ${reviewStatus === 'pending' ? 'bg-[#C5C9C7]' : reviewStatus === 'selected' ? 'bg-[#34A563]' : 'bg-[#34A563]'} rounded-2xl py-4 w-full`}
              >
                <span className="text-white text-md font-inter font-bold">
                  {reviewStatus === 'pending'
                    ? 'Application Pending'
                    : reviewStatus === 'selected'
                      ? 'Submit Bounty'
                      : 'Apply for Bounty'}
                </span>
                <ArrowRight color="#FFFFFF" />
              </button>

              <div className="flex flex-row space-x-4 items-center border border-gray-200 rounded-2xl p-4">
                <Clock color="#34A563" className="h-12 w-12" />
                <div className="flex flex-col space-y-2">
                  <p className="text-[#000000] text-md font-bold">
                    5 days left to apply
                  </p>
                  <p className="text-[#616161] text-base">
                    Application closes on May 31, 2025 at 11:59 PM (UTC)
                  </p>
                </div>
              </div>
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
                {similarBounties.map((bounty, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer flex-row items-center justify-between py-3"
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <img
                        src={bounty.image}
                        alt={bounty.title}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="flex flex-col space-y-1">
                        <p className="text-[#000000] text-md font-medium">
                          {bounty.title}
                        </p>
                        <div className="flex flex-row items-center space-x-2">
                          <span className="text-[#616161] text-sm font-bold">
                            {bounty.price}
                          </span>
                          <span className="text-[#9CA3AF] text-base">
                            {bounty.tag}
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
