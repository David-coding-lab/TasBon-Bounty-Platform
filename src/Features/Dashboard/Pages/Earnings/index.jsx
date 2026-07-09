import { Settings, Download } from 'lucide-react'
import MetricsCards from './components/MetricsCards'
import EarningsDashboard from './components/EarningsDashboard'
import RecentTransactions from './components/RecentTransactions'
import PayoutMethods from './components/PayoutMethods'
import QuickStats from './components/QuickStats'

const Earnings = () => {
  return (
    <div className="flex flex-col space-y-6 min-h-full bg-gray-50 p-6">
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
          <button className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2 border border-[#E5E7EB] bg-white rounded-xl text-sm font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
            <Settings className="w-4 h-4 text-[#4B5563]" />
            <span>Payout settings</span>
          </button>
          <button className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2 bg-[#00B87C] hover:bg-[#009966] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Withdraw Funds</span>
          </button>
        </div>
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
          <PayoutMethods />
          <QuickStats />
        </div>
      </div>
    </div>
  )
}

export default Earnings
