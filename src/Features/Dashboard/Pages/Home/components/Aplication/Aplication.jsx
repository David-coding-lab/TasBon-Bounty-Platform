import { useState, useEffect } from 'react'
import { getApplications } from '../../../../../../services/applications'

const Aplication = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApplications({ limit: 5 })
      .then((res) => setApplications(res.applications || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const headers = ['OPPORTUNITY', 'TYPE', 'ORGANIZER', 'STATUS', 'APPLIED ON']

  const statusStyles = {
    'Pending Review': { bg: 'bg-[#FEF3C6]', text: 'text-[#BB4D00]' },
    'In Progress': { bg: 'bg-[#DBEAFE]', text: 'text-[#1447E6]' },
    'In Review': { bg: 'bg-[#EDE9FE]', text: 'text-[#6D28D9]' },
    Completed: { bg: 'bg-[#D0FAE5]', text: 'text-[#007A55]' },
    'Not Selected': { bg: 'bg-[#FFE2E2]', text: 'text-[#C10007]' },
  }

  const getStyle = (status) => statusStyles[status] || { bg: 'bg-gray-100', text: 'text-gray-600' }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">Applications</h2>
        <p className="font-[Inter] text-sm text-[#4A5565]">Track your applications for bounties, grants and hackathons.</p>
      </div>

      <div className="w-full border border-[#E5E7EB] rounded-md">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {headers.map((header, index) => (
                <th key={index} className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(3).fill(null).map((_, i) => (
                <tr key={i} className="border-b border-[#E5E7EB]">
                  {Array(5).fill(null).map((_, j) => (
                    <td key={j} className="p-3"><div className="h-4 bg-gray-100 rounded animate-pulse w-24" /></td>
                  ))}
                </tr>
              ))
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400 text-sm">No applications yet</td>
              </tr>
            ) : (
              applications.map((item, index) => {
                const style = getStyle(item.status)
                return (
                  <tr key={index} className="border-b border-[#E5E7EB]">
                    <td className="text-base text-[#0A0A0A] p-3 hover:cursor-pointer hover:underline hover:text-[#009966]">{item.title}</td>
                    <td className="text-base text-[#4A5565] p-3">Bounty</td>
                    <td className="text-base text-[#4A5565] p-3">{item.issuerName}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-2xl text-xs font-medium ${style.bg} ${style.text}`}>{item.status}</span>
                    </td>
                    <td className="text-base text-[#4A5565] p-3">{item.appliedOn}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Aplication
