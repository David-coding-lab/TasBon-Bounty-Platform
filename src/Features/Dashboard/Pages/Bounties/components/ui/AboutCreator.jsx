import React from 'react'
import { BadgeCheck, ArrowRight } from 'lucide-react'
import Logo from '../../../../Assets/logo.png'
import Bountycardmini from './Bountycardmini'
import { Link } from 'react-router-dom'

const AboutCreator = () => {
  const recentlyPaidBounty = [
    {
      title: 'Build Wallet Connect DApp',
      price: '1500 USDC',
      tag: 'Web3',
      image_description: 'Group photo of people',
    },
    {
      title: 'Build Wallet Connect DApp',
      price: '1500 USDC',
      tag: 'Web3',
      image_description: 'Group photo of people',
    },
    {
      title: 'Build Wallet Connect DApp',
      price: '1500 USDC',
      tag: 'Web3',
      image_description: 'Group photo of people',
    },
  ]
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-[#000000] text-2xl">About the creator</h1>

      <div className="flex flex-row  space-x-3 border border-gray-300 rounded-2xl p-3">
        <img src={Logo} alt="Creator logo" className="h-12 w-auto" />

        <div className="flex flex-col space-y-3">
          <div className="flex space-x-3 items-center">
            <p className="text-base font-bold text-[#000000]">Nexus Protocol</p>

            <BadgeCheck color="#34A563" className="h-6 w-6" />
          </div>

          <p className="text-[#616161] text-base">
            Building the next generation of DeFi infrastructure.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full justify-end items-end">
        <div className="flex space-x-24">
          <div className="flex flex-col space-y-3">
            <p className="text-[#000000] text-lg font-bold">18</p>
            <p className="text-[#616161] text-lg">Bounties Posted</p>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-[#000000] text-lg font-bold">12</p>
            <p className="text-[#616161] text-lg">Active</p>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-[#000000] text-lg font-bold">$35,000+</p>
            <p className="text-[#616161] text-lg">Total Paid</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 w-full  ">
        <h2 className="text-[#000000] text-lg">Recently paid bounties</h2>
        {/* here is where i want to buid the card struture  */}
        <div className="flex justify-between w-full ">
          {recentlyPaidBounty.map((bounty, index) => (
            <Bountycardmini
              key={index}
              title={bounty.title}
              price={bounty.price}
              tag={bounty.tag}
              image_description={bounty.image_description}
            />
          ))}
        </div>

        <Link
          to="/"
          className="text-[#34A563] text-lg flex space-x-2 items-center"
        >
          <span>View all </span>
          <ArrowRight color="#34A563" />
        </Link>
      </div>
    </div>
  )
}

export default AboutCreator
