import { useState } from 'react'

export default function ViewFeedback({ members, feedbacks }: { members: string[]; feedbacks: { target: string; message: string }[] }) {
  const [selected, setSelected] = useState('')
  const filtered = feedbacks.filter(f => f.target === selected)
  return (
    <div>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="" disabled>Select member</option>
        {members.map(m => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <ul>
        {filtered.map((f, i) => (
          <li key={i}>{f.message}</li>
        ))}
      </ul>
    </div>
  )
}
