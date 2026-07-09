const RecentTransactions = () => {
  const transactions = [
    {
      name: 'Build DeFi Analytics Dashboard',
      type: 'Bounty',
      typeColor: 'text-[#00B87C] bg-[#E6F8F2]',
      source: 'Nexus Protocol',
      sourceColor: 'bg-[#3B82F6]',
      amount: '+$750.00',
      usdcAmount: '+750 USDC',
      status: 'Paid',
      date: 'May 20, 2025',
    },
    {
      name: 'Smart Contract Audit',
      type: 'Bounty',
      typeColor: 'text-[#00B87C] bg-[#E6F8F2]',
      source: 'ChainGuard',
      sourceColor: 'bg-[#8B5CF6]',
      amount: '+$1,500.00',
      usdcAmount: '+1,200 USDC',
      status: 'Paid',
      date: 'May 18, 2025',
    },
    {
      name: 'Web3 UI Design Hackathon',
      type: 'Hackathon',
      typeColor: 'text-[#D97706] bg-[#FEF3C7]',
      source: 'Non-Stable',
      sourceColor: 'bg-[#F97316]',
      amount: '+$900.00',
      usdcAmount: '+600 USDC',
      status: 'Paid',
      date: 'May 12, 2025',
    },
    {
      name: 'DAO Governance Platform',
      type: 'Grant',
      typeColor: 'text-[#3B82F6] bg-[#EFF6FF]',
      source: 'DAO Collective',
      sourceColor: 'bg-[#06B6D4]',
      amount: '+$1,500.00',
      usdcAmount: '+650 USDC',
      status: 'Paid',
      date: 'May 5, 2025',
    },
    {
      name: 'Referral Bonus',
      type: 'Bonus',
      typeColor: 'text-[#4B5563] bg-[#F3F4F6]',
      source: 'TASBUN',
      sourceColor: 'bg-[#10B981]',
      amount: '+$500.00',
      usdcAmount: '+100 USDC',
      status: 'Paid',
      date: 'Apr 28, 2025',
    },
  ]

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        {/* Table Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h4 className="text-base font-semibold text-[#111827]">
            Recent Transactions
          </h4>
          <a
            href="#"
            className="text-xs font-semibold text-[#00B87C] hover:text-[#009966] transition-colors"
          >
            View all transactions &gt;
          </a>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Transaction
                </th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Type
                </th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Source
                </th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Amount
                </th>
                <th className="pb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Status / Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 last:border-none group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4">
                    <span className="text-sm font-semibold text-[#111827] group-hover:text-[#00B87C] transition-colors">
                      {tx.name}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${tx.typeColor}`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2 h-2 rounded-full ${tx.sourceColor}`}
                      />
                      <span className="text-sm text-[#4B5563] font-medium">
                        {tx.source}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#111827]">
                        {tx.amount}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">
                        {tx.usdcAmount}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1.5 text-[#00B87C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B87C]" />
                        <span className="text-sm font-semibold">{tx.status}</span>
                      </div>
                      <span className="text-xs text-[#9CA3AF] mt-0.5">
                        {tx.date}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-6 pt-4 border-t border-gray-50">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00B87C] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer">
          1
        </button>
        {[2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-[#4B5563] hover:text-[#111827] text-xs font-bold transition-colors cursor-pointer"
          >
            {page}
          </button>
        ))}
        <span className="text-[#9CA3AF] text-xs font-bold px-1 select-none">...</span>
      </div>
    </div>
  )
}

export default RecentTransactions
