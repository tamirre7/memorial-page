import { useCallback, useRef, useState } from 'react';

export function useAudioPlayer({ stopOnToggleOff = true } = {}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlay = useCallback(() => setIsPlaying(true), []);
  const onPause = useCallback(() => setIsPlaying(false), []);

  const onEnded = useCallback(() => {
    setIsPlaying(false);
    const audioEl = audioRef.current;
    if (audioEl) audioEl.currentTime = 0;
  }, []);

  const toggle = useCallback(async () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    try {
      if (audioEl.paused) {
        await audioEl.play();
      } else {
        audioEl.pause();
        if (stopOnToggleOff) audioEl.currentTime = 0;
      }
    } catch {
      setIsPlaying(false);
    }
  }, [stopOnToggleOff]);

  return {
    audioRef,
    isPlaying,
    onPlay,
    onPause,
    toggle,
    onEnded,
  };
}
