import React from 'react'
import { ArrowRight, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'

/* BountiesCard — reusable bounty card used across multiple pages */
const BountiesCard = ({
  headerImg,
  categoryName,
  title,
  description,
  issuerIcon,
  issuerName,
  price,
  level,
  bountyId,
}) => {
  return (
    /* Card container: vertical layout with border and rounded bottom corners */
    <div className="flex flex-col gap-1.5 border border-[#E5E7EB] rounded-2xl overflow-hidden">
      {/* Header image — full width */}
      <img
        src={headerImg}
        alt={title}
        className="w-full h-36 sm:h-40 md:h-36 object-cover"
      />

      {/* Card body — white background with content */}
      <div className="bg-[#FFFFFF] p-2.5 flex flex-col space-y-2">
        {/* Bounty category name */}
        <p className="text-[10px] sm:text-[11px] text-[#007A55]">
          {categoryName}
        </p>

        {/* Bounty title — single line with truncation */}
        <p className="text-sm sm:text-base font-semibold text-[#0A0A0A] truncate">
          {title}
        </p>

        {description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

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
        <p className="text-lg font-bold text-[#0A0A0A]">{price}</p>

        {/* Bounty level with dot icon */}
        <div className="flex flex-row items-center space-x-1">
          <Circle className="w-2 h-2 fill-[#99A1AF] text-[#99A1AF]" />
          <span className="text-xs text-[#4A5565]">{level}</span>
        </div>

        {/* Apply button */}
        <Link
          to={`/dashboard/bounties/${bountyId}`}
          className="bg-[#009966] w-full py-2.5 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer"
        >
          <span className="text-[#FFFFFF] text-sm font-medium">
            View bounty
          </span>
          <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
        </Link>
      </div>
    </div>
  )
}

export default BountiesCard
