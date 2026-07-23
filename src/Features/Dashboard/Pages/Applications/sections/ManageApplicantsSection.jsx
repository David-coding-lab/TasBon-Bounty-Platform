import { useState, useEffect } from 'react'
import FilterTabs from '../components/FilterTabs'
import SearchBar from '../components/SearchBar'
import ApplicantsTable from '../components/ApplicantsTable'
import {
  getBountyApplicants,
  removeApplicant,
  selectApplicant,
} from '../services/Bountyapplicants.stub'

const ManageApplicantsSection = () => {
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const loadApplicants = () => {
    setLoading(true)
    const params = {}
    if (activeTab !== 'All') params.status = activeTab
    if (searchQuery) params.search = searchQuery
    getBountyApplicants(params)
      .then((res) => setApplicants(res.applicants || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadApplicants()
  }, [activeTab, searchQuery])

  const tabCounts = applicants.reduce((acc, applicant) => {
    acc['All'] = (acc['All'] || 0) + 1
    acc[applicant.status] = (acc[applicant.status] || 0) + 1
    return acc
  }, {})

  const tabs = [
    { label: 'All', count: tabCounts['All'] || 0 },
    { label: 'Pending Review', count: tabCounts['Pending Review'] || 0 },
    { label: 'Selected', count: tabCounts['Selected'] || 0 },
    { label: 'Removed', count: tabCounts['Removed'] || 0 },
  ]

  // Optimistic update so the row moves/disappears right away, then
  // refetch in the background to stay in sync with the server.
  const handleSelect = (applicant) => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === applicant.id ? { ...a, status: 'Selected' } : a,
      ),
    )
    selectApplicant(applicant.id).catch(() => loadApplicants())
  }

  const handleRemove = (applicant) => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === applicant.id ? { ...a, status: 'Removed' } : a,
      ),
    )
    removeApplicant(applicant.id).catch(() => loadApplicants())
  }

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
            placeholder="Search applicants..."
          />
        </div>
      </div>

      <ApplicantsTable
        applicants={applicants}
        loading={loading}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default ManageApplicantsSection
