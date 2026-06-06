import { Link } from 'react-router-dom'
// import AlexIcon from " ./components/navigation/sidebar/Assets/alex-icon.png";
import Alexicon from './/Assets/alex-icon.png'

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <img src={AlexIcon} alt="coming soon" width="40" height="40" />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Coming Soon 🚧
        </h1>
        <p className="text-gray-500 mb-8 max-w-md">
          We’re working hard to bring this page to you. Check back later!
        </p>

        {/* Back button */}
        <Link
          to="/dashboard"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
