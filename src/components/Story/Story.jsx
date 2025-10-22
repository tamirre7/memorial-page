import "./Story.css";
import { useState, useRef } from "react";

// Base URL for assets
const BASE = import.meta.env.BASE_URL;

export default function Story() {
  // State for audio playback
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Toggle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="story" dir="rtl">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={`${BASE}assets/audio/ben-piano.mp3`}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <div className="story-container">
        {/* Header with title and audio player */}
        <div className="story-header">
          <h2 className="story-title">על בן שלנו</h2>
          <button
            className={`audio-player-btn ${isPlaying ? 'playing' : ''}`}
            onClick={toggleAudio}
            aria-label="נגן הקלטה של בן"
          >
            <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
              {isPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              ) : (
                <path d="M8 5v14l11-7z"/>
              )}
            </svg>
            <span>{isPlaying ? 'עצור' : 'האזינו לנגינה של בן'}</span>
          </button>
        </div>

        {/* Main story content */}
        <div className="story-content">
          <div className="story-text">
            <p>
              בן היה אדם עם נשמה של מוזיקה ולב של צחוק.
              הוא אהב מוזיקה ישראלית אמיתית, כזו שמגיעה מהלב ומדברת אל הנשמה.
              פסנתרן מוכשר, שהצליל שלו היה תמיד מלווה בחיוך, באירוניה עדינה ובחום אנושי נדיר.
            </p>

            <p>
              היה בו שילוב מיוחד של עומק הומור ו-10 גרם ירוק, אחד שידע להצחיק, לחשוב, ולרגש באותו משפט.
              החברים זוכרים אותו כמי שידע להפוך כל רגע קטן לזיכרון גדול,
              והמשפחה כבן אהוב, שמותיר אחריו מנגינה שלא תישכח.
            </p>

            <p className="story-signature">
              אוהבים ומתגעגעים – משפחתו וחבריו של בן קליין
            </p>
          </div>

        </div>

        {/* Quote section */}
        <div className="story-quote-section">
          <div className="story-quote">
            <blockquote>
              "ריקוד בין יאוש לאמונה"
            </blockquote>
            <cite>— אביתר בנאי</cite>
          </div>
        </div>
      </div>
    </section>
  );
}
