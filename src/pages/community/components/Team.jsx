import React from 'react'
import { motion } from 'framer-motion'
import teamAmioImg from '../assets/team_amio.png'
import teamTobiImg from '../assets/team_tobi.png'

export default function Team() {
  const team = [
    {
      name: 'Amio Anthony',
      role: 'Founder & CEO, TASBUN',
      image: teamAmioImg,
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
      website: '#',
    },
    {
      name: 'Ayoola Tobi',
      role: 'Lead Dev Team',
      image: teamTobiImg,
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
      website: '#',
    },
    {
      name: 'Ayoola Tobi',
      role: 'Lead Dev Team',
      image: teamTobiImg,
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
      website: '#',
    },
    {
      name: 'Amio Anthony',
      role: 'Founder & CEO, TASBUN',
      image: teamTobiImg,
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
      website: '#',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header — slide up on scroll */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-[#34A563] text-sm font-bold tracking-wider uppercase block mb-3 font-sans">
            THE TEAM BEHIND TASBUN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black font-sans tracking-tight">
            The people building the future with you
          </h2>
        </motion.div>

        {/* Team Grid — scroll-triggered staggered cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Bio details */}
              <div className="p-6 flex flex-col items-center justify-between grow">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-black font-sans mb-1 group-hover:text-[#34A563] transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-[#34A563] text-sm font-medium font-sans">
                    {member.role}
                  </span>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                    aria-label={`${member.name} X`}
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={member.website}
                    className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                    aria-label={`${member.name} Website`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
