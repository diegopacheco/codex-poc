import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'

it('renders navigation links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  expect(getByText('Add Member')).toBeInTheDocument()
  expect(getByText('Create Team')).toBeInTheDocument()
  expect(getByText('Assign')).toBeInTheDocument()
  expect(getByText('Teams')).toBeInTheDocument()
  expect(getByText('Feedback')).toBeInTheDocument()
})
