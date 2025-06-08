import { useState } from 'react'
import InputField from '../components/InputField'

export default function AddMember({ onAdd }: { onAdd: (m: { name: string; email: string; picture: string }) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState('')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ name, email, picture })
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
