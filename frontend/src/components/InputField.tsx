import type { ChangeEvent } from 'react'

export default function InputField({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
  return <input value={value} onChange={handle} placeholder={placeholder} type={type} />
}
