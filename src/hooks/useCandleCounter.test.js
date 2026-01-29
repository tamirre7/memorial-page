import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCandleCounter } from './useCandleCounter'
import { CANDLE } from '../content/candle'

// Mock Firebase - so tests don't call real Firebase
const mockGet = vi.fn()
const mockRunTransaction = vi.fn()
const mockRef = vi.fn()

vi.mock('firebase/database', () => ({
  ref: (...args) => {
    mockRef(...args)
    return { _path: args }
  },
  get: (...args) => mockGet(...args),
  runTransaction: (...args) => mockRunTransaction(...args),
}))

vi.mock('../firebase', () => ({
  database: {},
}))

describe('useCandleCounter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()

    // Default: load returns 10 candles, no previous lit today
    mockGet.mockResolvedValue({
      val: () => 10,
    })
    mockRunTransaction.mockImplementation((_ref, fn) => {
      const current = 10
      const newVal = fn(current)
      return Promise.resolve({
        committed: true,
        snapshot: { val: () => newVal },
      })
    })
  })

  it('starts with isLoading true, then false after load', async () => {
    const { result } = renderHook(() => useCandleCounter())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.canLight).toBe(false)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.candlesLit).toBe(10)
    expect(result.current.canLight).toBe(true)
  })

  it('canLight is false when isLit (already lit today)', async () => {
    const today = new Date().toISOString().slice(0, 10)
    localStorage.setItem(CANDLE.localStorageKey, today)

    const { result } = renderHook(() => useCandleCounter())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isLit).toBe(true)
    expect(result.current.canLight).toBe(false)
  })

  it('lightCandle increments count and sets isLit', async () => {
    const { result } = renderHook(() => useCandleCounter())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    let ok
    await act(async () => {
      ok = await result.current.lightCandle()
    })

    expect(ok).toBe(true)
    expect(result.current.isLit).toBe(true)
    expect(result.current.candlesLit).toBe(11)
    expect(localStorage.getItem(CANDLE.localStorageKey)).toBe(
      new Date().toISOString().slice(0, 10),
    )
  })

  it('lightCandle does nothing when canLight is false', async () => {
    const today = new Date().toISOString().slice(0, 10)
    localStorage.setItem(CANDLE.localStorageKey, today)

    const { result } = renderHook(() => useCandleCounter())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    let ok
    await act(async () => {
      ok = await result.current.lightCandle()
    })

    expect(ok).toBeUndefined()
    expect(result.current.candlesLit).toBe(10)
  })

  it('on Firebase error: still sets isLit and increments locally', async () => {
    mockRunTransaction.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useCandleCounter())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    let ok
    await act(async () => {
      ok = await result.current.lightCandle()
    })

    expect(ok).toBe(false)
    expect(result.current.isLit).toBe(true)
    expect(result.current.candlesLit).toBe(11)
  })

  it('on load error: isLoading becomes false, candlesLit stays 0', async () => {
    mockGet.mockRejectedValue(new Error('Firebase error'))

    const { result } = renderHook(() => useCandleCounter())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.candlesLit).toBe(0)
    expect(result.current.canLight).toBe(true)
  })
})
