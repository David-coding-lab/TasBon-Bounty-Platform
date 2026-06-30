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
    <div className="flex flex-row space-x-8 items-start">
      <div className="pt-2">
        {IconComponent ? <IconComponent color="#34A563" /> : null}
      </div>
      <div className="flex flex-col space-y-6 ">
        <h1 className="text-[#000000] text-2xl">{title}</h1>

        <p className="text-lg text-[#616161]">{description}</p>
      </div>
    </div>
  )
}

export default TaskDetails
