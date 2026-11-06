export function getInitials(name) {
  return (
    name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'B'
  )
}

export function toNumber(value) {
  const amount = Number(value)
  return Number.isFinite(amount) ? amount : 0
}

export function formatCurrency(value) {
  return `$${toNumber(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatJoined(value) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export function getProfileCompleteness(profile) {
  const checks = [
    {
      key: 'fullName',
      label: 'Display name',
      action: 'Add your display name',
      done: Boolean(profile?.fullName?.trim()),
    },
    {
      key: 'avatarUrl',
      label: 'Profile photo',
      action: 'Add a profile photo',
      done: Boolean(profile?.avatarUrl),
    },
    {
      key: 'bio',
      label: 'Short bio',
      action: 'Write a short bio',
      done: Boolean(profile?.bio?.trim()),
    },
    {
      key: 'phoneNumber',
      label: 'Phone number',
      action: 'Add a phone number',
      done: Boolean(profile?.phoneNumber?.trim()),
    },
    {
      key: 'email',
      label: 'Email address',
      action: 'Add an email address',
      done: Boolean(profile?.email?.trim()),
    },
  ]

  const completed = checks.filter((check) => check.done).length

  return {
    checks,
    completed,
    total: checks.length,
    percent: Math.round((completed / checks.length) * 100),
    nextStep: checks.find((check) => !check.done)?.action || null,
  }
}
