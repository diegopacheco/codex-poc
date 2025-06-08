import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddMember from './pages/AddMember'
import CreateTeam from './pages/CreateTeam'
import AssignTeam from './pages/AssignTeam'
import FeedbackPage from './pages/FeedbackPage'
import TeamList from './pages/TeamList'
import ViewFeedback from './pages/ViewFeedback'
import Header from './components/Header'
import Toast from './components/Toast'
import './App.css'

type Member = { name: string; email: string; picture: string }
type Team = { name: string; logo: string; members: string[] }

export default function App() {
  const [members, setMembers] = useState<Member[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [feedbacks, setFeedbacks] = useState<{ target: string; message: string }[]>([])
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 5000)
  }

  const addMember = (m: Member) => setMembers([...members, m])
  const addTeam = (t: { name: string; logo: string }) =>
    setTeams([...teams, { ...t, members: [] }])
  const assign = (m: string, t: string) =>
    setTeams(teams.map(team =>
      team.name === t ? { ...team, members: [...team.members, m] } : team
    ))
  const remove = (t: string, m: string) =>
    setTeams(teams.map(team =>
      team.name === t ? { ...team, members: team.members.filter(mem => mem !== m) } : team
    ))
  const delMember = (m: string) => {
    setMembers(members.filter(mem => mem.name !== m))
    setTeams(teams.map(team => ({
      ...team,
      members: team.members.filter(mem => mem !== m)
    })))
  }
  const feedback = (target: string, message: string) =>
    setFeedbacks([...feedbacks, { target, message }])

  const memberNames = members.map(m => m.name)
  const teamNames = teams.map(t => t.name)

  return (
    <div className="app-container">
      <Header />
      <Toast message={toast} />
      <div className="app-content">
        <Routes>
          <Route path="/add-member" element={<AddMember onAdd={addMember} onSuccess={() => showToast('Success')} />} />
          <Route path="/create-team" element={<CreateTeam onAdd={addTeam} onSuccess={() => showToast('Success')} />} />
          <Route
            path="/assign-team"
            element={<AssignTeam members={memberNames} teams={teamNames} onAssign={assign} onSuccess={() => showToast('Success')} />}
          />
          <Route
            path="/teams"
            element={<TeamList teams={teams} onRemove={remove} onDelete={delMember} />}
          />
          <Route
            path="/feedback"
            element={<FeedbackPage members={memberNames} teams={teamNames} onSubmit={feedback} onSuccess={() => showToast('Success')} />}
          />
          <Route
            path="/view-feedback"
            element={<ViewFeedback members={memberNames} feedbacks={feedbacks} />}
          />
          <Route path="*" element={<AddMember onAdd={addMember} onSuccess={() => showToast('Success')} />} />
        </Routes>
      </div>
    </div>
  )
}