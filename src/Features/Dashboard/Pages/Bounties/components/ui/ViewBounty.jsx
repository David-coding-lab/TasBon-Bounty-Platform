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

// ViewBounty page loads a single bounty by ID and displays details,
// timeline, attachments, creator info, and related bounty cards.
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
    <div className="w-full mx-auto  px-6 pt-12 pb-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} color="#34A563" /> Back to bounties
      </button>

      {/* Main bounty content: overview, timeline, attachments, creator info, and sidebar */}
      {/* The main body */}
      <div className=" w-full flex flex-col space-y-8">
        {/* The first child which is the hero section */}
        <div className="flex flex-col space-y-3 ">
          <div className="flex flex-row space-x-6 items-center">
            {/* api data  */}
            <h1 className="text-[#101820] text-5xl font-bold">
              {bounty.title}
            </h1>

            <Bookmark />

            <div className="flex flex-row space-x-2">
              <Share2 />
              <p className="text-lg font-bold">share</p>
            </div>
          </div>

          <div className="flex flex-row space-x-6 items-center">
            <div className="p-2 bg-[#E6F6E2] border border-[#E5E7EB] text-[#34A563] rounded-2xl">
              <span>Frontend</span>
            </div>
            <div className="p-2 bg-[#E6F6E2] border border-[#E5E7EB]  rounded-2xl flex flex-row space-x-2 items-center ">
              <span className="inline-block h-2 w-2 rounded-full bg-[#585F6A]"></span>
              <span className="text-[#000000]">Intermediate</span>
              <span className="inline-block h-2 w-2 rounded-full bg-[#585F6A]"></span>
            </div>
            <div className="p-2 bg-[#E6F6E2] border border-[#E5E7EB] text-[#34A563] rounded-2xl">
              <span className="text-[#000000]">30 Days</span>
            </div>
          </div>
        </div>

        {/* The second child that is the two cols that resemble a sidebar */}
        <div className="flex flex-row space-x-8 w-full">
          {/* left panel: task details, timeline, attachments, creator info */}
          <div className="flex-2 flex flex-col space-y-8">
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
              <div className="flex flex-col space-y-6">
                <h1 className="text-[#000000] text-2xl">Timeline</h1>

                <div className="flex flex-row space-x-8">
                  <div className="flex flex-col space-y-3">
                    <p className="text-lg text-[#616161]] ">
                      Application Deadline
                    </p>
                    {/* real data */}
                    <p className="text-3xl font-bold text-[#000000]">
                      {formattedDueDate}
                    </p>
                    <p className="text-[#616161] text-xl">
                      {formattedDueDateTime}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <p className="text-xl text-[#616161] ">Work duration</p>
                    {/* real data */}
                    <p className="text-3xl font-bold text-[#000000]">14 Days</p>
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
                <h1 className="text-[#000000] text-2xl">Attachments</h1>

                <div className="flex flex-row space-x-8">
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-row items-center space-x-3">
                      <FileMinus color="#616161" />
                      <div className="flex flex-col space-y-2">
                        <p className="text-[#616161] text-base">
                          Brand Guideline.pdf
                        </p>
                        <p className="text-[#616161] text-base">12.5MB</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center space-x-3">
                      <FileMinus color="#616161" />
                      <div className="flex flex-col space-y-2">
                        <p className="text-[#616161] text-base">
                          Data Schema.pdf
                        </p>
                        <p className="text-[#616161] text-base">12.5MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-row items-center space-x-3">
                      <FileMinus color="#616161" />
                      <div className="flex flex-col space-y-2">
                        <p className="text-[#616161] text-base">
                          Design Mockups.pdf
                        </p>
                        <p className="text-[#616161] text-base">12.5MB</p>
                      </div>
                    </div>
                    <button className="flex flex-row space-x-2 items-center p-3">
                      <Download color="#34A563" />
                      <p className="text-[#34A563] text-base">Download all</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Creator info card component */}
            <AboutCreator />
          </div>

          {/* right panel: reward summary, bounty metadata, and related bounties */}
          <div className="flex-1 border border-gray-300 rounded-2xl flex flex-col space-y-8 p-6">
            {/* 1st chiild  */}
            <div className="flex flex-col space-y-4">
              <p className="text-xl text-[#000000]">Total Reward</p>
              <h1 className="text-[#34A563] text-3xl font-bold">$750 USDC</h1>
              <p className="text-[#34A563] text-lg">Fixed Price</p>
            </div>

            <div className="flex flex-col divide-y divide-gray-200">
              {Object.entries(bountyMeta).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-row justify-between items-start py-4"
                >
                  <p className="text-[#616161] text-lg">{metaLabels[key]}</p>
                  <p className="text-[#000000] text-lg text-right">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-3">
                <h2 className="text-[#000000] text-lg font-bold">
                  About the reward
                </h2>
                <p className="text-[#616161] text-xl">
                  The reward will be paid in USDC once the work is approved
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <h2 className="text-[#000000] text-lg font-bold">
                  Who can apply
                </h2>
                <p className="text-[#616161] text-xl">
                  Anyone with the required skills and experience can apply.
                </p>
              </div>

              <button className="flex flex-row items-center justify-center space-x-3 bg-[#34A563] rounded-2xl py-4 w-full">
                <span className="text-white text-xl font-bold">
                  Apply for bounty
                </span>
                <ArrowRight color="#FFFFFF" />
              </button>

              <div className="flex flex-row space-x-4 items-center border border-gray-200 rounded-2xl p-4">
                <Clock color="#34A563" className="h-16 w-16" />
                <div className="flex flex-col space-y-2">
                  <p className="text-[#000000] text-lg font-bold">
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
                <h2 className="text-[#000000] text-xl font-bold">
                  Similar bounties
                </h2>
                <button className="flex flex-row items-center space-x-1">
                  <span className="text-[#34A563] text-base font-medium">
                    View all
                  </span>
                  <ChevronRight color="#34A563" className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-gray-100">
                {/* Related bounty cards rendered from static similarBounties data */}
                {similarBounties.map((bounty, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between py-3"
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <img
                        src={bounty.image}
                        alt={bounty.title}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="flex flex-col space-y-1">
                        <p className="text-[#000000] text-lg font-medium">
                          {bounty.title}
                        </p>
                        <div className="flex flex-row items-center space-x-2">
                          <span className="text-[#000000] text-lg font-bold">
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
    </div>
  )
}
