import './LoadingSkeleton.css';

export default function LoadingSkeleton({ className = '', style = {} }) {
  return (
    <div className={`loading-skeleton ${className}`} style={style} aria-hidden="true">
      <div className="skeleton-shimmer" />
    </div>
  );
}
