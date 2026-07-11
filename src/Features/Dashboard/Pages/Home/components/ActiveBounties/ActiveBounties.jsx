import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { getMyBounties } from '../../../../../../pages/Bounties/Api/bounties'

const ActiveBounties = () => {
  const [bounties, setBounties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyBounties()
      .then((res) => setBounties(res.data?.assigned || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-[Inter] text-xl font-bold text-[#0A0A0A]">Active Bounties</h2>
          <p className="font-[Inter] text-sm text-[#4A5565]">Bounties you are currently working on</p>
        </div>
        <div className="flex flex-row items-center gap-1 cursor-pointer">
          <span className="text-base text-[#009966]">View all</span>
          <ArrowRight className="w-4 h-4 text-[#009966]" />
        </div>
      </div>

      <table className="w-full border border-[#E5E7EB]">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">BOUNTY</th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">CLIENT</th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">REWARD</th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">STATUS</th>
            <th className="font-[Inter] text-sm text-[#4A5565] text-left p-3 font-medium">ACTION</th>
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
          ) : bounties.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-400 text-sm">No active bounties</td>
            </tr>
          ) : (
            bounties.map((item, index) => (
              <tr key={index} className="border-b border-[#E5E7EB]">
                <td className="text-base text-[#0A0A0A] p-3">{item.title}</td>
                <td className="text-base text-[#4A5565] p-3">{item.creatorName || '—'}</td>
                <td className="text-base text-[#0A0A0A] p-3">{item.rewardAmount} {item.rewardToken}</td>
                <td className="text-base p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'in_progress' ? 'bg-[#DBEAFE] text-[#1447E6]' :
                    item.status === 'open' ? 'bg-[#D0FAE5] text-[#007A55]' :
                    'bg-gray-100 text-gray-600'
                  }`}>{item.status}</span>
                </td>
                <td className="p-3">
                  <button className="py-2 px-4 rounded-2xl bg-[#009966] text-[#FFFFFF] text-base cursor-pointer hover:bg-[#007A55] transition-colors">
                    Submit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ActiveBounties
