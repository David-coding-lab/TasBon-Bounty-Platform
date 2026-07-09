import { useState } from 'react'
import { Wallet } from 'lucide-react'

const PayoutMethods = () => {
  const [isPrimaryEnabled, setIsPrimaryEnabled] = useState(true)

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-base font-semibold text-[#111827]">
            Payout Methods
          </h4>
          <a
            href="#"
            className="text-xs font-semibold text-[#00B87C] hover:text-[#009966] transition-colors cursor-pointer"
          >
            Manage
          </a>
        </div>

        {/* Primary Wallet Method */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-[#111827]">
                  USDC Wallet
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 text-[#4B5563]">
                  Primary
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-0.5 font-mono">
                0x8a...4f2b
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => setIsPrimaryEnabled(!isPrimaryEnabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isPrimaryEnabled ? 'bg-[#00B87C]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isPrimaryEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Add Payout Method Button */}
      <button className="w-full py-3.5 border border-dashed border-gray-300 hover:border-[#00B87C] bg-white rounded-xl flex items-center justify-center text-sm font-bold text-[#4B5563] hover:text-[#00B87C] transition-all cursor-pointer">
        + Add payout method
      </button>
    </div>
  )
}

export default PayoutMethods
