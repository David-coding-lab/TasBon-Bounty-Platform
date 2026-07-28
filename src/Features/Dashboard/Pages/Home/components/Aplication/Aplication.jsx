import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

      <div className="hidden sm:block w-full border border-[#E5E7EB] rounded-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {headers.map((header, index) => (
                <th key={index} className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium whitespace-nowrap">{header}</th>
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
              <tr><td colSpan={5} className="p-6 text-center text-gray-400 text-sm">No applications yet</td></tr>
            ) : (
              applications.map((item, index) => {
                const style = getStyle(item.status)
                return (
                  <tr key={index} className="border-b border-[#E5E7EB]">
                    <td className="text-base text-[#0A0A0A] p-3">
                      {item.bountyId ? (
                        <Link to={`/dashboard/bounties/${item.bountyId}`} className="hover:text-[#009966] hover:underline">{item.title}</Link>
                      ) : (
                        <span className="hover:cursor-pointer hover:underline hover:text-[#009966]">{item.title}</span>
                      )}
                    </td>
                    <td className="text-base text-[#4A5565] p-3">Bounty</td>
                    <td className="text-base text-[#4A5565] p-3">{item.issuerName}</td>
                    <td className="p-3"><span className={`px-3 py-1 rounded-2xl text-xs font-medium ${style.bg} ${style.text}`}>{item.status}</span></td>
                    <td className="text-base text-[#4A5565] p-3 whitespace-nowrap">{item.appliedOn}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden flex flex-col gap-3">
        {loading ? (
          Array(3).fill(null).map((_, i) => (
            <div key={i} className="border border-[#E5E7EB] rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))
        ) : applications.length === 0 ? (
          <div className="py-6 text-center text-gray-400 text-sm">No applications yet</div>
        ) : (
          applications.map((item, index) => {
            const style = getStyle(item.status)
            return (
              <div key={index} className="border border-[#E5E7EB] rounded-xl p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    {item.bountyId ? (
                      <Link to={`/dashboard/bounties/${item.bountyId}`} className="text-sm font-semibold text-[#0A0A0A] hover:text-[#009966] leading-snug line-clamp-2">{item.title}</Link>
                    ) : (
                      <span className="text-sm font-semibold text-[#0A0A0A] leading-snug line-clamp-2">{item.title}</span>
                    )}
                  </div>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-2xl text-[10px] font-medium ${style.bg} ${style.text}`}>{item.status}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#4A5565]">
                  <span>Bounty · {item.issuerName}</span>
                  <span className="whitespace-nowrap">{item.appliedOn}</span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Aplication
