import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is TASBUN?',
      answer:
        'TASBUN is a global collaborative platform built specifically for web3 builders, creators, and problem solvers. It provides a unified portal for participating in hackathons, working on active bounties, and securing grants from ecosystem companies.',
    },
    {
      question: 'How do I participate in hackathons?',
      answer:
        'You can register for upcoming hackathons directly through your single profile page. Team registration, submissions, and milestone tracking are fully integrated into our smart dashboard.',
    },
    {
      question: 'What types of bounties are available?',
      answer:
        'TASBUN features multiple bounty types, ranging from technical development and smart contract audits to content creation, marketing design, and developer relations operations.',
    },
    {
      question: 'How are grants distributed?',
      answer:
        'Ecosystem partners submit grant proposals through TASBUN, and funding is disbursed to selected builders based on project milestones verified on-chain by peer assessors.',
    },
    {
      question: 'Is it free to join the community?',
      answer:
        'Yes! TASBUN is fully open and free for creators and developers. You can join the developer guild, start contributing immediately, and build a verified reputational CV.',
    },
    {
      question: 'How do I build my builder profile?',
      answer:
        'Every bounty completed, hackathon attended, and grant milestone achieved is compiled into your single builder profile, proving your skills to prospective hiring companies instantly.',
    },
  ]

  const handleToggle = (idx) => {
    if (openIndex === idx) {
      setOpenIndex(null)
    } else {
      setOpenIndex(idx)
    }
  }

  return (
    <section className="py-20 bg-[#f5f9f7]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-[#34A563] text-sm font-bold tracking-wider uppercase block mb-3 font-sans">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black font-sans tracking-tight">
            Got questions? We've got answers
          </h2>
        </div>

        {/* 2-Column FAQ Layout */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden text-left shadow-sm ${
                  isOpen
                    ? 'border-[#34A563] ring-1 ring-[#34A563]/10 shadow-md'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 font-sans text-base font-bold text-black cursor-pointer select-none bg-white border-0"
                >
                  <span className="hover:text-[#34A563] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-[#34A563] transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-[#34A563]/5 border-[#34A563]/20'
                        : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated content expansion */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-gray-50' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-sm sm:text-base text-gray-500 font-sans leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
