import { useCallback, useEffect, useMemo, useState } from 'react';
import { ref, get, runTransaction } from 'firebase/database';
import { database } from '../firebase';
import { CANDLE } from '../content/candle';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function useCandleCounter() {
  const [candlesLit, setCandlesLit] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const canLight = useMemo(
    () => !isLit && !isLoading && !busy,
    [isLit, isLoading, busy],
  );
  
  useEffect(() => {
    const load = async () => {
      try {
        const candlesRef = ref(database, CANDLE.firebaseCounterPath);
        const snapshot = await get(candlesRef);
        const data = snapshot.val();
        if (data !== null) setCandlesLit(data);

        const lastLit = localStorage.getItem(CANDLE.localStorageKey);
        if (lastLit === todayISO()) setIsLit(true);
      } catch (err) {
        console.error('Error loading candle data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const lightCandle = useCallback(async () => {
    if (!canLight) return;
    setBusy(true);

    try {
      const candlesRef = ref(database, CANDLE.firebaseCounterPath);

      const { committed, snapshot } = await runTransaction(
        candlesRef,
        (currentValue) => (currentValue ?? 0) + 1,
      );

      try {
        localStorage.setItem(CANDLE.localStorageKey, todayISO());
      } catch {
        // ignore
      }

      setIsLit(true);

      if (committed) {
        setCandlesLit(snapshot.val() ?? 0);
      } else {
        // fallback
        setCandlesLit((prev) => prev + 1);
      }

      return true; // Success (so component can show thank you message)
    } catch (error) {
      console.error('Error lighting candle:', error);

      // Degrade gracefully: light locally if Firebase fails
      setIsLit(true);
      setCandlesLit((prev) => prev + 1);
      return false;
    } finally {
      setBusy(false);
    }
  }, [canLight]);

  return {
    candlesLit,
    isLit,
    isLoading,
    busy,
    canLight,
    lightCandle,
  };
}
