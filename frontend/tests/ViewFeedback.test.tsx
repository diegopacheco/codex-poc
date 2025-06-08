import { render, fireEvent } from '@testing-library/react'
import ViewFeedback from '../src/pages/ViewFeedback'

it('shows feedback for selected member', () => {
  const { getByRole, getByText } = render(
    <ViewFeedback members={['John', 'Bob']} feedbacks={[{ target: 'John', message: 'Hello' }]} />
  )
  fireEvent.change(getByRole('combobox'), { target: { value: 'John' } })
  expect(getByText('Hello')).toBeInTheDocument()
})
