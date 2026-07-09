import React from 'react'
import { Info, CheckSquare, ClipboardList } from 'lucide-react'

const iconMap = {
  Info,
  CheckSquare,
  ClipboardList,
}

const TaskDetails = ({ icon, title, description }) => {
  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon

  return (
    <div className="bg-[#fff] flex flex-row space-x-8 pb-6 items-start">
      <div className="pt-2">
        {IconComponent ? <IconComponent color="#34A563" /> : null}
      </div>
      <div className="flex flex-col space-y-4 ">
        <h1 className="text-[#101820] text-lg font-inter font-bold">{title}</h1>

        <p className="text-md text-[#616161] max-w-3xl">{description}</p>
      </div>
    </div>
  )
}

export default TaskDetails
