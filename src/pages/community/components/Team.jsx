import React from 'react'
import { motion } from 'framer-motion'
import teamAmioImg from '../assets/team_amio.png'
import teamTobiImg from '../assets/contributors/eter.jpg'
import teamHenryImg from '../assets/contributors/henry.jpg'
import teamFavourImg from '../assets/contributors/favour.jpg'
import teamPhayyImg from '../assets/contributors/fayy.jpg'
import teamCelestineImg from '../assets/contributors/celestine.jpg'
import teamSoloImg from '../assets/contributors/solo.jpg'
import teamEdenImg from '../assets/contributors/eden.jpg'
import teamAdaImg from '../assets/contributors/ada.jpg'
import teamSteveImg from '../assets/contributors/steve.png'
import teamDaveImg from '../assets/contributors/dave.png'
import teamTimothyImg from '../assets/contributors/timo.jpg'

const TeamMemberCard = ({ member }) => (
  <motion.div
    key={member.name}
    className="group bg-white rounded-full border border-gray-100 shadow-sm cursor-pointer flex items-center gap-4 pl-4 py-4 pr-8"
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
    <img
      src={member.image}
      alt={`${member.name} - ${member.role}`}
      className="w-20 h-20 rounded-full object-cover shrink-0"
    />

    <div className="flex flex-col items-start min-w-0">
      <h3 className="text-base font-bold text-black font-sans leading-tight group-hover:text-[#34A563] transition-colors">
        {member.name}
      </h3>
      <span className="text-[#34A563] text-sm font-medium font-sans mb-2">
        {member.role}
      </span>

      <div className="flex gap-2">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          className="w-7 h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all"
          aria-label={`${member.name} LinkedIn`}
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href={member.twitter}
          target="_blank"
          rel="noreferrer"
          className="w-7 h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all"
          aria-label={`${member.name} X`}
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={member.website}
          className="w-7 h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-[#34A563] hover:bg-[#34A563] hover:text-white transition-all"
          aria-label={`${member.name} Website`}
        >
          <svg
            className="w-3 h-3"
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
)

export default function Team() {
  const topRow = [
    {
      name: 'Amio Anthony',
      role: 'Founder & CEO, TASBUN',
      image: teamAmioImg,
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com/amioantho/',
      website: 'https://github.com/amio13',
    },
    {
      name: 'Oluwatobi Ayoola Jolaosho',
      role: 'Project Manager',
      image: teamTobiImg,
      linkedin: 'https://linkedin.com/in/oluwatobi-jolaosho-a3b78319a/',
      twitter: 'https://x.com/fury25423',
      website: 'https://github.com/codeironside',
    },
    {
      name: 'Eze Chukwuemeka David',
      role: 'Frontend Lead',
      image: teamDaveImg,
      linkedin: 'https://www.linkedin.com/in/eze-chukwuemeka-6b365a29b/',
      twitter: 'https://x.com/Emekadave01',
      website: 'https://github.com/David-coding-lab',
    },
    {
      name: 'Chinedu Celestine Okoro',
      role: 'Backend Lead',
      image: teamCelestineImg,
      linkedin: '',
      twitter: 'https://x.com/c3o_git',
      website: 'https://github.com/c3o-git',
    },

    {
      name: 'Okoro Henry',
      role: 'Frontend Engineer',
      image: teamHenryImg,
      linkedin: 'https://www.linkedin.com/in/henry-ifeanyi-3a21a7417/',
      twitter: 'https://x.com/Histoblogq',
      website: 'https://github.com/henry-pixel-dev',
    },
    {
      name: 'Okechukwu Solomon Chiemezie',
      role: 'Adaptive Web Developer',
      image: teamSoloImg,
      linkedin: 'https://linkedin.com/in/okechukwu-solomon-7a5ba925a/',
      twitter: 'https://x.com/solomon1249093',
      website: 'https://github.com/okesolo',
    },
    {
      name: 'Chikebe Chukwudiebube Timothy',
      role: 'Backend Engineer',
      image: teamTimothyImg,
      linkedin: 'https://linkedin.com/Chikebetimothy',
      twitter: 'https://x.com/replytim001',
      website: 'https://github.com/timothyfranx',
    },
    {
      name: 'Ada Nwankwo',
      role: 'Frontend & AI Engineer',
      image: teamAdaImg,
      linkedin: 'https://gitHub.com/adaalex123',
      twitter: 'https://x.com/ada_theanalyst',
      website:
        'https://www.instagram.com/becomingwithada?igsh=YnZsNnV3cHNkeWV6&utm_source=qr',
    },
  ]

  const bottomRow = [
    {
      name: 'Godswill Favour',
      role: 'Design Team Lead',
      image: teamFavourImg,
      linkedin: 'https://linkedin.com/in/nzubefavour/',
      twitter: 'https://x.com/godswillfavou13',
      website: 'https://github.com/Godswillphavor',
    },
    {
      name: 'Blessed Omoriyekemwen Eden',
      role: 'UI/UX Designer',
      image: teamEdenImg,
      linkedin: 'https://linkedin.com/in/eden-frank-518a74408',
      twitter: 'https://x.com/EdenB64539',
      website: 'https://tikTok.com/@edencreates4',
    },
    {
      name: 'Igwe Favour',
      role: 'UI/UX Designer',
      image: teamPhayyImg,
      linkedin: 'https://linkedin.com/in/igwe-favour-938a4a367/',
      twitter: 'https://x.com/Phayyydesigns',
      website: 'https://instagram.com/phayyy_ux?igsh=NHo2ZzNibDN0ejN5',
    },
    {
      name: 'Omoriyekemwen Steven',
      role: 'UI/UX Designer',
      image: teamSteveImg,
      linkedin: '',
      twitter: 'https://x.com/stemage_',
      website: '',
    },
  ]

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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
      </div>

      <div className="relative w-full space-y-10">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-64 xl:w-80 bg-linear-to-r h-full from-white via-white/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-64 xl:w-80 bg-linear-to-l h-full from-white via-white/50 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-6">
          {[...topRow, ...topRow, ...topRow, ...topRow].map((member, idx) => (
            <TeamMemberCard key={idx} member={member} />
          ))}
        </div>

        <div className="animate-marquee-reverse gap-6">
          {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map(
            (member, idx) => (
              <TeamMemberCard key={idx} member={member} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}
