import { render, fireEvent } from '@testing-library/react'
import FeedbackPage from '../src/pages/FeedbackPage'

it('submits feedback', () => {
  const handle = vi.fn()
  const { getByRole, getByText } = render(
    <FeedbackPage members={['John']} teams={['Team']} onSubmit={handle} />
  )
  fireEvent.change(getByRole('combobox'), { target: { value: 'John' } })
  fireEvent.change(getByRole('textbox'), { target: { value: 'Hi' } })
  fireEvent.click(getByText('Send'))
  expect(handle).toHaveBeenCalledWith('John', 'Hi')
})
