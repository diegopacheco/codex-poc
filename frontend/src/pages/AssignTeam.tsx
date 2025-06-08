import { useState } from 'react'
import { API_URL } from '../api'

export default function AssignTeam({ members, teams, onAssign }: { members: string[]; teams: string[]; onAssign: (m: string, t: string) => void }) {
  const [member, setMember] = useState(members[0] || '')
  const [team, setTeam] = useState(teams[0] || '')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (member && team) {
      const payload = { member, team }
      fetch(`${API_URL}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(console.error)
      onAssign(member, team)
    }
  }
  return (
    <form onSubmit={submit}>
      <select value={member} onChange={e => setMember(e.target.value)}>
        {members.map(m => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <select value={team} onChange={e => setTeam(e.target.value)}>
        {teams.map(t => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <button type="submit">Assign</button>
    </form>
  )
}
