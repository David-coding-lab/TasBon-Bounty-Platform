import './App.css'

function App() {
  return (
    <div className="App">
      <div className="text-3xl text-center font-bold mt-10">
        This is Tasbon Bounty Platform, a platform for bounty hunters to find
        and claim bounties.
      </div>

      <div className="flex justify-center items-center gap-5 mt-5">
        <button className="p-5 rounded-2xl cursor-pointer w-32 bg-red-100">
          Sign Up
        </button>
        <button className="p-5 rounded-2xl cursor-pointer w-32 bg-red-100">
          Login
        </button>
      </div>
    </div>
  )
}

export default App
