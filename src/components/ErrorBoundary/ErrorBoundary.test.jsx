import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

function ThrowError({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = vi.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('catches errors and shows error UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>,
    )
    expect(screen.getByText(/אופס, משהו השתבש/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /נסה שוב/i })).toBeInTheDocument()
  })

  it('reset button clears error state when re-rendered without error', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>,
    )
    expect(screen.getByText(/אופס, משהו השתבש/i)).toBeInTheDocument()

    const resetBtn = screen.getByRole('button', { name: /נסה שוב/i })
    resetBtn.click()

    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    )
    expect(screen.getByText('No error')).toBeInTheDocument()
  })
})
