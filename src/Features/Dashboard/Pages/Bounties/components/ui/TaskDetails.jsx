import { useState } from 'react'
import { Info, CheckSquare, ClipboardList } from 'lucide-react'

const iconMap = {
  Info,
  CheckSquare,
  ClipboardList,
}

const MAX_LENGTH = 150

const TaskDetails = ({ icon, title, description, component }) => {
  const [expanded, setExpanded] = useState(false)
  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon
  const isLong = description && description.length > MAX_LENGTH
  const displayText = isLong && !expanded ? description.slice(0, MAX_LENGTH) + '...' : description

  return (
    <div className="bg-[#fff] flex flex-row space-x-3 sm:space-x-8 pb-6 items-start">
      <div className="pt-2 shrink-0">
        {IconComponent ? <IconComponent color="#34A563" /> : null}
      </div>
      <div className="flex flex-col space-y-4 flex-1 min-w-0">
        <h1 className="text-[#101820] text-lg font-inter font-bold">{title}</h1>
        {component || (
          <div>
            <p className="text-md text-[#616161] max-w-3xl break-words">{displayText}</p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#34A563] text-sm font-medium mt-1 hover:underline cursor-pointer"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskDetails
