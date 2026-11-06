import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  AtSign,
  CalendarDays,
  Clock3,
  Eye,
  Mail,
  Medal,
  PencilLine,
  Phone,
  ShieldCheck,
  Target,
} from 'lucide-react'
import SectionHeading from './components/SectionHeading'
import {
  comingSoonTabs,
  profileTabs,
  roleLabels,
  tabDescriptions,
} from './profileData'
import { formatJoined, toNumber } from './profileUtils'

const STATUS_STYLES = {
  open: { label: 'Open', className: 'bg-[#ECFDF5] text-[#007A55]' },
  in_progress: {
    label: 'In progress',
    className: 'bg-[#EFF6FF] text-[#3B82F6]',
  },
  submitted: { label: 'Submitted', className: 'bg-[#FFF7ED] text-[#C2410C]' },
  completed: {
    label: 'Completed',
    className: 'bg-[#F0FDF4] text-[#15803D]',
  },
  cancelled: { label: 'Cancelled', className: 'bg-[#FEF2F2] text-[#DC2626]' },
}

function getStatusMeta(status) {
  return (
    STATUS_STYLES[status] || {
      label: status ? status.replace(/_/g, ' ') : 'Unknown',
      className: 'bg-gray-100 text-[#6B7280]',
    }
  )
}

function formatReward(bounty) {
  const amount = toNumber(bounty?.rewardAmount)
  const token = bounty?.rewardToken || 'USDC'
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${token}`
}

function InlineEmpty({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-[#E5E7EB] bg-gray-50 px-4 py-8 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#9CA3AF] shadow-sm">
        <Icon size={18} aria-hidden="true" />
      </span>
      <p className="mt-3 text-sm font-semibold text-[#111827]">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-xs leading-5 text-[#6B7280]">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}

function BountyRow({ bounty, kind }) {
  const status = getStatusMeta(bounty?.status)

  return (
    <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#3B82F6]">
          <Target size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#111827]">
            {bounty?.title || 'Untitled bounty'}
          </p>
          <p className="mt-0.5 truncate text-xs text-[#6B7280]">
            {kind} · {formatReward(bounty)}
          </p>
        </div>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${status.className}`}
      >
        {status.label}
      </span>
    </div>
  )
}

function BountySection({
  title,
  description,
  items,
  kind,
  emptyTitle,
  emptyDescription,
}) {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
      <SectionHeading
        title={title}
        description={description}
        action={
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-[#6B7280]">
            {items.length}
          </span>
        }
      />
      {items.length > 0 ? (
        <div className="divide-y divide-[#F3F4F6]">
          {items.map((bounty) => (
            <BountyRow key={bounty.id} bounty={bounty} kind={kind} />
          ))}
        </div>
      ) : (
        <InlineEmpty
          icon={Target}
          title={emptyTitle}
          description={emptyDescription}
        />
      )}
    </section>
  )
}

function AccountDetail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-[#6B7280]">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold tracking-wide text-[#9CA3AF] uppercase">
          {label}
        </dt>
        <dd className="mt-0.5 truncate text-sm font-medium text-[#111827]">
          {value}
        </dd>
      </div>
    </div>
  )
}

function ComingSoonPanel({ tab }) {
  const meta = comingSoonTabs[tab] || {
    icon: Eye,
    title: `${tab} is coming soon`,
    description: tabDescriptions[tab] || 'This section is being built.',
  }
  const Icon = meta.icon

  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-12 text-center shadow-sm">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#007A55]">
        <Icon size={24} aria-hidden="true" />
      </span>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-2.5 py-1 text-[11px] font-semibold text-[#C2410C]">
        <Clock3 size={12} aria-hidden="true" />
        Coming soon
      </span>
      <h2 className="mt-3 text-base font-semibold text-[#111827]">
        {meta.title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
        {meta.description}
      </p>
    </section>
  )
}

export default function OverviewContent({
  activeTab,
  onTabChange,
  profile,
  stats,
  bounties,
  activities,
  onEdit,
}) {
  const created = bounties?.created || []
  const assigned = bounties?.assigned || []
  const recentBounties = [
    ...created.map((bounty) => ({ bounty, kind: 'Created' })),
    ...assigned.map((bounty) => ({ bounty, kind: 'Assigned' })),
  ].slice(0, 3)

  const level = Math.max(1, toNumber(stats?.level))
  const xp = toNumber(stats?.xp)
  const xpNext = toNumber(stats?.xpNextLevel)
  const xpPercent =
    xpNext > 0 ? Math.min(100, Math.round((xp / xpNext) * 100)) : 0
  const xpRemaining = Math.max(xpNext - xp, 0)

  const accountDetails = [
    { icon: Mail, label: 'Email', value: profile?.email || 'Not added' },
    {
      icon: AtSign,
      label: 'Username',
      value: profile?.userName ? `@${profile.userName}` : 'Not set',
    },
    { icon: Phone, label: 'Phone', value: profile?.phoneNumber || 'Not added' },
    {
      icon: ShieldCheck,
      label: 'Account type',
      value: roleLabels[profile?.type] || 'Member',
    },
    {
      icon: CalendarDays,
      label: 'Member since',
      value: formatJoined(profile?.createdAt) || 'Not available',
    },
    {
      icon: Target,
      label: 'Bounties',
      value: `${toNumber(profile?.bountyCount)} total`,
    },
  ]

  const handleTabKeyDown = (event, currentIndex) => {
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % profileTabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + profileTabs.length) % profileTabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = profileTabs.length - 1
    } else {
      return
    }

    event.preventDefault()
    onTabChange(profileTabs[nextIndex].label)
    const nextTab =
      event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[
        nextIndex
      ]
    nextTab?.focus()
  }

  return (
    <>
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-sm">
        <div
          className="flex gap-1 overflow-x-auto"
          role="tablist"
          aria-label="Profile sections"
        >
          {profileTabs.map(({ label, icon: Icon }, index) => {
            const active = activeTab === label

            return (
              <button
                key={label}
                id={`profile-tab-${label.toLowerCase()}`}
                type="button"
                role="tab"
                tabIndex={active ? 0 : -1}
                aria-selected={active}
                aria-controls={`profile-panel-${label.toLowerCase()}`}
                onClick={() => onTabChange(label)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009966] ${
                  active
                    ? 'bg-[#00B87C] text-white shadow-sm'
                    : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]'
                }`}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'Overview' && (
        <div
          id="profile-panel-overview"
          role="tabpanel"
          aria-labelledby="profile-tab-overview"
          tabIndex={0}
          className="mt-6 grid gap-6 outline-none xl:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div className="min-w-0 space-y-6">
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                title="About"
                description="A quick introduction to you and your work."
                action={
                  <button
                    type="button"
                    onClick={onEdit}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#007A55] transition-colors hover:text-[#006045] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                  >
                    <PencilLine size={13} aria-hidden="true" />
                    Edit
                  </button>
                }
              />
              {profile?.bio ? (
                <p className="text-sm leading-7 text-[#4B5563]">
                  {profile.bio}
                </p>
              ) : (
                <InlineEmpty
                  icon={PencilLine}
                  title="No bio yet"
                  description="Add a short introduction so clients know what you build."
                  action={
                    <button
                      type="button"
                      onClick={onEdit}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#ECFDF5] px-3 py-2 text-xs font-semibold text-[#007A55] transition-colors hover:bg-[#D1FAE5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                    >
                      Add bio
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  }
                />
              )}
            </section>

            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                title="Account details"
                description="Your core TasBon account information."
              />
              <dl className="grid gap-4 sm:grid-cols-2">
                {accountDetails.map(({ icon, label, value }) => (
                  <AccountDetail
                    key={label}
                    icon={icon}
                    label={label}
                    value={value}
                  />
                ))}
              </dl>
            </section>

            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                title="Recent bounties"
                description="Bounties you created or were assigned."
                action={
                  recentBounties.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => onTabChange('Bounties')}
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#007A55] transition-colors hover:text-[#006045] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                    >
                      View all
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  ) : null
                }
              />
              {recentBounties.length > 0 ? (
                <div className="divide-y divide-[#F3F4F6]">
                  {recentBounties.map(({ bounty, kind }) => (
                    <BountyRow
                      key={`${kind}-${bounty.id}`}
                      bounty={bounty}
                      kind={kind}
                    />
                  ))}
                </div>
              ) : (
                <InlineEmpty
                  icon={Target}
                  title="No bounties yet"
                  description="Join a bounty or create one to see it featured here."
                  action={
                    <Link
                      to="/dashboard/bounties"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#ECFDF5] px-3 py-2 text-xs font-semibold text-[#007A55] transition-colors hover:bg-[#D1FAE5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                    >
                      Browse bounties
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  }
                />
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <SectionHeading title="Builder progress" />
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#007A55]">
                  <Medal size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-[#6B7280]">Current level</p>
                  <p className="text-lg font-bold text-[#111827]">
                    Level {level}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">XP progress</span>
                  <span className="font-semibold text-[#111827]">
                    {xp} / {xpNext} XP
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F3F4F6]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00B87C] to-[#007A55] transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#6B7280]">
                  {xpNext > 0
                    ? `${xpRemaining} XP to reach level ${level + 1}.`
                    : 'Start earning XP to unlock your next level.'}
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <SectionHeading
                title="Recent activity"
                action={
                  activities.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => onTabChange('Activity')}
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#007A55] transition-colors hover:text-[#006045] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                    >
                      View all
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  ) : null
                }
              />
              {activities.length > 0 ? (
                <ol className="space-y-4">
                  {activities.slice(0, 4).map((item, index) => (
                    <li
                      key={item.id || index}
                      className="flex gap-3 border-b border-[#F3F4F6] pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-[#007A55]">
                        <Activity size={13} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm leading-5 text-[#111827]">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs text-[#6B7280]">
                          {item.timestamp}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <InlineEmpty
                  icon={Activity}
                  title="No activity yet"
                  description="Your recent account activity will appear here."
                />
              )}
            </section>
          </aside>
        </div>
      )}

      {activeTab === 'Bounties' && (
        <div
          id="profile-panel-bounties"
          role="tabpanel"
          aria-labelledby="profile-tab-bounties"
          tabIndex={0}
          className="mt-6 space-y-6 outline-none"
        >
          <BountySection
            title="Created by you"
            description="Bounties you published for builders."
            items={created}
            kind="Created"
            emptyTitle="No bounties created yet"
            emptyDescription="Publish your first bounty to start receiving solutions from builders."
          />
          <BountySection
            title="Assigned to you"
            description="Bounties you are currently working on."
            items={assigned}
            kind="Assigned"
            emptyTitle="No assigned bounties yet"
            emptyDescription="Apply to bounties to get matched with work you enjoy."
          />
        </div>
      )}

      {activeTab === 'Activity' && (
        <div
          id="profile-panel-activity"
          role="tabpanel"
          aria-labelledby="profile-tab-activity"
          tabIndex={0}
          className="mt-6 outline-none"
        >
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading
              title="Activity timeline"
              description="Your latest account activity."
            />
            {activities.length > 0 ? (
              <ol className="relative ml-3 border-l border-[#E5E7EB]">
                {activities.map((item, index) => (
                  <li
                    key={item.id || index}
                    className="relative pb-6 pl-6 last:pb-0"
                  >
                    <span className="absolute top-1 -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#00B87C]" />
                    <p className="text-sm font-medium text-[#111827]">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-[#6B7280]">
                      {item.timestamp}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <InlineEmpty
                icon={Activity}
                title="No activity yet"
                description="Your recent account activity will appear here."
              />
            )}
          </section>
        </div>
      )}

      {comingSoonTabs[activeTab] && (
        <div
          id={`profile-panel-${activeTab.toLowerCase()}`}
          role="tabpanel"
          aria-labelledby={`profile-tab-${activeTab.toLowerCase()}`}
          tabIndex={0}
          className="mt-6 outline-none"
        >
          <ComingSoonPanel tab={activeTab} />
        </div>
      )}
    </>
  )
}
