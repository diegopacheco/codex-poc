type Team = { name: string; logo: string; members: string[] }

export default function TeamList({ teams, onRemove, onDelete }: { teams: Team[]; onRemove: (team: string, member: string) => void; onDelete: (member: string) => void }) {
  return (
    <div>
      {teams.map(t => (
        <div key={t.name}>
          <h3>{t.name}</h3>
          <ul>
            {t.members.map(m => (
              <li key={m}>
                {m}
                <button onClick={() => onRemove(t.name, m)}>Remove</button>
                <button onClick={() => onDelete(m)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
