import { BadgeCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Bountycardmini from './Bountycardmini'

const AboutCreator = ({ creatorName, creatorAvatar, creatorId, creatorProfile, recentBounties }) => {
  const displayName = creatorName || 'Unknown Creator'
  const avatarUrl = creatorAvatar || `https://avatar.vercel.sh/${encodeURIComponent(displayName)}`

  return (
    <div className="flex flex-col space-y-8 pt-12">
      <h1 className="text-[#000000] font-bold font-inter text-lg ">
        About the creator
      </h1>

      <div className="rounded-lg w-full">
        <div className="flex flex-row space-x-3 p-3">
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="flex flex-col space-y-3">
            <div className="flex space-x-3 items-center">
              <p className="text-base font-bold text-[#000000]">
                {displayName}
              </p>

              <BadgeCheck color="#34A563" className="h-6 w-6" />
            </div>

            <p className="text-[#616161] text-base">
              {creatorProfile?.bio || 'Building innovative solutions in the Web3 space.'}
            </p>
          </div>
        </div>

        {creatorProfile && (
          <div className="flex flex-col w-full justify-end items-end">
            <div className="flex space-x-24">
              <div className="flex flex-col space-y-3">
                <p className="text-[#000000] text-lg font-bold">{creatorProfile.bountiesPosted}</p>
                <p className="text-[#616161] text-lg">Bounties Posted</p>
              </div>
              <div className="flex flex-col space-y-3">
                <p className="text-[#000000] text-lg font-bold">{creatorProfile.activeBounties}</p>
                <p className="text-[#616161] text-lg">Active</p>
              </div>
              <div className="flex flex-col space-y-3">
                <p className="text-[#000000] text-lg font-bold">${(creatorProfile.totalPaid / 1000).toFixed(1)}k+</p>
                <p className="text-[#616161] text-lg">Total Paid</p>
              </div>
            </div>
          </div>
        )}

        {recentBounties?.length > 0 && (
          <div className="flex flex-col space-y-3 w-full mt-10">
            <h2 className="text-[#000000] text-lg font-medium">
              Recently paid bounties
            </h2>
            <div className="flex gap-4 justify-between w-full">
              {recentBounties.slice(0, 3).map((bounty, index) => (
                <Bountycardmini
                  key={bounty.id || index}
                  title={bounty.title}
                  price={`${bounty.rewardAmount} ${bounty.rewardToken}`}
                  tag={bounty.category || bounty.tag}
                  image_description={bounty.title}
                />
              ))}
            </div>

            <Link
              to={`/dashboard/bounties?creatorId=${creatorId}`}
              className="text-[#34A563] font-bold text-md flex space-x-2 items-center"
            >
              <span>View all </span>
              <ArrowRight color="#34A563" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutCreator
