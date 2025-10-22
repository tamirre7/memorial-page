import "./Gallery.css";
import { useState, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const scrollRef = useRef(null);

  const mediaItems = [
    { type: "image", src: `${BASE}assets/images/gallery-01.jpg`, alt: "זיכרון של בן" },
    { type: "video", src: `${BASE}assets/video/gallery-01.mp4`, poster: `${BASE}assets/images/video-tn.jpg`, alt: "סרטון של בן" },
    { type: "image", src: `${BASE}assets/images/gallery-02.jpg`, alt: "זיכרון של בן" },
    { type: "image", src: `${BASE}assets/images/gallery-03.jpg`, alt: "זיכרון של בן" },
    { type: "image", src: `${BASE}assets/images/gallery-04.jpg`, alt: "זיכרון של בן" },
  ];

  const openMedia = (item) => setSelectedMedia(item);
  const closeMedia = () => setSelectedMedia(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: 320,  behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });

  return (
    <section className="gallery" dir="rtl">
      <div className="gallery-container">
        <h2 className="gallery-title">זיכרונות של בן</h2>

        <div className="gallery-wrapper">
          <button className="scroll-btn scroll-left" onClick={scrollLeft} aria-label="גלילה ימינה">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>

          <div className="gallery-scroll" ref={scrollRef}>
            <div className="gallery-track">
              {mediaItems.map((item, index) => (
                <div key={index} className="gallery-item" onClick={() => openMedia(item)}>
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.src}
                        className="gallery-media focus-bottom"
                        muted
                        preload="metadata"
                        poster={item.poster}
                      />
                      <div className="play-overlay">
                        <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <img src={item.src} alt={item.alt} className="gallery-media" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button className="scroll-btn scroll-right" onClick={scrollRight} aria-label="גלילה שמאלה">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        </div>
      </div>

      {selectedMedia && (
        <div className="media-modal" onClick={closeMedia}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeMedia} aria-label="סגור" />
            {selectedMedia.type === "video" ? (
              <video src={selectedMedia.src} controls autoPlay className="modal-media" />
            ) : (
              <img src={selectedMedia.src} alt={selectedMedia.alt} className="modal-media" />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
