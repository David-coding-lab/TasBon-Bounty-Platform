import { useState, useEffect } from 'react'
import { getTransactions } from '../../../../../services/earnings'

const RecentTransactions = () => {
  const [data, setData] = useState({ transactions: [], page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    getTransactions(page)
      .then((res) => setData(res))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h4 className="text-base font-semibold text-[#111827]">Recent Transactions</h4>
          <a href="#" className="text-xs font-semibold text-[#00B87C] hover:text-[#009966] transition-colors">
            View all transactions &gt;
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Transaction</th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Type</th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Source</th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Amount</th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Status / Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(null).map((_, idx) => (
                  <tr key={idx} className="border-b border-gray-50">
                    <td className="py-4"><div className="h-4 w-40 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="py-4"><div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" /></td>
                    <td className="py-4"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="py-4"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="py-4"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse" /></td>
                  </tr>
                ))
              ) : data.transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 text-sm">No transactions yet</td>
                </tr>
              ) : (
                data.transactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-none group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <span className="text-sm font-semibold text-[#111827] group-hover:text-[#00B87C] transition-colors">{tx.name}</span>
                    </td>
                    <td className="py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tx.typeColor || 'text-[#00B87C] bg-[#E6F8F2]'}`}>{tx.type}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${tx.type === 'Bounty' ? 'bg-[#3B82F6]' : tx.type === 'Hackathon' ? 'bg-[#F97316]' : tx.type === 'Grant' ? 'bg-[#06B6D4]' : 'bg-[#10B981]'}`} />
                        <span className="text-sm text-[#4B5563] font-medium">{tx.source}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#111827]">{tx.amount}</span>
                        <span className="text-xs text-[#9CA3AF]">{tx.usdcAmount}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1.5 text-[#00B87C]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00B87C]" />
                          <span className="text-sm font-semibold">{tx.status}</span>
                        </div>
                        <span className="text-xs text-[#9CA3AF] mt-0.5">{tx.date}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && data.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6 pt-4 border-t border-gray-50">
          {Array.from({ length: Math.min(data.totalPages, 5) }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${
                p === page ? 'bg-[#00B87C] text-white shadow-sm' : 'hover:bg-gray-100 text-[#4B5563] hover:text-[#111827]'
              }`}>{p}</button>
          ))}
          {data.totalPages > 5 && <span className="text-[#9CA3AF] text-xs font-bold px-1 select-none">...</span>}
        </div>
      )}
    </div>
  )
}

export default RecentTransactions
