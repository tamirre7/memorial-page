import { useCallback, useEffect, useState } from 'react';

export function useGalleryModal(itemsLength) {
  const [index, setIndex] = useState(null);
  const isOpen = index !== null;

  const open = useCallback((i) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);

  const prev = useCallback(() => {
    setIndex((i) => (i === null ? null : (i - 1 + itemsLength) % itemsLength));
  }, [itemsLength]);

  const next = useCallback(() => {
    setIndex((i) => (i === null ? null : (i + 1) % itemsLength));
  }, [itemsLength]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close, prev, next]);

  return { index, isOpen, open, close, prev, next };
}
