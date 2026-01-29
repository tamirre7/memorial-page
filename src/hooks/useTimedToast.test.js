import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimedToast } from './useTimedToast'

describe('useTimedToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('starts with isOpen and isFading false', () => {
    const { result } = renderHook(() => useTimedToast())
    expect(result.current.isOpen).toBe(false)
    expect(result.current.isFading).toBe(false)
  })

  it('show opens toast after delay', () => {
    const { result } = renderHook(() =>
      useTimedToast({ delayMs: 1000, visibleMs: 2000, fadeMs: 500 }),
    )

    act(() => {
      result.current.show()
    })
    expect(result.current.isOpen).toBe(false)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.isOpen).toBe(true)
    expect(result.current.isFading).toBe(false)
  })

  it('starts fading after visible duration', () => {
    const { result } = renderHook(() =>
      useTimedToast({ delayMs: 0, visibleMs: 2000, fadeMs: 500 }),
    )

    act(() => {
      result.current.show()
      vi.advanceTimersByTime(0)
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.isFading).toBe(true)
  })

  it('closes after fade duration', () => {
    const { result } = renderHook(() =>
      useTimedToast({ delayMs: 0, visibleMs: 1000, fadeMs: 500 }),
    )

    act(() => {
      result.current.show()
      vi.advanceTimersByTime(0)
      vi.advanceTimersByTime(1000)
      vi.advanceTimersByTime(500)
    })
    expect(result.current.isOpen).toBe(false)
    expect(result.current.isFading).toBe(false)
  })

  it('close resets state immediately', () => {
    const { result } = renderHook(() =>
      useTimedToast({ delayMs: 0, visibleMs: 2000 }),
    )

    act(() => {
      result.current.show()
      vi.advanceTimersByTime(0)
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
    expect(result.current.isFading).toBe(false)
  })
})
