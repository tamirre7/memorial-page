import "./Candle.css";
import { useState } from "react";

export default function Candle() {
  const [candlesLit, setCandlesLit] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const lightCandle = () => {
    if (!isLit) {
      setIsLit(true);
      setCandlesLit(prev => prev + 1);
      
      // Show thanks message after animation
      setTimeout(() => {
        setShowThanks(true);
        setTimeout(() => {
          setShowThanks(false);
        }, 3000);
      }, 2000);
    }
  };

  return (
    <section className="candle-section" dir="rtl">
      <div className="candle-container">
        <h2 className="candle-title">הדלק נר לזכרו של בן</h2>
        
        <div className="candle-interactive">
          <div className="candle-wrapper" onClick={lightCandle}>
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
          <div className="counter-number">{candlesLit}</div>
          <div className="counter-text">נרות נדלקו לזכרו</div>
        </div>
      </div>
    </section>
  );
}
