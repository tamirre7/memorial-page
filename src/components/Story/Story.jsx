import './Story.css';
import { Play, Pause } from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { STORY } from '../../content/story';

const BASE = import.meta.env.BASE_URL;

export default function Story() {
  const { audioRef, isPlaying, onPlay, onPause, onEnded, toggle } =
    useAudioPlayer();
  const audioId = 'ben-audio';

  return (
    <section className="story" dir="rtl" aria-labelledby="story-title">
      <audio
        id={audioId}
        ref={audioRef}
        src={`${BASE}${STORY.audio.src}`}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        preload="metadata"
      />

      <div className="story-container">
        <header className="story-header">
          <h2 id="story-title" className="story-title">
            {STORY.title}
          </h2>

          <button
            type="button"
            className={`audio-player-btn ${isPlaying ? 'playing' : ''}`}
            onClick={toggle}
            aria-label={
              isPlaying ? STORY.audio.stopLabel : STORY.audio.playLabel
            }
            aria-pressed={isPlaying}
            aria-controls={audioId}
          >
            {isPlaying ? (
              <Pause className="play-icon" aria-hidden="true" />
            ) : (
              <Play className="play-icon" aria-hidden="true" />
            )}
            <span>
              {isPlaying ? STORY.audio.stopText : STORY.audio.playText}
            </span>
          </button>
        </header>

        <div className="story-content">
          <div className="story-text">
            {STORY.paragraphs.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}

            <p className="story-signature">{STORY.signature}</p>
          </div>
        </div>

        <div className="story-quote-section">
          <figure className="story-quote">
            <blockquote>{STORY.quote.text}</blockquote>
            <figcaption>
              <cite>{STORY.quote.author}</cite>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
