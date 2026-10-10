import React from 'react'
import BountyImage from '../../../../Assets/bountyIcon.png'

const Bountycardmini = ({ title, price, tag, image_description }) => {
  return (
    <div className="flex min-w-0 flex-1 cursor-pointer flex-row items-center gap-3 rounded-2xl border border-gray-200 p-3 sm:p-5 sm:pl-3">
      <img
        src={BountyImage}
        alt={image_description}
        className="h-10 w-10 shrink-0 object-cover"
      />
      <div className="flex min-w-0 flex-col">
        <p className="truncate text-sm font-bold font-inter text-[#616161]">
          {title}
        </p>

        <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 py-2">
          <p className="truncate text-xs font-bold font-inter text-[#000000BF]">
            {price}
          </p>
          <p className="truncate text-xs font-bold font-inter text-[#00000080]">
            {tag}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Bountycardmini
