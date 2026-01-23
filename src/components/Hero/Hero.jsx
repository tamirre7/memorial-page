import './Hero.css';
import { HERO } from '../../content/hero';

// Base URL for assets
const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="hero" dir="rtl" aria-label={HERO.ariaLabel}>
      <div className="hero-background">
        <img
          src={`${BASE}${HERO.bgSrc}`}
          alt=""
          aria-hidden="true"
          className="hero-bg-image"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="hero-content">
        <img
          src={`${BASE}${HERO.portraitSrc}`}
          alt={HERO.portraitAlt}
          className="hero-portrait"
          loading="eager"
          decoding="async"
        />

        <div className="hero-text">
          <h1 className="hero-name">{HERO.name}</h1>
          <p className="hero-years">{HERO.years}</p>
        </div>
      </div>
    </section>
  );
}
