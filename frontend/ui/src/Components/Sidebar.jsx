import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Welcome</Link></li>
        <li><Link to="/users">List of Accounts</Link></li>
        <li><Link to="/user/:id">Account</Link></li>
        <li><Link to="/account-number">Account</Link></li>
        <li><Link to="/create-account">Create Account</Link></li>   
        <li><Link to="/update-account/:id">Update Account</Link></li>
        <li><Link to="/delete-account/:id">Delete Account</Link></li>
      </ul>
    </nav>
  )
}