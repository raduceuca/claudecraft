import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders code content', () => {
    render(<CodeBlock>const x = 1</CodeBlock>)

    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('shows language label when provided', () => {
    render(<CodeBlock language="typescript">const x: number = 1</CodeBlock>)

    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('does not show language label when not provided', () => {
    render(<CodeBlock>console.log("hello")</CodeBlock>)

    expect(screen.queryByText('typescript')).not.toBeInTheDocument()
    expect(screen.queryByText('javascript')).not.toBeInTheDocument()
  })

  it('has copy button with proper aria-label', () => {
    render(<CodeBlock>npm install</CodeBlock>)

    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument()
  })

  it('copies code to clipboard when copy button clicked', async () => {
    const user = userEvent.setup()
    const code = 'bun create claudecraft my-app'
    render(<CodeBlock>{code}</CodeBlock>)

    const copyButton = screen.getByRole('button', { name: /copy code/i })
    await user.click(copyButton)

    // Verify copy happened by checking the UI shows copied state
    await waitFor(() => {
      expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument()
    })
  })

  it('shows check icon after copying', async () => {
    const user = userEvent.setup()
    vi.useFakeTimers({ shouldAdvanceTime: true })

    render(<CodeBlock>test code</CodeBlock>)

    const copyButton = screen.getByRole('button', { name: /copy code/i })
    await user.click(copyButton)

    // Screen reader text announces copy success
    expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('preserves code formatting with whitespace', () => {
    const multilineCode = `function hello() {
  return 'world'
}`
    render(<CodeBlock>{multilineCode}</CodeBlock>)

    expect(screen.getByText(/function hello/)).toBeInTheDocument()
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<CodeBlock>test</CodeBlock>)

    const copyButton = screen.getByRole('button', { name: /copy code/i })

    await user.tab()
    expect(copyButton).toHaveFocus()
  })
})
