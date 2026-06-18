import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0a1f14] via-[#0f2e1d] to-[#071a0e] px-4">
          <div className="text-center max-w-lg">
            <div className="mb-8 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-[Sora] text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-400 text-base sm:text-lg font-[Inter] mb-3 leading-relaxed">
              An unexpected error occurred. Don't worry, it's not your fault.
            </p>

            {this.state.error && (
              <p className="text-red-400/70 text-sm font-mono bg-white/5 rounded-lg px-4 py-3 mb-8 max-w-md mx-auto wrap-break-word">
                {this.state.error.message}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
                className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold font-[Sora] text-base cursor-pointer transition-colors hover:bg-[#2d9156]"
              >
                Try Again
              </button>
              <Link to="/">
                <button
                  onClick={() =>
                    this.setState({ hasError: false, error: null })
                  }
                  className="px-8 py-3.5 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold font-[Sora] text-base cursor-pointer bg-transparent transition-colors hover:bg-emerald-500/10"
                >
                  Back to Home
                </button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"
                  style={{
                    animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
