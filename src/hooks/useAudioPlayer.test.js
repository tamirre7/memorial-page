import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAudioPlayer } from './useAudioPlayer'

describe('useAudioPlayer', () => {
  let mockAudio

  beforeEach(() => {
    mockAudio = {
      paused: true,
      currentTime: 0,
      play: vi.fn().mockResolvedValue(undefined),
      pause: vi.fn(),
    }
  })

  it('returns isPlaying false initially', () => {
    const { result } = renderHook(() => useAudioPlayer())
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.audioRef).toBeDefined()
  })

  it('onPlay sets isPlaying to true', () => {
    const { result } = renderHook(() => useAudioPlayer())
    act(() => {
      result.current.onPlay()
    })
    expect(result.current.isPlaying).toBe(true)
  })

  it('onPause sets isPlaying to false', () => {
    const { result } = renderHook(() => useAudioPlayer())
    act(() => {
      result.current.onPlay()
    })
    expect(result.current.isPlaying).toBe(true)
    act(() => {
      result.current.onPause()
    })
    expect(result.current.isPlaying).toBe(false)
  })

  it('onEnded resets currentTime and sets isPlaying false', () => {
    const { result } = renderHook(() => useAudioPlayer())
    mockAudio.currentTime = 100
    act(() => {
      result.current.audioRef.current = mockAudio
      result.current.onEnded()
    })
    expect(mockAudio.currentTime).toBe(0)
    expect(result.current.isPlaying).toBe(false)
  })

  it('toggle does nothing when audioRef is null', async () => {
    const { result } = renderHook(() => useAudioPlayer())
    await act(async () => {
      await result.current.toggle()
    })
    expect(result.current.isPlaying).toBe(false)
  })

  it('toggle calls play when audio is paused', async () => {
    const { result } = renderHook(() => useAudioPlayer())
    result.current.audioRef.current = mockAudio

    await act(async () => {
      await result.current.toggle()
    })

    expect(mockAudio.play).toHaveBeenCalled()
  })

  it('toggle calls pause and resets currentTime when stopOnToggleOff is true', async () => {
    const { result } = renderHook(() => useAudioPlayer({ stopOnToggleOff: true }))
    mockAudio.paused = false
    mockAudio.currentTime = 50
    result.current.audioRef.current = mockAudio

    await act(async () => {
      await result.current.toggle()
    })

    expect(mockAudio.pause).toHaveBeenCalled()
    expect(mockAudio.currentTime).toBe(0)
  })

  it('handles play error gracefully', async () => {
    const { result } = renderHook(() => useAudioPlayer())
    mockAudio.play = vi.fn().mockRejectedValue(new Error('Play failed'))
    result.current.audioRef.current = mockAudio

    await act(async () => {
      await result.current.toggle()
    })

    expect(result.current.isPlaying).toBe(false)
  })
})
