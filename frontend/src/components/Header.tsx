import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><Link to="/add-member">Add Member</Link></li>
          <li><Link to="/create-team">Create Team</Link></li>
          <li><Link to="/assign-team">Assign</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
        </ul>
      </nav>
    </header>
  )
}
