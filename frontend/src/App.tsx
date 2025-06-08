import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AddMember from './pages/AddMember'
import CreateTeam from './pages/CreateTeam'
import AssignTeam from './pages/AssignTeam'
import FeedbackPage from './pages/FeedbackPage'
import TeamList from './pages/TeamList'

type Member = { name: string; email: string; picture: string }
type Team = { name: string; logo: string; members: string[] }

export default function App() {
  const [members, setMembers] = useState<Member[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const addMember = (m: Member) => setMembers([...members, m])
  const addTeam = (t: { name: string; logo: string }) => setTeams([...teams, { ...t, members: [] }])
  const assign = (m: string, t: string) => setTeams(teams.map(team => team.name === t ? { ...team, members: [...team.members, m] } : team))
  const remove = (t: string, m: string) => setTeams(teams.map(team => team.name === t ? { ...team, members: team.members.filter(mem => mem !== m) } : team))
  const delMember = (m: string) => {
    setMembers(members.filter(mem => mem.name !== m))
    setTeams(teams.map(team => ({ ...team, members: team.members.filter(mem => mem !== m) })))
  }
  const feedback = (target: string, message: string) => console.log(target, message)
  const memberNames = members.map(m => m.name)
  const teamNames = teams.map(t => t.name)
  return (
    <>
      <nav>
        <Link to="/add-member">Add Member</Link>
        <Link to="/create-team">Create Team</Link>
        <Link to="/assign-team">Assign</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/feedback">Feedback</Link>
      </nav>
      <Routes>
        <Route path="/add-member" element={<AddMember onAdd={addMember} />} />
        <Route path="/create-team" element={<CreateTeam onAdd={addTeam} />} />
        <Route path="/assign-team" element={<AssignTeam members={memberNames} teams={teamNames} onAssign={assign} />} />
        <Route path="/teams" element={<TeamList teams={teams} onRemove={remove} onDelete={delMember} />} />
        <Route path="/feedback" element={<FeedbackPage members={memberNames} teams={teamNames} onSubmit={feedback} />} />
        <Route path="*" element={<AddMember onAdd={addMember} />} />
      </Routes>
    </>
  )
}
