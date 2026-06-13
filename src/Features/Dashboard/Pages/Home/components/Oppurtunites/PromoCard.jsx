import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/* PromoCard — reusable promotional card for opportunities section */
const PromoCard = ({
  icon: Icon,
  title,
  description,
  linkText,
  linkUrl,
  color,
}) => {
  return (
    /* Card container: white background, bordered, vertical stack */
    <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl flex flex-col space-y-2 p-4 flex-1">
      {/* Icon container */}
      <div className="p-4 rounded-md bg-[#F3F4F6] w-fit">
        <Icon size={20} className={color} />
      </div>
      {/* Card text */}
      <div className="flex flex-col space-y-1">
        <span className="text-[#0A0A0A] font-black text-base">{title}</span>
        <span className="text-[#4A5565] text-[14px]">{description}</span>
      </div>
      {/* CTA link — used for routing */}
      <Link
        to={linkUrl}
        className={`${color} text-base flex flex-row items-center space-x-2 w-fit`}
      >
        <span>{linkText}</span>
        <ArrowRight size={16} className={color} />
      </Link>
    </div>
  )
}

export default PromoCard
