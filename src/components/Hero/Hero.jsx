import "./Hero.css";

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="hero" dir="rtl" aria-label="בן קליין ז״ל, 1998–2025">
      <div className="hero-background">
        <img
          src={`${BASE}assets/images/background.webp`}
          alt="נחל זוויתן"
          className="hero-bg-image"
        />
      </div>

      <div className="hero-content">
        <img
          src={`${BASE}assets/images/portrait.jpg`}
          alt="בן קליין ז״ל"
          className="hero-portrait"
        />
        <h1 className="hero-name">בן קליין ז״ל</h1>
        <p className="hero-years">1998–2025</p>
      </div>
    </section>
  );
}
