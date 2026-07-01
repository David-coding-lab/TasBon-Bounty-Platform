import React from 'react'
import BountyImage from '../../../../Assets/bountyicon.png'

const Bountycardmini = ({ title, price, tag, image_description }) => {
  return (
    <div className="flex flex-row space-x-3 border border-gray-200 rounded-2xl p-3">
      <img src={BountyImage} alt={image_description} />
      <div className="flex flex-col space-y-3">
        <p className="text-xs text-[#000000BF] font-medium">{title}</p>

        <div className="flex space-x-3">
          <p className="text-xs text-[#000000BF]">{price}</p>
          <p className="text-xs text-[#00000080] font-light">{tag}</p>
        </div>
      </div>
    </div>
  )
}

export default Bountycardmini
