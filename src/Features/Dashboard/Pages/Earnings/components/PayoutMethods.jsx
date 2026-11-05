import { useState, useEffect, useCallback } from 'react'
import {
  Wallet,
  Copy,
  Plus,
  Trash2,
  Edit3,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import {
  getPayoutMethods,
  createPayoutMethod,
  deletePayoutMethod,
} from '../../../../../services/earnings'
import { toast } from 'sonner'

const NETWORK_LABELS = {
  bitcoin: 'Bitcoin (BTC)',
  trc20: 'USDT (TRON)',
  bep20: 'USDT (BNB Smart Chain)',
}

const NETWORK_COLORS = {
  bitcoin: {
    bg: 'bg-[#F3F4F6]',
    text: 'text-[#111827]',
    border: 'border-gray-200',
  },
  trc20: {
    bg: 'bg-[#EFF6FF]',
    text: 'text-[#3B82F6]',
    border: 'border-[#3B82F6]/20',
  },
  bep20: {
    bg: 'bg-[#F0FDF4]',
    text: 'text-[#00B87C]',
    border: 'border-[#00B87C]/20',
  },
}

const PayoutMethods = ({ wallets = [] }) => {
  const [payoutMethods, setPayoutMethods] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'crypto_wallet',
    label: '',
    details: { network: '', address: '' },
  })

  const fetchPayoutMethods = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getPayoutMethods()
      setPayoutMethods(res.data || [])
    } catch {
      setPayoutMethods([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPayoutMethods()
  }, [fetchPayoutMethods])

  const handleAddPayoutMethod = async (e) => {
    e.preventDefault()
    if (!formData.details.network || !formData.details.address) {
      toast.error('Please fill in network and address')
      return
    }
    try {
      setAdding(true)
      const res = await createPayoutMethod(formData)
      setPayoutMethods((prev) => [...prev, res.data])
      setFormData({
        type: 'crypto_wallet',
        label: '',
        details: { network: '', address: '' },
      })
      setShowForm(false)
      toast.success('Payout method added successfully')
    } catch (err) {
      toast.error(err.message || 'Failed to add payout method')
    } finally {
      setAdding(false)
    }
  }

  const handleDeletePayoutMethod = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payout method?'))
      return
    try {
      setDeleting(id)
      await deletePayoutMethod(id)
      setPayoutMethods((prev) => prev.filter((m) => m.id !== id))
      toast.success('Payout method deleted')
    } catch (err) {
      toast.error(err.message || 'Failed to delete payout method')
    } finally {
      setDeleting(null)
    }
  }

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
    toast.success('Address copied to clipboard')
  }

  const primaryMethod =
    payoutMethods.find((m) => m.isDefault) || payoutMethods[0]
  const networkInfo =
    NETWORK_COLORS[primaryMethod?.details?.network] || NETWORK_COLORS.bitcoin

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      {/* Header with add button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-base font-semibold text-[#111827]">
            Payout Methods
          </h4>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage your withdrawal destinations
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#00B87C]/10 border border-[#00B87C]/20 rounded-lg text-xs font-semibold text-[#00B87C] hover:bg-[#00B87C]/20 transition-colors"
        >
          <Plus className="w-3 h-3" /> Add Method
        </button>
      </div>

      {/* Payout Methods List */}
      <div className="flex-1 min-h-[200px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mb-2" />
            <p className="text-xs text-[#6B7280]">Loading payout methods...</p>
          </div>
        ) : payoutMethods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-sm font-semibold text-[#111827] mb-1">
              No payout methods
            </h4>
            <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
              Add a payout method to receive withdrawals directly to your
              wallet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {payoutMethods.map((method) => {
              const isPrimary = method.isDefault
              const netColor =
                NETWORK_COLORS[method.details?.network] ||
                NETWORK_COLORS.bitcoin
              return (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    isPrimary
                      ? 'border-[#3B82F6]/20 bg-[#EFF6FF]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#E5E7EB]/50 transition-colors'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`p-2.5 rounded-lg flex items-center justify-center ${netColor.bg}`}
                    >
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#111827]">
                          {NETWORK_LABELS[method.details?.network] ||
                            method.details?.network ||
                            'Wallet'}
                        </span>
                        {isPrimary && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#3B82F6]/20 text-[#3B82F6]">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1.5">
                        <span className="text-xs font-mono text-[#4B5563] break-all truncate max-w-[220px]">
                          {method.details?.address}
                        </span>
                        <button
                          onClick={() => handleCopy(method.details?.address)}
                          className="text-xs text-[#00B87C] hover:text-[#009966] transition-colors cursor-pointer"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDeletePayoutMethod(method.id)}
                      disabled={deleting === method.id}
                      className="text-xs text-[#EF4444] hover:text-[#DC2626] transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {deleting === method.id ? (
                        <AlertCircle className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Payout Method Form */}
      {showForm && (
        <div className="mt-6 border border-[#E5E7EB] rounded-xl p-5 bg-[#F9FAFB] shadow-sm">
          <h5 className="text-xs font-semibold text-[#111827] mb-3 uppercase tracking-wider">
            Add New Payout Method
          </h5>
          <form onSubmit={handleAddPayoutMethod} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] mb-1 uppercase tracking-wider">
                  Label
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="e.g. My BTC Wallet"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:border-[#00B87C] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] mb-1 uppercase tracking-wider">
                  Network
                </label>
                <select
                  value={formData.details.network}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: { ...prev.details, network: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:border-[#00B87C] focus:outline-none transition-colors"
                >
                  <option value="">Select network</option>
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="trc20">USDT (TRON)</option>
                  <option value="bep20">USDT (BNB Smart Chain)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[#6B7280] mb-1 uppercase tracking-wider">
                Wallet Address
              </label>
              <input
                type="text"
                value={formData.details.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    details: { ...prev.details, address: e.target.value },
                  }))
                }
                placeholder="Enter wallet address"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:border-[#00B87C] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-xs text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  adding ||
                  !formData.details.network ||
                  !formData.details.address
                }
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  adding ||
                  !formData.details.network ||
                  !formData.details.address
                    ? 'bg-gray-200 text-gray-400'
                    : 'bg-[#00B87C] text-white hover:bg-[#009966]'
                }`}
              >
                {adding ? 'Adding...' : 'Add Method'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default PayoutMethods
