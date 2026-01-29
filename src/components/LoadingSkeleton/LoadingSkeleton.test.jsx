import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSkeleton from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
  it('renders with default classes', () => {
    const { container } = render(<LoadingSkeleton />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('loading-skeleton')
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom className', () => {
    const { container } = render(
      <LoadingSkeleton className="candle-skeleton-counter" />,
    )
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('loading-skeleton')
    expect(wrapper).toHaveClass('candle-skeleton-counter')
  })

  it('applies inline style', () => {
    const { container } = render(
      <LoadingSkeleton style={{ width: '80px', height: '80px' }} />,
    )
    const wrapper = container.firstChild
    expect(wrapper).toHaveStyle({ width: '80px', height: '80px' })
  })

  it('contains shimmer element', () => {
    const { container } = render(<LoadingSkeleton />)
    const shimmer = container.querySelector('.skeleton-shimmer')
    expect(shimmer).toBeInTheDocument()
  })
})
