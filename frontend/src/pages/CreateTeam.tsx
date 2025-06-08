import { useState } from 'react'
import InputField from '../components/InputField'

export default function CreateTeam({ onAdd }: { onAdd: (t: { name: string; logo: string }) => void }) {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ name, logo })
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
