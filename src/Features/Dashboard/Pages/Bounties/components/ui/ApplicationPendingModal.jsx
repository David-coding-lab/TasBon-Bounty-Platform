import { Check, ShieldCheck, ArrowRight } from 'lucide-react'

export default function ApplicationPendingModal({
  onViewApplication = () => {},
  onContinueExploring = () => {},
}) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 font-[Inter]">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#15803D] flex items-center justify-center">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#F4C430] text-center mb-2">
        Application Pending
      </h2>
      <p className="text-slate-700 font-semibold text-center text-[15px] leading-relaxed mb-6">
        Your application for this bounty has been successfully submitted to the
        creator.
      </p>

      {/* Info box */}
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

      {/* Actions */}
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
