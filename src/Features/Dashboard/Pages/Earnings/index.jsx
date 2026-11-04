import { useState, useEffect, useCallback } from 'react'
import { Settings, Download, Wallet, Send, ShieldCheck } from 'lucide-react'
import MetricsCards from './components/MetricsCards'
import EarningsDashboard from './components/EarningsDashboard'
import RecentTransactions from './components/RecentTransactions'
import PayoutMethods from './components/PayoutMethods'
import QuickStats from './components/QuickStats'
import { getUserWallets, generateWallet } from '../../../../../services/wallets'
import { getEarningsMetrics, withdrawFunds } from '../../../../../services/earnings'
import { toast } from 'sonner'

const NETWORK_LABELS = {
  bitcoin: 'Bitcoin (BTC)',
  trc20: 'USDT (TRON)',
  bep20: 'USDT (BNB Smart Chain)',
}

const Earnings = () => {
  const [wallets, setWallets] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [loadingWallets, setLoadingWallets] = useState(true)
  const [loadingMetrics, setLoadingMetrics] = useState(true)
  const [generatingWallet, setGeneratingWallet] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [withdrawForm, setWithdrawForm] = useState({
    amount: '',
    method: 'crypto_wallet',
    address: '',
  })
  const [withdrawError, setWithdrawError] = useState(null)
  const [feeBreakdown, setFeeBreakdown] = useState(null)
  const [selectedWallet, setSelectedWallet] = useState(null)

  const fetchWallets = useCallback(async () => {
    try {
      setLoadingWallets(true)
      const res = await getUserWallets()
      setWallets(res.data || [])
    } catch {
      setWallets([])
    } finally {
      setLoadingWallets(false)
    }
  }, [])

  const fetchMetrics = useCallback(async () => {
    try {
      setLoadingMetrics(true)
      const res = await getEarningsMetrics()
      setMetrics(res.data)
      calculateFee(res.data?.availableBalance || 0)
    } catch {
      setMetrics(null)
    } finally {
      setLoadingMetrics(false)
    }
  }, [])

  const calculateFee = useCallback((amount) => {
    const platformFeePercent = 1 // matches ROQQU_PLATFORM_FEE_PERCENT backend default
    const fee = Number((amount * (platformFeePercent / 100)).toFixed(2))
    const netAmount = Number((amount - fee).toFixed(2))
    setFeeBreakdown({ amount, fee, netAmount })
  }, [])

  useEffect(() => {
    fetchWallets()
    fetchMetrics()
  }, [fetchWallets, fetchMetrics])

  const handleGenerateWallet = async (e) => {
    e.preventDefault()
    const network = 'bitcoin'
    const token = 'btc'
    const customer = {
      email: '',
      first_name: '',
      last_name: '',
    }

    try {
      setGeneratingWallet(true)
      const res = await generateWallet({ network, token, customer })
      const newWallet = res.data
      setWallets((prev) => [...prev, newWallet])
      setSelectedWallet(newWallet)
      toast.success(`Your ${NETWORK_LABELS[network]} wallet address is ready`)
    } catch (err) {
      toast.error(err.message || 'Failed to generate wallet')
    } finally {
      setGeneratingWallet(false)
    }
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()
    setWithdrawError(null)

    if (!withdrawForm.amount || !withdrawForm.address) {
      setWithdrawError('Please enter amount and destination address')
      return
    }

    try {
      setWithdrawing(true)
      await withdrawFunds({
        amount: parseFloat(withdrawForm.amount),
        method: withdrawForm.method,
        address: withdrawForm.address,
      })
      setWithdrawModal(false)
      setWithdrawForm({ amount: '', method: 'crypto_wallet', address: '' })
      setFeeBreakdown(null)
      await fetchMetrics()
      toast.success('Withdrawal submitted', { description: 'Your funds are being processed' })
    } catch (err) {
      setWithdrawError(err.message || 'Withdrawal failed')
    } finally {
      setWithdrawing(false)
    }
  }

  const handleAmountChange = (e) => {
    const value = e.target.value
    setWithdrawForm((prev) => ({ ...prev, amount: value }))
    if (value) {
      calculateFee(parseFloat(value))
    } else {
      setFeeBreakdown(null)
    }
  }

  const hasWallet = wallets.length > 0
  const primaryWallet = wallets.find((w) => w.isActive) || wallets[0]

  return (
    <div className="flex flex-col space-y-6 min-h-full bg-gray-50 p-3 sm:p-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">
            Earnings
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Track your earnings, payments, and payout history
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => setWithdrawModal(true)}
            className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2 bg-[#00B87C] hover:bg-[#009966] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasWallet || withdrawing}
          >
            <Download className="w-4 h-4" />
            <span>Withdraw Funds</span>
          </button>
        </div>
      </div>

      {/* Wallet Address Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-semibold text-[#111827]">
            Your Wallet Address
          </h4>
          {hasWallet ? null : (
            <button
              onClick={handleGenerateWallet}
              className="flex items-center space-x-1.5 text-xs font-semibold text-[#00B87C] hover:text-[#009966] transition-colors cursor-pointer"
              disabled={generatingWallet}
            >
              {generatingWallet ? (
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Generate Wallet</span>
              )}
            </button>
          )}
        </div>

        {loadingWallets ? (
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
        ) : hasWallet ? (
          <div className="flex items-center justify-between p-4 bg-[#EFF6FF] rounded-xl border border-[#3B82F6]/20">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-[#111827]">
                    Bitcoin Wallet
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#3B82F6]/20 text-[#00B87C]">
                    Active
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs font-mono text-[#4B5563] break-all">
                    {primaryWallet?.address}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(primaryWallet?.address || '')
                      toast.success('Wallet address copied to clipboard')
                    }}
                    className="text-xs text-[#00B87C] hover:text-[#009966] transition-colors cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wallet className="w-5 h-5 text-gray-400" />
            </div>
            <h4 className="text-sm font-semibold text-[#111827] mb-1">No wallet yet</h4>
            <p className="text-xs text-[#6B7280] mb-4">
              Generate a wallet address to receive payments and withdraw funds.
            </p>
          </div>
        )}
      </div>

      {/* Metrics Cards Grid */}
      <MetricsCards />

      {/* Charts Row */}
      <EarningsDashboard />

      {/* Bottom Transactions & Settings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <PayoutMethods wallets={wallets} />
          <QuickStats />
        </div>
      </div>

      {/* Withdraw Modal */}
      {withdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#111827]">Withdraw Funds</h3>
              <button
                onClick={() => setWithdrawModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ShieldCheck size={20} />
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Amount to Withdraw
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={withdrawForm.amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-[#111827] focus:border-[#00B87C] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Destination Address
                </label>
                <input
                  type="text"
                  value={withdrawForm.address}
                  onChange={(e) =>
                    setWithdrawForm((prev) => ({ ...prev, address: e.target.value }))
                  }
                  placeholder="Enter your wallet address"
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-[#111827] focus:border-[#00B87C] focus:outline-none transition-colors"
                />
              </div>

              {feeBreakdown && (
                <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#3B82F6]/20">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#4B5563]">Withdrawal Amount</span>
                    <span className="text-[#111827] font-medium">-{feeBreakdown.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#4B5563]">Platform Fee (1%)</span>
                    <span className="text-[#4B5563]">-{feeBreakdown.fee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#111827] pt-2 border-t border-[#3B82F6]/30">
                    <span>Net Amount</span>
                    <span>{feeBreakdown.netAmount}</span>
                  </div>
                </div>
              </div>

              {withdrawError && (
                <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] px-4 py-2 rounded-lg text-sm">
                  {withdrawError}
                </div>
              )}

              <button
                type="submit"
                disabled={withdrawing || !feeBreakdown}
                className="w-full py-2.5 bg-[#00B87C] hover:bg-[#009966] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                {withdrawing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Confirm Withdrawal</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Earnings
