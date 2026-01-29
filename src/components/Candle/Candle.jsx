import './Candle.css';
import { CANDLE } from '../../content/candle';
import { useCandleCounter } from '../../hooks/useCandleCounter';
import { useTimedToast } from '../../hooks/useTimedToast';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';

export default function Candle() {
  const { candlesLit, isLit, isLoading, busy, canLight, lightCandle } =
    useCandleCounter();

  const toast = useTimedToast({
    delayMs: CANDLE.thanksDelay,
    visibleMs: CANDLE.thanksVisibleMs,
    fadeMs: CANDLE.thanksFadeMs,
  });

  const onLight = async () => {
    const ok = await lightCandle();
    if (ok !== undefined) toast.show();
  };

  return (
    <section
      className="candle-section"
      dir="rtl"
      aria-labelledby="candle-title"
    >
      <div className="candle-container">
        <h2 id="candle-title" className="candle-title">
          {CANDLE.title}
        </h2>
        <p className="candle-subtitle">{CANDLE.subtitle}</p>

        <div className="candle-interactive">
          <button
            type="button"
            className={`candle-wrapper ${busy ? 'busy' : ''}`}
            onClick={onLight}
            disabled={!canLight}
            aria-pressed={isLit}
            aria-label={isLit ? 'נר כבר הודלק היום' : 'הדלק נר'}
          >
            <div className="candle-item">
              <div className="candle-body" />
              <div className={`flame ${isLit ? 'burning' : ''}`} />
              <div className="candle-shadow" />
            </div>
          </button>

          {toast.isOpen && (
            <div
              className={`thanks-message ${toast.isFading ? 'fade-out' : ''}`}
              role="status"
              aria-live="polite"
            >
              <h3>{CANDLE.thanksTitle}</h3>
              <p>{CANDLE.thanksText}</p>
            </div>
          )}
        </div>

        <div className="candle-counter" aria-live="polite">
          {isLoading ? (
            <>
              <LoadingSkeleton className="candle-skeleton-counter" />
              <LoadingSkeleton className="candle-skeleton-text" />
            </>
          ) : (
            <>
              <div className="counter-number">{candlesLit}</div>
              <div className="counter-text">{CANDLE.counterText}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
