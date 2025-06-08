import { render, fireEvent } from '@testing-library/react'
import AssignTeam from '../src/pages/AssignTeam'

it('assigns member to team', () => {
  const handle = vi.fn()
  const { getAllByRole, getByText } = render(
    <AssignTeam members={['Bob']} teams={['Alpha']} onAssign={handle} />
  )
  const selects = getAllByRole('combobox')
  fireEvent.change(selects[0], { target: { value: 'Bob' } })
  fireEvent.change(selects[1], { target: { value: 'Alpha' } })
  fireEvent.click(getByText('Assign'))
  expect(handle).toHaveBeenCalledWith('Bob', 'Alpha')
})
