import { statusConfig, defaultStatus } from '../constants/statusConfig'

const StatusBadge = ({ status }) => {
  const style = statusConfig[status] || statusConfig[defaultStatus]

  return (
    <span
      className={`inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {status}
    </span>
  )
}

export default StatusBadge
