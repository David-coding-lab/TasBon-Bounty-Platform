import {
  Activity,
  Briefcase,
  Home,
  MessageSquare,
  Target,
  Trophy,
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
    'Bounties you created and bounties assigned to you will appear here.',
  Hackathons:
    'Hackathons you join and their submission progress will appear here.',
  Grants: 'Your grant applications and funding activity will appear here.',
  Activity: 'A timeline of your recent profile and platform activity.',
  Reviews: 'Feedback and ratings from clients will appear here.',
}

export const roleLabels = {
  USER: 'Member',
  BOUNTY_HUNTER: 'Builder',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super admin',
}

export const comingSoonTabs = {
  Hackathons: {
    icon: Trophy,
    title: 'Hackathons are coming soon',
    description:
      'Join hackathons, track your submissions, and showcase what you build with your team.',
  },
  Grants: {
    icon: Briefcase,
    title: 'Grants are coming soon',
    description:
      'Apply for grants and follow your funding activity from one simple workspace.',
  },
  Reviews: {
    icon: MessageSquare,
    title: 'Reviews are coming soon',
    description:
      'Client feedback and ratings will appear here once your profile receives its first review.',
  },
}
