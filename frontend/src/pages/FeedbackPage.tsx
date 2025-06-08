import { useState } from 'react'

export default function FeedbackPage({ members, teams, onSubmit }: { members: string[]; teams: string[]; onSubmit: (target: string, message: string) => void }) {
  const [target, setTarget] = useState('')
  const [message, setMessage] = useState('')
  const options = [...members, ...teams]
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (target && message) onSubmit(target, message)
    setMessage('')
  }
  return (
    <form onSubmit={submit}>
      <select value={target} onChange={e => setTarget(e.target.value)}>
        <option value="" disabled>Select target</option>
        {options.map(o => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  )
}
