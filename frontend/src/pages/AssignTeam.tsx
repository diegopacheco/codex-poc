import { useState } from 'react'

export default function AssignTeam({ members, teams, onAssign }: { members: string[]; teams: string[]; onAssign: (m: string, t: string) => void }) {
  const [member, setMember] = useState(members[0] || '')
  const [team, setTeam] = useState(teams[0] || '')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (member && team) onAssign(member, team)
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
