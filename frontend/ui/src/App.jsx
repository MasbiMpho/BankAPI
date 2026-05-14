import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Sidebar from './Components/Sidebar'
import WelcomePage from './Pages/WelcomePage'
import AccountPage from './Pages/AccountPage'
import ListofAccountsPage from './Pages/ListofAccountsPage'
import CreateAccountPage from './Pages/CreateAccountPage'
import UpdateAccountPage from './Pages/UpdateAccountPage'
import DeleteAccountPage from './Pages/DeleteAccountPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
      <div>
        <Sidebar />
        <div>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/users" element={<ListofAccountsPage />} />
            <Route path="/user/:id" element={<AccountPage />} />
            <Route path="/account-number" element={<AccountPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/update-account/:id" element={<UpdateAccountPage />} />
            <Route path="/delete-account/:id" element={<DeleteAccountPage />} />
          </Routes>
          
        </div>
      </div>
      
    </Router>
  )
}

export default App
