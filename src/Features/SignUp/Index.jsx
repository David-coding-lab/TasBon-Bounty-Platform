import { Link } from 'react-router-dom'
import Hero from './Assets/Hero-bg.png'
import AppleIcon from './Assets/Apple.png'
import GoogleIcon from './Assets/Google.png'

function SignUp() {
  return (
    <main className="font-sora bg-secondary min-h-screen p-8 flex items-start space-x-24">
      <img src={Hero} alt="" className="h-168" />

      <section className="w-full  flex flex-col gap-4 max-w-[650px]">
        <div className=" flex flex-col space-y-2">
          <h1 className="text-4xl font-bold mb-2">
            <span className="block">Join The</span>
            <span>
              <span className="text-primary">BOUNTY</span> HUNTERS
            </span>
          </h1>
          <p className="text-base  ">
            Discover Opportunities And Get Rewarded For Your Skills.
          </p>
        </div>

        <form className=" flex flex-col space-y-3">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="FullName"
              className="p-3 bg-white"
            />

            <input type="email" className="p-6 bg-white" placeholder="Email" />

            <label
              htmlFor="passWord"
              className="flex flex-row items-center px-3 bg-white"
            >
              <input
                type="text"
                id="passWord"
                placeholder="Password"
                className="h-full w-full bg-white py-3"
              />
              <span class="material-symbols-outlined">visibility</span>
            </label>

            <label
              htmlFor="confirmPassWord"
              className="flex flex-row items-center px-3 bg-white"
            >
              <input
                type="text"
                id="confirmPassWord"
                placeholder="Confirm Password"
                className="h-full w-full bg-white py-3"
              />
              <span class="material-symbols-outlined">visibility</span>
            </label>
          </div>

          <button
            type="submiit"
            className="mt-10 text-white w-full text-center bg-primary rounded-md py-3 text-base"
          >
            Create Account
          </button>
        </form>

        <div className="flex flex-col space-y-4 justify-center">
          <div class="flex flex-row space-x-6 items-center">
            {/* <!-- Left line --> */}
            <div class="w-full flex-2 h-px bg-gray-400"></div>

            {/*   <!-- Center text --> */}
            <span class="flex-2 mx-4 text-base text-gray-800">
              Or Sign Up With
            </span>

            {/* <!-- Right line (optional) --> */}
            <div class="flex-2 w-full h-px bg-gray-400"></div>
          </div>

          <div className="flex  items-center space-x-3">
            <button className="border-2 border-[#888988] w-full   flex flex-row items-center space-x-2 justify-center rounded-md p-3">
              <img src={GoogleIcon} alt="" />
              <span className="text-2xl text-[#888988]">Google</span>
            </button>
            <button className="border-2 border-[#888988] w-full   flex flex-row items-center space-x-2 justify-center rounded-md p-3">
              <img src={AppleIcon} alt="" />
              <span className="text-2xl text-[#888988]">Apple</span>
            </button>
          </div>

          <p className="text-[#888988] text-center">
            Already a Hunter{' '}
            <a href="#" className="text-primary">
              Sign In
            </a>
          </p>
        </div>
      </section>
    </main>
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="w-full max-w-md rounded-2xl p-8 shadow-md border">
    //     <h1 className="text-2xl font-bold mb-2">Create Account</h1>
    //     <p className="text-sm text-gray-600 mb-6">Start your bounty journey.</p>

    //     <form className="space-y-4">
    //       <input
    //         type="text"
    //         placeholder="Full name"
    //         className="w-full border rounded-lg px-3 py-2"
    //       />
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         className="w-full border rounded-lg px-3 py-2"
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         className="w-full border rounded-lg px-3 py-2"
    //       />
    //       <button className="w-full bg-red-100 rounded-lg py-2 font-medium">
    //         Sign Up
    //       </button>
    //     </form>

    //     <p className="text-sm mt-4">
    //       Already have an account?{' '}
    //       <Link to="/signin" className="underline">
    //         Sign in
    //       </Link>
    //     </p>
    //   </div>
    // </div>
  )
}

export default SignUp
