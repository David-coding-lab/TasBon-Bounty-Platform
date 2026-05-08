import { Link } from 'react-router-dom'
import Hero from './Assets/Hero-bg.png'
import AppleIcon from './Assets/Apple.png'
import GoogleIcon from './Assets/Google.png'
import './index.css'

function SignUp() {
  return (
    <main className="font-sora gap-10 bg-secondary flex h-screen">
      <div className="w-[45vw] h-full">
        <img src={Hero} alt="woman drinking coffee" className="w-full h-full" />
      </div>

      <section className="w-[45vw] pt-8 flex flex-col justify-center ml-10 items-start gap-4 ">
        <div className="flex flex-col text-start">
          <h1 className="text-4xl font-bold mb-2">
            <span className="block">Join The</span>
            <span>
              <span className="text-primary">BOUNTY</span> HUNTERS
            </span>
          </h1>
          <p className="text-base">
            Discover Opportunities And Get Rewarded For Your Skills.
          </p>
        </div>

        <form className=" flex flex-col pt-8 space-y-3">
          <div className="flex flex-col space-y-4 w-lg">
            <input
              type="text"
              placeholder="FullName"
              className="p-3 bg-white outline-0 rounded-sm h-14"
            />
            <input
              type="text"
              placeholder="Email"
              className="p-3 bg-white outline-0 rounded-sm h-14"
            />
            <label
              htmlFor="passWord"
              className="p-3 bg-white outline-0 rounded-sm h-14 flex"
            >
              <input
                type="text"
                id="passWord"
                placeholder="Password"
                className="h-full w-full bg-white py-3 outline-0"
              />
              <span
                className="material-symbols-outlined"
                style={{ color: '#888988' }}
              >
                visibility
              </span>
            </label>

            <label
              htmlFor="confirmPassWord"
              className="p-3 bg-white outline-0 rounded-sm h-14 flex"
            >
              <input
                type="text"
                id="confirmPassWord"
                placeholder="Confirm Password"
                className="h-full w-full bg-white py-3 outline-0"
              />
              <span
                className="material-symbols-outlined"
                style={{ color: '#888988' }}
              >
                visibility
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-signUp mt-10 cursor-pointer text-white w-full h-16 text-center bg-primary rounded-md py-3 text-base"
          >
            Create Account
          </button>
        </form>

        <div className="flex flex-col w-lg items-center space-y-4 mt-6 justify-center">
          <div className="flex flex-row items-center w-[90%]">
            <div className="flex-1 h-px bg-gray-400" />
            <span className="mx-4 text-sm text-gray-800">Or Sign Up With</span>
            <div className="flex-1 h-px bg-gray-400" />
          </div>

          <div className="flex items-center space-x-3 w-[90%]">
            <button className="OAuth-btns flex-1 border border-[#888988] cursor-pointer flex items-center justify-center rounded-md p-3 gap-2">
              <img src={GoogleIcon} alt="" />
              <span className="text-md text-[#888988]">Google</span>
            </button>
            <button className="OAuth-btns flex-1 border border-[#888988] cursor-pointer flex items-center justify-center rounded-md p-3 gap-2">
              <img src={AppleIcon} alt="" />
              <span className="text-md text-[#888988]">Apple</span>
            </button>
          </div>

          <p className="text-[#888988] text-center mb-10">
            Already a Bounty Hunter?{' '}
            <Link to="/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default SignUp
