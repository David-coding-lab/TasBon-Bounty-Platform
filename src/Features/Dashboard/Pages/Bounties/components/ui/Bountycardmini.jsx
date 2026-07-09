import React from 'react'
import BountyImage from '../../../../Assets/bountyIcon.png'

const Bountycardmini = ({ title, price, tag, image_description }) => {
  return (
    <div className="flex cursor-pointer flex-row space-x-3 border border-gray-200 rounded-2xl p-5 pl-3">
      <img src={BountyImage} alt={image_description} />
      <div className="flex flex-col ">
        <p className="text-sm text-[#616161] font-inter font-bold">{title}</p>

        <div className="flex py-2 space-x-3">
          <p className="text-xs font-bold font-inter text-[#000000BF]">
            {price}
          </p>
          <p className="text-xs font-bold font-inter text-[#00000080]">{tag}</p>
        </div>
      </div>
    </div>
  )
}

export default Bountycardmini
