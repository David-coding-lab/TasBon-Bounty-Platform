import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        This is Tasbon Bounty Platform, a platform for bounty hunters to find
        and claim bounties.
      </div>

      <div>
        <button
          className="p-5 rounded-2xl cursor-pointer ml-20 mt-20 bg-red-100"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
