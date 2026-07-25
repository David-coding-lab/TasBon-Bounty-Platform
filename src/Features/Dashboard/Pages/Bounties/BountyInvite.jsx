import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Lock, Users } from 'lucide-react'
import { apiGet } from '../../../../services/api'
import { toast } from 'sonner'

const BountyInvite = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const [bounty, setBounty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code) return
    setLoading(true)
    apiGet(`/api/v1/bounties/invite/${code}`)
      .then((res) => {
        const data = res.data
        setBounty(data)
        if (data.id) {
          navigate(`/dashboard/bounties/${data.id}`, { replace: true })
        }
      })
      .catch((err) => {
        setError(err.message || 'Invalid or expired invite link')
        toast.error(err.message || 'Invalid or expired invite link')
      })
      .finally(() => setLoading(false))
  }, [code, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#34A563]" />
          <p className="text-sm text-[#4A5565]">Verifying invite link...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
        <div className="w-16 h-16 rounded-full bg-[#FFE2E2] flex items-center justify-center">
          <Lock size={28} className="text-[#C10007]" />
        </div>
        <h2 className="text-xl font-bold text-[#0A0A0A]">Invalid Invite Link</h2>
        <p className="text-sm text-[#4A5565] text-center max-w-md">
          This invite link is invalid or has expired. Contact the bounty creator for a new invite.
        </p>
        <button
          onClick={() => navigate('/dashboard/bounties')}
          className="flex items-center gap-2 px-4 py-2 bg-[#34A563] text-white text-sm font-medium rounded-lg hover:bg-[#007A55] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Bounties
        </button>
      </div>
    )
  }

  return null
}

export default BountyInvite
