import { useState } from 'react'
import './App.css'
import WelcomePage from './Pages/WelcomePage'
import AccountPage from './Pages/AccountPage'
import ListofAccountsPage from './Pages/ListofAccountsPage'
import CreateAccountPage from './Pages/CreateAccountPage'
import UpdateAccountPage from './Pages/UpdateAccountPage'
import DeleteAccountPage from './Pages/DeleteAccountPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WelcomePage />
      <AccountPage />
      <ListofAccountsPage />
      <CreateAccountPage />
      <UpdateAccountPage />
      <DeleteAccountPage />
    </>
  )
}

export default App
