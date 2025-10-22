import "./Candle.css";
import { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref, get, runTransaction } from "firebase/database";

export default function Candle() {
  const [candlesLit, setCandlesLit] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // Get server date in ISO format (YYYY-MM-DD)
  const getServerDateISO = async () => {
    const offsetRef = ref(database, ".info/serverTimeOffset");
    const snapshot = await get(offsetRef);
    const offset = snapshot.val() ?? 0;
    const serverNow = Date.now() + offset;
    return new Date(serverNow).toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  };

  // Load candle count from Firebase once
  useEffect(() => {
    const candlesRef = ref(database, 'counters/candles');
    get(candlesRef).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null) setCandlesLit(data);
      setIsLoading(false);
    });

    // Check if user has already lit a candle today (using server time)
    getServerDateISO().then(todayKey => {
      try {
        if (localStorage.getItem('candle_last_lit') === todayKey) setIsLit(true);
      } catch (error) {
        console.warn('localStorage not available:', error);
        // Continue without localStorage user can still light candle
      }
    });
  }, []);

  const lightCandle = async () => {
    if (isLit || isLoading || busy) return;
    setBusy(true);

    try {
      // Atomically increment global counter
      const candlesRef = ref(database, 'counters/candles');
      const { committed, snapshot } = await runTransaction(candlesRef, (currentValue) => (currentValue ?? 0) + 1);

      if (committed) {
        // Mark as lit for today (using server time)
        const todayKey = await getServerDateISO();
        try {
          localStorage.setItem('candle_last_lit', todayKey);
        } catch (error) {
          console.warn('localStorage not available:', error);
          // Continue without localStorage user can still light candle
        }
        setIsLit(true);
        setCandlesLit(snapshot.val() ?? 0);
      }

      // Show thanks message after animation
      setTimeout(() => {
        setShowThanks(true);
        setTimeout(() => {
          setShowThanks(false);
        }, 500);
      }, 1000);
    } catch (error) {
      console.error('Error lighting candle:', error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="candle-section" dir="rtl">
      <div className="candle-container">
        <h2 className="candle-title">הדלק נר לזכרו של בן</h2>
        
        <div className="candle-interactive">
          <div 
            className={`candle-wrapper ${busy ? 'busy' : ''}`} 
            onClick={lightCandle}
            aria-disabled={busy}
            style={{ pointerEvents: busy ? 'none' : 'auto' }}
          >
            <div className={`candle-item ${isLit ? 'lit' : ''}`}>
              <div className="candle-body"></div>
              <div className={`flame ${isLit ? 'burning' : ''}`}></div>
              <div className="candle-shadow"></div>
            </div>
          </div>
          
          {showThanks && (
            <div className="thanks-message">
              <h3>תודה שהדלקת נר לזכרו של בן</h3>
              <p>זכרו ימשיך להאיר בליבנו לעד</p>
            </div>
          )}
        </div>
        
        <div className="candle-counter">
          <div className="counter-number">
            {isLoading ? "..." : candlesLit}
          </div>
          <div className="counter-text">נרות נדלקו לזכרו</div>
        </div>
      </div>
    </section>
  );
}
