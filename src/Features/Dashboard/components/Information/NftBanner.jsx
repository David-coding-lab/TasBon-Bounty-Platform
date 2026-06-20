import React from 'react'
import nftBanner from '../../Assets/nftIcon.svg'

const NftBanner = () => {
  return (
    // the nft banner is a background image with a linear gradient overlay.
    <div className="bg-linear-to-r from-[#143F26] to-[#34A563] rounded-2xl w-full max-h-74">
      <div className="w-full h-full flex items-center py-4 px-8 space-x-24">
        <div className="flex flex-col space-y-8">
          <h2 className="text-3xl font-medium text-white">
            Animated Nft Creation
          </h2>

          <button className="bg-[linear-gradient(to_right,#FFFFFF_80%,transparent_50%,)] text-[#FFFFFF] font-medium py-2 px-4 rounded-4xl max-w-42.25 border border-[#FFFFFF]">
            View Bounty
          </button>
        </div>

        <img
          src={nftBanner}
          alt="nft banner"
          className="w-64 h-64 object-cover rounded-lg"
        />
      </div>
    </div>
  )
}

export default NftBanner
