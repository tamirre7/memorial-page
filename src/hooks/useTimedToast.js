import { useCallback, useEffect, useRef, useState } from 'react';

export function useTimedToast({
  delayMs = 0,
  visibleMs = 3000,
  fadeMs = 500,
} = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const show = useCallback(() => {
    clearTimers();
    setIsOpen(false);
    setIsFading(false);

    timersRef.current.push(
      setTimeout(() => {
        setIsOpen(true);
        setIsFading(false);

        timersRef.current.push(
          setTimeout(() => {
            setIsFading(true);

            timersRef.current.push(
              setTimeout(() => {
                setIsOpen(false);
                setIsFading(false);
              }, fadeMs),
            );
          }, visibleMs),
        );
      }, delayMs),
    );
  }, [clearTimers, delayMs, visibleMs, fadeMs]);

  // ניקוי טיימרים כשהקומפוננטה יורדת (מונע memory leaks)
  useEffect(() => clearTimers, [clearTimers]);

  return {
    isOpen,
    isFading,
    show,
    close: useCallback(() => {
      clearTimers();
      setIsOpen(false);
      setIsFading(false);
    }, [clearTimers]),
  };
}
