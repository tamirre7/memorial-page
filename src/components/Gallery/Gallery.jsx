import "./Gallery.css";
import { useState, useRef, useEffect } from "react";

// Base URL for assets
const BASE = import.meta.env.BASE_URL;

export default function Gallery() {
  // State for modal media and current index
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  // Array of media items with type, src, alt, and optional classes
  const mediaItems = [
    { type: "image", src: `${BASE}assets/images/gallery-01.jpg`, alt: "זיכרון של בן", previewClass: "focus-top-more" },
    { type: "video", src: `${BASE}assets/video/gallery-01.mp4`, poster: `${BASE}assets/images/video-tn.png`, alt: "סרטון של בן" },
    { type: "image", src: `${BASE}assets/images/gallery-02.jpg`, alt: "זיכרון של בן", previewClass: "focus-top-extra" },
    { type: "image", src: `${BASE}assets/images/gallery-03.jpg`, alt: "זיכרון של בן", previewClass: "focus-top" },
    { type: "image", src: `${BASE}assets/images/gallery-04.jpg`, alt: "זיכרון של בן" },
    { type: "image", src: `${BASE}assets/images/gallery-05.jpg`, alt: "זיכרון של בן" },
    { type: "image", src: `${BASE}assets/images/gallery-06.jpg`, alt: "זיכרון של בן" },
    { type: "image", src: `${BASE}assets/images/portrait.jpg`, alt: "פורטרט של בן", previewClass: "focus-top", modalClass: "focus-top" },
  ];

  // Open modal with selected media
  const openMedia = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  // Close modal
  const closeMedia = () => setSelectedMedia(null);

  // Navigate to previous media in modal
  const handlePrev = () => {
    const prev = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setCurrentIndex(prev);
    setSelectedMedia(mediaItems[prev]);
  };

  // Navigate to next media in modal
  const handleNext = () => {
    const next = (currentIndex + 1) % mediaItems.length;
    setCurrentIndex(next);
    setSelectedMedia(mediaItems[next]);
  };

  // Scroll gallery left (to previous items)
  const scrollLeft = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement && scrollElement.scrollLeft > 0) {
      const item = scrollElement.querySelector('.gallery-item');
      const track = scrollElement.querySelector('.gallery-track');
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const scrollAmount = item.offsetWidth + gap;
      scrollElement.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // Scroll gallery right (to next items)
  const scrollRight = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
      if (scrollElement.scrollLeft < maxScrollLeft) {
        const item = scrollElement.querySelector('.gallery-item');
        const track = scrollElement.querySelector('.gallery-track');
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const scrollAmount = item.offsetWidth + gap;
        scrollElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Handle keyboard and touch navigation for modal
  useEffect(() => {
    if (!selectedMedia) return;

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft")  handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape")     closeMedia();
    };
    document.addEventListener("keydown", handleKeyDown);

    const modalEl = document.querySelector(".modal-media");
    if (!modalEl) {
      return () => document.removeEventListener("keydown", handleKeyDown);
    }

    // Touch swipe handling
    let startX = 0;
    let isSwiping = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    };

    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      const moveX = e.touches[0].clientX - startX;
      modalEl.style.transform = `translateX(${moveX * 0.3}px)`;
    };

    const handleTouchEnd = (e) => {
      if (!isSwiping) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      modalEl.style.transform = "translateX(0)";
      isSwiping = false;

      if (diff > 50)      handlePrev();
      else if (diff < -50) handleNext();
    };

    modalEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    modalEl.addEventListener("touchmove",  handleTouchMove,  { passive: true });
    modalEl.addEventListener("touchend",   handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      modalEl.removeEventListener("touchstart", handleTouchStart);
      modalEl.removeEventListener("touchmove",  handleTouchMove);
      modalEl.removeEventListener("touchend",   handleTouchEnd);
    };
  }, [selectedMedia, currentIndex]);

  return (
    <section className="gallery" dir="rtl">
      <div className="gallery-container">
        <h2 className="gallery-title">זיכרונות של בן</h2>

        <div className="gallery-wrapper">
          <button className="scroll-btn scroll-right" onClick={scrollRight} aria-label="Scroll right">
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>

          <div className="gallery-scroll" ref={scrollRef}>
            <div className="gallery-track">
              {mediaItems.map((item, index) => (
                <div key={index} className="gallery-item" onClick={() => openMedia(item, index)}>
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
                        <svg className="play-icon" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <img src={item.src} alt={item.alt} className={`gallery-media ${item.previewClass || ''}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button className="scroll-btn scroll-left" onClick={scrollLeft} aria-label="Scroll left">
            <svg viewBox="0 0 24 24">
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
              <img src={selectedMedia.src} alt={selectedMedia.alt} className={`modal-media ${selectedMedia.modalClass || ''}`} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
