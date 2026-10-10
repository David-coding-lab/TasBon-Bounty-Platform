import { BadgeCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Bountycardmini from './Bountycardmini'

const AboutCreator = ({
  creatorName,
  creatorAvatar,
  creatorId,
  creatorProfile,
  recentBounties,
}) => {
  const displayName = creatorName || 'Unknown Creator'
  const avatarUrl =
    creatorAvatar ||
    `https://avatar.vercel.sh/${encodeURIComponent(displayName)}`

  return (
    <div className="flex min-w-0 flex-col space-y-6 pt-8 sm:space-y-8 sm:pt-12">
      <h1 className="font-inter text-lg font-bold text-[#000000]">
        About the creator
      </h1>

      <div className="w-full min-w-0 rounded-lg">
        <div className="flex min-w-0 flex-row gap-3 p-3">
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />

          <div className="flex min-w-0 flex-col space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:space-x-3">
              <p className="break-words text-base font-bold text-[#000000]">
                {displayName}
              </p>

              <BadgeCheck color="#34A563" className="h-6 w-6 shrink-0" />
            </div>

            <p className="break-words text-sm text-[#616161] sm:text-base">
              {creatorProfile?.bio ||
                'Building innovative solutions in the Web3 space.'}
            </p>
          </div>
        </div>

        {creatorProfile && (
          <div className="flex w-full flex-col items-stretch sm:items-end">
            <div className="grid w-full grid-cols-3 gap-3 sm:flex sm:w-auto sm:gap-8 lg:gap-24">
              <div className="flex min-w-0 flex-col space-y-1 sm:space-y-3">
                <p className="truncate text-base font-bold text-[#000000] sm:text-lg">
                  {creatorProfile.bountiesPosted}
                </p>
                <p className="text-xs text-[#616161] sm:text-lg">
                  Bounties Posted
                </p>
              </div>
              <div className="flex min-w-0 flex-col space-y-1 sm:space-y-3">
                <p className="truncate text-base font-bold text-[#000000] sm:text-lg">
                  {creatorProfile.activeBounties}
                </p>
                <p className="text-xs text-[#616161] sm:text-lg">Active</p>
              </div>
              <div className="flex min-w-0 flex-col space-y-1 sm:space-y-3">
                <p className="truncate text-base font-bold text-[#000000] sm:text-lg">
                  ${(creatorProfile.totalPaid / 1000).toFixed(1)}k+
                </p>
                <p className="text-xs text-[#616161] sm:text-lg">Total Paid</p>
              </div>
            </div>
          </div>
        )}

        {recentBounties?.length > 0 && (
          <div className="flex flex-col space-y-3 w-full mt-10">
            <h2 className="text-[#000000] text-lg font-medium">
              Recently paid bounties
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
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
