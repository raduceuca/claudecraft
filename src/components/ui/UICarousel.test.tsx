import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@/test-utils'
import userEvent from '@testing-library/user-event'
import { UICarousel } from './UICarousel'

describe('UICarousel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders theme selector', () => {
    render(<UICarousel />)

    expect(screen.getByLabelText(/select theme/i)).toBeInTheDocument()
  })

  it('shows first slide initially', () => {
    render(<UICarousel />)

    expect(screen.getByText('1 / 10')).toBeInTheDocument()
  })

  it('navigates to next slide when clicking next button', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<UICarousel />)

    const nextButton = screen.getByLabelText(/next slide/i)
    await user.click(nextButton)

    expect(screen.getByText('2 / 10')).toBeInTheDocument()
  })

  it('navigates to previous slide when clicking prev button', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<UICarousel />)

    // Go to slide 2 first
    const nextButton = screen.getByLabelText(/next slide/i)
    await user.click(nextButton)

    // Go back
    const prevButton = screen.getByLabelText(/previous slide/i)
    await user.click(prevButton)

    expect(screen.getByText('1 / 10')).toBeInTheDocument()
  })

  it('wraps around when navigating past last slide', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<UICarousel />)

    // Navigate to last slide using prev from first (wraps to 10)
    const prevButton = screen.getByLabelText(/previous slide/i)
    await user.click(prevButton)

    expect(screen.getByText('10 / 10')).toBeInTheDocument()
  })

  it('tracks navigation events in Clarity', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<UICarousel />)

    const nextButton = screen.getByLabelText(/next slide/i)
    await user.click(nextButton)

    expect(window.clarity).toHaveBeenCalledWith('event', 'carousel_next')
  })

  it('tracks theme change in Clarity', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<UICarousel />)

    const themeSelector = screen.getByLabelText(/select theme/i)
    await user.selectOptions(themeSelector, 'cyberpunk')

    expect(window.clarity).toHaveBeenCalledWith('event', 'theme_cyberpunk')
  })

  it('pauses auto-advance on hover', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<UICarousel />)

    const carousel = screen.getByText('1 / 10').closest('div')?.parentElement
    if (carousel) {
      await user.hover(carousel)
      expect(screen.getByText('paused')).toBeInTheDocument()
    }
  })

  it('has accessible slide navigation dots', () => {
    render(<UICarousel />)

    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(10)
    expect(dots[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('navigates to specific slide when dot is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<UICarousel />)

    const dots = screen.getAllByRole('tab')
    await user.click(dots[4]) // Click 5th dot

    expect(screen.getByText('5 / 10')).toBeInTheDocument()
  })
})
