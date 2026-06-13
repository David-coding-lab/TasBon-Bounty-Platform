import React from 'react'
import { ArrowRight, Circle } from 'lucide-react'

/* BountiesCard — reusable bounty card used across multiple pages */
const BountiesCard = ({
  headerImg,
  categoryName,
  title,
  issuerIcon,
  issuerName,
  price,
  level,
}) => {
  return (
    /* Card container: vertical layout with border and rounded bottom corners */
    <div className="flex flex-col gap-2 border border-[#E5E7EB] rounded-2xl overflow-hidden flex-1">
      {/* Header image — full width */}
      <img src={headerImg} alt={title} className="w-full object-cover" />

      {/* Card body — white background with content */}
      <div className="bg-[#FFFFFF] p-3 flex flex-col space-y-3">
        {/* Bounty category name */}
        <p className="text-xs text-[#007A55]">{categoryName}</p>

        {/* Bounty title */}
        <p className="text-lg font-semibold text-[#0A0A0A]">{title}</p>

        {/* Issuer info: icon and name */}
        <div className="flex flex-row space-x-2 items-center">
          <img
            src={issuerIcon}
            alt={issuerName}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm text-[#4A5565]">{issuerName}</span>
        </div>

        {/* Bounty price */}
        <p className="text-xl font-bold text-[#0A0A0A]">{price}</p>

        {/* Bounty level with dot icon */}
        <div className="flex flex-row items-center space-x-1">
          <Circle className="w-2 h-2 fill-[#99A1AF] text-[#99A1AF]" />
          <span className="text-xs text-[#4A5565]">{level}</span>
        </div>

        {/* Apply button */}
        <button className="bg-[#009966] w-full py-3 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer">
          <span className="text-[#FFFFFF] text-base font-medium">
            Apply Now
          </span>
          <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
        </button>
      </div>
    </div>
  )
}

export default BountiesCard
