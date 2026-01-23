import './GalleryModal.css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryModal({
  item,
  resolve,
  onClose,
  onPrev,
  onNext,
}) {
  if (!item) return null;

  return (
    <div
      className="media-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="סגור"
        >
          <X />
        </button>

        <button
          type="button"
          className="modal-nav modal-prev"
          onClick={onPrev}
          aria-label="קודם"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className="modal-nav modal-next"
          onClick={onNext}
          aria-label="הבא"
        >
          <ChevronRight size={24} />
        </button>

        {item.type === 'video' ? (
          <video
            src={resolve(item.src)}
            controls
            autoPlay
            className="modal-media"
          />
        ) : (
          <img
            src={resolve(item.src)}
            alt={item.alt}
            className={`modal-media ${item.modalClass || ''}`}
          />
        )}
      </div>
    </div>
  );
}
