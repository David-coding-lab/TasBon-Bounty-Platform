import React, { useEffect, useState } from 'react'
import CheckEmailIcon from '../Assets/check-email.png'

function CheckEmail({ email, onClose, onGoToInbox }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))

    return () => cancelAnimationFrame(frame)
  }, [])

  const handleGoToInbox = () => {
    if (onGoToInbox) {
      onGoToInbox()
      return
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-[#000000ad]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="check-email-title"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg max-h-[50vh] rounded-2xl bg-[#fbf5f3] px-6 py-6 text-center shadow-2xl mx-5 sm:px-12 sm:py-8 box-border transform transition-all duration-300 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-2 flex w-fit items-center justify-center">
          <img
            src={CheckEmailIcon}
            alt="Check email"
            className="w-20 h-20 sm:w-25 sm:h-25 lg:w-30 lg:h-30 object-contain md:w-28 md:h-28"
          />
        </div>

        <h2
          id="check-email-title"
          className="text-xl font-semibold text-black sm:text-2xl md:text-2xl"
        >
          Check your email
        </h2>

        <p className="mx-auto mt-1 max-w-2xl text-lg text-[#5d5d5d] sm:text-lg">
          We sent a verification link to {email}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleGoToInbox}
            className="inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-[#38a866] cursor-pointer px-6 py-3 text-md font-medium text-white transition hover:bg-[#2f945a] focus:outline-none focus:ring-2 focus:ring-[#38a866] focus:ring-offset-2"
          >
            Go To Inbox
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-md -mt-2 cursor-pointer font-medium text-[#ff4d3d] transition hover:text-[#e23f31]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckEmail
