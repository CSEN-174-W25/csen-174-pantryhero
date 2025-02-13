import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Pantry from '../app/page'
 
describe('Pantry', () => {
  it('renders a heading', () => {
    render(<Pantry />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})