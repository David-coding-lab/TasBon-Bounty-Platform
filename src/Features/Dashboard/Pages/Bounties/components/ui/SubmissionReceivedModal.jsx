import {
  Check,
  ClipboardCheck,
  IdCard,
  Timer,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'

export default function SubmissionReceivedModal({
  onViewApplication = () => {},
  onContinueExploring = () => {},
  bounty,
  submission,
}) {
  const title = submission?.title || bounty?.title || 'Bounty'
  const projectName = submission?.project || bounty?.issuerName || ''
  const submittedAt = submission?.submittedAt
    ? new Date(submission.submittedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
  const submissionId = submission?.id
    ? `#sub-${String(submission.id).slice(-4).toUpperCase()}`
    : submission?.submissionId || ''
  const status = submission?.status || 'Under Review'
  const imageUrl = submission?.image || bounty?.imageUrl || ''

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 font-[Inter]">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#15803D] flex items-center justify-center">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
        Submission Received
      </h2>
      <p className="text-[#64748B] font-semibold text-center text-[15px] leading-relaxed mb-6">
        Your work has been successfully submitted for review by the bounty
        creator.
      </p>

      <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 mb-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-[#15803D]/10 flex items-center justify-center text-[#15803D] font-bold text-xl shrink-0">
            {title.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="font-bold text-slate-900 text-base leading-snug">
            {title}
          </h3>
          {projectName && (
            <div className="flex items-center gap-1 text-[#15803D] text-sm mt-0.5">
              <span>{projectName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <DetailRow
          icon={<ClipboardCheck className="w-[18px] h-[18px]" />}
          label="Submitted"
          value={submittedAt}
        />
        {submissionId && (
          <DetailRow
            icon={<IdCard className="w-[18px] h-[18px]" />}
            label="Submission ID"
            value={submissionId}
          />
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#64748B]">
            <Timer className="w-[18px] h-[18px]" />
            <span className="text-[15px]">Status</span>
          </div>
          <span className="text-sm font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md">
            {status}
          </span>
        </div>
      </div>

      <div className="bg-[#15803D]/5 rounded-xl p-4 flex gap-3 mb-8">
        <ShieldCheck className="w-5 h-5 text-[#15803D] flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-[#15803D] text-base mb-1">
            What happens next?
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            The bounty creator will review your application. You'll be notified
            if you're selected to work on this bounty.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onViewApplication}
          className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-[15px] hover:bg-slate-50 transition-colors"
        >
          View My Application
        </button>
        <button
          onClick={onContinueExploring}
          className="flex-1 py-3 rounded-xl bg-[#15803D] text-white font-bold text-[15px] hover:bg-[#12692f] transition-colors flex items-center justify-center gap-2"
        >
          Continue Exploring
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5 text-[#64748B]">
        {icon}
        <span className="text-[15px]">{label}</span>
      </div>
      <span className="text-[15px] text-slate-900 font-medium">{value}</span>
    </div>
  )
}
