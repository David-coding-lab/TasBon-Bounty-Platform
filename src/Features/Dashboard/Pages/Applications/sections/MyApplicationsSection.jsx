import { useState, useEffect } from 'react'
import { getApplications } from '../../../../../services/applications'
import FilterTabs from '../components/FilterTabs'
import SearchBar from '../components/SearchBar'
import ApplicationsTable from '../components/ApplicationsTable'
import ProcessGuide from '../components/ProcessGuide'

const MyApplicationsSection = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (activeTab !== 'All') params.status = activeTab
    if (searchQuery) params.search = searchQuery
    getApplications(params)
      .then((res) => setApplications(res.applications || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [activeTab, searchQuery])

  const tabCounts = applications.reduce((acc, app) => {
    acc['All'] = (acc['All'] || 0) + 1
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {})

  const tabs = [
    { label: 'All', count: tabCounts['All'] || 0 },
    { label: 'Pending Review', count: tabCounts['Pending Review'] || 0 },
    { label: 'In Progress', count: tabCounts['In Progress'] || 0 },
    { label: 'In Review', count: tabCounts['In Review'] || 0 },
    { label: 'Completed', count: tabCounts['Completed'] || 0 },
    { label: 'Not Selected', count: tabCounts['Not Selected'] || 0 },
  ]

  return (
    <div className="flex flex-col space-y-5">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search applications..."
          />
        </div>
      </div>

      <ApplicationsTable applications={applications} loading={loading} />

      <ProcessGuide />
    </div>
  )
}

export default MyApplicationsSection
