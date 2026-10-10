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
  const displayText =
    isLong && !expanded ? description.slice(0, MAX_LENGTH) + '...' : description

  return (
    <div className="flex min-w-0 flex-row items-start gap-3 bg-[#fff] pb-6 sm:gap-4">
      <div className="shrink-0 pt-1">
        {IconComponent ? <IconComponent color="#34A563" /> : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col space-y-3 sm:space-y-4">
        <h1 className="font-inter break-words text-base font-bold text-[#101820] sm:text-lg">
          {title}
        </h1>
        {component || (
          <div className="min-w-0">
            <p className="max-w-3xl break-words text-sm text-[#616161] sm:text-base">
              {displayText}
            </p>
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
