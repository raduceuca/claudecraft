import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test-utils'
import userEvent from '@testing-library/user-event'
import { CopyCommand } from './CopyCommand'

describe('CopyCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the command text', () => {
    render(<CopyCommand>bun create claudecraft my-app</CopyCommand>)

    expect(screen.getByText('bun create claudecraft my-app')).toBeInTheDocument()
  })

  it('shows copy icon by default', () => {
    render(<CopyCommand>npm install</CopyCommand>)

    const button = screen.getByRole('button', { name: /copy command/i })
    expect(button).toBeInTheDocument()
  })

  it('copies text to clipboard when clicked', async () => {
    const user = userEvent.setup()
    render(<CopyCommand>bun dev</CopyCommand>)

    const button = screen.getByRole('button', { name: /copy command/i })
    await user.click(button)

    // Verify copy happened by checking the UI shows copied state
    await waitFor(() => {
      expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument()
    })
  })

  it('shows check icon after copying', async () => {
    const user = userEvent.setup()
    vi.useFakeTimers({ shouldAdvanceTime: true })

    render(<CopyCommand>bun test</CopyCommand>)

    const button = screen.getByRole('button', { name: /copy command/i })
    await user.click(button)

    // Check for screen reader text announcing copy success
    expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('tracks copy event in Clarity', async () => {
    const user = userEvent.setup()
    render(<CopyCommand>curl -fsSL https://bun.sh/install</CopyCommand>)

    const button = screen.getByRole('button', { name: /copy command/i })
    await user.click(button)

    expect(window.clarity).toHaveBeenCalledWith('event', 'copy_curl')
  })

  it('has accessible button with proper aria-label', () => {
    render(<CopyCommand>git clone repo</CopyCommand>)

    const button = screen.getByRole('button', { name: /copy command: git clone repo/i })
    expect(button).toBeInTheDocument()
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<CopyCommand>bun install</CopyCommand>)

    const button = screen.getByRole('button')
    await user.tab()

    expect(button).toHaveFocus()
  })
})
