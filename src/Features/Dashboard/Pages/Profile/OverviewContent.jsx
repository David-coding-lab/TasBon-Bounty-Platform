import { useState } from 'react'
import { toast } from 'sonner'
import {
  Activity,
  ArrowRight,
  Briefcase,
  ChevronRight,
  Eye,
  MessageSquare,
  Target,
  Trophy,
} from 'lucide-react'
import SectionHeading from './components/SectionHeading'
import {
  badges,
  featuredProjects,
  profileTabs,
  settingsItems,
  skills,
  tabDescriptions,
  topSkills,
} from './profileData'

const tabIconMap = {
  Overview: Eye,
  Bounties: Target,
  Hackathons: Trophy,
  Grants: Briefcase,
  Activity,
  Reviews: MessageSquare,
}

export default function OverviewContent({ activeTab, onTabChange }) {
  const [expandedSetting, setExpandedSetting] = useState(null)

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
      <div className="mt-5 border-b border-slate-200">
        <div
          className="flex gap-6 overflow-x-auto"
          role="tablist"
          aria-label="Profile sections"
        >
          {profileTabs.map(({ label }, index) => {
            const Icon = tabIconMap[label] || Eye
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
                className={`flex shrink-0 items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009966] ${
                  active
                    ? 'border-[#009966] text-[#007A55]'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab !== 'Overview' ? (
        <section
          id={`profile-panel-${activeTab.toLowerCase()}`}
          role="tabpanel"
          aria-labelledby={`profile-tab-${activeTab.toLowerCase()}`}
          tabIndex={0}
          className="mt-6 rounded-xl border border-slate-100 bg-white px-5 py-12 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] text-[#007A55]">
            {(() => {
              const Icon = tabIconMap[activeTab] || Eye
              return <Icon size={20} aria-hidden="true" />
            })()}
          </div>
          <h2 className="mt-4 font-sora text-base font-semibold text-slate-800">
            {activeTab}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            {tabDescriptions[activeTab] ||
              'This section will show your profile activity.'}
          </p>
          <button
            type="button"
            onClick={() =>
              toast(
                `${activeTab} will appear here when this section is connected.`,
              )
            }
            className="mt-5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
          >
            View section status
          </button>
        </section>
      ) : (
        <div
          id="profile-panel-overview"
          role="tabpanel"
          aria-labelledby="profile-tab-overview"
          tabIndex={0}
          className="outline-none"
        >
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_268px]">
            <div className="min-w-0">
              <SectionHeading
                title="Featured work"
                action={
                  <button
                    type="button"
                    onClick={() =>
                      toast('Project management will be available here soon.')
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#007A55] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                  >
                    View all projects{' '}
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                }
              />

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {featuredProjects.map((project) => (
                  <article
                    key={project.title}
                    className="overflow-hidden rounded-xl border border-slate-100 bg-white transition-shadow hover:shadow-md"
                  >
                    <div className="relative h-32 overflow-hidden bg-[#006045]">
                      <img
                        src={project.image}
                        alt=""
                        loading="lazy"
                        onError={(event) => event.currentTarget.remove()}
                        className="h-full w-full object-cover opacity-75"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/30 px-3 text-center text-white">
                        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold">
                          Example · {project.category}
                        </span>
                        <span className="mt-2 font-sora text-sm font-semibold">
                          {project.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-sora text-sm font-bold text-slate-800">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {project.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <section className="mt-7">
                <SectionHeading title="Skills" />
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Sample skills shown until your profile skills are connected.
                </p>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="rounded-xl border border-slate-100 bg-white p-4">
                <SectionHeading title="Top skills" />
                <div className="space-y-4">
                  {topSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="font-medium text-slate-600">
                          {skill.name}
                        </span>
                        <span className="text-slate-400">{skill.score}%</span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-slate-100"
                        role="progressbar"
                        aria-label={`${skill.name} proficiency`}
                        aria-valuenow={skill.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full bg-[#009966]"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Example skill levels
                </p>
              </section>

              <section className="rounded-xl border border-slate-100 bg-white p-4">
                <SectionHeading
                  title="Badges"
                  action={
                    <button
                      type="button"
                      onClick={() =>
                        toast('Your earned badges will appear here.')
                      }
                      className="text-xs font-semibold text-[#007A55] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                    >
                      View all
                    </button>
                  }
                />
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                  {badges.map(({ name, icon: Icon, style }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${style}`}
                      >
                        <Icon size={19} aria-hidden="true" />
                      </div>
                      <span className="mt-2 text-[10px] leading-4 text-slate-500">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-[10px] text-slate-400">
                  Badge preview
                </p>
              </section>
            </aside>
          </div>

          <section className="mt-8 border-t border-slate-200">
            {settingsItems.map(({ title, description, icon: Icon }) => {
              const expanded = expandedSetting === title
              return (
                <div key={title} className="border-b border-slate-200">
                  <div className="flex min-h-[68px] items-center justify-between gap-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon
                        size={19}
                        className="shrink-0 text-[#009966]"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-sora text-sm font-bold text-slate-800">
                          {title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {description}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSetting(expanded ? null : title)
                      }
                      aria-expanded={expanded}
                      className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009966]"
                    >
                      {expanded ? 'Close' : 'Manage'}
                      <ChevronRight
                        size={14}
                        className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {expanded && (
                    <div className="mb-3 ml-8 rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
                      <p>{description}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        Settings controls will be connected here.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </section>
        </div>
      )}
    </>
  )
}
