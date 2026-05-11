import React from 'react'
import CheckIcon from '../Assets/check_mark.png'
import { Link } from 'react-router-dom'

const VerifyPassword = ({ userEmail }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center border">
      <div className="bg-[#EFF8F2] w-120 rounded-md flex flex-col items-center justify-center space-y-12 shadow-2xl p-6">
        <div className=" flex flex-col space-y-6 items-center">
          <img src={CheckIcon} alt="CheckIcon" className="w-32 h-32" />
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Verify your Email account
            </h1>
            <p className="text-lg text-[#888F9B] text-center">
              Click on the email verification sent to you on{' '}
              <span className="font-bold">{userEmail || 'your email'}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-6 items-center w-full">
          <p className="text-lg text-[#888F9B] text-center">
            Didn’t receive the email?{' '}
            <Link to="" className="font-bold">
              Send Again
            </Link>
          </p>

          <a
            href="mailto:"
            className="bg-primary rounded-4xl p-3 cursor-pointer text-secondary w-90 hover:bg-green-300 inline-block text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Email App
          </a>
        </div>
      </div>
    </div>
  )
}

export default VerifyPassword
