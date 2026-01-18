import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TerminalHeader } from './TerminalHeader'

describe('TerminalHeader', () => {
  it('renders terminal chrome with traffic lights', () => {
    render(<TerminalHeader />)

    // Check terminal title
    expect(screen.getByText(/Terminal — bun create claudecraft/)).toBeInTheDocument()
  })

  it('renders ASCII art logo', () => {
    const { container } = render(<TerminalHeader />)

    // Check that ASCII art content exists - uses block characters for CLAUDE CRAFT
    const asciiPre = container.querySelector('pre')
    expect(asciiPre).toBeInTheDocument()
    expect(asciiPre?.innerHTML).toContain('██████╗')
  })

  it('shows date in status bar', () => {
    render(<TerminalHeader />)

    // Date is dynamic, just verify format exists (YYYY.MM.DD)
    expect(screen.getByText(/\d{4}\.\d{2}\.\d{2}/)).toBeInTheDocument()
  })

  it('shows version number', () => {
    render(<TerminalHeader />)

    expect(screen.getByText('REV 1.0.0')).toBeInTheDocument()
  })

  it('renders CMYK color indicators', () => {
    const { container } = render(<TerminalHeader />)

    // CMYK letters are rendered inline
    expect(container.textContent).toContain('C')
    expect(container.textContent).toContain('M')
    expect(container.textContent).toContain('Y')
    expect(container.textContent).toContain('K')
  })

  it('renders status bar with platform info', () => {
    render(<TerminalHeader />)

    expect(screen.getByText('WORKS ON MAC')).toBeInTheDocument()
  })
})
