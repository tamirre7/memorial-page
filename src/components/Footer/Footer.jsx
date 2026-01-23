import './Footer.css';
import { FOOTER } from '../../content/footer';

export default function Footer() {
  return (
    <footer className="footer" dir="rtl" aria-label={FOOTER.ariaLabel}>
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">{FOOTER.text}</p>
          <p className="footer-signature">{FOOTER.signature}</p>
        </div>
      </div>
    </footer>
  );
}
