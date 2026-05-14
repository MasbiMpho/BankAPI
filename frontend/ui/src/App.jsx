import { useState } from 'react'
import './App.css'
import WelcomePage from './Pages/WelcomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WelcomePage />
    </>
  )
}

export default App
