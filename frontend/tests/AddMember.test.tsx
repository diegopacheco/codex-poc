import { render, fireEvent } from '@testing-library/react'
import AddMember from '../src/pages/AddMember'

it('submits member data', () => {
  const handle = vi.fn()
  const { getByPlaceholderText, getByText } = render(<AddMember onAdd={handle} />)
  fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Alice' } })
  fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'a@b.c' } })
  fireEvent.change(getByPlaceholderText('Picture url'), { target: { value: 'pic' } })
  fireEvent.click(getByText('Add'))
  expect(handle).toHaveBeenCalledWith({ name: 'Alice', email: 'a@b.c', picture: 'pic' })
})
