import React from 'react'

/* Filter tab buttons with counts */
const filterTabs = [
  { label: 'All', count: 12 },
  { label: 'Bounties', count: 9 },
  { label: 'Hackaton', count: 4 },
  { label: 'Grants', count: 2 },
]

/* Table column headers */
const headers = ['OPPORTUNITY', 'TYPE', 'ORGANIZER', 'STATUS', 'APPLIED ON']

/* Application table data */
const applicationData = [
  {
    opportunity: 'TASBUN July Hackathon',
    type: 'Hackathon',
    organizer: 'TASBUN',
    status: 'Under Review',
    appliedOn: 'May 20, 2025',
  },
  {
    opportunity: 'Web3 Social Grant',
    type: 'Grant',
    organizer: 'Web3 Foundation',
    status: 'Shortlisted',
    appliedOn: 'May 18, 2025',
  },
  {
    opportunity: 'Build with LayerOne',
    type: 'Bounty',
    organizer: 'LayerOne',
    status: 'In Progress',
    appliedOn: 'May 15, 2025',
  },
  {
    opportunity: 'DeFi Innovation Grant',
    type: 'Grant',
    organizer: 'Nexus Protocol',
    status: 'Not Selected',
    appliedOn: 'May 10, 2025',
  },
  {
    opportunity: 'Smart Contract Security',
    type: 'Bounty',
    organizer: 'ChainGuard',
    status: 'In Progress',
    appliedOn: 'May 08, 2025',
  },
]

/* Status badge color mapping — each row gets a unique style */
const statusStyles = [
  { bg: 'bg-[#FEF3C6]', text: 'text-[#BB4D00]' },
  { bg: 'bg-[#D0FAE5]', text: 'text-[#007A55]' },
  { bg: 'bg-[#DBEAFE]', text: 'text-[#1447E6]' },
  { bg: 'bg-[#FFE2E2]', text: 'text-[#C10007]' },
  { bg: 'bg-[#DBEAFE]', text: 'text-[#1447E6]' },
]

/* Applications section — track bounty, grant, and hackathon applications */
const Aplication = () => {
  return (
    /* Main container: vertical stack with spacing */
    <div className="flex flex-col space-y-4">
      {/* Header: heading and subheading only (no "View all") */}
      <div className="flex flex-col">
        <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">
          Applications
        </h2>
        <p className="font-[Inter] text-sm text-[#4A5565]">
          Track your applications for bounties, grants and hackathons.
        </p>
      </div>

      {/* Applications box — bordered container with tabs and table */}
      <div className="w-full border border-[#E5E7EB] rounded-md">
        {/* Top bar — filter tab buttons */}
        <div className="flex flex-row space-x-8 p-3 border-b border-[#E5E7EB]">
          {filterTabs.map((tab, index) => (
            <button
              key={index}
              className="text-base font-bold text-[#4A5565] cursor-pointer hover:text-[#009966] hover:border-b-2 hover:border-[#009966] active:text-[#009966] active:border-b-2 active:border-[#009966] pb-1"
            >
              {tab.label}({tab.count})
            </button>
          ))}
        </div>

        {/* Applications table */}
        <table className="w-full">
          {/* Table header */}
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body — mapped from applicationData */}
          <tbody>
            {applicationData.map((item, index) => (
              <tr key={index} className="border-b border-[#E5E7EB]">
                {/* Opportunity name */}
                <td className="text-base text-[#0A0A0A] p-3 hover:cursor-pointer hover:underline hover:text-[#009966]">
                  {item.opportunity}
                </td>
                {/* Type */}
                <td className="text-base text-[#4A5565] p-3">{item.type}</td>
                {/* Organizer */}
                <td className="text-base text-[#4A5565] p-3">
                  {item.organizer}
                </td>
                {/* Status badge with unique color per row */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-2xl ${statusStyles[index].bg} ${statusStyles[index].text}`}
                  >
                    {item.status}
                  </span>
                </td>
                {/* Applied on date */}
                <td className="text-base text-[#4A5565] p-3">
                  {item.appliedOn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Aplication
