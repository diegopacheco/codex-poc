import { useState } from 'react'
import InputField from '../components/InputField'
import { API_URL } from '../api'

export default function AddMember({ onAdd }: { onAdd: (m: { name: string; email: string; picture: string }) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name, email, picture }
    fetch(`${API_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(console.error)
    onAdd(payload)
    setName('')
    setEmail('')
    setPicture('')
  }
  return (
    <form onSubmit={submit}>
      <InputField value={name} onChange={setName} placeholder="Name" />
      <InputField value={email} onChange={setEmail} placeholder="Email" type="email" />
      <InputField value={picture} onChange={setPicture} placeholder="Picture url" />
      <button type="submit">Add</button>
    </form>
  )
}
