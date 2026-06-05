import { useState } from 'react'
import {
  Search,
  Bell,
  Home,
  Target,
  FileText,
  Trophy,
  DollarSign,
  Wallet,
  MessageSquare,
  Bookmark,
  Settings,
  Gift,
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  Hand,
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menu = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Target, label: 'Bounties' },
    { icon: FileText, label: 'Applications' },
    { icon: Trophy, label: 'Hackathons' },
    { icon: DollarSign, label: 'Grants' },
    { icon: Wallet, label: 'Earnings' },
    { icon: MessageSquare, label: 'Messages', badge: 2 },
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: Settings, label: 'Settings' },
  ]

  const stats = [
    {
      label: 'Total Earnings',
      value: '$2,450.00',
      sub: '+9.5% this month',
      subColor: 'text-emerald-600',
      icon: TrendingUp,
    },
    {
      label: 'Active Bounties',
      value: '4',
      sub: 'In progress',
      subColor: 'text-gray-500',
    },
    {
      label: 'Applications',
      value: '12',
      sub: '5 new updates',
      subColor: 'text-orange-500',
    },
    {
      label: 'Success Rate',
      value: '78%',
      sub: '+5% this month',
      subColor: 'text-emerald-600',
    },
  ]

  const recommended = [
    {
      tag: 'Smart Contract',
      tagBg: 'bg-emerald-50 text-emerald-700',
      title: 'Audit DeFi Protocol Smart Contracts',
      client: 'Nexus Protocol',
      reward: '$1,200 USDC',
      level: 'Intermediate',
      img: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=200&fit=crop',
    },
    {
      tag: 'Frontend',
      tagBg: 'bg-blue-50 text-blue-700',
      title: 'Build Analytics Dashboard for DAO',
      client: 'LayerOne',
      reward: '$750 USDC',
      level: 'Intermediate',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
    },
    {
      tag: 'Web3',
      tagBg: 'bg-purple-50 text-purple-700',
      title: 'Integrate Wallet Connect for Web App',
      client: 'DAO Collective',
      reward: '$600 USDC',
      level: 'Beginner',
      img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=200&fit=crop',
    },
  ]

  const bounties = [
    {
      bounty: 'Build a DeFi Analytics Dashboard',
      client: 'Nexus Protocol',
      reward: '$500 USDC',
      due: 'Jun 15, 2025',
    },
    {
      bounty: 'Smart Contract Audit Tool',
      client: 'LayerOne',
      reward: '$1,200 USDC',
      due: 'Jun 22, 2025',
    },
    {
      bounty: 'Community Voting DApp',
      client: 'DAO Collective',
      reward: '$300 USDC',
      due: 'Jun 30, 2025',
    },
    {
      bounty: 'Wallet Integration for dApp',
      client: 'Web3Labs',
      reward: '$450 USDC',
      due: 'Jul 06, 2025',
    },
  ]

  const apps = [
    {
      opp: 'TASBUN July Hackathon',
      type: 'Hackathon',
      org: 'TASBUN',
      status: 'Under Review',
      color: 'bg-amber-100 text-amber-700',
      date: 'May 20, 2025',
    },
    {
      opp: 'Web3 Social Grant',
      type: 'Grant',
      org: 'Web3 Foundation',
      status: 'Shortlisted',
      color: 'bg-emerald-100 text-emerald-700',
      date: 'May 18, 2025',
    },
    {
      opp: 'Build with LayerOne',
      type: 'Bounty',
      org: 'LayerOne',
      status: 'In Progress',
      color: 'bg-blue-100 text-blue-700',
      date: 'May 15, 2025',
    },
    {
      opp: 'DeFi Innovation Grant',
      type: 'Grant',
      org: 'Nexus Protocol',
      status: 'Not Selected',
      color: 'bg-red-100 text-red-700',
      date: 'May 10, 2025',
    },
    {
      opp: 'Smart Contract Security',
      type: 'Bounty',
      org: 'ChainGuard',
      status: 'In Progress',
      color: 'bg-blue-100 text-blue-700',
      date: 'May 08, 2025',
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* LEFT SIDEBAR */}
      <aside
        className={`fixed lg:static z-50 w-64 bg-white border-r border-gray-200 flex-col p-4 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <span className="font-bold text-lg text-gray-900">TASBUN</span>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {menu.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${item.active ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <item.icon size={18} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="bg-emerald-700 rounded-xl p-4 text-white">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
            <Gift size={18} />
          </div>
          <p className="font-semibold text-sm mb-1">Host a bounty</p>
          <p className="text-xs opacity-90 mb-3">
            Get high-quality solutions from skilled builders.
          </p>
          <button className="w-full bg-white text-emerald-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
            Create bounty →
          </button>
        </div>
      </aside>

      {/* MAIN + RIGHT */}
      <div className="flex-1 flex-col">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <Bell size={20} className="text-gray-600 cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/32"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-900">
                Alex Rivera
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-4 lg:p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-1 text-gray-900">
            Welcome back, <span className="text-emerald-600">Alex</span>{' '}
            <Hand size={22} className="inline text-amber-500" />
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Discover opportunities, build solutions, and earn rewards.
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* CENTER MAIN */}
            <div className="xl:col-span-2 space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white p-4 rounded-xl border-gray-200"
                  >
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xl font-bold text-gray-900">
                        {s.value}
                      </p>
                      {s.icon && (
                        <s.icon size={14} className="text-emerald-500" />
                      )}
                    </div>
                    <p className={`text-xs ${s.subColor}`}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Recommended */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Recommended for you
                    </h2>
                    <p className="text-xs text-gray-500">
                      Bounties that match your skills and interests.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    View all →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommended.map((b) => (
                    <div
                      key={b.title}
                      className="bg-white rounded-xl border-gray-200 overflow-hidden hover:shadow-md transition"
                    >
                      <img src={b.img} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${b.tagBg}`}
                        >
                          {b.tag}
                        </span>
                        <h3 className="font-semibold text-sm mt-2 mb-1 text-gray-900">
                          {b.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                          {b.client}
                        </div>
                        <p className="font-bold text-lg mb-2 text-gray-900">
                          {b.reward}
                        </p>
                        <p className="text-xs text-gray-400 mb-3">
                          ● {b.level}
                        </p>
                        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                          View bounty →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Bounties Table */}
              <div className="bg-white rounded-xl border-gray-200 p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Active Bounties
                    </h2>
                    <p className="text-xs text-gray-500">
                      Bounties you are currently working on.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    View all →
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b">
                        <th className="pb-2 font-medium">BOUNTY</th>
                        <th className="pb-2 font-medium">CLIENT</th>
                        <th className="pb-2 font-medium">REWARD</th>
                        <th className="pb-2 font-medium">DUE DATE</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bounties.map((b) => (
                        <tr
                          key={b.bounty}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          <td className="py-3 text-gray-900">{b.bounty}</td>
                          <td className="text-gray-600">{b.client}</td>
                          <td className="font-medium text-gray-900">
                            {b.reward}
                          </td>
                          <td className="text-gray-600">{b.due}</td>
                          <td>
                            <button className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-700">
                              Submit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Applications */}
              <div className="bg-white rounded-xl border-gray-200 p-4">
                <h2 className="font-semibold mb-1 text-gray-900">
                  Applications
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                  Track your applications for bounties, grants and hackathons.
                </p>
                <div className="flex gap-6 border-b mb-3 overflow-x-auto">
                  {[
                    'All (12)',
                    'Bounties (9)',
                    'Hackathons (4)',
                    'Grants (2)',
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.split(' ')[0])}
                      className={`text-sm pb-2 whitespace-nowrap ${activeTab === tab.split(' ')[0] ? 'border-b-2 border-emerald-600 text-emerald-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b">
                        <th className="pb-2 font-medium">OPPORTUNITY</th>
                        <th className="pb-2 font-medium">TYPE</th>
                        <th className="pb-2 font-medium">ORGANIZER</th>
                        <th className="pb-2 font-medium">STATUS</th>
                        <th className="pb-2 font-medium">APPLIED ON</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apps.map((a) => (
                        <tr
                          key={a.opp}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          <td className="py-3 font-medium text-gray-900">
                            {a.opp}
                          </td>
                          <td className="text-gray-600">{a.type}</td>
                          <td className="text-gray-600">{a.org}</td>
                          <td>
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${a.color}`}
                            >
                              {a.status}
                            </span>
                          </td>
                          <td className="text-gray-600">{a.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Explore */}
              <div>
                <h2 className="font-semibold mb-1 text-gray-900">
                  Explore opportunities
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                  More ways to build, learn and earn.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Trophy,
                      title: 'Join a Hackathon',
                      desc: 'Build, compete and win exciting prizes.',
                      link: 'Explore hackathons→',
                      bg: 'bg-emerald-50 text-emerald-600',
                      linkColor: 'text-emerald-600',
                    },
                    {
                      icon: Gift,
                      title: 'Apply for Grants',
                      desc: 'Get funding to build your ideas and projects.',
                      link: 'Explore grants →',
                      bg: 'bg-orange-50 text-orange-600',
                      linkColor: 'text-orange-600',
                    },
                    {
                      icon: Search,
                      title: 'Browse All Bounties',
                      desc: 'Find more bounties that match your skills.',
                      link: 'Browse bounties→',
                      bg: 'bg-blue-50 text-blue-600',
                      linkColor: 'text-blue-600',
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="bg-white p-4 rounded-xl border-gray-200 hover:shadow-md transition"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.bg}`}
                      >
                        <card.icon size={20} />
                      </div>
                      <h3 className="font-semibold text-sm mb-1 text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{card.desc}</p>
                      <a
                        href="#"
                        className={`text-sm font-medium ${card.linkColor} hover:underline`}
                      >
                        {card.link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-4">
              <div className="bg-emerald-700 text-white p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://i.pravatar.cc/60"
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  <div>
                    <p className="font-semibold">Alex Rivera</p>
                    <p className="text-xs opacity-80">Builder</p>
                  </div>
                </div>
                <p className="text-xs mb-1">Level 5 Builder</p>
                <div className="w-full bg-emerald-900 rounded-full h-1.5 mb-1">
                  <div
                    className="bg-white h-1.5 rounded-full"
                    style={{ width: '10%' }}
                  ></div>
                </div>
                <p className="text-xs opacity-80">L250 / 2,500 XP</p>
              </div>

              <div className="bg-white p-4 rounded-xl border-gray-200">
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold text-sm text-gray-900">
                    Top bounty creators
                  </h3>
                  <a
                    href="#"
                    className="text-xs text-emerald-600 hover:underline"
                  >
                    View all →
                  </a>
                </div>
                {[
                  {
                    name: 'Nexus Protocol',
                    sub: '24 bounties • $535K+ paid',
                    img: 'https://i.pravatar.cc/24?u=1',
                  },
                  {
                    name: 'LayerOne',
                    sub: '18 bounties • $90K+ paid',
                    img: 'https://i.pravatar.cc/24?u=2',
                  },
                  {
                    name: 'DAO Collective',
                    sub: '15 bounties • $60K+ paid',
                    img: 'https://i.pravatar.cc/24?u=3',
                  },
                  {
                    name: 'Web3Labs',
                    sub: '12 bounties • $385K+ paid',
                    img: 'https://i.pravatar.cc/24?u=4',
                  },
                  {
                    name: 'ChainGuard',
                    sub: '10 bounties • $30K+ paid',
                    img: 'https://i.pravatar.cc/24?u=5',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-2">
                    <span className="text-sm text-gray-400 w-3">{i + 1}</span>
                    <img src={item.img} className="w-6 h-6 rounded-full" />
                    <div className="text-xs flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-xl border-gray-200">
                <h3 className="font-semibold text-sm mb-3 text-gray-900">
                  Recent activity
                </h3>
                {[
                  {
                    icon: DollarSign,
                    text: 'You earned $180 USDC',
                    sub: 'from completing a bounty',
                    time: '3h ago',
                    bg: 'bg-emerald-100',
                    color: 'text-emerald-600',
                  },
                  {
                    icon: FileText,
                    text: 'Your application for Web3 Social Grant was shortlisted',
                    time: '1d ago',
                    bg: 'bg-amber-100',
                    color: 'text-amber-600',
                  },
                  {
                    icon: Target,
                    text: 'New bounty match for your skills',
                    time: '2d ago',
                    bg: 'bg-blue-100',
                    color: 'text-blue-600',
                  },
                  {
                    icon: MessageSquare,
                    text: 'Alex from LayerOne replied to your submission',
                    time: '3d ago',
                    bg: 'bg-purple-100',
                    color: 'text-purple-600',
                  },
                ].map((act, i) => (
                  <div key={i} className="flex gap-2 py-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${act.bg}`}
                    >
                      <act.icon size={12} className={act.color} />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-medium text-gray-900">{act.text}</p>
                      {act.sub && <p className="text-gray-500">{act.sub}</p>}
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {act.time}
                    </span>
                  </div>
                ))}
                <a
                  href="#"
                  className="text-xs text-emerald-600 mt-2 block hover:underline"
                >
                  View all activity →
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
