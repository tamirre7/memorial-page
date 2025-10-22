import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" dir="rtl">
      <div className="footer-container">
        {/* Footer message and signature */}
        <div className="footer-content">
          <p className="footer-text">
            תודה על האהבה והמוזיקה שהבאת לעולם, נאהב ונתגעגע לנצח
          </p>
          <p className="footer-signature">
            המשפחה והחברים
          </p>
        </div>
      </div>
    </footer>
  );
}
