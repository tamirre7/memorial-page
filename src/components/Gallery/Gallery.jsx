import './Gallery.css';
import { useCallback, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import { GALLERY } from '../../content/gallery';
import { useGalleryModal } from '../../hooks/useGalleryModal';
import GalleryModal from './GalleryModal/GalleryModal';

const BASE = import.meta.env.BASE_URL;

export default function Gallery() {
  const items = GALLERY.items;
  const resolve = useCallback((path) => `${BASE}${path}`, []);

  // Every 3 seconds
  const autoplay = useMemo(
    () =>
      Autoplay(
        { delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false },
        (emblaRoot) => emblaRoot.parentElement, // attaches listeners to viewport
      ),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay],
  );

  const { index, isOpen, open, close, prev, next } = useGalleryModal(
    items.length,
  );
  const selected = isOpen ? items[index] : null;

  // Start autoplay when embla is ready
  useEffect(() => {
    if (!emblaApi) return;
    
    const startAutoplay = () => {
      if (!isOpen) autoplay.play();
    };
    
    startAutoplay();
    emblaApi.on('init', startAutoplay);
    
    return () => {
      emblaApi.off('init', startAutoplay);
    };
  }, [emblaApi, autoplay, isOpen]);

  const prevSlide = useCallback(() => {
    if (emblaApi) {
      autoplay.stop();
      emblaApi.scrollPrev();
      autoplay.reset();
      autoplay.play();
    }
  }, [autoplay, emblaApi]);

  const nextSlide = useCallback(() => {
    if (emblaApi) {
      autoplay.stop();
      emblaApi.scrollNext();
      autoplay.reset();
      autoplay.play();
    }
  }, [autoplay, emblaApi]);

  const openMedia = useCallback(
    (i) => {
      autoplay.stop(); // Stop autoplay when modal opens
      open(i);
    },
    [autoplay, open],
  );

  const closeMedia = useCallback(() => {
    close();
    autoplay.play(); // Resume autoplay when modal closes (not just reset)
  }, [autoplay, close]);

  return (
    <section className="gallery" dir="rtl" aria-labelledby="gallery-title">
      <div className="gallery-container">
        <h2 id="gallery-title" className="gallery-title">
          {GALLERY.title}
        </h2>

        <div className="gallery-wrapper">
          <button
            type="button"
            className="scroll-btn scroll-right"
            onClick={nextSlide}
            aria-label="הבא"
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <div className="gallery-scroll" ref={emblaRef}>
            <div className="gallery-track">
              {items.map((item, i) => (
                <div
                  key={`${item.type}-${item.src}`}
                  className="gallery-item"
                  style={item.ratio ? { aspectRatio: item.ratio } : undefined}
                  onClick={() => openMedia(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openMedia(i)}
                  aria-label={item.type === 'video' ? 'פתח סרטון' : 'פתח תמונה'}
                >
                  {item.type === 'video' ? (
                    <>
                      <img
                        src={resolve(item.poster)}
                        alt={item.alt}
                        className="gallery-media"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="play-overlay" aria-hidden="true">
                        <svg className="play-icon" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <img
                      src={resolve(item.src)}
                      alt={item.alt}
                      className={`gallery-media ${item.previewClass || ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="scroll-btn scroll-left"
            onClick={prevSlide}
            aria-label="הקודם"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
        </div>
      </div>

      <GalleryModal
        item={selected}
        resolve={resolve}
        onClose={closeMedia}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
