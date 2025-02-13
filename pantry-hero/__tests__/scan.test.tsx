import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Scan from '../app/page'
 
describe('Scan', () => {
  it('renders a heading', () => {
    render(<Scan />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})