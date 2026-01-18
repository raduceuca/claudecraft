import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test-utils'
import userEvent from '@testing-library/user-event'
import { FilePreview } from './FilePreview'

describe('FilePreview', () => {
  const defaultProps = {
    filename: 'CLAUDE.md',
    description: 'Project configuration file',
    content: '# CLAUDE.md\n\nThis is the content.',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders filename and description', () => {
    render(<FilePreview {...defaultProps} />)

    expect(screen.getByText('CLAUDE.md')).toBeInTheDocument()
    expect(screen.getByText('Project configuration file')).toBeInTheDocument()
  })

  it('content is hidden by default', () => {
    render(<FilePreview {...defaultProps} />)

    expect(screen.queryByText('# CLAUDE.md')).not.toBeInTheDocument()
  })

  it('expands to show content when clicked', async () => {
    const user = userEvent.setup()
    render(<FilePreview {...defaultProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/# CLAUDE.md/)).toBeInTheDocument()
  })

  it('collapses when clicked again', async () => {
    const user = userEvent.setup()
    render(<FilePreview {...defaultProps} />)

    const button = screen.getByRole('button')

    // Expand
    await user.click(button)
    expect(screen.getByText(/# CLAUDE.md/)).toBeInTheDocument()

    // Collapse
    await user.click(button)
    expect(screen.queryByText(/# CLAUDE.md/)).not.toBeInTheDocument()
  })

  it('tracks preview event in Clarity when expanded', async () => {
    const user = userEvent.setup()
    render(<FilePreview {...defaultProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(window.clarity).toHaveBeenCalledWith('event', 'preview_CLAUDE_md')
  })

  it('does not track event when collapsed', async () => {
    const user = userEvent.setup()
    render(<FilePreview {...defaultProps} />)

    const button = screen.getByRole('button')

    // Expand (should track)
    await user.click(button)
    expect(window.clarity).toHaveBeenCalledTimes(1)

    // Collapse (should not track again)
    await user.click(button)
    expect(window.clarity).toHaveBeenCalledTimes(1)
  })

  it('has correct aria-expanded attribute', async () => {
    const user = userEvent.setup()
    render(<FilePreview {...defaultProps} />)

    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<FilePreview {...defaultProps} />)

    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(screen.getByText(/# CLAUDE.md/)).toBeInTheDocument()
  })
})
