import React, { useState } from 'react'
import { Search, MoreVertical, ArrowRight } from 'lucide-react'

/* Issuer icon imports from dashboard assets */
import NexusProtocolIcon from '../../Assets/Image (Nexus Protocol).svg'
import DAOCollectiveIcon from '../../Assets/Image (DAO Collective).svg'
import LayerOneIcon from '../../Assets/Image (LayerOne).svg'
import Web3LabsIcon from '../../Assets/Image (Web3Labs).svg'
import ChainGuardIcon from '../../Assets/Image (ChainGuard).svg'

/* Bounty thumbnail assets */
import DeFiDashboardImg from './assets/defi-dashboard.svg'
import WalletConnectImg from './assets/wallet-connect.svg'
import LandingPageImg from './assets/landing-page.svg'
import SmartContractImg from './assets/smart-contract.svg'
import AnalyticsAPIImg from './assets/analytics-api.svg'

/* ─── Status badge config ─── */
const statusConfig = {
  'Pending Review': {
    bg: 'bg-[#FEF3C6]',
    text: 'text-[#BB4D00]',
    dot: 'bg-[#F59E0B]',
  },
  'In Progress': {
    bg: 'bg-[#DBEAFE]',
    text: 'text-[#1447E6]',
    dot: 'bg-[#3B82F6]',
  },
  'In Review': {
    bg: 'bg-[#EDE9FE]',
    text: 'text-[#6D28D9]',
    dot: 'bg-[#8B5CF6]',
  },
  Completed: {
    bg: 'bg-[#D0FAE5]',
    text: 'text-[#007A55]',
    dot: 'bg-[#009966]',
  },
  'Not Selected': {
    bg: 'bg-[#FFE2E2]',
    text: 'text-[#C10007]',
    dot: 'bg-[#EF4444]',
  },
}

/* ─── Applications data — matches the image exactly ─── */
const applications = [
  {
    id: 1,
    thumbnail: DeFiDashboardImg,
    title: 'Build DeFi Analytics Dashboard',
    tags: ['Frontend', 'React', 'Web3'],
    issuerIcon: NexusProtocolIcon,
    issuerName: 'Nexus Protocol',
    verified: true,
    status: 'Pending Review',
    statusNote: 'Your application is under review',
    appliedOn: 'May 20, 2025',
    deadline: 'May 31, 2025',
    daysLeft: '5 days left',
    reward: '$750 USDC',
  },
  {
    id: 2,
    thumbnail: WalletConnectImg,
    title: 'Integrate Wallet Connect for Web App',
    tags: ['Web3', 'Wallet', 'Integration'],
    issuerIcon: DAOCollectiveIcon,
    issuerName: 'DAO Collective',
    verified: true,
    status: 'In Progress',
    statusNote: "You've been selected.",
    statusCta: 'Continue working →',
    appliedOn: 'May 18, 2025',
    deadline: 'Jun 02, 2025',
    daysLeft: '7 days left',
    reward: '$600 USDC',
  },
  {
    id: 3,
    thumbnail: LandingPageImg,
    title: 'Redesign Landing Page',
    tags: ['Design', 'UI/UX', 'Figma'],
    issuerIcon: LayerOneIcon,
    issuerName: 'LayerOne',
    verified: true,
    status: 'In Review',
    statusNote: 'Work submitted. Awaiting feedback',
    appliedOn: 'May 10, 2025',
    deadline: 'May 25, 2025',
    daysLeft: 'Completed',
    reward: '$500 USDC',
  },
  {
    id: 4,
    thumbnail: SmartContractImg,
    title: 'Smart Contract Security Audit',
    tags: ['Smart Contract', 'Solidity', 'Audit'],
    issuerIcon: NexusProtocolIcon,
    issuerName: 'Nexus Protocol',
    verified: true,
    status: 'Completed',
    statusNote: 'Approved and payment completed',
    appliedOn: 'Apr 28, 2025',
    deadline: 'May 10, 2025',
    daysLeft: 'Completed',
    reward: '$1,200 USDC',
  },
  {
    id: 5,
    thumbnail: AnalyticsAPIImg,
    title: 'Analytics Data API Development',
    tags: ['Backend', 'API', 'Python'],
    issuerIcon: Web3LabsIcon,
    issuerName: 'DataDAO',
    verified: true,
    status: 'Not Selected',
    statusNote: 'You were not selected for this',
    appliedOn: 'Apr 20, 2025',
    deadline: 'May 05, 2025',
    daysLeft: 'Completed',
    reward: '$450 USDC',
  },
]

/* ─── Status tab counts ─── */
const tabs = [
  { label: 'All', count: 12 },
  { label: 'Pending Review', count: 4 },
  { label: 'In Progress', count: 2 },
  { label: 'In Review', count: 3 },
  { label: 'Completed', count: 3 },
  { label: 'Not Selected', count: 0 },
]

/* ─── How the process works steps ─── */
const processSteps = [
  {
    icon: '📋',
    step: '1. Apply for bounty',
    desc: 'Submit your application with your profile & portfolio',
  },
  {
    icon: '✔',
    step: '2. Get selected',
    desc: 'Bounty creator reviews and selects builders',
  },
  {
    icon: '📅',
    step: '3. Start working',
    desc: "Once selected, you'll get access to the bounty",
  },
  {
    icon: '📄',
    step: '4. Submit & earn',
    desc: 'Submit your work for review and get paid',
  },
]

/* ─── Main Applications Page ─── */
const ApplicationsPage = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  /* Filter applications based on active tab and search */
  const filtered = applications.filter((app) => {
    const matchesTab = activeTab === 'All' || app.status === activeTab
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.issuerName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="flex flex-col space-y-6 bg-white min-h-full p-6">
      {/* ── Page header ── */}
      <div className="flex flex-col space-y-1">
        <h1 className="font-[Inter] text-2xl font-bold text-[#0A0A0A]">
          Applications
        </h1>
        <p className="text-sm text-[#4A5565]">
          Track all the bounties you've applied for and their status.
        </p>
      </div>

      {/* ── Filter tabs + Search ── */}
      <div className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-0">
        {/* Status filter tabs */}
        <div className="flex flex-row items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex flex-row items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer
                  ${
                    isActive
                      ? 'border-[#009966] text-[#009966]'
                      : 'border-transparent text-[#4A5565] hover:text-[#0A0A0A] hover:border-[#CBD5E1]'
                  }`}
              >
                {/* Active "All" gets a filled green pill */}
                {tab.label === 'All' && isActive ? (
                  <span className="bg-[#009966] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    All {tab.count}
                  </span>
                ) : (
                  <>
                    {tab.label}
                    <span
                      className={`text-xs font-semibold px-1.5 py-0.5 rounded-full
                        ${isActive ? 'bg-[#D0FAE5] text-[#007A55]' : 'bg-[#F3F4F6] text-[#4A5565]'}`}
                    >
                      {tab.count}
                    </span>
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* Search input */}
        <div className="relative ml-4 shrink-0">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-[#E5E7EB] rounded-lg outline-none focus:border-[#009966] text-[#364153] placeholder-gray-400 w-56"
          />
        </div>
      </div>

      {/* ── Applications table ── */}
      <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 bg-white border-b border-[#E5E7EB]">
          {['Bounty', 'Creator', 'Status', 'Applied On', 'Deadline', 'Reward'].map(
            (col) => (
              <span
                key={col}
                className={`text-xs font-medium text-[#6B7280] uppercase tracking-wide ${
                  col === 'Reward' ? 'text-right' : 'text-left'
                }`}
              >
                {col}
              </span>
            )
          )}
        </div>

        {/* Table rows */}
        {filtered.map((app) => {
          const statusStyle = statusConfig[app.status] || statusConfig['Pending Review']
          return (
            <div
              key={app.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-4 border-b border-[#E5E7EB] last:border-b-0 items-start hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Bounty column — thumbnail + title + tags */}
              <div className="flex flex-row gap-3 items-start min-w-0">
                <img
                  src={app.thumbnail}
                  alt={app.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                    {app.title}
                  </span>
                  <div className="flex flex-row flex-wrap gap-1">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#4A5565] bg-[#F3F4F6] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Creator column */}
              <div className="flex flex-row items-center gap-2">
                <img
                  src={app.issuerIcon}
                  alt={app.issuerName}
                  className="w-7 h-7 rounded-full shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm text-[#0A0A0A] font-medium truncate">
                    {app.issuerName}
                  </span>
                  {app.verified && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-[#4A5565]">Verified</span>
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#009966] rounded-full">
                        <svg
                          width="8"
                          height="6"
                          viewBox="0 0 8 6"
                          fill="none"
                        >
                          <path
                            d="M1 3L3 5L7 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status column */}
              <div className="flex flex-col gap-1">
                <span
                  className={`inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                >
                  {app.status}
                </span>
                <span className="text-xs text-[#4A5565] leading-snug">
                  {app.statusNote}
                </span>
                {app.statusCta && (
                  <button className="text-xs text-[#009966] font-medium flex items-center gap-1 hover:underline cursor-pointer w-fit">
                    Continue working
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>

              {/* Applied On column */}
              <div className="text-sm text-[#4A5565]">{app.appliedOn}</div>

              {/* Deadline column */}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#4A5565]">{app.deadline}</span>
                <span
                  className={`text-xs font-medium ${
                    app.daysLeft === 'Completed'
                      ? 'text-[#4A5565]'
                      : 'text-[#E17100]'
                  }`}
                >
                  {app.daysLeft}
                </span>
              </div>

              {/* Reward + actions column */}
              <div className="flex flex-row items-center gap-3 justify-end">
                <span className="text-sm font-bold text-[#009966] whitespace-nowrap">
                  {app.reward}
                </span>
                <button className="text-sm text-[#0A0A0A] font-medium hover:text-[#009966] cursor-pointer whitespace-nowrap">
                  View details
                </button>
                <button className="text-[#9CA3AF] hover:text-[#4A5565] cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── How the process works ── */}
      <div className="border border-[#E5E7EB] rounded-lg p-5">
        <div className="flex flex-row items-start gap-4">
          {/* Clipboard icon area */}
          <div className="shrink-0 w-10 h-10 rounded-lg bg-[#D0FAE5] flex items-center justify-center text-lg">
            📋
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-sm font-semibold text-[#0A0A0A]">
              How the process works
            </h3>
            <div className="flex flex-row gap-2 items-start flex-wrap">
              {processSteps.map((step, i) => (
                <React.Fragment key={step.step}>
                  <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#6B7280]">
                        {step.icon}
                      </span>
                      <span className="text-xs font-semibold text-[#0A0A0A]">
                        {step.step}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] leading-snug">
                      {step.desc}
                    </p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="text-[#CBD5E1] self-center shrink-0 mt-1">
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Learn more */}
          <button className="text-sm text-[#009966] font-medium flex items-center gap-1 hover:underline cursor-pointer shrink-0">
            Learn more
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicationsPage
