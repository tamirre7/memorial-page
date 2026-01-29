import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGalleryModal } from './useGalleryModal'

describe('useGalleryModal', () => {
  it('starts closed (index null)', () => {
    const { result } = renderHook(() => useGalleryModal(5))
    expect(result.current.isOpen).toBe(false)
    expect(result.current.index).toBe(null)
  })

  it('open sets index and isOpen', () => {
    const { result } = renderHook(() => useGalleryModal(5))

    act(() => {
      result.current.open(2)
    })

    expect(result.current.index).toBe(2)
    expect(result.current.isOpen).toBe(true)
  })

  it('close resets to null', () => {
    const { result } = renderHook(() => useGalleryModal(5))

    act(() => {
      result.current.open(2)
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.close()
    })
    expect(result.current.index).toBe(null)
    expect(result.current.isOpen).toBe(false)
  })

  it('next cycles forward', () => {
    const { result } = renderHook(() => useGalleryModal(3))

    act(() => {
      result.current.open(0)
    })
    expect(result.current.index).toBe(0)

    act(() => {
      result.current.next()
    })
    expect(result.current.index).toBe(1)

    act(() => {
      result.current.next()
    })
    expect(result.current.index).toBe(2)

    act(() => {
      result.current.next()
    })
    expect(result.current.index).toBe(0)
  })

  it('prev cycles backward', () => {
    const { result } = renderHook(() => useGalleryModal(3))

    act(() => {
      result.current.open(0)
    })

    act(() => {
      result.current.prev()
    })
    expect(result.current.index).toBe(2)

    act(() => {
      result.current.prev()
    })
    expect(result.current.index).toBe(1)
  })

  it('prev does nothing when closed', () => {
    const { result } = renderHook(() => useGalleryModal(3))

    act(() => {
      result.current.prev()
    })
    expect(result.current.index).toBe(null)
  })
})
