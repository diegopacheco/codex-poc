import { render } from '@testing-library/react'
import Toast from '../src/components/Toast'

it('renders message', () => {
  const { getByText } = render(<Toast message="Hi" />)
  expect(getByText('Hi')).toBeInTheDocument()
})

it('returns null when empty', () => {
  const { container } = render(<Toast message="" />)
  expect(container.firstChild).toBeNull()
})
