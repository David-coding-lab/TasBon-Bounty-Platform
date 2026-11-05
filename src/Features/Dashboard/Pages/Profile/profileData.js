import {
  Activity,
  AtSign,
  Briefcase,
  CircleHelp,
  Code,
  Gift,
  Globe,
  Home,
  LockKeyhole,
  MessageSquare,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Trophy,
  Wallet,
  Zap,
} from 'lucide-react'

export const profileTabs = [
  { label: 'Overview', icon: Home },
  { label: 'Bounties', icon: Target },
  { label: 'Hackathons', icon: Trophy },
  { label: 'Grants', icon: Briefcase },
  { label: 'Activity', icon: Activity },
  { label: 'Reviews', icon: MessageSquare },
]

export const tabDescriptions = {
  Bounties:
    'Your active, submitted, and completed bounty work will appear here.',
  Hackathons:
    'Hackathons you join and their submission progress will appear here.',
  Grants: 'Your grant applications and funding activity will appear here.',
  Activity: 'Recent profile and platform activity will appear here.',
  Reviews: 'Feedback and ratings from clients will appear here.',
}

export const featuredProjects = [
  {
    title: 'DeFi Yield Optimizer',
    category: 'DeFi',
    description:
      'An example project card. Add your own work when project editing is available.',
    image:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'DAO Governance Hub',
    category: 'DAO',
    description:
      'An example project card. Add your own work when project editing is available.',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'NFT Marketplace UI',
    category: 'NFT',
    description:
      'An example project card. Add your own work when project editing is available.',
    image:
      'https://images.unsplash.com/photo-1646469829162-7f3f9a4f5e4b?auto=format&fit=crop&w=900&q=85',
  },
]

export const skills = [
  'Solidity',
  'Smart contracts',
  'React',
  'TypeScript',
  'Web3.js',
  'Next.js',
  'Ethers.js',
  'Hardhat',
  'Tailwind CSS',
  'IPFS',
]

export const topSkills = [
  { name: 'Solidity', score: 95 },
  { name: 'React', score: 81 },
  { name: 'TypeScript', score: 90 },
  { name: 'Web3.js', score: 95 },
  { name: 'DeFi', score: 89 },
]

export const skillTags = [
  'Solidity',
  'Smart contracts',
  'React',
  'TypeScript',
  'Web3.js',
  'DeFi',
  'UI/UX',
]

export const badges = [
  { name: 'Top performer', icon: Zap, style: 'bg-blue-50 text-blue-600' },
  {
    name: 'Verified builder',
    icon: ShieldCheck,
    style: 'bg-violet-50 text-violet-600',
  },
  {
    name: 'Security expert',
    icon: ShieldCheck,
    style: 'bg-emerald-50 text-emerald-700',
  },
  { name: 'DeFi specialist', icon: Wallet, style: 'bg-cyan-50 text-cyan-700' },
  {
    name: 'Bounty contributor',
    icon: Sparkles,
    style: 'bg-fuchsia-50 text-fuchsia-600',
  },
  {
    name: 'Five star rating',
    icon: Star,
    style: 'bg-orange-50 text-orange-600',
  },
]

export const socialLinks = [
  { label: 'GitHub', icon: Code, field: 'githubUrl' },
  { label: 'Twitter', icon: AtSign, field: 'twitterUrl' },
  { label: 'LinkedIn', icon: Briefcase, field: 'linkedinUrl' },
  { label: 'Website', icon: Globe, field: 'website' },
]

export const settingsItems = [
  {
    title: 'Account & security',
    description: 'Manage your account password and sign-in security.',
    icon: LockKeyhole,
  },
  {
    title: 'Preferences',
    description: 'Manage your account preferences and personalization.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Privacy',
    description: 'Choose how your profile information is shared.',
    icon: ShieldCheck,
  },
  {
    title: 'Help & support',
    description: 'Find help and answers to common questions.',
    icon: CircleHelp,
  },
  {
    title: 'Notifications',
    description: 'Manage how and when you receive notifications.',
    icon: Gift,
  },
]

export const profileStatsFallback = [
  { key: 'activeBountiesCount', value: '—', label: 'Active bounties' },
  { key: 'totalEarnings', value: '—', label: 'Total earned' },
  { key: 'applicationsCount', value: '—', label: 'Applications' },
  { key: 'successRate', value: '—', label: 'Success rate' },
  { key: 'level', value: '—', label: 'Builder level' },
  { key: 'xp', value: '—', label: 'XP this level' },
]
