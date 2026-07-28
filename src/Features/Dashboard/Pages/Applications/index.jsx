import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, MoreVertical, ArrowRight, Check, X, Eye } from 'lucide-react'
import { getApplications, getReceivedApplications, updateApplicationStatus } from '../../../../services/applications'
import { toast } from 'sonner'
import ApplicationDetailModal from './ApplicationDetailModal'

const statusConfig = {
  'Pending Review': { bg: 'bg-[#FEF3C6]', text: 'text-[#BB4D00]', dot: 'bg-[#F59E0B]' },
  'In Progress': { bg: 'bg-[#DBEAFE]', text: 'text-[#1447E6]', dot: 'bg-[#3B82F6]' },
  'In Review': { bg: 'bg-[#EDE9FE]', text: 'text-[#6D28D9]', dot: 'bg-[#8B5CF6]' },
  Shortlisted: { bg: 'bg-[#EDE9FE]', text: 'text-[#6D28D9]', dot: 'bg-[#8B5CF6]' },
  Completed: { bg: 'bg-[#D0FAE5]', text: 'text-[#007A55]', dot: 'bg-[#009966]' },
  'Not Selected': { bg: 'bg-[#FFE2E2]', text: 'text-[#C10007]', dot: 'bg-[#EF4444]' },
}

const ApplicationsPage = () => {
  const [viewMode, setViewMode] = useState('sent')
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState(null)
  const [selectedAppId, setSelectedAppId] = useState(null)
  const [sentCount, setSentCount] = useState(0)
  const [receivedCount, setReceivedCount] = useState(0)

  const fetchCounts = () => {
    getApplications().then((res) => setSentCount(res.total ?? res.applications?.length ?? 0)).catch(() => {})
    getReceivedApplications().then((res) => setReceivedCount(res.total ?? res.applications?.length ?? 0)).catch(() => {})
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  useEffect(() => {
    setLoading(true)
    const fetchFn = viewMode === 'sent' ? getApplications : getReceivedApplications
    const params = {}
    if (viewMode === 'sent') {
      if (activeTab !== 'All') params.status = activeTab
      if (searchQuery) params.search = searchQuery
    }
    fetchFn(params)
      .then((res) => setApplications(res.applications || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [viewMode, activeTab, searchQuery])

  const tabCounts = applications.reduce((acc, app) => {
    acc['All'] = (acc['All'] || 0) + 1
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {})

  const tabs = viewMode === 'sent'
    ? [
        { label: 'All', count: tabCounts['All'] || 0 },
        { label: 'Pending Review', count: tabCounts['Pending Review'] || 0 },
        { label: 'In Progress', count: tabCounts['In Progress'] || 0 },
        { label: 'In Review', count: tabCounts['In Review'] || 0 },
        { label: 'Completed', count: tabCounts['Completed'] || 0 },
        { label: 'Not Selected', count: tabCounts['Not Selected'] || 0 },
      ]
    : [
        { label: 'All', count: tabCounts['All'] || 0 },
        { label: 'Pending Review', count: tabCounts['Pending Review'] || 0 },
        { label: 'Shortlisted', count: tabCounts['Shortlisted'] || 0 },
        { label: 'In Review', count: tabCounts['In Review'] || 0 },
        { label: 'In Progress', count: tabCounts['In Progress'] || 0 },
        { label: 'Not Selected', count: tabCounts['Not Selected'] || 0 },
      ]

  const refreshCountsAfterAction = () => {
    getReceivedApplications().then((res) => setReceivedCount(res.total ?? res.applications?.length ?? 0)).catch(() => {})
  }

  const handleAccept = async (appId) => {
    setActionLoading(appId)
    try {
      await updateApplicationStatus(appId, 'accepted')
      toast.success('Application accepted! Bounty assigned.')
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: 'In Progress' } : a)),
      )
      refreshCountsAfterAction()
    } catch (err) {
      toast.error(err.message || 'Failed to update status')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (appId) => {
    setActionLoading(appId)
    try {
      await updateApplicationStatus(appId, 'rejected')
      toast.success('Application rejected.')
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: 'Not Selected' } : a)),
      )
      refreshCountsAfterAction()
    } catch (err) {
      toast.error(err.message || 'Failed to update status')
    } finally {
      setActionLoading(null)
    }
  }

  const handleShortlist = async (appId) => {
    setActionLoading(appId)
    try {
      await updateApplicationStatus(appId, 'shortlisted')
      toast.success('Applicant shortlisted.')
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: 'Shortlisted' } : a)),
      )
      refreshCountsAfterAction()
    } catch (err) {
      toast.error(err.message || 'Failed to update status')
    } finally {
      setActionLoading(null)
    }
  }

  const processSteps = [
    { icon: '📋', step: '1. Apply for bounty', desc: 'Submit your application with your profile & portfolio' },
    { icon: '✔', step: '2. Get selected', desc: 'Bounty creator reviews and selects builders' },
    { icon: '📅', step: '3. Start working', desc: "Once selected, you'll get access to the bounty" },
    { icon: '📄', step: '4. Submit & earn', desc: 'Submit your work for review and get paid' },
  ]

  const columns = viewMode === 'sent'
    ? ['Bounty', 'Creator', 'Status', 'Applied On', 'Deadline', 'Reward']
    : ['Bounty', 'Applicant', 'Status', 'Applied On', 'Proposal', 'Actions']

  return (
    <div className="flex flex-col space-y-6 bg-white min-h-full p-3 sm:p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="font-[Inter] text-2xl font-bold text-[#0A0A0A]">Applications</h1>
        <p className="text-sm text-[#4A5565]">
          {viewMode === 'sent'
            ? 'Track all the bounties you have applied for.'
            : 'Review and manage applications to your bounties.'}
        </p>
      </div>

      <div className="flex flex-row items-center gap-4 border-b border-[#E5E7EB] pb-0">
        <button
          onClick={() => { setViewMode('sent'); setActiveTab('All'); setSearchQuery('') }}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            viewMode === 'sent'
              ? 'border-[#009966] text-[#009966]'
              : 'border-transparent text-[#4A5565] hover:text-[#0A0A0A]'
          }`}
        >
          My Applications
        </button>
        <button
          onClick={() => { setViewMode('received'); setActiveTab('All'); setSearchQuery('') }}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            viewMode === 'received'
              ? 'border-[#009966] text-[#009966]'
              : 'border-transparent text-[#4A5565] hover:text-[#0A0A0A]'
          }`}
        >
          Received ({receivedCount})
        </button>
      </div>

      {viewMode === 'sent' && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-row items-center gap-1 overflow-x-auto w-full sm:w-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label
              return (
                <button key={tab.label} onClick={() => setActiveTab(tab.label)}
                  className={`flex flex-row items-center gap-1.5 px-2.5 sm:px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer shrink-0 ${
                    isActive ? 'border-[#009966] text-[#009966]' : 'border-transparent text-[#4A5565] hover:text-[#0A0A0A] hover:border-[#CBD5E1]'
                  }`}>
                  {tab.label === 'All' && isActive ? (
                    <span className="bg-[#009966] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">All {tab.count}</span>
                  ) : (
                    <>
                      {tab.label}
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#D0FAE5] text-[#007A55]' : 'bg-[#F3F4F6] text-[#4A5565]'}`}>{tab.count}</span>
                    </>
                  )}
                </button>
              )
            })}
          </div>

          <div className="relative w-full sm:w-auto shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search applications..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 pl-9 pr-4 py-2 text-sm border border-[#E5E7EB] rounded-lg outline-none focus:border-[#009966] text-[#364153] placeholder-gray-400" />
          </div>
        </div>
      )}

      <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="hidden sm:grid gap-4 px-4 py-3 bg-white border-b border-[#E5E7EB] grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
          {columns.map((col) => (
            <span key={col} className={`text-xs font-medium text-[#6B7280] uppercase tracking-wide ${col === 'Reward' || col === 'Actions' ? 'text-right' : 'text-left'}`}>{col}</span>
          ))}
        </div>

        {loading ? (
          <div className="hidden sm:block">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="grid gap-4 px-4 py-4 border-b border-[#E5E7EB] grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
                {Array(6).fill(null).map((_, j) => (
                  <div key={j} className="h-5 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No applications found</div>
        ) : viewMode === 'sent' ? (
          <>
            {applications.map((app) => {
              const statusStyle = statusConfig[app.status] || statusConfig['Pending Review']
              return (
                <>
                  <div key={app.id} className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-4 border-b border-[#E5E7EB] last:border-b-0 items-start hover:bg-[#FAFAFA] transition-colors">
                    <div className="flex flex-row gap-3 items-start min-w-0">
                      <img src={app.thumbnail} alt={app.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                      <div className="flex flex-col gap-1 min-w-0">
                        {app.bountyId ? (
                          <Link to={`/dashboard/bounties/${app.bountyId}`} className="text-sm font-semibold text-[#0A0A0A] leading-snug hover:text-[#009966]">{app.title}</Link>
                        ) : (
                          <span className="text-sm font-semibold text-[#0A0A0A] leading-snug">{app.title}</span>
                        )}
                        <div className="flex flex-row flex-wrap gap-1">
                          {(app.tags || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-[#4A5565] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">{app.issuerName?.charAt(0)}</div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm text-[#0A0A0A] font-medium truncate">{app.issuerName}</span>
                        {app.verified && <span className="text-xs text-[#4A5565]">Verified ✓</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>{app.status}</span>
                    </div>
                    <div className="text-sm text-[#4A5565]">{app.appliedOn}</div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-[#4A5565]">{app.deadline}</span>
                      <span className={`text-xs font-medium ${app.daysLeft === 'Completed' ? 'text-[#4A5565]' : 'text-[#E17100]'}`}>{app.daysLeft}</span>
                    </div>
                    <div className="flex flex-row items-center gap-3 justify-end">
                      <span className="text-sm font-bold text-[#009966] whitespace-nowrap">{app.reward}</span>
                      {app.bountyId ? (
                        <Link to={`/dashboard/bounties/${app.bountyId}`} className="text-sm text-[#0A0A0A] font-medium hover:text-[#009966] whitespace-nowrap">View details</Link>
                      ) : (
                        <button onClick={() => setSelectedAppId(app.id)} className="text-sm text-[#0A0A0A] font-medium hover:text-[#009966] cursor-pointer whitespace-nowrap">View details</button>
                      )}
                      <button className="text-[#9CA3AF] hover:text-[#4A5565] cursor-pointer"><MoreVertical size={16} /></button>
                    </div>
                  </div>
                  <div className="sm:hidden border-b border-[#E5E7EB] p-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <img src={app.thumbnail} alt={app.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        {app.bountyId ? (
                          <Link to={`/dashboard/bounties/${app.bountyId}`} className="text-sm font-semibold text-[#0A0A0A] leading-snug hover:text-[#009966] line-clamp-2">{app.title}</Link>
                        ) : (
                          <span className="text-sm font-semibold text-[#0A0A0A] leading-snug line-clamp-2">{app.title}</span>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle.bg} ${statusStyle.text}`}>{app.status}</span>
                          <span className="text-xs text-[#4A5565]">{app.issuerName}</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#009966] shrink-0">{app.reward}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-[#4A5565]">
                      <span>Applied: {app.appliedOn}</span>
                      <span>{app.deadline}</span>
                    </div>
                    {app.bountyId ? (
                      <Link to={`/dashboard/bounties/${app.bountyId}`} className="mt-3 w-full block text-center py-2 rounded-2xl bg-[#009966] text-white text-sm font-medium hover:bg-[#007A55] transition-colors">View details</Link>
                    ) : (
                      <button onClick={() => setSelectedAppId(app.id)} className="mt-3 w-full py-2 rounded-2xl bg-[#009966] text-white text-sm font-medium hover:bg-[#007A55] transition-colors cursor-pointer">View details</button>
                    )}
                  </div>
                </>
              )
            })}
          </>
        ) : (
          <>
            {applications.map((app) => {
              const statusStyle = statusConfig[app.status] || statusConfig['Pending Review']
              const isPending = app.status === 'Pending Review' || app.status === 'Shortlisted'
              return (
                <>
                  <div key={app.id} className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-4 border-b border-[#E5E7EB] last:border-b-0 items-start hover:bg-[#FAFAFA] transition-colors">
                    <div className="flex flex-row gap-3 items-start min-w-0">
                      <img src={app.thumbnail} alt={app.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                      <div className="flex flex-col gap-1 min-w-0">
                        {app.bountyId ? (
                          <Link to={`/dashboard/bounties/${app.bountyId}`} className="text-sm font-semibold text-[#0A0A0A] leading-snug hover:text-[#009966]">{app.title}</Link>
                        ) : (
                          <span className="text-sm font-semibold text-[#0A0A0A] leading-snug">{app.title}</span>
                        )}
                        <div className="flex flex-row flex-wrap gap-1">
                          {(app.tags || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-[#4A5565] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">{app.applicantName?.charAt(0)}</div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm text-[#0A0A0A] font-medium truncate">{app.applicantName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>{app.status}</span>
                    </div>
                    <div className="text-sm text-[#4A5565]">{app.appliedOn}</div>
                    <div className="flex flex-col gap-0.5">
                      {app.proposedAmount && <span className="text-sm font-medium text-[#0A0A0A]">${app.proposedAmount}</span>}
                      {app.coverLetter && <span className="text-xs text-[#4A5565] truncate max-w-[120px]" title={app.coverLetter}>{app.coverLetter}</span>}
                    </div>
                    <div className="flex flex-row items-center gap-2 justify-end">
                      <button onClick={() => setSelectedAppId(app.id)} className="text-xs text-[#0A0A0A] font-medium hover:text-[#009966] cursor-pointer whitespace-nowrap">
                        <Eye size={14} className="inline mr-1" /> View
                      </button>
                      {isPending ? (
                        <>
                          <button onClick={() => handleAccept(app.id)} disabled={actionLoading === app.id} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D0FAE5] text-[#007A55] text-xs font-medium hover:bg-[#B8F5D0] transition-colors disabled:opacity-50 cursor-pointer"><Check size={14} /> Accept</button>
                          <button onClick={() => handleShortlist(app.id)} disabled={actionLoading === app.id} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EDE9FE] text-[#6D28D9] text-xs font-medium hover:bg-[#DDD6FE] transition-colors disabled:opacity-50 cursor-pointer"><Eye size={14} /> Shortlist</button>
                          <button onClick={() => handleReject(app.id)} disabled={actionLoading === app.id} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFE2E2] text-[#C10007] text-xs font-medium hover:bg-[#FFCECE] transition-colors disabled:opacity-50 cursor-pointer"><X size={14} /> Reject</button>
                        </>
                      ) : (
                        <span className="text-xs text-[#4A5565]">{app.status === 'In Progress' ? 'Assigned' : app.status === 'Not Selected' ? 'Declined' : app.status}</span>
                      )}
                    </div>
                  </div>
                  <div className="sm:hidden border-b border-[#E5E7EB] p-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <img src={app.thumbnail} alt={app.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        {app.bountyId ? (
                          <Link to={`/dashboard/bounties/${app.bountyId}`} className="text-sm font-semibold text-[#0A0A0A] leading-snug hover:text-[#009966] line-clamp-2">{app.title}</Link>
                        ) : (
                          <span className="text-sm font-semibold text-[#0A0A0A] leading-snug line-clamp-2">{app.title}</span>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle.bg} ${statusStyle.text}`}>{app.status}</span>
                          <span className="text-xs text-[#4A5565]">{app.applicantName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-[#4A5565]">
                      <span>Applied: {app.appliedOn}</span>
                      {app.proposedAmount && <span className="font-medium text-[#0A0A0A]">${app.proposedAmount}</span>}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setSelectedAppId(app.id)} className="flex-1 py-2 rounded-lg border border-gray-200 text-xs font-medium text-[#4A5565] hover:bg-gray-50 transition-colors cursor-pointer">
                        <Eye size={14} className="inline mr-1" /> View
                      </button>
                      {isPending && (
                        <>
                          <button onClick={() => handleAccept(app.id)} disabled={actionLoading === app.id} className="flex-1 py-2 rounded-lg bg-[#D0FAE5] text-[#007A55] text-xs font-medium hover:bg-[#B8F5D0] transition-colors disabled:opacity-50 cursor-pointer"><Check size={14} className="inline mr-1" /> Accept</button>
                          <button onClick={() => handleReject(app.id)} disabled={actionLoading === app.id} className="flex-1 py-2 rounded-lg bg-[#FFE2E2] text-[#C10007] text-xs font-medium hover:bg-[#FFCECE] transition-colors disabled:opacity-50 cursor-pointer"><X size={14} className="inline mr-1" /> Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )
            })}
          </>
        )}
      </div>

      <div className="border border-[#E5E7EB] rounded-lg p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-[#D0FAE5] flex items-center justify-center text-lg">📋</div>
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-sm font-semibold text-[#0A0A0A]">How the process works</h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-start sm:flex-wrap">
              {processSteps.map((step) => (
                <div key={step.step} className="flex flex-col gap-1 flex-1 min-w-[120px] w-full sm:w-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#6B7280]">{step.icon}</span>
                    <span className="text-xs font-semibold text-[#0A0A0A]">{step.step}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-snug">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="text-sm text-[#009966] font-medium flex items-center gap-1 hover:underline cursor-pointer shrink-0">
            Learn more <ArrowRight size={14} />
          </button>
        </div>
      </div>
      <ApplicationDetailModal applicationId={selectedAppId} onClose={() => setSelectedAppId(null)} />
    </div>
  )
}

export default ApplicationsPage
