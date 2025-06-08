import { render, fireEvent } from '@testing-library/react'
import CreateTeam from '../src/pages/CreateTeam'

it('submits team data', () => {
  const handle = vi.fn()
  const { getByPlaceholderText, getByText } = render(<CreateTeam onAdd={handle} />)
  fireEvent.change(getByPlaceholderText('Team name'), { target: { value: 'Team A' } })
  fireEvent.change(getByPlaceholderText('Logo url'), { target: { value: 'logo' } })
  fireEvent.click(getByText('Create'))
  expect(handle).toHaveBeenCalledWith({ name: 'Team A', logo: 'logo' })
})
