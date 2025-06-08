import { render, fireEvent } from '@testing-library/react'
import InputField from '../src/components/InputField'

it('calls onChange when typing', () => {
  const handle = vi.fn()
  const { getByPlaceholderText } = render(
    <InputField value="" onChange={handle} placeholder="Name" />
  )
  const input = getByPlaceholderText('Name') as HTMLInputElement
  fireEvent.change(input, { target: { value: 'John' } })
  expect(handle).toHaveBeenCalledWith('John')
})
