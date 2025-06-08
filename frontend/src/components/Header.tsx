import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="app-header">
      <img src="/logo-app.png" alt="logo" className="header-logo" />
      <nav>
        <ul>
          <li><Link to="/add-member">Add Member</Link></li>
          <li><Link to="/create-team">Create Team</Link></li>
          <li><Link to="/assign-team">Assign Team</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/view-feedback">View Feedback</Link></li>
        </ul>
      </nav>
    </header>
  )
}
