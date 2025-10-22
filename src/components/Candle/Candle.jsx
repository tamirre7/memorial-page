import "./Candle.css";
import { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref, get, runTransaction } from "firebase/database";

export default function Candle() {
  // State for candle counter and UI
  const [candlesLit, setCandlesLit] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // Get today's date in ISO format
  const getServerDateISO = () => {
    return new Date().toISOString().slice(0, 10);
  };


  // Load candle data on component mount
  useEffect(() => {
    const loadCandleData = async () => {
      try {
        // Get total candles lit from Firebase
        const candlesRef = ref(database, 'counters/candles');
        const snapshot = await get(candlesRef);
        const data = snapshot.val();
        if (data !== null) setCandlesLit(data);

        // Check if user already lit candle today
        const todayKey = await getServerDateISO();
        const lastLit = localStorage.getItem('candle_last_lit');
        if (lastLit === todayKey) {
          setIsLit(true);
        }
      } catch (err) {
        console.error('Error loading candle data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCandleData();
  }, []);

  // Light candle function with Firebase transaction
  const lightCandle = async () => {
    if (isLit || isLoading || busy) return;
    setBusy(true);

    try {
      // Increment counter in Firebase
      const candlesRef = ref(database, 'counters/candles');
      const { committed, snapshot } = await runTransaction(candlesRef, (currentValue) => (currentValue ?? 0) + 1);

      if (committed) {
        // Store in localStorage that user lit candle today
        const todayKey = await getServerDateISO();
        try {
          localStorage.setItem('candle_last_lit', todayKey);
        } catch (error) {
          console.warn('localStorage not available:', error);
        }
        setIsLit(true);
        setCandlesLit(snapshot.val() ?? 0);
      } else {
        console.warn('Transaction failed, lighting candle locally');
        setIsLit(true);
        setCandlesLit(prev => prev + 1);
      }

      // Show thanks message after animation
      setTimeout(() => {
        setShowThanks(true);
        setTimeout(() => {
          const messageEl = document.querySelector('.thanks-message');
          if (messageEl) {
            messageEl.classList.add('fade-out');
            setTimeout(() => {
              setShowThanks(false);
            }, 500);
          } else {
            setShowThanks(false);
          }
        }, 3500);
      }, 1000);
    } catch (error) {
      console.error('Error lighting candle:', error);
      setIsLit(true);
      setCandlesLit(prev => prev + 1);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="candle-section" dir="rtl">
      <div className="candle-container">
        <h2 className="candle-title">הדליקו נר לזכרו של בן</h2>
        <p className="candle-subtitle">לחצו על הנר כדי להדליק</p>

        {/* Interactive candle area */}
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

          {/* Thanks message after lighting */}
          {showThanks && (
            <div className="thanks-message">
              <h3>תודה שהדלקת נר לזכרו של בן</h3>
              <p>זכרו ימשיך להאיר בליבנו לעד</p>
            </div>
          )}
        </div>

        {/* Counter display */}
        <div className="candle-counter">
          <div className="counter-number">
            {isLoading ? "..." : candlesLit}
          </div>
          <div className="counter-text">נרות נדלקו עד כה</div>
        </div>
      </div>
    </section>
  );
}
