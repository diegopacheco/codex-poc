import { render, fireEvent } from '@testing-library/react'
import TeamList from '../src/pages/TeamList'

describe('TeamList', () => {
  it('calls handlers', () => {
    const remove = vi.fn()
    const del = vi.fn()
    const teams = [{ name: 'T1', logo: '', members: ['Bob'] }]
    const { getByText } = render(
      <TeamList teams={teams} onRemove={remove} onDelete={del} />
    )
    fireEvent.click(getByText('Remove'))
    expect(remove).toHaveBeenCalledWith('T1', 'Bob')
    fireEvent.click(getByText('Delete'))
    expect(del).toHaveBeenCalledWith('Bob')
  })
})
