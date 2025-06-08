import { useState } from 'react'
import InputField from '../components/InputField'
import { API_URL } from '../api'

export default function CreateTeam({ onAdd, onSuccess }: { onAdd: (t: { name: string; logo: string }) => void; onSuccess?: () => void }) {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name, logo }
    fetch(`${API_URL}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(console.error)
    onAdd(payload)
    onSuccess && onSuccess()
    setName('')
    setLogo('')
  }
  return (
    <form onSubmit={submit}>
      <InputField value={name} onChange={setName} placeholder="Team name" />
      <InputField value={logo} onChange={setLogo} placeholder="Logo url" />
      <button type="submit">Create</button>
    </form>
  )
}
