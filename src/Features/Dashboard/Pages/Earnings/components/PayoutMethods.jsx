import { useState, useEffect, useCallback } from 'react'
import { Wallet, Copy, Plus, Trash2, AlertCircle } from 'lucide-react'
import {
  getPayoutMethods,
  createPayoutMethod,
  deletePayoutMethod,
} from '../../../../../services/earnings'
import { toast } from 'sonner'
import { formatWalletAddress } from '../formatWalletAddress'

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

const PayoutMethods = () => {
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

  const handleCopy = async (address) => {
    try {
      await navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard')
    } catch {
      toast.error('Could not copy address')
    }
  }

  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#007A55]">
            <Wallet className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-[#111827]">
              Payout methods
            </h2>
            <p className="mt-0.5 text-xs text-[#6B7280]">
              Manage your withdrawal destinations
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          aria-label="Add payout method"
          aria-expanded={showForm}
          aria-controls="add-payout-method-form"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#009966] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#007A55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009966]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Add method</span>
        </button>
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="space-y-3" aria-label="Loading payout methods">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="flex animate-pulse items-center gap-3 rounded-xl border border-gray-100 p-4"
              >
                <div className="h-10 w-10 rounded-lg bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 rounded bg-gray-100" />
                  <div className="h-3 w-48 max-w-full rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : payoutMethods.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#F9FAFB] px-5 py-9 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] text-[#007A55]">
              <Wallet className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-[#111827]">
              No payout methods
            </h3>
            <p className="mt-1 max-w-xs text-xs leading-5 text-[#6B7280]">
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
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-colors sm:p-4 ${
                    isPrimary
                      ? 'border-[#009966]/25 bg-[#F2FBF7]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#009966]/25 hover:bg-[#FCFEFD]'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${netColor.bg} ${netColor.text}`}
                  >
                    <Wallet className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-semibold text-[#111827]">
                        {method.label ||
                          NETWORK_LABELS[method.details?.network] ||
                          method.details?.network ||
                          'Wallet'}
                      </span>
                      {isPrimary && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#DCF5E9] px-2 py-0.5 text-[10px] font-semibold text-[#007A55]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#009966]" />
                          Default
                        </span>
                      )}
                    </div>
                    {method.label && (
                      <p className="mt-0.5 text-xs text-[#6B7280]">
                        {NETWORK_LABELS[method.details?.network] ||
                          method.details?.network ||
                          'Crypto wallet'}
                      </p>
                    )}
                    <div className="mt-2 flex min-w-0 items-center gap-2">
                      <code
                        className="min-w-0 truncate rounded-md border border-gray-100 bg-white/80 px-2 py-1 text-xs text-[#4B5563]"
                        aria-label="Wallet address, shortened"
                      >
                        {formatWalletAddress(method.details?.address)}
                      </code>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(method.details?.address || '')
                        }
                        aria-label="Copy full wallet address"
                        className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-[#007A55] transition-colors hover:bg-[#ECFDF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                      >
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeletePayoutMethod(method.id)}
                    disabled={deleting === method.id}
                    aria-label={`Delete ${method.label || 'payout method'}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 disabled:cursor-wait disabled:opacity-50"
                  >
                    {deleting === method.id ? (
                      <AlertCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Payout Method Form */}
      {showForm && (
        <div
          id="add-payout-method-form"
          className="mt-5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5"
        >
          <h3 className="mb-4 text-sm font-semibold text-[#111827]">
            Add a payout method
          </h3>
          <form onSubmit={handleAddPayoutMethod} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="payout-method-label"
                  className="mb-1.5 block text-xs font-semibold text-[#4B5563]"
                >
                  Label
                </label>
                <input
                  id="payout-method-label"
                  type="text"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="e.g. My BTC Wallet"
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors focus:border-[#009966] focus:ring-2 focus:ring-[#009966]/15"
                />
              </div>
              <div>
                <label
                  htmlFor="payout-method-network"
                  className="mb-1.5 block text-xs font-semibold text-[#4B5563]"
                >
                  Network
                </label>
                <select
                  id="payout-method-network"
                  value={formData.details.network}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: { ...prev.details, network: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors focus:border-[#009966] focus:ring-2 focus:ring-[#009966]/15"
                >
                  <option value="">Select network</option>
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="trc20">USDT (TRON)</option>
                  <option value="bep20">USDT (BNB Smart Chain)</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="payout-method-address"
                className="mb-1.5 block text-xs font-semibold text-[#4B5563]"
              >
                Wallet address
              </label>
              <input
                id="payout-method-address"
                type="text"
                value={formData.details.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    details: { ...prev.details, address: e.target.value },
                  }))
                }
                placeholder="Enter wallet address"
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors focus:border-[#009966] focus:ring-2 focus:ring-[#009966]/15"
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[#6B7280] transition-colors hover:bg-white hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
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
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009966] ${
                  adding ||
                  !formData.details.network ||
                  !formData.details.address
                    ? 'bg-gray-200 text-gray-400'
                    : 'bg-[#009966] text-white hover:bg-[#007A55]'
                }`}
              >
                {adding ? 'Adding…' : 'Add method'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default PayoutMethods
