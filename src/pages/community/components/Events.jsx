import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function Events() {
  const events = [
    {
      month: 'JUN',
      day: '08',
      label: 'AMA',
      title: 'Building on TASBUN: Ask Me Anything',
      time: '3:00 PM UTC',
      attendeeCount: '+80',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&h=80&q=80',
      ],
    },
    {
      month: 'JUN',
      day: '08',
      label: 'AMA',
      title: 'Building on TASBUN: Ask Me Anything',
      time: '3:00 PM UTC',
      attendeeCount: '+80',
      avatars: [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&h=80&q=80',
      ],
    },
    {
      month: 'JUN',
      day: '08',
      label: 'AMA',
      title: 'Building on TASBUN: Ask Me Anything',
      time: '3:00 PM UTC',
      attendeeCount: '+80',
      avatars: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
      ],
    },
  ]

  return (
    <section className="py-20 bg-[#f1f6f3]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Heading & Call to Action */}
          <div className="lg:col-span-4 text-left">
            <span className="text-[#1f7242] text-sm font-bold tracking-wider uppercase block mb-3 font-sans">
              UPCOMING EVENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-black font-sans tracking-tight mb-4">
              Learn, connect,
              <br />
              and level up.
            </h2>
            <p className="text-base sm:text-lg text-gray-500 font-sans leading-relaxed mb-8">
              Don't miss out on exciting events and opportunities.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1f7242] hover:bg-[#15512e] text-white text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm shadow-primary/20 cursor-pointer">
              <span>View bounty</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column - Event list */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="group w-full bg-white p-5 md:p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center sm:justify-between gap-6 shadow-sm hover:shadow-md hover:border-[#1f7242]/20 transition-all duration-300"
              >
                {/* Left side: Date Block & Description */}
                <div className="flex flex-row items-center gap-5 text-left w-full sm:w-auto">
                  {/* Date square */}
                  <div className="w-16 h-16 rounded-xl border border-gray-100 bg-white flex flex-col items-center justify-center shrink-0 shadow-inner">
                    <span className="text-xs font-bold text-gray-400 font-sans tracking-wide leading-none mb-1">
                      {event.month}
                    </span>
                    <span className="text-2xl font-extrabold text-black font-mono leading-none">
                      {event.day}
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#1f7242]/5 text-[#1f7242] text-[10px] font-bold tracking-wide uppercase mb-2">
                      {event.label}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-black font-sans leading-snug group-hover:text-[#1f7242] transition-colors">
                      {event.title}
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-400 font-mono mt-1">
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Right side: Attendee avatars & Action Button */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50">
                  {/* Avatars */}
                  <div className="flex items-center">
                    <div className="flex -space-x-3 overflow-hidden">
                      {event.avatars.map((url, avIdx) => (
                        <img
                          key={avIdx}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                          src={url}
                          alt="Attendee avatar"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-500 font-sans ml-3">
                      {event.attendeeCount}
                    </span>
                  </div>

                  {/* Register Button */}
                  <button className="px-6 py-2 rounded-full border border-[#1f7242] text-[#1f7242] hover:bg-[#1f7242] hover:text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
