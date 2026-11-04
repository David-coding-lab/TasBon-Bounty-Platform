import { useState } from 'react'
import { Wallet, Copy } from 'lucide-react'
import { toast } from 'sonner'

const NETWORK_LABELS = {
  bitcoin: 'Bitcoin (BTC)',
  trc20: 'USDT (TRON)',
  bep20: 'USDT (BNB Smart Chain)',
}

const PayoutMethods = ({ wallets = [] }) => {
  const [isPrimaryEnabled, setIsPrimaryEnabled] = useState(true)
  const [copying, setCopying] = useState(null)

  const primaryWallet = wallets.find((w) => w.isActive) || wallets[0]

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
    setCopying(address)
    toast.success('Address copied to clipboard')
    setTimeout(() => setCopying(null), 2000)
  }

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-base font-semibold text-[#111827]">
            Payout Methods
          </h4>
        </div>

        {wallets.length > 0 ? (
          <>
            {/* Primary Wallet Method */}
            <div className="flex items-center justify-between p-4 bg-[#EFF6FF] rounded-xl border border-[#3B82F6]/20 mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-[#111827]">
                      {NETWORK_LABELS[primaryWallet.network] || primaryWallet.network}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#3B82F6]/20 text-[#00B87C]">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs font-mono text-[#4B5563] break-all truncate max-w-[200px]">
                      {primaryWallet.address}
                    </span>
                    <button
                      onClick={() => handleCopy(primaryWallet.address)}
                      className={`text-xs text-[#00B87C] hover:text-[#009966] transition-colors cursor-pointer ${
                        copying === primaryWallet.address ? 'text-[#3B82F6]' : ''
                      }`}
                    >
                      {copying === primaryWallet.address ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wallet className="w-5 h-5 text-gray-400" />
            </div>
            <h4 className="text-sm font-semibold text-[#111827] mb-1">No wallet yet</h4>
            <p className="text-xs text-[#6B7280] mb-4">
              Generate a wallet address in the Earnings page to receive payouts.
            </p>
          </div>
        )}
      </div>

      {/* Add Payout Method Button */}
      <button className="w-full py-3.5 border border-dashed border-gray-300 hover:border-[#00B87C] bg-white rounded-xl flex items-center justify-center text-sm font-bold text-[#4B5563] hover:text-[#00B87C] transition-all cursor-pointer">
        + Add payout method
      </button>
    </div>
  )
}

export default PayoutMethods
